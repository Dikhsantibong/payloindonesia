import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    Search,
    Filter,
    MoreHorizontal,
    Edit,
    CreditCard,
    Calendar,
    Building2,
    CheckCircle2,
    Clock,
    XCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { dashboard } from '@/routes';

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        trial: 'bg-amber-50 text-amber-700 border-amber-200',
        expired: 'bg-slate-50 text-slate-700 border-slate-200',
        cancelled: 'bg-red-50 text-red-700 border-red-200',
    };
    
    return (
        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold capitalize ${styles[status] || styles.expired}`}>
            {status}
        </span>
    );
}

function PaymentBadge({ status }: { status: string }) {
    if (status === 'paid') return <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600"><CheckCircle2 className="size-3.5" /> Paid</span>;
    if (status === 'pending') return <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600"><Clock className="size-3.5" /> Pending</span>;
    return <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600"><XCircle className="size-3.5" /> Failed</span>;
}

export default function Subscriptions({ subscriptions, plans, filters }: any) {
    const [search, setSearch] = useState(filters?.search || '');
    const [filterStatus, setFilterStatus] = useState(filters?.status || 'all');
    const [filterPlan, setFilterPlan] = useState(filters?.plan || 'all');
    
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingSub, setEditingSub] = useState<any>(null);

    const { data, setData, put, processing, reset } = useForm({
        status: '',
        payment_status: '',
    });

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            applyFilters();
        }
    };

    const applyFilters = (key?: string, val?: string) => {
        const query = {
            search,
            status: key === 'status' ? val : filterStatus,
            plan: key === 'plan' ? val : filterPlan,
        };
        router.get('/admin/subscriptions', query, { preserveState: true, preserveScroll: true });
    };

    const openDialog = (sub: any) => {
        setEditingSub(sub);
        setData({
            status: sub.status,
            payment_status: sub.payment_status,
        });
        setIsDialogOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingSub) return;
        
        put(`/admin/subscriptions/${editingSub.id}`, {
            onSuccess: () => {
                setIsDialogOpen(false);
                setEditingSub(null);
            },
        });
    };

    return (
        <>
            <Head title="Subscriptions" />
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Subscriptions</h1>
                    <p className="text-sm text-muted-foreground">Kelola langganan tenant dan status pembayarannya</p>
                </div>
                
                {/* Filters */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Cari nama tenant atau domain... (Tekan Enter)"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={handleSearch}
                                    className="pl-9"
                                />
                            </div>
                            <Select 
                                value={filterPlan} 
                                onValueChange={(val) => { setFilterPlan(val); applyFilters('plan', val); }}
                            >
                                <SelectTrigger className="w-[160px]">
                                    <Filter className="mr-2 size-4" />
                                    <SelectValue placeholder="Filter Paket" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Paket</SelectItem>
                                    {plans?.map((p: any) => (
                                        p ? <SelectItem key={p.id} value={p.id.toString()}>{p.name}</SelectItem> : null
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select 
                                value={filterStatus} 
                                onValueChange={(val) => { setFilterStatus(val); applyFilters('status', val); }}
                            >
                                <SelectTrigger className="w-[160px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="trial">Trial</SelectItem>
                                    <SelectItem value="expired">Expired</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="pl-6">Tenant</TableHead>
                                    <TableHead>Paket</TableHead>
                                    <TableHead>Mulai</TableHead>
                                    <TableHead>Berakhir</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Pembayaran</TableHead>
                                    <TableHead className="text-right pr-6">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {subscriptions?.data?.map((sub: any) => (
                                    sub ? <TableRow key={sub.id}>
                                        <TableCell className="pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-950">
                                                    <Building2 className="size-4 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{sub.tenant?.business_name}</p>
                                                    <p className="text-xs text-muted-foreground">{sub.tenant?.domain}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{sub.plan?.name || 'Unknown'}</Badge>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {new Date(sub.start_date).toLocaleDateString('id-ID')}
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {new Date(sub.end_date).toLocaleDateString('id-ID')}
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={sub.status} />
                                        </TableCell>
                                        <TableCell>
                                            <PaymentBadge status={sub.payment_status} />
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="size-8">
                                                        <MoreHorizontal className="size-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => openDialog(sub)}>
                                                        <Edit className="mr-2 size-4" /> Ubah Status
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <CreditCard className="mr-2 size-4" /> Riwayat Tagihan
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow> : null
                                ))}
                                {subscriptions.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                            Tidak ada data langganan yang ditemukan.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        
                        <div className="flex items-center justify-between border-t px-6 py-4">
                            <p className="text-sm text-muted-foreground">
                                Menampilkan {subscriptions.from || 0} - {subscriptions.to || 0} dari {subscriptions.total} data
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={!subscriptions.prev_page_url}
                                    onClick={() => router.get(subscriptions.prev_page_url)}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={!subscriptions.next_page_url}
                                    onClick={() => router.get(subscriptions.next_page_url)}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Edit Status Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Ubah Status Langganan</DialogTitle>
                        <DialogDescription>
                            Perbarui status langganan dan pembayaran untuk tenant {editingSub?.tenant?.business_name}.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Status Langganan</Label>
                            <Select value={data.status} onValueChange={(val) => setData('status', val)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="trial">Trial</SelectItem>
                                    <SelectItem value="expired">Expired</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Status Pembayaran</Label>
                            <Select value={data.payment_status} onValueChange={(val) => setData('payment_status', val)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih status pembayaran" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="paid">Paid</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="failed">Failed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

Subscriptions.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Subscriptions', href: '/admin/subscriptions' },
    ],
};
