import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/modules/dashboard/ui/components/dashboard-sidebar';
import React, { Children } from 'react'

interface props {
    children: React.ReactNode;
}

const DashboardLayout = ({children}:props) => {
  return (
   <SidebarProvider>
    <DashboardSidebar/>
    <main className='flex flex-col h-screen w-screen bg-muted'>
        {children}
    </main>
   </SidebarProvider>
      
    
  )
}

export default DashboardLayout
