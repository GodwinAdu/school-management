import Heading from "@/components/heading/Header"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { currentProfile } from "@/lib/helpers/current-profile"
import { cn } from "@/lib/utils"
import { ArrowLeft} from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { DataTable } from "@/components/tables/data-table"
import { getAllStudentsByStage } from "@/lib/actions/student.actions"
import { columns } from "../_component/student-column/column"

const page = async ({ params }: { params: { slug: string, adminId:string } }) => {

    const user = await currentProfile();

    if (!user) redirect("/")
    const stage = params.slug as string;
    const pathId = params.adminId as string;

    const data = (await getAllStudentsByStage({ stage })) || [];

    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Manage Students" description="Manage,edit and control all the Students in the institution." />
                <Link href={`/admin/${pathId}/manage-users/manage-student`} className={cn(buttonVariants())} >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Link>
            </div>
            <Separator />
            <DataTable searchKey="firstName" columns={columns} data={data} />
        </>
    )
}

export default page;

