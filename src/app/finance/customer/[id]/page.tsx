import CustomerCard from "@/components/customer.card"
import { useFetch } from "@/hooks/useFetch"
import CustomerLayout from "@/layouts/customer.layout"
import { endpoints } from "@/services/api"

export default async function Page({params}: {params:Promise<{id:string}>}){
    const {id} = await params
    
    return <CustomerLayout id={id} />
}