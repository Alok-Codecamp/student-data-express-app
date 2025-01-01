import { Router } from "express";
import { adminController } from "./admin.controller";
import requestValidator from "../../middlewares/validateRequest.ts";
import { adminValidations } from "./admin.validation";
import { authValidator } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";


const router = Router();

router.get('/', authValidator(USER_ROLE.admin), adminController.getAdmin);

router.get('/:id', authValidator(USER_ROLE.admin), adminController.getSingleAdmin);

//update admin route
router.patch('/:id', authValidator(USER_ROLE.admin), requestValidator(adminValidations.updateAdminZodValidationSchema), adminController.updateAdmin);

// delete admin route
router.put('/:id', authValidator(USER_ROLE.admin), adminController.deleteAdmin);



export const adminRoutes = router;