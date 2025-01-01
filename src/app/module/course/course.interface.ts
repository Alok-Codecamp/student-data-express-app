import { Types } from "mongoose";

export type TpreRequisiteCourses = {
    course: Types.ObjectId;
    isDeleted: boolean;

}


export interface ICourse {
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourses: TpreRequisiteCourses[],
    isDeleted?: boolean;
}

export interface ICourseFaculty {
    course: Types.ObjectId;
    faculties: [Types.ObjectId]
}