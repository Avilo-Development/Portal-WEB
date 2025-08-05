import { UserCircleIcon } from '@heroicons/react/24/outline'


export default function ContactCard({contact}:any){
    return <div className="flex flex-col rounded-xl bg-white  text-gray-800 shadow lg:max-w-1/3 lg:min-w-1/3 w-full">

        <div className="flex gap-10 p-5 justify-between items-center">
            <div className="flex flex-col gap-2">
                <div className="flex felx-col gap-2 ">
                    <span>{contact.name}</span>
                    <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-green-500/10 ring-inset">{contact.type}</span>
                </div>
                <p>{contact.address}</p>
            </div>
             <UserCircleIcon aria-hidden="true" className="block size-15 group-data-open:hidden" />
        </div>
        <div className="w-full flex gap-3 p-5 justify-center items-center border-t-1 border-gray-600">
            <a className="w-full text-center border-r-1" href={`mailto:${contact.email}`}>Email</a>
            <a className="w-full text-center" href={`tel:+${contact.phone}`}>Call</a>
        </div>
    </div>
}