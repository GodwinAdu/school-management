'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { Book, ChevronDown, DollarSign, DollarSignIcon, Group, HelpCircle, LayoutDashboard, Library, ScreenShare, Server, TimerOff, User, Users } from "lucide-react";
import { Icon } from '@iconify/react';
import { motion, useCycle } from 'framer-motion';
import { SideNavItem } from '@/lib/types';
import { IconBadge } from '../ui/icon-badge';


type MenuItemWithSubMenuProps = {
  item: SideNavItem;
  toggleOpen: () => void;
};

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(0px at 100% 0)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const HeaderMobile = () => {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle(false, true);

  

  const params = useParams();

  // const toggleSubMenu = (index:any) => {
  //   setSubMenuOpen({
  //     ...subMenuOpen,
  //     [index]: !subMenuOpen[index],
  //   });
  // };
  const id = params.adminId

  const SIDENAV_ITEMS: SideNavItem[] = [
    {
      title: 'Dashboard',
      path: `/admin/${id}`,
      icon: <IconBadge size="sm" icon={LayoutDashboard} />,
      roleField:"dashboard"
    },
    {
      title: 'School info',
      path: `/admin/${id}/school-info`,
      icon: <Icon icon="lucide:home" width="16" height="16" />,
      roleField:"schoolInfo"
    },
    {
      title: 'System Config',
      path: '',
      icon: <IconBadge size="sm" icon={Server} />,
      roleField:"systemConfig",
      submenu: true,
      subMenuItems: [
        { title: 'manage Roles & Permis',roleField:"manageRole", path: `/admin/${id}/system-config/manage-role` },
        { title: 'manage Terms',roleField:"manageTerm", path: `/admin/${id}/system-config/manage-term` },
        { title: 'manage Sessions',roleField:"m,anageSession", path: `/admin/${id}/system-config/manage-sessions` },
        { title: 'manage Classes',roleField:"", path: `/admin/${id}/system-config/manage-classes`  },
        { title: 'manage Subjects',roleField:"", path: `/admin/${id}/system-config/manage-subjects`  },
        { title: 'manage Levels',roleField:"", path: `/admin/${id}/system-config/manage-levels`  },
        { title: 'manage Days',roleField:"", path: `/admin/${id}/system-config/manage-days`  },
        { title: 'manage Shifts',roleField:"", path: `/admin/${id}/system-config/manage-shifts` },
        { title: 'manage Time',roleField:"", path: `/admin/${id}/system-config/manage-time` },
        { title: 'manage Classrooms',roleField:"", path:`/admin/${id}/system-config/manage-classrooms`  },
        { title: 'manage Grades',roleField:"", path: `/admin/${id}/system-config/manage-grades`  },
        { title: 'manage Class sections',roleField:"", path: `/admin/${id}/system-config/manage-class-sections`},
        { title: 'manage House',roleField:"", path: `/admin/${id}/system-config/manage-house` },
        { title: 'manage School sections',roleField:"", path: `/admin/${id}/system-config/manage-school-section`},
        { title: 'manage Grading system',roleField:"", path: `/admin/${id}/system-config/manage-grading-system`},
        { title: 'Publish Result',roleField:"", path: `/admin/${id}/system-config/manage-publish-result`},
      ],
    },
    {
      title: 'Frontend Display',
      path: '',
      icon: <IconBadge size="sm" icon={ScreenShare} />,
      roleField:"frontendDisplay",
      submenu: true,
      subMenuItems: [
        { title: 'School events', roleField:"schoolEvent", path: `/admin/${id}/frontend-display/school-events` },
        { title: 'School Banners', roleField:"schoolBanner", path: `/admin/${id}/frontend-display/school-banners` },
        // { title: '', path: '/' },
      ],
    },
    {
      title: 'Manage Users',
      path: "",
      icon: <IconBadge size="sm" icon={Users} />,
      roleField:"manageUser",
      submenu: true,
      subMenuItems: [
        // { title: 'All', path: '/' },
        { title: 'manage Admins', roleField:"manageAdmin", path:`/admin/${id}/manage-users/manage-admin`},
        { title: 'manage Moderators', roleField:"manageModerators", path: `/admin/${id}/manage-users/manage-moderator`},
        { title: 'manage Teachers', roleField:"manageTeachers", path: `/admin/${id}/manage-users/manage-teacher`},
        { title: 'manage Staffs', roleField:"manageStaff", path: `/admin/${id}/manage-users/manage-staff`  },
        { title: 'manage Students', roleField:"manageStudent", path: `/admin/${id}/manage-users/manage-student`},
        { title: 'manage Parents', roleField:"manageParent", path: `/admin/${id}/manage-users/manage-parent`},
      ],
    },
    {
      title: 'Pro/Transfer Students',
      path: `admin/${id}/transfer-student`,
      icon: <Icon icon="lucide:mail" width="16" height="16" />,
      roleField:"transferStudent"
    },
    {
      title: 'Manage Attendance',
      path: `/admin/${id}/manage-attendance` ,
      icon: <Icon icon="lucide:help-circle" width="16" height="16" />,
      roleField:"manageAttendace"
    },
    {
      title: 'Manage Time table',
      path: `/admin/${id}/manage-timetable` ,
      icon: <IconBadge size="sm" icon={TimerOff} />,
      roleField:"manageTimetable"
    },
    {
      title: 'Repeated student',
      path:"",
      icon: <IconBadge size="sm" icon={User} />,
      roleField:"repeatStudent",
      submenu: true,
      subMenuItems: [
        { title: 'Current Repeated', roleField:"currentRepeated", path: `/admin/${id}/repeated-student/current-repeated`  },
        { title: 'Previous Repeated', roleField:"previousRepeated", path: `/admin/${id}/repeated-student/previous-repeated` },
      ],
    },
    {
      title: 'Exams ',
      path:"",
      icon: <IconBadge size="sm" icon={Book} />,
      roleField:"manageExam",
      submenu: true,
      subMenuItems: [
        { title: 'manage Exam type', roleField:"manageExamType", path:`/admin/${id}/exam/manage-exam-type` },
        { title: 'Create Exams Question', roleField:"createExamsQuestion", path: `/admin/${id}/exam/create-exams-question` },
        { title: 'Generate Questions', roleField:"generateQuestion", path: `/admin/${id}/exam/generate-questions` },
      ],
    },
    {
      title: 'Salary & payments',
      path: '',
      icon: <IconBadge size="sm" icon={DollarSignIcon} />,
      roleField:"salaryPayment",
      submenu: true,
      subMenuItems: [
        { title: 'Salary Structure', roleField:"salaryStructure", path: `/admin/${id}/salary-payments/salary-structure`},
        { title: 'Salary payments', roleField:"salaryPayment", path: `/admin/${id}/salary-payments/salary-payment`},
      ],
    },
    {
      title: 'Fees & Payment',
      path: '',
      icon: <IconBadge size="sm" icon={DollarSign} />,
      roleField:"feesPayment",
      submenu: true,
      subMenuItems: [
        { title: 'individual fees payment', roleField:"individualFess", path: `/admin/${id}/fees-payment/individual-fees-payment` },
        { title: 'Classwise Fees', roleField:"classwiseFees", path: `/admin/${id}/fees-payment/classwise-fees` },
      ],
    },
    {
      title: 'Library ',
      path: '',
      icon: <IconBadge size="sm" icon={Library} />,
      roleField:"library",
      // active:
      submenu: true,
      subMenuItems: [
        { title: 'manage books', roleField:"manageBooks", path: `/admin/${id}/library/manage-books` },
        { title: 'manage issue Books', roleField:"manageIssueBooks", path: `/admin/${id}/library/manage-issue-books` },
        { title: 'Manage Members', roleField:"manageMembers", path: `/admin/${id}/library/manage-members` },
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
      title: 'Help',
      path: `/admin/${id}/help`,
      icon: <IconBadge size="sm" icon={HelpCircle} />,
      roleField:"help",
      // active:pathname ===`/admin/${id}/help`
    }
  ];

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      className={`fixed inset-0  z-[100] w-full h-full md:hidden overflow-y-auto ${
        isOpen ? '' : 'pointer-events-none'
      }`}
      ref={containerRef}
    >
      <motion.div
        className="absolute inset-0 right-0 w-full bg-white h-full "
        variants={sidebar}
      />
      <motion.ul
        variants={variants}
        className="absolute grid w-full gap-3 px-10 py-16"
      >
        {SIDENAV_ITEMS.map((item, idx) => {
          const isLastItem = idx === SIDENAV_ITEMS.length - 1; // Check if it's the last item

          return (
            <div key={idx}>
              {item.submenu ? (
                <MenuItemWithSubMenu item={item} toggleOpen={toggleOpen} />
              ) : (
                <MenuItem>
                  <Link
                    href={item.path}
                    onClick={() => toggleOpen()}
                    className={`flex w-full text-sm ${
                      item.path === pathname ? 'font-bold' : ''
                    }`}
                  >
                    {item.title}
                  </Link>
                </MenuItem>
              )}

              {!isLastItem && (
                <MenuItem className="my-3 h-px w-full bg-gray-300" />
              )}
            </div>
          );
        })}
      </motion.ul>
      <MenuToggle toggle={toggleOpen} />
    </motion.nav>
  );
};

export default HeaderMobile;

const MenuToggle = ({ toggle }: { toggle: any }) => (
  <button
    onClick={toggle}
    className="pointer-events-auto absolute right-4 top-[14px] z-50"
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </button>
);

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuItem = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <motion.li variants={MenuItemVariants} className={className}>
      {children}
    </motion.li>
  );
};

const MenuItemWithSubMenu: React.FC<MenuItemWithSubMenuProps> = ({
  item,
  toggleOpen,
}) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <>
      <MenuItem>
        <button
          className="flex w-full text-sm"
          onClick={() => setSubMenuOpen(!subMenuOpen)}
        >
          <div className="flex flex-row justify-between w-full items-center">
            <span
              className={`${pathname.includes(item.path) ? 'font-bold' : ''}`}
            >
              {item.title}
            </span>
            <div className={`${subMenuOpen && 'rotate-180'}`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </div>
        </button>
      </MenuItem>
      <div className="mt-2 ml-2 flex flex-col space-y-2">
        {subMenuOpen && (
          <>
            {item.subMenuItems?.map((subItem, subIdx) => {
              return (
                <MenuItem key={subIdx}>
                  <Link
                    href={subItem.path}
                    onClick={() => toggleOpen()}
                    className={` ${
                      subItem.path === pathname ? 'font-bold' : ''
                    }`}
                  >
                    {subItem.title}
                  </Link>
                </MenuItem>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

const MenuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
      duration: 0.02,
    },
  },
};

const variants = {
  open: {
    transition: { staggerChildren: 0.02, delayChildren: 0.15 },
  },
  closed: {
    transition: { staggerChildren: 0.01, staggerDirection: -1 },
  },
};

const useDimensions = (ref: any) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return dimensions.current;
};
