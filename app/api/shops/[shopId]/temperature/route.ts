import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
    req: Request,
    { params }: { params: { shopId: string } }
) {
    try {
        const user = await currentUser();
        const { 
            temperature, 
            isFromDelivery, 
            machineId, 
            date, 
            time 
        } = await req.json();
        const formattedDate = date.split('T')[0];

        if (!user?.id) {
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
                userId: user.id,
                userName: user.firstName,
                temperature,
                machineId,
                date: formattedDate,
                time,
                isFromDelivery,
                shopId: params.shopId,
            }
        });

        return NextResponse.json(temp);
    } catch (error) {
        console.error("[TEMPERATURE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}