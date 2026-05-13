import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { dashboard } from '@/routes';

export default function Users() {
    return (
        <>
            <Head title="Admin Users" />
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Admin Users</h1>
                    <p className="text-sm text-muted-foreground">Kelola admin platform Paylo</p>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Coming Soon</CardTitle>
                        <CardDescription>Modul manajemen admin platform sedang dalam pengembangan.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Halaman ini akan digunakan untuk mengelola akun administrator platform Paylo, role based access control (RBAC), dan log aktivitas admin.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Users.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Admin Users', href: '/admin/users' },
    ],
};
