"use client"

import Link from "next/link";
import { ClipboardList, ThermometerSnowflake, User, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const sideRoutes = [
    {
        icon: ThermometerSnowflake,
        label: "Temperature",
        href: "/temperature"
    },
    {
        icon: ClipboardList,
        label: "Refusal Record",
        href: "/refusal-record"
    },
    {
        icon: Users,
        label: "Employees",
        href: "/employees"
    },
    {
        icon: User,
        label: "Profile",
        href: "/profile"
    }
]

const SidebarRoutes = () => {
    const pathname = usePathname();
    const urlPath = pathname.substring(pathname.lastIndexOf("/") + 0);      // Get last pathname index

    const shopId = pathname.split('/')[2];      // Split the id

    return (
        <div className="flex flex-col space-y-2">
            {sideRoutes.map((route) => (
                <Link
                    href={`/shop/${shopId}${route.href}`}
                    className={cn(
                        "w-full group px-6 py-3 flex flex-row gap-4 cursor-pointer rounded-lg items-center transition bg-white hover:bg-slate-100",
                        route.href === urlPath && "bg-slate-100"
                    )}
                >
                    <route.icon
                        size={22}
                        className={cn(
                            "text-slate-500 group-hover:text-slate-900",
                            route.href === urlPath && "text-slate-900"
                        )}
                    />
                    <p 
                        className={cn(
                            "text-slate-500 group-hover:text-slate-900 font-medium",
                            route.href === urlPath && "text-slate-900"
                        )}
                    >
                        {route.label}
                    </p>
                </Link>
            ))}
        </div>
    )
}

export default SidebarRoutes