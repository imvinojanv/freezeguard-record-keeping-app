import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
    req: Request,
    { params }: { params: { shopId: string } }
) {
    try {
        const { userId } = auth();
        const { shopId } = params;
        const { name, type } = await req.json();

        if (!userId) {
            return new NextResponse("Unautherized", { status: 401 })
        }

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