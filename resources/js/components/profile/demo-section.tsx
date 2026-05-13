import { useState } from 'react';

export default function DemoSection({ lang }: { lang: 'ID' | 'EN' }) {
    const [activeTab, setActiveTab] = useState('kasir');

    const content = {
        ID: {
            breadcrumb: 'PAYLO POINT OF SALE',
            title: 'Coba Aplikasi paylo secara Mandiri',
            subtitle: 'Jelajahi paylo lebih dalam dan nikmati mudahnya mengoperasikan fitur aplikasi paylo untuk bisnismu',
            ctaPrimary: 'Coba Gratis 14 Hari',
            ctaSecondary: 'Jadwalkan Demo',
            tabs: [
                { id: 'kasir', label: 'Kasir Online' },
                { id: 'karyawan', label: 'Karyawan' },
                { id: 'analisa', label: 'Analisa Bisnis' },
                { id: 'inventori', label: 'Inventori' },
                { id: 'owner', label: 'Aplikasi Owner' },
                { id: 'toko', label: 'Toko Online' },
                { id: 'akuntansi', label: 'Akuntansi' },
                { id: 'crm', label: 'CRM' },
            ],
            details: {
                kasir: 'Uji coba fitur buka tutup kasir, pisah bayar, refund, void hingga manajemen meja di sini',
                karyawan: 'Kelola shift karyawan, absensi online, dan laporan performa tim dalam satu dashboard.',
                analisa: 'Dapatkan laporan penjualan harian, tren stok, dan analitik keuntungan secara otomatis.',
                inventori: 'Pantau stok barang di berbagai gudang, kelola supplier, dan otomatisasi PO.',
                owner: 'Pantau bisnis Anda kapan saja dari mana saja melalui aplikasi khusus owner.',
                toko: 'Buat website toko online Anda sendiri yang terintegrasi langsung dengan stok fisik.',
                akuntansi: 'Pencatatan keuangan otomatis, neraca, laporan laba rugi, dan perpajakan.',
                crm: 'Kelola database pelanggan, program loyalitas, dan kirim promo tertarget.'
            }
        },
        EN: {
            breadcrumb: 'PAYLO POINT OF SALE',
            title: 'Try Paylo Application Independently',
            subtitle: 'Explore Paylo deeper and enjoy the ease of operating Paylo application features for your business',
            ctaPrimary: 'Try Free for 14 Days',
            ctaSecondary: 'Schedule a Demo',
            tabs: [
                { id: 'kasir', label: 'Online Cashier' },
                { id: 'karyawan', label: 'Employee' },
                { id: 'analisa', label: 'Business Analysis' },
                { id: 'inventori', label: 'Inventory' },
                { id: 'owner', label: 'Owner App' },
                { id: 'toko', label: 'Online Store' },
                { id: 'akuntansi', label: 'Accounting' },
                { id: 'crm', label: 'CRM' },
            ],
            details: {
                kasir: 'Test cashier opening/closing, split payments, refunds, voids, to table management here',
                karyawan: 'Manage employee shifts, online attendance, and team performance reports in one dashboard.',
                analisa: 'Get daily sales reports, stock trends, and profit analytics automatically.',
                inventori: 'Monitor stock across multiple warehouses, manage suppliers, and automate POs.',
                owner: 'Monitor your business anytime from anywhere through a dedicated owner app.',
                toko: 'Create your own online store website that integrates directly with physical stock.',
                akuntansi: 'Automatic financial recording, balance sheets, P&L reports, and taxation.',
                crm: 'Manage customer databases, loyalty programs, and send targeted promos.'
            }
        }
    };

    const current = content[lang];

    return (
        <section id="demo" className="paylo-demo-page">
            <div className="paylo-container">
                <div className="paylo-demo-page__header">
                    <span className="paylo-demo-page__breadcrumb">{current.breadcrumb}</span>
                    <h2 className="paylo-demo-page__title">{current.title}</h2>
                    <p className="paylo-demo-page__subtitle">{current.subtitle}</p>
                    <div className="paylo-demo-page__actions">
                        <button className="paylo-btn paylo-btn--teal paylo-btn--lg">{current.ctaPrimary}</button>
                        <button className="paylo-btn paylo-btn--outline-teal paylo-btn--lg">{current.ctaSecondary}</button>
                    </div>
                </div>

                <div className="paylo-demo-page__tabs">
                    {current.tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`paylo-demo-page__tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="paylo-demo-page__content">
                    <div className="paylo-demo-page__info">
                        <h3 className="paylo-demo-page__tab-title">{current.tabs.find(t => t.id === activeTab)?.label}</h3>
                        <p className="paylo-demo-page__tab-desc">
                            {(current.details as any)[activeTab]}
                        </p>
                    </div>
                    <div className="paylo-demo-page__visual">
                        <div className="paylo-demo-page__mockup">
                            {/* Placeholder for screenshot */}
                            <div className="paylo-demo-page__placeholder">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="1"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                <span>PRATINJAU DASHBOARD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* WhatsApp Floating Button */}
            <a href="#" className="paylo-whatsapp">
                <div className="paylo-whatsapp__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-2.32 0-4.519.903-6.16 2.544-1.64 1.64-2.542 3.841-2.542 6.161 0 2.32.903 4.519 2.542 6.16 1.641 1.641 3.841 2.541 6.162 2.541 2.322 0 4.519-.903 6.161-2.541 1.64-1.64 2.542-3.84 2.542-6.161 0-2.32-.903-4.519-2.542-6.161-1.641-1.641-3.84-2.544-6.162-2.544zm0 16.488c-1.802 0-3.567-.54-5.074-1.558l-3.619 1.189 1.21-3.524c-1.12-1.636-1.713-3.567-1.713-5.541 0-5.508 4.48-9.988 9.988-9.988s9.988 4.48 9.988 9.988-4.48 9.988-9.988 9.988z"/></svg>
                </div>
                <div className="paylo-whatsapp__text">
                    <span className="block text-[10px] opacity-80">Hubungi Kami</span>
                    <span className="block font-bold">Online 24 Jam</span>
                </div>
            </a>
        </section>
    );
}
