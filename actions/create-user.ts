import { db } from "@/lib/db";

interface CreateUserProps {
    userId: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
}

export const createUser = async ({
    userId,
    email,
    firstName,
    lastName
}: CreateUserProps) => {
    try {
        const user = await db.user.findUnique({
            where: {
                userId
            }
        });

        if (!user) {
            await db.user.create({
                data: {
                    userId,
                    email,
                    firstName,
                    lastName,
                }
            })
            console.log(`New user ${email} is created successfully`);
        }
    } catch (error: any) {
        console.error("[CREATE_USER_ERROR]:", error);
    }
}