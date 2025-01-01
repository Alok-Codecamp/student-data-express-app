import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { adminServices } from "./admin.service";
import httpStatus from "http-status";

const getAdmin = catchAsync(async (req, res) => {

    const result = await adminServices.getAdminFromDb(req.query);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'admin is retrive successfully',
        data: result
    })

})

const getSingleAdmin = catchAsync(async (req, res) => {

    const { id } = req.params;


    const result = await adminServices.getSingleAdminFromDb(id)
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'admin is retrive successfully',
        data: result
    })
})


// controller function for updated admin

const updateAdmin = catchAsync(async (req, res) => {
    const { id } = req.params;
    const adminData = req.body;

    const result = await adminServices.updateAdminIntoDb(id, adminData);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'admin is retrive successfully',
        data: result
    })

})

const deleteAdmin = catchAsync(async (req, res) => {
    const { id } = req.params;


    const result = await adminServices.deleteAdminFromDb(id);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'admin is deleted successfully',
        data: result
    })

})
export const adminController = {
    getAdmin,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin
}