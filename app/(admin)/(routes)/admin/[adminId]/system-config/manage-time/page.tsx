import Heading from "@/components/heading/Header";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/hooks/current-profile"
import { redirect } from "next/navigation";
import { currentUserRole } from "@/lib/hooks/getUserRole";
import { TableData } from "@/components/tables/table-data";
import { columns } from "./_component/column";
import { TimeModal } from "./_component/TimeModel";
import { getAllTimes } from "@/lib/actions/time.actions";



const page = async () => {

  const user = await currentProfile();

  if(!user) redirect("/");

  const role = await currentUserRole();

  const data = await getAllTimes() || [];


  return (
    <>
      <div className="flex justify-between items-center">
      <Heading title="Manage School Time" description="Manage,create and edit school time" />
      {role?.addTime && <TimeModal /> }
      </div>
      <Separator />
      {role?.viewTime && <TableData searchKey="name" columns={columns} data={data} /> } 
    </>
  )
}

export default page