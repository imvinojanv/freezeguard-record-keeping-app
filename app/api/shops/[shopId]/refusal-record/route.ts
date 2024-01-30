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
            product, 
            age,
            date, 
            time,
            gender
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

        const temp = await db.refusalRecord.create({
            data: {
                userId: user.id,
                userName: user.firstName,
                product,
                age,
                date: formattedDate,
                time,
                gender,
                comments: "No ID, No Sale",
                shopId: params.shopId,
            }
        });

        return NextResponse.json(temp);
    } catch (error) {
        console.error("[TEMPERATURE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}