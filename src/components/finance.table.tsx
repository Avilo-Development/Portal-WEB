import FinanceDialog from "@/dialogs/finance.dialog"
import { useData } from "@/hooks/contexts/global.context";
import { useEffect, useState } from "react"

export default function FinanceTable({ data }: { data: any}) {
    const [open, setOpen] = useState(false)
    const [project, setProject] = useState('')

    const [values, setValues] = useState<any>([])

    const {HCP_URL} = useData()
    useEffect(() => {
        setValues(data)
    }, [data])

    const handleOpen = () => {
        setOpen(true)
    }
    const handleSort = () => {
        setValues(values?.sort((a:any, b:any) => new Date(a?.invoice_date).getTime() - new Date(b?.invoice_date).getTime()))
    }
    return <div className="relative overflow-x-auto shadow-md sm:rounded-lg overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th className="px-6 py-3">
                        <span>Job #</span>
                    </th>
                    <th className="px-6 py-3">
                        <span>Cuastomer Name</span>
                    </th>
                    <th className="px-6 py-3 cursor-pointer" onClick={handleSort}>
                        Invoice Sent At
                    </th>
                    <th className="px-6 py-3">
                        Invoice Paid At
                    </th>
                    <th className="px-6 py-3">
                        Service Date
                    </th>
                    <th className="px-6 py-3">
                        Amount
                    </th>
                    <th className="px-6 py-3">
                        Paid
                    </th>
                    <th className="px-6 py-3">
                        Debt
                    </th>
                    <th className="px-6 py-3">
                        Overdue
                    </th>
                    <th className="px-6 py-3">
                        Address
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    values?.length > 0 && values?.map((item: any, itemId: any) => (
                        <tr onClick={() => {setProject(item.id)}}
                            className={`cursor-pointer border-b dark:border-gray-700 border-gray-200  ${project === item.id
                                    ? 'bg-gray-700 text-blue-800 font-medium'
                                    : 'bg-gray-800'
                                }`} onDoubleClick={handleOpen} key={itemId}>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-50 whitespace-nowrap underline underline-offset-2">
                                <a href={`${HCP_URL}jobs/${item?.job_id}`}>{item?.job_number}</a>
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-50 whitespace-nowrap max-w-72 truncate underline underline-offset-2">
                                <a href={`${HCP_URL}customers/${item?.customer?.id}`}>{item?.customer?.name}</a>
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-50 whitespace-nowrap">
                                {item?.invoice_date ? new Date(item?.invoice_date).toLocaleDateString() : "Unsent"}
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-50 whitespace-nowrap">
                                {item?.invoice_paid_date ? new Date(item?.invoice_paid_date).toLocaleDateString(): "Unpaid"}
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-50 whitespace-nowrap">
                                {new Date(item?.service_date).toLocaleDateString()}
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-50 whitespace-nowrap">
                                {item?.amount}
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-50 whitespace-nowrap">
                                {item?.paid}
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-50 whitespace-nowrap">
                                {item?.due}
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-50 whitespace-nowrap">
                                {item?.overdue}
                            </td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-50 whitespace-nowrap">
                                {item?.address}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <FinanceDialog handleOpen={() => { setOpen(!open) }} open={open} project_id={project}  />
    </div>
}