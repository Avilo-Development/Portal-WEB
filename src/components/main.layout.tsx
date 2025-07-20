'use client'

import HeaderComponent from "../components/header";
import GlobalProvider from "@/hooks/contexts/global.context";

export default function MainLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {

    return <>
        <GlobalProvider>
            <HeaderComponent />
            <div className="w-full border-0 p-0 mt-[64px]">
                {children}
            </div>
        </GlobalProvider>
    </>
}