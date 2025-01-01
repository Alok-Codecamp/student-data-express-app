import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseServices } from "./course.service";
import httpStatus from "http-status";
// controller function for create course
const createCourse = catchAsync(async (req, res) => {

    const courseData = req.body;

    const result = await courseServices.createCourseIntoDb(courseData);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'course created successfully',
        data: result
    })
})

// controller function for get all courses

const getAllCourse = catchAsync(async (req, res) => {


    const result = await courseServices.getAllCoursesFromDb(req.query);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'course retrive successfully',
        data: result
    })
})

// controller function for get single course 

const getSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await courseServices.getSingleCoursesFromDb(id);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'course retrive successfully',
        data: result
    })

})

// controller function for delete course 

const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await courseServices.deleteCourseFromDb(id);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'course retrive successfully',
        data: result
    })

})
const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await courseServices.updateCourseIntoDb(id, req.body)

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'course is updated successfully successfully',
        data: result
    })

})

// controller function for maintain course faculty
const assignFacultiesWithCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    console.log(req.body);

    const result = await courseServices.assignFacultiesWithCourseIntoDb(courseId, req.body.faculties)

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'course faculty assign successfully',
        data: result
    })

})

// controller function for remove faculty 
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;


    const result = await courseServices.removeFacultiesFromCourseFromDb(courseId, req.body.faculties)

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Faculties rmove successfully',
        data: result
    })

})



export const coursecontroller = {
    createCourse,
    getAllCourse,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    assignFacultiesWithCourse,
    removeFacultiesFromCourse
}