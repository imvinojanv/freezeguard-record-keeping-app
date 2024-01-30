import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
    { params }: { params: { shopId: string, employeeId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        };

        const exmployee = await db.user.findUnique({
            where: {
                userId: params.employeeId
            },
        });

        if (!exmployee) {
            return new NextResponse("Not found", { status: 404 });
        };

        const verifyEmployee = await db.user.update({
            where: {
                userId: params.employeeId,
            },
            data: {
                isVerified: true,
            },
        });

        return NextResponse.json(verifyEmployee);

    } catch (error) {
        console.log("[EMPLOYEE_VERIFY]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}