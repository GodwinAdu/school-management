"use server"

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose"
import Classroom from "../models/classroom.models";

interface CreateClassroomProps{
    name:string;
    status:boolean | undefined
}

export async function createClassroom({name,status}:CreateClassroomProps){
    await connectToDB();

    try {
        const classroom = new Classroom({
            name,
            status
        })

        await classroom.save();
        
    } catch (error:any) {
        console.log("unable to create new classroom",error)
        throw error;
    }
}

export async function fetchClassroomById({id}:{id:string}){
    await connectToDB();
    try {
        const classroom = await Classroom.findById({
            _id:id
        })

        if(!classroom){
            console.log("Classroom doesnt exist")
        }
        return classroom;
    } catch (error:any) {
        console.log("unable to fetch Classroom",error);
        throw error;
    }
}


export async function getAllClassrooms(){

    await connectToDB();

    try {
        const classrooms = await Classroom.find({})

        if (!classrooms || classrooms.length === 0) {

            console.log("Classrooms don't exist");

            return null; // or throw an error if you want to handle it differently
        }

        const serializeClassroom = classrooms.map(classroom => {
            return {
                ...classroom._doc,
                _id: classroom._id.toString()
            }
        });

        return serializeClassroom;

    } catch (error:any) {
        console.error("Error fetching Classrooms:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }
}

// interface UpdateClassroomProps{
//     name:string;
//     perion:string;
// }

export async function updateClassroom(classroomId: string, values: Partial<CreateClassroomProps>, path: string) {
    await connectToDB();

    try {
        const updatedClassroom = await Classroom.findByIdAndUpdate(
            classroomId,
            { $set: values },
            { new: true, runValidators: true }
        );

        if (!updatedClassroom) {
            console.log("Termunot found");
            return null;
        }

        revalidatePath(path)

        return updatedClassroom;
    } catch (error) {
        console.error("Error updating Classroom:", error);
        throw error;
    }
}

export async function deleteClassroom({ id }: { id: string }) {
    await connectToDB();
    try {
        const classroom = await Classroom.findByIdAndDelete({
            _id: id
        })
        if (!classroom) {
            console.log("Classroom don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete sucessfully")

        return classroom;
    } catch (error) {
        console.error("Error deleting Classroom:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }

}

