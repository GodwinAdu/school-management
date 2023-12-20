"use server"

import { revalidatePath } from "next/cache";
import Level from "../models/level.models";
import { connectToDB } from "../mongoose"


export async function createLevel({name}:{name:string}){
    await connectToDB();

    try {
        const level = new Level({
            name
        })

        await level.save();
        
    } catch (error:any) {
        console.log("unable to create new level",error)
        throw error;
    }
}

export async function fetchLevelById({id}:{id:string}){
    await connectToDB();
    try {
        const level = await Level.findById({
            _id:id
        })

        if(!level){
            console.log("level doesnt exist")
        }
        return level;
    } catch (error:any) {
        console.log("unable to fetch level",error);
        throw error;
    }
}


export async function getAllLevels(){

    await connectToDB();

    try {
        const Levels = await Level.find({})

        if (!Levels || Levels.length === 0) {

            console.log("Levels don't exist");

            return null; // or throw an error if you want to handle it differently
        }

        const serializeLevel = Levels.map(level => {
            return {
                ...level._doc,
                _id: level._id.toString()
            }
        });

        return serializeLevel;

    } catch (error:any) {
        console.error("Error fetching Levels:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }
}

interface UpdateLevelProps{
    name:string;
    createdBy:string;
}

export async function updateLevel(levelId: string, values: UpdateLevelProps, path: string) {
    await connectToDB();

    try {
        const updatedLevel = await Level.findByIdAndUpdate(
            levelId,
            { $set: values },
            { new: true, runValidators: true }
        );

        if (!updatedLevel) {
            console.log("Levelunot found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return updatedLevel;
    } catch (error) {
        console.error("Error updating level:", error);
        throw error;
    }
}

export async function deleteLevel({ id }: { id: string }) {
    await connectToDB();
    try {
        const level = await Level.findByIdAndDelete({
            _id: id
        })
        if (!level) {
            console.log("level don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete sucessfully")

        return level;
    } catch (error) {
        console.error("Error deleting level:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }

}

