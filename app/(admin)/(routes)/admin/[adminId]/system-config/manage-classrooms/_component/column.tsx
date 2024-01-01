"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import { RoleColumn } from "@/lib/types";
import { BadgeAlert, CheckSquare } from "lucide-react";

export const columns: ColumnDef<RoleColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>{row.getValue("status") ? <CheckSquare className="h-4 w-4 text-green-500" /> : <BadgeAlert className="h-4 w-4 text-red-500"  />}</div>
    )
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
