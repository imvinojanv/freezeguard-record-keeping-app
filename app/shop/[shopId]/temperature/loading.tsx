import { Skeleton } from "@/components/ui/skeleton"

const TemperatureLoading = () => {
    return (
        <div className="px-4 md:px-6 mb-10">
            <div className="mt-8 flex flex-col gap-2">
                <Skeleton className="h-8 w-[180px] md:w-[300px]" />
                <Skeleton className="h-4 w-[240px] md:w-[400px]" />
            </div>

            <div className="mt-12 max-w-xl">
                <Skeleton className="h-6 w-[260px]" />
                <Skeleton className="mt-4 rounded-md w-full h-[200px]" />
            </div>

            <div className="mt-16 w-full flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <div className="flex gap-x-3">
                        <Skeleton className="h-14 w-14 hidden md:flex" />
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-7 w-[140px] md:w-[300px]" />
                            <Skeleton className="h-3 w-[180px] md:w-[360px]" />
                        </div>
                    </div>
                    <Skeleton className="h-8 w-[100px]" />
                </div>
                <Skeleton className="mt-8 h-[300px] w-full" />
            </div>
        </div>
    )
}

export default TemperatureLoading