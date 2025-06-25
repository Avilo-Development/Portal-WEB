'use client'

import DashboardCard from "@/components/dashboard.card"
import { HomeIcon, WrenchIcon } from "@heroicons/react/24/outline"

export default function Docs() {

    return <>
    
    <DashboardCard 
        name="Projects" 
        description="Welcome to the streamlined process we follow at Ardan Electric to ensure every project is handled with precision, professionalism, and care. Here's how we bring your electrical projects to life from start to finish! 🔌✨" 
        icon={<WrenchIcon className="size-8"/>}
        path="docs/projects" 
        type="Roadmap"
        />
    <DashboardCard 
        name="Housecall Pro" 
        description="Welcome to the Housecall Pro User Guide! This document will walk you through the steps to create customers, estimates, jobs, and scheduling in Housecall Pro. Follow these detailed instructions to make the most out of the platform." 
        icon={<HomeIcon className="size-8"/>}
        path="docs/hcp" 
        type="CRM"
        />
    <DashboardCard 
        name="Home Love Construction" 
        description="This document outlines the step-by-step procedure for working with the client Home Love Construction (HLC) using their CRM system Buildertrend (BT). All team members must strictly follow the sequence of actions described below." 
        icon={<HomeIcon className="size-8"/>}
        path="docs/hlc/projects" 
        type="Roadmap"
        />
    </>
}