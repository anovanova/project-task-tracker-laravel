import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import AppLogo from './app-logo';
import { usePage } from '@inertiajs/react'
type SideNavData = [{
    uuid: string
    user_id: number
    name: string
    description: string
    status: string
    updated_at: string
    created_at: string
}]

export function AppSidebar() {
    const sideNavData = usePage().props.sidebarData as SideNavData
    const navItems = sideNavData.map((item) => {return {title: item.name, href: `/project/${item.uuid}`}})
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenuButton size="lg" className='bg-primary text-primary-foreground flex justify-center transition duration-200' asChild>
                    <Link href="/add-project" className='font-bold' prefetch>
                        <Plus/>
                        Add Project
                    </Link>
                </SidebarMenuButton>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
