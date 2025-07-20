"use client"

import FinanceTable from "@/components/finance.table";
import { useState } from "react";

export default function PastDue(){
    const [data, setData] = useState([])

    return <>
        <FinanceTable data={data} />
    </>
}