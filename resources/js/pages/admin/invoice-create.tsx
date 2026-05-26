import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, X, ArrowLeft, Receipt } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { dashboard } from '@/routes';

function formatRupiah(amount: number | string) {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
}

type InvoiceItemForm = {
    description: string;
    quantity: number;
    unit_price: number;
};

export default function InvoiceCreate({ tenants }: any) {
    const [items, setItems] = useState<InvoiceItemForm[]>([
        { description: '', quantity: 1, unit_price: 0 },
    ]);

    const form = useForm({
        tenant_id: '',
        subscription_id: '',
        issue_date: new Date().toISOString().split('T')[0],
        due_date: '',
        billing_period_start: '',
        billing_period_end: '',
        tax_rate: '0',
        notes: '',
        items: [] as InvoiceItemForm[],
    });

    // Items management
    const addItem = () => setItems([...items, { description: '', quantity: 1, unit_price: 0 }]);
    const removeItem = (index: number) => {
        if (items.length > 1) setItems(items.filter((_, i) => i !== index));
    };
    const updateItem = (index: number, field: keyof InvoiceItemForm, value: string | number) => {
        const updated = [...items];
        (updated[index] as any)[field] = value;
        setItems(updated);
    };

    const getSubtotal = () => items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    const getTaxAmount = () => getSubtotal() * (parseFloat(form.data.tax_rate) || 0) / 100;
    const getTotal = () => getSubtotal() + getTaxAmount();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Use transform to ensure items are sent
        form.transform((data) => ({
            ...data,
            items: items,
        }));

        form.post('/admin/invoices');
    };

    const handleTenantChange = (val: string) => {
        form.setData('tenant_id', val);
        
        // Auto-populate data based on the selected tenant's active subscription
        const selectedTenant = tenants?.find((t: any) => t.id.toString() === val);
        
        if (selectedTenant && selectedTenant.active_subscription && selectedTenant.active_subscription.plan) {
            const sub = selectedTenant.active_subscription;
            const plan = sub.plan;
            
            // Set subscription ID and default billing periods based on the active subscription dates
            form.setData((data) => ({
                ...data,
                tenant_id: val,
                subscription_id: sub.id.toString(),
                billing_period_start: sub.start_date ? new Date(sub.start_date).toISOString().split('T')[0] : '',
                billing_period_end: sub.end_date ? new Date(sub.end_date).toISOString().split('T')[0] : '',
            }));

            setItems([{
                description: `Langganan Aplikasi Kasir - Paket ${plan.name}`,
                quantity: plan.duration_days >= 30 ? Math.round(plan.duration_days / 30) : 1, // Default duration in months based on plan
                unit_price: parseFloat(plan.price) || 0
            }]);
        } else {
            form.setData('subscription_id', '');
        }
    };

    return (
        <>
            <Head title="Buat Invoice" />
            <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto w-full">
                {/* Page Header */}
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => router.get('/admin/invoices')}>
                        <ArrowLeft className="size-4" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Buat Invoice Baru</h1>
                        <p className="text-sm text-muted-foreground">Isi detail invoice dan tambahkan item layanan.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Column - Main Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Receipt className="size-5 text-blue-600" />
                                    Informasi Invoice
                                </CardTitle>
                                <CardDescription>Data langganan akan otomatis terisi saat memilih tenant.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-2 sm:col-span-2">
                                        <Label>Tenant *</Label>
                                        <Select
                                            value={form.data.tenant_id}
                                            onValueChange={handleTenantChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih tenant" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {tenants?.map((t: any) => (
                                                    <SelectItem key={t.id} value={t.id.toString()}>
                                                        {t.business_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {form.errors.tenant_id && <p className="text-xs text-red-500">{form.errors.tenant_id}</p>}
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label>Tanggal Invoice *</Label>
                                        <Input
                                            type="date"
                                            value={form.data.issue_date}
                                            onChange={(e) => form.setData('issue_date', e.target.value)}
                                        />
                                        {form.errors.issue_date && <p className="text-xs text-red-500">{form.errors.issue_date}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Jatuh Tempo *</Label>
                                        <Input
                                            type="date"
                                            value={form.data.due_date}
                                            onChange={(e) => form.setData('due_date', e.target.value)}
                                        />
                                        {form.errors.due_date && <p className="text-xs text-red-500">{form.errors.due_date}</p>}
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label>Periode Langganan (Mulai)</Label>
                                        <Input
                                            type="date"
                                            value={form.data.billing_period_start}
                                            onChange={(e) => form.setData('billing_period_start', e.target.value)}
                                        />
                                        {form.errors.billing_period_start && <p className="text-xs text-red-500">{form.errors.billing_period_start}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Periode Langganan (Selesai)</Label>
                                        <Input
                                            type="date"
                                            value={form.data.billing_period_end}
                                            onChange={(e) => form.setData('billing_period_end', e.target.value)}
                                        />
                                        {form.errors.billing_period_end && <p className="text-xs text-red-500">{form.errors.billing_period_end}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <div>
                                    <CardTitle>Item Layanan</CardTitle>
                                    <CardDescription>Rincian tagihan invoice</CardDescription>
                                </div>
                                <Button type="button" variant="outline" size="sm" onClick={addItem} className="gap-1">
                                    <Plus className="size-3" /> Tambah Item
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-lg border overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="min-w-[200px] pl-4">Deskripsi Layanan</TableHead>
                                                <TableHead className="w-[120px]">Durasi (Bulan)</TableHead>
                                                <TableHead className="w-[180px]">Harga per Bulan</TableHead>
                                                <TableHead className="w-[150px] text-right">Total</TableHead>
                                                <TableHead className="w-[50px]"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {items.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="pl-4">
                                                        <Input
                                                            placeholder="Cth: Paket Pro"
                                                            value={item.description}
                                                            onChange={(e) => updateItem(index, 'description', e.target.value)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Input
                                                            type="number"
                                                            min="1"
                                                            value={item.quantity}
                                                            onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Input
                                                            type="number"
                                                            min="0"
                                                            value={item.unit_price}
                                                            onChange={(e) => updateItem(index, 'unit_price', parseFloat(e.target.value) || 0)}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <span className="text-sm font-medium">
                                                            {formatRupiah(item.quantity * item.unit_price)}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        {items.length > 1 && (
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                className="size-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                                onClick={() => removeItem(index)}
                                                            >
                                                                <X className="size-4" />
                                                            </Button>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Summary & Actions */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Ringkasan Tagihan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Pajak (%)</Label>
                                    <Input
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="0.01"
                                        value={form.data.tax_rate}
                                        onChange={(e) => form.setData('tax_rate', e.target.value)}
                                    />
                                </div>
                                
                                <div className="space-y-2 rounded-lg bg-slate-50 p-4 dark:bg-slate-900 border">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>{formatRupiah(getSubtotal())}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Pajak ({form.data.tax_rate}%)</span>
                                        <span>{formatRupiah(getTaxAmount())}</span>
                                    </div>
                                    <div className="flex justify-between border-t border-slate-200 dark:border-slate-800 pt-3 mt-3 text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-blue-600 dark:text-blue-400">{formatRupiah(getTotal())}</span>
                                    </div>
                                </div>
                                
                                <div className="space-y-2 border-t pt-4">
                                    <Label>Catatan (Opsional)</Label>
                                    <Textarea
                                        placeholder="Catatan tambahan untuk invoice..."
                                        value={form.data.notes}
                                        onChange={(e) => form.setData('notes', e.target.value)}
                                        rows={4}
                                    />
                                </div>
                            </CardContent>
                            <div className="p-6 pt-0 flex flex-col gap-3">
                                <Button type="submit" size="lg" className="w-full" disabled={form.processing}>
                                    {form.processing ? 'Menyimpan...' : 'Simpan Invoice'}
                                </Button>
                                <Button type="button" variant="outline" size="lg" className="w-full" onClick={() => router.get('/admin/invoices')}>
                                    Batal
                                </Button>
                            </div>
                        </Card>
                    </div>
                </form>
            </div>
        </>
    );
}

InvoiceCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Invoice', href: '/admin/invoices' },
        { title: 'Buat Baru', href: '/admin/invoices/create' },
    ],
};
