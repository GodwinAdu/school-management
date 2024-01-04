import Heading from "@/components/heading/Header";
import { Separator } from "@/components/ui/separator";

import { buttonVariants } from "@/components/ui/button";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { currentProfile } from "@/lib/hooks/current-profile";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/tables/data-table";
import { columns } from "./_component/column";
import { getAllSubjects } from "@/lib/actions/subject.actions";

const page = async ({ params }: { params: { adminId: string } }) => {
  const user = await currentProfile();

  if (!user) redirect("/");

  const data = await getAllSubjects() || [];

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Manage Subject"
          description="All Users excluding teachers and student will be manage here."
        />
        <Link href={`manage-subjects/create`} className={cn(buttonVariants())}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add
        </Link>
      </div>
      <Separator />
      <DataTable searchKey="subjectName" columns={columns} data={data} />
    </>
  );
};

export default page;
