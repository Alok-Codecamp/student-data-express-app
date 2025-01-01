import { startSession } from "mongoose";
import AppError from "../../middlewares/errorSuperClass";
import { OfferedCourseModel } from "../offeredCourse/offeredCourse.model"
import { Student } from "../students/student.model";
import { IEnroledCourse, TCourseMarks, TGrade } from "./enroledCourse.interface"
import { EnroledCourseModel } from "./enroledCourse.model";
import httpStatus from "http-status";
import { SemesterRegistrationModel } from "../semesterRagistration/semesterRagistration.model";
import { CourseModel } from "../course/course.model";
import { FacultyModel } from "../faculty/faculty.model";
import calculateGradeAndPoints from "./enrolledCourse.utils";




const createEnrolledCourseIntoDb = async (userId: string, payload: IEnroledCourse) => {

    // check if the offered course is exists

    const isOfferedCourseExists = await OfferedCourseModel.findById(payload.offeredCourse);

    if (!isOfferedCourseExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'offered course not found')
    }

    const course = await CourseModel.findById(isOfferedCourseExists.course);

    if (isOfferedCourseExists?.maxCapacity < 0) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Room is full!')
    }

    const student = await Student.findOne({ id: userId });


    const isStudentEnrolledCourse = await EnroledCourseModel.findOne({
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        offeredCourse: payload.offeredCourse,
        student: student?._id
    })

    if (isStudentEnrolledCourse) {
        throw new AppError(httpStatus.CONFLICT, 'student is already enrolled')
    }

    const semesterRegistration = await SemesterRegistrationModel.findById(isOfferedCourseExists.semesterRegistration).select('maxCredit');

    // total enrolled credits

    const enrolledCourses = await EnroledCourseModel.aggregate([
        {
            $match: {
                semesterRegistration: isOfferedCourseExists.semesterRegistration,
                student: student?._id,
            },

        },
        {
            $lookup: {
                from: 'courses',
                localField: 'course',
                foreignField: '_id',
                as: 'EnrolledCourseData'
            }
        },
        {
            $unwind: '$EnrolledCourseData'
        },
        {
            $group: {
                _id: null,
                totalEnrolledCredits: { $sum: '$EnrolledCourseData.credits' }
            }
        },
        {
            $project: {
                _id: 0,
                totalEnrolledCredits: 1
            }
        }

    ])



    const totalCredits = enrolledCourses.length > 0 ? enrolledCourses[0]?.totalEnrolledCredits : 0;


    if (totalCredits && semesterRegistration?.maxCredit && totalCredits + course?.credits > semesterRegistration?.maxCredit) {

        throw new AppError(httpStatus.BAD_REQUEST, 'You have exceeded maximum number of credits')
    }

    const session = await startSession();

    try {

        session.startTransaction();

        const result = await EnroledCourseModel.create([{
            semesterRegistration: isOfferedCourseExists.semesterRegistration,
            academicSemester: isOfferedCourseExists.academiSemester,
            academicFaculty: isOfferedCourseExists.academicFaculty,
            academicDepertment: isOfferedCourseExists.academicDepertment,
            offeredCourse: isOfferedCourseExists._id,
            course: isOfferedCourseExists.course,
            student: student?._id,
            faculty: isOfferedCourseExists.faculty,
            isEnroled: true,
        }], { session });

        if (!result) {
            throw new AppError(httpStatus.BAD_REQUEST, 'faild to create enrolled course')
        }

        const maxCapacity = isOfferedCourseExists.maxCapacity;

        await OfferedCourseModel.findByIdAndUpdate(payload.offeredCourse, { maxCapacity: maxCapacity - 1 }, { session });

        await session.commitTransaction();
        await session.endSession();

        return result;

    }
    catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, err?.message)

    }

}

const updateEnrolledCourseMarksIntoDb = async (facultyId: string, payload: Partial<IEnroledCourse>) => {

    const { semesterRegistration, offeredCourse, student, courseMarks } = payload;



    const isSemesterRegistrationExists = await SemesterRegistrationModel.findById(semesterRegistration);

    if (!isSemesterRegistrationExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'semester not found')
    }
    const isOfferedCourseExists = await OfferedCourseModel.findById(offeredCourse);

    if (!isOfferedCourseExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'offered course not found')
    }

    const isStudentsExists = await Student.findById(student);

    if (!isStudentsExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Student not found')
    }

    const isFacultyExists = await FacultyModel.findOne({ id: facultyId });
    if (!isFacultyExists) {
        throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized to update this enrolled course')
    }

    const isCourseBelongToFaculty = await EnroledCourseModel.findOne({
        semesterRegistration,
        offeredCourse,
        student,
        faculty: isFacultyExists?._id
    })


    const modifiedData: Record<string, unknown> = { ...courseMarks }

    if (courseMarks?.finalTerm) {
        const { classTest1,
            midTerm,
            classTest2,
            finalTerm } = isCourseBelongToFaculty?.courseMarks as any;

        const totalMarks = Math.ceil(classTest1 * 0.10) + Math.ceil(midTerm * 0.30) + Math.ceil(classTest2 * 0.10) + Math.ceil(finalTerm * 0.50)

        const courseResult: { grade: any, gradePoints: number } = calculateGradeAndPoints(totalMarks);

        payload.grade = courseResult?.grade;
        payload.gradePoints = courseResult.gradePoints;
        payload.iscompleted = courseResult.gradePoints > 0 ? true : false;



    }


    if (courseMarks && Object.keys(courseMarks).length) {
        for (const [key, value] of Object.entries(courseMarks)) {
            modifiedData[`courseMarks.${key}`] = value;
        }
    }


    const result = await EnroledCourseModel.findByIdAndUpdate(isCourseBelongToFaculty?._id, {

        courseMarks: modifiedData,
        grade: payload.grade,
        gradePoints: payload.gradePoints,
        iscompleted: payload.iscompleted

    }, { new: true })


    return result;
}



export const enrolledCourseService = {
    createEnrolledCourseIntoDb,
    updateEnrolledCourseMarksIntoDb,
}