import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
) {
    try {
        const { userId } = auth();
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        };

        const user = await db.user.update({
            where: {
                userId
            },
            data: {
                ...values
            },
        });

        return NextResponse.json(user);

    } catch (error) {
        console.log("[PROFILE_ATTACHMENT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}