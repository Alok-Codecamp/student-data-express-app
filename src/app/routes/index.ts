import { Router } from "express"
import { StudentRoutes } from "../module/students/student.route";
import { userRoutes } from "../module/user/user.routes";
import path from "path";
import { AcademicSemesterRoutes } from "../module/academicSemister/academicSemester.routes";


const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/students',
        route: StudentRoutes
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))











export default router;