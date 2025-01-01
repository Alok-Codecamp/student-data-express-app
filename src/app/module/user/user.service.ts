import config from "../../config";
import { Student } from "../students/student.model";
import { Istudent } from "../students/student.interface";
import { IUser } from "./user.interface";
import { userModel } from "./user.model";
import { IAcademicSemester } from "../academicSemister/academicSemester.interface";
import { academicSemesterModel } from "../academicSemister/acamedicSemester.model";
import userUtils from "./user.utils";
import { Date, Error, startSession } from "mongoose";
import AppError from "../../middlewares/errorSuperClass";
import httpStatus from "http-status";
import { IFaculty } from "../faculty/faculty.interface";
import { FacultyModel } from "../faculty/faculty.model";
import { IAdmin } from "../admin/admin.interface";
import { AdminModel } from "../admin/admin.model";
import { uploadImageToCloudinary } from "../../utils/uploadImage";
import { AcademicDepertmentModel } from "../academicDepertment/academicDepertment.model";
import { AcademicFacultyModel } from "../academicFaculty/academicFaculty.model";



// service function for create admin 
const createAdminIntoDb = async (file: any, password: string, payload: IAdmin) => {
    const user: Partial<IUser> = {};
    user.password = password || config.default_password;
    user.role = 'admin';
    user.email = payload.email;
    const session = await startSession();
    try {
        user.id = await userUtils.generateAdminId();

        session.startTransaction();
        const imageName = `${user.id}${payload?.name?.firstName}`;
        // get image link 
        const path = file?.path;
        const uploadedImage: any = await uploadImageToCloudinary(path, imageName);

        const newUser = await userModel.create([user], { session })
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'faild to create user')
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        payload.profileImage = uploadedImage?.secure_url;

        const newAdmin = await AdminModel.create([payload], { session })

        if (!newAdmin.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'faild to create user')
        }

        await session.commitTransaction();
        await session.endSession();

        return newAdmin;

    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, err.message)
    }

}


//service function for create student and user .
const createStudentIntoDB = async (file: any, password: string, payload: Istudent) => {
    //set student role

    const user: Partial<IUser> = {}

    user.role = 'student';

    user.password = password || config.default_password as string;

    user.email = payload.email;

    //generate student id

    const admissionSemester = await academicSemesterModel.findById(payload.admissionSemester);

    const session = await startSession();

    try {

        session.startTransaction();
        // set id 
        user.id = await userUtils.generateStudentId(admissionSemester as IAcademicSemester)
        const imageName = `${user.id}${payload?.name?.firstName}`;
        // get image link 
        const path = file?.path;

        const uploadedImage: any = await uploadImageToCloudinary(path, imageName);




        //create a user transaction 1
        const newUser = await userModel.create([user], { session });

        // create a student
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'faild to create user')

        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        payload.profileImg = uploadedImage?.secure_url;


        // transaction 2
        const newStudent = await Student.create
            ([payload], { session })


        if (!newStudent.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'faild to create student')
        }

        await session.commitTransaction();
        await session.endSession();

        return newStudent;

    } catch (err: any) {

        await session.abortTransaction();
        await session.endSession();

        throw new AppError(httpStatus.BAD_REQUEST, err?.message || 'unknown error')


        // throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create student')
    }
}

// service function for create faculty and user 

const createFacultyInDB = async (file: any, password: string, payload: IFaculty) => {

    const user: Partial<IUser> = {};

    user.password = password || config.default_password;

    user.role = 'faculty';
    const session = await startSession();
    user.email = payload.email;
    user.id = await userUtils.generateFacultyId()

    const isFacultyExists = await FacultyModel.findOne({ id: user.id, email: payload.email }) as IFaculty;

    if (isFacultyExists) {
        throw new AppError(httpStatus.CONFLICT, 'You are already registerd! please sign in!');

    }


    const isDepertmentExists = await AcademicDepertmentModel.findById(payload.academicDepertment);

    if (!isDepertmentExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Depertment does not exist!');
    }


    if (!isDepertmentExists.academicFaculty) {
        throw new AppError(httpStatus.NOT_FOUND, 'academic Faculty does not exist!');
    }

    payload.academicFaculty = isDepertmentExists?.academicFaculty;




    try {

        session.startTransaction();
        // set id 

        const imageName = `${user.id}${payload?.name?.firstName}`;
        // get image link 
        const path = file?.path;

        const uploadedImage: any = await uploadImageToCloudinary(path, imageName);


        // create a user transaction 1
        const newUser = await userModel.create([user], { session });

        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'faild to create user')

        }
        // assign faculty data dynamically
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        payload.profileImage = uploadedImage?.secure_url;

        // transaction 2 create faculty
        const newFaculty = await FacultyModel.create
            ([payload], { session })


        if (!newFaculty.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'faild to create student')
        }

        await session.commitTransaction();
        await session.endSession();


        return newFaculty;



    } catch (err: any) {

        await session.abortTransaction();
        await session.endSession();

        throw new AppError(httpStatus.BAD_REQUEST, err?.message || 'unknown error')
    }


}




// service function for get own user data
const getMeFromDb = async (userId: string, userRole: string) => {

    let result;

    // condition for admin 
    if (userRole === 'admin') {
        result = await AdminModel.findOne({ id: userId });
    }

    // condition for faculty 
    if (userRole === 'faculty') {
        result = await FacultyModel.findOne({ id: userId });
    }

    // condition for student 
    if (userRole === 'student') {
        result = await Student.findOne({ id: userId });
    }

    return result;

}

const changeStatusIntoDb = async (id: string, status: { status: 'in-progress' | 'blocked' }) => {

    const result = await userModel.findByIdAndUpdate(id, status, { new: true })

}

export const userServices = {
    createStudentIntoDB,
    createFacultyInDB,
    createAdminIntoDb,
    getMeFromDb,
    changeStatusIntoDb,
}