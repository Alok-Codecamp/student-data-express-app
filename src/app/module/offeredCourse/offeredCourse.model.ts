import { Schema, model } from "mongoose";
import { IOfferedCourse } from "./offeredCourse.interface";
import { weekDays } from "./offeredCourse.constant";







const OfferedCourseSchema = new Schema<IOfferedCourse>({
    semesterRegistration: {
        type: Schema.ObjectId,
        required: true,
        ref: 'SemesterRegistration'
    },
    academiSemester: {
        type: Schema.ObjectId,
        ref: 'academicSemesterModel'
    },
    academicFaculty: {
        type: Schema.ObjectId,
        required: true,
        ref: 'AcademicFacultyModel'
    },
    academicDepertment: {
        type: Schema.ObjectId,
        required: true,
        ref: 'AcademicDepertmentModel'
    },

    course: {
        type: Schema.ObjectId,
        required: true,
        ref: 'CourseModel'
    },
    faculty: {
        type: Schema.ObjectId,
        required: true,
        ref: 'FacultyModel'
    },
    maxCapacity: {
        type: Number,
        required: true,
    },
    section: {
        type: Number,
        required: true,
    },
    days: [{
        type: String,
        enum: weekDays
    }],
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
}, { timestamps: true })




export const OfferedCourseModel = model<IOfferedCourse>('OfferedCourse', OfferedCourseSchema);



