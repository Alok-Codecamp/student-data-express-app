import { Schema, Date, model } from "mongoose";
import { ISemesterRagistration } from "./semesterRagistration.interface";




const semesterRegistrationSchema = new Schema<ISemesterRagistration>({
    academicSemester: {
        type: Schema.ObjectId,
        unique: true,
        ref: 'academicSemester',
        required: true,
    },
    status: {
        type: String,
        enum: ['UPCOMING', 'ON GOING', 'ENDED'],
        default: 'UPCOMING'
    },
    startDate: {
        type: Date,
        required: true,

    },
    endDate: {
        type: Date
        ,
        required: true,
    },
    minCredit: {
        type: Number,
        default: 3,
    },
    maxCredit: {
        type: Number,
        default: 15
    }

}, { timestamps: true })


export const SemesterRegistrationModel = model<ISemesterRagistration>('SemesterRagistration', semesterRegistrationSchema);