import Heading from "@/components/heading/Header";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/hooks/current-profile";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import CreateClass from "../_component/CreateClass";
import { getAllLevels } from "@/lib/actions/level.actions";
import ImportantNote from "@/components/commons/ImportantNote";
import { getAllClassrooms } from "@/lib/actions/classroom.actions";
import { getAllStages } from "@/lib/actions/stage.actions";

const page =  async ({
    params
}:{
    params:{adminId:string}
}) => {
    const user = await currentProfile();
    
    if(!user) redirect("/")

    const id = params?.adminId;

    const levels = await getAllLevels() || [];

    const classrooms = await getAllClassrooms() || [];

    const stages = await getAllStages() || [];


  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Create New Class"
          description="Creating new classes "
        />
        <Link href={`/admin/${id}/system-config/manage-classes`} className={cn(buttonVariants())}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
     <div className="pt-10 w-full max-w-4xl mx-auto">
        <CreateClass levels={levels} classrooms={classrooms} stages={stages} />
        <div className="mt-5">
        <ImportantNote title="Important Note" message="This is an important note for the user." />
        </div>
     </div>
    </>
  );
};

export default page;
