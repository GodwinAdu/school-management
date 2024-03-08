"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import { BadgeAlert, CheckSquare } from "lucide-react";
import { ITerm } from "@/lib/models/term.models";

export const columns: ColumnDef<ITerm>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "present",
    header: "Present",
    cell: ({ row }) => (
      <div>{row.getValue("present") ? <CheckSquare className="h-4 w-4 text-green-500" /> : <BadgeAlert className="h-4 w-4 text-red-500"  />}</div>
    )
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
