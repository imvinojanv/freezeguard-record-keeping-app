import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { isAdmin } from "@/lib/admin";

const f = createUploadthing();

const handleAuth = () => {
    const { userId } = auth();

    const isAuthorized = isAdmin(userId);

    if (!userId || !isAuthorized) throw new Error("Unauthorized");
    return { userId };
}

export const ourFileRouter = {
    profileAttachment: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),

    // employeeAttachment: f(["text", "image", "video", "audio", "pdf"])
    //     .middleware(() => handleAuth())
    //     .onUploadComplete(() => {}),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;