import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { isAdmin } from "@/lib/admin";

const EmployeesLayout = ({
    children,
    params
} : {
    children: React.ReactNode;
    params: { shopId: string };
}) => {
    const { userId } = auth();

    if (!isAdmin(userId)) {
        return redirect(`/shop/${params.shopId}/temperature`);       // protect the teacher routes from other users
    }

    return <>{children}</>
}

export default EmployeesLayout;