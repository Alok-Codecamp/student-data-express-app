import { ObjectId } from "mongoose";


export interface IAcademicDepertment {
    name: string;
    academicFaculty: ObjectId;
}