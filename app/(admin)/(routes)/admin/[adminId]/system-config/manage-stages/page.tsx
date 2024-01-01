import Heading from "@/components/heading/Header";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/hooks/current-profile"
import { redirect } from "next/navigation";
import { currentUserRole } from "@/lib/hooks/getUserRole";
import { TableData } from "@/components/tables/table-data";
import { columns } from "./_component/column";
import { StageModal } from "./_component/StageModal";
import { getAllStages } from "@/lib/actions/stage.actions";




const page = async () => {

  const user = await currentProfile();

  if(!user) redirect("/");

  const role = await currentUserRole();

  const data = await getAllStages() || []


  return (
    <>
      <div className="flex justify-between items-center">
      <Heading title="Manage School Stages" description="Manage,create and edit school Stages" />
      {role?.addClassSection && <StageModal /> }
      </div>
      <Separator />
      <TableData searchKey="name" columns={columns} data={data} />  
    </>
  )
}

export default page