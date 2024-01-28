"use client"

import { Temperature } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Temperature>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "machine.name",
    header: "Machine",
  },
  {
    accessorKey: "temperature",
    header: "Temperature",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "userName",
    header: "Employee",
  },
]
