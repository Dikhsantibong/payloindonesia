export default function IndustriesSection({ lang }: { lang: 'ID' | 'EN' }) {
    const content = {
        ID: {
            label: 'Segmen Target',
            title: 'Industri yang Kami Layani',
            desc: 'Platform serbaguna kami dirancang untuk memenuhi tuntutan unik dari berbagai sektor bisnis.',
            industries: [
                { name: 'Toko Ritel', icon: '🛍️' },
                { name: 'Kafe & Restoran', icon: '☕' },
                { name: 'Gudang', icon: '📦' },
                { name: 'Distributor', icon: '🚛' },
                { name: 'Waralaba', icon: '🏢' },
                { name: 'Jasa', icon: '🛠️' },
                { name: 'Bisnis Multi-cabang', icon: '🏬' },
                { name: 'UMKM', icon: '🤝' },
            ]
        },
        EN: {
            label: 'Target Segments',
            title: 'Industries We Serve',
            desc: 'Our versatile platform is engineered to meet the unique demands of various business sectors.',
            industries: [
                { name: 'Retail Store', icon: '🛍️' },
                { name: 'Cafe & Restaurant', icon: '☕' },
                { name: 'Warehouse', icon: '📦' },
                { name: 'Distributor', icon: '🚛' },
                { name: 'Franchise', icon: '🏢' },
                { name: 'Services', icon: '🛠️' },
                { name: 'Multi-outlet Business', icon: '🏬' },
                { name: 'UMKM', icon: '🤝' },
            ]
        }
    };

    const current = content[lang];

    return (
        <section className="paylo-industries">
            <div className="paylo-container">
                <div className="paylo-section-header">
                    <span className="paylo-section-label">{current.label}</span>
                    <h2 className="paylo-section-title">{current.title}</h2>
                    <p className="paylo-section-desc">
                        {current.desc}
                    </p>
                </div>
                <div className="paylo-industries__grid">
                    {current.industries.map((industry, i) => (
                        <div key={i} className="paylo-industries__card">
                            <div className="paylo-industries__icon-box">{industry.icon}</div>
                            <h3 className="paylo-industries__name">{industry.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
