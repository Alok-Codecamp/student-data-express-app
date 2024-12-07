import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { academicFaculttyServices } from "./academicFaculty.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";



// controller function for create academic faculty
const createAcademicFaculty = catchAsync(async (req: Request, res: Response, next) => {

    const facultyData = req.body;

    const createdFacultyData = await academicFaculttyServices.createAcademicFacultyIntoDB(facultyData);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Academic semester created successfully',
        data: facultyData
    })

})

// get all academic faculty data

const getAllAcademicFaculty = catchAsync(async (req: Request, res: Response, next) => {


    const allFacultyData = await academicFaculttyServices.getAllAcademicFacultyFromDB();

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty retrive successfully',
        data: allFacultyData
    })

})

// controller for get single academic faculty

const getSingleAcademicFaculty = catchAsync(async (req: Request, res: Response, next) => {

    const { facultyId } = req.params;
    // console.log(facultyId);


    // @ts-ignore
    const facultyData = await academicFaculttyServices.getSingleAcademicFacultyFromDB(facultyId);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Academic faculty retrive successfully',
        data: facultyData
    })

})

// controller for update faculty data 

const updateAcademicFaculty = catchAsync(async (req: Request, res: Response, next) => {

    const { facultyId } = req.params;
    const facultyData = req.body;

    // @ts-ignore
    const updatedFacultyData = await academicFaculttyServices.updateAcademicFacultyIntoDB(facultyId, facultyData);
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty updated successfully',
        data: updatedFacultyData
    })
})


export const academicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}