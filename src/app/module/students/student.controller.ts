import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";


// define a higher order function catchAsync




const getAllStudents = catchAsync(async (req, res, next) => {

    const result = await StudentServices.getAllStudentsFromDB();

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'student is retrive successfully',
        data: result
    })

})

const getSingleStudent = catchAsync(async (req, res, next) => {

    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentsFromDB(studentId)

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'student is retrive successfully',
        data: result
    })

})

const deleteStudent = catchAsync(async (req, res, next) => {

    const { studentId } = req.params;

    const result = await StudentServices.deleteStudentsFromDB(studentId)
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'student deleted successfully',
        data: result
    })

})


export const StudentController = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
}