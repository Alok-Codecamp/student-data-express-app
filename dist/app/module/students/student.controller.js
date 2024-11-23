"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const student_service_1 = require("./student.service");
const student_Zodvalidation_1 = __importDefault(require("./student.Zodvalidation"));
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // create a schema validation with zod 
        const { student: studentData } = req.body;
        const ZodParseData = student_Zodvalidation_1.default.parse(studentData);
        const result = yield student_service_1.StudentServices.createStudentIntoDB(ZodParseData);
        res.status(200).json({
            success: true,
            message: 'student is created successfully',
            data: result
        });
    }
    catch (err) {
        console.log(err);
        res.status(200).json({
            success: false,
            message: err.message,
            error: err
        });
    }
});
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.StudentServices.getAllStudentsFromDB();
        res.status(200).json({
            success: true,
            message: 'student is retrive successfully',
            data: result
        });
    }
    catch (err) {
        console.log(err);
        res.status(200).json({
            success: false,
            message: err.message,
            error: err
        });
    }
});
const getSingleStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield student_service_1.StudentServices.getSingleStudentsFromDB(studentId);
        res.status(200).json({
            success: true,
            message: 'student is retrive successfully',
            data: result
        });
    }
    catch (err) {
        res.status(200).json({
            success: false,
            message: err.message,
            error: err
        });
    }
});
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield student_service_1.StudentServices.deleteStudentsFromDB(studentId);
        res.status(200).json({
            success: true,
            message: 'student deleted successfully',
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: err
        });
    }
});
exports.StudentController = {
    createStudent,
    getAllStudents,
    getSingleStudent,
    deleteStudent,
};
