"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { AdminUserColumn } from "@/lib/types";
import { useState } from "react";
import { createAttendance } from "@/lib/actions/student-attendance.actions";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast";
import { IStudent } from "@/lib/models/student.models";
import { AttendanceDialog } from "../attendance-modal";

const FormSchema = z.object({
  present: z.boolean().default(false).optional(),
})



export const studentColumns1: ColumnDef<IStudent>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("firstName")}</div>
    ),
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("lastName")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "level",
    header: "Level",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("level")}</div>
    ),
  },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => {
      const level = row.getValue("level");
      const stage = row.getValue("stage");

      let renderedStage;

      if (level === "Primary") {
        renderedStage = `Class ${stage}`;
      } else if (level === "Junior high") {
        if (typeof stage === "string" && stage?.startsWith("jhs-")) {
          const jhsNumber = stage?.split("-")[1];
          renderedStage = `JHS ${jhsNumber}`;
        } else {
          renderedStage = `Unknown Stage `; // Handle other cases if needed
        }
      } else if (level === "Secondary") {
        if (typeof stage === "string" && stage?.startsWith("shs-")) {
          const shsNumber = stage?.split("-")[1];
          renderedStage = `SHS ${shsNumber}`;
        } else {
          renderedStage = `Unknown Stage `; // Handle other cases if needed
        }
      } else {
        renderedStage = `Unknown ${stage}`; // Handle other cases if needed
      }

      return <div className="capitalize">{renderedStage}</div>;
    },
  },
  {
    accessorKey: "",
    header: "View",
    cell: ({ row }) => <AttendanceDialog />
  },
];
