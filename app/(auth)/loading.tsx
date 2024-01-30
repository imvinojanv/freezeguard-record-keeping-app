import { Loader2 } from "lucide-react";

const AuthLoading = () => {
    return (
        <div className='min-h-screen w-full flex justify-center items-center'>
            <Loader2 className="animate-spin w-7 h-7" />
        </div>
    )
}

export default AuthLoading;