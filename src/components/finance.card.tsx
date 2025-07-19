import { endpoints } from "@/services/api";
import { Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { NumericFormat } from "react-number-format";
import OptionList from "./OptionList";
import { useData } from "@/hooks/contexts/global.context";
import Badge from "./badge";
import Link from "next/link";
import { useFetch, usePatch, usePost } from "@/hooks/useFetch";
import CommentCard from "./comment.card";
import { Button, Input, Textarea } from "@headlessui/react";
export default function FinanceCard({ id, customer_id, paid, due, amount, responsible, job_date, invoice_date, job_number, job_id, comments: com }: { id: string, customer_id: string, paid: number, due: number, amount: number, responsible: string, job_date: string, invoice_date: string, job_number: string, job_id: string, comments: any }) {

    const [customer, setCustomer] = useState<any>({})
    const [responsibleSelected, setResponsibleSelected] = useState<any>(responsible)
    const commentRef = useRef<any>(null)
    const { users } = useData()

    const [comments, setComments] = useState(com)

    const { token, account } = useData()

    const chartConfig = {
        type: "pie",
        width: 200,
        height: 200,
        series: [paid || 0, due],
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

    useEffect(() => {
        const loadCustomer = async () => {
            const response = await useFetch(endpoints.hcp.customer(customer_id))
            setCustomer(response)
        }
        loadCustomer()
    }, [token])

    const handleReponsibleChange = async (e: any) => {
        const body = { responsible_id: e.id }
        await usePatch(endpoints.finance.update(`${id}`), body)
        setResponsibleSelected(e)
    }

    const addComment = async (e: any) => {
        e.preventDefault()
        const body = {
            text: commentRef.current?.value,
            status: status.name,
            finance_id: id
        }
        const rta = await usePost(endpoints.comment.create, body)
        setComments([...comments, { ...rta, user: { name: 'You' } }])
        commentRef.current.value = ''
    }

    const statusList = [
        { id: 1, name: 'Unassigned' },
        { id: 2, name: 'Follow-up' },
        { id: 3, name: 'In review' },
        { id: 4, name: 'Paid' },
    ]
    const [status, setStatus] = useState(statusList[1])


    return <div className="flex flex-col shadow-2xl bg-white text-gray-800 w-full grow">
        <div className="flex gap-10 p-5 justify-center items-center ">
            {amount ? <div className="flex w-full gap-3 lg:flex-row flex-col">
                <Card className="bg-transparent shadow-none">
                    <CardHeader color="transparent" className="p-2 flex flex-col gap-2 ">
                        <div className="flex gap-3">
                            <a className="hover:underline underline-offset-2" href={`/finance/customer/${id}`}>{customer?.company ? customer?.company : `${customer?.first_name} ${customer?.last_name}`}</a>
                            <Badge color="green">{<Link href={"https://pro.housecallpro.com/app/jobs/" + job_id} >{job_number}</Link>}</Badge>
                        </div>
                        <OptionList selected={responsibleSelected} setSelected={handleReponsibleChange} list={users} />
                        <hr className="text-white" />
                        <span className="text-sm font-light">{new Date(job_date).toDateString()}</span>
                        <span className="text-sm font-light">{invoice_date ? new Date(invoice_date).toDateString() : "Invoice not sent"}</span>
                    </CardHeader>
                    <CardBody className="grid place-items-center">
                        <Chart {...chartConfig} />
                    </CardBody>
                    <CardFooter className="flex flex-col p-0 gap-1">
                        <div className="flex items-center gap-2">
                            <div className="rounded-full w-4 h-4 bg-[#020617]"></div>
                            <div className="flex gap-1"><span>Amount:</span> <NumericFormat value={amount} displayType="text" prefix="$" thousandsGroupStyle="lakh" thousandSeparator="," /></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="rounded-full w-4 h-4 bg-[#00897b]"></div>
                            <div className="flex gap-1"><span>Paid:</span> <NumericFormat value={paid || 0} displayType="text" prefix="$" thousandsGroupStyle="lakh" thousandSeparator="," /></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="rounded-full w-4 h-4 bg-[#CD2F2F]"></div>
                            <div className="flex gap-1"><span>Debt:</span> <NumericFormat value={due} displayType="text" prefix="$" thousandsGroupStyle="lakh" thousandSeparator="," /></div>
                        </div>
                    </CardFooter>
                </Card>
                <div className="flex flex-col p-2 lg:border-l mt-3 overflow-auto">
                    <div className="flex flex-col gap-2 p-2 max-h-[450px] overflow-auto">
                        <span className="font-light text-sm">Comments</span>
                        <div className="p-3 ">
                            {comments?.map((comment: any, id: any) => <>
                                <CommentCard picture={comment?.user?.picture} text={comment.text} date={comment.createdAt} name={comment?.user?.name} status={comment.status} key={id} id={comment.id} />
                            </>)}
                        </div>
                    </div>
                    <form onSubmit={addComment} className="flex gap-2">
                        <img src={account?.picture} alt="" className="size-8 rounded-full" />
                        <div className="bg-black/5 rounded-lg w-full">
                            <div className="flex">
                                <Textarea onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        addComment(e)
                                    }
                                }} rows={3} wrap="soft" ref={commentRef} className="font-light text-sm p-2 outline-0 w-full" placeholder="Comment:" />
                                <Button type="submit"></Button>
                            </div>
                            <OptionList list={statusList} setSelected={setStatus} selected={status} />
                        </div>
                    </form>
                </div>
            </div>
                : <div className="flex w-full items-center justify-center p-2"><span>Nothing to show here</span></div>}
        </div>
    </div>
}