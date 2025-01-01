import { Router } from "express";
import requestValidator from "../../middlewares/validateRequest.ts";
import { semesterRegistrationValidations } from "./semesterRagistration.validation";
import { semesterRegistrationController } from "./semesterRegistration.controller";


const router = Router();


router.post('/create-semesterRegistration', requestValidator(semesterRegistrationValidations.createSemesterRegistrationValidationSchema), semesterRegistrationController.createSemesterRegistration)

router.get('/', semesterRegistrationController.getAllSemester)

router.get('/:id', semesterRegistrationController.getSingleSemester)

router.patch('/:id', requestValidator(semesterRegistrationValidations.updateSemesterRegistrationValidationSchema), semesterRegistrationController.updateSemesterRegistration)

export const semesterRegistrationRoutes = router;