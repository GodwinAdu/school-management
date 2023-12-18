"use server"

import Adminuser from "../models/admin.models";
import { connectToDB } from "../mongoose";

interface FetchAdminProps{
    id:string
}

export async function fetchAdmin({id}:FetchAdminProps){
    await connectToDB();
    try {
        const user = await Adminuser.findById({_id:id});

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