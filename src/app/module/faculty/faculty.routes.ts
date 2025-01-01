import { Router } from "express";
import { facultyController } from "./faculty.controller";
import requestValidator from "../../middlewares/validateRequest.ts";
import { facultyValidations } from "./faculty.validation";
import { authValidator } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";


const router = Router();

// get all faculty
router.get('/', authValidator(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty), facultyController.getAllFaculties);

//route for get faculty by id
router.get('/:id', facultyController.getSingleFaculty);

//route for get faculty by id
router.patch('/:id', authValidator(USER_ROLE.superAdmin, USER_ROLE.admin), requestValidator(facultyValidations.updateFacultyValidationSchema), facultyController.updateFaculty);

router.put('/:id', authValidator(USER_ROLE.superAdmin, USER_ROLE.admin), facultyController.deleteFaculty);



export const facultyRoutes = router;