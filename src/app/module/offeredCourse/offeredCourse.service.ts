import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../middlewares/errorSuperClass";
import httpStatus from "http-status";
import { IOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourseModel } from "./offeredCourse.model";
import { SemesterRegistrationModel } from "../semesterRagistration/semesterRagistration.model";
import { AcademicFacultyModel } from "../academicFaculty/academicFaculty.model";
import { AcademicDepertmentModel } from "../academicDepertment/academicDepertment.model";
import { CourseModel } from "../course/course.model";
import { FacultyModel } from "../faculty/faculty.model";
import { hasTimeConfilct } from "./offeredCourse.utils";



const createOfferedCourseIntoDb = async (payload: IOfferedCourse) => {

    const {
        semesterRegistration, academicFaculty, academicDepertment, course,
        faculty,
        section,
        days,
        startTime,
        endTime
    } = payload;

    const isSemesterRegistrationExists = await SemesterRegistrationModel.findById(semesterRegistration);

    if (!isSemesterRegistrationExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found!')
    }

    // check academicFaculty 

    const isAcademicFacultyExists = await AcademicFacultyModel.findById(academicFaculty);

    if (!isAcademicFacultyExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'academic faculty not found!')
    }
    // academic depertment checking
    const isAcademicDepertmentExists = await AcademicDepertmentModel.findById(academicDepertment);

    if (!isAcademicDepertmentExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic depertment not found!')
    }

    // check course exists

    const isCourseExists = await CourseModel.findById(course);

    if (!isCourseExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Course not found!')
    }

    // check faculty 

    const isFacultyExists = await FacultyModel.findById(faculty);

    if (!isFacultyExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'faculty not found!')
    }

    const academicSemester = isSemesterRegistrationExists.academicSemester;

    // check if the depertment is belong to that faculty

    const isDepertmentBelongToFaclty = await AcademicDepertmentModel.findOne({ academicFaculty, _id: academicDepertment })

    if (!isDepertmentBelongToFaclty) {
        throw new AppError(httpStatus.NOT_FOUND, 'This academic depertment  not belong to this faculty!')
    }

    const checkSectionAndSemesterDuplicate = await OfferedCourseModel.findOne({
        semesterRegistration,
        course,
        section

    })

    if (checkSectionAndSemesterDuplicate) {
        throw new AppError(httpStatus.BAD_REQUEST, 'offered course is already exists !!!')
    }

    const assignedSchdeules = await OfferedCourseModel.find({
        semesterRegistration,
        faculty,
        days: { $in: days }
    }).select('days startTime endTime')

    const newShedeule = {
        days,
        startTime,
        endTime
    }

    if (hasTimeConfilct(assignedSchdeules, newShedeule)) {
        throw new AppError(httpStatus.CONFLICT, ` This faculty is not availabe at that time ! Choose other time or day`)
    }


    const result = await OfferedCourseModel.create({ academicSemester, ...payload });

    return result;

}

// get all semester 

const getAllOfferedCourseIntoFromDb = async (queryParam: Record<string, unknown>) => {

    const offeredCourseQuery = new QueryBuilder(OfferedCourseModel.find(), queryParam).filter().sort().paginate().fields();

    const result = await offeredCourseQuery.modelQuery;

    return result;
}

// get the shedules of the facultires




// service function get single semester form db

const getSingleOfferedCourseFromDb = async (id: string) => {

    const result = await OfferedCourseModel.findById(id)

    return result;
}


const updateOfferedCourseIntoDb = async (id: string, payload: Pick<IOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>) => {

    const {
        faculty,
        days,
        startTime,
        endTime
    } = payload;


    const isOfferedCourseExists = await OfferedCourseModel.findById(id);
    if (!isOfferedCourseExists) {
        throw new AppError(httpStatus.NOT_FOUND, `Offered course not found !!`)
    }

    const isFacultyExists = await FacultyModel.findById(faculty);

    if (!isFacultyExists) {
        throw new AppError(httpStatus.NOT_FOUND, `Faculty not found !!`)
    }

    const semesterRagistration = isOfferedCourseExists.semesterRegistration;

    const semesterRagistrationStatus = await SemesterRegistrationModel.findById(semesterRagistration);

    if (semesterRagistrationStatus?.status !== 'UPCOMING') {
        throw new AppError(httpStatus.BAD_REQUEST, `You can not update this offered course as it is ${semesterRagistrationStatus?.status} !!`)
    }


    const assignedSchdeules = await OfferedCourseModel.find({
        faculty,
        days: { $in: days }
    }).select('days startTime endTime')

    const newShedeule = {
        days: days,
        startTime: startTime,
        endTime: endTime
    }

    if (hasTimeConfilct(assignedSchdeules, newShedeule)) {
        throw new AppError(httpStatus.CONFLICT, ` This faculty is not availabe at that time ! Choose other time or day`)
    }

    const result = await OfferedCourseModel.findByIdAndUpdate(id, payload, {
        new: true
    })

    return result;

}


export const offeredcourseServices = {
    createOfferedCourseIntoDb,
    getAllOfferedCourseIntoFromDb,
    getSingleOfferedCourseFromDb,
    updateOfferedCourseIntoDb
}