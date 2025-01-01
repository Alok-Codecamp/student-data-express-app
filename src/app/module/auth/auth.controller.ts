import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";
import httpStatus from "http-status";


const loginUser = catchAsync(async (req, res) => {

    const result = await authServices.loginUser(req.body)

    const { refreshToken, accessToken, needsPasswordChange } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
    })
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'sign in successfully',
        data: {
            accessToken,
            needsPasswordChange
        }
    })
})

const changePassword = catchAsync(async (req, res) => {

    const user = req.user;
    const { ...passwordData } = req.body;

    const result = await authServices.changePasswordIntoDb(user, passwordData);


    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'password change successfull',
        data: result
    })
})


const refreshToken = catchAsync(async (req, res) => {

    const { refreshToken } = req.cookies;
    const result = await authServices.refreshToken(refreshToken)

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Authentication successfully',
        data: result
    })
})


const forgetPassword = catchAsync(async (req, res) => {
    const userId = req.body.id;
    const result = await authServices.forgetPassword(userId);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Reset link is generated successfully',
        data: result
    })

})

const resetPassword = catchAsync(async (req, res) => {
    const token = req.headers.authorization
    const result = await authServices.resetPassword(req.body, token as string);

    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'password reset successfully',
        data: result
    })

})



export const authController = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword,
}