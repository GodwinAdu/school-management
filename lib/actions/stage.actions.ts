"use server"

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose"
import Stage from "../models/stage.models";

export async function createStage({name}:{name:string}){
    await connectToDB();

    try {
        const stage = new Stage({
            name
        })

        await stage.save();
        
    } catch (error:any) {
        console.log("unable to create new Stage",error)
        throw error;
    }
}

export async function fetchStageById({id}:{id:string}){
    await connectToDB();
    try {
        const stage = await Stage.findById({
            _id:id
        })

        if(!stage){
            console.log("Stage doesnt exist")
        }
        return stage;
    } catch (error:any) {
        console.log("unable to fetch Stage",error);
        throw error;
    }
}


export async function getAllStages(){

    await connectToDB();

    try {
        const stages = await Stage.find({})

        if (!stages || stages.length === 0) {

            console.log("Stages don't exist");

            return null; // or throw an error if you want to handle it differently
        }

        const serializeStage = stages.map(stage => {
            return {
                ...stage._doc,
                _id: stage._id.toString()
            }
        });

        return serializeStage;

    } catch (error:any) {
        console.error("Error fetching Stages:", error);
        throw error; // throw the error to handle it at a higher Stage if needed
    }
}

interface UpdateStageProps{
    name:string;
    createdBy:string;
}

export async function updateStage(stageId: string, values: UpdateStageProps, path: string) {
    await connectToDB();

    try {
        const updatedStage = await Stage.findByIdAndUpdate(
            stageId,
            { $set: values },
            { new: true, runValidators: true }
        );

        if (!updatedStage) {
            console.log("Stage not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return updatedStage;
    } catch (error) {
        console.error("Error updating Stage:", error);
        throw error;
    }
}

export async function deleteStage({ id }: { id: string }) {
    await connectToDB();
    try {
        const stage = await Stage.findByIdAndDelete({
            _id: id
        })
        if (!stage) {
            console.log("Stage don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete sucessfully")

        return stage;
    } catch (error) {
        console.error("Error deleting Stage:", error);
        throw error; // throw the error to handle it at a higher Stage if needed
    }

}

