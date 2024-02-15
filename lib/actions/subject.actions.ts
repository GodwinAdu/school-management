"use server"

import { revalidatePath } from "next/cache";
import { generateCode } from "../helpers/generateCode";
import Subject from "../models/subject.models";
import { connectToDB } from "../mongoose";

interface CreateSubjectProps {
    subjectName: string;
    subjectCredit: string;
    subjectHour: string;
    subjectLevel: string;
    subjectStage: string;
    subjectAttribute: string;
    status: boolean | undefined;
}
export async function createSubject(values: CreateSubjectProps, path: string) {
    await connectToDB();

    const {
        subjectName,
        subjectCredit,
        subjectHour,
        subjectLevel,
        subjectStage,
        subjectAttribute,
        status,
    } = values;

    const random = generateCode(subjectName);
    try {

        // Check if the subject already exists in the database
        const existingSubject = await Subject.findOne({
            subjectName,
            subjectStage,
            subjectLevel,
        });

        if (existingSubject) {
            console.log("Subject with the same name, stage, and level already exists.");
            // Handle the error or return an error response as needed
            throw new Error("Subject with the same name, stage, and level already exists.");
        }

        const value = new Subject({
            subjectName,
            subjectCredit,
            subjectHour,
            subjectLevel,
            subjectStage,
            subjectAttribute,
            status,
            code: random
        })

        await value.save();

        revalidatePath(path);

    } catch (error) {
        console.log("unable to create subject", error);
        throw error;
    }
}


export async function getAllSubjects() {
    await connectToDB();
    try {

        const subjects = await Subject.find({})
        if (!subjects) {
            console.log("Cant find subjects")
            return
        }

        return subjects;

    } catch (error: any) {
        console.log("unable to fetch subjects users", error)
        throw error;
    }
}

interface FetchSubjectForClass {
    level: string;
    stage: string
}

export async function fetchSubjectForClass({ level, stage }: FetchSubjectForClass) {
    await connectToDB();
    try {
        const result = await Subject.find({
            subjectLevel: level,
            subjectStage: stage
        })

        if (!result) {
            console.log("result doesnt exist")
        }
        return result;
    } catch (error: any) {
        console.log("unable to fetch Class", error);
        throw error;
    }
}

export async function deleteSubject({ id }: { id: string }) {
    await connectToDB();
    try {
        const result = await Subject.findByIdAndDelete({
            _id: id
        })
        if (!result) {
            console.log("result don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete sucessfully")

        return result;
    } catch (error) {
        console.error("Error deleting result(subject):", error);
        throw error; // throw the error to handle it at a higher level if needed
    }

}
