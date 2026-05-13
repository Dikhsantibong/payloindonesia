export default function WhyChooseSection({ lang }: { lang: 'ID' | 'EN' }) {
    const content = {
        ID: {
            label: 'Mengapa Kami',
            title: 'Mengapa Bisnis Memilih Paylo',
            text: 'Kami tidak hanya menyediakan software; kami menyediakan fondasi untuk pertumbuhan bisnis Anda. Platform kami dirancang untuk menjadi pusat sistem operasional Anda.',
            floatTitle: 'Aman & Terpercaya',
            floatDesc: 'Keamanan kelas enterprise',
            features: [
                "Platform terintegrasi",
                "Berbasis cloud",
                "Pemantauan real-time",
                "Akses multi-perangkat",
                "Onboarding mudah",
                "Infrastruktur aman",
                "Skalabel untuk bisnis yang berkembang"
            ]
        },
        EN: {
            label: 'Why Us',
            title: 'Why Businesses Choose Paylo',
            text: 'We don\'t just provide software; we provide a foundation for your business growth. Our platform is designed to be the central nervous system of your operations.',
            floatTitle: 'Secure & Reliable',
            floatDesc: 'Enterprise-grade security',
            features: [
                "Integrated platform",
                "Cloud-based",
                "Real-time monitoring",
                "Multi-device access",
                "Easy onboarding",
                "Secure infrastructure",
                "Scalable for growing companies"
            ]
        }
    };

    const current = content[lang];

    return (
        <section id="solutions" className="paylo-why">
            <div className="paylo-container">
                <div className="paylo-why__grid">
                    <div className="paylo-why__visual">
                        <div className="paylo-why__card-main">
                            <div className="paylo-why__card-header">
                                <div className="paylo-why__dots">
                                    <span className="paylo-why__dot" />
                                    <span className="paylo-why__dot" />
                                    <span className="paylo-why__dot" />
                                </div>
                                <div className="paylo-why__browser-title">paylo.io/analytics</div>
                            </div>
                            <div className="paylo-why__card-body">
                                <div className="paylo-why__skeleton-row">
                                    <div className="paylo-why__skeleton-item paylo-why__skeleton-item--wide" />
                                    <div className="paylo-why__skeleton-item" />
                                </div>
                                <div className="paylo-why__skeleton-chart">
                                    <div className="paylo-why__skeleton-bar" style={{ height: '40%' }} />
                                    <div className="paylo-why__skeleton-bar" style={{ height: '70%' }} />
                                    <div className="paylo-why__skeleton-bar" style={{ height: '55%' }} />
                                    <div className="paylo-why__skeleton-bar" style={{ height: '90%' }} />
                                    <div className="paylo-why__skeleton-bar" style={{ height: '65%' }} />
                                </div>
                            </div>
                        </div>
                        <div className="paylo-why__card-float">
                            <div className="paylo-why__float-icon">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </div>
                            <div>
                                <div className="paylo-why__float-title">{current.floatTitle}</div>
                                <div className="paylo-why__float-desc">{current.floatDesc}</div>
                            </div>
                        </div>
                    </div>
                    <div className="paylo-why__content">
                        <span className="paylo-section-label">{current.label}</span>
                        <h2 className="paylo-section-title text-left">{current.title}</h2>
                        <p className="paylo-why__text">
                            {current.text}
                        </p>
                        <div className="paylo-why__list">
                            {current.features.map((feature, i) => (
                                <div key={i} className="paylo-why__item">
                                    <div className="paylo-why__check">
                                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M2 6l3 3 5-7" />
                                        </svg>
                                    </div>
                                    <span className="paylo-why__feature">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
