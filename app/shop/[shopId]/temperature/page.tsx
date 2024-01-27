import { currentUser } from "@clerk/nextjs";
import { Plus, ThermometerSnowflake } from "lucide-react";

import TemperatureMachine from "@/components/temperature-machine";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import AddTemperature from "@/components/add-temperature";


const TemperaturePage = async ({
  params
}: {
  params: { shopId: string }
}) => {
  const user = await currentUser();

  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeekName = daysOfWeek[dayOfWeek];

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const dateString = today.toLocaleDateString('en-US', options);

  const machines = await db.machine.findMany({
    select: {
      id: true,
      name: true,
      type: true,
    },
  });

  return (
    <section className="px-4 md:px-6">
      <div className="mt-8 flex flex-col">
        <h1 className="text-slate-900 text-2xl font-bold">Hello, {user?.firstName} 👋</h1>
        <p className="text-slate-500 text-base mt-0.5">Today is {dayOfWeekName}. {dateString}</p>
      </div>

      <TemperatureMachine 
        initialData={machines}
        shopId={params.shopId}
      />

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
    </section>
  )
}

export default TemperaturePage