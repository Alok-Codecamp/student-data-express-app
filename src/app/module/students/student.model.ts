import { model, Schema } from "mongoose";
import { IGuardian, ILocalGurdian, Istudent, IUserName, StudentModel } from "./student.interface";



const userNameSchema = new Schema<IUserName>({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    }
});


const guardianSchema = new Schema<IGuardian>({
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: {
        type: String, required: true
    },
    motherName: {
        type: String, required: true
    },
    motherOccupation: {
        type: String,
    },
    motherContactNo: {
        type: String, required: true
    }
})

const localGuardianSchema = new Schema<ILocalGurdian>({
    localGuardianName: { type: String, required: true },
    localGuardianOccupation: {
        type: String,
        required: true
    },
    localGuardianContactNo: {
        type: String,
        required: true
    }
})

const studentSchema = new Schema<Istudent, StudentModel>({
    id: { type: String, required: true, unique: true },
    user: {
        type: Schema.ObjectId,
        required: [true, 'id is required'],
        unique: true,
        ref: 'UserModel'
    },

    name: {
        type: userNameSchema,
        required: [true, 'you must enter first name '],

    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: "{VALUE} is not valied. gender should be male or female or other"
        },
        required: true
    },//this is enum  type
    dateOfBirth: { type: String, required: [true, 'you must enter date of birth '] },
    email: {
        type: String, required: [true, 'you must enter the email '], unique: true,
    },

    contactNumber: { type: String, required: [true, 'you must enter the contact number '] },
    emergencyContactNo: { type: String, required: [true, 'you must enter the emergency contact number'] },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    avatar: { type: String },

    isDeleted: {
        type: Boolean,
        default: false
    },

}, { toJSON: { virtuals: true } });


// mongoos vertual 

studentSchema.virtual('fullName').get(function () {
    return this.name.firstName + this.name.middleName + this.name.lastName;
})

//for find query
studentSchema.pre('find', function (next) {

    this.find({ isDeleted: { $ne: true } });

    next();
})
// for findOne query 
studentSchema.pre('findOne', function (next) {

    this.find({ isDeleted: { $ne: true } });

    next();
})

studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
    next();
})

// creating a custom static method 

studentSchema.static('isUserExists', async function isUserExists(id: string) {
    const existingUser = await Student.findOne({ id });
    return existingUser;
})


export const Student = model<Istudent, StudentModel>('student', studentSchema);
