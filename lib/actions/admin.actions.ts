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
    const token = await getTokenValue();
    if(!token){
        console.log("couldnt get token to continue function")
        return;
    }
    const role = token?.role;

    await connectToDB();
    try {

        const admins = await Adminuser.find({role})
        if(!admins){
            console.log("Cant find admins")
            return 
        }

        return admins;

    } catch (error:any) {
        console.log("unable to fetch admin users",error)
    }
}
