import Heading from "@/components/heading/Header";
import { Separator } from "@/components/ui/separator";
import { ModalTerm } from "./_components/UsetermModal";
import { currentProfile } from "@/lib/helpers/current-profile";
import { getAllTerms } from "@/lib/actions/term.actions";
import { columns } from "./_components/column";
import { redirect } from "next/navigation";
import { TableData } from "@/components/tables/table-data";
import { currentUserRole } from '@/lib/helpers/getUserRole'

const page = async () => {
  const user = await currentProfile();

  if (!user) redirect("/");

  const role = await currentUserRole();

  const data = (await getAllTerms()) || [];

  console.log(data,"data")

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Manage Terms"
          description="Manage,create and edit school terms"
        />
        {role?.addTerm && <ModalTerm />}
      </div>
      <Separator />
      <TableData searchKey="name" columns={columns} data={data} />
    </>
  );
};

export default page;
