import FinanceSummaryCard from "@/components/finace_summary.card";
import FinanceTable from "@/components/finance.table";
import FinanceCategoryCard from "@/components/finance_category.card";
import Loader from "@/components/loader";
import OptionList from "@/components/OptionList";
import Pagination from "@/components/pagination";
import SearchInput from "@/components/search.input";
import { useData } from "@/hooks/contexts/global.context";
import { useFetch } from "@/hooks/useFetch";
import { endpoints } from "@/services/api";
import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";

export default function FinanceResponsible() {
    const [data, setData] = useState<any>({})
    const [filterData, setFilterData] = useState(data)
    const [page, setPage] = useState(0)
    const [total, setTotal] = useState(0)
    const { account, users } = useData()
    const [responsible, setResponsible] = useState<any>({})
    const [totals, setTotals] = useState<any>({})
    const [values, setValues] = useState<any>({})

    const [loading, setLoading] = useState<any>(true)

    const order = '&order_by=invoice_date&order=ASC'

    const unassgined = { id: null, name: 'Not assigned' }

    const categories = ['Amount', 'Paid', 'Debt']

    useEffect(() => {
        if (!users) return
        handleChange(account)
    }, [users, account])

    const load = async (id: string, props = '') => {
        setLoading(true)
        setPage(0)
        try {
            const rta = await useFetch(endpoints.finance.responsible(id, `${props}`))
            const chunked = chunkArray(rta?.data)
            setTotal(rta?.data.length)
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

    const handleFilter = (e: any) => {
        const value = e.target.value
        if (value === '') {
            setFilterData(data)
            setPage(0)
            return
        }
        setFilterData([data.flat().filter((obj: any) => obj.job_number.includes(value) || obj.address.toLowerCase().includes(value.toLowerCase()) || obj.job_id.includes(value))]);
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

    const years = [
        { id: '2025', text: '2025' },
        { id: '2024', text: '2024' },
        { id: '2023', text: '2023' },
    ]
    const months = [{ id: '--', text: 'ALL' }, ...Array.from({ length: 12 }, (_, i) =>
        ({ id: `${i + 1}`, text: new Date(2023, i, 1).toLocaleString('default', { month: 'long' }) })
    )];

    const [year, setYear] = useState<any>(years[0])
    const [month, setMonth] = useState<any>(months[0])

    const days = [{ id: '--', text: 'ALL' }, ...Array.from({ length: new Date(year.id, month.id, 0).getDate() }, (_, i) => ({
        id: `${i + 1}`,
        text: `${i + 1}`,
    }))];

    const [day, setDay] = useState<any>(days[0])

    const handleDateChange = () => {
        if (month.id === '--' && day.id === '--') {
            load(responsible?.id, `date=${year.id}-01-01&filter=year`)
            return
        }
        if (day.id === '--') {
            setDay(days[0])
            load(responsible?.id, `date=${year.id}-${month.id}-01&filter=month`)
            return
        }

        load(responsible?.id, `date=${year.id}-${month.id}-${day.id}&filter=day`)
    }
    const handleChange = async (e: any) => {
        setResponsible(e)
        load(e.id, `date=2025-01-01&filter=year`)
    }
    return <>
        {!loading ?
            <div className="flex flex-col gap-5 w-full">
                <h1 className="w-full text-center font-bold text-2xl">By Responsible</h1>
                <div className="flex flex-col gap-5">
                    <div className="flex justify-center lg:flex-row flex-col items-center p-3 gap-5 bg-white rounded-lg shadow shadow-yellow-500">
                        <OptionList list={years} selected={year} setSelected={setYear} />
                        <OptionList list={months} selected={month} setSelected={setMonth} />
                        <OptionList list={days} selected={day} setSelected={setDay} />
                        <Button className='p-2 bg-gray-800 hover:bg-gray-600 duration-200 text-white rounded-lg cursor-pointer' onClick={handleDateChange}>Apply</Button>
                    </div>
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <FinanceSummaryCard total={total} finance={values} />
                        <FinanceCategoryCard categories={categories} data={totals} />
                    </div>
                    <Pagination next={handleNext} prev={handlePrev} page={page} total={filterData.length} />
                    <div className="flex lg:justify-between lg:flex-row flex-col gap-10 p-3 bg-white rounded-lg shadow">
                        <SearchInput setFilter={handleFilter} ref={null} placeholder="(Job id, Job #, Address): " />
                        <OptionList list={[unassgined, ...users]} selected={responsible} setSelected={handleChange} />
                    </div>
                    <FinanceTable data={filterData[page]} />
                </div>
            </div>
            :
            <div className="flex flex-col gap-5 w-full">
                <h1 className="w-full text-center font-bold">The content is loading...</h1>
                <div className="flex w-full gap-10 p-3 bg-gray-500 rounded-lg">
                </div>
                <div className="flex flex-col gap-5 justify-center items-center">
                    <Loader size={240} loading />
                </div>
            </div>
        }
    </>
}