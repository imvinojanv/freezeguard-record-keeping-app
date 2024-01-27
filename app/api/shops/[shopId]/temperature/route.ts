import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
    req: Request,
    { params }: { params: { shopId: string } }
) {
    try {
        const { userId } = auth();
        const { temperature, isFromDelivery, machineId } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const isShopAvailable = await db.shop.findUnique({
            where: {
                id: params.shopId,
            }
        });

        if (!isShopAvailable) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const temp = await db.temperature.create({
            data: {
                userId,
                temperature,
                isFromDelivery,
                machineId,
                shopId: params.shopId,
            }
        });

        return NextResponse.json(temp);
    } catch (error) {
        console.error("[TEMPERATURE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}