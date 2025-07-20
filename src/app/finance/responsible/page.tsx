"use client"

import FinanceSummaryCard from "@/components/finace_summary.card";
import FinanceTable from "@/components/finance.table";
import FinanceCategoryCard from "@/components/finance_category.card";
import OptionList from "@/components/OptionList";
import { useData } from "@/hooks/contexts/global.context";
import { useFetch } from "@/hooks/useFetch";
import { endpoints } from "@/services/api";
import { Input } from "@headlessui/react";
import { useEffect, useState } from "react";

export default function FinanceResponsible(){
    const [data, setData] = useState<any>({})
    const [filterData, setFilterData] = useState(data)
    const [filter, setFilter] = useState('')
    const {account, users} = useData()
    const [responsible, setResponsible] = useState<any>({})
    const [totals, setTotals] = useState<any>({})
    const [values, setValues] = useState<any>({})
    
    const categories = ['Amount', 'Paid', 'Debt']
    const load = async (id:string) => {
        const rta = await useFetch(endpoints.finance.responsible(id))
        setData(rta?.data)
        setFilterData(rta.data)
        setTotals(Object.values(rta['0']))
        setValues(rta['0'])
    }
    useEffect(() => {
        setResponsible(account)
        load(account?.id)
    }, [account])

    const handleFilter = (e:any) => {
        const value = e.target.value
        setFilter(value)
        setFilterData(data?.filter((d:any) => d.job_number.includes(value)))
    }

    const handleChange = async (e:any) => {
        setResponsible(e)
        load(e.id)
    }

    return <>
    <div className="flex flex-col gap-5 w-full">
        <h1 className="w-full text-center font-bold text-2xl">By Responsible</h1>
        <div className="flex lg:justify-between lg:flex-row flex-col gap-10 p-3 bg-white rounded-lg">
            <Input value={filter} onChange={handleFilter} type="text" className="p-2 w-full text-sm font-mono outline-0 duration-300 border-b-2 border-gray-700 focus:shadow bg-white" placeholder="(Job id, Job number): " />
            <OptionList list={users} selected={responsible} setSelected={handleChange} />
        </div>
        <div className="flex flex-col gap-5">
            <div className="flex gap-5">
                <FinanceSummaryCard finance={values} />
                <div className="flex flex-col rounded-xl bg-white  text-gray-800 shadow w-full p-4 gap-4">
                    <FinanceCategoryCard categories={categories} data={totals} />
                </div>
            </div>
            <FinanceTable data={filterData} />
        </div>
    </div>
    </>
}