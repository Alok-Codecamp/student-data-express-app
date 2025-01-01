
import { Date, ObjectId, Types } from "mongoose";



export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';



export interface IFaculty {
    id: string;
    user: Types.ObjectId
    designation: string;
    name: {
        firstName: string,
        lastName: string
    };
    gender: 'male' | 'female';
    dateOfBirth: string
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup: BloodGroup;
    presentAddress: string;
    permanentAddress: string;
    profileImage: string;
    academicDepertment: ObjectId;
    academicFaculty: ObjectId;
    isDeleted: boolean;

}