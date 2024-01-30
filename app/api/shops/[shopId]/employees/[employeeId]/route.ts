import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin";

export async function DELETE(
    req: Request,
    { params }: { params: { shopId: string, employeeId: string } }
) {
    try {
        const { userId } = auth();

        const isAuthorized = isAdmin(userId);

        if (!userId || !isAuthorized) {
            return new NextResponse("Unauthorized", { status: 401 });
        };

        const employee = await db.user.findUnique({
            where: {
                userId: params.employeeId
            },
        });
        
        if (!employee) {
            return new NextResponse("Not found", { status: 404 });
        };

        const deletedEmployee = await db.user.delete({
            where: {
                userId: params.employeeId
            },
        });

        return NextResponse.json(deletedEmployee);
    } catch (error) {
        console.error("[EMPLOYEES_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}