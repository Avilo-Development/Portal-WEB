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
  const [percent, setPercent] = useState(0)
  const [unpaid, setUnpaid] = useState(0)

  useEffect(() => {
    const load = async () => {
      // Assuming you have a function to fetch finance data
      const financeData = await useFetch(endpoints.finance.summary('date=' + new Date('2025-01-01').toLocaleDateString('en-CA')));
      setFinance(financeData);
      setPercent((parseInt(financeData?.totalPaid) / parseInt(financeData?.totalAmount)) * 100)
      setUnpaid((parseInt(financeData?.totalDue) / parseInt(financeData?.totalAmount)) * 100)
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
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex gap-5 flex-wrap">
            <DashboardCard path="finance">
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-center font-semibold text-3xl">
                  <ChartBarIcon className="w-8 h-8 text-gray-500" />
                  <span className="text-lg font-semibold">Finance</span>
                </div>
                <div className="flex flex-col items-center gap-2 ">
                  <NumericFormat className="text-6xl font-semibold w-44 cursor-pointer" value={parseInt(finance?.totalAmount) / 1000000} allowLeadingZeros thousandSeparator="," prefix="$" suffix="M" decimalScale={1} />
                  <p className="font-semibold">Revenue this FY</p>
                </div>
                <ProgressBar value={percent} />
                <div className="flex justify-between ">
                  <span><NumericFormat className="max-w-25 cursor-pointer" value={percent} decimalScale={1} allowLeadingZeros suffix="% Paid" /></span>
                  <span><NumericFormat className="max-w-25 cursor-pointer" value={unpaid} decimalScale={1} allowLeadingZeros suffix="% Unpaid" /></span>
                </div>
              </div>
            </DashboardCard>
          </div>
        </main>
      </div>
    </>
  )
}
