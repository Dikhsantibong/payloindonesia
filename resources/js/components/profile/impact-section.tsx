export default function ImpactSection({ lang }: { lang: 'ID' | 'EN' }) {
    const content = {
        ID: {
            label: 'Dampak Kami',
            title: 'Mendorong Pertumbuhan di Seluruh Indonesia',
            stats: [
                { value: '500+', label: 'Bisnis Didukung' },
                { value: '1jt+', label: 'Transaksi Diproses' },
                { value: '99.9%', label: 'Uptime Sistem' },
                { value: '24/7', label: 'Dukungan Prioritas' },
            ]
        },
        EN: {
            label: 'Our Impact',
            title: 'Driving Growth Across Indonesia',
            stats: [
                { value: '500+', label: 'Businesses Supported' },
                { value: '1M+', label: 'Transactions Processed' },
                { value: '99.9%', label: 'System Uptime' },
                { value: '24/7', label: 'Priority Support' },
            ]
        }
    };

    const current = content[lang];

    return (
        <section className="paylo-impact">
            <div className="paylo-container">
                <div className="paylo-impact__wrapper">
                    <div className="paylo-impact__content">
                        <div className="paylo-impact__header">
                            <span className="paylo-impact__subtitle">{current.label}</span>
                            <h2 className="paylo-impact__title">{current.title}</h2>
                        </div>
                        <div className="paylo-impact__grid">
                            {current.stats.map((stat, i) => (
                                <div key={i} className="paylo-impact__stat-item">
                                    <div className="paylo-impact__value">{stat.value}</div>
                                    <div className="paylo-impact__label">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
