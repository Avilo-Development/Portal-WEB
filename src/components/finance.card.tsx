import { endpoints } from "@/services/api";
import { Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";
import { useRef, useState } from "react";
import Chart from "react-apexcharts";
import { NumericFormat } from "react-number-format";
import OptionList from "./OptionList";
import { useData } from "@/hooks/contexts/global.context";
import Badge from "./badge";
import Link from "next/link";
import { usePatch, usePost } from "@/hooks/useFetch";
import CommentCard from "./comment.card";
import { Button, Textarea } from "@headlessui/react";
export default function FinanceCard({ project }: { project: any }) {

    const [responsibleSelected, setResponsibleSelected] = useState<any>(project?.responsible)
    const commentRef = useRef<any>(null)

    const [comments, setComments] = useState(project?.comments)

    const { account, users, HCP_URL } = useData()

    const chartConfig = {
        type: "pie",
        width: 200,
        height: 200,
        series: [project?.paid || 0, project?.due],
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
        setComments([...comments, { ...rta, user: { name: 'You', picture: account?.picture } }])
        commentRef.current.value = ''
    }

    const statusList = [
        { id: 1, name: 'Unassigned' },
        { id: 2, name: 'Follow-up' },
        { id: 3, name: 'In review' },
        { id: 4, name: 'Paid' },
    ]
    const [status, setStatus] = useState(statusList[1])


    return <div className="flex flex-col shadow-2xl bg-white text-gray-800 w-full grow lg:rounded-lg">
        <div className="flex gap-10 p-5 justify-center items-center ">
            <div className="flex w-full gap-3 lg:flex-row flex-col">
                <Card className="bg-transparent shadow-none min-w-sm">
                    <CardHeader color="transparent" className="p-2 flex flex-col gap-2 ">
                        <div className="flex gap-3">
                            <a className="hover:underline underline-offset-2" href={`/finance/customer/${project?.customer?.id}`}>{project?.customer?.name}</a>
                            <Badge color="green">{<Link href={HCP_URL + "jobs/" + project?.job_id} >{project?.job_number}</Link>}</Badge>
                        </div>
                        <OptionList selected={responsibleSelected} setSelected={handleReponsibleChange} list={users} />
                        <hr className="text-white" />
                        <span className="text-sm font-light">{new Date(project?.job_date).toDateString()}</span>
                        <span className="text-sm font-light">{project?.invoice_date ? new Date(project?.invoice_date).toDateString() : "Invoice not sent"}</span>
                    </CardHeader>
                    <CardBody className="grid place-items-center">
                        {project?.amount ? <Chart {...chartConfig} /> : <div className="flex w-full items-center justify-center p-2"><span>Nothing to show here</span></div>}
                    </CardBody>
                    <CardFooter className="flex flex-col p-0 gap-1">
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
                <div className="flex flex-col p-2 lg:border-l mt-3 overflow-auto w-full">
                    <div className="flex flex-col gap-2 p-2 max-h-[450px] overflow-auto">
                        <span className="font-light text-sm">Comments</span>
                        <div className="p-3 ">
                            {comments?.map((comment: any, id: any) => <>
                                <CommentCard picture={comment?.user?.picture} user_id={comment?.user?.id} text={comment.text} date={comment.createdAt} name={comment?.user?.name} status={comment.status} key={comment.id} id={comment.id} />
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