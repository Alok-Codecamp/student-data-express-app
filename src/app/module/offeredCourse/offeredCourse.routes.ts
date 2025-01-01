import { Router } from "express";
import requestValidator from "../../middlewares/validateRequest.ts";
import { offeredCourseValidations } from "./offeredCourse.validation";
import { offeredCourseController } from "./offeredCourse.controller";
import { authValidator } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";



const router = Router();


router.post('/create-offered-course', authValidator(USER_ROLE.admin), requestValidator(offeredCourseValidations.createOfferedCourseValidationSchema), offeredCourseController.createOfferedCourse)

router.get('/', offeredCourseController.getAllOfferedCourse)

router.get('/:id', offeredCourseController.getSingleOfferedCourse)

router.patch('/:id', authValidator(USER_ROLE.admin), requestValidator(offeredCourseValidations.updateOfferedCourseValidationSchema), offeredCourseController.updateOfferedCourse)


export const offeredCourseRoutes = router;