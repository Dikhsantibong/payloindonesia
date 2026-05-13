import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dashboard } from '@/routes';

export default function Settings({ settings }: any) {
    const { data, setData, post, processing } = useForm({
        app_name: settings.app_name || 'Paylo',
        support_email: settings.support_email || 'support@paylo.id',
        support_phone: settings.support_phone || '+62 800 1234 5678',
        maintenance_mode: settings.maintenance_mode === 'true',
        registration_enabled: settings.registration_enabled === 'true',
        trial_days: settings.trial_days || '14',
        payment_gateway_api: settings.payment_gateway_api || '',
        payment_gateway_secret: settings.payment_gateway_secret || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.store'));
    };

    return (
        <>
            <Head title="System Settings" />
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
                    <p className="text-sm text-muted-foreground">Konfigurasi platform Paylo</p>
                </div>
                
                <form onSubmit={submit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Umum</CardTitle>
                            <CardDescription>Pengaturan dasar profil aplikasi.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="app_name">Nama Aplikasi</Label>
                                    <Input
                                        id="app_name"
                                        value={data.app_name}
                                        onChange={(e) => setData('app_name', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="trial_days">Masa Trial Default (Hari)</Label>
                                    <Input
                                        id="trial_days"
                                        type="number"
                                        value={data.trial_days}
                                        onChange={(e) => setData('trial_days', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="support_email">Email Support</Label>
                                    <Input
                                        id="support_email"
                                        type="email"
                                        value={data.support_email}
                                        onChange={(e) => setData('support_email', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="support_phone">No. Telp Support</Label>
                                    <Input
                                        id="support_phone"
                                        value={data.support_phone}
                                        onChange={(e) => setData('support_phone', e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Akses & Keamanan</CardTitle>
                            <CardDescription>Kontrol akses masuk dan registrasi platform.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <Label htmlFor="registration_enabled">Buka Registrasi Tenant</Label>
                                    <p className="text-sm text-muted-foreground">Mengizinkan pengguna baru mendaftar secara mandiri.</p>
                                </div>
                                <input
                                    id="registration_enabled"
                                    type="checkbox"
                                    checked={data.registration_enabled}
                                    onChange={(e) => setData('registration_enabled', e.target.checked)}
                                    className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                                />
                            </div>

                            <div className="flex items-center justify-between rounded-lg border p-4 bg-red-50/50">
                                <div className="space-y-0.5">
                                    <Label htmlFor="maintenance_mode" className="text-red-600">Maintenance Mode</Label>
                                    <p className="text-sm text-red-600/80">Mengunci seluruh akses tenant ke platform saat ada pemeliharaan sistem.</p>
                                </div>
                                <input
                                    id="maintenance_mode"
                                    type="checkbox"
                                    checked={data.maintenance_mode}
                                    onChange={(e) => setData('maintenance_mode', e.target.checked)}
                                    className="size-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Gateway (Midtrans)</CardTitle>
                            <CardDescription>Kredensial API untuk integrasi pembayaran.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="payment_gateway_api">Client Key</Label>
                                <Input
                                    id="payment_gateway_api"
                                    value={data.payment_gateway_api}
                                    onChange={(e) => setData('payment_gateway_api', e.target.value)}
                                    placeholder="SB-Mid-client-xxxxxxxx"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="payment_gateway_secret">Server Key</Label>
                                <Input
                                    id="payment_gateway_secret"
                                    type="password"
                                    value={data.payment_gateway_secret}
                                    onChange={(e) => setData('payment_gateway_secret', e.target.value)}
                                    placeholder="SB-Mid-server-xxxxxxxx"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing} size="lg">
                            {processing ? 'Menyimpan...' : 'Simpan Pengaturan'}
                        </Button>
                    </div>
                </form>
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
