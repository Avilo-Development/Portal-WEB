import { ClockIcon } from "@heroicons/react/24/outline"

export default function ErrorDialog(){
    return <div className="flex flex-col gap-3 items-center">
        <ClockIcon width={24} />
        <span>Your are good, we don't have nothing to show here</span>
    </div>
}