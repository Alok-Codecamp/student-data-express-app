import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";


const userSchema = new Schema<IUser>({
    id: {
        type: String,
        required: true
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
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin']
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
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
    // console.log('this is the this value of pre hook:', this, ' post hook: we will save our data');

    // hashing pass and save in to db 
    const student = this;
    student.password = await bcrypt.hash(student.password, Number(config.bcrypt_salt_rounds)
    )
    next();

})


userSchema.post('save', function (doc, next) {
    // console.log('this is the this value of post hook:', this, ' post hook: we will save our data');
    doc.password = " "
    next();
})

export const userModel = model<IUser>('user', userSchema)