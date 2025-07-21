"use client"

import { ArrowUpRightIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function DashboardCard({children, path}: {children?: React.ReactNode, path?: string}) {

    const router = useRouter()

    function handleRedirect(e:any){
        router.push(`/${path}`)
    }

    return <div onClick={handleRedirect} className="lg:w-1/3 w-full flex flex-col font-sans bg-white shadow p-5 rounded-xl cursor-pointer hover:text-gray-500 hover:shadow-2xl duration-300">
        {children}
    </div>
}