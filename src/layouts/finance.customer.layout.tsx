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
    const [loading, setLoading] = useState<any>(true)

    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(10)

    const searchRef = useRef<any>(null)

    useEffect(() => {
        const search = searchParams.get('search')
        if (search) {
            localAdd(search)
            return
        }
        const load = async () => {
            try {
                const response = await useFetch(endpoints.customer.getAll(`page=${page}&page_size=${total}`))
                setCustomers(response?.data)
            } catch (err) {
                console.error("Error loading customers:", err);
            } finally {
                setLoading(false)
            }
        }
        load()

    }, [token, searchParams])
    const handleSearch = async (e: any) => {
        e.preventDefault()
        const pattern = /https:\/\/pro\.housecallpro\.com\/app\/customers\/(cus_[a-zA-Z0-9_-]+)/g;
        const search = searchRef?.current?.value
        const match = pattern.exec(search)
        if (match) {
            const url = match[1]
            await localAdd(`${url}`)
            return
        }
        if (search === '') {
            const rta = await useFetch(endpoints.customer.getAll(`page=${page}&page_size=${total}`))
            setCustomers(rta?.data)
            return;
        }
        await localAdd(search)

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
    const handleStep = async (value: number) => {
        setLoading(true)
        if (value < 1) {
            value = 1
        }
        try {
            const rta = await useFetch(endpoints.customer.getAll(`page=${value}&page_size=${total}`))
            setCustomers(rta?.data)
            setPage(value)
        } catch (e) {
            console.error("Error loading next page of customers:", e);
        } finally {
            setLoading(false)
        }
    }
    return <div className="flex gap-3 flex-col">
        <Pagination next={() => handleStep(page + 1)} prev={() => handleStep(page - 1)} page={page} />
        <div className="flex flex-col p-4 w-full rounded-lg gap-5">
            <form onSubmit={handleSearch} className="flex gap-1">
                <SearchInput placeholder="(Customer id, name): " ref={searchRef} />
                <Button type="submit"></Button>
            </form>
        </div>
        {
            !loading ? customers?.map((customer: any, id: number) =>
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