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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button";
import { AdminUserColumn } from "@/lib/types";
import { trpc } from "@/app/_trpc/client";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { deleteClass } from "@/lib/actions/class.actions";

interface CellActionProps {
  data: AdminUserColumn;
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

  const handleDeleteClass = async (id:string) => {
    try {
      setLoading(true);
      await deleteClass({id})
      toast({
        title: "Deleted Successfully",
        description: "Please Class was deleted successfully...",
       
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
          {value?.editClassroom && (
           <Link href={`/admin/${id}/transfer-student/${data?.stage}`}>
             <DropdownMenuItem >
              <Eye className="mr-2 h-4 w-4" /> View details
            </DropdownMenuItem>
           </Link>
          )}
         
        </DropdownMenuContent>
      </DropdownMenu>
      
    </>
  );
};
