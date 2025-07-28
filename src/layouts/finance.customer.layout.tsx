import CustomerCard from "@/components/customer.card";
import Loader from "@/components/loader";
import Pagination from "@/components/pagination";
import SearchInput from "@/components/search.input";
import { useData } from "@/hooks/contexts/global.context";
import { useFetch } from "@/hooks/useFetch";
import { endpoints } from "@/services/api";
import { Button, Input } from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function FinanceCustomerLayout() {
    const searchParams = useSearchParams();
    const { token } = useData()
    const [customers, setCustomers] = useState<any>([])
    const [filterCustomer, setFilterCustomer] = useState(customers)
    const [loading, setLoading] = useState<any>(true)

    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(10)

    const load = async () => {
        setLoading(true)
        setPage(0)
        try {
            const rta = await useFetch(endpoints.customer.getAll(`page=${page}&page_size=${total}`))
            const chunked = chunkArray(rta)
            setCustomers(chunked)
            setFilterCustomer(chunked)
        } catch (e) {
            console.error("Error loading finance data:", e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        load()

    }, [token, searchParams])
    const handleFilter = (e: any) => {
        const value = e.target.value
        if (value === '') {
            setFilterCustomer(customers)
            setPage(0)
            return
        }
        setFilterCustomer([customers.flat().filter((obj: any) => obj?.id?.includes(value) || obj?.name?.toLowerCase().includes(value.toLowerCase()) || obj?.email?.includes(value))]);
        setPage(0)
        //setFilterData(data?.filter((d: any) => d.job_number.includes(value)))
    }
    function chunkArray<T>(array: T[]): T[][] {
        const result = [];
        for (let i = 0; i < array.length; i += total) {
            result.push(array.slice(i, i + total));
        }
        return result;
    }
    const handleNext = () => {
        if (page < customers.length - 1) {
            setPage(page + 1);
        }
    }
    const handlePrev = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    }
    const localAdd = async (search: string) => {
        setLoading(true)
        try {
            const rta = await useFetch(endpoints.customer.getBy(search))
            if (!rta) { return; }
            setCustomers(rta)
        } catch (err) {
            console.error("Error searching customers:", err);
        } finally {
            setLoading(false)
        }
    }
    return <div className="flex gap-3 flex-col w-full">
        <Pagination next={handleNext} total={customers.length} prev={handlePrev} page={page} />
        <SearchInput placeholder="(Customer id, name): " ref={null} setFilter={handleFilter} />
        {
            !loading ? filterCustomer[page]?.map((customer: any, id: number) =>
                <CustomerCard customer={customer} finances={customer?.finances} key={id} />
            )
                :
                <div className="flex flex-col items-center justify-center gap-2 p-5">
                    <Loader loading size={20} />
                    <span>Loading customers...</span>
                </div>
        }
    </div>
}