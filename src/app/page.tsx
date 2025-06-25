import DashboardCard from "@/components/dashboard.card";
import { UserCircleIcon, WrenchIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <>
      <div className="min-h-full">

        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex gap-5 flex-wrap">
            <DashboardCard 
              name="Contacts list" 
              description="Manage the global contacts on the company, like inspectors, contarctors, stores, counties, etc" 
              icon={<UserCircleIcon className="size-8" />} 
              path="contacts"/>
            <DashboardCard 
              name="Projects list" 
              description="Manage the current projects and the communication with the contractors. Review the most recent project and handle the life cycle." 
              icon={<WrenchIcon className="size-8" />} 
              path="projects"/>
          </div>
        </main>
      </div>
    </>
  )
}
