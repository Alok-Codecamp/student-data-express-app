import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { academicSemesterServices } from "./academicSemester.service";




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

export const academicSemesterController = {
    createAcademicSemester,
}