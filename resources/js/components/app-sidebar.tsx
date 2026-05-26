import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    Building2,
    CreditCard,
    Package,
    BarChart3,
    Users,
    Headphones,
    Activity,
    FileText,
    Settings,
    HelpCircle,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Tenant Management',
        href: '/admin/tenants',
        icon: Building2,
    },
    {
        title: 'Subscription',
        href: '/admin/subscriptions',
        icon: CreditCard,
    },
    {
        title: 'Paket Langganan',
        href: '/admin/packages',
        icon: Package,
    },
    {
        title: 'Invoice',
        href: '/admin/invoices',
        icon: FileText,
    },
    {
        title: 'Analytics',
        href: '/admin/analytics',
        icon: BarChart3,
    },
    {
        title: 'User Management',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: 'Support Ticket',
        href: '/admin/support',
        icon: Headphones,
    },
    {
        title: 'Activity Logs',
        href: '/admin/logs',
        icon: Activity,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Pengaturan Sistem',
        href: '/admin/settings',
        icon: Settings,
    },
    {
        title: 'Help Center',
        href: '#',
        icon: HelpCircle,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <SidebarSeparator />
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
