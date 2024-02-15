import Heading from "@/components/heading/Header"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { currentProfile } from "@/lib/helpers/current-profile"
import { cn } from "@/lib/utils"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { columns } from "./_component/column"
import { DataTable } from "@/components/tables/data-table"
import { getAllStudents } from "@/lib/actions/student.actions"


const page = async () => {

  const user = await currentProfile();

  if(!user) redirect("/")

  const data = await getAllStudents() || [];
  
  return (
    <>
     <div className="flex justify-between items-center">
      <Heading title="Manage Students" description="Manage,edit and control all the Students in the institution." />
      <Link href={`manage-student/create`} className={cn(buttonVariants())} >
        <PlusCircle className="w-4 h-4 mr-2" />
        Add 
      </Link>
      </div>
      <Separator />
      <DataTable searchKey="firstName" columns={columns} data={data} />
    </>
  )
}

export default page
