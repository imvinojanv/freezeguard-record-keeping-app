import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
    req: Request,
    { params }: { params: { shopId: string, refusalRecordId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        };

        const deletedRefusalRecord = await db.refusalRecord.delete({
            where: {
                id: params.refusalRecordId,
            }
        });

        return NextResponse.json(deletedRefusalRecord);

    } catch (error) {
        console.error("[REFUSAL_RECORD_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}