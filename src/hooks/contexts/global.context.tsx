'use client'

import ITechnician from "@/interfaces/technician.interface";
import IUser from "@/interfaces/user.interface";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import ITimeReporting from "@/interfaces/time_reporting.interface";
import ISalary from "@/interfaces/salary.interface";
import { endpoints } from "@/services/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useFetch } from "../useFetch";

interface IContext {
    users: any, setUsers: any, technician: ITechnician[], setTechnician: any, salary: any, setSalary: any, timeReport: any, setTimeReport: any, finance: any, account: any, token: any
}

const GlobalContext = createContext<IContext>({})

export default function GlobalProvider({ children }: { children: ReactNode }) {
    const data = useProviderData()
    const router = useRouter()
    const [token, setToken] = useState<any>()
    useEffect(() => {
        const t = sessionStorage.getItem('token') || null
        setToken(t)
        if (!t) {
            router.push('/login')
            return
        }
    }, [])
    return (
        <GlobalContext value={{ ...data, token }}>
            {children}
        </GlobalContext>
    )
}

export function useData() {
    return useContext(GlobalContext)
}

function useProviderData() {
    const [account, setAccount] = useState({})
    const [users, setUsers] = useState<IUser[]>([])
    const [technician, setTechnician] = useState<ITechnician[]>([])
    const [salary, setSalary] = useState<ISalary[]>([])
    const [timeReport, setTimeReport] = useState<ITimeReporting[]>([])

    const loadData = async () => {
        const bearer = sessionStorage.getItem('token') || null
        if (!bearer) { return }
        setAccount(await useFetch(endpoints.user.account))
        setUsers(await useFetch(endpoints.user.create))
    }

    useEffect(() => {
        loadData()
    }, [])

    return { users, setUsers, technician, setTechnician, salary, setSalary, timeReport, setTimeReport, account }
}