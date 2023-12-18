"use server"

import { hash } from "bcrypt";
import Adminuser from "../models/admin.models";
import { connectToDB } from "../mongoose";
import { getTokenValue } from "@/lib/hooks/getTokenValue"
import { revalidatePath } from "next/cache";


interface CreateAdminProps{
    firstName:string;
    userName:string;
    password:string;
    middleName?:string;
    lastName:string;
    email: string;
    dob: Date, // Initialize dob as a Date,
    gender: string;
    phone: string;
    role: string;
    maritalStatus: string;
    country: string;
    state:string;
    city:string;
    permanentAddress:string;
    currentAddress?: string;
    path:string
}
export async function createAdmin({
    firstName,
    userName,
    password,
    middleName,
    lastName,
    email,
    dob,
    gender,
    phone,
    role,
    maritalStatus,
    country,
    state,
    city,
    permanentAddress,
    currentAddress,
    path
}:CreateAdminProps){
    await connectToDB();
    try {
        const hashedPassword =  await hash(password, 10);

        const admin = new Adminuser({
            firstName,
            userName,
            password:hashedPassword,
            middleName:middleName ?? "",
            lastName,
            email,
            dob,
            gender,
            phone,
            role:role ||"admin",
            maritalStatus:maritalStatus ||"single",
            country,
            state,
            city,
            permanentAddress:permanentAddress || "suame",
            currentAddress
        })

        await admin.save();
        revalidatePath(path);
        
    } catch (error:any) {
        console.log("something went wrong",error)
    }
}



export async function getAllAdmins(){
    await connectToDB();
    try {

        const admins = await Adminuser.find({})
        if(!admins){
            console.log("Cant find admins")
            return 
        }

        return admins;

    } catch (error:any) {
        console.log("unable to fetch admin users",error)
    }
}



export async function deleteAdmin({ id }: { id: string }) {
    await connectToDB();
    try {
        const admin = await Adminuser.findByIdAndDelete({
            _id: id
        })
        if (!admin) {
            console.log("admin don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete sucessfully")

        return admin;
    } catch (error) {
        console.error("Error deleting admin:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }

}

export async function updateAdmin(adminId: string, values: Partial<CreateAdminProps>, path: string) {
    await connectToDB();

    try {
        const updatedAdmin = await Adminuser.findByIdAndUpdate(
            adminId,
            { $set: values },
            { new: true, runValidators: true }
        );

        if (!updatedAdmin) {
            console.log("Adminuser not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return updatedAdmin;
    } catch (error) {
        console.error("Error updating admin:", error);
        throw error;
    }
}
