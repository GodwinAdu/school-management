import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export  const SIDEBAR_ITEMS = [
  {
    title: 'Dashboard',
    path: '/he',
    icon: <Icon icon="lucide:help-circle" width="16" height="16" />,
  },
  {
    title: 'Student',
    path: '/he',
    icon: <Icon icon="lucide:help-circle" width="16" height="16" />,
  },
  {
    title: 'Time Table',
    path: '/he',
    icon: <Icon icon="lucide:help-circle" width="16" height="16" />,
  },
  {
    title: 'E-Learning',
    path: '/admin',
    icon: <Icon icon="lucide:settings" width="16" height="16" />,
    submenu: true,
    subMenuItems: [
      { title: 'Create Lesson', path: '/' },
      { title: 'Lesson List', path: '/' },
    ],
  },
  {
    title: 'Topic',
    path: '/admin',
    icon: <Icon icon="lucide:settings" width="16" height="16" />,
    submenu: true,
    subMenuItems: [
      { title: 'Add Topic', path: '/' },
      { title: 'Topic List', path: '/' },
    ],
  },
  {
    title: 'Attendance',
    path: '/admin',
    icon: <Icon icon="lucide:settings" width="16" height="16" />,
    submenu: true,
    subMenuItems: [
      { title: 'Take Attendance', path: '/' },
      { title: 'Attendanc List', path: '/' },
    ],
  },
  {
    title: 'Fees & Payment',
    path: '/admin',
    icon: <Icon icon="lucide:settings" width="16" height="16" />,
    submenu: true,
    subMenuItems: [
      { title: 'individual fees payment', path: '/' },
      { title: 'Classwise Fees', path: '/' },
    ],
  },
  {
    title: 'Homework',
    path: '/help',
    icon: <Icon icon="lucide:help-circle" width="16" height="16" />,
  },
  {
    title: 'Help',
    path: '/help',
    icon: <Icon icon="lucide:help-circle" width="16" height="16" />,
  },
]


export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Dashboard",
  },
  {
    imgURL: "/assets/search.svg",
    route: "/search",
    label: "E-Learning",
  },
  {
    imgURL: "/assets/heart.svg",
    route: "/activity",
    label: "Exams",
  },
  {
    imgURL: "/assets/create.svg",
    route: "/create-thread",
    label: "Playgrounds",
  },
  {
    imgURL: "/assets/community.svg",
    route: "/communities",
    label: "Transaction",
  },
  {
    imgURL: "/assets/user.svg",
    route: "/profile",
    label: "Transcript",
  },
  {
    imgURL: "/assets/user.svg",
    route: "/result",
    label: "Results",
  },
];