import Heading from "@/components/heading/Header";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/helpers/current-profile"
import { redirect } from "next/navigation";
import { currentUserRole } from "@/lib/helpers/getUserRole";
import { TableData } from "@/components/tables/table-data";
import { columns } from "./_component/column";
import { HouseModal } from "./_component/HouseModal";
import { getAllHouses } from "@/lib/actions/house.actions";



const page = async () => {

  const user = await currentProfile();

  if(!user) redirect("/");

  const role = await currentUserRole();

  const data = await getAllHouses() || []


  return (
    <>
      <div className="flex justify-between items-center">
      <Heading title="Manage School House" description="Manage,create and edit school house" />
      {role?.addSchoolHouse && <HouseModal /> }
      </div>
      <Separator />
      {role?.viewSchoolHouse && <TableData searchKey="name" columns={columns} data={data} /> } 
    </>
  )
}

export default page