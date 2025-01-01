import { model, Schema } from "mongoose";
import { ICourse, ICourseFaculty, TpreRequisiteCourses } from "./course.interface";
import { ref } from "joi";
import { FacultyModel } from "../faculty/faculty.model";

const preRequisiteCoursesSchema = new Schema<TpreRequisiteCourses>({
    course: {
        type: Schema.ObjectId,
        ref: 'course'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const CourseSchema = new Schema<ICourse>({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    prefix: {
        type: String,
        trim: true,
        required: true
    },
    code: {

        type: Number,
        trim: true,
        required: true
    },

    credits: {
        type: Number,
        required: true,
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
    isDeleted: {
        type: Boolean,
        default: false
    }

})

export const CourseModel = model<ICourse>('course', CourseSchema)

const CourseFacultySchema = new Schema<ICourseFaculty>({
    course: {
        type: Schema.ObjectId,
        ref: 'course',
        unique: true

    },
    faculties: [{
        type: Schema.ObjectId,
        ref: 'FacultyModel'
    }]
})

export const CourseFacultyModel = model<ICourseFaculty>('courseFacultie', CourseFacultySchema)