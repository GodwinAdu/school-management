import type { Metadata } from "next";
import SideNav from "@/components/admin/SideNav";
import { NavbarSticky } from "@/components/navbar/Navbar";
import { Setting } from "@/components/settings/Settings";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Created by Jutech Dev",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden relative">
      <div className="h-full flex">
        {/* Sidebar */}
        <SideNav />

        <div className="flex flex-col h-screen w-full">
          {/* Navbar */}
          <NavbarSticky />

          {/* Main Content */}
          <Setting />
          <main className="p-4 flex-grow overflow-y-auto custom-scrollbar">{children}</main>
        </div>
      </div>
    </div>
  );
}
