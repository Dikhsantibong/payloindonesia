import { Head } from '@inertiajs/react';
import {
    TrendingUp,
    TrendingDown,
    Users,
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts';
import { dashboard } from '@/routes';

const COLORS = ['#94a3b8', '#2563EB', '#0F172A'];

export default function Analytics({ stats, tenantGrowthChurn, mrrGrowth, conversionData, planDistribution }: any) {
    return (
        <>
            <Head title="Analytics" />
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
                    <p className="text-sm text-muted-foreground">Insight mendalam tentang performa platform Paylo</p>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardContent className="p-5">
                            <p className="text-sm text-muted-foreground">MRR</p>
                            <p className="text-2xl font-bold mt-1">Rp {Math.round(stats.mrr / 1000000)}jt</p>
                            <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600 mt-1">
                                <ArrowUpRight className="size-3" /> 10.1% vs bulan lalu
                            </span>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-5">
                            <p className="text-sm text-muted-foreground">Churn Rate</p>
                            <p className="text-2xl font-bold mt-1">{stats.churnRate}%</p>
                            <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600 mt-1">
                                <ArrowDownRight className="size-3" /> 0.3% improvement
                            </span>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-5">
                            <p className="text-sm text-muted-foreground">Trial Conversion</p>
                            <p className="text-2xl font-bold mt-1">{stats.conversionRate}%</p>
                            <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600 mt-1">
                                <ArrowUpRight className="size-3" /> 4% vs bulan lalu
                            </span>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-5">
                            <p className="text-sm text-muted-foreground">Active Users (DAU)</p>
                            <p className="text-2xl font-bold mt-1">{stats.dau.toLocaleString()}</p>
                            <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600 mt-1">
                                <ArrowUpRight className="size-3" /> 12% vs minggu lalu
                            </span>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="growth" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="growth">Tenant Growth</TabsTrigger>
                        <TabsTrigger value="revenue">Revenue</TabsTrigger>
                        <TabsTrigger value="conversion">Conversion</TabsTrigger>
                        <TabsTrigger value="distribution">Plan Distribution</TabsTrigger>
                    </TabsList>

                    <TabsContent value="growth">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Tenant Growth vs Churn</CardTitle>
                                <CardDescription>Perbandingan tenant baru dan churn per bulan</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[350px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={tenantGrowthChurn} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
                                            <Bar dataKey="new" fill="#2563EB" radius={[4, 4, 0, 0]} name="New Tenants" />
                                            <Bar dataKey="churned" fill="#f87171" radius={[4, 4, 0, 0]} name="Churned" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="revenue">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Monthly Recurring Revenue (MRR)</CardTitle>
                                <CardDescription>Pertumbuhan pendapatan bulanan dalam jutaan rupiah</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[350px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={mrrGrowth} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                                                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
                                            <Area type="monotone" dataKey="mrr" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorMrr)" name="MRR (jt)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="conversion">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Trial to Paid Conversion Rate</CardTitle>
                                <CardDescription>Persentase konversi dari trial ke berbayar</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[350px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={conversionData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit="%" />
                                            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
                                            <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={2} dot={{ r: 4, fill: '#10B981' }} name="Conversion %" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="distribution">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Plan Distribution</CardTitle>
                                <CardDescription>Sebaran paket langganan tenant aktif</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-center gap-12">
                                    <div className="h-[300px] w-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={planDistribution}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={70}
                                                    outerRadius={120}
                                                    paddingAngle={4}
                                                    dataKey="value"
                                                    strokeWidth={0}
                                                >
                                                    {planDistribution.map((entry: any, i: number) => (
                                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="space-y-4">
                                        {planDistribution.map((p: any, i: number) => (
                                            <div key={p.name} className="flex items-center gap-3">
                                                <div className="size-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                                <div>
                                                    <p className="text-sm font-medium">{p.name}</p>
                                                    <p className="text-xs text-muted-foreground">{p.value} tenants</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}

Analytics.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Analytics', href: '/admin/analytics' },
    ],
};
