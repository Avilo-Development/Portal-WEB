"use client"

import dynamic from "next/dynamic";

const MainLayout = dynamic(() => import('@/layouts/finance.customer.layout'), {
  ssr: false,
});

export default function Page() {
  return <MainLayout />
}