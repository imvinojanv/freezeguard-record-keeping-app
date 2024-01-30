import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin";

export async function POST(
    req: Request,
    { params }: { params: { shopId: string } }
) {
    try {
        const { userId } = auth();
        const { shopId } = params;
        const { name, type } = await req.json();

        const isAuthorized = isAdmin(userId);

        if (!userId || !isAuthorized) {
            return new NextResponse("Unauthorized", { status: 401 });
        };

        const shop = await db.machine.create({
            data: {
                name,
                type,
                shopId,
            }
        });

        return NextResponse.json(shop);
    } catch (error) {
        console.error("[MACHINES]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}