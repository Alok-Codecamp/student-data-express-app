import { ObjectId, startSession } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../middlewares/errorSuperClass";
import { IFaculty } from "./faculty.interface";
import { FacultyModel } from "./faculty.model";
import { userModel } from "../user/user.model";


const getAllFacultiesFromDb = async (queryParam: Record<string, unknown>) => {

    const FacultyQuery = new QueryBuilder(FacultyModel.find().populate('academicDepertment'), queryParam).filter().sort().paginate().fields()

    const result = await FacultyQuery.modelQuery;

    return result;
}

// service function for get faculty by id

const getSingleFacultyFromDb = async (id: string) => {

    const result = await FacultyModel.findById(id)
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Faculty Not Found!!')
    }
    return result;
}

// service function for update faculty data
const updateFacultyIntoDb = async (id: string, payLoad: Partial<IFaculty>) => {

    const result = await FacultyModel.findByIdAndUpdate(id, payLoad, { new: true, runValidators: true })

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Faculty Not Found!!')
    }

    return result;
}

// service function for delete fucutly data 

const deleteFAcultyFromDb = async (id: string) => {

    const session = await startSession();

    try {
        session.startTransaction();

        const checkisDeleted = await userModel.findById(id);

        if (checkisDeleted?.isDeleted === true) {
            throw new AppError(httpStatus.NOT_FOUND, 'Faculty not Found')
        }

        const deletedFaculty = await FacultyModel.findByIdAndUpdate(id, { isDeleted: true }, { session, new: true })
        if (!deletedFaculty) {
            throw new AppError(httpStatus.NOT_FOUND, 'faild to delete Faculty!!')
        }

        const deletedUser = await userModel.findByIdAndUpdate(deletedFaculty.user, { isDeleted: true }, { session, new: true })
        if (!deletedFaculty) {
            throw new AppError(httpStatus.NOT_FOUND, 'faild to delete Faculty!!')
        }
        await session.commitTransaction();
        await session.endSession();
        return deletedFaculty;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, err.message);
    }


}



export const facultyServices = {
    getAllFacultiesFromDb,
    getSingleFacultyFromDb,
    updateFacultyIntoDb,
    deleteFAcultyFromDb,

}



