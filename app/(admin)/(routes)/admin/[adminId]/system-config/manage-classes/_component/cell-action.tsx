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
import { deleteAdmin } from "@/lib/actions/admin.actions";
import { toast } from "@/components/ui/use-toast";

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

  const handleDeleteAdmin = async (id:string) => {
    try {
      setLoading(true);
      await deleteAdmin({id})
      toast({
        title: "Deleted Successfully",
        description: "Please Admin was deleted successfully...",
       
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
      <Link href={`/admin/${id}/system-config/manage-classes/${data?.stage}`}> view details</Link>
    </>
  );
};
