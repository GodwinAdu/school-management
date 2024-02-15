import Heading from "@/components/heading/Header";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/helpers/current-profile"
import { redirect } from "next/navigation";
import { currentUserRole } from "@/lib/helpers/getUserRole";
import { TableData } from "@/components/tables/table-data";
import { columns } from "./_component/column";
import { LevelModal } from "./_component/LevelModal";
import { getAllLevels } from "@/lib/actions/level.actions";




const page = async () => {

  const user = await currentProfile();

  if(!user) redirect("/");

  const role = await currentUserRole();

  const data = await getAllLevels() || []


  return (
    <>
      <div className="flex justify-between items-center">
      <Heading title="Manage School Levels" description="Manage,create and edit school levels" />
      {role?.addLevel && <LevelModal /> }
      </div>
      <Separator />
      <TableData searchKey="name" columns={columns} data={data} />  
    </>
  )
}

export default page