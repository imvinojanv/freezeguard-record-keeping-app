import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const ShopLayout = ({
    children,
    params
} : {
    children: React.ReactNode;
    params: { shopId: string };
}) => {
    return (
        <div className="h-full w-full">
            <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className="md:pl-72 h-full">
                <Navbar />
                {children}
            </main>
        </div>
    );
}
 
export default ShopLayout;