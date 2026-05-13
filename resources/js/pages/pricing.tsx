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
                
                <section className="paylo-pricing-page">
                    <div className="paylo-container">
                        <div className="paylo-demo-page__header">
                            <h1 className="paylo-demo-page__title">{current.title}</h1>
                            <p className="paylo-demo-page__subtitle">{current.subtitle}</p>
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
