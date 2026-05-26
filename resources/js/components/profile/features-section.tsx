export default function FeaturesSection({ lang }: { lang: 'ID' | 'EN' }) {
    const content = {
        ID: {
            label: 'Fitur Unggulan',
            title: 'Solusi Lengkap untuk Efisiensi Bisnis',
            desc: 'Dirancang untuk menyederhanakan operasional harian Anda sehingga Anda bisa fokus mengembangkan bisnis lebih jauh.',
            features: [
                {
                    title: 'Kasir Online (POS)',
                    desc: 'Transaksi cepat, manajemen meja, integrasi e-wallet, hingga cetak struk otomatis.',
                    image: '/fitur/kasir.png'
                },
                {
                    title: 'Inventori Pintar',
                    desc: 'Pantau stok real-time, notifikasi stok menipis, dan manajemen multi-gudang.',
                    image: '/fitur/inventory.png'
                },
                {
                    title: 'Analisa Bisnis',
                    desc: 'Laporan laba rugi otomatis, analisa penjualan harian, dan data tren produk terlaris.',
                    image: '/fitur/analis.png'
                },
                {
                    title: 'Manajemen Karyawan',
                    desc: 'Absensi online berbasis lokasi, pengaturan shift, hingga hitung komisi otomatis.',
                    image: '/fitur/karyawan.png'
                }
            ]
        },
        EN: {
            label: 'Key Features',
            title: 'Complete Solution for Business Efficiency',
            desc: 'Designed to simplify your daily operations so you can focus on growing your business further.',
            features: [
                {
                    title: 'Online POS',
                    desc: 'Fast transactions, table management, e-wallet integration, and automatic receipt printing.',
                    image: '/fitur/kasir.png'
                },
                {
                    title: 'Smart Inventory',
                    desc: 'Monitor real-time stock, low stock notifications, and multi-warehouse management.',
                    image: '/fitur/inventory.png'
                },
                {
                    title: 'Business Analytics',
                    desc: 'Automatic profit and loss reports, daily sales analysis, and best-selling product trend data.',
                    image: '/fitur/analis.png'
                },
                {
                    title: 'Employee Management',
                    desc: 'Location-based online attendance, shift settings, and automatic commission calculation.',
                    image: '/fitur/karyawan.png'
                }
            ]
        }
    };

    const current = content[lang];

    return (
        <section id="features" className="paylo-features">
            <div className="paylo-container">
                <div className="paylo-section-header">
                    <span className="paylo-section-label">{current.label}</span>
                    <h2 className="paylo-section-title">{current.title}</h2>
                    <p className="paylo-section-desc">
                        {current.desc}
                    </p>
                </div>

                <div className="paylo-features-modern">
                    {current.features.map((f, i) => (
                        <div key={i} className={`paylo-feature-row ${i % 2 !== 0 ? 'paylo-feature-row--reverse' : ''}`}>
                            <div className="paylo-feature-row__content">
                                <div className="paylo-feature-row__number">0{i + 1}</div>
                                <h3 className="paylo-feature-row__title">{f.title}</h3>
                                <p className="paylo-feature-row__desc">{f.desc}</p>
                                <a href="#contact" className="paylo-feature-row__link">
                                    {lang === 'ID' ? 'Pelajari Detail' : 'Learn Details'}
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </a>
                            </div>
                            <div className="paylo-feature-row__image-wrapper">
                                <div className="paylo-feature-row__image-bg"></div>
                                <img src={f.image} alt={f.title} className="paylo-feature-row__image" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
