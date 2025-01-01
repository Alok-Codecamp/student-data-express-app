import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";


// define a higher order function catchAsync




const getAllStudents = catchAsync(async (req, res, next) => {

    console.log(req.user);


    const result = await StudentServices.getAllStudentsFromDB(req.query);

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

// controller function for update student 

const updateStudent = catchAsync(async (req, res, next) => {

    const { studentId } = req.params;
    const { student } = req.body;


    const result = await StudentServices.updateStudentIntoDB(studentId, student)
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'student updated successfully',
        data: result
    })

})



export const StudentController = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
    updateStudent
}