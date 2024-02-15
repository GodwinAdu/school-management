import Heading from "@/components/heading/Header";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/helpers/current-profile";
import { fetchDayById } from "@/lib/actions/day.actions";
import { EditDay } from "../_component/EditDay";

const page = async ({
  params,
}: {
  params: { adminId: string; dayEditId: string };
}) => {
  const user = await currentProfile();

  if (!user) redirect("/");

  const pathId = params.adminId;
  const id = params.dayEditId;

  const initialData = (await fetchDayById({ id })) || {};

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Update Days"
          description="Edit and manage Days details"
        />
        <Link
          href={`/admin/${pathId}/system-config/manage-days`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="pt-4 w-full">
        <EditDay initialData={initialData} />
      </div>
    </>
  );
};

export default page;
