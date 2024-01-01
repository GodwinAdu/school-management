import Heading from "@/components/heading/Header";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/hooks/current-profile"
import { redirect } from "next/navigation";
import { currentUserRole } from "@/lib/hooks/getUserRole";
import { TableData } from "@/components/tables/table-data";
import { columns } from "./_component/column";
import { getAllClassrooms } from "@/lib/actions/classroom.actions";
import { ClassroomModal } from "./_component/ClassroomModal";

const page = async () => {

  const user = await currentProfile();

  if(!user) redirect("/");

  const role = await currentUserRole();

  const data = await getAllClassrooms() || []


  return (
    <>
      <div className="flex justify-between items-center">
      <Heading title="Manage Classroom" description="Manage,create and edit classrooms" />
      {role?.addSession && <ClassroomModal /> }
      </div>
      <Separator />
      <TableData searchKey="name" columns={columns} data={data} />
    </>
  )
}

export default page