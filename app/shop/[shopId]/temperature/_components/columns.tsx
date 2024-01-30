"use client"

import { useState } from "react";
import { Temperature } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ConfirmModel from "@/components/models/confirm-model";
import { cn } from "@/lib/utils";

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
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const { id } = row.original;        // temperature id

      const { toast } = useToast();
      const router = useRouter();
      const pathname = usePathname();
      const shopId = pathname.split('/')[2];

      const [isLoading, setIsLoading] = useState(false);

      const onDelete = async (temperatureId: string) => {
        try {
          setIsLoading(true);
          await axios.delete(`/api/shops/${shopId}/temperature/${temperatureId}`);
          router.refresh();
          toast({
            title: "Successfully removed temperature!",
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
      )
    }
  }
]
