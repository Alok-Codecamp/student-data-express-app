import { model, Schema } from "mongoose";
import { IEnroledCourse, TCourseMarks } from "./enroledCourse.interface";
import { grades } from "./enroledCourse.constant";















const CourseMarksSchema = new Schema<TCourseMarks>({
    classTest1: {
        type: Number,
        min: 0,
        max: 10,

    },
    midTerm: {
        type: Number,
        min: 0,
        max: 30,

    },
    classTest2: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    finalTerm: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    }
})


const EnroledCourseSchema = new Schema<IEnroledCourse>({
    semesterRegistration: {
        type: Schema.ObjectId,
        ref: 'SemesterRegistrationModel'
    },
    academicSemester: {
        type: Schema.ObjectId,
        ref: 'academicSemesterModel'
    },
    academicFaculty: {
        type: Schema.ObjectId,
        ref: 'AcademicFacultyModel'
    },
    offeredCourse: {
        type: Schema.ObjectId,
        ref: 'OfferedCourseModel'
    },
    course: {
        type: Schema.ObjectId,
        ref: 'CourseModel'
    },
    student: {
        type: Schema.ObjectId,
        ref: 'Student'
    },
    faculty: {
        type: Schema.ObjectId,
        ref: 'FacultyModel'
    },
    isEnroled: {
        type: Boolean,
        default: false
    },
    courseMarks: {
        type: CourseMarksSchema,
    },
    grade: {
        type: String,
        enum: grades
    },
    gradePoints: {
        type: Number,
        min: 0,
        max: 4,
        default: 0
    },
    iscompleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true, })


export const EnroledCourseModel = model<IEnroledCourse>('EnroledCourse', EnroledCourseSchema)