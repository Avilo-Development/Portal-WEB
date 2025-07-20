import { Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";
import { NumericFormat } from "react-number-format";
import Chart from "react-apexcharts";
import OptionList from "./OptionList";
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { endpoints } from "@/services/api";


export default function FinanceSummaryCard({finance}:{finance:any}) {

    const [chartConfig, setChartConfig] = useState<any>({})

    useEffect(() => {
        setChartConfig({
            type: "pie",
            width: 280,
            height: 280,
            series: [parseInt(finance?.totalPaid), parseInt(finance?.totalDue)],
            options: {
                chart: {
                    toolbar: {
                        show: false,
                    },
                },
                title: {
                    show: "",
                },
                dataLabels: {
                    enabled: false,
                },
                labels: ["Paid", "Debt"],
                colors: ["#00897b", "#CD2F2F"],
                legend: {
                    show: false,
                },
            },
        })
    }, [finance])

    return <div className="flex flex-col rounded-xl bg-white  text-gray-800 shadow w-fit">
        <div className="flex gap-10 p-5 justify-between items-center">
            {finance?.totalAmount ? <Card className="bg-transparent shadow-none">
                <CardHeader color="transparent" className="p-2 flex flex-col gap-2 justify-center items-center">
                    <span className="hover:underline underline-offset-2" >Summary</span>
                </CardHeader>
                <CardBody className="mt-4 grid place-items-center px-2">
                    <Chart {...chartConfig} />
                </CardBody>
                <CardFooter className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <div className="rounded-full w-4 h-4 bg-[#020617]"></div>
                        <div className="flex gap-1"><span>Amount:</span> <NumericFormat value={parseInt(finance?.totalAmount)} displayType="text" prefix="$" thousandsGroupStyle="thousand" thousandSeparator="," /></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="rounded-full w-4 h-4 bg-[#00897b]"></div>
                        <div className="flex gap-1"><span>Paid:</span> <NumericFormat value={parseInt(finance?.totalPaid) || 0} displayType="text" prefix="$" thousandsGroupStyle="thousand" thousandSeparator="," /></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="rounded-full w-4 h-4 bg-[#CD2F2F]"></div>
                        <div className="flex gap-1"><span>Debt:</span> <NumericFormat value={parseInt(finance?.totalDue)} displayType="text" prefix="$" thousandsGroupStyle="thousand" thousandSeparator="," /></div>
                    </div>
                </CardFooter>
            </Card> : <div className="flex w-full items-center justify-center p-2"><span>Nothing to show here</span></div>}
        </div>
    </div>
}