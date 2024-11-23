"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// UserName Schema
const userNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().trim().min(1, "First name is required").max(20, "first name not more then 20 charecters"),
    middleName: zod_1.z.string().trim().optional(),
    lastName: zod_1.z.string().trim().min(1, "Last name is required"),
});
// Guardian Schema
const guardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().min(1, "Father's name is required"),
    fatherOccupation: zod_1.z.string().min(1, "Father's occupation is required"),
    fatherContactNo: zod_1.z.string().min(1, "Father's contact number is required"),
    motherName: zod_1.z.string().min(1, "Mother's name is required"),
    motherOccupation: zod_1.z.string().optional(),
    motherContactNo: zod_1.z.string().min(1, "Mother's contact number is required"),
});
// Local Guardian Schema
const localGuardianValidationSchema = zod_1.z.object({
    localGuardianName: zod_1.z.string().min(1, "Local guardian's name is required"),
    localGuardianOccupation: zod_1.z
        .string()
        .min(1, "Local guardian's occupation is required"),
    localGuardianContactNo: zod_1.z
        .string()
        .min(1, "Local guardian's contact number is required"),
});
// Student Schema
const studentZodSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, "ID is required").uuid("ID must be a valid UUID"), // UUID for stricter validation
    password: zod_1.z.string().max(20, 'password can not more than 20'),
    name: userNameValidationSchema,
    gender: zod_1.z
        .enum(["male", "female", "other"], {
        errorMap: () => ({ message: "Gender must be male, female, or other" }),
    }),
    dateOfBirth: zod_1.z.string().min(1, "Date of birth is required"), // You can use z.date() if you want stricter validation
    email: zod_1.z
        .string()
        .email("Invalid email format")
        .min(1, "Email is required"),
    contactNumber: zod_1.z.string().min(1, "Contact number is required"),
    emergencyContactNo: zod_1.z.string().min(1, "Emergency contact number is required"),
    bloodGroup: zod_1.z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
    presentAddress: zod_1.z.string().min(1, "Present address is required"),
    permanentAddress: zod_1.z.string().min(1, "Permanent address is required"),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    avatar: zod_1.z.string().url("Avatar must be a valid URL").optional(),
    isActive: zod_1.z.enum(["active", "inActive"]).default("active"),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.default = studentZodSchema;
