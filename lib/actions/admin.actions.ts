"use server"

import { hash } from "bcrypt";
import Adminuser from "../models/admin.models";
import { connectToDB } from "../mongoose";
import { getTokenValue } from "@/lib/helpers/getTokenValue"
import { revalidatePath } from "next/cache";


interface CreateAdminProps {
    firstName: string;
    userName: string;
    password: string;
    middleName?: string;
    lastName: string;
    email: string;
    dob: Date, // Initialize dob as a Date,
    gender: string;
    phone: string;
    role: string;
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
}
export async function createAdmin(formData: CreateAdminProps, path: string) {
    await connectToDB();
    try {
        const hashedPassword = await hash(formData.password, 10);

        const admin = new Adminuser({
            firstName: formData.firstName,
            userName: formData.userName,
            password: hashedPassword,
            middleName: formData.middleName ?? "",
            lastName: formData.lastName,
            email: formData.email,
            dob: formData.dob,
            gender: formData.gender,
            phone: formData.phone,
            role: formData.role,
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
        })

        await admin.save();
        revalidatePath(path);

    } catch (error: any) {
        console.log("something went wrong", error)
    }
}



export async function getAllAdmins() {
    await connectToDB();
    try {

        const admins = await Adminuser.find({})
        if (!admins) {
            console.log("Cant find admins")
            return
        }

        return admins;

    } catch (error: any) {
        console.log("unable to fetch admin users", error)
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

export async function totalAdmins() {
    await connectToDB();
    try {
        const totalMembers = await Adminuser.countDocuments({});

        return totalMembers

    } catch (error) {
        console.log("unable to count AdminUsers", error);
        throw error;
    }
}