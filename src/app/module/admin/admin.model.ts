
import { model, Schema } from "mongoose";
import { IAdmin } from "./admin.interface";
import { userModel } from "../user/user.model";




const AdminSchema = new Schema<IAdmin>({
    id: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.ObjectId,
        ref: userModel
    },
    designation: {
        type: String,
        required: true
    },
    name: {
        type: {
            firstName: String,
            lastName: String
        },
        required: true,
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: 'gender must be male, female or other'
        }
    },
    dateOfBirth: String,
    email: String,
    contactNo: String,
    emergencyContactNo: String,
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            message: 'bloodGroup must be A+ A- B+ B- AB+ AB- O+ O-'
        }
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


export const AdminModel = model<IAdmin>('Admin', AdminSchema);