'use client'

import Pagination from "@/components/pagination";
import Table from "@/components/table";
import { useData } from "@/hooks/contexts/global.context";
import { endpoints } from "@/services/api";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CustomerFilter(){
    const {token} = useData()
    const [finance, setFinance] = useState<any>([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(10)
    const [header, setHeader] = useState<any>([])

    useEffect(() => {
        const load = async () => {
            const response = (await axios.get(endpoints.finance.getAll(`page=${page}&page_size=${total}`), { headers: { 'Authorization': 'Brearer '+token } })).data
            setFinance(response)
            setHeader(Object.keys(response?.data[0]))
        }
        load()

    }, [token])

    const handleNext = async () => {
        setFinance((await axios.get(endpoints.finance.getAll(`page=${page+1}&page_size=${total}`), { headers: { 'Authorization': 'Brearer '+token } })).data)
        setPage(page+1)
    }
    const handlePrev = async () => {
        setFinance((await axios.get(endpoints.finance.getAll(`page=${page-1}&page_size=${total}`), { headers: { 'Authorization': 'Brearer '+token } })).data)
        setPage(page-1)
    }
    return <>
        <Pagination page={page} next={handleNext} prev={handlePrev} />
        <Table data={finance?.data} header={header}/>
    </>
}