import { ObjectId } from "mongoose";
import sendResponse from "../../utils/sendResponse";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import { academicSemesterModel } from "./acamedicSemester.model";




const createAcademicSemesterIntoDB = async (payLoad: IAcademicSemester) => {


    if (academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code) {
        throw new Error(`Semester name and Code does not match. semester code should be  Autumn: 01, Summar: 02, Fall: 03 `)
    }
    const result = await academicSemesterModel.create(payLoad)

    return result;

}



const getAllAcademicSemesterFromDB = async () => {
    const result = await academicSemesterModel.find();
    return result
}
const getSingleAcademicSemesterFromDb = async (paramId: string) => {
    const result = await academicSemesterModel.findById(paramId);
    return result
}
// service for get academic semester by id


const updateAcademicSemesterInDB = async (id: string, updateData: Partial<IAcademicSemester>) => {

    const updatedData = await academicSemesterModel.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true })
    return updatedData
}


export const academicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDB,
    getSingleAcademicSemesterFromDb,
    updateAcademicSemesterInDB

}