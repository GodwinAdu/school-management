import ShowUsersDashboard from "@/components/admin/ShowUsersDashboard";
import DateTimeComponent from "@/components/display-time/Timer";
import Heading from "@/components/heading/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { currentProfile } from "@/lib/hooks/current-profile";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { adminId: string } }) => {
  const response = await currentProfile();

  if (!response) redirect("/");

  return (
    <div className="flex-col px-2 ">
      <div className="flex-1 space-y-4  pt-2 ">
        <div className="flex justify-between items-center">
          <Heading title="Dashboard" description="Overview of your store" />
          <DateTimeComponent />
        </div>
        <Separator />
        <ShowUsersDashboard />
        <Separator />
      </div>
    </div>
    
  );
};

export default page;
