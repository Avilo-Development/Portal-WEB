import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@headlessui/react";
import Badge from "./badge";

export default function Pagination({next, prev, page, total}:{next:any, page:number, prev: any, total:number}) {

    return <div className="flex items-center justify-between w-full gap-4">
        <Button
            className="flex items-center gap-2 cursor-pointer hover:underline underline-offset-2"
            onClick={prev}
        >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Back
        </Button>
        <Badge color='blue'>{page+1}/{total}</Badge>
        <Button
            className="flex items-center gap-2 cursor-pointer hover:underline underline-offset-2"
            onClick={next}
        >
            Next
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
    </div>
}