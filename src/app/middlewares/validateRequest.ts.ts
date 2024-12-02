import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"




const requestValidator = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        //validation 


        try {
            await schema.parseAsync({

                body: req.body

            })
        } catch (err) {
            next(err)
        }



        next()
    }
}

export default requestValidator;