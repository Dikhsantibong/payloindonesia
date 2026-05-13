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
                { label: 'Produk', href: '/#products', hasDropdown: true, type: 'products' },
                { label: 'Layanan', href: '/#about', hasDropdown: true, type: 'services' },
                { label: 'Solusi', href: '/#solutions', hasDropdown: true, type: 'solutions' },
                { label: 'Harga', href: '/pricing', hasDropdown: false, isExternal: true },
                { label: 'Support', href: '/#support', hasDropdown: true, type: 'support' },
                { label: 'Demo Paylo', href: '/demo', hasDropdown: false, isExternal: true },
            ],
            signin: 'Masuk',
            cta: 'Coba Gratis'
        },
        EN: {
            links: [
                { label: 'Products', href: '/#products', hasDropdown: true, type: 'products' },
                { label: 'Services', href: '/#about', hasDropdown: true, type: 'services' },
                { label: 'Solutions', href: '/#solutions', hasDropdown: true, type: 'solutions' },
                { label: 'Pricing', href: '/pricing', hasDropdown: false, isExternal: true },
                { label: 'Support', href: '/#support', hasDropdown: true, type: 'support' },
                { label: 'Paylo Demo', href: '/demo', hasDropdown: false, isExternal: true },
            ],
            signin: 'Sign In',
            cta: 'Free Trial'
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
                    <a href="#" className="paylo-nav__signin">{current.signin}</a>
                    <Link href="/demo" className="paylo-btn paylo-btn--teal paylo-btn--sm">
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

            {/* Mega Menus (same as before) */}
            {activeDropdown === 'products' && (
                <div className="paylo-mega">
                    <div className="paylo-mega__container">
                        <div className="paylo-mega__sidebar">
                            <h2 className="paylo-mega__title">Produk</h2>
                            <p className="paylo-mega__desc">Temukan informasi produk dan fitur paylo lebih lanjut.</p>
                            <Link href="/demo" className="paylo-mega__btn">Lebih lanjut <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
                            <div className="paylo-mega__footer-links">
                                <a href="#">Kenapa pilih paylo? →</a>
                                <a href="#">Update produk paylo →</a>
                            </div>
                        </div>
                        <div className="paylo-mega__content">
                            <div className="paylo-mega__section">
                                <h4 className="paylo-mega__section-title">FITUR APLIKASI</h4>
                                <div className="paylo-mega__grid-apps">
                                    <div className="paylo-mega__app-pill" style={{backgroundColor: '#F59E0B'}}>Kasir Online →</div>
                                    <div className="paylo-mega__app-pill" style={{backgroundColor: '#0EA5E9'}}>Akuntansi →</div>
                                    <div className="paylo-mega__app-pill" style={{backgroundColor: '#EC4899'}}>Aplikasi CRM →</div>
                                    <div className="paylo-mega__app-pill" style={{backgroundColor: '#6366F1'}}>Aplikasi Owner →</div>
                                    <div className="paylo-mega__app-pill" style={{backgroundColor: '#D97706'}}>Karyawan →</div>
                                    <div className="paylo-mega__app-pill" style={{backgroundColor: '#4F46E5'}}>Inventori →</div>
                                    <div className="paylo-mega__app-pill" style={{backgroundColor: '#10B981'}}>Analisa Bisnis →</div>
                                    <div className="paylo-mega__app-pill" style={{backgroundColor: '#EF4444'}}>Order Online →</div>
                                </div>
                            </div>
                            <div className="paylo-mega__section">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="paylo-mega__section-title">PRODUK PRIME</h4>
                                    <a href="#" className="text-sm text-blue-600 font-bold">Lihat semua →</a>
                                </div>
                                <div className="paylo-mega__grid-prime">
                                    <div className="paylo-mega__prime-card">Prime FnB</div>
                                    <div className="paylo-mega__prime-card">Prime Jasa</div>
                                    <div className="paylo-mega__prime-card">Prime Retail</div>
                                    <div className="paylo-mega__prime-card">Prime Beauty</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Services Mega Menu */}
            {activeDropdown === 'services' && (
                <div className="paylo-mega">
                    <div className="paylo-mega__container">
                        <div className="paylo-mega__sidebar">
                            <h2 className="paylo-mega__title">Layanan</h2>
                            <p className="paylo-mega__desc">Kembangkan bisnis dengan layanan dan bimbingan.</p>
                            <Link href="/demo" className="paylo-mega__btn">Lebih lanjut <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
                        </div>
                        <div className="paylo-mega__content">
                            <div className="paylo-mega__section">
                                <h4 className="paylo-mega__section-title">PAYLO GROW</h4>
                                <div className="paylo-mega__grid-services">
                                    <div className="paylo-mega__service-card">Franchise</div>
                                    <div className="paylo-mega__service-card">Pay</div>
                                    <div className="paylo-mega__service-card">Capital</div>
                                    <div className="paylo-mega__service-card">Supplies</div>
                                    <div className="paylo-mega__service-card">Ads</div>
                                </div>
                            </div>
                            <div className="paylo-mega__section">
                                <h4 className="paylo-mega__section-title">PAYLOWIRA</h4>
                                <div className="paylo-mega__grid-services">
                                    <div className="paylo-mega__service-card">Mentor</div>
                                    <div className="paylo-mega__service-card">Kompetisi</div>
                                    <div className="paylo-mega__service-card">Ruang</div>
                                    <div className="paylo-mega__service-card">Pustaka</div>
                                    <div className="paylo-mega__service-card">Inspirasi</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Solutions Mega Menu */}
            {activeDropdown === 'solutions' && (
                <div className="paylo-mega">
                    <div className="paylo-mega__container">
                        <div className="paylo-mega__sidebar">
                            <h2 className="paylo-mega__title">Solusi Bisnis</h2>
                            <p className="paylo-mega__desc">Semua solusi untuk segala jenis bisnismu.</p>
                            <Link href="/demo" className="paylo-mega__btn">Lebih lanjut <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
                        </div>
                        <div className="paylo-mega__content">
                            <div className="paylo-mega__grid-solutions">
                                <div className="paylo-mega__sol-col">
                                    <h5 className="font-bold mb-2">Food & Beverages</h5>
                                    <p className="text-xs text-slate-500">Restaurant & Dining</p>
                                    <p className="text-xs text-slate-500">Cafe & Beverage</p>
                                    <p className="text-xs text-slate-500">Cloud based Multi-Outlet</p>
                                </div>
                                <div className="paylo-mega__sol-col">
                                    <h5 className="font-bold mb-2">Hospitality & Service</h5>
                                    <p className="text-xs text-slate-500">Beauty & Wellness</p>
                                    <p className="text-xs text-slate-500">Lodging & Leisure</p>
                                    <p className="text-xs text-slate-500">Automotive Services</p>
                                </div>
                                <div className="paylo-mega__sol-col">
                                    <h5 className="font-bold mb-2">Retail & Distribution</h5>
                                    <p className="text-xs text-slate-500">Daily Needs & Grocery</p>
                                    <p className="text-xs text-slate-500">Specialized Retail</p>
                                    <p className="text-xs text-slate-500">Fashion & Lifestyle</p>
                                </div>
                                <div className="paylo-mega__sol-col">
                                    <h5 className="font-bold mb-2">Enterprise</h5>
                                    <p className="text-xs text-slate-500">Production & Mfg</p>
                                    <p className="text-xs text-slate-500">Contracting & Projects</p>
                                    <p className="text-xs text-slate-500">Consulting & B2B</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeDropdown === 'support' && (
                <div className="paylo-mega">
                    <div className="paylo-mega__container">
                        <div className="paylo-mega__sidebar">
                            <h2 className="paylo-mega__title">Support</h2>
                            <p className="paylo-mega__desc">Kami siap membantu perkembangan bisnis Anda 24/7.</p>
                            <div className="paylo-mega__footer-links">
                                <a href="#">Pusat Bantuan →</a>
                                <a href="#">Komunitas Pengguna →</a>
                            </div>
                        </div>
                        <div className="paylo-mega__content">
                            <div className="paylo-mega__grid-support">
                                <div className="paylo-mega__support-item">
                                    <div className="paylo-mega__support-icon">📞</div>
                                    <div>
                                        <h5 className="font-bold">Paylo Care</h5>
                                        <p className="text-xs text-slate-500">Layanan pelanggan prioritas</p>
                                    </div>
                                </div>
                                <div className="paylo-mega__support-item">
                                    <div className="paylo-mega__support-icon">✉️</div>
                                    <div>
                                        <h5 className="font-bold">Hubungi Kami</h5>
                                        <p className="text-xs text-slate-500">Kirim pertanyaan atau feedback</p>
                                    </div>
                                </div>
                                <div className="paylo-mega__support-item">
                                    <div className="paylo-mega__support-icon">❓</div>
                                    <div>
                                        <h5 className="font-bold">FAQ</h5>
                                        <p className="text-xs text-slate-500">Jawaban cepat untuk pertanyaan umum</p>
                                    </div>
                                </div>
                                <div className="paylo-mega__support-item">
                                    <div className="paylo-mega__support-icon">📖</div>
                                    <div>
                                        <h5 className="font-bold">Panduan Pengguna</h5>
                                        <p className="text-xs text-slate-500">Tutorial lengkap penggunaan fitur</p>
                                    </div>
                                </div>
                                <div className="paylo-mega__support-item">
                                    <div className="paylo-mega__support-icon">🎥</div>
                                    <div>
                                        <h5 className="font-bold">Video Tutorial</h5>
                                        <p className="text-xs text-slate-500">Visualisasi langkah demi langkah</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
