'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';


import { Icon } from '@iconify/react';
import { SIDEBAR_ITEMS } from '@/lib/constants';
import { SideNavItem } from '@/lib/types';

const Sidebar = () => {
  return (
    <div className="custom-scrollbar md:w-60 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex overflow-y-auto py-2 dark:bg-black/50">
      <div className="flex flex-col space-y-6 w-full">
        <Link
          href="/"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-12 w-full py-2"
        >
          <span className="h-7 w-7 bg-zinc-300 rounded-lg " />
          <span className="font-bold text-xl hidden md:flex">Logo</span>
        </Link>

        <div className="flex flex-col space-y-2 pb-6  md:px-2 ">
          {SIDEBAR_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100  dark:hover:text-black ${
              pathname.includes(item.path) ? 'bg-zinc-100 dark:text-black ' : ''
            }`}
          >
            <div className="flex flex-row space-x-2 items-center">
              {item.icon}
              <span className="font-semibold text-sm  flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? 'font-bold' : ''
                    }`}
                  >
                    <span className='text-sm'>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-zinc-100  dark:hover:text-black${
            item.path === pathname ? 'bg-zinc-100 dark:text-black' : ''
          }`}
        >
          {item.icon}
          <span className="font-semibold text-sm flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
