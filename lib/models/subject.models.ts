import mongoose from "mongoose";

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