import { ExternalLink, MapPin, Plus, ShoppingBag, ThermometerSnowflake } from "lucide-react";

import HomeNavbar from "@/components/home-navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full h-full">
      <HomeNavbar />

      <div className="px-4 mt-16 md:mt-20 mx-auto max-w-screen-xl">
        <div className="w-full flex flex-row gap-3 justify-between items-start">
          <div className="flex items-center gap-x-4">
            <div className="bg-slate-200 p-3 w-fit rounded-md max-lg:hidden">
              <ShoppingBag className="h-8 w-8 text-slate-700" />
            </div>
            <div>
              <h2 className="text-xl md:text-[22px] font-semibold text-slate-900">Available shops</h2>
              <p className="text-sm text-slate-500">
                The shop is not available, please create a new shop!
              </p>
            </div>
          </div>
          <Link href='/create-shop'>
            <Button
              className="mt-2 flex gap-2 pr-5"
            >
              <Plus className="w-5 h-5" />
              Create shop
            </Button>
          </Link>
        </div>

        <div className="w-full mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href=''>
            <div className="group flex flex-col px-6 py-5 gap-4 bg-slate-100 rounded-xl border hover:border-slate-400">
              <div className="flex flex-row justify-between items-center">
                <h2 className="text-slate-800 text-lg font-medium">Shop Name</h2>
                <ExternalLink className="w-5 h-5 text-slate-600 opacity-0 group-hover:opacity-100" />
              </div>
              <div className="flex flex-row gap-1 items-center">
                <MapPin className="w-5 h-5 text-slate-400" />
                <p className="text-slate-500 text-sm">London, United Kingdom</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
