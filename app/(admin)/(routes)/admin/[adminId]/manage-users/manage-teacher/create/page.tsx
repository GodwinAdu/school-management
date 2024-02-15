
import Heading from "@/components/heading/Header";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/helpers/current-profile";
import { cn } from "@/lib/utils";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import StudentCreateForm from "../_component/StudentCreateForm";
import { getAllStages } from "@/lib/actions/stage.actions";
import { getAllLevels } from "@/lib/actions/level.actions";
import { getAllTerms } from "@/lib/actions/term.actions";
import { getAllSessions } from "@/lib/actions/session.actions";
import TeacherCreateForm from "../_component/TeacherCreateForm";

interface RolenameProps{
  _id:string;
  displayName: string;
}

const page = async ({ params }: { params: { adminId: string } }) => {
  const user = await currentProfile();
  
  if (!user) redirect("/");

  const id = params.adminId;

  const levels = await getAllLevels() || [];
  const stages = await getAllStages() || [];
  



  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Add Teacher" description="Create new Teachers and their activities" />
        <Link
          href={`/admin/${id}/manage-users/manage-teacher`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="pt-4 w-full">
        <TeacherCreateForm levels={levels} stages={stages}  />
      </div>
    </>
  );
};

export default page;
