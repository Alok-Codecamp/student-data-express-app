import { Model, ObjectId, Types } from "mongoose";


export interface IGuardian {

    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation?: string;
    motherContactNo: string;

}
export interface IUserName {
    firstName: string;
    middleName?: string;
    lastName: string;

}
type TBloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export interface ILocalGurdian {
    localGuardianName: string;
    localGuardianOccupation: string;
    localGuardianContactNo: string;
}

export interface Istudent {
    id: string;
    user: Types.ObjectId;
    password: string;
    name: IUserName;
    gender: 'male' | 'female' | 'other';
    dateOfBirth: string;
    email: string;
    contactNumber: string;
    emergencyContactNo: string;
    bloodGroup?: TBloodGroup;
    presentAddress: string;
    permanentAddress: string;
    guardian: IGuardian;
    localGuardian: ILocalGurdian;
    avatar?: string;
    admissionSemester: ObjectId;
    academicDepertment: ObjectId;
    isDeleted?: boolean;

}


//for creating static 

export interface StudentModel extends Model<Istudent> {
    isUserExists(id: string): Promise<Istudent | null>;
}



// for creating instance
// export type StudentMethod = {
//     isUserExists(id: string): Promise<Istudent | null>
// };
// export type StudentModel = Model<Istudent, Record<string, never>, StudentMethod>;


