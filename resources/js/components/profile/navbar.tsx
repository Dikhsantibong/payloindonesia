import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function Navbar({ lang, setLang }: { lang: 'ID' | 'EN', setLang: (l: 'ID' | 'EN') => void }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const content = {
        ID: {
            links: [
                { label: 'Layanan', href: '/#about', hasDropdown: true, type: 'services' },
                { label: 'Solusi', href: '/#solutions', hasDropdown: true, type: 'solutions' },
                { label: 'Harga', href: '/pricing', hasDropdown: false, isExternal: true },
                { label: 'Support', href: '/#support', hasDropdown: true, type: 'support' },
                { label: 'Demo Paylo', href: '/demo', hasDropdown: false, isExternal: true },
            ],
            signin: 'Masuk',
            cta: 'Coba Gratis',
            servicesTitle: 'Layanan Ekosistem',
            servicesDesc: 'Kembangkan bisnis Anda secara berkelanjutan dengan bimbingan, suplai bahan baku, pendanaan, dan layanan tambahan Paylo.',
            servicesMore: 'Selengkapnya',
            servicesList: [
                { title: 'POS Kasir', desc: 'Kelola transaksi penjualan lebih cepat dan mudah.', num: '01' },
                { title: 'Inventory', desc: 'Pantau stok barang dan bahan baku realtime.', num: '02' },
                { title: 'Analisa Bisnis', desc: 'Lihat laporan penjualan dan performa usaha.', num: '03' },
                { title: 'Manajemen Karyawan', desc: 'Absensi, jadwal kerja, dan data staff.', num: '04' },
                { title: 'Pembayaran Digital', desc: 'QRIS dan metode pembayaran modern.', num: '05' },
                { title: 'Support & Setup', desc: 'Tim Paylo membantu onboarding bisnis Anda.', num: '06' },
            ],
            supportItems: [
                { title: 'Paylo Assist 24/7' },
                { title: 'Kirim Tiket Bantuan' },
                { title: 'Pusat Solusi Cepat' },
                { title: 'Dokumentasi & Fitur' },
                { title: 'Akademi & Video Panduan' }
            ],
            solutionsTitle: 'Solusi Bisnis',
            solutionsDesc: 'Semua solusi terbaik untuk mendominasi segala jenis bisnismu.',
            solutionsMore: 'Lebih Lanjut',
            solutions: [
                {
                    title: 'Food & Beverages',
                    items: [
                        'Restoran & Dining',
                        'Kafe & Kedai Kopi',
                        'Katering & Jasa Boga',
                        'Waralaba & Multi-Outlet',
                        'Food Truck & Street Food'
                    ]
                },
                {
                    title: 'Jasa & Layanan',
                    items: [
                        'Kecantikan, Rambut & Spa',
                        'Hotel, Villa & Penginapan',
                        'Pusat Kebugaran & Gym',
                        'Bengkel & Servis Otomotif',
                        'Klinik & Studio Profesional'
                    ]
                },
                {
                    title: 'Ritel & Distribusi',
                    items: [
                        'Minimarket & Toko Kelontong',
                        'Fashion, Butik & Aksesoris',
                        'Apotek & Toko Obat',
                        'Toko Elektronik & Gadget',
                        'Grosir & Distributor Besar'
                    ]
                },
                {
                    title: 'Korporat & Enterprise',
                    items: [
                        'Pabrik & Manufaktur',
                        'Pergudangan & Rantai Pasok',
                        'Logistik, Kurir & Kargo',
                        'Agensi Kreatif & Konsultan IT',
                        'Pusat Edukasi & Pelatihan'
                    ]
                }
            ]
        },
        EN: {
            links: [
                { label: 'Services', href: '/#about', hasDropdown: true, type: 'services' },
                { label: 'Solutions', href: '/#solutions', hasDropdown: true, type: 'solutions' },
                { label: 'Pricing', href: '/pricing', hasDropdown: false, isExternal: true },
                { label: 'Support', href: '/#support', hasDropdown: true, type: 'support' },
                { label: 'Paylo Demo', href: '/demo', hasDropdown: false, isExternal: true },
            ],
            signin: 'Sign In',
            cta: 'Free Trial',
            servicesTitle: 'Ecosystem Services',
            servicesDesc: 'Grow your business sustainably with raw supply chains, flexible funding, and expert business guidance.',
            servicesMore: 'Learn More',
            servicesList: [
                { title: 'POS System', desc: 'Manage sales transactions faster and easier.', num: '01' },
                { title: 'Inventory', desc: 'Monitor goods and raw material stock in real-time.', num: '02' },
                { title: 'Business Analytics', desc: 'View sales reports and business performance.', num: '03' },
                { title: 'Employee Management', desc: 'Attendance, work schedules, and staff data.', num: '04' },
                { title: 'Digital Payment', desc: 'QRIS and modern payment methods.', num: '05' },
                { title: 'Support & Setup', desc: 'Paylo team helps onboard your business.', num: '06' },
            ],
            supportItems: [
                { title: 'Paylo Assist 24/7' },
                { title: 'Submit Support Ticket' },
                { title: 'Quick Solution Center' },
                { title: 'Docs & Feature Guides' },
                { title: 'Paylo Academy (Videos)' }
            ],
            solutionsTitle: 'Business Solutions',
            solutionsDesc: 'All the best solutions to dominate any type of your business.',
            solutionsMore: 'Learn More',
            solutions: [
                {
                    title: 'Food & Beverages',
                    items: [
                        'Restaurants & Fine Dining',
                        'Cafes & Coffee Shops',
                        'Catering & Event Service',
                        'Franchises & Multi-Outlets',
                        'Food Trucks & Street Food'
                    ]
                },
                {
                    title: 'Hospitality & Services',
                    items: [
                        'Beauty, Hair & Spa Salons',
                        'Hotels, Villas & Lodgings',
                        'Fitness Centers & Gyms',
                        'Automotive & Repair Workshops',
                        'Clinics & Professional Studios'
                    ]
                },
                {
                    title: 'Retail & Distribution',
                    items: [
                        'Minimarts & Grocery Stores',
                        'Fashion, Boutiques & Accessories',
                        'Pharmacies & Drugstores',
                        'Electronics & Gadget Stores',
                        'Wholesalers & Distributors'
                    ]
                },
                {
                    title: 'Corporate & Enterprise',
                    items: [
                        'Factories & Manufacturing',
                        'Supply Chain & Warehousing',
                        'Logistics, Courier & Cargo Services',
                        'Creative Agencies & IT Consultants',
                        'Education & Training Centers'
                    ]
                }
            ]
        }
    };

    const current = content[lang];

    return (
        <nav
            id="navbar"
            className={`paylo-nav ${scrolled ? 'paylo-nav--scrolled' : ''}`}
            onMouseLeave={() => setActiveDropdown(null)}
        >
            <div className="paylo-nav__inner">
                <div className="paylo-nav__left">
                    <Link href="/" className="paylo-nav__logo">
                        <svg width="100" height="32" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <text x="0" y="30" fontFamily="Plus Jakarta Sans" fontWeight="800" fontSize="32" fill="#2563EB">paylo</text>
                        </svg>
                    </Link>

                    <div className="paylo-nav__links">
                        {current.links.map((l) => (
                            <div 
                                key={l.label} 
                                className="paylo-nav__link-wrapper"
                                onMouseEnter={() => l.hasDropdown && setActiveDropdown(l.type || null)}
                                style={{ position: 'relative' }}
                            >
                                {l.isExternal ? (
                                    <Link href={l.href} className={`paylo-nav__link ${activeDropdown === l.type ? 'active' : ''}`}>
                                        {l.label}
                                    </Link>
                                ) : (
                                    <a href={l.href} className={`paylo-nav__link ${activeDropdown === l.type ? 'active' : ''}`}>
                                        {l.label}
                                        {l.hasDropdown && (
                                            <svg className={`paylo-nav__chevron ${activeDropdown === l.type ? 'rotate' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <path d="M6 9l6 6 6-6" />
                                            </svg>
                                        )}
                                    </a>
                                )}

                                {l.type === 'support' && activeDropdown === 'support' && (
                                    <div 
                                        className="paylo-support-dropdown"
                                        style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            marginTop: '10px',
                                            background: '#ffffff',
                                            borderRadius: '24px',
                                            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.1), 0 0 1px 0 rgba(0, 0, 0, 0.08)',
                                            width: '240px',
                                            padding: '24px 20px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '16px',
                                            zIndex: 1000,
                                            border: '1px solid rgba(226, 232, 240, 0.8)'
                                        }}
                                    >
                                        {current.supportItems && current.supportItems.map((item: any) => (
                                            <a 
                                                key={item.title} 
                                                href="#" 
                                                style={{ 
                                                    fontSize: '14px', 
                                                    fontWeight: '600', 
                                                    color: '#1e293b', 
                                                    textDecoration: 'none',
                                                    paddingLeft: '4px',
                                                    transition: 'all 0.15s ease',
                                                    textAlign: 'left',
                                                    display: 'block'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.color = '#2563EB';
                                                    e.currentTarget.style.transform = 'translateX(4px)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.color = '#1e293b';
                                                    e.currentTarget.style.transform = 'translateX(0)';
                                                }}
                                            >
                                                {item.title}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="paylo-nav__right">
                    <div className="paylo-nav__lang-selector">
                        <button className={`paylo-nav__lang-btn ${lang === 'ID' ? 'active' : ''}`} onClick={() => setLang('ID')}>ID</button>
                        <span className="paylo-nav__lang-divider">|</span>
                        <button className={`paylo-nav__lang-btn ${lang === 'EN' ? 'active' : ''}`} onClick={() => setLang('EN')}>EN</button>
                    </div>
                    <Link href="/login" className="paylo-nav__signin">{current.signin}</Link>
                    <Link href="/register" className="paylo-btn paylo-btn--teal paylo-btn--sm">
                        {current.cta}
                    </Link>
                </div>

                <button
                    className="paylo-nav__burger"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="paylo-nav__mobile">
                    {current.links.map((l) => (
                        <div key={l.label}>
                            {l.isExternal ? (
                                <Link href={l.href} className="paylo-nav__mobile-link" onClick={() => setMobileOpen(false)}>
                                    {l.label}
                                </Link>
                            ) : (
                                <a href={l.href} className="paylo-nav__mobile-link" onClick={() => setMobileOpen(false)}>
                                    {l.label}
                                </a>
                            )}
                        </div>
                    ))}
                    <div className="paylo-nav__mobile-actions">
                        <div className="paylo-nav__lang-selector">
                            <button className={`paylo-nav__lang-btn ${lang === 'ID' ? 'active' : ''}`} onClick={() => setLang('ID')}>ID</button>
                            <span className="paylo-nav__lang-divider">|</span>
                            <button className={`paylo-nav__lang-btn ${lang === 'EN' ? 'active' : ''}`} onClick={() => setLang('EN')}>EN</button>
                        </div>
                        <Link href="/login" className="paylo-nav__mobile-link" onClick={() => setMobileOpen(false)}>{current.signin}</Link>
                        <Link href="/register" className="paylo-btn paylo-btn--teal paylo-btn--sm" onClick={() => setMobileOpen(false)}>
                            {current.cta}
                        </Link>
                    </div>
                </div>
            )}

            {/* Mega Menus (same as before) */}


            {/* Services Mega Menu */}
            {activeDropdown === 'services' && (
                <div className="paylo-mega">
                    <div className="paylo-mega__container">
                        <div className="paylo-mega__sidebar" style={{ padding: '40px' }}>
                            <h2 className="paylo-mega__title" style={{ fontSize: '28px', fontWeight: '800' }}>
                                {current.servicesTitle}
                            </h2>
                            <p className="paylo-mega__desc" style={{ fontSize: '14px', lineHeight: '1.6', margin: '16px 0 32px', color: '#4b5563' }}>
                                {current.servicesDesc}
                            </p>
                            <Link href="/demo" className="paylo-mega__btn" style={{ padding: '12px 24px', fontSize: '15px' }}>
                                {current.servicesMore} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </Link>
                        </div>
                        <div className="paylo-mega__content" style={{ padding: '40px' }}>
                            <div className="paylo-mega__grid-services" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                                {current.servicesList && current.servicesList.map((item: any) => (
                                    <div 
                                        key={item.title} 
                                        className="paylo-mega__service-card" 
                                        style={{ 
                                            textAlign: 'left', 
                                            padding: '24px', 
                                            background: '#ffffff', 
                                            borderRadius: '16px', 
                                            border: '1px solid #e2e8f0', 
                                            transition: 'all 0.2s', 
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '8px'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = '#2563EB';
                                            e.currentTarget.style.boxShadow = '0 12px 24px -8px rgba(37, 99, 235, 0.15)';
                                            e.currentTarget.style.transform = 'translateY(-4px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = '#e2e8f0';
                                            e.currentTarget.style.boxShadow = 'none';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                                            <span style={{ fontSize: '14px', fontWeight: '800', color: '#2563EB', opacity: '0.9', letterSpacing: '0.05em' }}>{item.num}</span>
                                            <h5 style={{ fontWeight: '800', color: '#0f172a', fontSize: '16px', margin: '0' }}>{item.title}</h5>
                                        </div>
                                        <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: '0' }}>{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Solutions Mega Menu */}
            {activeDropdown === 'solutions' && (
                <div className="paylo-mega">
                    <div className="paylo-mega__container">
                        <div className="paylo-mega__sidebar" style={{ padding: '32px' }}>
                            <h2 className="paylo-mega__title" style={{ fontSize: '26px', fontWeight: '800' }}>{current.solutionsTitle}</h2>
                            <p className="paylo-mega__desc" style={{ fontSize: '13px', lineHeight: '1.5', margin: '12px 0 24px', color: '#4b5563' }}>{current.solutionsDesc}</p>
                            <Link href="/demo" className="paylo-mega__btn" style={{ padding: '10px 18px', fontSize: '14px' }}>
                                {current.solutionsMore} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </Link>
                        </div>
                        <div className="paylo-mega__content" style={{ padding: '32px' }}>
                            <div className="paylo-mega__grid-solutions" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                                {current.solutions.map((col: any) => (
                                    <div key={col.title} className="paylo-mega__sol-col" style={{ textAlign: 'left' }}>
                                        <h5 style={{ fontWeight: '800', color: '#0f172a', fontSize: '15px', marginBottom: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>{col.title}</h5>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {col.items.map((item: string) => (
                                                <a 
                                                    key={item} 
                                                    href="#" 
                                                    style={{ 
                                                        fontSize: '12.5px', 
                                                        color: '#64748b', 
                                                        textDecoration: 'none',
                                                        transition: 'all 0.15s ease',
                                                        display: 'block'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.color = '#2563EB';
                                                        e.currentTarget.style.transform = 'translateX(4px)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.color = '#64748b';
                                                        e.currentTarget.style.transform = 'translateX(0)';
                                                    }}
                                                >
                                                    {item}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </nav>
    );
}
