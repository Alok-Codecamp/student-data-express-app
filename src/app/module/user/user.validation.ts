import { z } from "zod";
import { userStatus } from "./user.constant";


const userZodSchema = z.object({
    password: z.string({
        required_error: 'Password must be string'
    }).max(20, { message: 'Password can not be more than 20 charecters' }).optional(),
    isDeleted: z.boolean().default(false)
})

const changeStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum([...userStatus] as [string, ...string[]])
    })
})

export const userValidationSchema = {
    userZodSchema,
    changeStatusValidationSchema,
}