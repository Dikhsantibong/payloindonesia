import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/components/profile/navbar';
import FooterSection from '@/components/profile/footer-section';
import TopBar from '@/components/profile/top-bar';

export default function Pricing() {
    const [lang, setLang] = useState<'ID' | 'EN'>('ID');

    const content = {
        ID: {
            title: 'Pilih Paket yang Sesuai untuk Bisnis Anda',
            subtitle: 'Harga transparan tanpa biaya tersembunyi. Mulai gratis dan upgrade kapan saja.',
            plans: [
                {
                    name: 'Starter',
                    price: 'Gratis',
                    desc: 'Untuk bisnis kecil yang baru memulai',
                    features: ['1 Outlet', '100 Produk', 'Laporan Dasar', 'Suport Email'],
                    cta: 'Mulai Sekarang',
                    recommended: false
                },
                {
                    name: 'Pro',
                    price: 'Rp 250rb',
                    period: '/bulan',
                    desc: 'Untuk bisnis yang sedang berkembang pesat',
                    features: ['5 Outlet', 'Produk Tak Terbatas', 'Analitik Lanjutan', 'Suport 24/7', 'Manajemen Karyawan'],
                    cta: 'Pilih Pro',
                    recommended: true
                },
                {
                    name: 'Enterprise',
                    price: 'Hubungi Kami',
                    desc: 'Solusi kustom untuk skala besar',
                    features: ['Outlet Tak Terbatas', 'API Access', 'Account Manager Khusus', 'SLA 99.9%', 'Kustom Integrasi'],
                    cta: 'Hubungi Sales',
                    recommended: false
                }
            ]
        },
        EN: {
            title: 'Choose the Right Plan for Your Business',
            subtitle: 'Transparent pricing with no hidden fees. Start for free and upgrade anytime.',
            plans: [
                {
                    name: 'Starter',
                    price: 'Free',
                    desc: 'For small businesses just starting out',
                    features: ['1 Outlet', '100 Products', 'Basic Reports', 'Email Support'],
                    cta: 'Get Started',
                    recommended: false
                },
                {
                    name: 'Pro',
                    price: '$19',
                    period: '/month',
                    desc: 'For rapidly growing businesses',
                    features: ['5 Outlets', 'Unlimited Products', 'Advanced Analytics', '24/7 Support', 'Employee Management'],
                    cta: 'Go Pro',
                    recommended: true
                },
                {
                    name: 'Enterprise',
                    price: 'Contact Us',
                    desc: 'Custom solutions for large scale',
                    features: ['Unlimited Outlets', 'API Access', 'Dedicated Account Manager', '99.9% SLA', 'Custom Integration'],
                    cta: 'Contact Sales',
                    recommended: false
                }
            ]
        }
    };

    const current = content[lang];

    return (
        <>
            <Head title="Harga Paket Paylo — Solusi Digital Bisnis" />
            <div className="paylo-profile">
                <TopBar />
                <Navbar lang={lang} setLang={setLang} />
                
                <section className="paylo-pricing-page">
                    <div className="paylo-container">
                        <div className="paylo-demo-page__header">
                            <h1 className="paylo-demo-page__title">{current.title}</h1>
                            <p className="paylo-demo-page__subtitle">{current.subtitle}</p>
                        </div>

                        <div className="paylo-pricing-grid">
                            {current.plans.map((plan, i) => (
                                <div key={i} className={`paylo-pricing-card ${plan.recommended ? 'recommended' : ''}`}>
                                    {plan.recommended && <div className="paylo-pricing-card__badge">Populer</div>}
                                    <h3 className="paylo-pricing-card__name">{plan.name}</h3>
                                    <div className="paylo-pricing-card__price">
                                        <span className="value">{plan.price}</span>
                                        {plan.period && <span className="period">{plan.period}</span>}
                                    </div>
                                    <p className="paylo-pricing-card__desc">{plan.desc}</p>
                                    <ul className="paylo-pricing-card__list">
                                        {plan.features.map(f => (
                                            <li key={f}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className={`paylo-btn paylo-btn--full ${plan.recommended ? 'paylo-btn--teal' : 'paylo-btn--outline-teal'}`}>
                                        {plan.cta}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <FooterSection lang={lang} />
            </div>
        </>
    );
}
