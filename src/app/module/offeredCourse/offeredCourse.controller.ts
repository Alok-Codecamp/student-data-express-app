import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { offeredcourseServices } from "./offeredCourse.service";




const createOfferedCourse = catchAsync(async (req, res) => {

    const result = await offeredcourseServices.createOfferedCourseIntoDb(req.body)

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Offered course created  successfully',
        data: result
    })

})



const getAllOfferedCourse = catchAsync(async (req, res) => {

    const result = await offeredcourseServices.getAllOfferedCourseIntoFromDb(req.query)

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Offered course is retrive successfully',
        data: result
    })
})

// controller function get single semester registration 

const getSingleOfferedCourse = catchAsync(async (req, res) => {

    const result = await offeredcourseServices.getSingleOfferedCourseFromDb(req.params.id);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Offered course is retrive successfully',
        data: result
    })
})

const updateOfferedCourse = catchAsync(async (req, res) => {

    const result = await offeredcourseServices.updateOfferedCourseIntoDb(req.params.id, req.body);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'semester registrations created  successfully',
        data: result
    })

})
export const offeredCourseController = {
    createOfferedCourse,
    getAllOfferedCourse,
    getSingleOfferedCourse,
    updateOfferedCourse

}