import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { dashboard } from '@/routes';

export default function Settings() {
    return (
        <>
            <Head title="System Settings" />
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
                    <p className="text-sm text-muted-foreground">Konfigurasi platform Paylo</p>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Coming Soon</CardTitle>
                        <CardDescription>Modul konfigurasi sistem sedang dalam pengembangan.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Halaman ini akan memuat pengaturan global seperti konfigurasi API gateway pembayaran, SMTP email, limit resource, dan konfigurasi webhook.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Settings.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'System Settings', href: '/admin/settings' },
    ],
};
