export default function TestimonialsSection({ lang }: { lang: 'ID' | 'EN' }) {
    const content = {
        ID: {
            label: 'Testimoni',
            title: 'Dipercaya oleh Pemimpin Industri',
            testimonials: [
                {
                    name: 'Andi Pratama',
                    role: 'Pemilik, Brew & Bite Cafe',
                    image: '/images/testimonial-1.png',
                    text: 'Paylo mengubah cara kami mengelola kafe multi-cabang kami. POS dan inventaris yang terintegrasi menghemat waktu kerja manual kami berjam-jam setiap minggunya.'
                },
                {
                    name: 'Siti Rahma',
                    role: 'Pendiri, Bloom Fashion',
                    image: '/images/testimonial-2.png',
                    text: 'Modul analitik benar-benar pengubah permainan. Saya sekarang dapat membuat keputusan berbasis data tentang stok saya berdasarkan tren penjualan waktu nyata.'
                },
                {
                    name: 'Budi Santoso',
                    role: 'Manajer, Global Logistics',
                    image: '/images/testimonial-3.png',
                    text: 'Keandalan adalah kunci untuk operasional gudang kami. Paylo tidak pernah mengecewakan kami, bahkan selama musim puncak dengan volume transaksi tinggi.'
                }
            ]
        },
        EN: {
            label: 'Testimonials',
            title: 'Trusted by Industry Leaders',
            testimonials: [
                {
                    name: 'Andi Pratama',
                    role: 'Owner, Brew & Bite Cafe',
                    image: '/images/testimonial-1.png',
                    text: 'Paylo transformed how we manage our multi-outlet cafe. The integrated POS and inventory saved us hours of manual work every week.'
                },
                {
                    name: 'Siti Rahma',
                    role: 'Founder, Bloom Fashion',
                    image: '/images/testimonial-2.png',
                    text: 'The analytics module is a game changer. I can now make data-driven decisions about my stock based on real-time sales trends.'
                },
                {
                    name: 'Budi Santoso',
                    role: 'Manager, Global Logistics',
                    image: '/images/testimonial-3.png',
                    text: 'Reliability is key for our warehouse operations. Paylo has never let us down, even during peak season with high transaction volumes.'
                }
            ]
        }
    };

    const current = content[lang];

    return (
        <section className="paylo-testimonials">
            <div className="paylo-container">
                <div className="paylo-section-header">
                    <span className="paylo-section-label">{current.label}</span>
                    <h2 className="paylo-section-title">{current.title}</h2>
                </div>
                <div className="paylo-testimonials__grid">
                    {current.testimonials.map((t, i) => (
                        <div key={i} className="paylo-testimonials__card">
                            <div className="paylo-testimonials__quote">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V10M6.01701 21L6.01701 18C6.01701 16.8954 6.91244 16 8.01701 16H11.017C11.5693 16 12.017 15.5523 12.017 15V9C12.017 8.44772 11.5693 8 11.017 8H8.01701C7.46473 8 7.01701 8.44772 7.01701 9V10" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <p className="paylo-testimonials__text">"{t.text}"</p>
                            <div className="paylo-testimonials__author">
                                <img src={t.image} alt={t.name} className="paylo-testimonials__avatar" />
                                <div>
                                    <div className="paylo-testimonials__name">{t.name}</div>
                                    <div className="paylo-testimonials__role">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
