
import Footer from "@/components/root/Footer/Footer";
import MainNavbar from "@/components/root/Navbar/MainNavbar";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "School System",
  description: "Created by Jutech Dev",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
      <div className="w-full">
        <MainNavbar />
        {children}
        <Footer />
      </div>
  );
}
