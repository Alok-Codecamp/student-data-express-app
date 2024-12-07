import z from 'zod';

const createAcademicFacultyValidation = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic faculty must be string'
        })
    })
})

//validation schema for update 
const updateAcademicFacultyValidation = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic faculty must be string'
        })
    })
})


export const academicFacultyValidationSchema = {
    createAcademicFacultyValidation,
    updateAcademicFacultyValidation
}