"use server"

import { hash } from "bcrypt";
import Student from "../models/student.models";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import { generateStudentID } from "../hooks/generateStudentId";


interface CreateStudentProps {
    firstName: string;
    userName: string;
    password: string;
    middleName?: string;
    lastName: string;
    email: string;
    dob: Date, // Initialize dob as a Date,
    gender: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    permanentAddress: string;
    currentAddress?: string;
    guardianName: string;
    guardianPhone: string;
    guardianRelationship: string;
    level:string;
    stage:string;
    term:string;
    session:string;   
}
export async function createStudent(formData: CreateStudentProps, path: string) {
    await connectToDB();
    try {
        const hashedPassword = await hash(formData.password, 10);

        const student = new Student({
            firstName: formData.firstName,
            userName: formData.userName,
            password: hashedPassword,
            middleName: formData.middleName ?? "",
            lastName: formData.lastName,
            email: formData.email,
            dob: formData.dob,
            gender: formData.gender,
            phone: formData.phone,
            country: formData.country,
            state: formData.state,
            city: formData.city,
            permanentAddress: formData.permanentAddress,
            currentAddress: formData.currentAddress || "",
            guardianName: formData.guardianName,
            guardianPhone: formData.guardianPhone,
            guardianRelationship: formData.guardianRelationship,
            level:formData.level,
            stage:formData.stage,
            term:formData.term,
            session:formData.session, 
            studentId:generateStudentID(), 
        })

        await student.save();
        revalidatePath(path);

    } catch (error: any) {
        console.log("something went wrong", error)
    }
}


interface FetchAdminProps{
    id:string
}

export async function fetchStudent({id}:FetchAdminProps){
    await connectToDB();
    try {
        const student = await Student.findById({_id:id});

        if(!student){
            console.log("student doesnt exist")
            return null
        }
        
       // Exclude sensitive information like password
    const { password, ...userWithoutPassword } = student.toObject();
    return userWithoutPassword;
    
    } catch (error:any) {
        console.log("Unable to fetch student",error)
    }
}

export async function getAllStudents() {
    await connectToDB();
    try {

        const students = await Student.find({})
        if (!students) {
            console.log("Cant find Students")
            return
        }

        return students;

    } catch (error: any) {
        console.log("unable to fetch Student users", error)
    }
}

interface FetchStudentForClass {
    level: string;
    stage: string
}

export async function fetchStudentForClass({ level, stage }: FetchStudentForClass) {
    await connectToDB();
    try {
        const result = await Student.find({
            level,
            stage
        })

        if (!result) {
            console.log("result doesnt exist")
        }
        return result;
    } catch (error: any) {
        console.log("unable to fetch Student", error);
        throw error;
    }
}


export async function deleteStudent({ id }: { id: string }) {
    await connectToDB();
    try {
        const student = await Student.findByIdAndDelete({
            _id: id
        })
        if (!student) {
            console.log("Student don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete sucessfully")

        return student;
    } catch (error) {
        console.error("Error deleting Student:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }

}

export async function updateStudent(studentId: string, values: Partial<CreateStudentProps>, path: string) {
    await connectToDB();

    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            { $set: values },
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            console.log("Studentuser not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return updatedStudent;
    } catch (error) {
        console.error("Error updating Student:", error);
        throw error;
    }
}
