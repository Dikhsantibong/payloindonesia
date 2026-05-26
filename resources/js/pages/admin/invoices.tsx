import { Head, router, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    Search,
    Plus,
    MoreHorizontal,
    FileText,
    CheckCircle2,
    Clock,
    XCircle,
    Send,
    Trash2,
    DollarSign,
    Receipt,
    AlertTriangle,
    X,
    FileDown,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
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
        draft: 'bg-slate-50 text-slate-700 border-slate-200',
        sent: 'bg-blue-50 text-blue-700 border-blue-200',
        paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        overdue: 'bg-red-50 text-red-700 border-red-200',
        cancelled: 'bg-gray-50 text-gray-500 border-gray-200',
    };

    const icons: Record<string, React.ReactNode> = {
        draft: <FileText className="size-3" />,
        sent: <Send className="size-3" />,
        paid: <CheckCircle2 className="size-3" />,
        overdue: <AlertTriangle className="size-3" />,
        cancelled: <XCircle className="size-3" />,
    };

    const labels: Record<string, string> = {
        draft: 'Draft',
        sent: 'Terkirim',
        paid: 'Lunas',
        overdue: 'Jatuh Tempo',
        cancelled: 'Dibatalkan',
    };

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[status] || styles.draft}`}>
            {icons[status]}
            {labels[status] || status}
        </span>
    );
}

function formatRupiah(amount: number | string) {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
}

type InvoiceItemForm = {
    description: string;
    quantity: number;
    unit_price: number;
};

export default function Invoices({ invoices, tenants, stats, filters }: any) {
    const [search, setSearch] = useState(filters?.search || '');
    const [filterStatus, setFilterStatus] = useState(filters?.status || 'all');

    // Status dialog
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [editingInvoice, setEditingInvoice] = useState<any>(null);
    const statusForm = useForm({ status: '' });

    // Detail dialog
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [detailInvoice, setDetailInvoice] = useState<any>(null);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') applyFilters();
    };

    const applyFilters = (key?: string, val?: string) => {
        const query = {
            search,
            status: key === 'status' ? val : filterStatus,
        };
        router.get('/admin/invoices', query, { preserveState: true, preserveScroll: true });
    };

    const openStatusDialog = (inv: any) => {
        setEditingInvoice(inv);
        statusForm.setData('status', inv.status);
        setIsStatusOpen(true);
    };

    const submitStatus = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingInvoice) return;
        statusForm.put(`/admin/invoices/${editingInvoice.id}/status`, {
            onSuccess: () => {
                setIsStatusOpen(false);
                setEditingInvoice(null);
            },
        });
    };

    const handleDelete = (inv: any) => {
        if (confirm(`Hapus invoice ${inv.invoice_number}?`)) {
            router.delete(`/admin/invoices/${inv.id}`);
        }
    };

    const openDetail = (inv: any) => {
        setDetailInvoice(inv);
        setIsDetailOpen(true);
    };

    return (
        <>
            <Head title="Invoice" />
            <div className="flex flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Invoice</h1>
                        <p className="text-sm text-muted-foreground">Buat dan kelola invoice untuk tenant</p>
                    </div>
                    <Link href="/admin/invoices/create">
                        <Button className="gap-2">
                            <Plus className="size-4" />
                            Buat Invoice
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="rounded-xl bg-blue-50 p-3 dark:bg-blue-950">
                                <Receipt className="size-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Invoice</p>
                                <p className="text-2xl font-bold">{stats?.total || 0}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-950">
                                <CheckCircle2 className="size-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Lunas</p>
                                <p className="text-2xl font-bold">{stats?.paid || 0}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="rounded-xl bg-amber-50 p-3 dark:bg-amber-950">
                                <Clock className="size-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Belum Dibayar</p>
                                <p className="text-2xl font-bold">{stats?.unpaid || 0}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="rounded-xl bg-purple-50 p-3 dark:bg-purple-950">
                                <DollarSign className="size-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Pendapatan</p>
                                <p className="text-lg font-bold">{formatRupiah(stats?.total_revenue || 0)}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Cari nomor invoice atau nama tenant... (Enter)"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={handleSearch}
                                    className="pl-9"
                                />
                            </div>
                            <Select
                                value={filterStatus}
                                onValueChange={(val) => { setFilterStatus(val); applyFilters('status', val); }}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Status</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="sent">Terkirim</SelectItem>
                                    <SelectItem value="paid">Lunas</SelectItem>
                                    <SelectItem value="overdue">Jatuh Tempo</SelectItem>
                                    <SelectItem value="cancelled">Dibatalkan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Table */}
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="pl-6">No. Invoice</TableHead>
                                    <TableHead>Tenant</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Jatuh Tempo</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right pr-6">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoices?.data?.map((inv: any) => (
                                    inv ? <TableRow key={inv.id} className="cursor-pointer hover:bg-muted/50" onClick={() => openDetail(inv)}>
                                        <TableCell className="pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-950">
                                                    <FileText className="size-4 text-blue-600" />
                                                </div>
                                                <span className="font-mono text-sm font-semibold">{inv.invoice_number}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <p className="font-medium text-sm">{inv.tenant?.business_name}</p>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {new Date(inv.issue_date).toLocaleDateString('id-ID')}
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {new Date(inv.due_date).toLocaleDateString('id-ID')}
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-semibold text-sm">{formatRupiah(inv.total)}</span>
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={inv.status} />
                                        </TableCell>
                                        <TableCell className="text-right pr-6" onClick={(e) => e.stopPropagation()}>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="size-8">
                                                        <MoreHorizontal className="size-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => openDetail(inv)}>
                                                        <FileText className="mr-2 size-4" /> Lihat Detail
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <a href={`/admin/invoices/${inv.id}/pdf`} target="_blank" className="flex w-full items-center px-2 py-1.5 text-sm cursor-pointer">
                                                            <FileDown className="mr-2 size-4 text-muted-foreground" /> Download PDF
                                                        </a>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => openStatusDialog(inv)}>
                                                        <Send className="mr-2 size-4" /> Ubah Status
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="text-red-600"
                                                        onClick={() => handleDelete(inv)}
                                                    >
                                                        <Trash2 className="mr-2 size-4" /> Hapus
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow> : null
                                ))}
                                {(!invoices?.data || invoices.data.length === 0) && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                                            <FileText className="mx-auto size-10 mb-3 opacity-30" />
                                            <p>Belum ada invoice yang dibuat.</p>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        {invoices?.data?.length > 0 && (
                            <div className="flex items-center justify-between border-t px-6 py-4">
                                <p className="text-sm text-muted-foreground">
                                    Menampilkan {invoices.from || 0} - {invoices.to || 0} dari {invoices.total} data
                                </p>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={!invoices.prev_page_url}
                                        onClick={() => router.get(invoices.prev_page_url)}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={!invoices.next_page_url}
                                        onClick={() => router.get(invoices.next_page_url)}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* =================== STATUS DIALOG =================== */}
            <Dialog open={isStatusOpen} onOpenChange={setIsStatusOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Ubah Status Invoice</DialogTitle>
                        <DialogDescription>
                            Perbarui status invoice {editingInvoice?.invoice_number}.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitStatus} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select
                                value={statusForm.data.status}
                                onValueChange={(val) => statusForm.setData('status', val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="sent">Terkirim</SelectItem>
                                    <SelectItem value="paid">Lunas</SelectItem>
                                    <SelectItem value="overdue">Jatuh Tempo</SelectItem>
                                    <SelectItem value="cancelled">Dibatalkan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsStatusOpen(false)}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={statusForm.processing}>
                                {statusForm.processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* =================== DETAIL DIALOG =================== */}
            <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <DialogContent className="max-w-[95vw] sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center justify-between pr-6">
                            <div className="flex items-center gap-3">
                                <span>Invoice {detailInvoice?.invoice_number}</span>
                                {detailInvoice && <StatusBadge status={detailInvoice.status} />}
                            </div>
                            <Button variant="outline" size="sm" className="gap-2" asChild>
                                <a href={`/admin/invoices/${detailInvoice?.id}/pdf`} target="_blank">
                                    <FileDown className="size-4" />
                                    Download PDF
                                </a>
                            </Button>
                        </DialogTitle>
                        <DialogDescription>
                            Detail invoice untuk {detailInvoice?.tenant?.business_name}
                        </DialogDescription>
                    </DialogHeader>

                    {detailInvoice && (
                        <div className="space-y-6">
                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Tanggal Invoice</p>
                                    <p className="font-medium">{new Date(detailInvoice.issue_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Jatuh Tempo</p>
                                    <p className="font-medium">{new Date(detailInvoice.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                </div>
                                {detailInvoice.paid_at && (
                                    <div>
                                        <p className="text-muted-foreground">Dibayar Pada</p>
                                        <p className="font-medium text-emerald-600">{new Date(detailInvoice.paid_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                    </div>
                                )}
                            </div>

                            {/* Items Table */}
                            <div className="rounded-lg border overflow-x-auto">
                                <Table className="min-w-[600px]">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="pl-4">Deskripsi</TableHead>
                                            <TableHead className="text-center">Qty</TableHead>
                                            <TableHead className="text-right">Harga</TableHead>
                                            <TableHead className="text-right pr-4">Jumlah</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {detailInvoice.items?.map((item: any) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="pl-4 font-medium">{item.description}</TableCell>
                                                <TableCell className="text-center">{item.quantity}</TableCell>
                                                <TableCell className="text-right">{formatRupiah(item.unit_price)}</TableCell>
                                                <TableCell className="text-right pr-4 font-semibold">{formatRupiah(item.amount)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Totals */}
                            <div className="flex justify-end">
                                <div className="w-[300px] space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>{formatRupiah(detailInvoice.subtotal)}</span>
                                    </div>
                                    {parseFloat(detailInvoice.tax_rate) > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Pajak ({detailInvoice.tax_rate}%)</span>
                                            <span>{formatRupiah(detailInvoice.tax_amount)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between border-t pt-2 text-lg font-bold">
                                        <span>Total</span>
                                        <span>{formatRupiah(detailInvoice.total)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            {detailInvoice.notes && (
                                <div className="rounded-lg bg-muted/50 p-4">
                                    <p className="text-xs font-semibold text-muted-foreground mb-1">Catatan:</p>
                                    <p className="text-sm">{detailInvoice.notes}</p>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

Invoices.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Invoice', href: '/admin/invoices' },
    ],
};
