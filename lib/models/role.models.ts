import mongoose,{Document} from "mongoose";

export interface IRole extends Document {
    _id:string;
    name: string;
    displayName: string;
    description?: string;
    manageSchool: boolean;
    manageAccess: boolean;
    dashboard: boolean;
    schoolInfo: boolean;
    systemConfig: boolean;
    frontendManagement: boolean;
    manageUsers: boolean;
    transferStudent: boolean;
    manageAttendance: boolean;
    manageTimeTable: boolean;
    repeatStudent: boolean;
    examsManagement: boolean;
    salaryAndPayment: boolean;
    feesAndPayment: boolean;
    library: boolean;
    viewChart: boolean;
    viewMemberTab: boolean;
    viewEnquiries: boolean;
    viewExpenses: boolean;
    addRole: boolean;
    manageRole: boolean;
    viewRole: boolean;
    editRole: boolean;
    deleteRole: boolean;
    addTerm: boolean;
    manageTerm: boolean;
    viewTerm: boolean;
    editTerm: boolean;
    deleteTerm: boolean;
    addClass: boolean;
    manageClass: boolean;
    viewClass: boolean;
    editClass: boolean;
    deleteClass: boolean;
    addSubject: boolean;
    manageSubject: boolean;
    viewSubject: boolean;
    editSubject: boolean;
    deleteSubject: boolean;
    addLevel: boolean;
    manageLevel: boolean;
    viewLevel: boolean;
    editLevel: boolean;
    deleteLevel: boolean;
    addSession: boolean;
    manageSession: boolean;
    viewSession: boolean;
    editSession: boolean;
    deleteSession: boolean;
    addDay: boolean;
    manageDay: boolean;
    viewDay: boolean;
    editDay: boolean;
    deleteDay: boolean;
    addTime: boolean;
    manageTime: boolean;
    viewTime: boolean;
    editTime: boolean;
    deleteTime: boolean;
    addClassroom: boolean;
    manageClassroom: boolean;
    viewClassroom: boolean;
    editClassroom: boolean;
    deleteClassroom: boolean;
    addClassSection: boolean;
    manageClassSection: boolean;
    viewClassSection: boolean;
    editClassSection: boolean;
    deleteClassSection: boolean;
    addPlotSection: boolean;
    managePlotSection: boolean;
    viewPlotSection: boolean;
    editPlotSection: boolean;
    deletePlotSection: boolean;
    addSchoolHouse: boolean;
    manageSchoolHouse: boolean;
    viewSchoolHouse: boolean;
    editSchoolHouse: boolean;
    deleteSchoolHouse: boolean;
    addGradingSystem: boolean;
    manageGradingSystem: boolean;
    viewGradingSystem: boolean;
    editGradingSystem: boolean;
    deleteGradingSystem: boolean;
    addSchoolEvent: boolean;
    manageSchoolEvent: boolean;
    viewSchoolEvent: boolean;
    editSchoolEvent: boolean;
    deleteSchoolEvent: boolean;
    addSchoolBanner: boolean;
    manageSchoolBanner: boolean;
    viewSchoolBanner: boolean;
    editSchoolBanner: boolean;
    deleteSchoolBanner: boolean;
    addSalaryStructure: boolean;
    manageSalaryStructure: boolean;
    viewSalaryStructure: boolean;
    editSalaryStructure: boolean;
    deleteSalaryStructure: boolean;
    addSalaryPayment: boolean;
    manageSalaryPayment: boolean;
    viewSalaryPayment: boolean;
    editSalaryPayment: boolean;
    deleteSalaryPayment: boolean;
    addBook: boolean;
    manageBook: boolean;
    viewBook: boolean;
    editBook: boolean;
    deleteBook: boolean;
    addIssueBook: boolean;
    manageIssueBook: boolean;
    viewIssueBook: boolean;
    editIssueBook: boolean;
    deleteIssueBook: boolean;
    addAdmin: boolean;
    manageAdmin: boolean;
    viewAdmin: boolean;
    editAdmin: boolean;
    deleteAdmin: boolean;
    addTeacher: boolean;
    manageTeacher: boolean;
    viewTeacher: boolean;
    editTeacher: boolean;
    deleteTeacher: boolean;
    addStudent: boolean;
    manageStudent: boolean;
    viewStudent: boolean;
    editStudent: boolean;
    deleteStudent: boolean;
    publishResult: boolean;
    default: boolean;
    createdAt: Date;
    updatedAt?: Date;
}

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    manageSchool: {
        type: Boolean,
        default: false
    },
    manageAccess: {
        type: Boolean,
        default: false
    },
    dashboard: {
        type: Boolean,
        default: false
    },
    schoolInfo: {
        type: Boolean,
        default: false
    },
    systemConfig: {
        type: Boolean,
        default: false
    },
    frontendManagement: {
        type: Boolean,
        default: false
    },
    manageUsers: {
        type: Boolean,
        default: false
    },
    transferStudent: {
        type: Boolean,
        default: false
    },
    manageAttendance: {
        type: Boolean,
        default: false
    },
    manageTimeTable: {
        type: Boolean,
        default: false
    },
    repeatStudent: {
        type: Boolean,
        default: false
    },
    examsManagement: {
        type: Boolean,
        default: false
    },
    salaryAndPayment: {
        type: Boolean,
        default: false
    },
    feesAndPayment: {
        type: Boolean,
        default: false
    },
    library: {
        type: Boolean,
        default: false
    },
    viewChart: {
        type: Boolean,
        default: false
    },
    viewMemberTab: {
        type: Boolean,
        default: false
    },
    viewEnquiries: {
        type: Boolean,
        default: false
    },
    viewExpenses: {
        type: Boolean,
        default: false
    },
    addRole: {
        type: Boolean,
        default: false
    },
    manageRole: {
        type: Boolean,
        default: false
    },
    viewRole: {
        type: Boolean,
        default: false
    },
    editRole: {
        type: Boolean,
        default: false
    },
    deleteRole: {
        type: Boolean,
        default: false
    },
    addTerm: {
        type: Boolean,
        default: false
    },
    manageTerm: {
        type: Boolean,
        default: false
    },
    viewTerm: {
        type: Boolean,
        default: false
    },
    editTerm: {
        type: Boolean,
        default: false
    },
    deleteTerm: {
        type: Boolean,
        default: false
    },
    addClass: {
        type: Boolean,
        default: false
    },
    manageClass: {
        type: Boolean,
        default: false
    },
    viewClass: {
        type: Boolean,
        default: false
    },
    editClass: {
        type: Boolean,
        default: false
    },
    deleteClass: {
        type: Boolean,
        default: false
    },
    addSubject: {
        type: Boolean,
        default: false
    },
    manageSubject: {
        type: Boolean,
        default: false
    },
    viewSubject: {
        type: Boolean,
        default: false
    },
    editSubject: {
        type: Boolean,
        default: false
    },
    deleteSubject: {
        type: Boolean,
        default: false
    },
    addLevel: {
        type: Boolean,
        default: false
    },
    manageLevel: {
        type: Boolean,
        default: false
    },
    viewLevel: {
        type: Boolean,
        default: false
    },
    editLevel: {
        type: Boolean,
        default: false
    },
    deleteLevel: {
        type: Boolean,
        default: false
    },
    addSession: {
        type: Boolean,
        default: false
    },
    manageSession: {
        type: Boolean,
        default: false
    },
    viewSession: {
        type: Boolean,
        default: false
    },
    editSession: {
        type: Boolean,
        default: false
    },
    deleteSession: {
        type: Boolean,
        default: false
    },
    addDay: {
        type: Boolean,
        default: false
    },
    manageDay: {
        type: Boolean,
        default: false
    },
    viewDay: {
        type: Boolean,
        default: false
    },
    editDay: {
        type: Boolean,
        default: false
    },
    deleteDay: {
        type: Boolean,
        default: false
    },
    addTime: {
        type: Boolean,
        default: false
    },
    manageTime: {
        type: Boolean,
        default: false
    },
    viewTime: {
        type: Boolean,
        default: false
    },
    editTime: {
        type: Boolean,
        default: false
    },
    deleteTime: {
        type: Boolean,
        default: false
    },
    addClassroom: {
        type: Boolean,
        default: false
    },
    manageClassroom: {
        type: Boolean,
        default: false
    },
    viewClassroom: {
        type: Boolean,
        default: false
    },
    editClassroom: {
        type: Boolean,
        default: false
    },
    deleteClassroom: {
        type: Boolean,
        default: false
    },
    addClassSection: {
        type: Boolean,
        default: false
    },
    manageClassSection: {
        type: Boolean,
        default: false
    },
    viewClassSection: {
        type: Boolean,
        default: false
    },
    editClassSection: {
        type: Boolean,
        default: false
    },
    deleteClassSection: {
        type: Boolean,
        default: false
    },
    addPlotSection: {
        type: Boolean,
        default: false
    },
    managePlotSection: {
        type: Boolean,
        default: false
    },
    viewPlotSection: {
        type: Boolean,
        default: false
    },
    editPlotSection: {
        type: Boolean,
        default: false
    },
    deletePlotSection: {
        type: Boolean,
        default: false
    },
    addSchoolHouse: {
        type: Boolean,
        default: false
    },
    manageSchoolHouse: {
        type: Boolean,
        default: false
    },
    viewSchoolHouse: {
        type: Boolean,
        default: false
    },
    editSchoolHouse: {
        type: Boolean,
        default: false
    },
    deleteSchoolHouse: {
        type: Boolean,
        default: false
    },
    addGradingSystem: {
        type: Boolean,
        default: false
    },
    manageGradingSystem: {
        type: Boolean,
        default: false
    },
    viewGradingSystem: {
        type: Boolean,
        default: false
    },
    editGradingSystem: {
        type: Boolean,
        default: false
    },
    deleteGradingSystem: {
        type: Boolean,
        default: false
    },
    addSchoolEvent: {
        type: Boolean,
        default: false
    },
    manageSchoolEvent: {
        type: Boolean,
        default: false
    },
    viewSchoolEvent: {
        type: Boolean,
        default: false
    },
    editSchoolEvent: {
        type: Boolean,
        default: false
    },
    deleteSchoolEvent: {
        type: Boolean,
        default: false
    },
    addSchoolBanner: {
        type: Boolean,
        default: false
    },
    manageSchoolBanner: {
        type: Boolean,
        default: false
    },
    viewSchoolBanner: {
        type: Boolean,
        default: false
    },
    editSchoolBanner: {
        type: Boolean,
        default: false
    },
    deleteSchoolBanner: {
        type: Boolean,
        default: false
    },
    addSalaryStructure: {
        type: Boolean,
        default: false
    },
    manageSalaryStructure: {
        type: Boolean,
        default: false
    },
    viewSalaryStructure: {
        type: Boolean,
        default: false
    },
    editSalaryStructure: {
        type: Boolean,
        default: false
    },
    deleteSalaryStructure: {
        type: Boolean,
        default: false
    },
    addSalaryPayment: {
        type: Boolean,
        default: false
    },
    manageSalaryPayment: {
        type: Boolean,
        default: false
    },
    viewSalaryPayment: {
        type: Boolean,
        default: false
    },
    editSalaryPayment: {
        type: Boolean,
        default: false
    },
    deleteSalaryPayment: {
        type: Boolean,
        default: false
    },
    addBook: {
        type: Boolean,
        default: false
    },
    manageBook: {
        type: Boolean,
        default: false
    },
    viewBook: {
        type: Boolean,
        default: false
    },
    editBook: {
        type: Boolean,
        default: false
    },
    deleteBook: {
        type: Boolean,
        default: false
    },
    addIssueBook: {
        type: Boolean,
        default: false
    },
    manageIssueBook: {
        type: Boolean,
        default: false
    },
    viewIssueBook: {
        type: Boolean,
        default: false
    },
    editIssueBook: {
        type: Boolean,
        default: false
    },
    deleteIssueBook: {
        type: Boolean,
        default: false
    },
    addAdmin: {
        type: Boolean,
        default: false
    },
    manageAdmin: {
        type: Boolean,
        default: false
    },
    viewAdmin: {
        type: Boolean,
        default: false
    },
    editAdmin: {
        type: Boolean,
        default: false
    },
    deleteAdmin: {
        type: Boolean,
        default: false
    },
    addTeacher: {
        type: Boolean,
        default: false
    },
    manageTeacher: {
        type: Boolean,
        default: false
    },
    viewTeacher: {
        type: Boolean,
        default: false
    },
    editTeacher: {
        type: Boolean,
        default: false
    },
    deleteTeacher: {
        type: Boolean,
        default: false
    },
    addStudent: {
        type: Boolean,
        default: false
    },
    manageStudent: {
        type: Boolean,
        default: false
    },
    viewStudent: {
        type: Boolean,
        default: false
    },
    editStudent: {
        type: Boolean,
        default: false
    },
    deleteStudent: {
        type: Boolean,
        default: false
    },
    publishResult: {
        type: Boolean,
        default: false
    },
    default: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
});


const Role = mongoose.models.Role || mongoose.model("Role", RoleSchema);

export default Role;