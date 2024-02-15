import Heading from "@/components/heading/Header";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/helpers/current-profile";
import { fetchStageById } from "@/lib/actions/stage.actions";
import { EditStage } from "../_component/EditStage";

const page = async ({
  params,
}: {
  params: { adminId: string; stageEditId: string };
}) => {
  const user = await currentProfile();

  if (!user) redirect("/");

  const pathId = params.adminId;
  const id = params.stageEditId;

  const initialData = await fetchStageById({id}) || {}

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Update Stage" description="Edit and manage Stage details" />
        <Link
          href={`/admin/${pathId}/system-config/manage-stages`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="pt-4 w-full">
        <EditStage initialData={initialData} />
      </div>
    </>
  );
};

export default page;