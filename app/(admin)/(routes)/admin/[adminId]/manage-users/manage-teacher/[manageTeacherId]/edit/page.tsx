import Heading from "@/components/heading/Header";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/helpers/current-profile";
import { getAllLevels } from "@/lib/actions/level.actions";
import { getAllStages } from "@/lib/actions/stage.actions";
import { getAllSessions } from "@/lib/actions/session.actions";
import { getAllTerms } from "@/lib/actions/term.actions";
import EditTeacherForm from "../../_component/EditTeacherForm";
import { fetchTeacher } from "@/lib/actions/teacher.actions";


const page = async ({
  params,
}: {
  params: { adminId: string; manageTeacherId: string };
}) => {
  const user = await currentProfile();

  if (!user) redirect("/");

  const pathId = params.adminId;
  const id = params.manageTeacherId;

  const initialData = await fetchTeacher({ id }) || {}

  const levels = await getAllLevels() || [];
  const stages = await getAllStages() || [];

  console.log(initialData,"testingg")


  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Update teacher" description="Edit and manage teacher details" />
        <Link
          href={`/admin/${pathId}/manage-users/manage-teacher/${id}`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="pt-4 w-full">
        <EditTeacherForm initialData={initialData} levels={levels} stages={stages} />
      </div>
    </>
  );
};

export default page;
