'use client'

import CustomerCard from "@/components/customer.card";
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

    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(10)

    const searchRef = useRef<any>(null)

    useEffect(() => {
        const search = searchParams.get('search')
        if(search){
            localAdd(search)
            return
        }
        const load = async () => {
            const response = await useFetch(endpoints.customer.getAll(`page=${page}&page_size=${total}`))
            setCustomers(response?.data)
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
        const rta = await useFetch(endpoints.customer.getBy(search))
        if (!rta) { return; }
        setCustomers(rta)
    }
    const handleNext = async () => {
        const rta = await useFetch(endpoints.customer.getAll(`page=${page + 1}&page_size=${total}`))
        setCustomers(rta?.data)
        setPage(page + 1)
    }
    const handlePrev = async () => {
        const rta = await useFetch(endpoints.customer.getAll(`page=${page - 1}&page_size=${total}`))
        setCustomers(rta?.data)
        setPage(page - 1)
    }
    return <div className="flex gap-3 flex-col">
        <Pagination next={handleNext} prev={handlePrev} page={page} />
        <div className="flex flex-col p-4 w-full rounded-lg gap-5">
            <form onSubmit={handleSearch} className="flex gap-1">
                <SearchInput ref={searchRef} />
                <Button type="submit"></Button>
            </form>
        </div>
        {
            customers?.map((customer: any, id: number) =>
                <CustomerCard customer={customer} finances={customer?.finances[0]} key={id} />
            )
        }
    </div>
}