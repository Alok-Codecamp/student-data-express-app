import { Router } from "express";
import { academicFacultyController } from "./academicFaculty.controller";
import requestValidator from "../../middlewares/validateRequest.ts";
import { academicFacultyValidationSchema } from "./academicFaculty.Validation";
import { authValidator } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";




const router = Router();


router.post('/create-academic-faculty', authValidator(USER_ROLE.superAdmin, USER_ROLE.admin), requestValidator(academicFacultyValidationSchema.createAcademicFacultyValidation), academicFacultyController.createAcademicFaculty);

router.get('/', authValidator(USER_ROLE.superAdmin, USER_ROLE.admin), academicFacultyController.getAllAcademicFaculty);


router.get('/:facultyId', authValidator(USER_ROLE.superAdmin, USER_ROLE.admin), academicFacultyController.getSingleAcademicFaculty);


router.patch('/:facultyId', authValidator(USER_ROLE.superAdmin, USER_ROLE.admin), requestValidator(academicFacultyValidationSchema.updateAcademicFacultyValidation), academicFacultyController.updateAcademicFaculty)


export const academicFacultyRoutes = router;



