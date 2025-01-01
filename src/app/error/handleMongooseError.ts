import mongoose, { Error } from "mongoose";
import { TErrorSources, TGenericError } from "../interface/error";


const handleMongooseError = (err: Error.ValidationError): TGenericError => {
    const errorSources: TErrorSources = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: val.path,
            message: val.message
        }
    })
    const statusCode = 400;
    return {
        statusCode,
        message: 'mongoose validation error',
        errorSources
    }
}


export default handleMongooseError;