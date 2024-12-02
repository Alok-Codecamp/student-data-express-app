import config from "../../config";
import { Student } from "../students/student.model";
import { Istudent } from "../students/student.interface";
import { IUser } from "./user.interface";
import { userModel } from "./user.model";

const createStudentIntoDB = async (password: string, student: Istudent) => {
    //set student role


    const user: Partial<IUser> = {}

    user.role = 'student';

    user.password = password || config.default_password as string;


    // set id 
    user.id = '203010000465'

    //create a user
    const newUser = await userModel.create(user);

    // create a student
    if (Object.keys(newUser).length) {
        student.id = newUser.id;
        student.user = newUser._id;
    }

    const newStudent = Student.create(student)
    return newStudent


}



export const userServices = {
    createStudentIntoDB,
}