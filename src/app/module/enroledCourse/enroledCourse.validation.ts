import z from 'zod';



const createEnroledCourseValidationSchema = z.object({
    body: z.object({
        offeredCourse: z.string()
    })
})

const updateEnrolledCourseMarksValidationSchema = z.object({
    body: z.object({
        semesterRegistration: z.string().optional(),
        offeredCourse: z.string().optional(),
        student: z.string().optional(),
        courseMarks: z.object({
            classTest1: z.number().optional(),
            midTerm: z.number().optional(),
            classTest2: z.number().optional(),
            finalTerm: z.number().optional(),
        })
    })
})

export const enrolledCourseValidations = {
    createEnroledCourseValidationSchema,
    updateEnrolledCourseMarksValidationSchema
}