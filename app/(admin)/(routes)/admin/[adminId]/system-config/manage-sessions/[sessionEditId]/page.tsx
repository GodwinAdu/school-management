import Heading from "@/components/heading/Header";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/hooks/current-profile";
import { EditSession } from "../_component/EditSession";
import { fetchSessionById } from "@/lib/actions/session.actions";


const page = async ({
  params,
}: {
  params: { adminId: string; sessionEditId: string };
}) => {
  const user = await currentProfile();

  if (!user) redirect("/");

  const pathId = params.adminId;
  const id = params.sessionEditId;

  const initialData = await fetchSessionById({id}) || {}

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Update Session/Academic year" description="Edit and manage Session/Academic details" />
        <Link
          href={`/admin/${pathId}/system-config/manage-sessions`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="pt-4 w-full">
        <EditSession initialData={initialData} />
      </div>
    </>
  );
};

export default page;