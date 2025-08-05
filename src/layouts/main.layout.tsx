'use client'

import { ReactFlowProvider } from "@xyflow/react";
import GlobalProvider from "@/hooks/contexts/global.context";
import dynamic from "next/dynamic";

const Header = dynamic(() => import('@/components/header'), {
  ssr: false,
});

export default function MainLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {

    return <>
        <GlobalProvider>
            <ReactFlowProvider>
                <Header />
                <div className="w-full border-0 p-0 mt-[64px] bg-gradient-to-br from-[#fdfdff] via-[#f6f8ff] to-[#e6ecff] min-h-dvh">
                    {children}
                </div>
            </ReactFlowProvider>
        </GlobalProvider>
    </>
}