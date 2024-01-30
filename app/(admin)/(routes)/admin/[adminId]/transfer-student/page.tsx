import Heading from "@/components/heading/Header";
import { Separator } from "@/components/ui/separator";

import { buttonVariants } from "@/components/ui/button"


import Link from "next/link";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { currentProfile } from "@/lib/hooks/current-profile";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/tables/data-table";
import { columns } from "./_component/column";
import { getAllClasses } from "@/lib/actions/class.actions";


const page = async ({
    params
}:{
    params:{adminId:string}
}) => {
    const user = await currentProfile();
    
    if(!user) redirect("/")

    const data = await getAllClasses() || [];
   

  return (
    <>
      <div className="flex justify-between items-center">
      <Heading title="Transfer Student" description="View all classess and Promote or Transfer Student." />
      <Link href={`manage-transfer-student/create`} className={cn(buttonVariants())} >
        <PlusCircle className="w-4 h-4 mr-2" />
        Add 
      </Link>
      </div>
      <Separator />
      <DataTable searchKey="firstName" columns={columns} data={data} />
     
    </>
  );
};

export default page;
