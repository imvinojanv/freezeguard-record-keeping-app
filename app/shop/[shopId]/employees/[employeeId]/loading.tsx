import { Loader } from "lucide-react";

const EmployeeIdLoading = () => {
    return (
        <div className='min-h-screen w-full flex justify-center items-center'>
            <Loader className="animate-spin w-7 h-7" />
        </div>
    )
}

export default EmployeeIdLoading;