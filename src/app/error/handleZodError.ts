import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericError } from "../interface/error";



const handleZodError = (err: ZodError): TGenericError => {

    const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue.message
        }
    })




    return {
        statusCode: 400,
        message: 'zod validation error',
        errorSources
    }
}

export default handleZodError;