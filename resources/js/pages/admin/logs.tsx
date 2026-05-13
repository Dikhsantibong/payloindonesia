import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Activity,
    Search,
    Filter,
    FileText,
    Download,
    Eye,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
} from '@/components/ui/dialog';
import { dashboard } from '@/routes';

function ActionBadge({ action }: { action: string }) {
    const styles: Record<string, string> = {
        created: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        updated: 'bg-blue-50 text-blue-700 border-blue-200',
        deleted: 'bg-red-50 text-red-700 border-red-200',
        suspended: 'bg-amber-50 text-amber-700 border-amber-200',
        activated: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        login: 'bg-purple-50 text-purple-700 border-purple-200',
        logout: 'bg-slate-50 text-slate-700 border-slate-200',
    };
    return (
        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold capitalize ${styles[action] || 'bg-slate-50 text-slate-700 border-slate-200'}`}>
            {action}
        </span>
    );
}

export default function Logs({ logs, filters }: any) {
    const [search, setSearch] = useState(filters?.search || '');
    const [filterAction, setFilterAction] = useState(filters?.action || 'all');
    const [selectedLog, setSelectedLog] = useState<any>(null);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.get(
                route('admin.logs'),
                { search, action: filterAction },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }
    };

    const handleFilterChange = (val: string) => {
        setFilterAction(val);
        router.get(
            route('admin.logs'),
            { search, action: val },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    return (
        <>
            <Head title="Activity Logs" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Activity Logs</h1>
                        <p className="text-sm text-muted-foreground">Log aktivitas sistem dan pengguna di platform Paylo</p>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Cari deskripsi, user, atau ip address... (Tekan Enter)"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={handleSearch}
                                    className="pl-9"
                                />
                            </div>
                            <Select value={filterAction} onValueChange={handleFilterChange}>
                                <SelectTrigger className="w-[160px]">
                                    <Filter className="mr-2 size-4" />
                                    <SelectValue placeholder="Filter Action" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Action</SelectItem>
                                    <SelectItem value="created">Created</SelectItem>
                                    <SelectItem value="updated">Updated</SelectItem>
                                    <SelectItem value="deleted">Deleted</SelectItem>
                                    <SelectItem value="suspended">Suspended</SelectItem>
                                    <SelectItem value="login">Login</SelectItem>
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
                                    <TableHead className="pl-6">Waktu</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Aksi</TableHead>
                                    <TableHead>Deskripsi</TableHead>
                                    <TableHead>Modul</TableHead>
                                    <TableHead>IP Address</TableHead>
                                    <TableHead className="text-right pr-6"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {logs.data.map((log: any) => (
                                    <TableRow key={log.id} className="cursor-pointer" onClick={() => setSelectedLog(log)}>
                                        <TableCell className="pl-6 text-muted-foreground text-xs whitespace-nowrap">
                                            {new Date(log.created_at).toLocaleString('id-ID')}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm">{log.user?.name || 'System'}</span>
                                                <span className="text-xs text-muted-foreground">{log.user?.email || '-'}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <ActionBadge action={log.action} />
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate text-sm">
                                            {log.description}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="text-xs bg-slate-50">{log.loggable_type ? log.loggable_type.split('\\').pop() : 'System'}</Badge>
                                        </TableCell>
                                        <TableCell className="text-xs font-mono text-muted-foreground">
                                            {log.ip_address || '-'}
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <Button variant="ghost" size="icon" className="size-8" onClick={(e) => { e.stopPropagation(); setSelectedLog(log); }}>
                                                <Eye className="size-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        
                        {/* Pagination */}
                        <div className="flex items-center justify-between border-t px-6 py-4">
                            <p className="text-sm text-muted-foreground">
                                Menampilkan {logs.from || 0} - {logs.to || 0} dari {logs.total} log
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={!logs.prev_page_url}
                                    onClick={() => router.get(logs.prev_page_url)}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={!logs.next_page_url}
                                    onClick={() => router.get(logs.next_page_url)}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Log Detail Dialog */}
            <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Detail Log Aktivitas</DialogTitle>
                        <DialogDescription>ID: {selectedLog?.id}</DialogDescription>
                    </DialogHeader>
                    {selectedLog && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 rounded-lg bg-slate-50 p-4 border text-sm">
                                <div>
                                    <p className="text-muted-foreground text-xs mb-1">Waktu</p>
                                    <p className="font-medium">{new Date(selectedLog.created_at).toLocaleString('id-ID')}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs mb-1">User</p>
                                    <p className="font-medium">{selectedLog.user?.name || 'System'}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs mb-1">Aksi</p>
                                    <ActionBadge action={selectedLog.action} />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs mb-1">Modul</p>
                                    <p className="font-mono text-xs">{selectedLog.loggable_type || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs mb-1">IP Address</p>
                                    <p className="font-mono text-xs">{selectedLog.ip_address || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs mb-1">User Agent</p>
                                    <p className="text-xs text-muted-foreground truncate" title={selectedLog.user_agent}>{selectedLog.user_agent || 'N/A'}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-sm mb-2">Deskripsi</h4>
                                <p className="text-sm border rounded-lg p-3 bg-white">{selectedLog.description}</p>
                            </div>

                            {selectedLog.properties && (
                                <div>
                                    <h4 className="font-semibold text-sm mb-2">Data / Properties</h4>
                                    <pre className="text-xs bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto">
                                        {JSON.stringify(JSON.parse(selectedLog.properties), null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

Logs.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Activity Logs', href: '/admin/logs' },
    ],
};
