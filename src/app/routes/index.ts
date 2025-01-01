import { Router } from "express"
import { StudentRoutes } from "../module/students/student.route";
import { userRoutes } from "../module/user/user.routes";
import { AcademicSemesterRoutes } from "../module/academicSemister/academicSemester.routes";
import { academicFacultyRoutes } from "../module/academicFaculty/academicFaculty.routes";
import academicDepertmentRoutes from "../module/academicDepertment/academicDepertment.routes";
import { facultyRoutes } from "../module/faculty/faculty.routes";
import { adminRoutes } from "../module/admin/admin.routes";
import { courseRoutes } from "../module/course/course.routes";
import { semesterRegistrationRoutes } from "../module/semesterRagistration/semesterRegistration.routes";
import { offeredCourseRoutes } from "../module/offeredCourse/offeredCourse.routes";
import { authRoutes } from "../module/auth/auth.routes";
import { enrolledCourseRoutes } from "../module/enroledCourse/enrolledCourse.routes";



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
    },
    {
        path: '/faculties',
        route: facultyRoutes
    },
    {
        path: '/admins',
        route: adminRoutes
    },
    {
        path: '/courses',
        route: courseRoutes
    },
    {
        path: '/semester-registrations',
        route: semesterRegistrationRoutes
    },
    {
        path: '/offered-courses',
        route: offeredCourseRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/enrolled-courses',
        route: enrolledCourseRoutes
    }

]

moduleRoutes.forEach(route => router.use(route.path, route.route))


export default router;