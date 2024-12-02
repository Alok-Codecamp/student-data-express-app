import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";




// controller function for create student
const createStudent = catchAsync(async (req, res, next) => {


    // create a schema validation with zod 
    const { password, student } = req.body;

    // const ZodParseData = studentZodSchema.parse(studentData)

    const result = await userServices.createStudentIntoDB(password, student);
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Student is created successfully',
        data: result
    })

})

export const userController = {
    createStudent,
}