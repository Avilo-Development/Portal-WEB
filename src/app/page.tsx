"use client"

import DashboardCard from "@/components/dashboard.card";
import ProgressBar from "@/components/progressbar";
import { useFetch } from "@/hooks/useFetch";
import { endpoints } from "@/services/api";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

export default function Home() {

  const [finance, setFinance] = useState<any>([]);
  const [paid, setPaid] = useState(0)
  const [unpaid, setUnpaid] = useState(0)

  useEffect(() => {
    const load = async () => {
      // Assuming you have a function to fetch finance data
      const financeData = await useFetch(endpoints.finance.summary('date=' + new Date('2025-01-01').toLocaleDateString('en-CA')));
      setFinance(financeData);
      setPaid((parseInt(financeData?.totalPaid)))
      setUnpaid((parseInt(financeData?.totalDue)/1000))
    };
    load();
  }, []);

  return (
    <>
      <div className="min-h-full">

        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 flex gap-5 flex-wrap h-[calc(100vh-148px)]">
            <DashboardCard path="finance">
              <div className="flex flex-col gap-3 h-full">
                <div className="flex gap-3 items-center font-semibold text-3xl self-start text-yellow-500">
                  <ChartBarIcon className="w-8 h-8 " />
                  <span className="text-2xl font-semibold">Finance</span>
                </div>
                <div className="flex flex-col items-center h-full justify-center self-center text-gray-600 w-full">
                  <NumericFormat className="text-[10rem] font-semibold text-center cursor-pointer max-w-full" value={parseInt(finance?.totalAmount) / 1000000} allowLeadingZeros thousandSeparator="," prefix="$" suffix="M" decimalScale={1} />
                  <p className="font-semibold text-3xl">Revenue this <span className="font-bold text-yellow-600 text-4xl">2025</span></p>
                </div>
                <ProgressBar value={((paid/parseInt(finance?.totalAmount))*100)} />
                <div className="flex justify-between text-3xl text-gray-600">
                  <span><NumericFormat type="text" contentEditable={false} thousandsGroupStyle="lakh" className="text-start cursor-pointer w-full" value={paid/1000} decimalScale={1} allowLeadingZeros prefix="$" suffix="K Paid" /></span>
                  <span><NumericFormat type="text" thousandsGroupStyle="thousand" className="text-end cursor-pointer w-full grow" value={unpaid} decimalScale={1} allowLeadingZeros prefix="$" suffix="K Unpaid" /></span>
                </div>
              </div>
            </DashboardCard>
          </div>
        </main>
      </div>
    </>
  )
}
