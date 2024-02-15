interface SubMenuItem {
  title: string;
  roleField?: string;
  path: string;
  visible?: boolean; // Define the 'visible' property
}

 export type SideNavItem  = {
  title: string;
  path: string;
  icon: JSX.Element;
  roleField?: string;
  submenu?: boolean;
  subMenuItems?: SubMenuItem[];
}


export type SidebarLink = {
  imgURL: string;
  route: string;
  label: string;
};


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




