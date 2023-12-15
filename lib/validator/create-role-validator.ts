import z from "zod"


export const CreateRoleSchema = z.object({
    name: z.string().min(2, {
      message: "Role name is require",
    }),
    displayName: z.string().min(2, {
      message: "Display name is require",
    }),
    description: z.string().min(2, {
      message: "Description is require",
    }),
    manageSchool: z.boolean().optional(),
    manageAccess: z.boolean().optional(),
    dashboard: z.boolean().optional(),
    schoolInfo: z.boolean().optional(),
    systemConfig: z.boolean().optional(),
    frontendManagement: z.boolean().optional(),
    manageUsers: z.boolean().optional(),
    transferStudent: z.boolean().optional(),
    manageAttendance: z.boolean().optional(),
    manageTimeTable: z.boolean().optional(),
    repeatStudent: z.boolean().optional(),
    examsManagement: z.boolean().optional(),
    salaryAndPayment: z.boolean().optional(),
    feesAndPayment: z.boolean().optional(),
    library: z.boolean().optional(),
    viewChart: z.boolean().optional(),
    viewMemberTab: z.boolean().optional(),
    viewEnquiries: z.boolean().optional(),
    viewExpenses: z.boolean().optional(),
    addRole: z.boolean().optional(),
    manageRole: z.boolean().optional(),
    viewRole: z.boolean().optional(),
    editRole: z.boolean().optional(),
    deleteRole: z.boolean().optional(),
    addSubject: z.boolean().optional(),
    manageSubject: z.boolean().optional(),
    viewSubject: z.boolean().optional(),
    editSubject: z.boolean().optional(),
    deleteSubject: z.boolean().optional(),
    addTerm: z.boolean().optional(),
    manageTerm: z.boolean().optional(),
    viewTerm: z.boolean().optional(),
    editTerm: z.boolean().optional(),
    deleteTerm: z.boolean().optional(),
    addClass: z.boolean().optional(),
    manageClass: z.boolean().optional(),
    viewClass: z.boolean().optional(),
    editClass: z.boolean().optional(),
    deleteClass: z.boolean().optional(),
    addLevel: z.boolean().optional(),
    manageLevel: z.boolean().optional(),
    viewLevel: z.boolean().optional(),
    editLevel: z.boolean().optional(),
    deleteLevel: z.boolean().optional(),
    addSession: z.boolean().optional(),
    manageSession: z.boolean().optional(),
    viewSession: z.boolean().optional(),
    editSession: z.boolean().optional(),
    deleteSession: z.boolean().optional(),
    addDay: z.boolean().optional(),
    manageDay: z.boolean().optional(),
    viewDay: z.boolean().optional(),
    editDay: z.boolean().optional(),
    deleteDay: z.boolean().optional(),
    addTime: z.boolean().optional(),
    manageTime: z.boolean().optional(),
    viewTime: z.boolean().optional(),
    editTime: z.boolean().optional(),
    deleteTime: z.boolean().optional(),
    addClassroom: z.boolean().optional(),
    manageClassroom: z.boolean().optional(),
    viewClassroom: z.boolean().optional(),
    editClassroom: z.boolean().optional(),
    deleteClassroom: z.boolean().optional(),
    addClassSection: z.boolean().optional(),
    manageClassSection: z.boolean().optional(),
    viewClassSection: z.boolean().optional(),
    editClassSection: z.boolean().optional(),
    deleteClassSection: z.boolean().optional(),
    addPlotSection: z.boolean().optional(),
    managePlotSection: z.boolean().optional(),
    viewPlotSection: z.boolean().optional(),
    editPlotSection: z.boolean().optional(),
    deletePlotSection: z.boolean().optional(),
    addSchoolHouse: z.boolean().optional(),
    manageSchoolHouse: z.boolean().optional(),
    viewSchoolHouse: z.boolean().optional(),
    editSchoolHouse: z.boolean().optional(),
    deleteSchoolHouse: z.boolean().optional(),
    addGradingSystem: z.boolean().optional(),
    manageGradingSystem: z.boolean().optional(),
    viewGradingSystem: z.boolean().optional(),
    editGradingSystem: z.boolean().optional(),
    deleteGradingSystem: z.boolean().optional(),
    addSchoolEvent: z.boolean().optional(),
    manageSchoolEvent: z.boolean().optional(),
    viewSchoolEvent: z.boolean().optional(),
    editSchoolEvent: z.boolean().optional(),
    deleteSchoolEvent: z.boolean().optional(),
    addSchoolBanner: z.boolean().optional(),
    manageSchoolBanner: z.boolean().optional(),
    viewSchoolBanner: z.boolean().optional(),
    editSchoolBanner: z.boolean().optional(),
    deleteSchoolBanner: z.boolean().optional(),
    addSalaryStructure: z.boolean().optional(),
    manageSalaryStructure: z.boolean().optional(),
    viewSalaryStructure: z.boolean().optional(),
    editSalaryStructure: z.boolean().optional(),
    deleteSalaryStructure: z.boolean().optional(),
    addSalaryPayment: z.boolean().optional(),
    manageSalaryPayment: z.boolean().optional(),
    viewSalaryPayment: z.boolean().optional(),
    editSalaryPayment: z.boolean().optional(),
    deleteSalaryPayment: z.boolean().optional(),
    addBook: z.boolean().optional(),
    manageBook: z.boolean().optional(),
    viewBook: z.boolean().optional(),
    editBook: z.boolean().optional(),
    deleteBook: z.boolean().optional(),
    addIssueBook: z.boolean().optional(),
    manageIssueBook: z.boolean().optional(),
    viewIssueBook: z.boolean().optional(),
    editIssueBook: z.boolean().optional(),
    deleteIssueBook: z.boolean().optional(),
    addAdmin: z.boolean().optional(),
    manageAdmin: z.boolean().optional(),
    viewAdmin: z.boolean().optional(),
    editAdmin: z.boolean().optional(),
    deleteAdmin: z.boolean().optional(),
    addTeacher: z.boolean().optional(),
    manageTeacher: z.boolean().optional(),
    viewTeacher: z.boolean().optional(),
    editTeacher: z.boolean().optional(),
    deleteTeacher: z.boolean().optional(),
    addStudent: z.boolean().optional(),
    manageStudent: z.boolean().optional(),
    viewStudent: z.boolean().optional(),
    editStudent: z.boolean().optional(),
    deleteStudent: z.boolean().optional(),
    publishResult: z.boolean().optional(),
  });
  