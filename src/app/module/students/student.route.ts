import express from 'express';
import { StudentController } from './student.controller';
import requestValidator from '../../middlewares/validateRequest.ts';
import { studentValidations } from './student.Zodvalidation';
import { authValidator } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', authValidator(USER_ROLE.superAdmin, USER_ROLE.admin), StudentController.getAllStudents)

router.get('/:studentId', authValidator(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty), StudentController.getSingleStudent)



router.delete('/:studentId', authValidator(USER_ROLE.superAdmin, USER_ROLE.admin), StudentController.deleteStudent)

router.patch('/:studentId', requestValidator(studentValidations.updateStudentValidationSchema), StudentController.updateStudent)


export const StudentRoutes = router;