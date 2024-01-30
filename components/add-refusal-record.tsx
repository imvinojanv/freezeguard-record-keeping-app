"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ClipboardList, Loader2, Plus } from "lucide-react";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface AddRefusalRecordProps {
    shopId: string;
};

const formSchema = z.object({
    product: z.string().min(1, {
        message: "Product is required",
    }),
    age: z.number({
        required_error: "Age is required",
        invalid_type_error: "Age must be a number",
    }),
    date: z.date(),
    time: z.string().min(1),
    gender: z.enum(["male", "female", "other"]),
});

const AddRefusalRecord = ({
    shopId,
}: AddRefusalRecordProps) => {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            product: "",
            age: undefined,
            date: undefined,
            time: "",
            gender: undefined,
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/shops/${shopId}/refusal-record`, values);
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
                        <ClipboardList />
                        Add refusal record
                    </DialogTitle>
                    <DialogDescription>
                        Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-4 mt-4"
                    >
                        <div className="flex flex-col gap-6">
                            <div className="mt-2 w-full flex gap-4">
                                <div className="w-3/5">
                                    <FormField
                                        control={form.control}
                                        name="product"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base">
                                                    Machine
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select the product" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value='alcohol'>Alcohol</SelectItem>
                                                        <SelectItem value='tobacco'>Tobacco</SelectItem>
                                                        <SelectItem value='lottery'>Lottery</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="w-2/5">
                                    <FormField
                                        control={form.control}
                                        name="age"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base">
                                                    Age
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type='number'
                                                        step="1"
                                                        disabled={isSubmitting}
                                                        placeholder="Customer's age"
                                                        {...field}
                                                        onChange={(e) => {
                                                            const age: number = parseInt(e.target.value);
                                                            form.setValue('age', age, { shouldValidate: true, shouldDirty: true });
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <FormLabel className="text-base">
                                    Date & Time
                                </FormLabel>
                                <div className="mt-2 w-full flex gap-4">
                                    <div className="w-3/5">
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
                                    </div>
                                    <div className="w-2/5">
                                        <FormField
                                            control={form.control}
                                            name="time"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            type='time'
                                                            disabled={isSubmitting}
                                                            placeholder="e.g. '12:00 PM'"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel className="text-base">
                                            Gender
                                        </FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="male" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Male</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="female" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Female</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="other" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Other</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
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

export default AddRefusalRecord