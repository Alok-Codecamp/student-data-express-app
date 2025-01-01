import { object } from "joi";
import QueryBuilder from "../../builder/QueryBuilder"
import AppError from "../../middlewares/errorSuperClass";
import { IAdmin } from "./admin.interface";
import { AdminModel } from "./admin.model"
import { startSession } from "mongoose";
import { userModel } from "../user/user.model";
import httpStatus from "http-status";

const getAdminFromDb = async (queryParam: Record<string, unknown>) => {


    const adminQuery = new QueryBuilder(AdminModel.find(), queryParam).filter().paginate().sort().fields()

    const result = await adminQuery.modelQuery;

    return result;

}

const getSingleAdminFromDb = async (id: string) => {

    const result = await AdminModel.findById(id)

    return result;
}

const updateAdminIntoDb = async (id: string, payLoad: Partial<IAdmin>) => {

    const { name, ...remainingAdmin } = payLoad;

    const modifiedData: Record<string, unknown> = { ...remainingAdmin };

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedData[`name.${key}`] = value;
        }
    }

    const result = await AdminModel.findByIdAndUpdate(id, modifiedData, { new: true, runValidators: true })

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'admin updated failed')
    }
    return result;
}

const deleteAdminFromDb = async (id: string) => {
    const session = await startSession();
    try {
        session.startTransaction();
        const checkisDeleted = await userModel.findById(id)
        if (checkisDeleted?.isDeleted === true) {
            console.log(checkisDeleted?.isDeleted);

            throw new AppError(httpStatus.BAD_REQUEST, 'admin not found !!')
        }


        const deletedAdmin = await AdminModel.findByIdAndUpdate(id, { isDeleted: true }, { session, new: true })

        if (!deletedAdmin) {
            throw new AppError(httpStatus.BAD_REQUEST, 'faild to delete admin  !!')
        }

        const deletedUser = await userModel.findByIdAndUpdate(deletedAdmin.user, { isDeleted: true }, { session, new: true })
        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, 'faild to delete user  !!')
        }

        await session.commitTransaction()
        await session.endSession();
        return deletedAdmin;


    } catch (err: any) {

        await session.abortTransaction();
        await session.endSession();

        throw new AppError(httpStatus.BAD_REQUEST, err.message)

    }

}

export const adminServices = {
    getAdminFromDb,
    getSingleAdminFromDb,
    updateAdminIntoDb,
    deleteAdminFromDb
}