import { Request, Response } from "express";
import { StudentServices } from "./student.service";

import studentZodSchema from "./student.Zodvalidation";



const createStudent = async (req: Request, res: Response) => {
    try {

        // create a schema validation with zod 
        const { student: studentData } = req.body;

        const ZodParseData = studentZodSchema.parse(studentData)

        const result = await StudentServices.createStudentIntoDB(ZodParseData);


        res.status(200).json({
            success: true,
            message: 'student is created successfully',
            data: result
        })
    } catch (err: any) {
        console.log(err);
        res.status(200).json({
            success: false,
            message: err.message,
            error: err
        })

    }
}

const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB();

        res.status(200).json({
            success: true,
            message: 'student is retrive successfully',
            data: result
        })
    } catch (err: any) {
        console.log(err);
        res.status(200).json({
            success: false,
            message: err.message,
            error: err
        })

    }
}

const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.getSingleStudentsFromDB(studentId)

        res.status(200).json({
            success: true,
            message: 'student is retrive successfully',
            data: result


        })
    } catch (err: any) {
        res.status(200).json({
            success: false,
            message: err.message,
            error: err

        })
    }
}

const deleteStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;

        const result = await StudentServices.deleteStudentsFromDB(studentId)

        res.status(200).json({
            success: true,
            message: 'student deleted successfully',
            data: result
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: err
        })
    }
}


export const StudentController = {
    createStudent,
    getAllStudents,
    getSingleStudent,
    deleteStudent,
}