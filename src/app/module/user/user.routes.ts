import expresss from 'express';
import { userController } from "./user.controller";
import { studentValidations } from '../students/student.Zodvalidation';
import requestValidator from '../../middlewares/validateRequest.ts';




const router = expresss.Router();





router.post('/create-student', requestValidator(studentValidations.createStudentValidationSchema), userController.createStudent);


export const userRoutes = router;