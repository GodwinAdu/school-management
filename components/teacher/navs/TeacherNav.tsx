"use client";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";


import React, { useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { RoleColumn, SideNavItem } from "@/lib/types";
import {
  BadgeHelp,
  Book,
  ChevronDown,
  ChevronDownIcon,
  ChevronRightIcon,
  DollarSign,
  DollarSignIcon,
  Group,
  HelpCircle,
  Info,
  LayoutDashboard,
  Library,
  Mail,
  ScreenShare,
  Server,
  TimerOff,
  User,
  Users,
} from "lucide-react";
import { IconBadge } from "@/components/ui/icon-badge";
import { IRole } from "@/lib/models/role.models";


type NavProps = {
  userRole:IRole
}

const TeacherNav = ({ userRole }:NavProps) => {
  const params = useParams();
  const pathname = usePathname();
  const [open, setOpen] = useState(0);

  const handleOpen = (value:any) => {
    setOpen(open === value ? 0 : value);
  };
  // const [subMenuOpen, setSubMenuOpen] = useState<{ [key: number]: boolean }>({});

  // const toggleSubMenu = (index:any) => {
  //   setSubMenuOpen({
  //     ...subMenuOpen,
  //     [index]: !subMenuOpen[index],
  //   });
  // };
  const id = params.adminId;

  const SIDENAV_ITEMS: SideNavItem[] = [
    {
      title: "Dashboard",
      path: `/admin/${id}`,
      icon: <IconBadge size="sm" icon={LayoutDashboard} />,
      roleField: "dashboard",
    },
    {
      title: "School info",
      path: `/admin/${id}/school-info`,
      icon: <IconBadge size="sm" icon={Info} />,
      roleField: "schoolInfo",
    },
    {
      title: "System Config",
      path: "",
      icon: <IconBadge size="sm" icon={Server} />,
      roleField: "systemConfig",
      submenu: true,
      subMenuItems: [
        {
          title: "manage Roles & Permis",
          roleField: "manageRole",
          path: `/admin/${id}/system-config/manage-role`,
        },
        {
          title: "manage Terms",
          roleField: "manageTerm",
          path: `/admin/${id}/system-config/manage-term`,
        },
        {
          title: "manage Sessions",
          roleField: "manageSession",
          path: `/admin/${id}/system-config/manage-sessions`,
        },
        {
          title: "manage Classes",
          roleField: "manageClass",
          path: `/admin/${id}/system-config/manage-classes`,
        },
        {
          title: "manage Subjects",
          roleField: "manageSubject",
          path: `/admin/${id}/system-config/manage-subjects`,
        },
        {
          title: "manage Levels",
          roleField: "manageLevel",
          path: `/admin/${id}/system-config/manage-levels`,
        },
        {
          title: "manage Days",
          roleField: "manageDay",
          path: `/admin/${id}/system-config/manage-days`,
        },
        {
          title: "manage Time",
          roleField: "manageTime",
          path: `/admin/${id}/system-config/manage-time`,
        },
        {
          title: "manage Classrooms",
          roleField: "manageClassroom",
          path: `/admin/${id}/system-config/manage-classrooms`,
        },
        {
          title: "manage Stages",
          roleField: "manageClassSection",
          path: `/admin/${id}/system-config/manage-stages`,
        },
        {
          title: "manage House",
          roleField: "manageSchoolHouse",
          path: `/admin/${id}/system-config/manage-house`,
        },
        {
          title: "manage School sections",
          roleField: "managePlotSection",
          path: `/admin/${id}/system-config/manage-school-section`,
        },
        {
          title: "manage Grading system",
          roleField: "manageGradingSystem",
          path: `/admin/${id}/system-config/manage-grading-system`,
        },
        {
          title: "Publish Result",
          roleField: "publishResult",
          path: `/admin/${id}/system-config/manage-publish-result`,
        },
      ],
    },
    {
      title: "Frontend Display",
      path: "",
      icon: <IconBadge size="sm" icon={ScreenShare} />,
      roleField: "frontendManagement",
      submenu: true,
      subMenuItems: [
        {
          title: "School events",
          roleField: "schoolEvent",
          path: `/admin/${id}/frontend-display/school-events`,
        },
        {
          title: "School Banners",
          roleField: "schoolBanner",
          path: `/admin/${id}/frontend-display/school-banners`,
        },
        
      ],
    },
    {
      title: "Manage Users",
      path: "",
      icon: <IconBadge size="sm" icon={Users} />,
      roleField: "manageUsers",
      submenu: true,
      subMenuItems: [
        {
          title: "manage Admins",
          roleField: "manageAdmin",
          path: `/admin/${id}/manage-users/manage-admin`,
        },
       
        {
          title: "manage Teachers",
          roleField: "manageTeacher",
          path: `/admin/${id}/manage-users/manage-teacher`,
        },
        
        {
          title: "manage Students",
          roleField: "manageStudent",
          path: `/admin/${id}/manage-users/manage-student`,
        },
        
      ],
    },
    {
      title: "Pro/Transfer Students",
      path: `/admin/${id}/transfer-student`,
      icon: <IconBadge size="sm" icon={Mail} />,
      roleField: "transferStudent",
    },
    {
      title: "Manage Attendance",
      path: `/admin/${id}/manage-attendance`,
      icon: <IconBadge size="sm" icon={BadgeHelp} />,
      roleField: "manageAttendance",
    },
    {
      title: "Manage Time table",
      path: `/admin/${id}/manage-timetable`,
      icon: <IconBadge size="sm" icon={TimerOff} />,
      roleField: "manageTimeTable",
    },
    {
      title: "Repeated student",
      path: "",
      icon: <IconBadge size="sm" icon={User} />,
      roleField: "repeatStudent",
      submenu: true,
      subMenuItems: [
        {
          title: "Current Repeated",
          path: `/admin/${id}/repeated-student/current-repeated`,
        },
        {
          title: "Previous Repeated",
          path: `/admin/${id}/repeated-student/previous-repeated`,
        },
      ],
    },
    {
      title: "Exams ",
      path: "",
      icon: <IconBadge size="sm" icon={Book} />,
      roleField: "examsManagement",
      submenu: true,
      subMenuItems: [
        {
          title: "manage Exam type",
          path: `/admin/${id}/exam/manage-exam-type`,
        },
        {
          title: "Create Exams Question",
          path: `/admin/${id}/exam/create-exams-question`,
        },
        {
          title: "Generate Questions",
          path: `/admin/${id}/exam/generate-questions`,
        },
      ],
    },
    {
      title: "Salary & payments",
      path: "",
      icon: <IconBadge size="sm" icon={DollarSignIcon} />,
      roleField: "salaryAndPayment",
      submenu: true,
      subMenuItems: [
        {
          title: "Salary Structure",
          roleField: "salaryStructure",
          path: `/admin/${id}/salary-payments/salary-structure`,
        },
        {
          title: "Salary payments",
          // roleField: "salaryPayment",
          path: `/admin/${id}/salary-payments/salary-payment`,
        },
      ],
    },
    {
      title: "Fees & Payment",
      path: "",
      icon: <IconBadge size="sm" icon={DollarSign} />,
      roleField: "feesAndPayment",
      submenu: true,
      subMenuItems: [
        {
          title: "individual fees payment",
          // roleField: "individualFess",
          path: `/admin/${id}/fees-payment/individual-fees-payment`,
        },
        {
          title: "Classwise Fees",
          // roleField: "classwiseFees",
          path: `/admin/${id}/fees-payment/classwise-fees`,
        },
      ],
    },
    {
      title: "Library ",
      path: "",
      icon: <IconBadge size="sm" icon={Library} />,
      roleField: "library",
      // active:
      submenu: true,
      subMenuItems: [
        {
          title: "manage books",
          roleField: "manageBook",
          path: `/admin/${id}/library/manage-books`,
        },
        {
          title: "manage issue Books",
          roleField: "manageIssueBook",
          path: `/admin/${id}/library/manage-issue-books`,
        }
      ],
    },
    // {
    //   title: '',
    //   path: '/admin',
    //   icon: <Icon icon="lucide:settings" width="16" height="16" />,
    //   submenu: true,
    //   subMenuItems: [
    //     { title: '', path: '/' },
    //     { title: '', path: '/' },
    //   ],
    // },
    {
      title: "Help",
      path: `/admin/${id}/help`,
      icon: <IconBadge size="sm" icon={HelpCircle} />,
      roleField: "help",
      // active:pathname ===`/admin/${id}/help`
    },
  ];

  const filteredItems = SIDENAV_ITEMS.filter((item) => {
    if (item.roleField && item.roleField !== "help") {
      return userRole && userRole[item?.roleField];
    }

    return true;
  }).map((mainItem) => {
    if (mainItem.subMenuItems) {
      const filteredSubItems = mainItem.subMenuItems.map((subItem) => ({
        ...subItem,
        visible: !subItem.roleField || userRole[subItem.roleField],
      }));

      // Include the main item only if there are accessible sub-menu items
      return { ...mainItem, subMenuItems: filteredSubItems };
    }

    // Include the main item as there are no sub-menu items
    return mainItem;
  });

 
  return (
    <div className="">
      <div className=" h-screen p-4 shadow-xl shadow-blue-gray-900/5 custom-scrollbar sticky left-0 top-0 z-50 flex flex-col overflow-auto border-r ">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Sidebar
          </Typography>
        </div>
        <List>
          {/* Use map to dynamically generate links */}
          {Array.isArray(filteredItems) &&
            filteredItems.map((item, index) => (
              <React.Fragment key={index}>
                {item?.submenu ? (
                  <Accordion
                    open={open === index + 1}
                    icon={
                      <ChevronDownIcon
                        className={`mx-auto h-4 w-4 transition-transform ${
                          open === index + 1 ? "rotate-180" : ""
                        }`}
                      />
                    }
                  >
                    <ListItem className="p-0 " selected={open === index + 1}>
                      <AccordionHeader
                        onClick={() => handleOpen(index + 1)}
                        className="border-b-0 p-2"
                      >
                        <ListItemPrefix>{item.icon}</ListItemPrefix>
                        <Typography
                          color="blue-gray"
                          className="mr-auto text-sm font-normal"
                        >
                          {item?.title}
                        </Typography>
                      </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                      <List className="p-0">
                        {item?.subMenuItems?.map(
                          (subItem, subIndex) =>
                            subItem?.visible && (
                              <ListItem key={subIndex} className="text-sm">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    className="h-3 w-5"
                                  />
                                </ListItemPrefix>
                                {/* Use Link for submenu items */}
                                <Link href={subItem?.path}>
                                  {subItem?.title}
                                </Link>
                              </ListItem>
                            )
                        )}
                      </List>
                    </AccordionBody>
                  </Accordion>
                ) : (
                  <ListItem className="text-sm">
                    <ListItemPrefix>{item.icon}</ListItemPrefix>
                    {/* Use Link for non-submenu items */}
                    <Link href={item.path}>{item.title}</Link>
                  </ListItem>
                )}
              </React.Fragment>
            ))}
        </List>
      </div>
    </div>
  );
};

export default TeacherNav;
