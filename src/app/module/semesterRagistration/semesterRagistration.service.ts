import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../middlewares/errorSuperClass";
import { academicSemesterModel } from "../academicSemister/acamedicSemester.model";
import { ISemesterRagistration } from "./semesterRagistration.interface";
import { SemesterRegistrationModel } from "./semesterRagistration.model";
import httpStatus from "http-status";



const createSemesterRegistrationIntoDb = async (payload: ISemesterRagistration) => {
    //check if the semester is exist
    const currentAcademicSemester = payload.academicSemester;

    // check if there any semester registration upcoming or ongoing

    const checkUpComingOrOnGoing = await SemesterRegistrationModel.findOne({
        $or: [
            { status: 'UPCOMING' },
            { status: 'ON GOING' }
        ]
    })

    if (checkUpComingOrOnGoing) {
        throw new AppError(httpStatus.BAD_REQUEST, `There is already  ${checkUpComingOrOnGoing.status} semester`)
    }

    const isAcademicSemesterExist = await academicSemesterModel.findById(currentAcademicSemester);
    if (!isAcademicSemesterExist) {
        throw new AppError(httpStatus.BAD_REQUEST, 'This academis semseter not found')
    }

    // cheack semester is registerd or not

    const isSemesterRegisterd = await SemesterRegistrationModel.findOne({ academicSemester: currentAcademicSemester })


    if (isSemesterRegisterd) {
        throw new AppError(httpStatus.CONFLICT, 'This semester is already registerd!')
    }


    // finaly creating semester registration.

    const result = await SemesterRegistrationModel.create(payload);

    return result;



}

// get all semester 

const getAllSemesterRegistrationFromDb = async (queryParam: Record<string, unknown>) => {

    const semesterRegistrationQuery = new QueryBuilder(SemesterRegistrationModel.find().populate('academicSemester'), queryParam).filter().sort().paginate().fields();

    const result = await semesterRegistrationQuery.modelQuery;

    return result;
}

// service function get single semester form db

const getSingleSemesterRegistrationFromDb = async (id: string) => {

    const result = await SemesterRegistrationModel.findById(id)

    return result;
}


const updateSemesterRegistrationIntoDb = async (id: string, payload: Partial<ISemesterRagistration>) => {

    const isAcademicSemesterExist = await SemesterRegistrationModel.findById(id);

    if (!isAcademicSemesterExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'This is not found')
    }

    // if the requiested semester registration is ended wi will not update anything

    const currentSemesterStatus = isAcademicSemesterExist?.status;
    const requestedStatus = payload.status;
    if (currentSemesterStatus === 'ENDED') {
        throw new AppError(httpStatus.BAD_REQUEST, 'This semester is ENDED')
    }

    if (currentSemesterStatus === 'UPCOMING' && requestedStatus !== 'ON GOING' || currentSemesterStatus === 'ON GOING' && requestedStatus !== 'ENDED') {
        throw new AppError(httpStatus.BAD_REQUEST, `Requseted status only can be modify this direction upcoming-->ongoing-->endded`)
    }

    const result = await SemesterRegistrationModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true })

    return result;

}


export const semesterRagistrationServices = {
    createSemesterRegistrationIntoDb,
    getAllSemesterRegistrationFromDb,
    getSingleSemesterRegistrationFromDb,
    updateSemesterRegistrationIntoDb

}