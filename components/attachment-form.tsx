"use client"

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { useToast } from "@/components/ui/use-toast";

interface AttachmentFormProps {
    user: User;
}

const formSchema = z.object({
    attachmentUrl: z.string().min(1, {
        message: "Attachment is required",
    }),
});

const AttachmentForm = ({
    user
}: AttachmentFormProps) => {
    const { toast } = useToast();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/profile`, values);
            toast({
                title: "File uploaded successfully",
                variant: 'success',
            });
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

    return (
        <div className="mt-6 w-full md:max-w-2xl border bg-slate-100 rounded-xl px-1 pt-1.5 pb-1 md:px-4 md:pt-2 md:pb-4">
            <div className="px-3 md:text-lg font-medium flex items-center justify-between">
                Alcohol Test
                <Button onClick={toggleEdit} variant="ghost">                        {/* changed */}
                    {isEditing && (
                        <div className="text-red-600">
                            Cancel
                        </div>
                    )}
                    {!isEditing && !user.attachmentUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add an image
                        </>
                    )}
                    {!isEditing && user.attachmentUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                        </>
                    )}
                </Button>
            </div>

            {!isEditing && (
                !user.attachmentUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div>
                        <div className="relative aspect-video mt-2">
                            <a href={user.attachmentUrl} target="_blank">
                                <Image
                                    alt="Upload"
                                    fill
                                    className="object-cover rounded-md"
                                    src={user.attachmentUrl}
                                />
                            </a>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2 -mb-2">
                            Click the image to download
                        </div>
                    </div>
                )
            )}

            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="profileAttachment"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ attachmentUrl: url });
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        16:9 aspect ratio recommended
                    </div>
                </div>
            )}
        </div>
    )
}

export default AttachmentForm