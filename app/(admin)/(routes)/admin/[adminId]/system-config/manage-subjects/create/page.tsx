import Heading from "@/components/heading/Header";
import { Separator } from "@/components/ui/separator";

import { buttonVariants } from "@/components/ui/button"


import Link from "next/link";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { currentProfile } from "@/lib/helpers/current-profile";
import { redirect } from "next/navigation";
import { getAllLevels } from "@/lib/actions/level.actions";
import { getAllStages } from "@/lib/actions/stage.actions";
import CreateSubjectForm from "../_component/CreateSubject";


const page = async ({
    params
}:{
    params:{adminId:string}
}) => {
    const user = await currentProfile();
    
    if(!user) redirect("/")

    const levels = await getAllLevels() || [];
  

    const stages = await getAllStages() || [];

   

  return (
    <>
      <div className="flex justify-between items-center">
      <Heading title="Create Subject" description="Create new subjects " />
      <Link href={`manage-admin/create`} className={cn(buttonVariants())} >
        <PlusCircle className="w-4 h-4 mr-2" />
        Add 
      </Link>
      </div>
      <Separator />
      <CreateSubjectForm levels={levels} stages={stages} />
     
    </>
  );
};

export default page;
