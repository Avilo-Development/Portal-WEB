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
                <div className="w-full border-0 p-0 mt-[64px] ">
                    {children}
                </div>
            </ReactFlowProvider>
        </GlobalProvider>
    </>
}