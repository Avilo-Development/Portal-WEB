import { useData } from "@/hooks/contexts/global.context";
import Badge from "./badge";
import { useDelete } from "@/hooks/useFetch";
import { endpoints } from "@/services/api";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { motion } from 'motion/react'

export default function CommentCard({ text, name, date, status, picture, user_id, id, setComments, color='white' }: { text: string, name: string, date: any, status: string, user_id: string, picture: string, id: string, setComments: any, color?:any }) {
    const { account } = useData()
    const [isAccount, setIsAccount] = useState(false)
    useEffect(() => {
        setIsAccount(account.id === user_id)
    }, [])
    const handleRemove = async () => {
        await useDelete(endpoints.comment.remove(id))
        setComments((prev: any) => prev.filter((comment: any) => comment.id !== id))
    }
    const setColor = {
        red: ' bg-gradient-to-br from-white to-red-50 shadow-red-400 hover:shadow-red-300 shadow ',
        yellow: ' bg-gradient-to-br from-yelwhite to-yellow-50 shadow-yellow-400 hover:shadow-yellow-300 shadow ',
        blue: ' bg-gradient-to-br from-bwhite to-blue-50 shadow-blue-400 hover:shadow-blue-300 shadow ',
        green: ' bg-gradient-to-br from-grwhite to-green-50 shadow-green-400 hover:shadow-green-300 shadow ',
        black: ' bg-gradient-to-br from-white to-gray-50 shadow-[#324183] hover:shadow-[#7b90ec] shadow ',
        white: ' bg-gradient-to-br from-white to-gray-50 shadow-[#324183] hover:shadow-[#7b90ec] shadow ',
        violet: ' bg-gradient-to-br from-white to-violet-50 shadow-violet-400 hover:shadow-violet-300 shadow ',
    }
    const key: keyof typeof setColor = color;
    return <motion.div initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }} className={"flex p-2 gap-2 w-full items-start duration-200 rounded-lg shadow-sm "+setColor[key]}>
        <img src={picture} alt="User picture" className="size-8 rounded-full" />
        <div className="flex flex-col w-[90%] gap-2">
            <div className="flex gap-2 w-full flex-wrap flex-col">
                <div className="flex flex-col py-0.5 px-2 rounded-lg max-w-full">
                    <span className="text-gray-800 text-sm font-semibold">{`${name} ${isAccount ? "(You)" : ''}`}</span>
                    <p className="font-extralight text-sm wrap-break-word text-wrap">{text}</p>
                </div>
            </div>
            <div className="flex gap-3 font-light text-xs">
                {(isAccount && !status.includes('system')) && <TrashIcon onClick={handleRemove} className="cursor-pointer hover:text-red-400 duration-150" width={16} />}
                <span className="">{`${new Date(date).toLocaleDateString()} at ${new Date(date).toLocaleTimeString()}`}</span>
                <div className="underline underline-offset-2">{status}</div>
            </div>
        </div>
    </motion.div>
}