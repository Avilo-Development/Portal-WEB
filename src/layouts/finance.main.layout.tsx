'use client'

import FinanceCard from "@/components/finance.card";
import Pagination from "@/components/pagination";
import { useData } from "@/hooks/contexts/global.context";
import { useEffect, useRef, useState } from "react";
import { endpoints } from "@/services/api";
import FinanceSummaryCard from "@/components/finace_summary.card";
import FinanceCategoryCard from "@/components/finance_category.card";
import OptionList from "@/components/OptionList";
import { useFetch } from "@/hooks/useFetch";
import SearchInput from "@/components/search.input";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";

export default function FinanceMainLayout() {
    const { token } = useData()
    const [finance, setFinance] = useState<any>([])
    const [filterData, setFilterData] = useState(finance)
    const [groupedMonth, setGroupedMonth] = useState<any>()
    const [page, setPage] = useState(0)

    const [loading, setLoading] = useState<any>(true)
    const [summary, setSummary] = useState<any>()
    //const [header, setHeader] = useState<any>([])

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

    const load = async (year='2025-01-01') => {
        setLoading(true)
        setPage(0)
        try {
            const rta = await useFetch(endpoints.finance.getAll())
            const chunked = chunkArray(rta)
            setFinance(chunked)
            setFilterData(chunked)
        } catch (e) {
            console.error("Error loading finance data:", e)
        } finally {
            setLoading(false)
        }
        setGroupedMonth(await useFetch(endpoints.finance.grouped(`date=${year}`)))
        setSummary(await useFetch(endpoints.finance.summary('date=' + new Date(year).toLocaleDateString('en-CA'))))
    }

    const router = useRouter()

    useEffect(() => {
        const t = sessionStorage.getItem('token') || null
        if(!t) {return router.push('/login')}
        load()
    }, [token])


    const handleFilter = (e: any) => {
        const value = e.target.value
        if (value === '') {
            setFilterData(finance)
            setPage(0)
            return
        }
        setFilterData([finance.flat().filter((obj: any) => obj?.job_number?.includes(value) || obj?.address?.toLowerCase().includes(value.toLowerCase()) || obj?.job_id?.includes(value))]);
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
        if (page < finance.length - 1) {
            setPage(page + 1);
        }
    }
    const handlePrev = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    }

    const handleYear = async (e: any) => {
        setSelectedYear(e)
        load(e.id)
    }

    const [selectedCategory, setSelectedCategory] = useState(category[0])
    return <>
        {/* <Table data={finance} header={header}/> */}
        <div className="w-full gap-5 relative flex flex-col">
            <h1 className="w-full text-center font-bold text-2xl">Dashboard</h1>
            <div className="flex gap-5 lg:flex-row flex-col">
                <div className="sticky flex flex-col gap-3">
                    <OptionList list={years} selected={selectedYear} setSelected={handleYear} />
                    <FinanceSummaryCard finance={summary} total={filterData?.length} />
                </div>
                <div className="sticky flex flex-col gap-3 w-full">
                    <OptionList selected={selectedCategory} setSelected={setSelectedCategory} list={category} />
                    <FinanceCategoryCard categories={groupedMonth?.map((grouped: any) => grouped.month)} data={groupedMonth?.map((grouped: any) => grouped[selectedCategory.id])} />
                </div>
            </div>
            <div className="flex flex-wrap gap-5 p-4 shadow-2xl rounded-lg bg-white">
                <Pagination page={page} prev={handlePrev} total={finance?.length} next={handleNext} />
                <div className="flex flex-col p-4 w-full rounded-lg gap-5">
                    <SearchInput ref={null} setFilter={handleFilter} placeholder="(Job url, Address): " />
                </div>
                <div className="overflow-auto flex flex-col gap-5 w-full lg:p-3 lg:rounded-lg">
                    {!loading ? filterData[page]?.map((value: any, id: any) =>
                        <FinanceCard key={value?.id} project={value}></FinanceCard>
                    ):
                    <Loader loading size={20} />
                    }
                </div>
                <Pagination total={finance?.length} page={page} prev={handlePrev} next={handleNext} />
            </div>
        </div>
    </>
}