import httpStatus from "http-status";
import { IAcademicFaculty } from "./academicFacultty.interface";
import { AcademicFacultyModel } from "./academicFaculty.model";
import AppError from "../../middlewares/errorSuperClass";


// service for create Faculty Data in in Db
const createAcademicFacultyIntoDB = async (academicFacultyData: IAcademicFaculty) => {
    const isAcademicFacultyExists = await AcademicFacultyModel.findOne({ name: academicFacultyData.name }).select('_id');

    if (isAcademicFacultyExists) {
        throw new AppError(httpStatus.CONFLICT, 'Academic faculty already exists!!')
    }

    const createdFacultyData = await AcademicFacultyModel.create(academicFacultyData);

    return createdFacultyData;
}

// get all Academic Faculty into DB

const getAllAcademicFacultyFromDB = async () => {

    const allFacultyData = await AcademicFacultyModel.find();

    return allFacultyData;
}

// service get single faculty data 
const getSingleAcademicFacultyFromDB = async (facultyId: string) => {

    if (!facultyId) {
        throw new Error('Please provided an Correct Academic Faculty Id')
    }
    const SingleFacultyData = await AcademicFacultyModel.findOne({ _id: facultyId })

    return SingleFacultyData;
}


// service function for update faculty data

const updateAcademicFacultyIntoDB = async (facultyId: string, facultyData: Partial<IAcademicFaculty>) => {
    console.log(facultyData, facultyId
    );

    if (!facultyId) {
        throw new Error('Please provided an Correct Academic Faculty Id')
    }
    const updatedFacultyData = await AcademicFacultyModel.findOneAndUpdate({ _id: facultyId }, { $set: facultyData }, { new: true });

    return updatedFacultyData;
}



export const academicFaculttyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultyFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB,
}