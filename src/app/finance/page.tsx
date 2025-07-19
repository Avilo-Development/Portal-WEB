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



export default function Finance() {
    const { token } = useData()
    const [finance, setFinance] = useState<any>([])
    const [groupedMonth, setGroupedMonth] = useState<any>()
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(10)
    //const [header, setHeader] = useState<any>([])

    const searchRef = useRef<any>(null)

    useEffect(() => {
        const load = async () => {
            setFinance(await useFetch(endpoints.finance.getAll(`page=${page}&page_size=${total}`)))
            setGroupedMonth(await useFetch(endpoints.finance.grouped(``)))
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
        const search = searchRef?.current?.value
        if (search === '') {
            setFinance(await useFetch(endpoints.finance.getAll(`page=${page}&page_size=${total}`)))
            return;
        }
        const rta = await useFetch(endpoints.finance.getOne(search))
        if (!rta) { return; }
        setFinance({ data: [rta], page: 1, page_size: 1, total_items: 1, total_pages: 1 })
    }

    const category = [
        { id: 'totalAmount', text: 'Amount' },
        { id: 'totalPaid', text: 'Paid' },
        { id: 'totalDue', text: 'Due' },
    ]

    const [selectedCategory, setSelectedCategory] = useState(category[0])
    return <>
        {/* <Table data={finance} header={header}/> */}
        <div className="w-full gap-5 relative flex flex-col">
            <div className="flex gap-5 lg:flex-row flex-col">
                <div className="sticky">
                    <FinanceSummaryCard />
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
                        <Input type="text" ref={searchRef} className="p-2 w-full text-sm font-mono outline-0 duration-300 border-b-2 border-gray-700 focus:shadow bg-white" placeholder="(Job id, Job number): " />
                        <Button type="submit"></Button>
                    </form>
                </div>
                <div className="overflow-auto flex flex-col gap-5 w-full bg-gray-100">
                    {finance?.data?.map((value: any, id: any) =>
                        <FinanceCard comments={value?.comments} job_id={value.job_id} id={value.id} job_date={value.job_date} job_number={value.job_number} invoice_date={value?.invoice_date} customer_id={value?.customer_id} amount={value?.amount} paid={value?.paid} due={value?.due} responsible={value?.responsible} key={value.id} />
                    )}
                </div>
                <Pagination page={page} prev={handlePrev} next={handleNext} />
            </div>
        </div>
    </>
}