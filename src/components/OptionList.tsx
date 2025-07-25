import clsx from 'clsx'
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";

export default function OptionList({ selected, setSelected, list }: { selected: any, setSelected: any, list: any }) {
    return <Listbox value={selected} onChange={setSelected}>
        <ListboxButton className={clsx(
            'relative block w-full rounded-lg bg-black/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-black',
            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25'
        )}>{selected?.text || selected?.name}
            <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
                aria-hidden="true"
            /></ListboxButton>
        <ListboxOptions className={clsx(
            'w-(--button-width) rounded-xl border border-black/60 bg-black/60 text-white p-1 [--anchor-gap:--spacing(1)] focus:outline-none',
            'transition duration-100 ease-in data-leave:data-closed:opacity-0 z-20'
        )} anchor='bottom'>
            {list?.map((c: any) =>
                <ListboxOption className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-black/10" key={c.id} value={c}>
                    {c?.text || c?.name}
                </ListboxOption>
            )}
        </ListboxOptions>
    </Listbox>
}