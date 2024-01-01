"use server"

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose"
import Time from "../models/time.models";

interface CreateTimeProps{
    name:string;
    period:string;
}
export async function createTime({name,period}:CreateTimeProps){
    await connectToDB();

    try {
        const time = new Time({
            name,
            period
        })

        await time.save();
        
    } catch (error:any) {
        console.log("unable to create new time",error)
        throw error;
    }
}

export async function fetchTimeById({id}:{id:string}){
    await connectToDB();
    try {
        const time = await Time.findById({
            _id:id
        })

        if(!time){
            console.log("time doesnt exist")
        }
        return time;
    } catch (error:any) {
        console.log("unable to fetch time",error);
        throw error;
    }
}


export async function getAllTimes(){

    await connectToDB();

    try {
        const times = await Time.find({})

        if (!times || times.length === 0) {

            console.log("times don't exist");

            return null; // or throw an error if you want to handle it differently
        }

        const serializeTime = times.map(time => {
            return {
                ...time._doc,
                _id: time._id.toString()
            }
        });

        return serializeTime;

    } catch (error:any) {
        console.error("Error fetching times:", error);
        throw error; // throw the error to handle it at a higher Day if needed
    }
}



export async function updateTime(timeId: string, values: Partial<CreateTimeProps>, path: string) {
    await connectToDB();

    try {
        const updatedTime = await Time.findByIdAndUpdate(
            timeId,
            { $set: values },
            { new: true, runValidators: true }
        );

        if (!updateTime) {
            console.log("Time not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return updatedTime;
    } catch (error) {
        console.error("Error updating Time:", error);
        throw error;
    }
}

export async function deleteTime({ id }: { id: string }) {
    await connectToDB();
    try {
        const time = await Time.findByIdAndDelete({
            _id: id
        })
        if (!time) {
            console.log("Time don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete sucessfully")

        return time;

    } catch (error) {
        console.error("Error deleting Time:", error);
        throw error; // throw the error to handle it at a higher Time if needed
    }

}

