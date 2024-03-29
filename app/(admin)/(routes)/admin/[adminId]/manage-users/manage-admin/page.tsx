import Heading from "@/components/heading/Header";
import { Separator } from "@/components/ui/separator";

import { buttonVariants } from "@/components/ui/button"


import Link from "next/link";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { currentProfile } from "@/lib/helpers/current-profile";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/tables/data-table";
import { columns } from "./_components/column";
import { getAllAdmins } from "@/lib/actions/admin.actions";
import { IAdmin } from "@/lib/models/admin.models";


const page = async ({
    params
}:{
    params:{adminId:string}
}) => {
    const user = await currentProfile();
    
    if(!user) redirect("/")

    const data:IAdmin = await getAllAdmins();
   

  return (
    <>
      <div className="flex justify-between items-center">
      <Heading title="Manage Admin" description="All Users excluding teachers and student will be manage here." />
      <Link href={`manage-admin/create`} className={cn(buttonVariants())} >
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
