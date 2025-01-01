import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

const parseRequestBody = () => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        req.body = JSON.parse(req.body.data);
        next();
    })
}



export default parseRequestBody;