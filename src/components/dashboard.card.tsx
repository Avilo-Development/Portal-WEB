"use client"

import { ArrowUpRightIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function DashboardCard({name, description, icon, path, type='New'}:any){

    const router = useRouter()

    function handleRedirect(e:any){
        router.push(`/${path}`)
    }

    return <div onClick={handleRedirect} className="lg:w-1/3 w-full flex flex-col gap-5 bg-white shadow p-5 rounded-xl cursor-pointer hover:text-gray-500 hover:shadow-2xl duration-300">
        <div className="flex justify-between">
            <div className="flex gap-5 items-center">
                {icon}
                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">{type}</span>
            </div>
            <ArrowUpRightIcon className="size-8" />
        </div>
        <hr />
        <div className="w-full flex flex-col gap-3 text-wrap">
            <span className="text-2xl">{name}</span>
            <p>{description}</p>
        </div>
    </div>
}