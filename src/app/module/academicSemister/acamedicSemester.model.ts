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




academicSemesterSchema.pre('save', async function (next) {
    const isSemesterExist = await academicSemesterModel.findOne({
        name: this.name,
        year: this.year,
    })
    if (isSemesterExist) {
        throw new Error('Semester is already exists !')
    }
    next();
})

export const academicSemesterModel = model<IAcademicSemester>("academicSemester", academicSemesterSchema)