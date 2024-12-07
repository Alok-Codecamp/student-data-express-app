import config from "../../config";
import { Student } from "../students/student.model";
import { Istudent } from "../students/student.interface";
import { IUser } from "./user.interface";
import { userModel } from "./user.model";
import { IAcademicSemester } from "../academicSemister/academicSemester.interface";
import { academicSemesterModel } from "../academicSemister/acamedicSemester.model";
import userUtils from "./user.utils";
import { startSession } from "mongoose";
import AppError from "../../middlewares/errorSuperClass";

const createStudentIntoDB = async (password: string, payLoad: Istudent) => {
    //set student role


    const user: Partial<IUser> = {}

    user.role = 'student';

    user.password = password || config.default_password as string;

    //generate student id



    const admissionSemester = await academicSemesterModel.findById(payLoad.admissionSemester);

    const session = await startSession();

    try {

        session.startTransaction();
        // set id 
        user.id = await userUtils.generateStudentId(admissionSemester as IAcademicSemester)
        // console.log(user.id);

        //create a user transaction 1
        const newUser = await userModel.create([user], { session });

        // create a student
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'faild to create user')

        }
        payLoad.id = newUser[0].id;
        payLoad.user = newUser[0]._id;

        // transaction 2
        const newStudent = await Student.create
            ([payLoad], { session })

        if (!newStudent.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'faild to create student')
        }

        await session.commitTransaction();
        await session.endSession();


        return newStudent;



    } catch (err) {

        await session.abortTransaction();
        await session.endSession();

    }







}



export const userServices = {
    createStudentIntoDB,
}