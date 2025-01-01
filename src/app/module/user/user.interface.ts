import { Date, Document, Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type Role = 'superAdmin' | 'student' | 'faculty' | 'admin';
export interface IUser {
    id: string;
    email: string;
    password: string;
    needsPasswordChange: boolean;
    passwordChangeAt?: Date;
    role: Role;
    status: 'in-progress' | 'block';
    isDeleted: boolean;

}

export type TUserRole = keyof typeof USER_ROLE;


export interface UserModel extends Model<IUser> {
    isUserExistsByCustomId(id: string): Promise<IUser>;
    isPasswordMatched(plainPassword: string, hashedPassword: string): Promise<boolean>;

    isJWTIssuedBeforePasswordChange(passwordChangeTimeStamp: Date, jwtIssuedTimeStamp: number): boolean;
}
