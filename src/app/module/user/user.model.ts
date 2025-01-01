import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";
import { userStatus } from "./user.constant";


const userSchema = new Schema<IUser, UserModel>({
    id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    needsPasswordChange: {
        type: Boolean,
        required: true,
        default: true

    },
    passwordChangeAt: {
        type: Date,
        default: new Date

    },
    role: {
        type: String,
        enum: ['superAdmin', 'student', 'faculty', 'admin']
    },
    status: {
        type: String,
        enum: userStatus,
        default: 'in-progress'
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },

}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {


    // hashing pass and save in to db 
    const student = this;
    student.password = await bcrypt.hash(student.password, Number(config.bcrypt_salt_rounds)
    )
    next();

})


userSchema.post('save', function (doc, next) {

    doc.password = " "
    next();
})


userSchema.statics.isUserExistsByCustomId = async function (id: string) {
    return await userModel.findOne({ id: id });
}

userSchema.statics.isPasswordMatched = async function (plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

userSchema.statics.isJWTIssuedBeforePasswordChange = async function (passwordChangeTimeStamp, jwtIssuedTimeStamp) {

    const passwordChangeTime = new Date(passwordChangeTimeStamp).getTime() / 1000;

    return passwordChangeTime > jwtIssuedTimeStamp;
}


export const userModel = model<IUser, UserModel>('user', userSchema)