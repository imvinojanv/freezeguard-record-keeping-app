import Image from "next/image";
import { currentUser } from "@clerk/nextjs";

import SidebarRoutes from "./sidebar-routes";
import Link from "next/link";
import { isAdmin } from "@/lib/admin";

const Sidebar = async () => {
    const user = await currentUser();
    
    const userImg: string = user?.hasImage ? user.imageUrl : '/user.svg'

    return (
        <div className="h-full py-8">
            <div className="h-full px-6 border-r-2 flex flex-col overflow-y-auto bg-white">
                <div className="mt-4 px-3 flex justify-center">
                    <Link href='/'>
                        <Image
                            src='/logo.svg'
                            alt="logo"
                            height={180}
                            width={180}
                        />
                    </Link>
                </div>
                <div className="mt-16 w-full flex flex-col justify-center items-center">
                    <div>
                        <Image
                            src={userImg}
                            alt="user"
                            height={150}
                            width={150}
                            className="rounded-full"
                        />
                        {isAdmin(user?.id) && 
                            <Image
                                src="/admin.svg"
                                alt=""
                                height={36}
                                width={36}
                                className="absolute -mt-9 right-20 shadow-xl rounded-full"
                            />
                        }
                    </div>
                    <div className="w-full mt-4">
                        <h3 className="text-center text-slate-700 text-lg font-semibold">
                            {user?.firstName}{" "}{user?.lastName}
                        </h3>
                        <p className="text-center text-slate-500 text-sm">
                            {user?.emailAddresses[0].emailAddress}
                        </p>
                    </div>
                </div>
                <div className="mt-16">
                    <SidebarRoutes />
                </div>
            </div>
        </div>
    )
}

export default Sidebar