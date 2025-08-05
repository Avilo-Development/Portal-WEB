'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

export default function AddProject({ open, handleOpen, setProjects, projects, active={}, setActive=[] }: any) {

  function handleAdd(e: any) {
    e.preventDefault()

    const formData = new FormData(e.target)

    const data = {
      ...Object.fromEntries(formData.entries()),
      id: Math.random()
    }
    console.log(data)

    setProjects([...projects, data])
    handleOpen()
  }

  return (
    <Dialog open={open} onClose={handleOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <form onSubmit={handleAdd}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">Add Salary</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">
                      Ardan Electric Projects
                    </p>

                    <div className="mt-4 flex flex-col">

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">

                        <div className="sm:col-span-3">
                          <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                            Name
                          </label>
                          <div className="mt-2">
                            <input id="name" name="name" type="text" autoComplete="name"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label htmlFor="estimate" className="block text-sm/6 font-medium text-gray-900">
                            Estimate #
                          </label>
                          <div className="mt-2">
                            <input id="estimate" name="estimate" type="number"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label htmlFor="deadline_at" className="block text-sm/6 font-medium text-gray-900">
                            Deadline Date
                          </label>
                          <div className="mt-2">
                            <input id="deadline_at" name="deadline_at" type="date"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                          </div>
                        </div>
                        <div className="sm:col-span-4">
                          <label htmlFor="budget" className="block text-sm/6 font-medium text-gray-900">
                            Budget
                          </label>
                          <div className="mt-2">
                            <input id="budget" name="budget" type="number" step="0.01"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
                            Address
                          </label>
                          <div className="mt-2">
                            <input id="address" name="address" type="text" autoComplete="street-address"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                          </div>
                        </div>

                      </div>

                      <div className="col-span-full mt-4">
                        <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                          About
                        </label>
                        <div className="mt-2">
                          <textarea id="about" name="about" rows={3}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            defaultValue={''} />
                        </div>
                        <p className="mt-3 text-sm/6 text-gray-600">Write a brief description.</p>
                      </div>


                    </div>
                  </div>

                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
                  <input
                    type="submit"
                    value="Submit"
                    className="mt-3 cursor-pointer inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  />
                  <button
                    type="button"
                    onClick={handleOpen}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}