"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { RoleColumn } from "@/lib/types";

export const columns: ColumnDef<RoleColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name");

      let renderedName;

      if (typeof name === "string" && name.startsWith("jhs-one")) {
        renderedName = `JHS ${name.split("-")[1]}`;
      } else if (typeof name === "string" && name.startsWith("shs-one")) {
        renderedName = `SHS ${name.split("-")[1]}`;
      } else {
        renderedName = `Class ${name}`;
      }

      return (
        <div
          className={`capitalize ${name.startsWith("jhs-one") ? "jhs" : ""}`}
        >
          {renderedName}
        </div>
      );
    },
  },

  {
    accessorKey: "createdBy",
    header: "Created By",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
