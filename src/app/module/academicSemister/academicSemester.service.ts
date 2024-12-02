import sendResponse from "../../utils/sendResponse";
import { IAcademicSemester } from "./academicSemester.interface";
import { acamedicSemesterModel } from "./acamedicSemester.model";




const createAcademicSemesterIntoDB = async (payLoad: IAcademicSemester) => {

    const result = await acamedicSemesterModel.create(payLoad)

    return result;

}


export const academicSemesterServices = {
    createAcademicSemesterIntoDB
}