import { useState } from 'react';

export default function DemoSection({ lang }: { lang: 'ID' | 'EN' }) {
    const [activeTab, setActiveTab] = useState('kasir');

    const content = {
        ID: {
            breadcrumb: 'EKSPLORASI MANDIRI',
            title: 'Rasakan Pengalaman Menggunakan paylo',
            subtitle: 'Jelajahi setiap fitur canggih paylo secara langsung melalui dashboard simulasi kami.',
            ctaPrimary: 'Mulai Uji Coba Gratis',
            ctaSecondary: 'Hubungi Konsultan Kami',
            tabs: [
                { id: 'kasir', label: 'Kasir Online' },
                { id: 'inventori', label: 'Inventori' },
                { id: 'analisa', label: 'Analisa Bisnis' },
                { id: 'karyawan', label: 'Manajemen Karyawan' },
            ],
            details: {
                kasir: {
                    title: 'Sistem Kasir Terintegrasi',
                    desc: 'Uji coba alur transaksi mulai dari buka shift, pemesanan meja, hingga proses pembayaran yang cepat dan aman.'
                },
                inventori: {
                    title: 'Manajemen Stok Pintar',
                    desc: 'Lihat bagaimana paylo mengelola ribuan SKU dengan mudah, otomatisasi PO, dan pelacakan stok real-time.'
                },
                analisa: {
                    title: 'Wawasan Bisnis Mendalam',
                    desc: 'Dashboard interaktif yang menyajikan data penjualan harian dan tren produk untuk membantu Anda mengambil keputusan.'
                },
                karyawan: {
                    title: 'Optimasi Tenaga Kerja',
                    desc: 'Simulasikan pengaturan shift, absensi berbasis lokasi, dan perhitungan komisi otomatis untuk tim Anda.'
                }
            }
        },
        EN: {
            breadcrumb: 'INDEPENDENT EXPLORATION',
            title: 'Experience Using paylo',
            subtitle: 'Explore each of Paylo\'s advanced features directly through our simulation dashboard.',
            ctaPrimary: 'Start Free Trial',
            ctaSecondary: 'Contact Our Consultant',
            tabs: [
                { id: 'kasir', label: 'Online Cashier' },
                { id: 'inventori', label: 'Inventory' },
                { id: 'analisa', label: 'Business Analysis' },
                { id: 'karyawan', label: 'Employee Management' },
            ],
            details: {
                kasir: {
                    title: 'Integrated POS System',
                    desc: 'Test the transaction flow from opening shifts, table ordering, to fast and secure payment processes.'
                },
                inventori: {
                    title: 'Smart Inventory Management',
                    desc: 'See how Paylo manages thousands of SKUs easily, automates POs, and provides real-time stock tracking.'
                },
                analisa: {
                    title: 'Deep Business Insights',
                    desc: 'Interactive dashboard presenting daily sales data and product trends to help you make informed decisions.'
                },
                karyawan: {
                    title: 'Workforce Optimization',
                    desc: 'Simulate shift settings, location-based attendance, and automatic commission calculations for your team.'
                }
            }
        }
    };

    const current = content[lang];
    const activeData = (current.details as any)[activeTab];

    const getImagePath = (tabId: string) => {
        if (tabId === 'inventori') return '/fitur/inventory.png';
        if (tabId === 'analisa') return '/fitur/analis.png';
        return `/fitur/${tabId}.png`;
    };

    return (
        <section id="demo" className="paylo-demo-v2">
            <div className="paylo-container">
                <div className="paylo-demo-v2__grid">
                    {/* Left: Content & Tabs */}
                    <div className="paylo-demo-v2__left">
                        <div className="paylo-demo-v2__header">
                            <span className="paylo-demo-v2__breadcrumb">{current.breadcrumb}</span>
                            <h2 className="paylo-demo-v2__title">{current.title}</h2>
                            <p className="paylo-demo-v2__subtitle">{current.subtitle}</p>
                        </div>

                        <div className="paylo-demo-v2__nav">
                            {current.tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    className={`paylo-demo-v2__nav-item ${activeTab === tab.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    <div className="paylo-demo-v2__nav-logo-placeholder">
                                        {/* Logo will be placed here */}
                                    </div>
                                    <div className="paylo-demo-v2__nav-text">
                                        <span className="paylo-demo-v2__nav-label">{tab.label}</span>
                                        {activeTab === tab.id && (
                                            <p className="paylo-demo-v2__nav-desc">{activeData.desc}</p>
                                        )}
                                    </div>
                                    <div className="paylo-demo-v2__nav-indicator"></div>
                                </button>
                            ))}
                        </div>

                        <div className="paylo-demo-v2__actions">
                            <button className="paylo-btn paylo-btn--primary paylo-btn--lg">{current.ctaPrimary}</button>
                            <button className="paylo-btn paylo-btn--outline paylo-btn--lg">{current.ctaSecondary}</button>
                        </div>
                    </div>

                    {/* Right: Mockup */}
                    <div className="paylo-demo-v2__right">
                        <div className="paylo-demo-v2__laptop-mockup">
                            <div className="paylo-demo-v2__laptop-screen">
                                <div className="paylo-demo-v2__screen-header">
                                    <div className="paylo-demo-v2__dots"><span></span><span></span><span></span></div>
                                    <div className="paylo-demo-v2__url">simulasi.paylo.id/{activeTab}</div>
                                </div>
                                <div className="paylo-demo-v2__screen-content" style={{ padding: 0, overflow: 'hidden', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img 
                                        src={getImagePath(activeTab)} 
                                        alt={activeData.title} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                    />
                                </div>
                            </div>
                            <div className="paylo-demo-v2__laptop-base"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* WhatsApp Floating Button */}
            <a href="https://wa.me/62811500460" target="_blank" rel="noopener noreferrer" className="paylo-whatsapp-float">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
            </a>
        </section>
    );
}
