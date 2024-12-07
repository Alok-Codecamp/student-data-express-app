import { model, Schema } from "mongoose";
import { IAcademicDepertment } from "./academicDepertment.interface";
import { AcademicFacultyModel } from "../academicFaculty/academicFaculty.model";
import AppError from "../../middlewares/errorSuperClass";




const AcademicDepertmentSchema = new Schema<IAcademicDepertment>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    academicFaculty: {
        type: Schema.ObjectId,
        ref: AcademicFacultyModel
    }
}, { timestamps: true, versionKey: false })






AcademicDepertmentSchema.pre('save', async function (next) {

    const isDepertmentExists = await AcademicDepertmentModel.findOne({
        name: this.name
    })

    if (isDepertmentExists) {
        throw new AppError(404, 'This Depertment is already exists')
    }

    next();

})

AcademicDepertmentSchema.pre('findOneAndUpdate', async function (next) {

    const query = this.getQuery()

    const isDepertmentExists = await AcademicDepertmentModel.findById(query);

    if (!isDepertmentExists) {

        throw new AppError(404, 'Depertment not found !!')
    }
    next();
})


export const AcademicDepertmentModel = model<IAcademicDepertment>('AcademicDepertment', AcademicDepertmentSchema)