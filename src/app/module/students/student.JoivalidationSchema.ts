import Joi from "joi";


const studentJoiSchema = Joi.object({
    id: Joi.string().required(),

    name: Joi.object({
        firstName: Joi.string()
            .required()
            .trim()
            .max(20)
            .regex(/^[A-Z][a-z]*$/)  // First letter capitalized and the rest lowercase
            .messages({
                'string.pattern.base': '{#label} must be in capitalize format',
                'string.max': 'First name must not exceed 20 characters'
            }),

        middleName: Joi.string()
            .trim()
            .max(20)
            .regex(/^[A-Z][a-z]*$/)
            .messages({
                'string.max': 'Middle name must not exceed 20 characters'
            }),

        lastName: Joi.string()
            .required()
            .trim()
            .max(20)
            .regex(/^[A-Za-z]+$/)  // Allow only alphabets for last name
            .messages({
                'string.pattern.base': '{#label} must only contain alphabetic characters',
                'string.max': 'Last name must not exceed 20 characters'
            })
    }).required(),

    gender: Joi.string()
        .valid('male', 'female', 'other')
        .required()
        .messages({
            'any.only': 'Gender must be one of the following: male, female, or other'
        }),

    dateOfBirth: Joi.date()
        .required()
        .messages({
            'string.empty': 'Date of birth is required'
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Email must be a valid email address',
            'string.empty': 'Email is required'
        }),

    contactNumber: Joi.string()
        .pattern(/^[0-9]\d{10}$/)
        .required()
        .messages({
            'string.empty': 'please provide a valied bangladeshi contact number'
        }),

    emergencyContactNo: Joi.string()
        .required()
        .messages({
            'string.empty': 'Emergency contact number is required'
        }),

    bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .messages({
            'any.only': 'Blood group must be one of the following: A+, A-, B+, B-, AB+, AB-, O+, O-'
        }),

    presentAddress: Joi.string()
        .required()
        .messages({
            'string.empty': 'Present address is required'
        }),

    permanentAddress: Joi.string()
        .required()
        .messages({
            'string.empty': 'Permanent address is required'
        }),

    guardian: Joi.object({
        fatherName: Joi.string().required(),
        fatherOccupation: Joi.string().required(),
        fatherContactNo: Joi.string().required(),
        motherName: Joi.string().required(),
        motherOccupation: Joi.string(),
        motherContactNo: Joi.string().required()
    }).required(),

    localGuardian: Joi.object({
        localGuardianName: Joi.string().required(),
        localGuardianOccupation: Joi.string().required(),
        localGuardianContactNo: Joi.string().required()
    }).required(),

    avatar: Joi.string(),

    isActive: Joi.string()
        .valid('active', 'inActive')
        .default('active')
        .messages({
            'any.only': 'isActive must be either "active" or "inActive"'
        })
});


export default studentJoiSchema;