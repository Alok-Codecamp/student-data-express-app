import express from 'express';
import { StudentController } from './student.controller';
import requestValidator from '../../middlewares/validateRequest.ts';
import { studentValidations } from './student.Zodvalidation';

const router = express.Router();

router.get('/', StudentController.getAllStudents)

router.get('/:studentId', StudentController.getSingleStudent)



router.delete('/:studentId', StudentController.deleteStudent)

router.patch('/:studentId', requestValidator(studentValidations.updateStudentValidationSchema), StudentController.updateStudent)


export const StudentRoutes = router;