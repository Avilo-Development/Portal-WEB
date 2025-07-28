"use client"

import FinanceSummaryCard from "@/components/finace_summary.card";
import FinanceTable from "@/components/finance.table";
import FinanceCategoryCard from "@/components/finance_category.card";
import OptionList from "@/components/OptionList";
import Pagination from "@/components/pagination";
import SearchInput from "@/components/search.input";
import { useData } from "@/hooks/contexts/global.context";
import { useFetch } from "@/hooks/useFetch";
import { endpoints } from "@/services/api";
import { Input } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";

export default function FinanceInvoice(){
    const [data, setData] = useState<any>({})
    const [filterData, setFilterData] = useState(data)
    const [page, setPage] = useState(0)
    const {account} = useData()
    const [totals, setTotals] = useState<any>({})
    const [items, setItems] = useState<any>(0)
    const [values, setValues] = useState<any>({})
    const [loading, setLoading] = useState<any>(true)
    
    const categories = ['Amount', 'Paid', 'Debt']
    const load = async (status:number) => {
        setLoading(true)
        setPage(0)
        try {
            const rta = await useFetch(endpoints.finance.invoice(status))
            const chunked = chunkArray(rta?.data)
            setItems(rta?.data?.length)
            setData(chunked)
            setFilterData(chunked)
            setTotals(Object.values(rta['0']))
            setValues(rta['0'])
        } catch (e) {
            console.error("Error loading finance data:", e)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        load(0)
    }, [account])
    
    const handleChange = async (e:any) => {
        setStatus(e)
        load(e.id)
    }
    
    const statusList = [
        {id: 0, text: "Paid"},
        {id: 1, text: "Unpaid"},
        {id: -1, text: "Unsent"},
        {id: 2, text: "Recents"},
        {id: 30, text: "Overdue 30+"},
        {id: 60, text: "Overdue 60+"},
        {id: 90, text: "Overdue 90+"},
    ]
    const [status, setStatus] = useState<any>(statusList[0])

    const handleFilter = (e: any) => {
        const value = e.target.value
        if (value === '') {
            setFilterData(data)
            setPage(0)
            return
        }
        setFilterData([data.flat().filter((obj: any) => obj?.job_number?.includes(value) || obj?.address?.toLowerCase().includes(value.toLowerCase()) || obj?.job_id?.includes(value))]);
        setPage(0)
        //setFilterData(data?.filter((d: any) => d.job_number.includes(value)))
    }
    function chunkArray<T>(array: T[], chunkSize = 20): T[][] {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    }
    const handleNext = () => {
        if (page < data.length - 1) {
            setPage(page + 1);
        }
    }
    const handlePrev = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    }

    return <>
    <div className="flex flex-col gap-5 w-full">
        <h1 className="w-full text-center font-bold text-2xl">By Invoice status</h1>
        <div className="flex lg:justify-between lg:flex-row flex-col gap-10 p-3 bg-white rounded-lg">
            <SearchInput placeholder="(Job id, Job number, Address)" ref={null} setFilter={handleFilter} />
            <OptionList list={statusList} selected={status} setSelected={handleChange} />
        </div>
        <div className="flex flex-col gap-5">
            <div className="flex gap-5">
                <FinanceSummaryCard total={items} finance={values} />
                <div className="flex flex-col rounded-xl bg-white  text-gray-800 shadow w-full p-4 gap-4">
                    <FinanceCategoryCard categories={categories} data={totals} />
                </div>
            </div>
            <Pagination next={handleNext} prev={handlePrev} page={page} total={filterData.length} />
            <FinanceTable data={filterData[page]} />
        </div>
    </div>
    </>
}