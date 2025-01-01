import { Types } from "mongoose";
import { Schema } from "zod";


export type TWeekDays =
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";

export type TSchedulse = {
    days: TWeekDays[];
    startTime: string;
    endTime: string
}

export interface IOfferedCourse {
    semesterRegistration: Types.ObjectId;
    academiSemester?: Types.ObjectId;
    academicFaculty: Types.ObjectId;
    academicDepertment: Types.ObjectId;
    course: Types.ObjectId;
    faculty: Types.ObjectId;
    maxCapacity: number;
    section: number;
    days: TWeekDays[];
    startTime: string;
    endTime: string;
}



