"use client"

import dynamic from "next/dynamic";

const CustomerLayout = dynamic(() => import('@/layouts/customer.layout'), {
  ssr: false,
});

export default async function Page({params}: {params:Promise<{id:string}>}){
    const {id} = await params
    
    return <CustomerLayout id={id} />
}