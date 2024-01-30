import Link from "next/link";
import { Plus, ShoppingBag } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import HomeNavbar from "@/components/home-navbar";
import { Button } from "@/components/ui/button";
import ShopsList from "@/components/shops-list";

const Home = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const shops = await db.shop.findMany({
    select: {
      id: true,
      name: true,
      location: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  
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

        {shops.length !== 0 ? 
          <ShopsList shops={shops} />
        : 
          <p className="mt-20 text-slate-500 flex justify-center">
            No shops found. Please create a shop
          </p>
        }
      </div>
    </section>
  );
}

export default Home;