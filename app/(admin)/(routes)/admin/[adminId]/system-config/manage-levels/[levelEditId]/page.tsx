import Heading from "@/components/heading/Header";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/hooks/current-profile";
import { fetchLevelById } from "@/lib/actions/level.actions";
import { EditLevel } from "../_component/EditLevel";



const page = async ({
  params,
}: {
  params: { adminId: string; levelEditId: string };
}) => {
  const user = await currentProfile();

  if (!user) redirect("/");

  const pathId = params.adminId;
  const id = params.levelEditId;

  const initialData = await fetchLevelById({id}) || {}

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Update Level" description="Edit and manage Level details" />
        <Link
          href={`/admin/${pathId}/system-config/manage-levels`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="pt-4 w-full">
        <EditLevel initialData={initialData} />
      </div>
    </>
  );
};

export default page;