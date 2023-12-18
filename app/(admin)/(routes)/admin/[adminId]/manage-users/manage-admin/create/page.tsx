import AdminCreateForm from "@/components/admin/forms/AdminCreateForm";
import Heading from "@/components/heading/Header";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getRolesName } from "@/lib/actions/role.actions";
import { currentProfile } from "@/lib/hooks/current-profile";
import { cn } from "@/lib/utils";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
interface RolenameProps{
  _id:string;
  displayName: string;
}
export const dynamic = "force-dynamic"
const page = async ({ params }: { params: { adminId: string } }) => {
  const user = await currentProfile();
  
  if (!user) redirect("/");

  const roleName:RolenameProps[] |null = await getRolesName();

console.log(roleName)
  const id = params.adminId;

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Add Admin" description="Create new Admins and roles" />
        <Link
          href={`/admin/${id}/manage-users/manage-admin`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="pt-4 w-full">
        <AdminCreateForm rolename={roleName} />
      </div>
    </>
  );
};

export default page;
