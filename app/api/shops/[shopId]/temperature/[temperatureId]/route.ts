import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
    req: Request,
    { params }: { params: { shopId: string, temperatureId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        };

        const deletedTemperature = await db.temperature.delete({
            where: {
                id: params.temperatureId,
            }
        });

        return NextResponse.json(deletedTemperature);

    } catch (error) {
        console.error("[TEMPERATURE_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}