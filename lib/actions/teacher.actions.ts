"use server"

import { hash } from "bcrypt";
import { connectToDB } from "../mongoose";
import { getTokenValue } from "@/lib/hooks/getTokenValue"
import { revalidatePath } from "next/cache";
import Teacher from "../models/teacher.models";


interface CreateTeacherProps {
    firstName: string;
    userName: string;
    password: string;
    middleName?: string;
    lastName: string;
    email: string;
    dob: string, // Initialize dob as a Date,
    gender: string;
    phone: string;
    maritalStatus: string;
    country: string;
    state: string;
    city: string;
    permanentAddress: string;
    currentAddress?: string;
    kin: string;
    kinPhone: string;
    kinRelationship: string;
    idCard: string;
    occupation: string;
    accountType: string;
    accountName: string;
    accountNumber: string;
    stage:string;
    level:string;
}
export async function createTeacher(formData: CreateTeacherProps, path: string) {
    await connectToDB();
    try {
        const hashedPassword = await hash(formData.password, 10);

        const teacher = new Teacher({
            firstName: formData.firstName,
            userName: formData.userName,
            password: hashedPassword,
            middleName: formData.middleName ?? "",
            lastName: formData.lastName,
            email: formData.email,
            dob: formData.dob,
            gender: formData.gender,
            phone: formData.phone,
            maritalStatus: formData.maritalStatus,
            country: formData.country,
            state: formData.state,
            city: formData.city,
            permanentAddress: formData.permanentAddress,
            currentAddress: formData.currentAddress || "",
            kin: formData.kin,
            kinPhone: formData.kinPhone,
            kinRelationship: formData.kinRelationship,
            idCard: formData.idCard,
            occupation: formData.occupation,
            accountType: formData.accountType,
            accountName: formData.accountName,
            accountNumber: formData.accountNumber,
            level:formData.level,
            stage:formData.stage
        })

        await teacher.save();
        revalidatePath(path);

    } catch (error: any) {
        console.log("something went wrong", error)
    }
}

interface FetchTeacherProps{
    id:string
}

export async function fetchTeacher({id}:FetchTeacherProps){
    await connectToDB();
    try {
        const user = await Teacher.findById({_id:id});

        if(!user){
            console.log("user doesnt exist")
            return null
        }
        
       // Exclude sensitive information like password
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
    
    } catch (error:any) {
        console.log("Unable to fetch user",error)
    }
}

interface FetchTeacherForClass {
    level: string;
    stage: string
}

export async function fetchTeacherForClass({ level, stage }: FetchTeacherForClass) {
    await connectToDB();
    try {
        const result = await Teacher.find({
            level,
            stage
        })

        if (!result) {
            console.log("result doesnt exist")
        }
        return result;
    } catch (error: any) {
        console.log("unable to fetch Teacher", error);
        throw error;
    }
}




export async function getAllTeachers() {
    await connectToDB();
    try {

        const teachers = await Teacher.find({})
        if (!teachers) {
            console.log("Cant find teachers")
            return
        }

        return teachers;

    } catch (error: any) {
        console.log("unable to fetch teacher users", error)
    }
}



export async function deleteTeacher({ id }: { id: string }) {
    await connectToDB();
    try {
        const teacher = await Teacher.findByIdAndDelete({
            _id: id
        })
        if (!teacher) {
            console.log("teacher don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete sucessfully")

        return teacher;
    } catch (error) {
        console.error("Error deleting teacher:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }

}

export async function updateTeacher(teacherId: string, values: Partial<CreateTeacherProps>, path: string) {
    await connectToDB();

    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(
            teacherId,
            { $set: values },
            { new: true, runValidators: true }
        );

        if (!updatedTeacher) {
            console.log("Teacher not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return updatedTeacher;
    } catch (error) {
        console.error("Error updating teacher:", error);
        throw error;
    }
}
