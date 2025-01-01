import { Router } from "express";
import requestValidator from "../../middlewares/validateRequest.ts";
import { courseValidations } from "./course.validation";
import { coursecontroller } from "./course.controller";
import { authValidator } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";



const router = Router();

router.post('/create-course', authValidator(USER_ROLE.admin), requestValidator(courseValidations.createCourseValidationSchema), coursecontroller.createCourse)

// assign faculties

router.put('/:courseId/assign-faculties', coursecontroller.assignFacultiesWithCourse

)
router.delete('/:courseId/remove-faculties', coursecontroller.removeFacultiesFromCourse

)


router.get('/', coursecontroller.getAllCourse);

router.get('/:id', coursecontroller.getSingleCourse);

router.patch('/:id', requestValidator(courseValidations.updateCourseValidationsSchema), coursecontroller.updateCourse);

router.delete('/:id', coursecontroller.deleteCourse)



export const courseRoutes = router;