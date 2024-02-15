"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { SidebarLink } from "@/lib/types"

interface SidebarProps {
    sidebarLinks: SidebarLink[]
    id:string
}

function LeftSidebar({ sidebarLinks,id }: SidebarProps) {

    const pathname = usePathname();
    const router = useRouter();

    return (
        <section className="custom-scrollbar sticky left-0 top-0 z-20 md:flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-dark-4 bg-dark-2 pb-5 pt-28  hidden">
            <div className="flex w-full flex-1 flex-col gap-6 px-6">
                {sidebarLinks?.map((link) => {
                    const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

                    // if (link.route === "/profile") link.route = `${link.route}/${userId}`;
                    return (
                        <Link
                            href={link.route}
                            className={`relative flex justify-start gap-4 rounded-lg p-4 ${isActive ? 'bg-indigo-500' : 'bg-gray-200 '}`}
                            key={link.label}
                        >
                            <Image
                                src={link.imgURL}
                                alt={link.label}
                                width={24}
                                height={24}
                            />
                            <p className="tex-black max-lg:hidden">
                                {link.label}
                            </p>
                        </Link>
                    )
                })}
            </div>
            <div className="mt-10 px-6">
                logout
            </div>
        </section>
    )
}

export default LeftSidebar