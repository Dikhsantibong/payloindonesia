export default function HeroSection({ lang }: { lang: 'ID' | 'EN' }) {
    const content = {
        ID: {
            badge: '🚀 Platform Bisnis All-in-One',
            title: 'Satu Sistem untuk Kendali Bisnis yang Lebih Pintar',
            subtitle: 'Kelola kasir, inventaris, hingga laporan keuangan dalam satu dashboard terintegrasi. Tingkatkan efisiensi dan fokus pada pertumbuhan bisnis Anda.',
            ctaPrimary: 'Coba Gratis Sekarang',
            ctaSecondary: 'Lihat Demo Produk',
            stats: [
                { label: 'Pengguna Aktif', value: '10,000+' },
                { label: 'Transaksi Bulanan', value: '1jt+' },
                { label: 'Kepuasan Pelanggan', value: '99%' }
            ]
        },
        EN: {
            badge: '🚀 All-in-One Business Platform',
            title: 'One System for Smarter Business Control',
            subtitle: 'Manage cashier, inventory, to financial reports in one integrated dashboard. Increase efficiency and focus on growing your business.',
            ctaPrimary: 'Try Free Now',
            ctaSecondary: 'Watch Product Demo',
            stats: [
                { label: 'Active Users', value: '10,000+' },
                { label: 'Monthly Transactions', value: '1M+' },
                { label: 'Customer Satisfaction', value: '99%' }
            ]
        }
    };

    const current = content[lang];

    return (
        <section className="paylo-hero">
            <div className="paylo-hero__bg">
                <div className="paylo-hero__grid-pattern" />
                <div className="paylo-hero__glow paylo-hero__glow--1" />
                <div className="paylo-hero__glow paylo-hero__glow--2" />
            </div>

            <div className="paylo-container">
                <div className="paylo-hero__layout">
                    <div className="paylo-hero__content">
                        <div className="paylo-hero__badge">{current.badge}</div>
                        <h1 className="paylo-hero__title">
                            {current.title.split(' ').map((word, i) => (
                                <span key={i} className={i > 4 ? 'text-blue-600' : ''}>{word} </span>
                            ))}
                        </h1>
                        <p className="paylo-hero__subtitle">
                            {current.subtitle}
                        </p>
                        <div className="paylo-hero__actions">
                            <button className="paylo-btn paylo-btn--teal paylo-btn--lg">
                                {current.ctaPrimary}
                            </button>
                            <button className="paylo-btn paylo-btn--outline-teal paylo-btn--lg">
                                {current.ctaSecondary}
                            </button>
                        </div>
                        
                        <div className="paylo-hero__stats">
                            {current.stats.map((stat, i) => (
                                <div key={i} className="paylo-hero__stat-item">
                                    <div className="paylo-hero__stat-value">{stat.value}</div>
                                    <div className="paylo-hero__stat-label">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="paylo-hero__visual">
                        <div className="paylo-hero__mockup-container">
                            {/* Main Dashboard Placeholder */}
                            <div className="paylo-hero__main-mockup">
                                <div className="paylo-hero__placeholder-image">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="1">
                                        <rect width="18" height="18" x="3" y="3" rx="2" />
                                        <path d="M3 9h18M9 21V9" />
                                    </svg>
                                    <span>UTAMA DASHBOARD</span>
                                </div>
                            </div>

                            {/* Floating UI Elements */}
                            <div className="paylo-hero__float-card paylo-hero__float-card--1">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-[10px] font-bold text-slate-400">PENJUALAN HARI INI</span>
                                </div>
                                <div className="text-lg font-bold text-slate-800">Rp 12.450.000</div>
                                <div className="text-[10px] text-green-500 font-bold">↑ 12% dari kemarin</div>
                            </div>

                            <div className="paylo-hero__float-card paylo-hero__float-card--2">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span className="text-[10px] font-bold text-slate-400">STOK MENIPIS</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[30%]" />
                                    </div>
                                    <span className="text-[10px] text-slate-600">Kopi Arabika (5kg tersisa)</span>
                                </div>
                            </div>

                            <div className="paylo-hero__float-card paylo-hero__float-card--3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs">👤</div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold">Budi Santoso</span>
                                    <span className="text-[8px] text-slate-400">Shift Pagi Aktif</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
