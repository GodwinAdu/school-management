"use client";

import { useState } from "react";
import {  Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import { Button } from "@/components/ui/button";
import { AdminUserColumn } from "@/lib/types";
import { trpc } from "@/app/_trpc/client";
import Link from "next/link";
import { deleteTerm } from "@/lib/actions/term.actions";
import { toast } from "@/components/ui/use-toast";
import { ITerm } from "@/lib/models/term.models";

interface CellActionProps {
  data: ITerm;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const params = useParams();

  const id: string | string[] = params.adminId;

  const { data: value, isLoading } = trpc.getCurrentRole.useQuery(
    { id },
    {
      refetchInterval: (value) => (value ? false : 500),
    }
  );

  const handleDeleteTerm = async (id:string) => {
    try {
      setLoading(true);
      await deleteTerm({id})
      toast({
        title: "Deleted Successfully",
        description: "Please Term was deleted successfully...",
       
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };



  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {value?.editTerm && (
           <Link href={`/admin/${id}/system-config/manage-term/${data?._id}`}>
             <DropdownMenuItem >
              <Edit className="mr-2 h-4 w-4" /> Update
            </DropdownMenuItem>
           </Link>
          )}
          {value?.deleteTerm && (
            <DropdownMenuItem onClick={() => handleDeleteTerm(data?._id)}>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
