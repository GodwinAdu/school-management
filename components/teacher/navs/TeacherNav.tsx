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

const TeacherNav = () => {
  const params = useParams();
  const pathname = usePathname();
  const [open, setOpen] = useState(0);

  const handleOpen = (value: any) => {
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
          {SIDENAV_ITEMS.map((item, index) => (
            <React.Fragment key={index}>
              {item?.submenu ? (
                <Accordion
                  open={open === index + 1}
                  icon={
                    <ChevronDownIcon
                      className={`mx-auto h-4 w-4 transition-transform ${open === index + 1 ? "rotate-180" : ""
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
                        (subItem, subIndex) => (
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
