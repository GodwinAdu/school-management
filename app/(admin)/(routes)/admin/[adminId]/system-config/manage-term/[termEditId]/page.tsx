import Heading from "@/components/heading/Header";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/helpers/current-profile";
import { EditTerm } from "../_components/EditTerm";
import { fetchTermById } from "@/lib/actions/term.actions";


const page = async ({
  params,
}: {
  params: { adminId: string; termEditId: string };
}) => {
  const user = await currentProfile();

  if (!user) redirect("/");

  const pathId = params.adminId;
  const id = params.termEditId;

  const initialData = await fetchTermById({id}) || {}

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Update Term" description="Edit and manage Term details" />
        <Link
          href={`/admin/${pathId}/system-config/manage-term`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="pt-4 w-full">
        <EditTerm initialData={initialData} />
      </div>
    </>
  );
};

export default page;