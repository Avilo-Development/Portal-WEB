import { PencilIcon, PencilSquareIcon, TrashIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function ProjectCard({project, handleRemove}:any) {
    return <div className="flex flex-col rounded-xl bg-white  text-gray-800 shadow lg:max-w-1/3 lg:min-w-1/3 w-full justify-between">

        <div className="flex gap-10 p-5 justify-between items-center">
            <div className="flex flex-col gap-2">
                <div className="flex felx-col gap-2 ">
                    <a className="underline underline-offset-1" href={project.hcp_url}>{project.name}</a>
                    <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-green-500/10 ring-inset">{project.estimate}</span>
                </div>
                <p>{project.address}</p>
                <hr />
                <div className="flex flex-col ">
                    <p>Deadline: {new Date(project.deadline_at).toDateString()}</p>
                    <p>Send: {project.send_at ? new Date(project.send_at).toDateString() : "TBD"}</p>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <button className="">
                    <PencilSquareIcon aria-hidden="true" className="block size-10 group-data-open:hidden" />
                </button>
                <button className="cursor-pointer hover:text-red-500 duration-300" onClick={(e) => handleRemove(project.id)}>
                    <TrashIcon aria-hidden="true" className="block size-10 group-data-open:hidden" />
                </button>
            </div>
        </div>
        <div className="w-full flex gap-3 p-5 justify-center items-center border-t-1 border-gray-600">
            <span className="w-full text-center border-r-1">${project.budget}</span>
            <input placeholder="Quote" type="text" className="w-full text-center" value={`$ ${project.quote ? project.quote : '0'}`} />
        </div>

    </div>
}