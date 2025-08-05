"use client"

import dynamic from "next/dynamic";

const MainLayout = dynamic(() => import('@/layouts/finance.main.layout'), {
  ssr: false,
});

export default function FinancePage() {
  return <MainLayout />
}