import mongoose, { Document } from "mongoose";

export interface IStudentAttendance extends Document {
    _id: string;
    studentId: string;
    present: boolean;
    date: Date;
    updatedAt?: Date;
}

const StudentAttendanceSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
    },
    classId: {
        type: String,
        required: true,
    },
    present: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
});


const StudentAttendance = mongoose.models.StudentAttendance || mongoose.model("StudentAttendance", StudentAttendanceSchema);

export default StudentAttendance;