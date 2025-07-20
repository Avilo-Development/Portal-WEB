'use client'

import CustomerCard from "@/components/customer.card";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
import { useData } from "@/hooks/contexts/global.context";
import { useFetch } from "@/hooks/useFetch";
import { endpoints } from "@/services/api";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CustomerFilter(){
    const {token} = useData()
    const [customers, setCustomers] = useState<any>([])

    useEffect(() => {
        const load = async () => {
            const response = await useFetch(endpoints.customer.getAll)
            setCustomers(response?.splice(0,100))
        }
        load()

    }, [token])

    return <div className="flex gap-3 flex-col">
        {
            customers?.map((customer:any, id:number) =>
                <CustomerCard customer={customer} key={id} />
            )
        }
    </div>
}