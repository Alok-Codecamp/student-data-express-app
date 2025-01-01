import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";




// controller function for create student
const createStudent = catchAsync(async (req, res, next) => {


    // create a schema validation with zod 
    const { password, student } = req.body;


    const result = await userServices.createStudentIntoDB(req.file, password, student);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Student is created successfully',
        data: result
    })

})
// controller function for create Faculty
const createFaculty = catchAsync(async (req, res, next) => {


    // create a schema validation with zod 
    const { password, faculty } = req.body;

    // const ZodParseData = studentZodSchema.parse(studentData)
    const result = await userServices.createFacultyInDB(req.file, password, faculty);


    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'faculty is created successfully',
        data: result
    })

})


const createAdmin = catchAsync(async (req, res, next) => {

    const { password, admin } = req.body;



    const result = await userServices.createAdminIntoDb(req.file, password, admin);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'admin is created successfully',
        data: result
    })




})


// controller function get me 

const getMe = catchAsync(async (req, res) => {

    const { userId, userRole } = req.user;

    const result = await userServices.getMeFromDb(userId, userRole)

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'User retrive successfully',
        data: result
    })

})

// controller function change user status

const changeStatus = catchAsync(async (req, res) => {

    const { id } = req.params;

    const result = await userServices.changeStatusIntoDb(id, req.body)


    return result
})


// export all controller function
export const userController = {
    createStudent,
    createFaculty,
    createAdmin,
    getMe,
    changeStatus,
}