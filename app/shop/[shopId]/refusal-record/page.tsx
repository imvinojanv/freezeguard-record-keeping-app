import { ClipboardList } from "lucide-react"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import AddRefusalRecord from "@/components/add-refusal-record"
import { DataTable } from "./_components/data-table"
import { columns } from "./_components/columns"

const RefusalRecordPage = async ({
  params
}: {
  params: { shopId: string }
}) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  const refusalRecord = await db.refusalRecord.findMany({
    where: {
      shopId: params.shopId,
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <section className="px-4 md:px-6 my-10">
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex items-center gap-x-3">
            <div className="bg-slate-200 p-3 w-fit rounded-md max-lg:hidden">
                <ClipboardList className="h-8 w-8 text-slate-700" />
            </div>
            <div>
                <h2 className="text-xl md:text-[22px] font-semibold">Refusal Record</h2>
                <p className="text-sm text-slate-500">
                    Say "No" to verified people
                </p>
            </div>
        </div>
        <AddRefusalRecord
          shopId={params.shopId}
        />
      </div>

      <div className="mt-8">
        <DataTable columns={columns} data={refusalRecord} />
      </div>
    </section>
  )
}

export default RefusalRecordPage