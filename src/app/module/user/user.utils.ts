import { IAcademicSemester } from "../academicSemister/academicSemester.interface";
import { userModel } from "./user.model";



const findLastStudentId = async () => {
    const lastStudent = await userModel.findOne({
        role: 'student',
    }, {
        id: 1,
        _id: 0
    }).sort({
        createdAt: -1
    }).lean()

    return lastStudent?.id ? lastStudent.id : undefined;
}


const generateStudentId = async (payLoad: IAcademicSemester) => {



    let currentId = await (0).toString();
    const lastStudentId = await findLastStudentId();

    const lastStudentYear = lastStudentId?.substring(0, 4)
    const lastStudentSemesterCode = lastStudentId?.substring(4, 6)
    const currentYear = payLoad.year;
    const currentCode = payLoad.code;

    if (lastStudentId && lastStudentSemesterCode === currentCode && lastStudentYear === currentYear) {
        currentId = lastStudentId.substring(6);
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');


    incrementId = `${payLoad.year}${payLoad.code}${incrementId}`

    return incrementId
}

const userUtils = {
    generateStudentId
}

export default userUtils;