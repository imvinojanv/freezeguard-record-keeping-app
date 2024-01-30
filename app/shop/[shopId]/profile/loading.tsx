import { Skeleton } from "@/components/ui/skeleton"

const ProfileLoading = () => {
    return (
        <div className="px-4 md:px-6 mb-10">
            <div className="mt-12 flex gap-x-3">
                <Skeleton className="h-14 w-14 hidden md:flex" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-7 w-[140px] md:w-[300px]" />
                    <Skeleton className="h-3 w-[180px] md:w-[360px]" />
                </div>
            </div>

            <div className="mt-12 md:max-w-2xl">
                <Skeleton className="mt-4 rounded-md w-full h-[280px]" />
            </div>

            <div className="mt-6 md:max-w-2xl">
                <Skeleton className="mt-4 rounded-md w-full h-[320px]" />
            </div>
        </div>
    )
}

export default ProfileLoading