import { useEffect, useRef, useState } from 'react'
import { useFetch } from '@/hooks/useFetch'
import { endpoints } from '@/services/api'
import FinanceDialog from '@/dialogs/finance.dialog'
import { createViewDay, createViewMonthAgenda, createViewMonthGrid, createViewWeek, createCalendar } from '@schedule-x/calendar'
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react'
import { createEventsServicePlugin } from '@schedule-x/events-service'

import { format } from 'date-fns';

import '@schedule-x/theme-default/dist/index.css'

export default function CalendarComponent() {
    const hasRun = useRef(false);

    const HCP_URL = process.env.NEXT_PUBLIC_HCP

    const [open, setOpen] = useState(false)
    const [project, setProject] = useState('')
    const eventsService = useState(() => createEventsServicePlugin())[0]
    const calendar = useCalendarApp<any>({
        views: [createViewMonthGrid(), createViewMonthAgenda(), createViewDay(), createViewWeek()],
        defaultView: createViewMonthGrid.name,
        plugins: [eventsService],
        callbacks: {
            onDoubleClickEvent(event) {
                setProject(event.id.toString())
                setOpen(true)
            },

        },
    })

    const customComponents = {
        monthGridEvent: CustomTimeGridEvent,
        timeGridEvent: CustomTimeGridEvent,
    }

    useEffect(() => {

        const today = new Date()

        const getEventClass = (diffDays: number) => {

            if (diffDays < 0) return 'event-unsent';
            if (diffDays === 0) return 'event-default'

            if (diffDays > 90) return 'event-90';
            else if (diffDays > 60) return 'event-60';
            else if (diffDays > 30) return 'event-30';
            else return 'event-29';

        }
        if (hasRun.current) return;
        hasRun.current = true;
        const load = async () => {
            try {
                const rta = await useFetch(endpoints.finance.getAll(`page_size=5000`))
                const events = rta?.map((data: any) => {
                    const end = new Date(data.job_date)
                    end.setHours(end.getHours() + 1)

                    return {
                        id: data?.id,
                        start: format(data.job_date, 'yyyy-MM-dd HH:mm'),
                        end: format(end, 'yyyy-MM-dd HH:mm'),
                        number: data.job_number,
                        address: data.address,
                        class: getEventClass(data.overdue)
                    }
                })
                eventsService.set(events)
            } catch (e) {
                console.error("Error loading events:", e)
            } finally {

            }
        }
        load()
    }, [])


    function CustomTimeGridEvent({ calendarEvent }: any) {
        return (
            <div className={`${calendarEvent.class} event flex gap-2`}>
                <a href={`${HCP_URL}jobs/${calendarEvent.id}`} className='underline'>[{calendarEvent.number}]</a>
                <span>{calendarEvent.address}</span>
            </div>
        )
    }

    return <div className="flex flex-col gap-5 w-full">
        <h1 className="w-full text-center font-bold text-2xl">Calendar</h1>
        <ScheduleXCalendar calendarApp={calendar} customComponents={customComponents} />
        <FinanceDialog handleOpen={() => { setOpen(!open) }} open={open} project_id={project} />
    </div>
}