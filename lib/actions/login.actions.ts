"use server"

import { compare } from "bcrypt";
import Adminuser from "../models/admin.models";
import { connectToDB } from "../mongoose"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Student from "../models/student.models";
import Teacher from "../models/teacher.models";

interface loginProps {
    userName: string;
    password: string;
}
export async function loginAdminUsers({ userName, password }: loginProps) {
    await connectToDB();
    const cookieStore = cookies();
    try {
        const user = await Adminuser.findOne({ userName })
        if (!user) {
            console.log("User doesnt exist")
            return null
        };

        const tokenData = {
            id: user?._id,
            username: user?.userName,
            firstname: user?.firstName,
            middlename: user?.middleName,
            lastname: user?.lastName,
            phone: user?.phone,
            email: user?.email,
            dob: user?.dob,
            role: user?.role,
            gender: user?.gender,
            maritalstatus: user?.maritalStatus,
            currentaddress: user?.currentAddress,
            permanentaddress: user?.permanentAddress,
        };

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            console.log("password is invalid");
            return
        } else {
            console.log("user is login")
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

        cookieStore.set("token", token,
            {
                httpOnly: true,
                // maxAge: 60 ,
            }
        );


        return JSON.parse(JSON.stringify(user));

    } catch (error: any) {
        console.log("Unable to login admin", error);
        throw error
    }
}



export async function loginStudent({ userName, password }: loginProps) {
    await connectToDB();
    const cookieStore = cookies();
    try {
        const student = await Student.findOne({ userName })
        if (!student) {
            console.log("Student doesnt exist")
            return null
        };

        const tokenData = {
            id: student?._id,
            username: student?.userName,
            firstname: student?.firstName,
            middlename: student?.middleName,
            lastname: student?.lastName,
            phone: student?.phone,
            email: student?.email,
            dob: student?.dob,
            gender: student?.gender,
            maritalstatus: student?.maritalStatus,
            currentaddress: student?.currentAddress,
            permanentaddress: student?.permanentAddress,
            guardianName: student?.guardianName,
            guardianPhone: student?.guardianPhone,
            guardianRelationship: student?.guardianRelationship,
            level: student?.level,
            stage: student?.stage,
            term: student?.term,
            session: student?.session,
            studentId: student?.studentId,
        };

        const isPasswordValid = await compare(password, student.password);

        if (!isPasswordValid) {
            console.log("password is invalid");
            return
        } else {
            console.log("student is login")
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

        cookieStore.set("token", token,
            {
                httpOnly: true,
                // maxAge: 60 ,
            }
        );


        return JSON.parse(JSON.stringify(student));

    } catch (error: any) {
        console.log("Unable to login student", error);
        throw error
    }
}




export async function loginTeacher({ userName, password }: loginProps) {
    await connectToDB();
    const cookieStore = cookies();
    try {
        const teacher = await Teacher.findOne({ userName })
        if (!teacher) {
            console.log("Teacher doesnt exist")
            return null
        };

        const tokenData = {
            id: teacher?._id,
            username: teacher?.userName,
            firstname: teacher?.firstName,
            middlename: teacher?.middleName,
            lastname: teacher?.lastName,
            phone: teacher?.phone,
            email: teacher?.email,
            dob: teacher?.dob,
            role: teacher?.role,
            gender: teacher?.gender,
            maritalstatus: teacher?.maritalStatus,
            currentaddress: teacher?.currentAddress,
            permanentaddress: teacher?.permanentAddress,
            kin: teacher?.kin,
            kinPhone: teacher?.kinPhone,
            kinRelationship: teacher?.kinRelationship,
            idCard: teacher?.idCard,
            occupation: teacher?.occupation,
            accountType: teacher?.accountType,
            accountName: teacher?.accountName,
            accountNumber: teacher?.accountNumber,
            level: teacher?.level,
            stage: teacher?.stage
        };

        const isPasswordValid = await compare(password, teacher.password);

        if (!isPasswordValid) {
            console.log("password is invalid");
            return
        } else {
            console.log("teacher is login")
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

        cookieStore.set("token", token,
            {
                httpOnly: true,
                // maxAge: 60 ,
            }
        );


        return JSON.parse(JSON.stringify(teacher));

    } catch (error: any) {
        console.log("Unable to login teacher", error);
        throw error
    }
}