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
            <a 
                href="https://wa.me/62811500460" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="paylo-whatsapp-float"
            >
                <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
            </a>
        </section>
    );
}
