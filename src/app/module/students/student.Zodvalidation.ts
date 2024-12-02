import { z } from "zod";

// UserName Schema
const userNameValidationSchema = z.object({
    firstName: z.string().trim().min(1, "First name is required").max(20, "first name not more then 20 charecters"),
    middleName: z.string().trim().optional(),
    lastName: z.string().trim().min(1, "Last name is required"),
});

// Guardian Schema
const guardianValidationSchema = z.object({
    fatherName: z.string().min(1, "Father's name is required"),
    fatherOccupation: z.string().min(1, "Father's occupation is required"),
    fatherContactNo: z.string().min(1, "Father's contact number is required"),
    motherName: z.string().min(1, "Mother's name is required"),
    motherOccupation: z.string().optional(),
    motherContactNo: z.string().min(1, "Mother's contact number is required"),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
    localGuardianName: z.string().min(1, "Local guardian's name is required"),
    localGuardianOccupation: z
        .string()
        .min(1, "Local guardian's occupation is required"),
    localGuardianContactNo: z
        .string()
        .min(1, "Local guardian's contact number is required"),
});

// Student Schema
const createStudentValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20, 'password can not more than 20'),
        student: z.object({
            name: userNameValidationSchema,
            gender: z
                .enum(["male", "female", "other"], {
                    errorMap: () => ({ message: "Gender must be male, female, or other" }),
                }),
            dateOfBirth: z.string().min(1, "Date of birth is required"), // You can use z.date() if you want stricter validation
            email: z
                .string()
                .email("Invalid email format")
                .min(1, "Email is required"),
            contactNumber: z.string().min(1, "Contact number is required"),
            emergencyContactNo: z.string().min(1, "Emergency contact number is required"),
            bloodGroup: z
                .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
                .optional(),
            presentAddress: z.string().min(1, "Present address is required"),
            permanentAddress: z.string().min(1, "Permanent address is required"),
            guardian: guardianValidationSchema,
            localGuardian: localGuardianValidationSchema,
            avatar: z.string().url("Avatar must be a valid URL").optional(),
        })
    })
});

export const studentValidations = {
    createStudentValidationSchema,
}
