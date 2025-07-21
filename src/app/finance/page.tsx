'use client'

import FinanceCard from "@/components/finance.card";
import Pagination from "@/components/pagination";
import { useData } from "@/hooks/contexts/global.context";
import { useEffect, useRef, useState } from "react";
import { endpoints } from "@/services/api";
import { Button, Input } from "@headlessui/react";
import FinanceSummaryCard from "@/components/finace_summary.card";
import FinanceCategoryCard from "@/components/finance_category.card";
import OptionList from "@/components/OptionList";
import { useFetch } from "@/hooks/useFetch";
import SearchInput from "@/components/search.input";



export default function Finance() {
    const { token } = useData()
    const [finance, setFinance] = useState<any>([])
    const [groupedMonth, setGroupedMonth] = useState<any>()
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(10)
    const [summary, setSummary] = useState<any>()
    //const [header, setHeader] = useState<any>([])

    const searchRef = useRef<any>(null)

    useEffect(() => {
        const load = async () => {
            setFinance(await useFetch(endpoints.finance.getAll(`page=${page}&page_size=${total}`)))
            await handleYear(years[0])
        }
        load()
    }, [token])

    const handleNext = async () => {
        setFinance(await useFetch(endpoints.finance.getAll(`page=${page + 1}&page_size=${total}`)))
        setPage(page + 1)
    }
    const handlePrev = async () => {
        setFinance(await useFetch(endpoints.finance.getAll(`page=${page - 1}&page_size=${total}`)))
        setPage(page - 1)
    }

    const handleSearch = async (e: any) => {
        e.preventDefault()
        const pattern = /https:\/\/pro\.housecallpro\.com\/app\/jobs\/(job_[a-zA-Z0-9_-]+)/g;
        const search = searchRef?.current?.value
        const match = pattern.exec(search)
        if(match){
            const url = match[1]
            localAdd(`${url}`)
            return
        }
        if (search === '') {
            setFinance(await useFetch(endpoints.finance.getAll(`page=${page}&page_size=${total}`)))
            return;
        }
        localAdd(search)
        
    }
    const localAdd = async (search:string) => {
        const rta = await useFetch(endpoints.finance.getOne(search))
        if (!rta) { return; }
        setFinance({ data: [rta], page: 1, page_size: 1, total_items: 1, total_pages: 1 })
    }

    const category = [
        { id: 'totalAmount', text: 'Amount' },
        { id: 'totalPaid', text: 'Paid' },
        { id: 'totalDue', text: 'Due' },
    ]
    const years = [
        { id: '2025-01-01', text: '2025' },
        { id: '2024-01-01', text: '2024' },
    ]
    const [selectedYear, setSelectedYear] = useState(years[0])

    const handleYear = async (e:any) => {
        setSelectedYear(e)
        setGroupedMonth(await useFetch(endpoints.finance.grouped(`date=${e.id}`)))
        setSummary(await useFetch(endpoints.finance.summary('date=' + new Date(e.id).toLocaleDateString('en-CA'))))
    }

    const [selectedCategory, setSelectedCategory] = useState(category[0])
    return <>
        {/* <Table data={finance} header={header}/> */}
        <div className="w-full gap-5 relative flex flex-col">
            <h1 className="w-full text-center font-bold text-2xl">Dashboard</h1>
            <div className="flex gap-5 lg:flex-row flex-col">
                <div className="sticky">
                    <OptionList list={years} selected={selectedYear} setSelected={handleYear} />
                    <FinanceSummaryCard finance={summary} />
                </div>
                <div className="flex flex-col rounded-xl bg-white  text-gray-800 shadow w-full p-4 gap-4">
                    <OptionList selected={selectedCategory} setSelected={setSelectedCategory} list={category} />
                    <FinanceCategoryCard categories={groupedMonth?.map((grouped: any) => grouped.month)} data={groupedMonth?.map((grouped: any) => grouped[selectedCategory.id])} />
                </div>
            </div>
            <div className="flex flex-wrap gap-5 p-4 shadow-2xl rounded-lg bg-white">
                    <Pagination page={page} prev={handlePrev} next={handleNext} />
                <div className="flex flex-col p-4 w-full rounded-lg gap-5">
                    <form onSubmit={handleSearch}>
                        <SearchInput ref={searchRef} />
                        <Button type="submit"></Button>
                    </form>
                </div>
                <div className="overflow-auto flex flex-col gap-5 w-full bg-gray-100 lg:p-3 lg:rounded-lg">
                    {finance?.data?.map((value: any, id: any) =>
                        <FinanceCard project={value} />
                    )}
                </div>
                <Pagination page={page} prev={handlePrev} next={handleNext} />
            </div>
        </div>
    </>
}