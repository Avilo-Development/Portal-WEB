import React from "react";

export default function Badge({ color, children, full='fit'}: { color: any, children: React.ReactNode, full?:any }) {
    const setColor = {
        green: 'text-green-700 bg-green-50 ring-green-600/20',
        blue: 'text-blue-700 bg-blue-50 ring-blue-600/20',
        red: 'text-red-700 bg-red-50 ring-red-600/20',
        yellow: 'text-yellow-700 bg-yellow-50 ring-yellow-600/20',
        orange: 'text-orange-700 bg-orange-50 ring-orange-600/20',
        gray: 'text-gray-700 bg-gray-50 ring-gray-600/20',
        black: 'text-gray-100 bg-gray-900 ring-gray-600/20',
    }
    const setFull = {
        full: ' w-full ',
        fit: ' w-fit '
    }
    const key: keyof typeof setColor = color;
    const isFull: keyof typeof setFull = full;
    return <span className={'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset text-nowrap gap-1 '+setFull[isFull]+setColor[key]}>
        {children}
    </span>
}