import Heading from "@/components/heading/Header";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/helpers/current-profile";
import EditStudentForm from "../../_component/EditStudentForm";
import { fetchStudent } from "@/lib/actions/student.actions";
import { getAllLevels } from "@/lib/actions/level.actions";
import { getAllStages } from "@/lib/actions/stage.actions";
import { getAllSessions } from "@/lib/actions/session.actions";
import { getAllTerms } from "@/lib/actions/term.actions";


const page = async ({
  params,
}: {
  params: { adminId: string; manageStudentId: string };
}) => {
  const user = await currentProfile();

  if (!user) redirect("/");

  const pathId = params.adminId;
  const id = params.manageStudentId;

  const initialData = await fetchStudent({id}) || {}

  const levels = await getAllLevels() || [];
  const stages = await getAllStages() || [];
  const sessions = await getAllSessions() || [];
  const terms = await getAllTerms() || [];

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Update student" description="Edit and manage student details" />
        <Link
          href={`/admin/${pathId}/manage-users/manage-student/${id}`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="pt-4 w-full">
        <EditStudentForm initialData={initialData} levels={levels} stages={stages} sessions={sessions} terms={terms} />
      </div>
    </>
  );
};

export default page;
