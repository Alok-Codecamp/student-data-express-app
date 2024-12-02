import { z } from "zod";


const userZodSchema = z.object({
    password: z.string({
        required_error: 'Password must be string'
    }).max(20, { message: 'Password can not be more than 20 charecters' }).optional(),
    isDeleted: z.boolean().default(false)
})

export const userValidationSchema = {
    userZodSchema
}