import React from "react";

export default function Badge({ color, children}: { color: any, children: React.ReactNode }) {
    const setColor = {
        green: 'text-green-700 bg-green-50 ring-green-600/20',
        blue: 'text-blue-700 bg-blue-50 ring-blue-600/20',
    }
    const key: keyof typeof setColor = 'green';
    return <span className={'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset w-fit text-nowrap '+setColor[key]}>
        {children}
    </span>
}