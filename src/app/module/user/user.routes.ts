import expresss, { NextFunction, Request, Response } from 'express';
import { userController } from "./user.controller";
import { AnyZodObject } from 'zod';
import { studentValidations } from '../students/student.Zodvalidation';
import studentValidator from '../../middlewares/validateRequest.ts';
import requestValidator from '../../middlewares/validateRequest.ts';




const router = expresss.Router();





router.post('/create-student', requestValidator(studentValidations.createStudentValidationSchema), userController.createStudent);


export const userRoutes = router;