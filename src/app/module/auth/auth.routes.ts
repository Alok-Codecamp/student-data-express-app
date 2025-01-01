import { Router } from "express";
import requestValidator from "../../middlewares/validateRequest.ts";
import { authController } from "./auth.controller";
import { authValidations } from "./auth.validation";
import { USER_ROLE } from "../user/user.constant";
import { authValidator } from "../../middlewares/auth";


const router = Router();


// login route

router.post('/login', requestValidator(authValidations.loginValidationSchema
), authController.loginUser)

// change password route

router.patch('/change-password', authValidator(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.student), requestValidator(authValidations.changePasswordValidationSchema
), authController.changePassword)

router.post('/refresh-token', requestValidator(authValidations.refreshTokenValidationSchema), authController.refreshToken)

router.post('/forget-password', requestValidator(authValidations.forgetPasswordValidationSchema), authController.forgetPassword)

router.post('/reset-password', requestValidator(authValidations.resetPasswordValidationSchema), authController.forgetPassword)


export const authRoutes = router;