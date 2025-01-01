import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { facultyServices } from "./faculty.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";




const getAllFaculties = catchAsync(async (req: Request, res: Response, next) => {

    console.log(req.cookies);


    const result = await facultyServices.getAllFacultiesFromDb(req.query);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Faculty is retrive successfully',
        data: result
    })
})

//controller fucntion for get faculty by id

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;


    const result = await facultyServices.getSingleFacultyFromDb(id)

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Faculty is retrive successfully',
        data: result
    })

})


//controller service for update faculty data
const updateFaculty = catchAsync(async (req: Request, res: Response) => {

    const facultyId = req.params.facultyId;
    const facultyData = req.body;
    const result = await facultyServices.updateFacultyIntoDb(facultyId, facultyData)

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Faculty is updated successfully',
        data: result
    })

})


// controller function for delete faculty 
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {

    const result = await facultyServices.deleteFAcultyFromDb(req.params.id)

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Faculty is deleted successfully',
        data: result
    })

})

export const facultyController = {
    getAllFaculties,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty,
}