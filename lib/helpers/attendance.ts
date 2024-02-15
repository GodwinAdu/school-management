"use server"

import StudentAttendance from "../models/student-attendance.models";
import Student from "../models/student.models";

const currentDate = new Date();

interface GetStudentAttendanceProps {
    classId: string;
    searchDate: Date;
}

export async function getStudentAttendances({ classId, searchDate }: GetStudentAttendanceProps) {
    try {
        // Convert searchDate to UTC format if it exists; otherwise, use the current date
        const queryDate = searchDate ? searchDate : new Date();

        // Find all students with the specified class ID
        const students = await Student.find({ stage: classId });

        if (!students) throw new Error("No students found");

        // Find attendance records for the current date and class ID
        const attendanceRecords = await StudentAttendance.find({
            $and: [
                { date: { $eq: queryDate } }, // Match documents with the target date
                { classId } // Match documents with the specified classId
            ]
        });
        console.log(attendanceRecords)

        // if (!attendanceRecords || attendanceRecords.length === 0) {
        //     throw new Error("Attendance not marked yet for the specified date and class");
        // }

        // Get the list of present student IDs for the current date
        const presentStudentIds = attendanceRecords.map(record => record.studentId);

        // Filter absent students
        const absentStudents = students.filter(student => !presentStudentIds.includes(student._id.toString()));

        // Filter present students
        const presentStudents = students.filter(student => presentStudentIds.includes(student._id.toString()));

        // console.log('Absent Students:', absentStudents);
        // console.log('Present Students:', presentStudents);

        return { absentStudents, presentStudents };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}