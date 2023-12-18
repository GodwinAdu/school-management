import Heading from "@/components/heading/Header";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import EditAdminForm from "../../_components/EditAdminForm";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/hooks/current-profile";
import { fetchAdmin } from "@/lib/actions/fetchadmin.actions";


const page = async ({
  params,
}: {
  params: { adminId: string; manageAdminId: string };
}) => {
  const user = await currentProfile();

  if (!user) redirect("/");

  const pathId = params.adminId;
  const id = params.manageAdminId;

  const initialData = await fetchAdmin({id}) || {}

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Update Admin" description="Edit and manage Admin details" />
        <Link
          href={`/admin/${pathId}/manage-users/manage-admin/${id}`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="pt-4 w-full">
        <EditAdminForm initialData={initialData} />
      </div>
    </>
  );
};

export default page;
