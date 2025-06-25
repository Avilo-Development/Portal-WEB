'use client'
import ContactCard from "@/components/contact.card"
import AddContact from "@/dialogs/add_contact.dialog"
import IContacts from "@/interfaces/contact.interface"
import { PlusIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

export default function Contacts() {

  const [open, setOpen] = useState(false)

  const [contacts, setContacts] = useState<IContacts[]>([
    {
      id: '0000',name:"Tetsing name", email:"test@gmail.com",phone:"7273449633", address:"7771 ausudfhdf 23sdf, FL, 21131", type:"County",
    },
    {
      id: '0001',name:"Giovnny Test", email:"giovanny@gmail.com",phone:"3104423919", address:"5665 iiojwe vcz, FL, 21", type:"Employee",
    },
    {
      id: '0002',name:"Fred Test", email:"fred@gmail.com",phone:"813333333", address:"fasdf iiojwe vcz, FL, 21", type:"Owner",
    },
  ])

  function handleOpen(){
    setOpen(!open)
  }

  return (
    <>
      <div className="min-h-full">

        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Contacts</h1>
            <button onClick={handleOpen} type="button" className="rounded-xl bg-gray-200 flex px-5 py-2 items-center cursor-pointer hover:bg-gray-200/80 duration-300">
              <span>Create</span>
              <PlusIcon aria-hidden="true" className="block size-8 group-data-open:hidden"/>
            </button>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-wrap gap-5 justify-center">
            {contacts.map((contact:IContacts) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        </main>

        <AddContact open={open} handleOpen={handleOpen} setContacts={setContacts} contacts={contacts}/>
      </div>
    </>
  )
}
