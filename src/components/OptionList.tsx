import clsx from 'clsx'
import { ArrowTurnRightDownIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";

export default function OptionList({ selected, setSelected, list, color='black' }: { selected: any, setSelected: any, list: any, color?:any }) {
    const setColor = {
        red: ' border-[#BE1B1B] text-black ',
        yellow: ' border-[#BFA41B] text-black ',
        blue: ' border-[#1A7DBF] text-black ',
        green: ' border-[#41BF1A] text-black ',
        black: ' border-[#181c2c] text-black ',
    }
    const key: keyof typeof setColor = color;
    return <Listbox value={selected} onChange={setSelected}>
        <ListboxButton className={clsx(
            'relative block w-full border-b-2  py-1.5 pr-8 pl-3 text-left text-sm/6 '+setColor[key],
            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25'
        )}>{selected?.text || selected?.name && `${selected.name} (${selected?.role?.short})`}
            <ArrowTurnRightDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 "
                aria-hidden="true"
            /></ListboxButton>
        <ListboxOptions className={clsx(
            'w-(--button-width) rounded-xl border border-[#181c2cc4] bg-[#181c2cc4] text-white p-1 [--anchor-gap:--spacing(1)] focus:outline-none',
            'transition duration-100 ease-in data-leave:data-closed:opacity-0 z-20'
        )} anchor='bottom'>
            {list?.map((c: any) =>
                <ListboxOption className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-black/10" key={c.id} value={c}>
                    {c?.text || c?.name || c?.role}
                </ListboxOption>
            )}
        </ListboxOptions>
    </Listbox>
}