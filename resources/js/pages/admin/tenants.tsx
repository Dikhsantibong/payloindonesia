import { Head } from '@inertiajs/react';
import { useState } from 'react';
import {
    Building2,
    Search,
    Filter,
    Plus,
    Eye,
    Ban,
    RotateCcw,
    Trash2,
    MoreHorizontal,
    LogIn,
    Download,
    Users,
    CreditCard,
    HardDrive,
    X,
    Phone,
    Calendar,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { dashboard } from '@/routes';

import { router, useForm } from '@inertiajs/react';

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        trial: 'bg-amber-50 text-amber-700 border-amber-200',
        suspended: 'bg-red-50 text-red-700 border-red-200',
    };
    return (
        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${styles[status] || ''}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

export default function Tenants({ tenants, plans, filters }: any) {
    const [search, setSearch] = useState(filters?.search || '');
    const [filterStatus, setFilterStatus] = useState(filters?.status || 'all');
    const [selectedTenant, setSelectedTenant] = useState<any>(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [tenantToDelete, setTenantToDelete] = useState<any>(null);

    const handleDeleteTenant = () => {
        if (!tenantToDelete) return;
        router.delete(`/admin/tenants/${tenantToDelete.id}`, {
            onSuccess: () => {
                setTenantToDelete(null);
                setSelectedTenant(null);
            },
            preserveScroll: true
        });
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        business_name: '',
        email: '',
        phone: '',
        plan_id: '',
        owner_name: '',
        owner_email: '',
    });

    const submitTenant = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/tenants', {
            onSuccess: () => {
                setIsAddDialogOpen(false);
                reset();
            },
        });
    };

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.get(
                '/admin/tenants',
                { search, status: filterStatus },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }
    };

    const handleFilterChange = (val: string) => {
        setFilterStatus(val);
        router.get(
            '/admin/tenants',
            { search, status: val },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    return (
        <>
            <Head title="Tenant Management" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Tenant Management</h1>
                        <p className="text-sm text-muted-foreground">Kelola semua tenant yang terdaftar di platform Paylo</p>
                    </div>
                    <Button className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
                        <Plus className="size-4" />
                        Tambah Tenant
                    </Button>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Cari tenant atau domain... (Tekan Enter)"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={handleSearch}
                                    className="pl-9"
                                />
                            </div>
                            <Select value={filterStatus} onValueChange={handleFilterChange}>
                                <SelectTrigger className="w-[160px]">
                                    <Filter className="mr-2 size-4" />
                                    <SelectValue placeholder="Filter status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="trial">Trial</SelectItem>
                                    <SelectItem value="suspended">Suspended</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="icon">
                                <Download className="size-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Data Table */}
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="pl-6">Tenant</TableHead>
                                    <TableHead>Domain</TableHead>
                                    <TableHead>Owner</TableHead>
                                    <TableHead>Paket</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Users</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead className="text-right pr-6">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tenants.data.map((tenant: any) => (
                                    <TableRow key={tenant.id} className="cursor-pointer" onClick={() => setSelectedTenant(tenant)}>
                                        <TableCell className="pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600 dark:bg-blue-950">
                                                    {tenant.name.charAt(0)}
                                                </div>
                                                <p className="font-medium">{tenant.name}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground font-mono text-xs">{tenant.domain}</TableCell>
                                        <TableCell className="text-muted-foreground">{tenant.owner}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{tenant.plan}</Badge>
                                        </TableCell>
                                        <TableCell><StatusBadge status={tenant.status} /></TableCell>
                                        <TableCell className="text-muted-foreground">{tenant.users}</TableCell>
                                        <TableCell className="text-muted-foreground">{tenant.date}</TableCell>
                                        <TableCell className="text-right pr-6" onClick={(e) => e.stopPropagation()}>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="size-8">
                                                        <MoreHorizontal className="size-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => setSelectedTenant(tenant)}>
                                                        <Eye className="mr-2 size-4" /> Detail
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <LogIn className="mr-2 size-4" /> Login as Tenant
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <Ban className="mr-2 size-4" /> Suspend
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <RotateCcw className="mr-2 size-4" /> Reset
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600" onClick={() => setTenantToDelete(tenant)}>
                                                        <Trash2 className="mr-2 size-4" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {/* Pagination */}
                        <div className="flex items-center justify-between border-t px-6 py-4">
                            <p className="text-sm text-muted-foreground">
                                Menampilkan {tenants.from || 0} - {tenants.to || 0} dari {tenants.total} tenant
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={!tenants.prev_page_url}
                                    onClick={() => router.get(tenants.prev_page_url)}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={!tenants.next_page_url}
                                    onClick={() => router.get(tenants.next_page_url)}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tenant Detail Dialog */}
            <Dialog open={!!selectedTenant} onOpenChange={() => setSelectedTenant(null)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Detail Tenant</DialogTitle>
                        <DialogDescription>{selectedTenant?.domain}</DialogDescription>
                    </DialogHeader>
                    {selectedTenant && (
                        <div className="space-y-5">
                            <div className="flex items-center gap-4">
                                <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600">
                                    {selectedTenant.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold">{selectedTenant.name}</h3>
                                    <p className="text-sm text-muted-foreground">{selectedTenant.owner} • {selectedTenant.email}</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 rounded-xl border p-3">
                                    <div className="rounded-lg bg-blue-50 p-2"><CreditCard className="size-4 text-blue-600" /></div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Subscription</p>
                                        <p className="text-sm font-bold">{selectedTenant.plan}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-xl border p-3">
                                    <div className="rounded-lg bg-purple-50 p-2"><Users className="size-4 text-purple-600" /></div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Total User</p>
                                        <p className="text-sm font-bold">{selectedTenant.users_count ?? selectedTenant.users ?? 0}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-xl border p-3">
                                    <div className="rounded-lg bg-emerald-50 p-2"><Phone className="size-4 text-emerald-600" /></div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">No. Telepon</p>
                                        <p className="text-sm font-bold">{selectedTenant.phone || '-'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-xl border p-3">
                                    <div className="rounded-lg bg-amber-50 p-2"><Calendar className="size-4 text-amber-600" /></div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Mulai Sejak</p>
                                        <p className="text-sm font-bold">{selectedTenant.date}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 rounded-xl border p-4 bg-slate-50/50">
                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Catatan Manual Administrasi</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Sistem pendaftaran dan pengelolaan tenant ini bersifat pencatatan manual. Durasi langganan, pelaporan transaksi, dan batas penggunaan dinilai secara manual oleh Administrator.
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1 gap-2">
                                    <LogIn className="size-4" /> Login as Tenant
                                </Button>
                                <Button 
                                    type="button"
                                    variant="destructive" 
                                    className="gap-2"
                                    onClick={() => setTenantToDelete(selectedTenant)}
                                >
                                    <Trash2 className="size-4" /> Hapus Tenant
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
            {/* Add Tenant Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Tambah Tenant Baru</DialogTitle>
                        <DialogDescription>
                            Daftarkan tenant baru ke platform. Tenant akan otomatis mendapatkan domain paylo.id.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitTenant}>
                        <div className="grid grid-cols-2 gap-6 py-4">
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Informasi Bisnis</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="business_name">Nama Bisnis</Label>
                                    <Input
                                        id="business_name"
                                        placeholder="Contoh: Toko Maju Jaya"
                                        value={data.business_name}
                                        onChange={(e) => setData('business_name', e.target.value)}
                                    />
                                    {errors.business_name && <p className="text-xs text-red-600">{errors.business_name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Bisnis</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="admin@bisnis.com"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">No. Telepon</Label>
                                    <Input
                                        id="phone"
                                        placeholder="08123456789"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                    />
                                    {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="plan_id">Pilih Paket</Label>
                                    <Select value={data.plan_id} onValueChange={(v) => setData('plan_id', v)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih paket langganan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {plans.map((plan: any) => (
                                                <SelectItem key={plan.id} value={plan.id.toString()}>
                                                    {plan.name} - Rp {Number(plan.price).toLocaleString('id-ID')}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.plan_id && <p className="text-xs text-red-600">{errors.plan_id}</p>}
                                </div>
                            </div>

                            <div className="space-y-4 border-l pl-6">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Informasi Pemilik</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="owner_name">Nama Pemilik</Label>
                                    <Input
                                        id="owner_name"
                                        placeholder="Nama lengkap pemilik"
                                        value={data.owner_name}
                                        onChange={(e) => setData('owner_name', e.target.value)}
                                    />
                                    {errors.owner_name && <p className="text-xs text-red-600">{errors.owner_name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="owner_email">Email Pemilik</Label>
                                    <Input
                                        id="owner_email"
                                        type="email"
                                        placeholder="owner@bisnis.com"
                                        value={data.owner_email}
                                        onChange={(e) => setData('owner_email', e.target.value)}
                                    />
                                    {errors.owner_email && <p className="text-xs text-red-600">{errors.owner_email}</p>}
                                </div>
                                <div className="rounded-lg bg-amber-50 p-3 text-xs text-amber-700 border border-amber-200 mt-4">
                                    <p className="font-bold mb-1">Catatan:</p>
                                    <p>Tenant baru akan otomatis mendapatkan masa trial selama 14 hari. Password default untuk pemilik adalah <strong>password</strong>.</p>
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="border-t pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Memproses...' : 'Daftarkan Tenant'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Tenant Confirmation Dialog */}
            <Dialog open={!!tenantToDelete} onOpenChange={() => setTenantToDelete(null)}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Hapus Tenant</DialogTitle>
                        <DialogDescription>
                            Tindakan ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 py-4">
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Apakah Anda yakin ingin menghapus tenant <strong className="text-slate-800">{tenantToDelete?.name}</strong> ({tenantToDelete?.domain})?
                        </p>
                        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                            Peringatan: Seluruh data pengguna, transaksi, produk, absensi, dan pengaturan yang berhubungan dengan tenant ini akan dihapus secara permanen dari database.
                        </p>
                    </div>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button type="button" variant="outline" onClick={() => setTenantToDelete(null)}>
                            Batal
                        </Button>
                        <Button type="button" variant="destructive" onClick={handleDeleteTenant}>
                            Ya, Hapus Permanen
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

Tenants.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Tenant Management', href: '/admin/tenants' },
    ],
};
