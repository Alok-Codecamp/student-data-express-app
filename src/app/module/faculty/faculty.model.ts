import { model, Schema } from "mongoose";
import { IFaculty } from "./faculty.interface";
import { userModel } from "../user/user.model";


const FacultySchema = new Schema<IFaculty>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: Schema.ObjectId,
        ref: userModel,
        required: true,
    },
    designation: String,
    name: {
        type: Object,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,

    },
    contactNo: {
        type: String,
        required: true,
    },
    emergencyContactNo: String,
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            message: '{VALUE} is not a valid blood group'
        }
    },
    presentAddress: {
        type: String,
        required: true
    },
    permanentAddress: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    academicDepertment: {
        type: Schema.ObjectId,
        required: [true, 'Academic depertment is required'],
        ref: 'AcademicDepertmentModel'
    },
    academicFaculty: {
        type: Schema.ObjectId,
        required: [true, 'Academic faculty is required'],
        ref: 'AcademicFacultyModel'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


export const FacultyModel = model<IFaculty>('faculty', FacultySchema);