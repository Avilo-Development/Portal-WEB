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
        colors: ["#7bf1a8", "#ffa2a2"],
    }
    const color = (overdue: number) => {
        if (overdue < 0) return 'gray'
        if (overdue === 0) return 'green'
        if (overdue <= 30) return 'yellow'
        if (overdue <= 60) return 'orange'
        if (overdue <= 90) return 'red'
        if (overdue > 90) return 'black'
    }
    return <Card {...({} as React.ComponentProps<typeof Card>)} className="shadow-[#324183] shadow bg-white text-gray-800 w-full grow lg:rounded-lg p-5">
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
            <span className="text-sm font-light"></span>
            <Badge color={color(finances?.averageOverdue)}>Average Overdue: {parseInt(finances?.averageOverdue)} days</Badge>
        </CardHeader>
        <CardBody {...({} as React.ComponentProps<typeof Card>)} className="grid place-items-center">
            {finances?.totalAmount > 0 ? <Chart options={options} type="pie" width={200} height={200} series={[parseInt(finances?.totalPaid) || 0, parseInt(finances?.totalDue)]} /> : <ErrorDialog />}
        </CardBody>
        <CardFooter {...({} as React.ComponentProps<typeof Card>)} className="flex flex-col p-0 gap-1">
            <Badge color='black' full='full'><span className="font-bold">Amount: </span><NumericFormat value={parseInt(finances?.totalAmount) || 0} displayType="text" prefix="$" thousandsGroupStyle="thousand" thousandSeparator="," /></Badge>
            <Badge color='green' full='full'><span className="font-bold">Paid: </span><NumericFormat value={parseInt(finances?.totalPaid) || 0} displayType="text" prefix="$" thousandsGroupStyle="thousand" thousandSeparator="," /></Badge>
            <Badge color='red' full='full'><span className="font-bold">Due: </span><NumericFormat value={parseInt(finances?.totalDue) || 0} displayType="text" prefix="$" thousandsGroupStyle="thousand" thousandSeparator="," /></Badge>
        </CardFooter>
    </Card>
}