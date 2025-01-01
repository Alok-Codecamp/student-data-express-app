import { z } from 'zod';
import { weekDays } from './offeredCourse.constant';

const timeStringSchema = z.string({ required_error: "Start time is required" }).regex(/^(?:[01]?\d|2[0-4]):[0-5]?\d$/, "Invalid time format (HH:MM)")

const createOfferedCourseValidationSchema = z.object({
    body: z.object({
        semesterRegistration: z.string({ required_error: "Semester registration ID is required" }).regex(/^[a-f\d]{24}$/, "Invalid ObjectId"),
        academicFaculty: z.string({ required_error: "Academic faculty ID is required" }).regex(/^[a-f\d]{24}$/, "Invalid ObjectId"),
        academicDepertment: z.string({ required_error: "Academic department ID is required" }).regex(/^[a-f\d]{24}$/, "Invalid ObjectId"),
        course: z.string({ required_error: "Course ID is required" }).regex(/^[a-f\d]{24}$/, "Invalid ObjectId"),
        faculty: z.string({ required_error: "Faculty ID is required" }).regex(/^[a-f\d]{24}$/, "Invalid ObjectId"),
        maxCapacity: z.number({ required_error: "Max capacity is required" }).int().positive("Max capacity must be a positive integer"),
        section: z.number({ required_error: "Section is required" }).int().positive("Section must be a positive integer"),
        days: z.array(z.enum([...weekDays
        ] as [string, ...string[]], { required_error: "Days must be a valid day of the week" })),
        startTime: timeStringSchema,
        endTime: timeStringSchema,
    }).refine((body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);

        const end = new Date(`1970-01-01T${body.endTime}:00`)

        return end > start
    }, { message: 'end time less then start time!' })
})


const updateOfferedCourseValidationSchema = z.object({
    body: z.object({
        faculty: z.string(),
        maxCapacity: z.string(),
        days: z.array(z.enum([...weekDays
        ] as [string, ...string[]], { required_error: "Days must be a valid day of the week" })),
        startTime: timeStringSchema,
        endTime: timeStringSchema,

    }).refine((body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);

        const end = new Date(`1970-01-01T${body.endTime}:00`)

        return end > start
    }, { message: 'end time less then start time!' })
})


export const offeredCourseValidations = {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema
}