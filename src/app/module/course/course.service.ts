import { startSession } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { ICourse, ICourseFaculty } from "./course.interface";
import { CourseFacultyModel, CourseModel } from "./course.model";
import AppError from "../../middlewares/errorSuperClass";



const createCourseIntoDb = async (payLoad: ICourse) => {

    const result = await CourseModel.create(payLoad);

    return result;
}


const getAllCoursesFromDb = async (queryParam: Record<string, unknown>) => {

    const courseQuery = new QueryBuilder(CourseModel.find().populate('preRequisiteCourses.course'), queryParam).search(courseSearchableFields).filter().sort().paginate().fields();
    const result = await courseQuery.modelQuery;

    return result;
}
const getSingleCoursesFromDb = async (id: string) => {
    const result = await CourseModel.findById(id).populate({
        path: 'preRequisiteCourses.course',
        populate: {
            path: 'preRequisiteCourses.course'
        }

    });

    return result;
}

const updateCourseIntoDb = async (id: string, payload: Partial<ICourse>) => {


    const { preRequisiteCourses, ...courseRemainingData } = payload;

    const session = await startSession();

    try {
        session.startTransaction();


        // step-1 basic course info update
        const updatedBasicCourseInfo = await CourseModel.findByIdAndUpdate(id, courseRemainingData, { new: true, runValidation: true, session })

        if (!updatedBasicCourseInfo) {
            throw new AppError(httpStatus.BAD_REQUEST, 'faild to update course')
        }

        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            const deletedPreRequisites = preRequisiteCourses.filter(el => el.course && el.isDeleted).map(el => el.course)

            const deletedPreRequisiteCourses = await CourseModel.findByIdAndUpdate(id,
                { $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisites } } } }, { new: true, session }
            )

            if (!deletedPreRequisiteCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, 'faild to update course')
            }

            const newpreRequisites = preRequisiteCourses?.filter(el => el.course && !el.isDeleted);

            const newpreRequisitesCourses = await CourseModel.findByIdAndUpdate(id,
                {
                    $addToSet: { preRequisiteCourses: { $each: newpreRequisites } }
                }, {
                session, new: true
            }
            )
            if (!updatedBasicCourseInfo) {
                throw new AppError(httpStatus.BAD_REQUEST, 'faild to update course')
            }
        }

        // fiter out the new course fields 

        await session.commitTransaction();
        await session.endSession();


        const result = await CourseModel.findById(id).populate('preRequisiteCourses.course')


        return result;


    } catch (err: any) {

        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, err.message)
    }
}


const deleteCourseFromDb = async (id: string) => {
    const result = await CourseModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

    return result;
}

// service function maintain faculties 

const assignFacultiesWithCourseIntoDb = async (id: string, payLoad: Partial<ICourseFaculty>) => {


    const result = await CourseFacultyModel.findByIdAndUpdate(id, {
        course: id,
        $addToSet: { faculties: { $each: payLoad } },
    }, {
        upsert: true,
        new: true
    })

    return result;
}
const removeFacultiesFromCourseFromDb = async (id: string, payLoad: Partial<ICourseFaculty>) => {


    const result = await CourseFacultyModel.findByIdAndUpdate(id, {
        $pull: { faculties: { $in: payLoad } }
    }, {

        new: true
    })

    return result;
}



export const courseServices = {
    createCourseIntoDb,
    getAllCoursesFromDb,
    getSingleCoursesFromDb,
    updateCourseIntoDb,
    deleteCourseFromDb,
    assignFacultiesWithCourseIntoDb,
    removeFacultiesFromCourseFromDb

}