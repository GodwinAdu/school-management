import Heading from "@/components/heading/Header";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/hooks/current-profile";
import { fetchClassroomById } from "@/lib/actions/classroom.actions";
import { EditClassroom } from "../_component/EditClassroom";


const page = async ({
  params,
}: {
  params: { adminId: string; classroomEditId: string };
}) => {
  const user = await currentProfile();

  if (!user) redirect("/");

  const pathId = params.adminId;
  const id = params.classroomEditId;

  const initialData = await fetchClassroomById({id}) || {}

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Update Classroom" description="Edit and manage Classroom details" />
        <Link
          href={`/admin/${pathId}/system-config/manage-classrooms`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="pt-4 w-full">
        <EditClassroom initialData={initialData} />
      </div>
    </>
  );
};

export default page;