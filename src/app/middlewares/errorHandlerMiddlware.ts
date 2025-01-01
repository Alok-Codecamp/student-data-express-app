import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../interface/error";
import config from "../config";
import handleZodError from "../error/handleZodError";
import handleMongooseError from "../error/handleMongooseError";
import handleCastError from "../error/handleCastError";
import handleDuplicateError from "../error/handleDuplicateError";
import AppError from "./errorSuperClass";



const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    let statusCode = err.statusCode || 500;
    let message = err.message || 'something went wrong';


    let errorSources: TErrorSources = [
        {
            path: 'custom',
            message: 'Something went wrong'
        }
    ]
    // console.log(err);

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err.name === 'ValidationError') {

        const simplifiedError = handleMongooseError(err);

        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;

    } else if (err.name === "CastError") {

        const simplifiedError = handleCastError(err);

        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;

    } else if (err.code === 11000) {
        console.log('log from duplicate id error ', err.code);

        const simplifiedError = handleDuplicateError(err);

        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;

    }

    // handle AppError

    else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err.message;
        errorSources = [
            {
                path: 'App error ',
                message: err.message
            }
        ]

    }

    // handler for error

    else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: 'error ',
                message: err.message
            }
        ]

    }




    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        main: err,
        stack: config.NODE_ENV === 'development' ? err?.stack : null

    })



}

export default globalErrorHandler;