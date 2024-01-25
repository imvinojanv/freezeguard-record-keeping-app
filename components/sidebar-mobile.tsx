import { AlignLeft } from "lucide-react";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs";

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import SidebarRoutes from "./sidebar-routes";

const SidebarMobile = async () => {
    const user = await currentUser();
    return (
        <Sheet>
            <SheetTrigger className="pr-4 hover:opacity-75 transition">
                <AlignLeft />        {/* Menu Icon */}
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white">
                <div className="h-full p-4 flex flex-col justify-between">
                    <div>
                        <div className="mt-8 pl-6">
                            <Image
                                src='/logo.svg'
                                alt="logo"
                                height={180}
                                width={180}
                            />
                        </div>
                        <div className="mt-12">
                            <SidebarRoutes />
                        </div>
                    </div>
                    <div className="flex items-center px-4 py-6 gap-3">
                        <Image 
                            src={user?.imageUrl ? user?.imageUrl : '/user.png'}
                            alt=""
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <div>
                            <p className="text-slate-700 text-sm font-medium">{user?.firstName}{" "}{user?.lastName}</p>
                            <p className="text-slate-500 text-xs font-normal">{user?.emailAddresses[0].emailAddress}</p>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default SidebarMobile