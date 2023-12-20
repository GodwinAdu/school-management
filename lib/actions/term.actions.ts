"use server"

import { revalidatePath } from "next/cache";
import Term from "../models/term.models";
import { connectToDB } from "../mongoose"


export async function createTerm({name}:{name:string}){
    await connectToDB();

    try {
        const term = new Term({
            name
        })

        await term.save();
        
    } catch (error:any) {
        console.log("unable to create new term",error)
        throw error;
    }
}

export async function fetchTermById({id}:{id:string}){
    await connectToDB();
    try {
        const term = await Term.findById({
            _id:id
        })

        if(!term){
            console.log("term doesnt exist")
        }
        return term;
    } catch (error:any) {
        console.log("unable to fetch term",error);
        throw error;
    }
}


export async function getAllTerms(){

    await connectToDB();

    try {
        const terms = await Term.find({})

        if (!terms || terms.length === 0) {

            console.log("Terms don't exist");

            return null; // or throw an error if you want to handle it differently
        }

        const serializeTerm = terms.map(term => {
            return {
                ...term._doc,
                _id: term._id.toString()
            }
        });

        return serializeTerm;

    } catch (error:any) {
        console.error("Error fetching terms:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }
}

interface UpdateTermProps{
    name:string;
    createdBy:string;
}

export async function updateTerm(termId: string, values: UpdateTermProps, path: string) {
    await connectToDB();

    try {
        const updatedTerm = await Term.findByIdAndUpdate(
            termId,
            { $set: values },
            { new: true, runValidators: true }
        );

        if (!updatedTerm) {
            console.log("Termunot found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return updatedTerm;
    } catch (error) {
        console.error("Error updating term:", error);
        throw error;
    }
}

export async function deleteTerm({ id }: { id: string }) {
    await connectToDB();
    try {
        const term = await Term.findByIdAndDelete({
            _id: id
        })
        if (!term) {
            console.log("term don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete sucessfully")

        return term;
    } catch (error) {
        console.error("Error deleting term:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }

}

