

export type TMonths =
    | "January"
    | "February"
    | "March"
    | "April"
    | "May"
    | "June"
    | "July"
    | "August"
    | "September"
    | "October"
    | "November"
    | "December";

export type TAcademicSemesterName = 'Autumn' | 'Summar' | 'Fall';
export type TAcademicSemesterCode = '01' | '02' | '03';
export interface IAcademicSemester {
    name: TAcademicSemesterName;
    code: TAcademicSemesterCode;
    year: string;
    startMonth: TMonths;
    endMonth: TMonths;

}

export type TacademicSemesterNameCodeMapper = {
    [key: string]: string;
};