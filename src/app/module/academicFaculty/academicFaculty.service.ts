import { ObjectId } from "mongoose";
import { IAcademicFaculty } from "./academicFacultty.interface";
import { AcademicFacultyModel } from "./academicFaculty.model";


// service for create Faculty Data in in Db
const createAcademicFacultyIntoDB = async (FacultyData: IAcademicFaculty) => {

    const createdFacultyData = await AcademicFacultyModel.create(FacultyData);

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