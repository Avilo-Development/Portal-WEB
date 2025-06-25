'use client'

import ProjectCard from "@/components/project.card";
import AddProject from "@/dialogs/add_project.dialog";
import IProject from "@/interfaces/project.interface";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Projects() {
    const [open, setOpen] = useState(false)

    const [projects, setProjects] = useState<IProject[]>([
        {
            id: '0001',
            name: 'Hannah Mbinze',
            estimate: '821',
            hcp_url: 'https://pro.housecallpro.com/app/estimates/est_a5f7703175e242be9c04fb2eb8e042fb',
            address: 'Site Address: 1506 Blue Sea St, Clearwater, FL 33756',
            deadline_at: new Date(),
            send_at: new Date(),
            budget: 1400,
            quote: 3600,
            visit: true,
            status: {}
        },
    ])

    function handleRemove(id:string){
        const updated = projects.filter(obj => obj.id !== id)
        setProjects(updated)
    }

    function handleOpen() {
        setOpen(!open)
    }
    return (
        <>
            <div className="min-h-full">

                <header className="bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Projects</h1>
                        <button onClick={handleOpen} type="button" className="rounded-xl bg-gray-200 flex px-5 py-2 items-center cursor-pointer hover:bg-gray-200/80 duration-300">
                            <span>Create</span>
                            <PlusIcon aria-hidden="true" className="block size-8 group-data-open:hidden" />
                        </button>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-wrap gap-5 justify-center">
                        {projects.length > 0 ? projects.map((project: IProject) => (
                            <ProjectCard key={project.id} project={project} handleRemove={handleRemove} />
                        )) : 
                        <div className="w-full flex justify-center items-center">
                            <span>Nothing to show here yet</span>
                        </div>}
                    </div>
                </main>

                <AddProject open={open} handleOpen={handleOpen} setProjects={setProjects} projects={projects} />
            </div>
        </>
    )
}