import { useData } from "@/hooks/contexts/global.context";
import Badge from "./badge";
import { useDelete } from "@/hooks/useFetch";
import { endpoints } from "@/services/api";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function CommentCard({ text, name, date, status, picture, user_id, id, setComments }: { text: string, name: string, date: any, status: string, user_id: string, picture: string, id: string, setComments: any }) {
    const { account } = useData()
    const [isAccount, setIsAccount] = useState(false)
    useEffect(() => {
        setIsAccount(account.id === user_id)
    }, [])
    const handleRemove = async () => {
        await useDelete(endpoints.comment.remove(id))
        setComments((prev: any) => prev.filter((comment: any) => comment.id !== id))
    }
    return <div className="flex p-2 gap-2 w-full items-start bg-white rounded-lg shadow-sm">
        <img src={picture} alt="User picture" className="size-8 rounded-full" />
        <div className="flex flex-col w-[90%]">
            <div className="flex gap-2 w-full flex-wrap flex-col">
                <div className="flex flex-col py-0.5 px-2 rounded-lg max-w-full">
                    <span className="text-gray-800 text-sm">{`${name} ${isAccount ? "(You)" : ''}`}</span>
                    <p className="font-light text-ms wrap-break-word text-wrap">{text}</p>
                </div>
                {isAccount && <TrashIcon onClick={handleRemove} className="cursor-pointer hover:text-red-400 duration-150" width={16} />}
            </div>
            <div className="flex gap-3 font-light text-xs">
                <span className="">{formatDistanceToNow(new Date(date), {addSuffix:false})}</span>
                <div className="underline underline-offset-2">{status}</div>
            </div>
        </div>
    </div>
}