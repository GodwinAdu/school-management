import mongoose, { Document } from "mongoose";

export interface ISubject extends Document {
    _id:string;
    subjectName: string;
    subjectCredit: string;
    subjectHour: string;
    subjectLevel: string;
    subjectStage: string;
    subjectAttribute: string;
    description?: string;
    status: boolean;
    code: string;
    createdAt: Date;
    updatedAt?: Date;
}
const SubjectSchema = new mongoose.Schema({

    subjectName: {
        type: String,
        required: true,
    },
    subjectCredit: {
        type: String,
        required: true,
    },
    subjectHour: {
        type: String,
        required: true,
    },
    subjectLevel: {
        type: String,
        required: true,
    },
    subjectStage: {
        type: String,
        required: true,
    },
    subjectAttribute: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    code: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
});


const Subject = mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);

export default Subject;