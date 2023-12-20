"use server"

import { revalidatePath } from "next/cache";
import Day from "../models/day.models";
import { connectToDB } from "../mongoose"


export async function createDay({name}:{name:string}){
    await connectToDB();

    try {
        const day = new Day({
            name
        })

        await day.save();
        
    } catch (error:any) {
        console.log("unable to create new day",error)
        throw error;
    }
}

export async function fetchDayById({id}:{id:string}){
    await connectToDB();
    try {
        const day = await Day.findById({
            _id:id
        })

        if(!day){
            console.log("Day doesnt exist")
        }
        return day;
    } catch (error:any) {
        console.log("unable to fetch Day",error);
        throw error;
    }
}


export async function getAllDays(){

    await connectToDB();

    try {
        const days = await Day.find({})

        if (!days || days.length === 0) {

            console.log("Days don't exist");

            return null; // or throw an error if you want to handle it differently
        }

        const serializeDay = days.map(day => {
            return {
                ...day._doc,
                _id: day._id.toString()
            }
        });

        return serializeDay;

    } catch (error:any) {
        console.error("Error fetching Days:", error);
        throw error; // throw the error to handle it at a higher Day if needed
    }
}

interface UpdateDayProps{
    name:string;
    createdBy:string;
}

export async function updateDay(dayId: string, values: UpdateDayProps, path: string) {
    await connectToDB();

    try {
        const updatedDay = await Day.findByIdAndUpdate(
            dayId,
            { $set: values },
            { new: true, runValidators: true }
        );

        if (!updatedDay) {
            console.log("Day not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return updatedDay;
    } catch (error) {
        console.error("Error updating Day:", error);
        throw error;
    }
}

export async function deleteDay({ id }: { id: string }) {
    await connectToDB();
    try {
        const day = await Day.findByIdAndDelete({
            _id: id
        })
        if (!day) {
            console.log("Day don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete sucessfully")

        return day;

    } catch (error) {
        console.error("Error deleting Day:", error);
        throw error; // throw the error to handle it at a higher Day if needed
    }

}

