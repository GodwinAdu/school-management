"use server"

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose"
import House from "../models/house.models";


export async function createHouse({name}:{name:string}){
    await connectToDB();

    try {
        const house = new House({
            name
        })

        await house.save();
        
    } catch (error:any) {
        console.log("unable to create new house",error)
        throw error;
    }
}

export async function fetchHouseById({id}:{id:string}){
    await connectToDB();
    try {
        const house = await House.findById({
            _id:id
        })

        if(!house){
            console.log("House doesnt exist")
        }
        return house;
    } catch (error:any) {
        console.log("unable to fetch house",error);
        throw error;
    }
}


export async function getAllHouses(){

    await connectToDB();

    try {
        const houses = await House.find({})

        if (!houses || houses.length === 0) {

            console.log("houses don't exist");

            return null; // or throw an error if you want to handle it differently
        }

        const serializeHouse = houses.map(house => {
            return {
                ...house._doc,
                _id: house._id.toString()
            }
        });

        return serializeHouse;

    } catch (error:any) {
        console.error("Error fetching Houses:", error);
        throw error; // throw the error to handle it at a higher Day if needed
    }
}

interface UpdateHouseProps{
    name:string;
    createdBy:string;
}

export async function updateHouse(houseId: string, values: UpdateHouseProps, path: string) {
    await connectToDB();

    try {
        const updatedHouse = await House.findByIdAndUpdate(
            houseId,
            { $set: values },
            { new: true, runValidators: true }
        );

        if (!updatedHouse) {
            console.log("House not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return updatedHouse;
    } catch (error) {
        console.error("Error updating House:", error);
        throw error;
    }
}

export async function deleteHouse({ id }: { id: string }) {
    await connectToDB();
    try {
        const house = await House.findByIdAndDelete({
            _id: id
        })
        if (!house) {
            console.log("House don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete sucessfully")

        return house;

    } catch (error) {
        console.error("Error deleting House:", error);
        throw error; // throw the error to handle it at a higher House if needed
    }

}

