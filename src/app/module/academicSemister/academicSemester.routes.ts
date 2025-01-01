import Router from 'express'
import { academicSemesterController } from './academicSemester.controller';
import requestValidator from '../../middlewares/validateRequest.ts';
import academicSemesterValidationSchema from './academicSemester.validation';
import { authValidator } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';


const router = Router();

router.post('/create-academic-emester', authValidator(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty), requestValidator(academicSemesterValidationSchema), academicSemesterController.createAcademicSemester);

router.patch('/:semesterId', authValidator(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty), academicSemesterController.updateAcademicSemester);



router.get('/', authValidator(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty), academicSemesterController.getAllAcademicSemester);

router.get('/:semesterId', authValidator(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty), academicSemesterController.getSingleAcademicSemester);








export const AcademicSemesterRoutes = router;