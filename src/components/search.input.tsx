import { Input } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchInput({ref}: {ref:any}) {
    return <div className="flex gap-2 p-3 w-full text-sm font-mono outline-0 duration-300 rounded-full focus:shadow bg-white">
        <MagnifyingGlassIcon width={20} />
        <Input type="text" ref={ref} className="w-full outline-0" placeholder="(Customer url, Name): " />
    </div>
}