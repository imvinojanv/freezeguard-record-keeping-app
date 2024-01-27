import { ExternalLink, MapPin } from 'lucide-react'
import Link from 'next/link'

interface ShopsListProps {
    shops: {
        id: string,
        name: string,
        location: string
    }[];
}

const ShopsList = ({
    shops
}: ShopsListProps) => {
    return (
        <div className="w-full mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop) => (
                <Link key={shop.id} href={`/shop/${shop.id}/temperature`}>
                    <div className="group flex flex-col p-5 md:px-6 md:py-5 gap-4 bg-slate-100 rounded-lg border hover:border-slate-400">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-slate-800 text-lg font-medium">{shop.name}</h2>
                            <ExternalLink className="w-5 h-5 text-slate-600 opacity-0 group-hover:opacity-100" />
                        </div>
                        <div className="flex flex-row gap-1 items-center">
                            <MapPin className="w-5 h-5 text-slate-400" />
                            <p className="text-slate-500 text-sm">{shop.location}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ShopsList