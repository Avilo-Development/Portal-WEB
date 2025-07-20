import { Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";
import Badge from "./badge";
import Link from "next/link";
import Chart from "react-apexcharts";
import { useData } from "@/hooks/contexts/global.context";
import { NumericFormat, PatternFormat } from "react-number-format";
import ErrorDialog from "@/dialogs/error.dialog";

export default function CustomerCard({customer}: {customer:any}) {
    const { HCP_URL } = useData()
    const chartConfig = {
        type: "pie",
        width: 200,
        height: 200,
        series: [parseInt(customer?.finances[0]?.totalPaid) || 0, parseInt(customer?.finances[0]?.totalDue)],
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
    };
    return <Card className="shadow-2xl bg-white text-gray-800 w-full grow lg:rounded-lg p-5">
        <CardHeader color="transparent" className="p-2 flex flex-col gap-2 ">
            <div className="flex gap-3">
                <a className="hover:underline underline-offset-2" href={`/finance/customer/${customer?.id}`}>{customer?.name}</a>
                <Badge color="green">{<Link href={HCP_URL + "customers/" + customer?.id} >Total: {customer?.finances[0]?.totalItems || 0}</Link>}</Badge>
            </div>
            {/* <OptionList selected={responsibleSelected} setSelected={handleReponsibleChange} list={users} /> */}
            <hr className="text-white" />
            <span className="text-sm font-light">{new Date(customer?.createdAt).toDateString()}</span>
            <a href={"mailto:"+customer.email} className="text-sm font-light hover:underline underline-offset-3">{customer.email}</a>
            <a href={"tel:+"+customer.phone} className="text-sm font-light hover:underline underline-offset-3"><PatternFormat format="(###) ###-####" displayType="text" value={customer.phone} /></a>
        </CardHeader>
        <CardBody className="grid place-items-center">
            {customer?.finances[0]?.totalAmount > 0 ? <Chart {...chartConfig} /> : <ErrorDialog />}
        </CardBody>
        <CardFooter className="flex flex-col p-0 gap-1">
            <div className="flex items-center gap-2">
                <div className="rounded-full w-4 h-4 bg-[#020617]"></div>
                <div className="flex gap-1"><span>Amount:</span> <NumericFormat value={customer.finances[0]?.totalAmount} displayType="text" prefix="$" thousandsGroupStyle="lakh" thousandSeparator="," /></div>
            </div>
            <div className="flex items-center gap-2">
                <div className="rounded-full w-4 h-4 bg-[#00897b]"></div>
                <div className="flex gap-1"><span>Paid:</span> <NumericFormat value={customer.finances[0]?.totalPaid || 0} displayType="text" prefix="$" thousandsGroupStyle="lakh" thousandSeparator="," /></div>
            </div>
            <div className="flex items-center gap-2">
                <div className="rounded-full w-4 h-4 bg-[#CD2F2F]"></div>
                <div className="flex gap-1"><span>Debt:</span> <NumericFormat value={customer.finances[0]?.totalDue} displayType="text" prefix="$" thousandsGroupStyle="lakh" thousandSeparator="," /></div>
            </div>
        </CardFooter>
    </Card>
}