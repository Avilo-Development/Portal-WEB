'use client'

import AddSalary from "@/dialogs/add_salary.dialog";
import { useData } from "@/hooks/contexts/global.context";
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverGroup, PopoverPanel } from "@headlessui/react"
import { Bars3Icon, ChevronDownIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"

import { useState } from "react"

export default function DocsProjects({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [open, setOpen] = useState(false)

    const {timeReport, setTimeReport} = useData()

    function handleOpen() {
        setOpen(!open)
    }

    const routes = [
        {
            name: "Dashboard",
            url: "/",
        },
        {
            name: "Services",
            url: "/services",
            childs: [
                {
                    name: "Create",
                    href: "/create",
                    description: "Create a new bi-weekly report for a customer"
                },
                {
                    name: "Edit",
                    url: "/edit",
                    description: "Modify information on an existing reporting"
                },
                {
                    name: "Business Booster Platform",
                    url: "/bbp",
                    description: "-..."
                },
            ]
        },
    ]

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return <div className="min-h-full">

        <header className="bg-white">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="/docs" className="text-2xl font-bold tracking-tight text-gray-900 underline-0 hover:underline underline-offset-4"> Payroll</a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12 items-center">

                    {
                        routes.map((route): any => (
                            route.childs ?
                                <Popover key={route.name} className="relative">
                                    <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
                                        {route.name}
                                        <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                                    </PopoverButton>

                                    <PopoverPanel
                                        transition
                                        className="absolute top-full -left-8 z-50 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                                    >
                                        <div className="p-4">
                                            {route.childs.map((item) => (
                                                <div
                                                    key={item.name}
                                                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                                                >

                                                    <div className="flex-auto">
                                                        <a href={"/salary" + item.href} className="block font-semibold text-gray-900">
                                                            {item.name}
                                                            <span className="absolute inset-0" />
                                                        </a>
                                                        <p className="mt-1 text-gray-600">{item.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </PopoverPanel>

                                </Popover>
                                :
                                <a key={route.name} href={"/salary" + route.url} className="text-sm/6 font-semibold text-gray-900">
                                    {route.name}
                                </a>
                        ))
                    }
                    <button onClick={handleOpen} type="button" className="rounded-xl bg-gray-200 flex px-5 py-2 items-center cursor-pointer hover:bg-gray-200/80 duration-300">
                                                <span>Add</span>
                                                <PlusIcon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                                            </button>
                </PopoverGroup>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-8 w-auto"
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {
                                    routes.map((route): any => (
                                        route.childs ? <Disclosure key={route.name} as="div" className="-mx-3">
                                            <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                                                {route.name}
                                                <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                                            </DisclosureButton>
                                            <DisclosurePanel className="mt-2 space-y-2">
                                                {route.childs.map((item): any => (
                                                    <DisclosureButton
                                                        key={item.name}
                                                        as="a"
                                                        href={"/salary" + item.href}
                                                        className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                                                    >
                                                        {item.name}
                                                    </DisclosureButton>
                                                ))}
                                            </DisclosurePanel>
                                        </Disclosure> : <a
                                            key={route.name}
                                            href={"/salary" + route.url}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                        >
                                            {route.name}
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
        <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex gap-5 flex-wrap justify-center">
                {children}
            </div>
        </main>
        <AddSalary open={open} handleOpen={handleOpen} setTimeReport={setTimeReport} timeReport={timeReport} />
    </div>
}