"use client"

import { Trash2 } from "lucide-react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import ConfirmModel from "./models/confirm-model";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";


interface EmployeesTableProps {
    users: {
        userId: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
        imageUrl: string | null;
        isVerified: boolean;
    }[];
    shopId: string;
}

const EmployeesTable = ({
    users,
    shopId
}: EmployeesTableProps) => {
    const router = useRouter();
    const { toast } = useToast();

    const [isLoading, setIsLoading] = useState(false);

    const onDelete = async (userId: string) => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/shops/${shopId}/employees/${userId}`);
            router.refresh();
            toast({
                title: "Successfully removed employee!",
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
        <div className="mt-8 border rounded-lg">
            <Table>
                <TableCaption className="py-2 bg-slate-50 rounded-b-lg">You can remove a employee from your company</TableCaption>
                <TableHeader>
                    <TableRow className="text-base">
                        <TableHead className="">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users && users.map((user) => (
                        <TableRow className="">
                            <TableCell className="font-medium">{user.firstName}{" "}{user.lastName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="text-slate-500">{user.isVerified === true ? "Verified" : "Not Verified"}</TableCell>
                            <TableCell className="flex justify-end text-right">
                                <ConfirmModel onConfirm={() => onDelete(user.userId)}>
                                    <Button 
                                        size='sm'
                                        disabled={isLoading}
                                        variant='outline'
                                    >
                                        <Trash2 className="w-[18px] h-[18px] text-destructive"/>
                                    </Button>
                                </ConfirmModel>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default EmployeesTable