export default function ProductsSection({ lang }: { lang: 'ID' | 'EN' }) {
    const content = {
        ID: {
            label: 'Platform Kami',
            title: 'Ekosistem Produk',
            desc: 'Empat modul canggih yang bekerja sama sebagai satu platform terintegrasi untuk menjalankan seluruh bisnis Anda.',
            learnMore: 'Pelajari lebih lanjut',
            products: [
                { name: 'Paylo Inventaris', desc: 'Manajemen stok dan gudang', detail: 'Pantau level stok secara real-time, kelola banyak gudang, otomatisasi titik pemesanan ulang, dan dapatkan visibilitas lengkap atas rantai pasokan Anda.' },
                { name: 'Paylo POS', desc: 'Operasional kasir dan penjualan', detail: 'Sistem kasir yang cepat dan intuitif dengan dukungan multi-pembayaran, cetak struk, dan integrasi mulus dengan inventaris Anda.' },
                { name: 'Paylo Absensi', desc: 'Manajemen kehadiran dan tenaga kerja', detail: 'Absensi berbasis GPS, penjadwalan shift, pelacakan lembur, dan analitik tenaga kerja yang komprehensif untuk manajemen tim yang lebih baik.' },
                { name: 'Paylo Analitik', desc: 'Wawasan bisnis dan laporan performa', detail: 'Ubah data Anda menjadi wawasan yang dapat ditindaklanjuti dengan dashboard real-time, laporan khusus, dan analitik prediktif untuk mendorong pertumbuhan.' }
            ]
        },
        EN: {
            label: 'Our Platform',
            title: 'Product Ecosystem',
            desc: 'Four powerful modules working together as one integrated platform to run your entire business.',
            learnMore: 'Learn more',
            products: [
                { name: 'Paylo Inventory', desc: 'Stock and warehouse management', detail: 'Track stock levels in real-time, manage multiple warehouses, automate reorder points, and get complete visibility over your supply chain.' },
                { name: 'Paylo POS', desc: 'Cashier and sales operations', detail: 'Fast, intuitive point-of-sale system with multi-payment support, receipt printing, and seamless integration with your inventory.' },
                { name: 'Paylo Attendance', desc: 'Employee attendance and workforce management', detail: 'GPS-based clock-in/out, shift scheduling, overtime tracking, and comprehensive workforce analytics for better team management.' },
                { name: 'Paylo Analytics', desc: 'Business insights and performance reports', detail: 'Transform your data into actionable insights with real-time dashboards, custom reports, and predictive analytics to drive growth.' }
            ]
        }
    };

    const current = content[lang];

    const icons = [
        <><rect x="4" y="4" width="24" height="24" rx="4" /><path d="M4 12h24M12 12v16M4 20h24" /></>,
        <><rect x="3" y="6" width="26" height="18" rx="3" /><path d="M3 12h26M8 18h4M8 22h8" /></>,
        <><circle cx="16" cy="12" r="5" /><path d="M6 26c0-5.523 4.477-10 10-10s10 4.477 10 10" /><path d="M16 10v3l2 1" /></>,
        <><path d="M4 24V14l6 4 6-8 6 4 6-6" /><path d="M4 28h24" /></>
    ];

    const colors = ['#2563EB', '#0EA5E9', '#8B5CF6', '#10B981'];

    return (
        <section id="products" className="paylo-products">
            <div className="paylo-container">
                <div className="paylo-section-header">
                    <span className="paylo-section-label">{current.label}</span>
                    <h2 className="paylo-section-title">{current.title}</h2>
                    <p className="paylo-section-desc">{current.desc}</p>
                </div>
                <div className="paylo-products__grid">
                    {current.products.map((p, i) => (
                        <div key={i} className="paylo-products__card">
                            <div className="paylo-products__card-icon" style={{ backgroundColor: `${colors[i]}10`, borderColor: `${colors[i]}20` }}>
                                <svg width="32" height="32" fill="none" stroke={colors[i]} strokeWidth="1.5">
                                    {icons[i]}
                                </svg>
                            </div>
                            <h3 className="paylo-products__card-name">{p.name}</h3>
                            <p className="paylo-products__card-subtitle">{p.desc}</p>
                            <p className="paylo-products__card-detail">{p.detail}</p>
                            <a href="#" className="paylo-products__card-link" style={{ color: colors[i] }}>
                                {current.learnMore}
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h8M8 3l4 4-4 4" /></svg>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
