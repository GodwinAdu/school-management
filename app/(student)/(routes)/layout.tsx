import Topbar from '@/components/student/navs/Topbar';
import RightSidebar from '@/components/student/navs/RightSidebar'
import Bottombar from '@/components/student/navs/Bottombar'
import type { Metadata } from 'next'
import MainLeftSidebar from '@/components/student/navs/MainLeftSidebar';

export const metadata: Metadata = {
  title: 'Student Dashboard',
  description: 'Created by Jutech Dev',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden relative">
      <Topbar />
      <main className='flex flex-row'>
        <MainLeftSidebar />
        <section className=' flex min-h-screen flex-1 flex-col items-center bg-dark px-6 pb-10 pt-20 max-md:pb-32 sm:px-10'>
          <div className="w-full max-w-4xl">
            {children}
          </div>
        </section>
        <RightSidebar />
      </main>
      <Bottombar />
    </div>
  );
}
