
type Role = 'admin' | 'student' | 'faculty' | 'admin';
export interface IUser {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    role: Role;
    status: 'in-progress' | 'block';
    isDeleted: boolean;

}

