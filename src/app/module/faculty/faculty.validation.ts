import { z } from 'zod';

const createFacultyValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20, 'password can not more than 20'),
        faculty: z.object({
            designation: z.string().optional(),

            name: z.object({
                firstName: z.string().min(2, 'First name is required'),
                lastName: z.string().min(2, 'Last name is required'),
                middleName: z.string().optional(),
            }).refine(data => data.firstName && data.lastName, 'First name and last name are required'),

            gender: z.enum(['male', 'female']),

            dateOfBirth: z.string().optional(),

            email: z.string().email('Invalid email format').min(1, 'Email is required'),

            contactNo: z.string().min(11, 'contact number must be 11 disit').max(11, 'contact number must be 11 disit'),

            emergencyContactNo: z.string().min(11, 'contact number must be 11 disit').max(11, 'contact number must be 11 disit'),

            bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
                .optional()
                .refine(value => value !== undefined, 'Blood group is required if specified'),

            presentAddress: z.string({
                required_error: 'Present address is required'
            }),

            permanentAddress: z.string({
                required_error: 'Present address is required'
            }),

            profileImage: z.string().url('Profile image URL must be valid').optional(),

            academicDepertment: z.string({
                required_error: 'Academic department reference is required'
            }),

            isDeleted: z.boolean().optional(),
        })
    })
});

const updateFacultyValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20, 'Password cannot be more than 20 characters').optional(),
        faculty: z.object({
            designation: z.string().optional(),

            name: z.object({
                firstName: z.string().min(2, 'First name is required').optional(),
                lastName: z.string().min(2, 'Last name is required').optional(),
                middleName: z.string().optional(),
            }).optional(),

            gender: z.enum(['male', 'female']).optional(),

            dateOfBirth: z.string().optional(),

            email: z.string().email('Invalid email format').optional(),

            contactNo: z.string()
                .min(11, 'Contact number must be 11 digits')
                .max(11, 'Contact number must be 11 digits')
                .optional(),

            emergencyContactNo: z.string()
                .min(11, 'Emergency contact number must be 11 digits')
                .max(11, 'Emergency contact number must be 11 digits')
                .optional(),

            bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),

            presentAddress: z.string({
                required_error: 'Present address is required',
            }).optional(),

            permanentAddress: z.string({
                required_error: 'Permanent address is required',
            }).optional(),

            profileImage: z.string().url('Profile image URL must be valid').optional(),

            academicDepertment: z.string({
                required_error: 'Academic department reference is required',
            }).optional(),

            isDeleted: z.boolean().optional(),
        }).optional(),
    }),
});





export const facultyValidations = {
    createFacultyValidationSchema,
    updateFacultyValidationSchema
}