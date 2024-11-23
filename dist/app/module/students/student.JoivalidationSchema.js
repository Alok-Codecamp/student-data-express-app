"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const studentJoiSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    name: joi_1.default.object({
        firstName: joi_1.default.string()
            .required()
            .trim()
            .max(20)
            .regex(/^[A-Z][a-z]*$/) // First letter capitalized and the rest lowercase
            .messages({
            'string.pattern.base': '{#label} must be in capitalize format',
            'string.max': 'First name must not exceed 20 characters'
        }),
        middleName: joi_1.default.string()
            .trim()
            .max(20)
            .regex(/^[A-Z][a-z]*$/)
            .messages({
            'string.max': 'Middle name must not exceed 20 characters'
        }),
        lastName: joi_1.default.string()
            .required()
            .trim()
            .max(20)
            .regex(/^[A-Za-z]+$/) // Allow only alphabets for last name
            .messages({
            'string.pattern.base': '{#label} must only contain alphabetic characters',
            'string.max': 'Last name must not exceed 20 characters'
        })
    }).required(),
    gender: joi_1.default.string()
        .valid('male', 'female', 'other')
        .required()
        .messages({
        'any.only': 'Gender must be one of the following: male, female, or other'
    }),
    dateOfBirth: joi_1.default.date()
        .required()
        .messages({
        'string.empty': 'Date of birth is required'
    }),
    email: joi_1.default.string()
        .email()
        .required()
        .messages({
        'string.email': 'Email must be a valid email address',
        'string.empty': 'Email is required'
    }),
    contactNumber: joi_1.default.string()
        .pattern(/^[0-9]\d{10}$/)
        .required()
        .messages({
        'string.empty': 'please provide a valied bangladeshi contact number'
    }),
    emergencyContactNo: joi_1.default.string()
        .required()
        .messages({
        'string.empty': 'Emergency contact number is required'
    }),
    bloodGroup: joi_1.default.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .messages({
        'any.only': 'Blood group must be one of the following: A+, A-, B+, B-, AB+, AB-, O+, O-'
    }),
    presentAddress: joi_1.default.string()
        .required()
        .messages({
        'string.empty': 'Present address is required'
    }),
    permanentAddress: joi_1.default.string()
        .required()
        .messages({
        'string.empty': 'Permanent address is required'
    }),
    guardian: joi_1.default.object({
        fatherName: joi_1.default.string().required(),
        fatherOccupation: joi_1.default.string().required(),
        fatherContactNo: joi_1.default.string().required(),
        motherName: joi_1.default.string().required(),
        motherOccupation: joi_1.default.string(),
        motherContactNo: joi_1.default.string().required()
    }).required(),
    localGuardian: joi_1.default.object({
        localGuardianName: joi_1.default.string().required(),
        localGuardianOccupation: joi_1.default.string().required(),
        localGuardianContactNo: joi_1.default.string().required()
    }).required(),
    avatar: joi_1.default.string(),
    isActive: joi_1.default.string()
        .valid('active', 'inActive')
        .default('active')
        .messages({
        'any.only': 'isActive must be either "active" or "inActive"'
    })
});
exports.default = studentJoiSchema;
