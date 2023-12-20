"use server"

import { revalidatePath } from "next/cache";
import Session from "../models/session.models";
import { connectToDB } from "../mongoose"

interface CreateSessionProps{
    name:string;
    period:string;
    present:boolean
}

export async function createSession({name,period,present}:CreateSessionProps){
    await connectToDB();

    try {
        const session = new Session({
            name,
            period,
            present
        })

        await session.save();
        
    } catch (error:any) {
        console.log("unable to create new session",error)
        throw error;
    }
}

export async function fetchSessionById({id}:{id:string}){
    await connectToDB();
    try {
        const session = await Session.findById({
            _id:id
        })

        if(!session){
            console.log("session doesnt exist")
        }
        return session;
    } catch (error:any) {
        console.log("unable to fetch session",error);
        throw error;
    }
}


export async function getAllSessions(){

    await connectToDB();

    try {
        const sessions = await Session.find({})

        if (!sessions || sessions.length === 0) {

            console.log("sessions don't exist");

            return null; // or throw an error if you want to handle it differently
        }

        const serializeTerm = sessions.map(session => {
            return {
                ...session._doc,
                _id: session._id.toString()
            }
        });

        return serializeTerm;

    } catch (error:any) {
        console.error("Error fetching sessions:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }
}

// interface UpdateTermProps{
//     name:string;
//     perion:string;
// }

export async function updateSession(sessionId: string, values: Partial<CreateSessionProps>, path: string) {
    await connectToDB();

    try {
        const updatedSession = await Session.findByIdAndUpdate(
            sessionId,
            { $set: values },
            { new: true, runValidators: true }
        );

        if (!updatedSession) {
            console.log("Termunot found");
            return null;
        }

        revalidatePath(path)

        return updatedSession;
    } catch (error) {
        console.error("Error updating session:", error);
        throw error;
    }
}

export async function deleteSession({ id }: { id: string }) {
    await connectToDB();
    try {
        const session = await Session.findByIdAndDelete({
            _id: id
        })
        if (!session) {
            console.log("session don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete sucessfully")

        return session;
    } catch (error) {
        console.error("Error deleting session:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }

}

