"use client"

import * as z from 'zod';
import axios from 'axios';
import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2, Zap } from 'lucide-react';

import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
    FormItem,
} from "@/components/ui/form";
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Shop name is required",
    }),
    location: z.string().min(1, {
        message: "Shop location is required"
    })
});

const CreateShopPage = () => {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            location: ""
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/shops", values);
            router.push(`/shop/${response.data.id}/temperature`);
            toast({
                title: "Shop Created!",
                variant: 'success',
                description: (
                    <p className='text-slate-500'>Please wait to redirect to the dashboard</p>
                ),
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
        }
    }

    return (
        <div className='h-full mt-8 md:mt-20 mx-auto max-w-5xl p-4 flex md:items-center md:justify-center'>
            <div>
                <h1 className="text-2xl font-medium">
                    Name your shop
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                    What would you like to name your shop? Emloyees can easily identify the shop
                </p>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8 mt-8'
                    >
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Shop name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Dass Limited London'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='location'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Location
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'London, United Kingdom'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/">
                                <Button
                                    type="button"
                                    variant='secondary'
                                >
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                className={cn(
                                    "flex gap-1 pr-5",
                                    isSubmitting && "gap-2"
                                )}
                            >
                                <Zap className={cn("w-5 h-5", isSubmitting && "hidden")} />
                                <Loader2 className={cn("animate-spin w-5 h-5 hidden", isSubmitting && "flex")} />
                                Create
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default CreateShopPage