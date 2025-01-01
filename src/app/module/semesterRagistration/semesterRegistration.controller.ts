import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { semesterRagistrationServices } from "./semesterRagistration.service";

import httpStatus from "http-status";




const createSemesterRegistration = catchAsync(async (req, res) => {

    const result = await semesterRagistrationServices.createSemesterRegistrationIntoDb(req.body);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'semester registrations created  successfully',
        data: result
    })

})


const getAllSemester = catchAsync(async (req, res) => {

    const result = await semesterRagistrationServices.getAllSemesterRegistrationFromDb(req.query);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'semester registrations is retrive successfully',
        data: result
    })
})

// controller function get single semester registration 

const getSingleSemester = catchAsync(async (req, res) => {

    const result = await semesterRagistrationServices.getSingleSemesterRegistrationFromDb(req.params.id);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'semester registration is retrive successfully',
        data: result
    })
})

const updateSemesterRegistration = catchAsync(async (req, res) => {

    const result = await semesterRagistrationServices.updateSemesterRegistrationIntoDb(req.params.id, req.body);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'semester registrations created  successfully',
        data: result
    })

})
export const semesterRegistrationController = {
    createSemesterRegistration,
    getAllSemester,
    getSingleSemester,
    updateSemesterRegistration,

}