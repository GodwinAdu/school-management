import Heading from "@/components/heading/Header";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/hooks/current-profile"
import { redirect } from "next/navigation";
import { currentUserRole } from "@/lib/hooks/getUserRole";
import { TableData } from "@/components/tables/table-data";
import { columns } from "./_component/column";
import { getAllDays } from "@/lib/actions/day.actions";
import { TimeModal } from "./_component/TimeModel";




const page = async () => {

  const user = await currentProfile();

  if(!user) redirect("/");

  const role = await currentUserRole();

  const data = []


  return (
    <>
      <div className="flex justify-between items-center">
      <Heading title="Manage School Time" description="Manage,create and edit school time" />
      {role?.addDay && <TimeModal /> }
      </div>
      <Separator />
      <TableData searchKey="name" columns={columns} data={data} />  
    </>
  )
}

export default page