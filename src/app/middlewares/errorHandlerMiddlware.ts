import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error";
import config from "../config";



const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'something went wrong';


    let errorSources: TErrorSources = [
        {
            path: '',
            message: 'Something went wrong'
        }
    ]

    const handleZodError = (err: ZodError) => {

        const zodErrorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
            return {
                path: issue?.path[issue.path.length - 1],
                message: issue.message
            }
        })



        return {
            statusCode: 400,
            message: 'zod validation error',
            zodErrorSources
        }
    }


    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.zodErrorSources;
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.NODE_ENV === 'development' ? err?.stack : null

    })



}

export default globalErrorHandler;