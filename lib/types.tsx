export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  roleField?:string;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type RoleColumn = {
  _id: string
  name: string;
    displayName: string;
    description: string;
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
    default:boolean
}

export type AdminUserColumn = {
  _id: string;
  firstName:string;
    userName:string;
    password:string;
    middleName?:string;
    lastName:string;
    email: string;
    dob: Date, // Initialize dob as a Date,
    gender: string;
    phone: string;
    role: string;
    maritalStatus: string;
    country: string;
    state:string;
    city:string;
    permanentAddress:string;
    currentAddress?: string;
};




