import { Router } from "express";
import { academicFacultyController } from "./academicFaculty.controller";
import requestValidator from "../../middlewares/validateRequest.ts";
import { academicFacultyValidationSchema } from "./academicFaculty.Validation";




const router = Router();


router.post('/create-academic-faculty', requestValidator(academicFacultyValidationSchema.createAcademicFacultyValidation), academicFacultyController.createAcademicFaculty);

router.get('/', academicFacultyController.getAllAcademicFaculty);


router.get('/:facultyId', academicFacultyController.getSingleAcademicFaculty);


router.patch('/:facultyId', requestValidator(academicFacultyValidationSchema.updateAcademicFacultyValidation), academicFacultyController.updateAcademicFaculty)


export const academicFacultyRoutes = router;



