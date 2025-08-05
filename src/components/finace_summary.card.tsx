import { Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";
import { NumericFormat } from "react-number-format";
import Chart from "react-apexcharts";
import OptionList from "./OptionList";
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { endpoints } from "@/services/api";
import Loader from "./loader";
import Badge from "./badge";


export default function FinanceSummaryCard({ finance, total }: { finance: any, total: number }) {

    const [chartConfig, setChartConfig] = useState<any>({})
    const [loading, setLoading] = useState<any>(true)

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
                colors: ["#7bf1a8", "#ffa2a2"],
                legend: {
                    show: false,
                },
            },
        })
        if (finance) { setLoading(false) }
    }, [finance])

    return <div className="flex flex-col rounded-xl shadow-[#324183] shadow bg-white h-full text-gray-800 w-full justify-center items-center">
        {!loading ? <div className="flex gap-10 p-5 justify-between items-center">
            {finance?.totalAmount ? <Card className="bg-transparent shadow-none" {...({} as React.ComponentProps<typeof Card>)}>
                <CardHeader {...({} as React.ComponentProps<typeof Card>)} color="transparent" className="p-2 flex flex-col gap-2 justify-center items-center">
                    <span className="hover:underline underline-offset-2" >Summary</span>
                </CardHeader>
                <CardBody {...({} as React.ComponentProps<typeof Card>)} className="mt-4 grid place-items-center">
                    <Chart {...chartConfig} />
                </CardBody>
                <CardFooter {...({} as React.ComponentProps<typeof Card>)} className="flex flex-col gap-3">
                    <Badge color='yellow' full='full'><span className="font-bold">Total Items: {total}</span></Badge>
                    <Badge color='black' full='full'><span className="font-bold">Amount: </span><NumericFormat value={parseInt(finance?.totalAmount) || 0} displayType="text" prefix="$" thousandsGroupStyle="thousand" thousandSeparator="," /></Badge>
                    <Badge color='green' full='full'><span className="font-bold">Paid: </span><NumericFormat value={parseInt(finance?.totalPaid) || 0} displayType="text" prefix="$" thousandsGroupStyle="thousand" thousandSeparator="," /></Badge>
                    <Badge color='red' full='full'><span className="font-bold">Due: </span><NumericFormat value={parseInt(finance?.totalDue) || 0} displayType="text" prefix="$" thousandsGroupStyle="thousand" thousandSeparator="," /></Badge>
                </CardFooter>
            </Card> : <div className="flex w-full items-center justify-center p-2"><span>Nothing to show here</span></div>}
        </div>
            :
            <div className="flex gap-10 p-5 justify-between items-center">
                <Card className="bg-transparent shadow-none" {...({} as React.ComponentProps<typeof Card>)}>
                    <CardHeader {...({} as React.ComponentProps<typeof Card>)} color="transparent" className="p-2 flex flex-col gap-2 justify-center items-center">
                        <span className="hover:underline underline-offset-2" >Summary</span>
                    </CardHeader>
                    <CardBody {...({} as React.ComponentProps<typeof Card>)} className="mt-4 grid place-items-center px-2">
                        <Loader size={280} loading={loading} />
                    </CardBody>
                    <CardFooter {...({} as React.ComponentProps<typeof Card>)} className="flex flex-col gap-3">
                        <Badge color='yellow' full='full'><span className="font-bold">Loading...</span></Badge>
                        <Badge color='black' full='full'><span className="font-bold">Loading...</span></Badge>
                        <Badge color='green' full='full'><span className="font-bold">Loading...</span></Badge>
                        <Badge color='red' full='full'><span className="font-bold">Loading...</span></Badge>
                    </CardFooter>
                </Card>
            </div>}
    </div>
}