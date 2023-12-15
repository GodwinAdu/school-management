import { cookies } from "next/headers";

import jwt, { TokenExpiredError } from "jsonwebtoken"

import { fetchAdmin } from "../actions/fetchadmin.actions";

interface RequestCookie {
    id: string;
    username: string;
    firstname: string;
    middlename: string;
    lastname: string;
    phone: string;
    email: string;
    dob: string;
    role: string;
    gender: string;
    maritalstatus: string;
    currentaddress: string;
    permanentaddress: string;
    iat: Date
    exp: Date
}

interface UserProfileResponse {
    success: boolean;
    message: string;
    user?: any; // Add the actual user type/interface
}

export async function currentProfile() {
    const cookiesStore = cookies();
    const tokenValue = cookiesStore.get("token");

    try {

        if (!tokenValue || !tokenValue.value) {
            return null;
        };

        const decode: RequestCookie | undefined = await jwt.verify(tokenValue.value, process.env.TOKEN_SECRET!);
        
        // Check if the token has expired
        if (!decode) {
            return null;
        }

        const user = await fetchAdmin({ id: decode?.id });

        if (!user) {
            return null;
        }

        return user;

    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return;
        };

        console.error("Error decoding token", error);
        return;
    }
}