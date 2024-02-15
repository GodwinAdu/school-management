import Heading from "@/components/heading/Header";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/helpers/current-profile"
import { redirect } from "next/navigation";
import { currentUserRole } from "@/lib/helpers/getUserRole";
import { TableData } from "@/components/tables/table-data";
import { columns } from "./_component/column";
import { DayModal } from "./_component/DayModal";
import { getAllDays } from "@/lib/actions/day.actions";




const page = async () => {

  const user = await currentProfile();

  if(!user) redirect("/");

  const role = await currentUserRole();

  const data = await getAllDays() || []


  return (
    <>
      <div className="flex justify-between items-center">
      <Heading title="Manage School Days" description="Manage,create and edit school days" />
      {role?.addDay && <DayModal /> }
      </div>
      <Separator />
      <TableData searchKey="name" columns={columns} data={data} />  
    </>
  )
}

export default page