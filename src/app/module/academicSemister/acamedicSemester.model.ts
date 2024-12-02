import { model, Schema } from "mongoose";
import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicSemester.constant'
import { IAcademicSemester } from "./academicSemester.interface";


const academicSemesterSchema = new Schema<IAcademicSemester>({
    name: {
        type: String,
        required: true,
        enum: AcademicSemesterName

    },
    year: {
        type: String,
        required: true,


    },
    code: {
        type: String,
        required: true,
        enum: AcademicSemesterCode
    },
    startMonth: {
        type: String,
        required: true,
        enum: Months

    },
    endMonth: {
        type: String,
        enum: Months
    }
})


export const acamedicSemesterModel = model<IAcademicSemester>("academicSemester", academicSemesterSchema)