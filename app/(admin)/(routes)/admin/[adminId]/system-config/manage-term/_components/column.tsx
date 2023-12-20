"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import { RoleColumn } from "@/lib/types";

export const columns: ColumnDef<RoleColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
  },
  
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
