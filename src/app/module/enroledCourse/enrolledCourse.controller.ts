import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { enrolledCourseService } from "./enrolledCourse.service";
import httpStatus from "http-status";











const createEnrolledCourse = catchAsync(async (req, res) => {

    const { userId } = req?.user;
    const result = await enrolledCourseService.createEnrolledCourseIntoDb(userId, req.body)

    return sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'semester registrations created  successfully',
        data: result
    })
})

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {

    const { userId } = req.user;


    const result = await enrolledCourseService.updateEnrolledCourseMarksIntoDb(userId, req.body)
    return sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'semester registrations created  successfully',
        data: result
    })
})

export const enrolledCourseController = {
    createEnrolledCourse,
    updateEnrolledCourseMarks
}