import { Types } from "mongoose";





export interface ISemesterRagistration {
    academicSemester: Types.ObjectId;
    status: 'UPCOMING' | 'ON GOING' | 'ENDED';
    startDate: Date;
    endDate: Date;
    minCredit: number;
    maxCredit: number;
}