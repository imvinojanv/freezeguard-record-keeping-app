import EmployeesTable from "@/components/employees-table";
import { db } from "@/lib/db"
import { Users } from "lucide-react"

const EmployeesPage = async ({
  params
}: {
  params: { shopId: string }
}) => {
  const users = await db.user.findMany({
    select: {
      userId: true,
      email: true,
      firstName: true,
      lastName: true,
      imageUrl: true,
      isVerified: true,
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  
  return (
    <section className="px-4 md:px-6 mt-10">
      <div className="flex items-center gap-x-3">
        <div className="bg-slate-200 p-3 w-fit rounded-md max-lg:hidden">
          <Users className="h-8 w-8 text-slate-700" />
        </div>
        <div>
          <h2 className="text-xl md:text-[22px] font-semibold">Employees</h2>
          <p className="text-sm text-slate-500">
            Manage all employees in your company
          </p>
        </div>
      </div>

      <EmployeesTable users={users} shopId={params.shopId} />
    </section>
  )
}

export default EmployeesPage