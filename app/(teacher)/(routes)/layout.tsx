import type { Metadata } from 'next'

import Navbar from "@/components/navbar/Navbar";
import MobileNav from "@/components/teacher/navs/MobileNav";
import MarginWidthWrapper from "@/components/commons/margin-width-wrapper";
import PageWrapper from "@/components/commons/page-wrapper";
import Sidebar from "@/components/teacher/navs/Sidebar";


export const metadata: Metadata = {
  title: 'Teacher Dashboard',
  description: 'Created by Jutech Dev',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* <Sidebar />
      <main className="flex-1">
        <MarginWidthWrapper>
          <Navbar />
          <MobileNav />
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main> */}
    </div>
  );
}
