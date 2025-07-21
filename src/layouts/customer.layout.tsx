'use client'

import CustomerCard from "@/components/customer.card"
import FinanceCard from "@/components/finance.card"
import { useFetch } from "@/hooks/useFetch"
import { endpoints } from "@/services/api"
import { useEffect, useState } from "react"

export default function CustomerLayout({ id }: { id: string }) {
    const [customer, setCustomer] = useState<any>([])
    const [finance, setFinance] = useState<any>([])

    useEffect(() => {
        const load = async () => {
            setCustomer(await useFetch(endpoints.customer.getOne(id)))
            const rta = await useFetch(endpoints.customer.summary(id))
            setFinance(rta?.finances[0])
        }
        load()
    }, [id])
    return <div className="flex flex-col gap-5 lg:w-[90%]">
        <CustomerCard customer={customer} finances={finance} />
        <div className="flex flex-col gap-5">
            {
                customer?.finances ?
                    customer?.finances?.map((finance: any, id: number) => <FinanceCard project={finance} key={id} />)
                    :
                    <div className="flex justify-center">
                        <span>No projects for this customer, come back later.</span>
                    </div>
            }
        </div>
    </div>
}