import { Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";
import Badge from "./badge";
import Link from "next/link";
import Chart from "react-apexcharts";
import { useData } from "@/hooks/contexts/global.context";
import { NumericFormat, PatternFormat } from "react-number-format";
import ErrorDialog from "@/dialogs/error.dialog";

export default function CustomerCard({ customer, finances }: { customer: any, finances: any }) {
    const { HCP_URL } = useData()
    const options = {
        chart: {
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        labels: ["Paid", "Debt"],
        colors: ["#00897b", "#CD2F2F"],
    }
    return <Card {...({} as React.ComponentProps<typeof Card>)} className="shadow-2xl bg-white text-gray-800 w-full grow lg:rounded-lg p-5">
        <CardHeader {...({} as React.ComponentProps<typeof Card>)} color="transparent" className="p-2 flex flex-col gap-2 ">
            <div className="flex gap-3">
                <a className="hover:underline underline-offset-2" href={`/finance/customer/${customer?.id}`}>{customer?.name}</a>
                <Badge color="green">{<Link href={HCP_URL + "customers/" + customer?.id} >Total: {finances?.totalItems || customer?.finances?.length || 0}</Link>}</Badge>
            </div>
            {/* <OptionList selected={responsibleSelected} setSelected={handleReponsibleChange} list={users} /> */}
            <hr className="text-white" />
            <span className="text-sm font-light">{new Date(customer?.createdAt).toDateString()}</span>
            <a href={"mailto:" + customer?.email} className="text-sm font-light hover:underline underline-offset-3">{customer?.email}</a>
            <a href={"tel:+" + customer?.phone} className="text-sm font-light hover:underline underline-offset-3"><PatternFormat format="(###) ###-####" displayType="text" value={customer?.phone} /></a>
        </CardHeader>
        <CardBody {...({} as React.ComponentProps<typeof Card>)} className="grid place-items-center">
            {finances?.totalAmount > 0 ? <Chart options={options} type="pie" width={200} height={200} series={[parseInt(finances?.totalPaid) || 0, parseInt(finances?.totalDue)]} /> : <ErrorDialog />}
        </CardBody>
        <CardFooter {...({} as React.ComponentProps<typeof Card>)} className="flex flex-col p-0 gap-1">
            <div className="flex items-center gap-2">
                <div className="rounded-full w-4 h-4 bg-[#020617]"></div>
                <div className="flex gap-1"><span>Amount:</span> <NumericFormat value={finances?.totalAmount} displayType="text" prefix="$" thousandsGroupStyle="thousand" thousandSeparator="," /></div>
            </div>
            <div className="flex items-center gap-2">
                <div className="rounded-full w-4 h-4 bg-[#00897b]"></div>
                <div className="flex gap-1"><span>Paid:</span> <NumericFormat value={finances?.totalPaid || 0} displayType="text" prefix="$" thousandsGroupStyle="thousand" thousandSeparator="," /></div>
            </div>
            <div className="flex items-center gap-2">
                <div className="rounded-full w-4 h-4 bg-[#CD2F2F]"></div>
                <div className="flex gap-1"><span>Debt:</span> <NumericFormat value={finances?.totalDue} displayType="text" prefix="$" thousandsGroupStyle="thousand" thousandSeparator="," /></div>
            </div>
        </CardFooter>
    </Card>
}