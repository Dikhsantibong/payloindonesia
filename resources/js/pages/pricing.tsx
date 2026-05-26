import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/components/profile/navbar';
import FooterSection from '@/components/profile/footer-section';
import TopBar from '@/components/profile/top-bar';

export default function Pricing({ plans }: any) {
    const [lang, setLang] = useState<'ID' | 'EN'>('ID');

    const content = {
        ID: {
            title: 'Pilih Paket yang Sesuai untuk Bisnis Anda',
            subtitle: 'Harga transparan tanpa biaya tersembunyi. Mulai gratis dan upgrade kapan saja.',
            ctaDefault: 'Mulai Sekarang',
        },
        EN: {
            title: 'Choose the Right Plan for Your Business',
            subtitle: 'Transparent pricing with no hidden fees. Start for free and upgrade anytime.',
            ctaDefault: 'Get Started',
        }
    };

    const current = content[lang];

    return (
        <>
            <Head title="Harga Paket Paylo — Solusi Digital Bisnis" />
            <div className="paylo-profile">
                <TopBar />
                <Navbar lang={lang} setLang={setLang} />
                
                {/* Hero Section for Pricing Page */}
                <section className="paylo-hero">
                    <div className="paylo-hero__bg">
                        <div className="paylo-hero__grid-pattern" />
                        <div className="paylo-hero__glow paylo-hero__glow--1" />
                        <div className="paylo-hero__glow paylo-hero__glow--2" />
                    </div>

                    <div className="paylo-container">
                        <div className="paylo-hero__layout">
                            <div className="paylo-hero__content">
                                <div className="paylo-hero__badge">
                                    {lang === 'ID' ? 'PAKET & INVESTASI' : 'PLANS & INVESTMENT'}
                                </div>
                                <h1 className="paylo-hero__title" style={{ fontSize: 'clamp(40px, 4.5vw, 56px)', lineHeight: '1.15' }}>
                                    {lang === 'ID' 
                                        ? 'Pilih Paket Terbaik untuk Sukses Bisnis Anda' 
                                        : 'Choose the Perfect Plan for Your Business Success'}
                                </h1>
                                <p className="paylo-hero__subtitle" style={{ fontSize: '17px', color: '#4b5563', marginTop: '16px', marginBottom: '32px' }}>
                                    {lang === 'ID'
                                        ? 'Mulai dengan uji coba gratis 14 hari tanpa kartu kredit. Temukan rencana harga transparan yang dirancang khusus untuk mendukung operasional kasir, manajemen stok, dan laporan keuangan usaha Anda secara maksimal.'
                                        : 'Start with a 14-day free trial. No credit card required. Explore transparent pricing plans designed specifically to power your POS, inventory management, and financial reporting.'}
                                </p>
                                <div className="paylo-hero__actions">
                                    <button 
                                        onClick={() => {
                                            const el = document.getElementById('pricing-plans-section');
                                            el?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="paylo-btn paylo-btn--teal paylo-btn--lg"
                                        style={{ border: 'none', cursor: 'pointer' }}
                                    >
                                        {lang === 'ID' ? 'Lihat Paket Harga' : 'View Pricing Plans'}
                                    </button>
                                    <a 
                                        href="https://wa.me/628123456789" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="paylo-btn paylo-btn--outline-teal paylo-btn--lg"
                                        style={{ display: 'inline-flex', alignItems: 'center' }}
                                    >
                                        {lang === 'ID' ? 'Konsultasi Sales' : 'Contact Sales'}
                                    </a>
                                </div>

                                <div className="paylo-hero__stats" style={{ marginTop: '40px', paddingTop: '32px' }}>
                                    <div className="paylo-hero__stat-item">
                                        <div className="paylo-hero__stat-value" style={{ fontSize: '28px', color: '#2563EB' }}>14 Hari</div>
                                        <div className="paylo-hero__stat-label" style={{ fontSize: '11px' }}>{lang === 'ID' ? 'Masa Trial Gratis' : 'Free Trial Period'}</div>
                                    </div>
                                    <div className="paylo-hero__stat-item">
                                        <div className="paylo-hero__stat-value" style={{ fontSize: '28px', color: '#2563EB' }}>Rp 0</div>
                                        <div className="paylo-hero__stat-label" style={{ fontSize: '11px' }}>{lang === 'ID' ? 'Biaya Pendaftaran' : 'Registration Fee'}</div>
                                    </div>
                                    <div className="paylo-hero__stat-item">
                                        <div className="paylo-hero__stat-value" style={{ fontSize: '28px', color: '#2563EB' }}>99.9%</div>
                                        <div className="paylo-hero__stat-label" style={{ fontSize: '11px' }}>{lang === 'ID' ? 'Server Uptime' : 'Server Uptime'}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="paylo-hero__visual">
                                <div className="paylo-hero__mockup-container">
                                    <div className="paylo-hero__main-mockup">
                                        <div className="paylo-hero__placeholder-image" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', color: '#1e293b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                                            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5">
                                                <rect width="18" height="18" x="3" y="3" rx="2" />
                                                <path d="M12 8v8m-4-4h8" />
                                            </svg>
                                            <span style={{ fontSize: '15px', fontWeight: '800', letterSpacing: '0.05em', color: '#2563EB' }}>
                                                {lang === 'ID' ? 'PILIH PAKET SUKSES ANDA' : 'SELECT YOUR SUCCESS PLAN'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Floating UI Elements */}
                                    <div className="paylo-hero__float-card paylo-hero__float-card--1" style={{ width: '180px' }}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                                            <span className="text-[9px] font-bold text-slate-400">PAKET TRIAL</span>
                                        </div>
                                        <div className="text-base font-bold text-slate-800">Gratis 14 Hari</div>
                                        <div className="text-[9px] text-blue-500 font-bold">Tanpa Kartu Kredit</div>
                                    </div>

                                    <div className="paylo-hero__float-card paylo-hero__float-card--2" style={{ width: '200px' }}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                            <span className="text-[9px] font-bold text-slate-400">OPERASIONAL KASIR</span>
                                        </div>
                                        <div className="text-base font-bold text-slate-800">100% Terintegrasi</div>
                                        <div className="text-[9px] text-emerald-500 font-bold">Siap Pakai Seketika</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Pricing Plans Section */}
                <section id="pricing-plans-section" className="paylo-pricing-page" style={{ paddingTop: '80px', borderTop: '1px solid #f1f5f9' }}>
                    <div className="paylo-container">
                        <div className="paylo-demo-page__header" style={{ marginBottom: '56px', textAlign: 'center' }}>
                            <h2 className="paylo-demo-page__title" style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a' }}>{current.title}</h2>
                            <p className="paylo-demo-page__subtitle" style={{ fontSize: '16px', color: '#64748b', marginTop: '12px' }}>{current.subtitle}</p>
                        </div>

                        <div className="paylo-pricing-grid">
                            {plans && plans.map((plan: any) => {
                                const isRecommended = plan.name.toLowerCase() === 'pro';
                                return (
                                    <div key={plan.id} className={`paylo-pricing-card ${isRecommended ? 'recommended' : ''}`}>
                                        {isRecommended && <div className="paylo-pricing-card__badge">Populer</div>}
                                        <h3 className="paylo-pricing-card__name">{plan.name}</h3>
                                        <div className="paylo-pricing-card__price">
                                            <span className="value">
                                                {Number(plan.price) === 0 
                                                    ? (lang === 'ID' ? 'Gratis' : 'Free') 
                                                    : `Rp ${Number(plan.price).toLocaleString('id-ID')}`}
                                            </span>
                                            {Number(plan.price) > 0 && <span className="period">/{plan.duration_days} {lang === 'ID' ? 'hari' : 'days'}</span>}
                                        </div>
                                        <p className="paylo-pricing-card__desc">
                                            {plan.max_users} Users, {plan.max_products} {lang === 'ID' ? 'Produk' : 'Products'}
                                        </p>
                                        <ul className="paylo-pricing-card__list">
                                            {Array.isArray(plan.features) && plan.features.map((f: string) => (
                                                <li key={f}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                        <button className={`paylo-btn paylo-btn--full ${isRecommended ? 'paylo-btn--teal' : 'paylo-btn--outline-teal'}`}>
                                            {current.ctaDefault}
                                        </button>
                                    </div>
                                );
                            })}
                            
                            {(!plans || plans.length === 0) && (
                                <p className="text-center w-full col-span-3 py-10">Belum ada paket tersedia.</p>
                            )}
                        </div>
                    </div>
                </section>

                <FooterSection lang={lang} />
            </div>
        </>
    );
}
