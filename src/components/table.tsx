'use client'

import ITimeReporting from "@/interfaces/time_reporting.interface"
import React, { useEffect, useState } from "react"
import { NumericFormat } from "react-number-format"

export default function Table({header, data}: { header:[],data:[]}) {
    // function handleChange(e: any, data:any, id: number, type:any="") {
    //     let value = null
    //     if(type instanceof Date){value = new Date(e.target.value)}
    //     else if(type instanceof Boolean){value = e.target.checked}
    //     else{value = e.target.value}
        
    //     setData((prevContent:any) =>
    //         prevContent.map((row:any, rowIndex:any):any => (rowIndex == id ? (row.map((item: any) => item === data ? value : item)) : row))
    //     )

    //     setSum(parseInt(data.time)*data.salary)
    // }

    useEffect(() => {
        console.log("header", header)
        console.log("data", data)
    }, [header,data])

    const CustomInput = React.forwardRef<any>((props, ref) => (
        <input ref={ref} {...props} style={{ padding: '8px', fontSize: '16px' }} />
    ));

    return <div className="relative overflow-x-auto shadow-md sm:rounded-lg overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {
                        header?.map((value:any, id:any): any => (
                            <th key={id} scope="col" className="px-6 py-3">
                                {value}
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data?.length > 0 && data?.map((item: any, itemId:any) => (
                        <tr key={itemId} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                            {
                                header?.map((value: any, valueId:any): any => (
                                    <td key={valueId} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item[value] instanceof Date && <input className="w-" type='date' value={item[value].toISOString().substring(0, 10)} />}
                                        {typeof item[value] === 'string' && <input className="w-" type='text' value={item[value]}  />}
                                        {typeof item[value] === 'boolean' && <input className="w-" type='checkbox' checked={item[value]}/>}
                                        {typeof item[value] === 'number' && <NumericFormat value={item[value]} displayType="input" customInput={CustomInput} prefix="$" thousandsGroupStyle="lakh" thousandSeparator="," />}
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
}