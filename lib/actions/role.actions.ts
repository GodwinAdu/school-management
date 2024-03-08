
"use server"

import { revalidatePath } from "next/cache";
import Role from "../models/role.models";
import { connectToDB } from "../mongoose"


interface CreateRoleProps {
    name: string;
    displayName: string;
    description: string;
    manageSchool?: boolean | undefined;
    manageAccess?: boolean | undefined;
    dashboard?: boolean | undefined;
    schoolInfo?: boolean | undefined;
    systemConfig?: boolean | undefined;
    frontendManagement?: boolean | undefined;
    manageUsers?: boolean | undefined;
    transferStudent?: boolean | undefined;
    manageAttendance?: boolean | undefined;
    manageTimeTable?: boolean | undefined;
    repeatStudent?: boolean | undefined;
    examsManagement?: boolean | undefined;
    salaryAndPayment?: boolean | undefined;
    feesAndPayment?: boolean | undefined;
    library?: boolean | undefined;
    viewChart?: boolean | undefined;
    viewMemberTab?: boolean | undefined;
    viewEnquiries?: boolean | undefined;
    viewExpenses?: boolean | undefined;
    addRole?: boolean | undefined;
    manageRole?: boolean | undefined;
    viewRole?: boolean | undefined;
    editRole?: boolean | undefined;
    deleteRole?: boolean | undefined;
    addTerm?: boolean | undefined;
    manageTerm?: boolean | undefined;
    viewTerm?: boolean | undefined;
    editTerm?: boolean | undefined;
    deleteTerm?: boolean | undefined;
    addClass?: boolean | undefined;
    manageClass?: boolean | undefined;
    viewClass?: boolean | undefined;
    editClass?: boolean | undefined;
    deleteClass?: boolean | undefined;
    addSubject?: boolean | undefined;
    manageSubject?: boolean | undefined;
    viewSubject?: boolean | undefined;
    editSubject?: boolean | undefined;
    deleteSubject?: boolean | undefined;
    addLevel?: boolean | undefined;
    manageLevel?: boolean | undefined;
    viewLevel?: boolean | undefined;
    editLevel?: boolean | undefined;
    deleteLevel?: boolean | undefined;
    addSession?: boolean | undefined;
    manageSession?: boolean | undefined;
    viewSession?: boolean | undefined;
    editSession?: boolean | undefined;
    deleteSession?: boolean | undefined;
    addDay?: boolean | undefined;
    manageDay?: boolean | undefined;
    viewDay?: boolean | undefined;
    editDay?: boolean | undefined;
    deleteDay?: boolean | undefined;
    addTime?: boolean | undefined;
    manageTime?: boolean | undefined;
    viewTime?: boolean | undefined;
    editTime?: boolean | undefined;
    deleteTime?: boolean | undefined;
    addClassroom?: boolean | undefined;
    manageClassroom?: boolean | undefined;
    viewClassroom?: boolean | undefined;
    editClassroom?: boolean | undefined;
    deleteClassroom?: boolean | undefined;
    addClassSection?: boolean | undefined;
    manageClassSection?: boolean | undefined;
    viewClassSection?: boolean | undefined;
    editClassSection?: boolean | undefined;
    deleteClassSection?: boolean | undefined;
    addPlotSection?: boolean | undefined;
    managePlotSection?: boolean | undefined;
    viewPlotSection?: boolean | undefined;
    editPlotSection?: boolean | undefined;
    deletePlotSection?: boolean | undefined;
    addSchoolHouse?: boolean | undefined;
    manageSchoolHouse?: boolean | undefined;
    viewSchoolHouse?: boolean | undefined;
    editSchoolHouse?: boolean | undefined;
    deleteSchoolHouse?: boolean | undefined;
    addGradingSystem?: boolean | undefined;
    manageGradingSystem?: boolean | undefined;
    viewGradingSystem?: boolean | undefined;
    editGradingSystem?: boolean | undefined;
    deleteGradingSystem?: boolean | undefined;
    addSchoolEvent?: boolean | undefined;
    manageSchoolEvent?: boolean | undefined;
    viewSchoolEvent?: boolean | undefined;
    editSchoolEvent?: boolean | undefined;
    deleteSchoolEvent?: boolean | undefined;
    addSchoolBanner?: boolean | undefined;
    manageSchoolBanner?: boolean | undefined;
    viewSchoolBanner?: boolean | undefined;
    editSchoolBanner?: boolean | undefined;
    deleteSchoolBanner?: boolean | undefined;
    addSalaryStructure?: boolean | undefined;
    manageSalaryStructure?: boolean | undefined;
    viewSalaryStructure?: boolean | undefined;
    editSalaryStructure?: boolean | undefined;
    deleteSalaryStructure?: boolean | undefined;
    addSalaryPayment?: boolean | undefined;
    manageSalaryPayment?: boolean | undefined;
    viewSalaryPayment?: boolean | undefined;
    editSalaryPayment?: boolean | undefined;
    deleteSalaryPayment?: boolean | undefined;
    addBook?: boolean | undefined;
    manageBook?: boolean | undefined;
    viewBook?: boolean | undefined;
    editBook?: boolean | undefined;
    deleteBook?: boolean | undefined;
    addIssueBook?: boolean | undefined;
    manageIssueBook?: boolean | undefined;
    viewIssueBook?: boolean | undefined;
    editIssueBook?: boolean | undefined;
    deleteIssueBook?: boolean | undefined;
    addAdmin?: boolean | undefined;
    manageAdmin?: boolean | undefined;
    viewAdmin?: boolean | undefined;
    editAdmin?: boolean | undefined;
    deleteAdmin?: boolean | undefined;
    addTeacher?: boolean | undefined;
    manageTeacher?: boolean | undefined;
    viewTeacher?: boolean | undefined;
    editTeacher?: boolean | undefined;
    deleteTeacher?: boolean | undefined;
    addStudent?: boolean | undefined;
    manageStudent?: boolean | undefined;
    viewStudent?: boolean | undefined;
    editStudent?: boolean | undefined;
    deleteStudent?: boolean | undefined;
    addStudentAttendance?: boolean | undefined;
    manageStudentAttendance?: boolean | undefined;
    viewStudentAttendance?: boolean | undefined;
    editStudentAttendance?: boolean | undefined;
    deleteStudentAttendance?: boolean | undefined;
    addTeacherAttendance?: boolean | undefined;
    manageTeacherAttendance?: boolean | undefined;
    viewTeacherAttendance?: boolean | undefined;
    editTeacherAttendance?: boolean | undefined;
    deleteTeacherAttendance?: boolean | undefined;
    publishResult?: boolean | undefined;
}
export async function createRole(values: CreateRoleProps, path: string) {
    const {
        name,
        displayName,
        description,
        ...permissions
    } = values;

    await connectToDB();
    try {
        // Check if any existing role matches the provided name, display name, or description
        const existingRole = await Role.findOne({
            $or: [
                { name },
                { displayName },
                { description }
            ]
        });

        // If an existing role is found, throw an error
        if (existingRole) {
            throw new Error('Role with the same name, display name, or description already exists');
        }

        const role = new Role({
            name,
            displayName,
            description,
            ...permissions
        });

        await role.save();

        revalidatePath(path)

    } catch (error: any) {
        throw error;
    }
}


export async function fetchRole({ value }: { value: string }) {
    await connectToDB();
    try {
        const role = await Role.findOne({ displayName: value });
        if (!role) {
            console.log("role doesnt exist")
            return
        }

        return JSON.parse(JSON.stringify(role))
    } catch (error: any) {
        console.error("Error fetching roles by display name:", error);
        throw error; 
    }
}


export async function fetchRoleById({ id }: { id: string }) {
    await connectToDB();

    try {
        const role = await Role.findById({ _id: id });
        if (!role) {
            console.log("role doesnt exist")
            return
        }


        return JSON.parse(JSON.stringify(role))

    } catch (error: any) {
        console.error("Error fetching role by id:", error);
        throw error;
    }
}

export async function getAllRoles() {
    await connectToDB();
    try {
        const roles = await Role.find({});

        if (!roles || roles.length === 0) {
            console.log("Roles don't exist");
            return null; // or throw an error if you want to handle it differently
        }

        return JSON.parse(JSON.stringify(roles))

    } catch (error) {
        console.error("Error fetching roles:", error);
        throw error;
    }
}
export async function getRolesName() {
    await connectToDB();
    try {
        const roles = await Role.find({}, { displayName: 1, _id: 1 });


        if (!roles || roles.length === 0) {
            console.log("Roles name don't exist");
            return null; // or throw an error if you want to handle it differently
        }

        return JSON.parse(JSON.stringify(roles))

    } catch (error) {
        console.error("Error fetching roles name:", error);
        throw error;
    }
}


export async function deleteUserRole({ id }: { id: string }) {
    await connectToDB();
    try {
        const deleteRole = await Role.findByIdAndDelete({
            _id: id
        })
        if (!deleteRole) {
            console.log("Roles don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        console.log("delete sucessfully")
        return JSON.parse(JSON.stringify(deleteRole));
    } catch (error) {
        console.error("Error deleting role:", error);
        throw error; 
    }

}

export async function updateRole(roleId: string, values: Partial<CreateRoleProps>, path: string) {
    await connectToDB();

    try {
        const updatedRole = await Role.findByIdAndUpdate(
            roleId,
            { $set: values },
            { new: true, runValidators: true }
        );

        if (!updatedRole) {
            console.log("Role not found");
            return null;
        }

        console.log("Update successful");

        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedRole));
    } catch (error) {
        console.error("Error updating role:", error);
        throw error;
    }
}