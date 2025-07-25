'use client'

import FinanceCard from '@/components/finance.card'
import Loader from '@/components/loader'
import { useFetch } from '@/hooks/useFetch'
import { endpoints } from '@/services/api'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { useEffect, useState } from 'react'

export default function FinanceDialog({ open, handleOpen, project_id }: { open: boolean, handleOpen: any, project_id: string }) {

  const [project, setProject] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await useFetch(endpoints.finance.getOne(project_id))
        setProject(response)
      } catch (error) {
        console.error('Error fetching project data:', error)
      }finally{
        setLoading(false)
      }
    }
    if (project_id) {
      load()
    }
  }, [project_id])

  return <>
    {!loading ? <Dialog open={open} onClose={handleOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-[70%] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <FinanceCard project={project}/>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
      :
      <Dialog open={open} onClose={handleOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-[70%] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full flex items-center justify-center">
                <Loader loading size={25} />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    }
  </>
}