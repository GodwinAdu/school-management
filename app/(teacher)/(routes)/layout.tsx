import type { Metadata } from "next";
import TeacherSideNav from "@/components/teacher/navs/Sidebar";
import { TeacherNavbarSticky } from "@/components/teacher/navs/TeacherNavbarSticky";

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
        <TeacherSideNav />

        <div className="flex flex-col h-screen w-full">
          {/* Navbar */}
          <TeacherNavbarSticky />

          {/* Main Content */}
          <main className="p-4 flex-grow overflow-y-auto custom-scrollbar">{children}</main>
        </div>
      </div>
    </div>
  );
}
