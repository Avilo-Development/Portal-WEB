'use client'

import HeaderComponent from "../components/header";
import GlobalProvider from "@/hooks/contexts/global.context";

export default function MainLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {

    return <>
        <GlobalProvider>
            <HeaderComponent />
            {children}
        </GlobalProvider>
    </>
}