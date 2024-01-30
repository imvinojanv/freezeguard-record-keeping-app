"use client"

import { RefusalRecord } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2, Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ConfirmModel from "@/components/models/confirm-model";
import { cn } from "@/lib/utils";

const ActionCell = ({ row }: { row: any }) => {
  const { id } = row.original;
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const shopId = pathname.split('/')[2];

  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async (refusalRecordId: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/shops/${shopId}/refusal-record/${refusalRecordId}`);
      router.refresh();
      toast({
        title: "Successfully removed refusal record!",
        variant: 'success',
      });
    } catch (error: any) {
      toast({
        title: "⚠️ Something went wrong 👎",
        variant: 'error',
        description: (
          <div className='mt-2 bg-slate-200 py-2 px-3 md:w-[336px] rounded-md'>
            <code className="text-slate-800">
              ERROR: {error.message}
            </code>
          </div>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ConfirmModel onConfirm={() => onDelete(id)}>
      <Button
        size='sm'
        disabled={isLoading}
        variant='outline'
      >
        <Loader2 className={cn("animate-spin w-4 h-4 hidden", isLoading && "flex")} />
        <Trash2 className={cn("w-4 h-4 text-destructive", isLoading && 'hidden')} />
      </Button>
    </ConfirmModel>
  );
}

export const columns: ColumnDef<RefusalRecord>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
        const value: string = (row.getValue("product"))
        return value.toUpperCase()
    },
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
        const value: string = (row.getValue("gender"))
        return value.toUpperCase()
    },
  },
  {
    accessorKey: "userName",
    header: "Employee",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => <ActionCell row={row} />
  }
]
