import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@headlessui/react";

export default function Pagination({next, prev, page}:{next:any, page:number, prev: any}) {

    return <div className="flex items-center justify-between w-full gap-4">
        <Button
            className="flex items-center gap-2 cursor-pointer hover:underline underline-offset-2"
            onClick={prev}
            disabled={page === 1}
        >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Back
        </Button>
        <Input type="text" className="w-8" />
        <Button
            className="flex items-center gap-2 cursor-pointer hover:underline underline-offset-2"
            onClick={next}
        >
            Next
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
    </div>
}