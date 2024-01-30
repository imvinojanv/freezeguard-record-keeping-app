import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
    req: Request,
    { params }: { params: { shopId: string, machineId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        };
        console.log("working", params.machineId);
        

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