"use server"

import { compare } from "bcrypt";
import Adminuser from "../models/admin.models";
import { connectToDB } from "../mongoose"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface loginAdminUsersProps {
    userName: string;
    password: string;
}
export async function loginAdminUsers({ userName, password }: loginAdminUsersProps) {
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
            gender:user?.gender,
            maritalstatus:user?.maritalStatus,
            currentaddress:user?.currentAddress,
            permanentaddress:user?.permanentAddress,
        };
        
        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            console.log("password is invalid");
            return
        } else {
            console.log("user is login")
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {  expiresIn: '1d' });

        cookieStore.set("token", token,
            { 
                httpOnly: true,
                // maxAge: 60 ,
            }
        );
       

        return user;
    } catch (error: any) {
        console.log("Unable to login admin", error);
    }
}