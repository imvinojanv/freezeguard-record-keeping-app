"use client"

import { useState } from "react";
import { Loader2, ShieldAlert, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface EmployeeVerificationProps {
    shopId: string;
    employeeId: string;
    isVerified: boolean | undefined;
}

const EmployeeVerification = ({
    shopId,
    employeeId,
    isVerified
}: EmployeeVerificationProps) => {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            if (isVerified) {
                await axios.patch(`/api/shops/${shopId}/employees/${employeeId}/unverify`)
                toast({
                    title: "Successfully unverified",
                    variant: 'success',
                });
            } else {
                await axios.patch(`/api/shops/${shopId}/employees/${employeeId}/verify`);
                toast({
                    title: "Successfully verified",
                    variant: 'success',
                });
            }

            router.refresh();
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
        <>
            {isVerified ? (
                <Button
                    className="flex gap-2 pr-5"
                    onClick={onClick}
                    disabled={isLoading}
                >
                    <ShieldAlert className={cn("h-5 w-5", isLoading && 'hidden')} />
                    <Loader2 className={cn("animate-spin w-5 h-5 hidden", isLoading && "flex")} />
                    Unverify
                </Button>
            ): (
                <Button
                    className="flex gap-2 pr-5"
                    onClick={onClick}
                    disabled={isLoading}
                >
                    <ShieldCheck className={cn("h-5 w-5", isLoading && 'hidden')} />
                    <Loader2 className={cn("animate-spin w-5 h-5 hidden", isLoading && "flex")} />
                    Verify
                </Button>
                
            )}
        </>
    )
}

export default EmployeeVerification