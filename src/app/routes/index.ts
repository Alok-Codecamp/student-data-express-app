import { Router } from "express"
import { StudentRoutes } from "../module/students/student.route";
import { userRoutes } from "../module/user/user.routes";
import path from "path";
import { AcademicSemesterRoutes } from "../module/academicSemister/academicSemester.routes";
import { academicFacultyRoutes } from "../module/academicFaculty/academicFaculty.routes";
import academicDepertmentRoutes from "../module/academicDepertment/academicDepertment.routes";


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
    },
    {
        path: '/academic-faculties',
        route: academicFacultyRoutes
    },
    {
        path: '/academic-depertments',
        route: academicDepertmentRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))











export default router;