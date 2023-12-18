
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
    publishResult?: boolean | undefined;
}
export async function createRole(values: CreateRoleProps, path: string) {
    const { name,
        displayName,
        description,
        manageSchool,
        manageAccess,
        dashboard,
        schoolInfo,
        systemConfig,
        frontendManagement,
        manageUsers,
        transferStudent,
        manageAttendance,
        manageTimeTable,
        repeatStudent,
        examsManagement,
        salaryAndPayment,
        feesAndPayment,
        library,
        viewChart,
        viewMemberTab,
        viewEnquiries,
        viewExpenses,
        addRole,
        manageRole,
        viewRole,
        editRole,
        deleteRole,
        addTerm,
        manageTerm,
        viewTerm,
        editTerm,
        deleteTerm,
        addClass,
        manageClass,
        viewClass,
        editClass,
        deleteClass,
        addSubject,
        manageSubject,
        viewSubject,
        editSubject,
        deleteSubject,
        addLevel,
        manageLevel,
        viewLevel,
        editLevel,
        deleteLevel,
        addSession,
        manageSession,
        viewSession,
        editSession,
        deleteSession,
        addDay,
        manageDay,
        viewDay,
        editDay,
        deleteDay,
        addTime,
        manageTime,
        viewTime,
        editTime,
        deleteTime,
        addClassroom,
        manageClassroom,
        viewClassroom,
        editClassroom,
        deleteClassroom,
        addClassSection,
        manageClassSection,
        viewClassSection,
        editClassSection,
        deleteClassSection,
        addPlotSection,
        managePlotSection,
        viewPlotSection,
        editPlotSection,
        deletePlotSection,
        addSchoolHouse,
        manageSchoolHouse,
        viewSchoolHouse,
        editSchoolHouse,
        deleteSchoolHouse,
        addGradingSystem,
        manageGradingSystem,
        viewGradingSystem,
        editGradingSystem,
        deleteGradingSystem,
        addSchoolEvent,
        manageSchoolEvent,
        viewSchoolEvent,
        editSchoolEvent,
        deleteSchoolEvent,
        addSchoolBanner,
        manageSchoolBanner,
        viewSchoolBanner,
        editSchoolBanner,
        deleteSchoolBanner,
        addSalaryStructure,
        manageSalaryStructure,
        viewSalaryStructure,
        editSalaryStructure,
        deleteSalaryStructure,
        addSalaryPayment,
        manageSalaryPayment,
        viewSalaryPayment,
        editSalaryPayment,
        deleteSalaryPayment,
        addBook,
        manageBook,
        viewBook,
        editBook,
        deleteBook,
        addIssueBook,
        manageIssueBook,
        viewIssueBook,
        editIssueBook,
        deleteIssueBook,
        addAdmin,
        manageAdmin,
        viewAdmin,
        editAdmin,
        deleteAdmin,
        addTeacher,
        manageTeacher,
        viewTeacher,
        editTeacher,
        deleteTeacher,
        addStudent,
        manageStudent,
        viewStudent,
        editStudent,
        deleteStudent,
        publishResult, } = values;

    await connectToDB();
    try {
        const role = new Role({
            name,
            displayName,
            description,
            manageSchool,
            manageAccess,
            dashboard,
            schoolInfo,
            systemConfig,
            frontendManagement,
            manageUsers,
            transferStudent,
            manageAttendance,
            manageTimeTable,
            repeatStudent,
            examsManagement,
            salaryAndPayment,
            feesAndPayment,
            library,
            viewChart,
            viewMemberTab,
            viewEnquiries,
            viewExpenses,
            addRole,
            manageRole,
            viewRole,
            editRole,
            deleteRole,
            addTerm,
            manageTerm,
            viewTerm,
            editTerm,
            deleteTerm,
            addClass,
            manageClass,
            viewClass,
            editClass,
            deleteClass,
            addSubject,
            manageSubject,
            viewSubject,
            editSubject,
            deleteSubject,
            addLevel,
            manageLevel,
            viewLevel,
            editLevel,
            deleteLevel,
            addSession,
            manageSession,
            viewSession,
            editSession,
            deleteSession,
            addDay,
            manageDay,
            viewDay,
            editDay,
            deleteDay,
            addTime,
            manageTime,
            viewTime,
            editTime,
            deleteTime,
            addClassroom,
            manageClassroom,
            viewClassroom,
            editClassroom,
            deleteClassroom,
            addClassSection,
            manageClassSection,
            viewClassSection,
            editClassSection,
            deleteClassSection,
            addPlotSection,
            managePlotSection,
            viewPlotSection,
            editPlotSection,
            deletePlotSection,
            addSchoolHouse,
            manageSchoolHouse,
            viewSchoolHouse,
            editSchoolHouse,
            deleteSchoolHouse,
            addGradingSystem,
            manageGradingSystem,
            viewGradingSystem,
            editGradingSystem,
            deleteGradingSystem,
            addSchoolEvent,
            manageSchoolEvent,
            viewSchoolEvent,
            editSchoolEvent,
            deleteSchoolEvent,
            addSchoolBanner,
            manageSchoolBanner,
            viewSchoolBanner,
            editSchoolBanner,
            deleteSchoolBanner,
            addSalaryStructure,
            manageSalaryStructure,
            viewSalaryStructure,
            editSalaryStructure,
            deleteSalaryStructure,
            addSalaryPayment,
            manageSalaryPayment,
            viewSalaryPayment,
            editSalaryPayment,
            deleteSalaryPayment,
            addBook,
            manageBook,
            viewBook,
            editBook,
            deleteBook,
            addIssueBook,
            manageIssueBook,
            viewIssueBook,
            editIssueBook,
            deleteIssueBook,
            addAdmin,
            manageAdmin,
            viewAdmin,
            editAdmin,
            deleteAdmin,
            addTeacher,
            manageTeacher,
            viewTeacher,
            editTeacher,
            deleteTeacher,
            addStudent,
            manageStudent,
            viewStudent,
            editStudent,
            deleteStudent,
            publishResult
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

        const result = {
            _id: role._id.toString(),
            ...role._doc,
        };

        return result
    } catch (error: any) {
        console.error("Error fetching roles by display name:", error);
        throw error; // throw the error to handle it at a higher level if needed
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


        const result = {
            _id: role._id.toString(),
            ...role._doc,
        };


        return result

    } catch (error: any) {
        console.error("Error fetching role by id:", error);
        throw error; // throw the error to handle it at a higher level if needed
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

        const serializeRole = roles.map(role => {
            return {
                ...role._doc,
                _id: role._id.toString()
            }
        });

        return serializeRole;

    } catch (error) {
        console.error("Error fetching roles:", error);
        throw error; // throw the error to handle it at a higher level if needed
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

        return roles;

    } catch (error) {
        console.error("Error fetching roles name:", error);
        throw error; // throw the error to handle it at a higher level if needed
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
        return deleteRole;
    } catch (error) {
        console.error("Error deleting role:", error);
        throw error; // throw the error to handle it at a higher level if needed
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

        return updatedRole;
    } catch (error) {
        console.error("Error updating role:", error);
        throw error;
    }
}