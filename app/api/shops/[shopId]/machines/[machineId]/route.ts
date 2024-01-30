import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin";

export async function DELETE(
    req: Request,
    { params }: { params: { shopId: string, machineId: string } }
) {
    try {
        const { userId } = auth();

        const isAuthorized = isAdmin(userId);

        if (!userId || !isAuthorized) {
            return new NextResponse("Unauthorized", { status: 401 });
        };

        const deletedMachine = await db.machine.delete({
            where: {
                id: params.machineId,
            }
        })

        return NextResponse.json(deletedMachine);
    } catch (error) {
        console.error("[MACHINE_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}