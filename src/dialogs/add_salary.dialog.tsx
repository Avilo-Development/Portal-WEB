'use client'

import Table from "@/components/table"
import { useData } from "@/hooks/contexts/global.context"
import ITechnician from "@/interfaces/technician.interface"
import ITimeReporting from "@/interfaces/time_reporting.interface"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { CheckBadgeIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { NumberFormatBase } from "react-number-format"

export default function AddSalary({ open, handleOpen, active = {}, setActive = [] }: any) {

    const [startDate, setStartDate] = useState(new Date())
    const [timeReport, setTimeReport] = useState<ITimeReporting[]>([])
    const [selectedTech, setSelectedTech] = useState('01')

    const [sum, setSum] = useState(0)

    const { technician, salary, setSalary } = useData()

    function handleInitialValue(e: any) {
        setStartDate(new Date(e.target.value))
    }

    function handleAdd() {
        const tec = technician.find((e:any) => e.id === selectedTech)
        setTimeReport((oldData: any) => [...oldData, [
            startDate,
            tec?.user_id.id,
            "0",
            tec?.salary,
        ]])
        setStartDate(new Date(startDate.getTime() + 86400000))
    }

    function handleSave(){
        
    }

    return <Dialog open={open} onClose={handleOpen} className="relative z-10">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-1/2 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full flex flex-col gap-5">
                        <div className="flex justify-between fles-wrap">
                            <div className="flex gap-5">
                                <input type="date" value={startDate.toISOString().substring(0, 10)} onChange={handleInitialValue} />
                                <select name="tech" id="tec" value={selectedTech} onChange={(e) => setSelectedTech(e.target.value)}>
                                    {technician.map((tec: ITechnician, i: number) => (
                                        <option key={i} value={tec.id}>{tec.user_id.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-5">
                                <div className="flex gap-3 p-2 border rounded-lg border-gray-300 duration-300">
                                    <button onClick={handleAdd} className="cursor-pointer hover:text-blue-600">
                                        <PlusIcon width={16} />
                                    </button>
                                    <div className=""></div>
                                    <button className="cursor-pointer hover:text-red-600">
                                        <TrashIcon width={16} />
                                    </button>
                                </div>
                                <button className="p-2 bg-blue-400 rounded-lg text-sm cursor-pointer hover:bg-blue-300 duration-300" onClick={handleSave}>
                                    Save
                                </button>
                            </div>
                        </div>
                        {/* <Table data={timeReport} setData={setTimeReport} header={["Date", "Technician", "Time", "Salary"]} setSum={setSum} /> */}
                        <div>
                            <span>Gross Total: {<NumberFormatBase value={sum} displayType="text" prefix="$" />}</span>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </div>
    </Dialog>
}