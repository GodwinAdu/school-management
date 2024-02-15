import mongoose, { Document } from "mongoose";

export interface IStudent extends Document {
    _id?:string;
    userName: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    dob: string;
    role: string;
    gender: string;
    phone: string;
    password: string;
    country: string;
    state: string;
    city: string;
    permanentAddress?: string;
    currentAddress: string;
    guardianName: string;
    guardianPhone: string;
    guardianRelationship: string;
    session: string;
    term: string;
    stage: string;
    level: string;
    attendance?: [{ date: Date, present: Boolean }];
    studentId: string;
    createdAt: Date;
    updatedAt?: Date;
}

const StudentSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: { type: String },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    dob: {
        type: String,
        required: true,
    },
    role:{
        type:String,
        default:"student"
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    permanentAddress: {
        type: String,
    },
    currentAddress: {
        type: String,
        required: true
    },
    guardianName: {
        type: String,
        required: true
    },
    guardianPhone: {
        type: String,
        required: true
    },
    guardianRelationship: {
        type: String,
        required: true
    },
    session: {
        type: String,
        required: true
    },
    term: {
        type: String,
        required: true
    },
    stage: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
});


const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema);

export default Student;