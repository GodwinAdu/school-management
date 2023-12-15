"use client";

import { useContext, useEffect, useState } from "react";
import { Copy, Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "@/components/ui/use-toast";
import { deleteUserRole } from "@/lib/actions/role.actions";
import { RoleColumn } from "@/lib/types";
import Link from "next/link";
import { currentUserRole } from "@/lib/hooks/getUserRole";
import { GlobalContext } from "@/context/globalContext";
import { trpc } from "@/app/_trpc/client";

interface CellActionProps {
  data: RoleColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const id:string | string[] = params.adminId

 

  const { data:value, isLoading } = trpc.getCurrentRole.useQuery(
    { id },
    {
      refetchInterval: (value) =>
        value ? false : 500,
    } 
  );

 

 

  const deleteRoleClientSide = async (id: string) => {
    try {
      setLoading(true);
      await deleteUserRole({
        id,
      });

      router.refresh();
      toast({
        title: "Deleted sucessfully",
        description: "You've delete role successfully",
      });
    } catch (error: any) {
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
          {value?.viewRole && (
            <Link
              href={`/admin/${params.adminId}/system-config/manage-role/${data?._id}`}
            >
              <DropdownMenuItem >
                <Eye className="mr-2 h-4 w-4" /> View
              </DropdownMenuItem>
            </Link>
          )}
          {value?.editRole && (
            <Link
              href={`/admin/${params.adminId}/system-config/manage-role/${data?._id}/edit`}
            >
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" /> Update
              </DropdownMenuItem>
            </Link>
          )}
          {value?.deleteRole && (
            <DropdownMenuItem
              onClick={() => deleteRoleClientSide(data?._id)}
            >
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
