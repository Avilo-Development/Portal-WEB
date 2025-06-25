'use client'

import ITechnician from "@/interfaces/technician.interface";
import IUser from "@/interfaces/user.interface";
import { createContext, ReactNode, useContext, useState } from "react";
import ITimeReporting from "@/interfaces/time_reporting.interface";
import ISalary from "@/interfaces/salary.interface";

interface IContext{
    user:any, setUser:any, technician:ITechnician[], setTechnician:any, salary:any, setSalary:any, timeReport:any, setTimeReport:any
}

const GlobalContext = createContext<IContext>({})

export default function GlobalProvider({children}:{children:ReactNode}){
    const data = useProviderData()
    return (
        <GlobalContext value={data}>
            {children}
        </GlobalContext>
    )
}

export function useData(){
    return useContext(GlobalContext)
}

function useProviderData(){
    const [user, setUser] = useState<IUser[]>([{
        id: "01",
        name: "Dmytriy",
        role: "director",
        hcp_link: "string",
        picture: "string",
        phone: "string",
        birthday: new Date(),
        created_at: new Date(),
        email: "string",
        password: "string"
    },{
        id: "02",
        name: "Artem",
        role: "tech",
        hcp_link: "string",
        picture: "string",
        phone: "string",
        birthday: new Date(),
        created_at: new Date(),
        email: "string",
        password: "string"
    },{
        id: "03",
        name: "Oleg",
        role: "tech",
        hcp_link: "string",
        picture: "string",
        phone: "string",
        birthday: new Date(),
        created_at: new Date(),
        email: "string",
        password: "string"
    },])
    const [technician, setTechnician] = useState<ITechnician[]>([{
        id: "01",
        user_id: user.find((obj:any) => obj.id == '01'),
        salary: 60
    },{
        id: "02",
        user_id: user.find((obj:any) => obj.id == '02'),
        salary: 55
    },{
        id: "03",
        user_id: user.find((obj:any) => obj.id == '03'),
        salary: 33
    },])
    const [salary, setSalary] = useState<ISalary[]>([])
    const [timeReport, setTimeReport] = useState<ITimeReporting[]>([])

    return {user, setUser, technician, setTechnician, salary, setSalary, timeReport, setTimeReport}
}