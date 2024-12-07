import { IAcademicDepertment } from "./academicDepertment.interface";
import { AcademicDepertmentModel } from "./academicDepertment.model";



// service for create Academic depertment 
const createAcademicDepertmentIntoDb = async (payLoad: IAcademicDepertment) => {

    const result = await AcademicDepertmentModel.create(payLoad)

    return result
}

// service for get all Academic depertment 
const getAllAcademicDepertmentIntoDb = async () => {

    const result = await AcademicDepertmentModel.find().populate('academicFaculty');

    return result;
}

// service for get single Academic depertment 
const getSingleAcademicDepertmentIntoDb = async (academicDepertmentId: string) => {

    const result = await AcademicDepertmentModel.findById(academicDepertmentId).populate('academicFaculty');

    return result;
}

// service for update Academic depertment 


const updateAcademicDepertmentIntoDb = async (academicDepertmentId: string, payload: Partial<IAcademicDepertment>) => {

    const result = await AcademicDepertmentModel.findOneAndUpdate({ _id: academicDepertmentId }, { $set: payload }, { new: true }).populate('academicFaculty')

    return result;
}

export const academicDepertmentServices = {
    createAcademicDepertmentIntoDb,
    getAllAcademicDepertmentIntoDb,
    getSingleAcademicDepertmentIntoDb,
    updateAcademicDepertmentIntoDb
}