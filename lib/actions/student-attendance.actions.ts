"use server"

import StudentAttendance from "../models/student-attendance.models";
import { connectToDB } from "../mongoose"

interface CreateAttendanceProps {
    studentId: string;
    classId: string;
    present: boolean | undefined;
}
export async function createAttendance({ studentId, classId, present }: CreateAttendanceProps) {
    await connectToDB();
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const isoString = currentDate.toISOString();
        
        const existingAttendance = await StudentAttendance.findOne({
            studentId,
            date: { $eq: isoString } // Compare only the date part
        })

        if (existingAttendance) {
            console.log("Student already marked attendance")
            return { status: 409 }
        }

        const attendance = new StudentAttendance({
            studentId,
            date: isoString,
            present,
            classId
        })

        await attendance.save();

    } catch (error: any) {
        // Handle errors appropriately, e.g., log the error
        console.error('Error creating attendance:', error);
        throw error
    }
}

interface FetchAttendanceProps {
    classId: string;
    date: Date
}
export async function fetchAttendance({ classId, date }: FetchAttendanceProps) {
    await connectToDB();
    try {
        const result = await StudentAttendance.find({
            classId,
            date
        });
        if (!result) {
            throw new Error("No Attendance found")
        }

        return JSON.parse(JSON.stringify(result))
    } catch (error: any) {
        console.log("something happened while fetching student attendance");
        throw error
    }
}