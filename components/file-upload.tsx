"use client";

import { useToast } from "@/components/ui/use-toast";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;       // "courseImage" | "courseAttachment" | "chapterVideo"
};

export const FileUpload = ({
    onChange,
    endpoint
}: FileUploadProps) => {
    const { toast } = useToast();

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                toast({
                    title: "⚠️ Something went wrong with File Upload",
                    variant: 'error',
                    description: (
                        <div className='mt-2 bg-slate-200 py-2 px-3 md:w-[336px] rounded-md'>
                            <code className="text-slate-800">
                                ERROR: {error.message}
                            </code>
                        </div>
                    ),
                });
            }}  
        />
    )
}