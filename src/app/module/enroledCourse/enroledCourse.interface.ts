import { Types } from "mongoose";


export type TGrade = 'A' | 'B' | 'C' | 'D' | 'F' | 'N/A';

export type TCourseMarks = {
    classTest1: number;
    midTerm: number;
    classTest2: number;
    finalTerm: number;
}


export interface IEnroledCourse {
    semesterRegistration: Types.ObjectId;
    academicSemester: Types.ObjectId;
    academicFaculty: Types.ObjectId;
    academicDepertment: Types.ObjectId;
    offeredCourse: Types.ObjectId;
    course: Types.ObjectId;
    student: Types.ObjectId;
    faculty: Types.ObjectId;
    isEnroled: boolean;
    courseMarks: TCourseMarks;
    grade: TGrade;
    gradePoints: number;
    iscompleted: boolean;
}

