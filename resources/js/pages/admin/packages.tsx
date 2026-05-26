import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    PackageSearch,
    Plus,
    MoreHorizontal,
    Edit,
    Trash2,
    Users,
    ShoppingCart,
    Clock,
    CheckCircle2,
    XCircle,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { dashboard } from '@/routes';

export default function Packages({ packages }: any) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPackage, setEditingPackage] = useState<any>(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        price: '',
        max_users: '',
        max_products: '',
        duration_days: '30',
        features: '',
        is_active: true,
    });

    const openDialog = (pkg: any = null) => {
        setEditingPackage(pkg);
        if (pkg) {
            setData({
                name: pkg.name,
                price: pkg.price.toString(),
                max_users: pkg.max_users.toString(),
                max_products: pkg.max_products.toString(),
                duration_days: pkg.duration_days.toString(),
                features: Array.isArray(pkg.features) ? pkg.features.join('\n') : '',
                is_active: pkg.is_active,
            });
        } else {
            reset();
            setData('is_active', true);
        }
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setEditingPackage(null);
        reset();
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Convert features string to array
        const payload = {
            ...data,
            features: data.features.split('\n').filter((f) => f.trim() !== ''),
        };

        if (editingPackage) {
            router.put(`/admin/packages/${editingPackage.id}`, payload, {
                onSuccess: () => closeDialog(),
            });
        } else {
            router.post('/admin/packages', payload, {
                onSuccess: () => closeDialog(),
            });
        }
    };

    const handleDelete = (pkg: any) => {
        if (confirm(`Apakah Anda yakin ingin menghapus paket ${pkg.name}?`)) {
            router.delete(`/admin/packages/${pkg.id}`);
        }
    };

    return (
        <>
            <Head title="Subscription Packages" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Subscription Packages</h1>
                        <p className="text-sm text-muted-foreground">Kelola paket langganan dan harganya</p>
                    </div>
                    <Button onClick={() => openDialog()} className="gap-2">
                        <Plus className="size-4" /> Tambah Paket
                    </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {packages.map((pkg: any) => (
                        <Card key={pkg.id} className={pkg.is_active ? '' : 'opacity-70 grayscale'}>
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            {pkg.name}
                                            {!pkg.is_active && <Badge variant="destructive">Inactive</Badge>}
                                        </CardTitle>
                                        <CardDescription className="mt-1">
                                            Rp {Number(pkg.price).toLocaleString('id-ID')} / {pkg.duration_days} hari
                                        </CardDescription>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="-mr-2 size-8">
                                                <MoreHorizontal className="size-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => openDialog(pkg)}>
                                                <Edit className="mr-2 size-4" /> Edit Paket
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => handleDelete(pkg)} className="text-red-600">
                                                <Trash2 className="mr-2 size-4" /> Hapus Paket
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div className="flex items-center gap-2 rounded-lg border p-2">
                                            <Users className="size-4 text-blue-500" />
                                            <div>
                                                <p className="font-semibold">{pkg.max_users}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase">Max Users</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 rounded-lg border p-2">
                                            <ShoppingCart className="size-4 text-emerald-500" />
                                            <div>
                                                <p className="font-semibold">{pkg.max_products}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase">Products</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900">
                                        <p className="text-xs font-semibold mb-2">Active Subscriptions</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold">{pkg.subscriptions_count}</span>
                                            <span className="text-xs text-muted-foreground">tenants</span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold mb-2">Features</p>
                                        <ul className="space-y-1.5">
                                            {Array.isArray(pkg.features) && pkg.features.map((feature: string, i: number) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <CheckCircle2 className="size-3.5 mt-0.5 text-emerald-500 shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editingPackage ? 'Edit Paket' : 'Tambah Paket Baru'}</DialogTitle>
                        <DialogDescription>
                            Konfigurasi limitasi dan harga untuk paket ini.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Paket</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Contoh: Pro, Enterprise"
                                required
                            />
                            {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Harga (Rp)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    placeholder="99000"
                                    required
                                />
                                {errors.price && <p className="text-xs text-red-600">{errors.price}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="duration_days">Durasi (Hari)</Label>
                                <Input
                                    id="duration_days"
                                    type="number"
                                    value={data.duration_days}
                                    onChange={(e) => setData('duration_days', e.target.value)}
                                    placeholder="30"
                                    required
                                />
                                {errors.duration_days && <p className="text-xs text-red-600">{errors.duration_days}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="max_users">Max Users</Label>
                                <Input
                                    id="max_users"
                                    type="number"
                                    value={data.max_users}
                                    onChange={(e) => setData('max_users', e.target.value)}
                                    placeholder="10"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="max_products">Max Produk</Label>
                                <Input
                                    id="max_products"
                                    type="number"
                                    value={data.max_products}
                                    onChange={(e) => setData('max_products', e.target.value)}
                                    placeholder="1000"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="features">Fitur (Satu per baris)</Label>
                            <textarea
                                id="features"
                                value={data.features}
                                onChange={(e) => setData('features', e.target.value)}
                                placeholder="Basic POS&#10;Laporan Standar&#10;Support Email"
                                rows={4}
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                                <Label htmlFor="is_active">Status Aktif</Label>
                                <p className="text-xs text-muted-foreground">Paket aktif dapat dibeli oleh tenant.</p>
                            </div>
                            <input
                                id="is_active"
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={closeDialog}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan Paket'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

Packages.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Packages', href: '/admin/packages' },
    ],
};
