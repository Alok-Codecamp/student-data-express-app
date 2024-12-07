import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { academicDepertmentServices } from "./academicDepertment.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";



//controller for create academic depertment
const createAcademicDepertment = catchAsync(async (req: Request, res: Response, next) => {

    const depertmentData = req.body;

    const result = await academicDepertmentServices.createAcademicDepertmentIntoDb(depertmentData)

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Academic Depertment created successfully',
        data: result
    })

})

//controller for get academic depertment
const getAllAcademicDepertment = catchAsync(async (req: Request, res: Response, next) => {

    const result = await academicDepertmentServices.getAllAcademicDepertmentIntoDb();

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Academic Depertment retrive successfully',
        data: result
    })

})

//controller for get single academic depertment
const getSingleAcademicDepertment = catchAsync(async (req: Request, res: Response, next) => {

    const { depertmentId } = req.params;

    const result = await academicDepertmentServices.getSingleAcademicDepertmentIntoDb(depertmentId)

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Academic Depertment retrive successfully',
        data: result
    })

})

//controller for update academic depertment
const updateAcademicDepertment = catchAsync(async (req: Request, res: Response, next) => {

    const { depertmentId } = req.params;

    const depertmentData = req.body;

    const result = await academicDepertmentServices.updateAcademicDepertmentIntoDb(depertmentId, depertmentData)

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Academic Depertment updated successfully',
        data: result
    })

})


export const academicDepertmentController = {
    createAcademicDepertment,
    getAllAcademicDepertment,
    getSingleAcademicDepertment,
    updateAcademicDepertment
}