import { Input } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchInput({placeholder, ref, setFilter=() => {}}: {ref:any, setFilter?: any, placeholder:string}) {
    return <div className="flex gap-2 p-3 w-full text-sm font-mono outline-0 duration-300 rounded-lg shadow-[#324183] hover:shadow-[#7b90ec] shadow bg-white">
        <MagnifyingGlassIcon width={20} />
        <Input type="text" ref={ref} className="w-full outline-0" onChange={setFilter} placeholder={placeholder} />
    </div>
}