import expresss from 'express';
import { userController } from "./user.controller";
import { studentValidations } from '../students/student.Zodvalidation';
import requestValidator from '../../middlewares/validateRequest.ts';
import { facultyValidations } from '../faculty/faculty.validation';
import { adminValidations } from '../admin/admin.validation';
import { authValidator } from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { userValidationSchema } from './user.validation';
import { upload } from '../../utils/uploadImage';
import parseRequestBody from '../../middlewares/parseRequestBody';




const router = expresss.Router();

// route for create admin
router.post('/create-admin', authValidator(USER_ROLE.superAdmin), upload.single('file'),
    parseRequestBody(),
    requestValidator(adminValidations.adminZodValidationSchema),
    userController.createAdmin);


router.post('/create-faculty', authValidator(USER_ROLE.admin, USER_ROLE.superAdmin),
    upload.single('file'),
    parseRequestBody(),
    requestValidator(facultyValidations.createFacultyValidationSchema), userController.createFaculty);

// router for create student 
router.post('/create-student', authValidator(USER_ROLE.admin),
    upload.single('file'),
    parseRequestBody(),
    requestValidator(studentValidations.createStudentValidationSchema),
    userController.createStudent);

// route for create faculty


// change status route
router.post('/change-status', authValidator(USER_ROLE.superAdmin, USER_ROLE.admin,), requestValidator(userValidationSchema.changeStatusValidationSchema), userController.changeStatus);


// /me route
router.get('/me', authValidator(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student), userController.getMe);




export const userRoutes = router;