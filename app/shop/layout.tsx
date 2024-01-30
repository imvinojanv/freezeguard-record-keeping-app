import { currentUser } from "@clerk/nextjs";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { createUser } from "@/actions/create-user";
import { db } from "@/lib/db";

const ShopLayout = async ({
    children,
    params
} : {
    children: React.ReactNode;
    params: { shopId: string };
}) => {
    const user = await currentUser();
    
    const profileImg: string | null = user?.hasImage ? user.imageUrl : null;
    
    // Create a new user
    if (user?.id) {
        await createUser({
            userId: user?.id,
            email: user?.emailAddresses[0].emailAddress,
            firstName: user?.firstName,
            lastName: user?.lastName,
            profileImg: profileImg
        });
    };

    const userFromDB = await db.user.findUnique({
        where: {
            userId: user?.id
        }
    });
    
    // Check and update the lates user profile
    if (profileImg !== userFromDB?.profileImg) {
        await db.user.update({
            where: {
                userId: user?.id
            },
            data: {
                profileImg
            }
        })
    }

    return (
        <div className="h-full w-full">
            <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className="md:ml-72 h-full overflow-y-auto">
                <Navbar />
                {children}
            </main>
        </div>
    );
}
 
export default ShopLayout;