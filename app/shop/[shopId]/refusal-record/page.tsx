import { ClipboardList, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

const RefusalRecordPage = () => {
  return (
    <section className="px-4 md:px-6 mt-12">
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex items-center gap-x-3">
            <div className="bg-slate-200 p-3 w-fit rounded-md max-lg:hidden">
                <ClipboardList className="h-8 w-8 text-slate-700" />
            </div>
            <div>
                <h2 className="text-xl md:text-[22px] font-semibold">Refusal Record</h2>
                <p className="text-sm text-slate-500">
                    Say "No" to child
                </p>
            </div>
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

export default RefusalRecordPage