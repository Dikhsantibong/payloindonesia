export default function TeamSection({ lang }: { lang: 'ID' | 'EN' }) {
    const content = {
        ID: {
            label: 'Orang-orang Kami',
            title: 'Dibangun oleh Orang yang Memahami Bisnis',
            text: 'Di Paylo, kami menggabungkan keahlian operasional yang mendalam dengan rekayasa kelas dunia. Tim kami berdedikasi untuk menyelesaikan tantangan bisnis dunia nyata.',
            groups: [
                'Tim Engineering',
                'Tim Desain Produk',
                'Tim Customer Success'
            ],
            badge: 'Budaya Kolaboratif'
        },
        EN: {
            label: 'Our People',
            title: 'Built by People Who Understand Business',
            text: 'At Paylo, we combine deep operational expertise with world-class engineering. Our team is dedicated to solving real-world business challenges.',
            groups: [
                'Engineering Team',
                'Product Design Team',
                'Customer Success Team'
            ],
            badge: 'Collaborative Culture'
        }
    };

    const current = content[lang];

    return (
        <section className="paylo-team">
            <div className="paylo-container">
                <div className="paylo-team__grid">
                    <div className="paylo-team__content">
                        <span className="paylo-section-label">{current.label}</span>
                        <h2 className="paylo-section-title text-left">{current.title}</h2>
                        <p className="paylo-team__text">
                            {current.text}
                        </p>
                        <div className="paylo-team__groups">
                            {current.groups.map((group, i) => (
                                <div key={i} className="paylo-team__group">
                                    <div className="paylo-team__group-dot" />
                                    <span>{group}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="paylo-team__visual">
                        <div className="paylo-team__image-wrapper">
                            <img src="/images/team-office.png" alt="Paylo Team Collaboration" className="paylo-team__image" />
                            <div className="paylo-team__overlay">
                                <div className="paylo-team__badge">{current.badge}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
