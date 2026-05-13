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
                    icon: '📱'
                },
                {
                    title: 'Inventori Pintar',
                    desc: 'Pantau stok real-time, notifikasi stok menipis, dan manajemen multi-gudang.',
                    icon: '📦'
                },
                {
                    title: 'Analisa Bisnis',
                    desc: 'Laporan laba rugi otomatis, analisa penjualan harian, dan data tren produk terlaris.',
                    icon: '📈'
                },
                {
                    title: 'Manajemen Karyawan',
                    desc: 'Absensi online berbasis lokasi, pengaturan shift, hingga hitung komisi otomatis.',
                    icon: '👥'
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
                    icon: '📱'
                },
                {
                    title: 'Smart Inventory',
                    desc: 'Monitor real-time stock, low stock notifications, and multi-warehouse management.',
                    icon: '📦'
                },
                {
                    title: 'Business Analytics',
                    desc: 'Automatic profit and loss reports, daily sales analysis, and best-selling product trend data.',
                    icon: '📈'
                },
                {
                    title: 'Employee Management',
                    desc: 'Location-based online attendance, shift settings, and automatic commission calculation.',
                    icon: '👥'
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

                <div className="paylo-features__grid">
                    {current.features.map((f, i) => (
                        <div key={i} className="paylo-features__card">
                            <div className="paylo-features__icon-box">{f.icon}</div>
                            <h3 className="paylo-features__name">{f.title}</h3>
                            <p className="paylo-features__desc">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
