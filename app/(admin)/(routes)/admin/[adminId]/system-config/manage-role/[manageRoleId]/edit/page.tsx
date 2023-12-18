import Heading from "@/components/heading/Header";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/hooks/current-profile"
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { fetchRoleById } from "@/lib/actions/role.actions";
import EditRole from "../../_component/EditRole";


const page = async ({ params }: { params: { manageRoleId: string } }) => {

    const user = await currentProfile();

    if(!user){
        redirect("/")
    }
    const id = params.manageRoleId;
    const path = params.adminId;

    console.log(id)

    const initialData = await fetchRoleById({id}) || {}

    console.log(initialData,"testiong initialData")

  return (
    <>
       <div className="flex justify-between items-center">
        <Heading
          title="Update Role"
          description="manage role and update it"
        />

        <Link
          href={`/admin/${path}/system-config/manage-role`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <EditRole initialData={initialData} />
    </>
  )
}

export default page
