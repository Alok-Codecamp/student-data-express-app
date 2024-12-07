import Router from 'express'
import { academicSemesterController } from './academicSemester.controller';
import requestValidator from '../../middlewares/validateRequest.ts';
import academicSemesterValidationSchema from './academicSemester.validation';


const router = Router();


router.get('/', academicSemesterController.getAllAcademicSemester);

router.get('/:semesterId', academicSemesterController.getSingleAcademicSemester);

router.patch('/:semesterId', academicSemesterController.updateAcademicSemester);

router.post('/create-academic-emester', requestValidator(academicSemesterValidationSchema), academicSemesterController.createAcademicSemester)




export const AcademicSemesterRoutes = router;