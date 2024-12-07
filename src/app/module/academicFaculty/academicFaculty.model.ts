import { model, Model, Schema } from "mongoose";
import { IAcademicFaculty } from "./academicFacultty.interface";


const AcademicFacultySchema = new Schema<IAcademicFaculty>({

    name: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true, versionKey: false })


export const AcademicFacultyModel = model<IAcademicFaculty>('AcademicFaculty', AcademicFacultySchema)