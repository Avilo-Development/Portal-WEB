import { endpoints } from "@/services/api";
import { Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { NumericFormat } from "react-number-format";
import OptionList from "./OptionList";
import { useData } from "@/hooks/contexts/global.context";
import Badge from "./badge";
import Link from "next/link";
import { usePatch, usePost } from "@/hooks/useFetch";
import CommentCard from "./comment.card";
import { Button, Textarea } from "@headlessui/react";
export default function FinanceCard({ project, children }: { project: any, children?: React.ReactNode }) {

    const HCP = process.env.NEXT_PUBLIC_HCP

    const unassgined = { id: null, role: 'Not assigned' }

    const [responsibleSelected, setResponsibleSelected] = useState<any>(project?.responsible ? project?.responsible : unassgined)
    const commentRef = useRef<any>(null)

    const [comments, setComments] = useState(project?.comments)

    const { account, users, HCP_URL } = useData()

    useEffect(() => {
        setComments(project?.comments)
    }, [project])

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

    const handleReponsibleChange = async (e: any) => {
        const body = { responsible_id: e.id }
        await usePatch(endpoints.finance.update(`${project?.id}`), body)
        setResponsibleSelected(e)
    }

    const addComment = async (e: any) => {
        e.preventDefault()
        const body = {
            text: commentRef.current?.value,
            status: status.name,
            finance_id: project?.id
        }
        const rta = await usePost(endpoints.comment.create, body)
        setComments([...comments, { ...rta, user: account }])
        commentRef.current.value = ''
    }

    const statusList = [
        { id: 1, name: 'Unassigned' },
        { id: 2, name: 'Follow-up' },
        { id: 3, name: 'In review' },
        { id: 4, name: 'Paid' },
    ]
    const [status, setStatus] = useState(statusList[1])

    const color = (overdue:number) => {
        if(overdue<0) return 'gray'
        if(overdue===0) return 'green'
        if(overdue<=30) return 'yellow'
        if(overdue<=60) return 'orange'
        if(overdue<=90) return 'red'
        if(overdue>90) return 'black'
    }

    return <div className="flex flex-col shadow-2xl bg-white text-gray-800 w-full grow lg:rounded-lg">
        <div className="flex flex-col gap-10 p-5 justify-center items-center">
                {children}
            <div className="flex w-full gap-3 lg:flex-row flex-col">
                <Card {...({} as React.ComponentProps<typeof Card>)} className="bg-transparent shadow-none lg:min-w-sm">
                    <CardHeader {...({} as React.ComponentProps<typeof Card>)} color="transparent" className="p-2 flex flex-col gap-2 ">
                        <div className="flex gap-3">
                            <a className="hover:underline underline-offset-2" href={`${HCP}customers/${project?.customer?.id}`}>{project?.customer?.name}</a>
                            <Badge color={color(project?.overdue)}>{<Link href={HCP_URL + "jobs/" + project?.job_id} >{project?.job_number}</Link>}</Badge>
                        </div>
                        <span>{project?.address}</span>
                        <span className="font-semibold text-sm">{responsibleSelected.role}</span>
                        <hr className="text-gray-100" />
                        <span className="text-sm font-light">Job created: {new Date(project?.job_date).toDateString()}</span>
                        <span className="text-sm font-light">Invoice sent: {project?.invoice_date ? new Date(project?.invoice_date).toDateString() : "Invoice not sent"}</span>
                        <span className="text-sm font-light">Last Service: {project?.service_date ? new Date(project?.service_date).toDateString() : "No Service"}</span>
                        <Badge color={color(project?.overdue)}>Overdue: {project?.overdue ? project?.overdue : "Uptodate"}</Badge>
                    </CardHeader>
                    <CardBody {...({} as React.ComponentProps<typeof Card>)} className="grid place-items-center">
                        {project?.amount ? <Chart type="pie" width={200} height={200} series={[project?.paid || 0, project?.due]} options={options} /> : <div className="flex w-full items-center justify-center p-2"><span>Nothing to show here</span></div>}
                    </CardBody>
                    <CardFooter {...({} as React.ComponentProps<typeof Card>)} className="flex flex-col p-0 gap-1">
                        <div className="flex items-center gap-2">
                            <div className="rounded-full w-4 h-4 bg-[#020617]"></div>
                            <div className="flex gap-1"><span>Amount:</span> <NumericFormat value={project?.amount} displayType="text" prefix="$" thousandsGroupStyle="lakh" thousandSeparator="," /></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="rounded-full w-4 h-4 bg-[#00897b]"></div>
                            <div className="flex gap-1"><span>Paid:</span> <NumericFormat value={project?.paid || 0} displayType="text" prefix="$" thousandsGroupStyle="lakh" thousandSeparator="," /></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="rounded-full w-4 h-4 bg-[#CD2F2F]"></div>
                            <div className="flex gap-1"><span>Debt:</span> <NumericFormat value={project?.due} displayType="text" prefix="$" thousandsGroupStyle="lakh" thousandSeparator="," /></div>
                        </div>
                    </CardFooter>
                </Card>
                <div className="flex flex-col p-2 lg:border-l border-gray-200 mt-3 overflow-auto w-full">
                    <div className="flex flex-col gap-2 p-2 max-h-[450px] overflow-auto">
                        <span className="font-light text-sm">Comments</span>
                        <div className="flex flex-col w-full gap-5">
                            {comments?.map((comment: any, id: any) => <>
                                <CommentCard setComments={setComments} picture={comment?.user?.picture} user_id={comment?.user?.id} text={comment.text} date={comment.createdAt} name={comment?.user?.name} status={comment.status} key={id} id={comment.id} />
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
        </div>
    </div>
}