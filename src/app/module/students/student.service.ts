import { startSession } from "mongoose";
import { Student } from "./student.model";
import AppError from "../../middlewares/errorSuperClass";
import { userModel } from "../user/user.model";
import { Istudent } from "./student.interface";
import { object } from "joi";



const getAllStudentsFromDB = async () => {
    const result = await Student.find().populate('admissionSemester').populate({
        path: 'academicDepertment',
        populate: {
            path: 'academicFaculty'
        }
    });
    return result;
}
const getSingleStudentsFromDB = async (id: string) => {
    const result = await Student.findOne({ id }).populate('admissionSemester').populate({
        path: 'academicDepertment',
        populate: {
            path: 'academicFaculty'
        }
    })
    return result;
}



// service function for update student 

const updateStudentIntoDB = async (id: string, payload: Partial<Istudent>) => {


    const { name, guardian, localGuardian, ...remainngStudent } = payload

    const modifiedUpdateData: Record<string, unknown> = { ...remainngStudent, }

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdateData[`name.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdateData[`guardian.${key}`] = value;
        }
    }

    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdateData[`localGuardian.${key}`] = value;
        }
    }



    console.log(modifiedUpdateData);


    const result = await Student.findOneAndUpdate({ id }, modifiedUpdateData, { new: true, runValidators: true, })
    return result;
}


// function for delete student data from db

const deleteStudentsFromDB = async (id: string) => {

    const session = await startSession();

    try {

        session.startTransaction();


        const deletedStudent = await Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });

        if (!deletedStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, 'faild to delete student')
        }
        const deletedUser = await userModel.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session })


        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, 'faild to delete user')
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedUser;
    } catch (err) {
        await session.abortTransaction();

        await session.endSession();

    }



}



export const StudentServices = {

    getAllStudentsFromDB,
    getSingleStudentsFromDB,
    updateStudentIntoDB,
    deleteStudentsFromDB
}