import mongoose, { Document, Model, Models, Schema } from "mongoose";
import { IAcademicSemester } from "../academicSemister/academicSemester.interface";
import { userModel } from "./user.model";
import { IUser } from "./user.interface";
import { FacultyModel } from "../faculty/faculty.model";



const findLastStudentId = async () => {
    const lastStudent = await userModel.findOne({
        role: 'student',
    }, {
        id: 1,
        _id: 0
    }).sort({
        createdAt: -1
    }).lean()

    return lastStudent?.id ? lastStudent.id : undefined;

}
const generateStudentId = async (payLoad: IAcademicSemester) => {



    let currentId = await (0).toString();
    const lastStudentId = await findLastStudentId();

    const lastStudentYear = lastStudentId?.substring(0, 4)
    const lastStudentSemesterCode = lastStudentId?.substring(4, 6)
    const currentYear = payLoad.year;
    const currentCode = payLoad.code;

    if (lastStudentId && lastStudentSemesterCode === currentCode && lastStudentYear === currentYear) {
        currentId = lastStudentId.substring(6);
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');


    incrementId = `${payLoad.year}${payLoad.code}${incrementId}`

    return incrementId
}

// utils function for faculty 
const findLastFacultyId = async () => {
    const lastFaculty = await userModel.findOne({
        role: 'faculty',
    }, {
        id: 1,
        _id: 0
    }).sort({
        createdAt: -1
    }).lean()

    return lastFaculty?.id ? lastFaculty.id : undefined;
}

// 
const generateFacultyId = async () => {
    let currentId = await (0).toString();
    const lastFacultyId = await findLastFacultyId();
    if (lastFacultyId) {
        currentId = lastFacultyId.substring(5);
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');


    incrementId = `F-${incrementId}`
    console.log(incrementId);

    return incrementId
}

// admin id
const findLastAdminId = async () => {
    const lastFaculty = await userModel.findOne({
        role: 'admin',
    }, {
        id: 1,
        _id: 0
    }).sort({
        createdAt: -1
    }).lean()

    return lastFaculty?.id ? lastFaculty.id : undefined;
}
const generateAdminId = async () => {
    let currentId = await (0).toString();
    const lastFacultyId = await findLastAdminId();
    if (lastFacultyId) {
        currentId = lastFacultyId.substring(5);
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');


    incrementId = `A-${incrementId}`

    return incrementId
}
const userUtils = {
    generateStudentId,
    generateFacultyId,
    generateAdminId
}

export default userUtils;