"use server"

import { generateCode } from "../hooks/generateCode";
import Class from "../models/class.models";
import { connectToDB } from "../mongoose"

interface CreateClassProps{
    name:string;
    level:string;
    stage:string;
}
export async function createClass(values:CreateClassProps,path:string){
    await connectToDB();

    const {name,level,stage} = values;

    const random = generateCode(name);
    try {
         // Check if the subject already exists in the database
         const existingClass = await Class.findOne({
            stage,
            level,
        });

        if (existingClass) {
            console.log("Class with the same name, stage, and level already exists.");
            // Handle the error or return an error response as needed
            throw new Error("Class with the same name, stage, and level already exists.");
        }

        const value = new Class({
            name:name,
            level,
            stage:stage.replace(/\s+/g, '').toLowerCase(),
            code:random
        })

        const result = await value.save()
        return result
        console.log(result)
    } catch (error) {
        console.log("unable to create class",error);
        throw error;
    }
}

export async function getAllClasses() {
    await connectToDB();
    try {

        const classes = await Class.find({})
        if (!classes) {
            console.log("Cant find classes")
            return
        }

        return classes;

    } catch (error: any) {
        console.log("unable to fetch classes users", error)
    }
}

export async function fetchClassByStage({stage}:{stage:string}){
    await connectToDB();
    try {
        const result = await Class.findOne({
            stage
        })

        if(!result){
            console.log("result doesnt exist")
        }
        return result;
    } catch (error:any) {
        console.log("unable to fetch Class",error);
        throw error;
    }
}

export async function deleteClass({ id }: { id: string }) {
    await connectToDB();
    try {
        const result = await Class.findByIdAndDelete({
            _id: id
        })
        if (!result) {
            console.log("result don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete sucessfully")

        return result;
    } catch (error) {
        console.error("Error deleting result(classes):", error);
        throw error; // throw the error to handle it at a higher level if needed
    }

}
