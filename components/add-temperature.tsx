"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Plus, ThermometerSnowflake } from "lucide-react";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface AddTemperatureProps {
    shopId: string;
    machines: { label: string; value: string }[];
}

const formSchema = z.object({
    temperature: z.coerce.number(),
    machineId: z.string().min(1),
    date: z.date(),
    time: z.string().min(1),
    isFromDelivery: z.boolean().default(false),
});

const AddTemperature = ({
    shopId,
    machines
}: AddTemperatureProps) => {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            temperature: undefined,
            machineId: "",
            date: undefined,
            time: "",
            isFromDelivery: false,
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/shops/${shopId}/temperature`, values);
            router.refresh();
            form.reset();
            setIsOpen(false);
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

    return (
        <Dialog open={isOpen}>
            <DialogTrigger asChild>
                <Button className="flex gap-2 pr-5" onClick={() => setIsOpen(true)}>
                    <Plus className="w-5 h-5" />
                    Add new
                </Button>
            </DialogTrigger>
            <DialogContent className="max-md:py-8 md:p-8">
                <DialogHeader className="mt-2">
                    <DialogTitle className="flex gap-2 items-center">
                        <ThermometerSnowflake />
                        Add temperature
                    </DialogTitle>
                    <DialogDescription>
                        Add temperature for your machines. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-4 mt-4"
                    >
                        <div className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="temperature"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base">
                                            Temperature
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.1"
                                                disabled={isSubmitting}
                                                placeholder="e.g. '-17°C'"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="machineId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base">
                                            Machine
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select the machine" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {machines.map((machine) => (
                                                    <SelectItem value={machine.value}>{machine.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="w-full">
                                <FormLabel className="text-base">
                                    Date & Time
                                </FormLabel>
                                <div className="mt-2 w-full flex gap-4">
                                    <FormField
                                        control={form.control}
                                        name="date"
                                        render={({ field }: { field: FieldValues['fields']['date'] }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        disabled={isSubmitting}
                                                        placeholder="e.g. '-17°C'"
                                                        {...field}
                                                        value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                                                        onChange={(e) => {
                                                            const selectedDate = new Date(e.target.value);
                                                            form.setValue('date', selectedDate, { shouldValidate: true, shouldDirty: true });
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="time"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select time" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="morning">Morning</SelectItem>
                                                        <SelectItem value="noon">Noon</SelectItem>
                                                        <SelectItem value="Evening">Evening</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="isFromDelivery"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col rounded-lg border p-4">
                                        <div className="flex flex-row justify-between items-center w-full">
                                            <FormLabel className="text-base">
                                                Is it delivery temperature?
                                            </FormLabel>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormDescription>
                                            The temperature measured for delivered products
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <div className="mt-4 mb-2 flex gap-4">
                                <Button variant='secondary' className="flex gap-2 pr-5" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    className="flex gap-2 pr-5"
                                >
                                    <Check className={cn("w-5 h-5", isSubmitting && "hidden")} />
                                    <Loader2 className={cn("animate-spin w-5 h-5 hidden", isSubmitting && "flex")} />
                                    Save
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddTemperature