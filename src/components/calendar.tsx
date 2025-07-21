"use client"

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import { useEffect, useState } from 'react'
import { useFetch } from '@/hooks/useFetch'
import { endpoints } from '@/services/api'
import FinanceDialog from '@/dialogs/finance.dialog'

const localizer = momentLocalizer(moment)
export default function CalendarComponent() {
    const [events, setEvents] = useState<any>([])
    const [open, setOpen] = useState(false)
    const [project, setProject] = useState<any>()

    const formats = {
        dayFormat: (date: any, culture: any, localizer: any) =>
            localizer.format(date, 'ddd', culture), // Short day names (e.g., Mon, Tue)
        weekdayFormat: (date: any, culture: any, localizer: any) =>
            localizer.format(date, 'dddd', culture), // Full day names (e.g., Monday, Tuesday)
    };

    useEffect(() => {
        const load = async () => {
            const rta = await useFetch(endpoints.finance.getAll(`page_size=500`))
            rta?.data?.map((data: any) => {
                const body = {
                    start: new Date(data.invoice_date),
                    end: new Date(data.invoice_date),
                    title: data.address,
                    project: data,
                }
                setEvents((prev: any) => [...prev, body])
            })
        }
        load()
    }, [])
    return <div className="flex flex-col gap-5 w-full">
        <h1 className="w-full text-center font-bold text-2xl">Calendar</h1>
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            formats={formats}
            onDoubleClickEvent={
                (event: any) => {
                    setProject(event.project)
                    setOpen(true)
                }
            }
            eventPropGetter={
                (event: any, start, end, isSelected) => {
                    let newStyle = {
                        backgroundColor: "red",
                        color: 'white',
                        borderRadius: "0px",
                        border: "none"
                    };
                    const paid = event.project.due < 1
                    if (paid) {
                        newStyle.backgroundColor = "darkgreen"
                    }
                    const ago = new Date()
                    ago.setDate(ago.getDate() - 5)
                    if (new Date(event.project.invoice_date) < ago && !paid) {
                        newStyle.backgroundColor = "darkred"
                    }

                    return {
                        className: "",
                        style: newStyle
                    };
                }
            }
            style={{ height: 500 }}
        />
        <FinanceDialog handleOpen={() => { setOpen(!open) }} open={open} project={project} />
    </div>
}