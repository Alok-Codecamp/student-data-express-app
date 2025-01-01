import config from "../../config";
import AppError from "../../middlewares/errorSuperClass";
import { userModel } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from "./auth.utils";
import { log } from "console";
import { sendEmail } from "../../utils/sendEmail";



const loginUser = async (payload: ILoginUser) => {

    // check the use is exists.

    const isUserExists = await userModel.isUserExistsByCustomId(payload.id)
    console.log(isUserExists);

    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, `This user is not found !`)
    }

    const isDeleted = isUserExists.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, `This user is deleted !`)
    }

    const userStatus = isUserExists.status;

    if (userStatus === 'block') {
        throw new AppError(httpStatus.FORBIDDEN, `This user is blocked !`)
    }

    // checking if the password is correct

    const isPasswordMatched = await userModel.isPasswordMatched(payload.password, isUserExists.password)

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.FORBIDDEN, `user password doesn't match !`)
    }

    // ASSCESS granged: send accessToken, refreshToken
    const jwtPayload = {
        userId: isUserExists.id,
        userRole: isUserExists.role

    }

    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires as string)

    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expires as string)

    return {
        accessToken,
        refreshToken,
        needsPasswordChange: isUserExists?.needsPasswordChange
    }
}



const changePasswordIntoDb = async (user: JwtPayload, passwordData: { oldPassword: string, newPassword: string }) => {


    console.log('frm authservice ', user);
    const isUserExists = await userModel.isUserExistsByCustomId(user.userId)
    // console.log(isUserExists);

    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, `This user is not found !`)
    }

    const isDeleted = isUserExists.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, `This user is deleted !`)
    }

    const userStatus = isUserExists.status;

    if (userStatus === 'block') {
        throw new AppError(httpStatus.FORBIDDEN, `This user is blocked !`)
    }

    // checking if the password is correct

    const isPasswordMatched = await userModel.isPasswordMatched(passwordData.oldPassword, isUserExists?.password)

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.FORBIDDEN, `user password doesn't match !`)
    }


    const newHashedPassword = await bcrypt.hash(passwordData.newPassword, Number(config.bcrypt_salt_rounds))



    const result = await userModel.findOneAndUpdate({
        id: user.userId,
        role: user.role,
    }, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangeAt: new Date
    })

    return null;

}


const refreshToken = async (token: string) => {

    if (!token) {
        console.log('token invaled');

        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Unauthorized user!')
    }


    const decoded = jwt.verify(token, config.jwt_refresh_secret as string) as JwtPayload;

    const { role, userId, iat } = decoded;

    const isUserExists = await userModel.isUserExistsByCustomId(userId);
    console.log('is user ', isUserExists);


    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, `This user is not found !`)
    }

    const isDeleted = isUserExists?.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, `This user is deleted !`)
    }

    const userStatus = isUserExists?.status;

    if (userStatus === 'block') {
        throw new AppError(httpStatus.FORBIDDEN, `This user is blocked !`)
    }
    // if the token send from the client

    const isPasswordChange = await userModel.isJWTIssuedBeforePasswordChange(isUserExists.passwordChangeAt as any, iat as number)

    if (isPasswordChange) {


        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Unauthorized user!')
    }

    const jwtPayload = {
        userId: isUserExists.id,
        userRole: isUserExists.role

    }

    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires as string)
    return {
        accessToken
    }
}

const forgetPassword = async (userId: string) => {
    const isUserExists = await userModel.isUserExistsByCustomId(userId);
    console.log('is user ', isUserExists);


    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, `This user is not found !`)
    }

    const isDeleted = isUserExists?.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, `This user is deleted !`)
    }

    const userStatus = isUserExists?.status;

    if (userStatus === 'block') {
        throw new AppError(httpStatus.FORBIDDEN, `This user is blocked !`)
    }
    const jwtPayload = {
        userId: isUserExists.id,
        userRole: isUserExists.role

    }

    const resetToken = createToken(jwtPayload, config.jwt_access_secret as string, '10m')

    const resetUrl = `http://localhost:3000/api/v1?=${isUserExists.id}&token=${resetToken}`

    sendEmail(isUserExists.email, resetUrl);


}


const resetPassword = async (payload: { id: string, newPassword: string }, token: string) => {
    const isUserExists = await userModel.isUserExistsByCustomId(payload.id);
    console.log('is user ', isUserExists);


    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, `This user is not found !`)
    }

    const isDeleted = isUserExists?.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, `This user is deleted !`)
    }

    const userStatus = isUserExists?.status;

    if (userStatus === 'block') {
        throw new AppError(httpStatus.FORBIDDEN, `This user is blocked !`)
    }

    const decoded = verifyToken(token, config.jwt_access_secret as string)

    const { role, userId, iat } = decoded;

    if (userId !== payload.id) {
        throw new AppError(httpStatus.FORBIDDEN, 'You are fobidden!')
    }

    const newHashedPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds))

    const result = await userModel.findOneAndUpdate({
        id: userId,
        role: role,
    }, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangeAt: new Date
    })


}
export const authServices = {
    loginUser,
    changePasswordIntoDb,
    refreshToken,
    forgetPassword,
    resetPassword,
}