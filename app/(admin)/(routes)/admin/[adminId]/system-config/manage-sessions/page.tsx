import Heading from "@/components/heading/Header";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/hooks/current-profile"
import { redirect } from "next/navigation";
import { SessionModal } from "./_component/SessionModal";
import { currentUserRole } from "@/lib/hooks/getUserRole";
import { TableData } from "@/components/tables/table-data";
import { columns } from "./_component/column";
import { getAllSessions } from "@/lib/actions/session.actions";

const page = async () => {

  const user = await currentProfile();

  if(!user) redirect("/");

  const role = await currentUserRole();

  const data = await getAllSessions() || []


  return (
    <>
      <div className="flex justify-between items-center">
      <Heading title="Manage Academic year/Sessions" description="Manage,create and edit academic year" />
      {role?.addSession && <SessionModal /> }
      </div>
      <Separator />
      <TableData searchKey="name" columns={columns} data={data} />
    </>
  )
}

export default page