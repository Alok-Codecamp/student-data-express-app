import catchAsync from "../utils/catchAsync"
import { NextFunction, Request, Response } from "express"
import AppError from "./errorSuperClass"
import httpStatus from "http-status"
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config"
import { TUserRole } from "../module/user/user.interface"
import { userModel } from "../module/user/user.model"
import { Date } from "mongoose"



interface CustomRequest extends Request {
    user: JwtPayload
}
export const authValidator = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization as string

        // check if the token is valied
        if (!token) {
            throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Unauthorized user!')
        }


        const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

        const { userRole, userId, iat } = decoded;
        // console.log('from auth', decoded);

        // console.log(`the user id is : ${userId}`);

        const isUserExists = await userModel.isUserExistsByCustomId(userId);



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

        const isPasswordChange = await userModel.isJWTIssuedBeforePasswordChange(isUserExists.passwordChangeAt as Date, iat as number)

        if (isPasswordChange) {


            throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Unauthorized user!')
        }


        if (requiredRoles && !requiredRoles.includes(userRole)) {

            throw new AppError(httpStatus.NOT_ACCEPTABLE, `OH! You are not authorized. Required roles: ${requiredRoles.join(', ')}`)
        }
        req.user = decoded as JwtPayload;

        next()



    })
}