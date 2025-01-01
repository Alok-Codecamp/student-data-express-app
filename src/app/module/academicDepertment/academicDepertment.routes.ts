import { Router } from "express";
import { academicDepertmentValidation } from "./academicDepertment.validation";
import requestValidator from "../../middlewares/validateRequest.ts";
import { academicDepertmentController } from "./academicDepertment.controller";
import { authValidations } from "../auth/auth.validation";
import { authValidator } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";



const router = Router();

// router for create academic depertment
router.post('/create-academic-depertment', authValidator(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty), requestValidator(academicDepertmentValidation.CreateacademicDepertmentValidationSchema), academicDepertmentController.createAcademicDepertment)

// router for get all academic depertment
router.get('/', academicDepertmentController.getAllAcademicDepertment)

// router for get single academic depertment
router.get('/:depertmentId', academicDepertmentController.getSingleAcademicDepertment)

// router for create academic depertment
router.patch('/:depertmentId', requestValidator(academicDepertmentValidation.updateacademicDepertmentValidationSchema), academicDepertmentController.updateAcademicDepertment)

const academicDepertmentRoutes = router;

export default academicDepertmentRoutes;