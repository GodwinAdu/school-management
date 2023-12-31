import Navbar from "@/components/root/Navbar/Navbar";
import Footer from "@/components/root/Footer/Footer";
import type { Metadata } from "next";


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
   
      <div className="w-full">
        <Navbar />
        {children}
        <Footer />
      </div>
  );
}
