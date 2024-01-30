import { currentUser } from "@clerk/nextjs";
import { ThermometerSnowflake } from "lucide-react";
import { redirect } from "next/navigation";

import { greetingDay } from "@/actions/greeting-day";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin";
import TemperatureMachine from "@/components/temperature-machine";
import AddTemperature from "@/components/add-temperature";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const TemperaturePage = async ({
  params
}: {
  params: { shopId: string }
}) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  // Get Today
  const { dayOfWeekName, dateString } = greetingDay();

  // Fetch the mechine data
  const machines = await db.machine.findMany({
    where: {
      shopId: params.shopId
    },
    select: {
      id: true,
      name: true,
      type: true,
    },
  });

  // Fetch the normal temperature
  const temperature = await db.temperature.findMany({
    where: {
      shopId: params.shopId,
      isFromDelivery: false,
    },
    include: {
      machine: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  // Fetch the delivery temperature
  const temperatureForDelivery = await db.temperature.findMany({
    where: {
      shopId: params.shopId,
      isFromDelivery: true
    },
    include: {
      machine: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <section className="px-4 md:px-6 mb-10">
      <div className="mt-8 flex flex-col">
        <h1 className="text-slate-900 text-2xl font-bold">Hello, {user?.firstName} 👋</h1>
        <p className="text-slate-500 text-base mt-0.5">Today is {dayOfWeekName}. {dateString}</p>
      </div>

      {isAdmin(user?.id) &&
        <TemperatureMachine 
          initialData={machines}
          shopId={params.shopId}
        />
      }

      <div className="mt-16 w-full flex flex-row justify-between items-center">
        <div className="flex items-center gap-x-3">
            <div className="bg-slate-200 p-3 w-fit rounded-md max-lg:hidden">
                <ThermometerSnowflake className="h-8 w-8 text-slate-700" />
            </div>
            <div>
                <h2 className="text-xl md:text-[22px] font-semibold">Temperature</h2>
                <p className="text-sm text-slate-500">
                    Measure the temperature
                </p>
            </div>
        </div>
        <AddTemperature 
          shopId={params.shopId}
          machines={machines.map((category) => ({
            label: category.name,
            value: category.id
          }))}
        />
      </div>

      <div className="mt-8">
        <DataTable columns={columns} data={temperature} />
      </div>

      <Separator className="my-2 h-0.5" />

      <div className="mt-6">
        <h2 className="text-lg font-medium mb-1">Delivery Temperatures</h2>
        <DataTable columns={columns} data={temperatureForDelivery} />
      </div>
    </section>
  )
}

export default TemperaturePage