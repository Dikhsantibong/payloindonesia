import { Head } from '@inertiajs/react';
import { useState } from 'react';
import {
    Headphones,
    Search,
    MessageSquare,
    Clock,
    CheckCircle2,
    AlertCircle,
    XCircle,
    ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { dashboard } from '@/routes';

import { router, useForm } from '@inertiajs/react';

function PriorityBadge({ priority }: { priority: string }) {
    const styles: Record<string, string> = {
        critical: 'bg-red-100 text-red-700 border-red-200',
        high: 'bg-orange-50 text-orange-700 border-orange-200',
        medium: 'bg-blue-50 text-blue-700 border-blue-200',
        low: 'bg-slate-50 text-slate-600 border-slate-200',
    };
    return (
        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold capitalize ${styles[priority] || ''}`}>
            {priority}
        </span>
    );
}

function StatusIcon({ status }: { status: string }) {
    if (status === 'open') return <AlertCircle className="size-4 text-amber-500" />;
    if (status === 'in_progress') return <Clock className="size-4 text-blue-500" />;
    if (status === 'resolved') return <CheckCircle2 className="size-4 text-emerald-500" />;
    return <XCircle className="size-4 text-slate-400" />;
}

function statusLabel(status: string) {
    const labels: Record<string, string> = { open: 'Open', in_progress: 'In Progress', resolved: 'Resolved', closed: 'Closed' };
    return labels[status] || status;
}

export default function Support({ tickets, counts, filters }: any) {
    const [search, setSearch] = useState(filters?.search || '');
    const [filterStatus, setFilterStatus] = useState(filters?.status || 'all');
    const [filterPriority, setFilterPriority] = useState(filters?.priority || 'all');
    const [selectedTicket, setSelectedTicket] = useState<any>(null);
    const [ticketDetails, setTicketDetails] = useState<any>(null);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
        status: '',
    });

    const openTicket = async (ticket: any) => {
        setSelectedTicket(ticket);
        setIsLoadingDetails(true);
        try {
            const response = await window.fetch(`/admin/support/${ticket.raw_id}`);
            const data = await response.json();
            setTicketDetails(data);
            setData('status', data.status);
        } catch (error) {
            console.error('Failed to fetch ticket details', error);
        } finally {
            setIsLoadingDetails(false);
        }
    };

    const submitReply = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/support/${selectedTicket.raw_id}/reply`, {
            onSuccess: () => {
                reset('message');
                // Refresh details
                openTicket(selectedTicket);
            },
        });
    };

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.get(
                '/admin/support',
                { search, status: filterStatus, priority: filterPriority },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }
    };

    const handleFilterChange = (key: string, val: string) => {
        const newFilters = { search, status: filterStatus, priority: filterPriority, [key]: val };
        if (key === 'status') setFilterStatus(val);
        if (key === 'priority') setFilterPriority(val);
        
        router.get(
            '/admin/support',
            newFilters,
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    return (
        <>
            <Head title="Support Ticket" />
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Support Ticket</h1>
                    <p className="text-sm text-muted-foreground">Kelola tiket bantuan dari tenant Paylo</p>
                </div>

                {/* Summary */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <Card>
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="rounded-lg bg-amber-50 p-2.5 dark:bg-amber-950">
                                <AlertCircle className="size-5 text-amber-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{counts.open}</p>
                                <p className="text-xs text-muted-foreground">Open Tickets</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="rounded-lg bg-blue-50 p-2.5 dark:bg-blue-950">
                                <Clock className="size-5 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{counts.in_progress}</p>
                                <p className="text-xs text-muted-foreground">In Progress</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="rounded-lg bg-emerald-50 p-2.5 dark:bg-emerald-950">
                                <CheckCircle2 className="size-5 text-emerald-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{counts.resolved}</p>
                                <p className="text-xs text-muted-foreground">Resolved</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Cari tiket atau tenant... (Tekan Enter)"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleSearch}
                            className="pl-9"
                        />
                    </div>
                    <Select value={filterStatus} onValueChange={(v) => handleFilterChange('status', v)}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={filterPriority} onValueChange={(v) => handleFilterChange('priority', v)}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Priority</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Ticket Cards */}
                <div className="space-y-3">
                    {tickets.data.map((ticket: any) => (
                        <Card 
                            key={ticket.id} 
                            className="transition-colors hover:border-blue-200 cursor-pointer"
                            onClick={() => openTicket(ticket)}
                        >
                            <CardContent className="flex items-center gap-4 p-5">
                                <StatusIcon status={ticket.status} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                                        <PriorityBadge priority={ticket.priority} />
                                    </div>
                                    <p className="font-medium truncate">{ticket.subject}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-xs text-muted-foreground">{ticket.tenant}</span>
                                        <span className="text-xs text-muted-foreground">•</span>
                                        <span className="text-xs text-muted-foreground">{ticket.date}</span>
                                    </div>
                                </div>
                                <div className="hidden sm:flex flex-col items-end gap-1">
                                    <span className="text-xs font-medium text-muted-foreground">{statusLabel(ticket.status)}</span>
                                    <span className="text-xs text-muted-foreground">{ticket.lastReply}</span>
                                </div>
                                <ChevronRight className="size-4 text-muted-foreground" />
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-muted-foreground">
                        Menampilkan {tickets.from || 0} - {tickets.to || 0} dari {tickets.total} tiket
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!tickets.prev_page_url}
                            onClick={() => router.get(tickets.prev_page_url)}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!tickets.next_page_url}
                            onClick={() => router.get(tickets.next_page_url)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>

            {/* Ticket Detail Dialog */}
            <Dialog open={!!selectedTicket} onOpenChange={(open) => !open && setSelectedTicket(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="font-mono">{ticketDetails?.id || selectedTicket?.id}</Badge>
                            {ticketDetails && <PriorityBadge priority={ticketDetails.priority} />}
                        </div>
                        <DialogTitle className="text-xl">{ticketDetails?.subject || selectedTicket?.subject}</DialogTitle>
                        <DialogDescription>
                            Dari {ticketDetails?.tenant || selectedTicket?.tenant} • {ticketDetails?.date || selectedTicket?.date}
                        </DialogDescription>
                    </DialogHeader>

                    {isLoadingDetails ? (
                        <div className="py-12 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-sm text-muted-foreground">Memuat percakapan...</p>
                        </div>
                    ) : (
                        <div className="space-y-6 py-4">
                            {/* Original Message */}
                            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="size-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">T</div>
                                    <span className="text-xs font-bold">{ticketDetails?.tenant}</span>
                                    <span className="text-[10px] text-muted-foreground">{ticketDetails?.date}</span>
                                </div>
                                <p className="text-sm whitespace-pre-wrap">{ticketDetails?.message}</p>
                            </div>

                            {/* Replies */}
                            <div className="space-y-4">
                                {ticketDetails?.replies.map((reply: any) => (
                                    <div key={reply.id} className={`flex flex-col ${reply.is_admin ? 'items-end' : 'items-start'}`}>
                                        <div className={`max-w-[85%] rounded-2xl p-4 ${reply.is_admin ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}>
                                            <div className="flex items-center gap-2 mb-1 opacity-80">
                                                <span className="text-[10px] font-bold uppercase tracking-wider">{reply.user}</span>
                                                <span className="text-[10px]">{reply.date}</span>
                                            </div>
                                            <p className="text-sm whitespace-pre-wrap">{reply.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Separator />

                            {/* Reply Form */}
                            <form onSubmit={submitReply} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="reply">Tindak Lanjut / Balasan</Label>
                                    <Textarea
                                        id="reply"
                                        placeholder="Ketik balasan atau catatan tindak lanjut di sini..."
                                        className="min-h-[120px]"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                    />
                                    {errors.message && <p className="text-xs text-red-600">{errors.message}</p>}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 items-end justify-between">
                                    <div className="w-full sm:w-1/3 space-y-2">
                                        <Label htmlFor="status">Update Status</Label>
                                        <Select value={data.status} onValueChange={(v) => setData('status', v)}>
                                            <SelectTrigger id="status">
                                                <SelectValue placeholder="Pilih status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="open">Open</SelectItem>
                                                <SelectItem value="in_progress">In Progress</SelectItem>
                                                <SelectItem value="resolved">Resolved</SelectItem>
                                                <SelectItem value="closed">Closed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button type="submit" className="gap-2" disabled={processing || !data.message}>
                                        <MessageSquare className="size-4" />
                                        {processing ? 'Mengirim...' : 'Kirim Balasan'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

Support.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Support Ticket', href: '/admin/support' },
    ],
};
