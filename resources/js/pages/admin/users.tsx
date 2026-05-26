import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    Plus,
    MoreHorizontal,
    Edit,
    Trash2,
    Shield,
    ShieldAlert,
    Search,
    Filter,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { dashboard } from '@/routes';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

export default function Users({ users, auth, filters = {} }: { users: User[], auth: any, filters?: any }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [roleFilter, setRoleFilter] = useState(filters?.role || 'all');

    const handleFilter = () => {
        router.get('/admin/users', { search: searchQuery, role: roleFilter === 'all' ? '' : roleFilter }, { preserveState: true, replace: true });
    };

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'admin',
    });

    const openDialog = (user?: User) => {
        clearErrors();
        if (user) {
            setEditingUser(user);
            setData({
                name: user.name,
                email: user.email,
                password: '',
                role: user.role,
            });
        } else {
            setEditingUser(null);
            reset();
        }
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setEditingUser(null);
        reset();
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editingUser) {
            put(`/admin/users/${editingUser.id}`, {
                onSuccess: () => closeDialog(),
            });
        } else {
            post('/admin/users', {
                onSuccess: () => closeDialog(),
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus admin ini?')) {
            destroy(`/admin/users/${id}`);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <>
            <Head title="Admin Users" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Admin Users</h1>
                        <p className="text-sm text-muted-foreground">Kelola admin platform Paylo</p>
                    </div>
                    <Button onClick={() => openDialog()}>
                        <Plus className="mr-2 h-4 w-4" /> Tambah Admin
                    </Button>
                </div>
                
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <CardTitle>Daftar Administrator</CardTitle>
                                <CardDescription>
                                    Daftar semua pengguna dengan akses ke dashboard admin. Total: <span className="font-medium text-foreground">{users.length}</span> data.
                                </CardDescription>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Cari nama atau email..."
                                        className="pl-8 w-full sm:w-[250px]"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                                    />
                                </div>
                                <Select 
                                    value={roleFilter} 
                                    onValueChange={(v) => { 
                                        setRoleFilter(v); 
                                        router.get('/admin/users', { search: searchQuery, role: v === 'all' ? '' : v }, { preserveState: true, replace: true });
                                    }}
                                >
                                    <SelectTrigger className="w-full sm:w-[160px]">
                                        <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <SelectValue placeholder="Semua Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua Role</SelectItem>
                                        <SelectItem value="super_admin">Super Admin</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Peran (Role)</TableHead>
                                        <TableHead>Terdaftar pada</TableHead>
                                        <TableHead className="w-[70px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                {user.role === 'super_admin' ? (
                                                    <Badge variant="default" className="bg-blue-600">
                                                        <ShieldAlert className="mr-1 size-3" /> Super Admin
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-slate-600">
                                                        <Shield className="mr-1 size-3" /> Admin
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-sm">
                                                {formatDate(user.created_at)}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="size-8">
                                                            <MoreHorizontal className="size-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => openDialog(user)}>
                                                            <Edit className="mr-2 size-4" /> Edit
                                                        </DropdownMenuItem>
                                                        {auth.user.id !== user.id && (
                                                            <>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem 
                                                                    onClick={() => handleDelete(user.id)}
                                                                    className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                                                >
                                                                    <Trash2 className="mr-2 size-4" /> Hapus
                                                                </DropdownMenuItem>
                                                            </>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {users.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                                Tidak ada data admin ditemukan.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{editingUser ? 'Edit Admin' : 'Tambah Admin Baru'}</DialogTitle>
                        <DialogDescription>
                            {editingUser 
                                ? 'Perbarui informasi akun administrator di bawah ini.' 
                                : 'Masukkan detail akun administrator baru. Password minimal 8 karakter.'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama Lengkap</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Masukkan nama"
                                />
                                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="admin@paylo.id"
                                />
                                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="role">Role</Label>
                                <Select value={data.role} onValueChange={(v) => setData('role', v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin (Akses Terbatas)</SelectItem>
                                        <SelectItem value="super_admin">Super Admin (Akses Penuh)</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.role && <p className="text-sm text-destructive">{errors.role}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">
                                    Password {editingUser && <span className="text-muted-foreground font-normal">(Kosongkan jika tidak ingin mengubah)</span>}
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                />
                                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={closeDialog}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

Users.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Admin Users', href: '/admin/users' },
    ],
};
