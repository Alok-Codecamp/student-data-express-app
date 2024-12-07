import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { academicSemesterServices } from "./academicSemester.service";
import { acamedicSemesterModel } from "./acamedicSemester.model";




// controller function for create student
const createAcademicSemester = catchAsync(async (req, res, next) => {

    const result = await academicSemesterServices.createAcademicSemesterIntoDB(req.body);
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Academic semester is created successfully',
        data: result
    })

})

// controller for get all academic semester
const getAllAcademicSemester = catchAsync(async (req, res, next) => {

    const result = await academicSemesterServices.getAllAcademicSemesterFromDB();
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Academic semester is created successfully',
        data: result
    })

})

// controller find academic semester by id 
const getSingleAcademicSemester = catchAsync(async (req, res, next) => {

    const { semesterId } = req.params;
    // console.log(id);

    const result = await academicSemesterServices.getSingleAcademicSemesterFromDb(semesterId);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Academic semester retrive successfully',
        data: result
    })

})

// controller for update academic semester data

const updateAcademicSemester = catchAsync(async (req, res, next) => {

    const { semesterId } = req.params;
    const updateableData = req.body;
    // console.log(id);

    const result = await academicSemesterServices.updateAcademicSemesterInDB(semesterId, updateableData);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Academic semester retrive successfully',
        data: result
    })

})

export const academicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemester,
    getSingleAcademicSemester,
    updateAcademicSemester,
}