import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const { name, location } = await req.json();

        if (!userId) {
            return new NextResponse("Unautherized", { status: 401 })
        }

        const shop = await db.shop.create({
            data: {
                userId,
                name,
                location
            }
        });

        return NextResponse.json(shop);
    } catch (error) {
        console.error("[SHOPS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}