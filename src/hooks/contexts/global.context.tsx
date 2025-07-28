'use client'

import ITechnician from "@/interfaces/technician.interface";
import IUser from "@/interfaces/user.interface";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import ITimeReporting from "@/interfaces/time_reporting.interface";
import ISalary from "@/interfaces/salary.interface";
import { endpoints } from "@/services/api";
import { useRouter } from "next/navigation";
import { useFetch } from "../useFetch";

const GlobalContext = createContext<any>({})

export default function GlobalProvider({ children }: { children: ReactNode }) {
    const data = useProviderData()
    const router = useRouter()
    const [token, setToken] = useState<any>()
    useEffect(() => {
        const t = sessionStorage.getItem('token') || null
        if (!t) {
            router.push('/login')
            return
        }
        try {
            const payload = JSON.parse(atob(t.split('.')[1])); // Decode JWT payload
            const expiry = payload.exp * 1000; // Convert to milliseconds
            if (Date.now() > expiry) {
                sessionStorage.removeItem('token')
                router.push('/login')
                return;
            }
            setToken(t)
        } catch (error) {
            sessionStorage.removeItem('token')
            console.error('Invalid token:', error);
            router.push('/login')
            return; // Treat malformed token as expired
        }
    }, [])
    return (
        <GlobalContext value={{ ...data, token, setToken }}>
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

    const HCP_URL = process.env.NEXT_PUBLIC_HCP;

    const loadData = async () => {
        const bearer = sessionStorage.getItem('token') || null
        if (!bearer) { return }
        setAccount(await useFetch(endpoints.user.account))
        setUsers(await useFetch(endpoints.user.create))
    }

    useEffect(() => {
        loadData()
    }, [])

    return { users, setUsers, technician, setTechnician, salary, setSalary, timeReport, setTimeReport, account, HCP_URL, setAccount }
}