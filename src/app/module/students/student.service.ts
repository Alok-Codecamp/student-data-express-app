import { Student } from "../student.model";
import { Istudent } from "./student.interface";

const createStudentIntoDB = async (studentData: Istudent) => {


    if (await Student.isUserExists(studentData.id)) {
        throw new Error('User already exists')
    }

    const result = await Student.create(studentData); //built in static method



    // const student = new Student(studentData);

    // if (await student.isUserExists(studentData.id)) {
    //     throw new Error('User already exists!')
    // }


    // const result = await student.save(); //built in instance method.
    return result;

}

const getAllStudentsFromDB = async () => {
    const result = await Student.find();
    return result;
}
const getSingleStudentsFromDB = async (id: string) => {
    const result = await Student.aggregate([
        {
            $match: { id: id }
        }
    ]);
    return result;
}

// function for delete student data from db

const deleteStudentsFromDB = async (id: string) => {
    const result = await Student.updateOne({ id }, { isDeleted: true });
    return result;
}



export const StudentServices = {
    createStudentIntoDB,
    getAllStudentsFromDB,
    getSingleStudentsFromDB,
    deleteStudentsFromDB
}