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
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { config } from "@/services/config";
export default function FinanceCard({ project, children }: { project: any, children?: React.ReactNode }) {

    const unassgined = { id: null, text: 'Not assigned' }

    const [responsibleSelected, setResponsibleSelected] = useState<any>(unassgined)
    const commentRef = useRef<any>(null)
    const router = useRouter()

    const [comments, setComments] = useState(project?.comments)
    const [isAdmin, setIsAdmin] = useState(false)

    const { account, users, HCP_URL } = useData()

    useEffect(() => {
        setComments(project?.comments)
        
        if(!account) return

        setIsAdmin(account?.role?.id ===config.MANAGER ||account?.role?.id===config.OWNER||account?.role?.id===config.DEV)
        setResponsibleSelected(project.responsible ? project.responsible : unassgined)
    }, [project, users])

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
        colors: ["#00c951", "#fb2c36"],
    }

    const handleReponsibleChange = async (e: any) => {
        const body = { responsible: e, finance_id: project?.id }
        const result = (await usePatch(endpoints.finance.updateResponsible(`${project?.id}`), body)).data
        systemComment(result)
        setResponsibleSelected(e)
    }

    const systemComment = async (rta:any) => {
        commentRef.current.value = ''
        setComments([...comments, { ...rta, user: account }])
    }
    const addComment = async (e: any) => {
        e?.preventDefault()
        const value = commentRef.current.value
        if (value === '') return
        commentRef.current.value = ''
        const body = {
            text: value,
            status:status.text,
            finance_id: project?.id
        }
        const rta = await usePost(endpoints.comment.create, body)
        setComments([...comments, { ...rta, user: account }])
    }

    const statusList = [
        { id: 1, text: 'Unassigned', color: 'black' },
        { id: 2, text: 'Follow-up', color: 'blue' },
        { id: 3, text: 'In review', color: 'yellow' },
        { id: 4, text: 'Paid', color: 'green' },
        { id: 5, text: 'Unrecoverable', color: 'red' },
    ]
    const [status, setStatus] = useState(statusList[0])

    const color = (overdue: number) => {
        if (overdue < 0) return 'gray'
        if (overdue === 0) return 'green'
        if (overdue <= 30) return 'yellow'
        if (overdue <= 60) return 'orange'
        if (overdue <= 90) return 'red'
        if (overdue > 90) return 'black'
    }
 
    return <div className="flex flex-col bg-white text-gray-800 w-full grow lg:rounded-lg shadow-[#324183] shadow">
        <div className="flex flex-col gap-10 p-5 justify-center items-center">
            {children}
            <div className="flex w-full gap-3 lg:flex-row flex-col">
                <Card {...({} as React.ComponentProps<typeof Card>)} className="bg-transparent shadow-none lg:min-w-sm">
                    <CardHeader {...({} as React.ComponentProps<typeof Card>)} color="transparent" className="p-2 flex flex-col gap-2 ">
                        <div className="flex gap-3">
                            <a className="hover:underline underline-offset-2" href={`${config.HCP}customers/${project?.customer?.id}`}>{project?.customer?.name}</a>
                            <Badge color={color(project?.overdue)}>{<Link href={HCP_URL + "jobs/" + project?.job_id} >{project?.job_number}</Link>}</Badge>
                        </div>
                        <span>{project?.address}</span>
                        {isAdmin ? <OptionList list={[unassgined,...users]} selected={responsibleSelected} setSelected={handleReponsibleChange} /> : <span className="font-semibold text-sm">{responsibleSelected.role?.name}</span>}
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
                        <Badge color='black' full='full'><span className="font-bold">Amount: </span><NumericFormat value={parseInt(project?.amount) || 0} displayType="text" prefix="$" thousandsGroupStyle="thousand" thousandSeparator="," /></Badge>
                        <Badge color='green' full='full'><span className="font-bold">Paid: </span><NumericFormat value={parseInt(project?.paid) || 0} displayType="text" prefix="$" thousandsGroupStyle="thousand" thousandSeparator="," /></Badge>
                        <Badge color='red' full='full'><span className="font-bold">Due: </span><NumericFormat value={parseInt(project?.due) || 0} displayType="text" prefix="$" thousandsGroupStyle="thousand" thousandSeparator="," /></Badge>
                    </CardFooter>
                </Card>
                <div className="flex flex-col p-2 lg:border-l border-gray-200 mt-3 overflow-auto w-full max-h-[460px] h-[640px]">
                    <div className="flex flex-col gap-2 p-2 max-h-full h-full overflow-auto border-b-2 border-gray-200/60 ">
                        <div className="flex gap-2">
                            <span className="font-light text-sm">Comments</span>
                            <hr />
                        </div>
                        {comments.length ? <div className="flex flex-col w-full gap-3">
                            {comments?.map((comment: any, id: any) => <>
                                <CommentCard color={[...statusList, {text: 'system', color: 'violet'}].filter((a:any) => a.text===comment?.status)[0].color} setComments={setComments} picture={comment?.user?.picture} user_id={comment?.user?.id} text={comment.text} date={comment.createdAt} name={comment?.user?.name} status={comment.status} key={id} id={comment.id} />
                            </>)}
                        </div> : <div className="flex flex-col w-full gap-2 justify-center items-center h-full">
                            <InformationCircleIcon width={32} />
                            <span>No comments on this project</span>
                        </div>}
                    </div>
                    <form onSubmit={addComment} className="flex gap-2 max-h-[460px] pt-2">
                        <img src={account?.picture} alt="" className="size-8 rounded-full" />
                        <div className="w-full">
                            <div className="flex">
                                <Textarea onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        addComment(e)
                                    }
                                }} rows={2}
                                    placeholder="Add your comment..." wrap="soft" ref={commentRef} className="w-full p-3 rounded-xl shadow-[#324183] shadow bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 resize-none" />
                                <Button type="submit"></Button>
                            </div>
                            <OptionList list={statusList} setSelected={setStatus} color={status.color} selected={status} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
}