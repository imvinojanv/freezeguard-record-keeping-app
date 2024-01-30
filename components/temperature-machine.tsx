"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import ConfirmModel from "@/components/models/confirm-model";
import { cn } from "@/lib/utils";

interface TemperatureMachineProps {
    initialData: {
        id: string;
        name: string;
        type: string;
    }[];
    shopId: string;
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Machine name is required",
    }),
    type: z.string().min(1),
});

const TemperatureMachine = ({
    initialData,
    shopId
}: TemperatureMachineProps) => {
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: ""
        },
    });

    const { isSubmitting, isValid } = form.formState;
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/shops/${shopId}/machines`, values);
            form.reset();
            toggleEdit();
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
        }
    }

    const onDelete = async (machineId: string) => {
        try {
            setIsLoadingDelete(true);
            await axios.delete(`/api/shops/${shopId}/machines/${machineId}`);
            router.refresh();
            toast({
                title: "Successfully removed machine!",
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
            setIsLoadingDelete(false);
        }
    }

    return (
        <div className="mt-12 max-w-xl">
            <h2 className="text-slate-900 text-xl font-medium">Customize your machines</h2>
            <div className="mt-4 border bg-slate-100 rounded-md p-4">
                <div className="font-medium flex items-center justify-between">
                    List of machines
                    <Button onClick={toggleEdit} variant="ghost">
                        {isEditing ? (
                            <div className="text-red-600">
                                Cancel
                            </div>
                        ) : (
                            <>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add new
                            </>
                        )}
                    </Button>
                </div>

                {!isEditing && (
                    <div className="space-y-2">
                        {initialData ? initialData.map((machine, index) => (
                            <div
                                key={machine.id}
                                className="group mt-2 py-3 px-4 bg-slate-500 rounded-lg flex justify-between items-center"
                            >
                                <h3 className="md:ml-2 text-white font-medium">{machine.name}</h3>
                                <div className="flex gap-2">
                                    <ConfirmModel onConfirm={() => onDelete(machine.id)}>
                                        <div className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full bg-white/20 hover:bg-white/60 text-slate-700 hover:text-destructive cursor-pointer transition">
                                            <Trash2 className="w-5 h-5" />
                                        </div>
                                    </ConfirmModel>
                                    <p className="text-white px-3 py-1 text-xs md:text-sm rounded-full bg-white/20 flex items-center">{machine.type.toUpperCase()}</p>
                                </div>
                            </div>
                        )) : (
                            <p className="text-sm mt-2text-slate-500 italic">
                                No machines available
                            </p>
                        )}
                        <p className={cn("w-full hidden text-sm text-slate-500 text-end", isLoadingDelete && "flex")}>Deleting...</p>
                    </div>
                )}

                {isEditing && (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full space-y-4 mt-4"
                        >
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="w-3/5">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        disabled={isSubmitting}
                                                        placeholder="e.g. 'Freezer 1'"
                                                        className="md:min-w-[280px] lg:min-w-[320px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="w-2/5">
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select the machine type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="freezer">Freezer</SelectItem>
                                                        <SelectItem value="chiller">Chiller</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <Button
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    className="flex gap-2"
                                >
                                    <Loader2 className={cn("animate-spin w-5 h-5 hidden", isSubmitting && "flex")} />
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
            </div>
        </div>
    )
}

export default TemperatureMachine