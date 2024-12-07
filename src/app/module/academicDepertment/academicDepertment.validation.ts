import z from 'zod'
import { academicFacultyValidationSchema } from '../academicFaculty/academicFaculty.Validation'



const CreateacademicDepertmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic Depertment must be string',
            required_error: 'Name is required'
        }),
        academicFaculty: z.string({
            invalid_type_error: 'Academic Faculty must be string',
            required_error: 'Faculty is required'
        })
    })
})

// schema for update 
const updateacademicDepertmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic Depertment must be string',
            required_error: 'Name is required'
        }).optional(),
        academicFaculty: z.string({
            invalid_type_error: 'Academic Faculty must be string',
            required_error: 'Faculty is required'
        }).optional()
    })
})



export const academicDepertmentValidation = {
    CreateacademicDepertmentValidationSchema,
    updateacademicDepertmentValidationSchema
}
