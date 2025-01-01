import { Router } from "express";
import requestValidator from "../../middlewares/validateRequest.ts";
import { enrolledCourseValidations } from "./enroledCourse.validation";
import { enrolledCourseController } from "./enrolledCourse.controller";
import { authValidator } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";






const router = Router();

router.post('/create-enrolled-course',
    authValidator(USER_ROLE.student),
    requestValidator(enrolledCourseValidations.createEnroledCourseValidationSchema), enrolledCourseController.createEnrolledCourse)

router.patch('/update-enrolled-course', authValidator(USER_ROLE.faculty), requestValidator(enrolledCourseValidations.updateEnrolledCourseMarksValidationSchema), enrolledCourseController.updateEnrolledCourseMarks)

export const enrolledCourseRoutes = router;