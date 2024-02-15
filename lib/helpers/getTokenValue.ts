"use server"

import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getTokenValue() {

    const cookieStore = cookies();

    try {
        const token = cookieStore.get("token")?.value

        if (!token) {
            console.log("token is not available")
            return
        };
        
        const decodedToken = await verify(token, process.env.TOKEN_SECRET!);

        if (!decodedToken) {
            console.log("couldnt decode the token")
        }

        return decodedToken;

    } catch (error: any) {
        console.log("something went wrong while get token", error)
    }
}