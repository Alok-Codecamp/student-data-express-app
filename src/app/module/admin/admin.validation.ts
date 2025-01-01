import { z } from 'zod';

const adminZodValidationSchema = z.object({
    body: z.object({
        password: z.string().optional(),
        admin: z.object({

            designation: z.string(),
            name: z.object({
                firstName: z.string(),
                lastName: z.string(),
            }),
            gender: z.enum(['male', 'female'])
                .refine((val) => val !== undefined, { message: 'Gender must be male, female, or other' }),
            dateOfBirth: z.string(),
            email: z.string().email("Invalid email format"),
            contactNo: z.string(),
            emergencyContactNo: z.string(),
            bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
                .refine((val) => val !== undefined, { message: 'Invalid blood group' }),
            presentAddress: z.string(),
            permanentAddress: z.string(),
            profileImage: z.string().optional(),
            isDeleted: z.boolean().default(false)
        })
    })

});

const updateAdminZodValidationSchema = z.object({
    body: z.object({
        password: z.string().optional(),
        admin: z.object({
            designation: z.string().optional(),
            name: z.object({
                firstName: z.string().optional(),
                lastName: z.string().optional(),
            }).optional(),
            gender: z.enum(['male', 'female']).optional(),
            dateOfBirth: z.string().optional(),
            email: z.string().email("Invalid email format").optional(),
            contactNo: z.string().optional(),
            emergencyContactNo: z.string().optional(),
            bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
            presentAddress: z.string().optional(),
            permanentAddress: z.string().optional(),
            profileImage: z.string().optional(),
            isDeleted: z.boolean().optional()
        }).optional()
    })
});

export const adminValidations = {
    adminZodValidationSchema,
    updateAdminZodValidationSchema
}