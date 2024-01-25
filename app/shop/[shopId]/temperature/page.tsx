import { Button } from "@/components/ui/button"
import { currentUser } from "@clerk/nextjs"
import { Plus, ThermometerSnowflake } from "lucide-react"


const TemperaturePage = async () => {
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

  return (
    <section className="px-4 md:px-6">
      <div className="mt-8 flex flex-col">
        <h1 className="text-slate-900 text-2xl font-bold">Hello, {user?.firstName} 👋</h1>
        <p className="text-slate-500 text-sm mt-0.5">Today is {dayOfWeekName}, {dateString}</p>
      </div>
      
      <div className="mt-12 w-full flex flex-row justify-between items-end">
        <div className="flex flex-row items-center gap-4">
          <div className="w-10 h-10 bg-slate-200 flex justify-center items-center rounded-md">
            <ThermometerSnowflake 
              size={28}
              className="text-slate-700"
            />
          </div>
          <h1 className="text-slate-900 text-xl font-semibold">Temperature</h1>
        </div>
        <Button
          className="flex gap-2 pr-5"
        >
          <Plus className="w-5 h-5" />
          Add new
        </Button>
      </div>
    </section>
  )
}

export default TemperaturePage