import Heading from "@/components/heading/Header";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/hooks/current-profile";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentProfile();
  if (!user) redirect("/");
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Manage Admin"
          description="All Users excluding teachers and student will be manage here."
        />
        <Link href={`manage-admin/create`} className={cn(buttonVariants())}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add
        </Link>
      </div>
      <Separator />
    </>
  );
};

export default page;
