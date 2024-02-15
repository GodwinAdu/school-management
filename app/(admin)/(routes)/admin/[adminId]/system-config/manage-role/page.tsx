import Heading from "@/components/heading/Header";
import { TableData } from "@/components/tables/table-data";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/helpers/current-profile";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { columns } from "./_component/column";
import { getAllRoles } from "@/lib/actions/role.actions";
import { currentUserRole } from "@/lib/helpers/getUserRole";

const page = async () => {
  const user = await currentProfile();

  if (!user) {
    redirect("/");
  }

  const role = await currentUserRole();
  if(!role){
    redirect("/")
  }

  const { addRole} = role;

  const values = await getAllRoles() || [];

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Role List"
          description="Create roles and manage roles for all Users."
        />
        {addRole && (
          <Link
            href={`manage-role/create-role`}
            className={cn(buttonVariants())}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Create role
          </Link>
        )}
      </div>
      <Separator />
      <TableData
        searchKey="displayName"
        columns={columns}
        data={values}
       
      />
    </>
  );
};

export default page;
