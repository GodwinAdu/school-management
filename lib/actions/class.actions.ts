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
