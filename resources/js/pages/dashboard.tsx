import { Head } from '@inertiajs/react';
import {
    Building2,
    Users,
    CreditCard,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
    Clock,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Zap,
    Database,
    HardDrive,
    Server,
    Eye,
    Ban,
    RotateCcw,
    Trash2,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { dashboard } from '@/routes';

const systemHealth = [
    { name: 'API Server', status: 'healthy', uptime: '99.98%', icon: Zap },
    { name: 'Database', status: 'healthy', uptime: '99.99%', icon: Database },
    { name: 'Storage', status: 'warning', uptime: '87% used', icon: HardDrive },
    { name: 'Queue Server', status: 'healthy', uptime: '99.95%', icon: Server },
];

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        trial: 'bg-amber-50 text-amber-700 border-amber-200',
        suspended: 'bg-red-50 text-red-700 border-red-200',
        expired: 'bg-slate-50 text-slate-600 border-slate-200',
    };
    const labels: Record<string, string> = {
        active: 'Active',
        trial: 'Trial',
        suspended: 'Suspended',
        expired: 'Expired',
    };
    return (
        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${styles[status] || styles.expired}`}>
            {labels[status] || status}
        </span>
    );
}

function HealthBadge({ status }: { status: string }) {
    if (status === 'healthy') return <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600"><CheckCircle2 className="size-3.5" /> Healthy</span>;
    if (status === 'warning') return <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600"><AlertTriangle className="size-3.5" /> Warning</span>;
    return <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600"><XCircle className="size-3.5" /> Down</span>;
}

export default function Dashboard({
    stats,
    tenantGrowth,
    revenueGrowth,
    recentTenants,
    trialMonitor,
    activeUsersData,
}: any) {
    // Combine tenantGrowth and revenueGrowth for chart
    const combinedGrowth = tenantGrowth.map((t: any, index: number) => ({
        month: new Date(t.month + '-01').toLocaleString('default', { month: 'short' }),
        tenants: t.count,
        revenue: (revenueGrowth[index]?.revenue || 0) / 1000000,
    }));

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6 p-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-sm text-muted-foreground">Overview platform Paylo — Super Admin Panel</p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    <Card>
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-950">
                                    <Building2 className="size-4 text-blue-600" />
                                </div>
                                <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600">
                                    <ArrowUpRight className="size-3" /> 12%
                                </span>
                            </div>
                            <div className="mt-3">
                                <p className="text-2xl font-bold">{stats.totalTenants}</p>
                                <p className="text-xs text-muted-foreground">Total Tenant</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div className="rounded-lg bg-emerald-50 p-2 dark:bg-emerald-950">
                                    <CheckCircle2 className="size-4 text-emerald-600" />
                                </div>
                                <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600">
                                    <ArrowUpRight className="size-3" /> 8%
                                </span>
                            </div>
                            <div className="mt-3">
                                <p className="text-2xl font-bold">{stats.activeTenants}</p>
                                <p className="text-xs text-muted-foreground">Tenant Aktif</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div className="rounded-lg bg-amber-50 p-2 dark:bg-amber-950">
                                    <Clock className="size-4 text-amber-600" />
                                </div>
                                <span className="inline-flex items-center gap-0.5 text-xs font-medium text-red-500">
                                    <ArrowDownRight className="size-3" /> 3%
                                </span>
                            </div>
                            <div className="mt-3">
                                <p className="text-2xl font-bold">{stats.trialTenants}</p>
                                <p className="text-xs text-muted-foreground">Trial User</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div className="rounded-lg bg-indigo-50 p-2 dark:bg-indigo-950">
                                    <CreditCard className="size-4 text-indigo-600" />
                                </div>
                                <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600">
                                    <ArrowUpRight className="size-3" /> 18%
                                </span>
                            </div>
                            <div className="mt-3">
                                <p className="text-2xl font-bold">Rp {Math.round(stats.monthlyRevenue / 1000000)}jt</p>
                                <p className="text-xs text-muted-foreground">Monthly Revenue</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div className="rounded-lg bg-purple-50 p-2 dark:bg-purple-950">
                                    <Users className="size-4 text-purple-600" />
                                </div>
                                <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600">
                                    <ArrowUpRight className="size-3" /> 15%
                                </span>
                            </div>
                            <div className="mt-3">
                                <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                                <p className="text-xs text-muted-foreground">Total User</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div className="rounded-lg bg-cyan-50 p-2 dark:bg-cyan-950">
                                    <TrendingUp className="size-4 text-cyan-600" />
                                </div>
                                <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600">
                                    <ArrowUpRight className="size-3" /> 22%
                                </span>
                            </div>
                            <div className="mt-3">
                                <p className="text-2xl font-bold">1.2jt</p>
                                <p className="text-xs text-muted-foreground">Total Transaksi</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid gap-4 lg:grid-cols-5">
                    <Card className="lg:col-span-3">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Tenant & Revenue Growth</CardTitle>
                            <CardDescription>Pertumbuhan tenant dan pendapatan bulanan</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={combinedGrowth} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorTenants" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                                                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', fontSize: '13px' }}
                                        />
                                        <Area type="monotone" dataKey="tenants" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorTenants)" name="Tenants" />
                                        <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue (jt)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-2">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Active Users</CardTitle>
                            <CardDescription>Pengguna aktif per hari minggu ini</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={activeUsersData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                        <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', fontSize: '13px' }}
                                        />
                                        <Bar dataKey="users" fill="#2563EB" radius={[6, 6, 0, 0]} name="Users" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Tenants Table */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-base">Recent Tenants</CardTitle>
                                <CardDescription>Tenant terbaru yang bergabung</CardDescription>
                            </div>
                            <Button variant="outline" size="sm">Lihat Semua</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Tenant</TableHead>
                                    <TableHead>Domain</TableHead>
                                    <TableHead>Paket</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentTenants.map((tenant: any) => (
                                    <TableRow key={tenant.domain}>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">{tenant.name}</p>
                                                <p className="text-xs text-muted-foreground">{tenant.users} users</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">{tenant.domain}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="font-medium">{tenant.plan}</Badge>
                                        </TableCell>
                                        <TableCell><StatusBadge status={tenant.status} /></TableCell>
                                        <TableCell className="text-muted-foreground">{tenant.date}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="size-8">
                                                        <MoreHorizontal className="size-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem><Eye className="mr-2 size-4" /> Detail</DropdownMenuItem>
                                                    <DropdownMenuItem><Ban className="mr-2 size-4" /> Suspend</DropdownMenuItem>
                                                    <DropdownMenuItem><RotateCcw className="mr-2 size-4" /> Reset</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 size-4" /> Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Bottom Section: Trial Monitoring + System Health */}
                <div className="grid gap-4 lg:grid-cols-2">
                    {/* Trial Monitoring */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Trial Monitoring</CardTitle>
                            <CardDescription>Tenant dalam masa percobaan</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-5">
                                {trialMonitor.map((t: any) => (
                                    <div key={t.name} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium">{t.name}</p>
                                                <p className="text-xs text-muted-foreground">{t.plan}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`text-sm font-bold ${t.remaining <= 3 ? 'text-red-600' : t.remaining <= 7 ? 'text-amber-600' : 'text-emerald-600'}`}>
                                                    {t.remaining} hari
                                                </span>
                                                <p className="text-xs text-muted-foreground">tersisa</p>
                                            </div>
                                        </div>
                                        <Progress value={(t.remaining / t.total) * 100} className="h-1.5" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* System Health */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">System Health</CardTitle>
                            <CardDescription>Status infrastruktur platform</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                {systemHealth.map((sys) => (
                                    <div key={sys.name} className="flex items-start gap-3 rounded-xl border p-4">
                                        <div className={`rounded-lg p-2 ${sys.status === 'healthy' ? 'bg-emerald-50 dark:bg-emerald-950' : 'bg-amber-50 dark:bg-amber-950'}`}>
                                            <sys.icon className={`size-4 ${sys.status === 'healthy' ? 'text-emerald-600' : 'text-amber-600'}`} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{sys.name}</p>
                                            <HealthBadge status={sys.status} />
                                            <p className="mt-1 text-xs text-muted-foreground">{sys.uptime}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
