"use client"

import dynamic from "next/dynamic";

const CalendarComponent = dynamic(() => import('@/components/calendar'), {
  ssr: false,
});


export default function FinanceCalendar() {
    return <CalendarComponent />
}