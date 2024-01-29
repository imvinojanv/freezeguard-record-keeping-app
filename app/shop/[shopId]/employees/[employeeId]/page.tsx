import Image from "next/image";
import { BadgeCheck, User, WineOff } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import EmployeeVerification from "./_components/employee-verification";
import EmployeeBanner from "./_components/employee-banner";

const EmployeeIdPage = async ({
    params
}: {
    params: { shopId: string, employeeId: string }
}) => {
    const employee = await db.user.findUnique({
        where: {
            userId: params.employeeId,
        }
    });

    return (
        <section className="px-4 md:px-6 my-10">
            <div className="flex items-center gap-x-3">
                <div className="bg-slate-200 p-3 w-fit rounded-md max-lg:hidden">
                    <User className="h-8 w-8 text-slate-700" />
                </div>
                <div>
                    <h2 className="text-xl md:text-[22px] font-semibold">Employee profile</h2>
                    <p className="text-sm text-slate-500">
                        Check your employees and verify them
                    </p>
                </div>
            </div>
            <div className="mt-12">
                {/* Verification Banner */}
                {!employee?.isVerified && (
                    <EmployeeBanner name={employee?.firstName} />
                )}

                <div className="w-full md:max-w-2xl p-4 bg-slate-100 border rounded-xl">
                    <div className="flex flex-row justify-between items-end">
                        <Image 
                            src={employee?.profileImg ? employee?.profileImg : '/user.svg'}
                            alt={employee?.firstName || ''}
                            height={120}
                            width={120}
                            className="max-sm:w-24 max-sm:h-24 rounded-lg border"
                        />
                        <EmployeeVerification 
                            shopId={params.shopId}
                            employeeId={params.employeeId}
                            isVerified={employee?.isVerified}
                        />
                    </div>
                    <Separator className="my-6 h-0.5 rounded-full" />
                    <div className="px-2 space-y-2">
                        <div className="flex">
                            <h3 className="w-1/3 font-medium text-slate-900">Name</h3>
                            <h3 className="text-slate-500">{employee?.firstName}{" "}{employee?.lastName}</h3>
                        </div>
                        <hr/>
                        <div className="flex">
                            <h3 className="w-1/3 font-medium text-slate-900">ID</h3>
                            <h3 className="text-slate-500 line-clamp-1">{employee?.userId}</h3>
                        </div>
                        <hr/>
                        <div className="flex">
                            <h3 className="w-1/3 font-medium text-slate-900">Email</h3>
                            <h3 className="text-slate-500 line-clamp-1">{employee?.email}</h3>
                        </div>
                        <hr/>
                        <div className="flex">
                            <h3 className="w-1/3 font-medium text-slate-900">Role</h3>
                            <h3 className="text-slate-500">{employee?.email === 'dassslimited@gmail.com' ? 'Admin' : 'Employee'}</h3>
                        </div>
                        <hr/>
                        <div className="flex">
                            <h3 className="w-1/3 font-medium text-slate-900">Status</h3>
                            <h3 className="text-slate-500 italic">
                                {employee?.isVerified === true ? (
                                    <span className="flex items-center gap-2">verified <BadgeCheck className="h-4 w-4 text-[#00C04B] font-bold" /></span>
                                ) : 'not verified'}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="mt-6 w-full md:max-w-2xl p-4 bg-slate-100 border rounded-xl">
                    <WineOff />
                    <h1 className="text-lg font-medium text-slate-900">Alcohol Test</h1>
                </div>
            </div>
        </section>
    )
}

export default EmployeeIdPage