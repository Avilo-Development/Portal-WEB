"use client"

import dynamic from "next/dynamic";

const MainLayout = dynamic(() => import('@/layouts/finance.responsible.layout'), {
  ssr: false,
});

export default function Page() {
  return <MainLayout />
}