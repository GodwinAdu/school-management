import { fetchRole } from "../actions/role.actions";
import { currentProfile } from "./current-profile";


export async function currentUserRole() {

    const user = await currentProfile();

    const role = user?.role;

    if (!user) {
        console.log("User does not exist")
        return;
    }

    try {
        const userRole = await fetchRole({
            value: role
        });

        if (!userRole) {
            console.log("cant find User role");
            return;
        }

        return userRole;
        
    } catch (error: any) {
        console.log("Error happen while fetching role", error)
    }
}