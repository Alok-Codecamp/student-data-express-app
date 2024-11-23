"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// all imported module
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const student_route_1 = require("./app/module/students/student.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//application routes
app.use('/api/v1/students', student_route_1.StudentRoutes);
// const getAController = (req: Request, res: Response) => {
//   const a = 10;
//   res.send(a);
// }
app.get('/', (req, res) => {
    res.send('hello i am running');
});
exports.default = app;
