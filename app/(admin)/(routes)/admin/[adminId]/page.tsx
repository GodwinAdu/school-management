import { CalenderDashboard } from "@/components/admin/CalenderDashboard";
import DashboardNav from "@/components/admin/DashboardNav";
import ShowAccountsDashboard from "@/components/admin/ShowAccountDashboard";
import ShowUsersDashboard from "@/components/admin/ShowUsersDashboard";
import DateTimeComponent from "@/components/display-time/Timer";
import Heading from "@/components/heading/Header";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { toast } from "@/components/ui/use-toast";
import { currentProfile } from "@/lib/helpers/current-profile";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { adminId: string } }) => {
  
  const response = await currentProfile();

  if (!response) redirect("/");

  return (
    <div className="flex-col px-2 ">
      <div className="flex-1 space-y-4  pt-2 ">
        <div className="flex justify-between items-center">
          <Heading title="Dashboard" description="Overview of your school" />
          <DateTimeComponent />
        </div>
        <Separator />
        <DashboardNav />
        <Separator />
        <ShowUsersDashboard />
        <Separator />
        <ShowAccountsDashboard />
        <Separator />
        <CalenderDashboard />
      </div>
    </div>
    
  );
};

export default page;
