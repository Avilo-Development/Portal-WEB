import Badge from "./badge";

export default function CommentCard({ text, name, date, status, picture, id }: { text: string, name: string, date: any, status: string, id: string, picture: string }) {
    return <div className="flex p-2 gap-2 w-fit max-w-[90%]">
        <img src={picture} alt="User picture" className="size-8 rounded-full" />
        <div className="flex flex-col w-full">
            <div className="flex flex-col bg-black/10 py-0.5 px-2 rounded-lg">
                <div className="flex gap-2">
                    <span className="text-gray-800 text-sm">{name}</span>
                    <Badge color="green">{status}</Badge>
                </div>
                <p className="font-light text-ms wrap-break-word">{text}</p>
            </div>
            <span className="font-light text-xs">{new Date(date).toLocaleDateString()}</span>
        </div>
    </div>
}