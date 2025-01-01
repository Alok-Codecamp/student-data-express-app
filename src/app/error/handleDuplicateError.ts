import mongoose, { Error } from "mongoose";
import { TErrorSources, TGenericError } from "../interface/error";


const handleDuplicateError = (err: any): TGenericError => {
    const errorSources: TErrorSources = [{
        path: "duplicate",
        message: err.errmsg
    }
    ]


    const statusCode = 400;
    return {
        statusCode,
        message: 'duplicateId',
        errorSources
    }
}


export default handleDuplicateError;