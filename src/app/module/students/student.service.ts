import { Student } from "./student.model";



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

    getAllStudentsFromDB,
    getSingleStudentsFromDB,
    deleteStudentsFromDB
}