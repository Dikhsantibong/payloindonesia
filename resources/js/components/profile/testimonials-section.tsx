import React, { useState } from 'react';

interface Testimonial {
    name: string;
    role: string;
    image: string;
    text: string;
    category: 'fnb' | 'retail' | 'services' | 'logistics';
    rating: number;
}

export default function TestimonialsSection({ lang }: { lang: 'ID' | 'EN' }) {
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const content = {
        ID: {
            label: 'Testimoni',
            title: 'Cerita Sukses Bersama Paylo',
            subtitle: 'Dengarkan kisah nyata dari para pengusaha dan pemimpin industri yang telah mentransformasi bisnis mereka menggunakan sistem Paylo.',
            categories: {
                all: 'Semua',
                fnb: 'FnB / Kuliner',
                retail: 'Ritel & Toko',
                services: 'Jasa & Studio',
                logistics: 'Logistik & Gudang'
            },
            testimonials: [
                {
                    name: 'Andi Pratama',
                    role: 'Pemilik, Brew & Bite Cafe',
                    image: '/images/testimonial-1.png',
                    text: 'Paylo mengubah cara kami mengelola kafe multi-cabang kami. POS dan inventaris yang terintegrasi menghemat waktu kerja manual kami berjam-jam setiap minggunya.',
                    category: 'fnb',
                    rating: 5
                },
                {
                    name: 'Siti Rahma',
                    role: 'Pendiri, Bloom Fashion',
                    image: '/images/testimonial-2.png',
                    text: 'Modul analitik benar-benar pengubah permainan. Saya sekarang dapat membuat keputusan berbasis data tentang stok saya berdasarkan tren penjualan waktu nyata.',
                    category: 'retail',
                    rating: 5
                },
                {
                    name: 'Budi Santoso',
                    role: 'Manajer, Global Logistics',
                    image: '/images/testimonial-3.png',
                    text: 'Keandalan adalah kunci untuk operasional gudang kami. Paylo tidak pernah mengecewakan kami, bahkan selama musim puncak dengan volume transaksi tinggi.',
                    category: 'logistics',
                    rating: 5
                },
                {
                    name: 'Clarissa Utama',
                    role: 'Pendiri, Glow Beauty Studio',
                    image: '/images/testimonial-1.png',
                    text: 'Penjadwalan janji temu pelanggan menjadi jauh lebih teratur. Pelanggan kami menyukai sistem pembayaran digital Paylo yang instan dan aman.',
                    category: 'services',
                    rating: 5
                },
                {
                    name: 'Hendra Wijaya',
                    role: 'Pemilik Franchise, Kopi Kita',
                    image: '/images/testimonial-2.png',
                    text: 'Mengembangkan bisnis waralaba kopi kami menjadi sangat mudah terpantau. Kami bisa mengevaluasi performa semua outlet cabang secara real-time.',
                    category: 'fnb',
                    rating: 5
                }
            ] as Testimonial[]
        },
        EN: {
            label: 'Testimonials',
            title: 'Success Stories with Paylo',
            subtitle: 'Listen to the real stories of entrepreneurs and industry leaders who have transformed their businesses using Paylo.',
            categories: {
                all: 'All',
                fnb: 'FnB / Culinary',
                retail: 'Retail & Shops',
                services: 'Services & Studios',
                logistics: 'Logistics & Warehouses'
            },
            testimonials: [
                {
                    name: 'Andi Pratama',
                    role: 'Owner, Brew & Bite Cafe',
                    image: '/images/testimonial-1.png',
                    text: 'Paylo transformed how we manage our multi-outlet cafe. The integrated POS and inventory saved us hours of manual work every week.',
                    category: 'fnb',
                    rating: 5
                },
                {
                    name: 'Siti Rahma',
                    role: 'Founder, Bloom Fashion',
                    image: '/images/testimonial-2.png',
                    text: 'The analytics module is a game changer. I can now make data-driven decisions about my stock based on real-time sales trends.',
                    category: 'retail',
                    rating: 5
                },
                {
                    name: 'Budi Santoso',
                    role: 'Manager, Global Logistics',
                    image: '/images/testimonial-3.png',
                    text: 'Reliability is key for our warehouse operations. Paylo has never let us down, even during peak season with high transaction volumes.',
                    category: 'logistics',
                    rating: 5
                },
                {
                    name: 'Clarissa Utama',
                    role: 'Founder, Glow Beauty Studio',
                    image: '/images/testimonial-1.png',
                    text: 'Scheduling customer appointments has become much more organized. Our customers love Paylo\'s instant and secure digital payment gateway.',
                    category: 'services',
                    rating: 5
                },
                {
                    name: 'Hendra Wijaya',
                    role: 'Franchise Owner, Kopi Kita',
                    image: '/images/testimonial-2.png',
                    text: 'Expanding our coffee franchise business has become so easy to monitor. We can evaluate the performance of all branch outlets in real-time.',
                    category: 'fnb',
                    rating: 5
                }
            ] as Testimonial[]
        }
    };

    const current = content[lang];

    const filteredTestimonials = activeCategory === 'all' 
        ? current.testimonials 
        : current.testimonials.filter(t => t.category === activeCategory);

    return (
        <section className="paylo-testimonials" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="paylo-container">
                <div className="paylo-section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <span className="paylo-section-label" style={{ display: 'inline-block', marginBottom: '8px' }}>{current.label}</span>
                    <h2 className="paylo-section-title" style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a' }}>{current.title}</h2>
                    <p style={{ maxWidth: '640px', margin: '16px auto 0', color: '#64748b', fontSize: '16px', lineHeight: '1.6' }}>
                        {current.subtitle}
                    </p>
                </div>

                {/* Interactive Category Filter Pills */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginBottom: '48px'
                }}>
                    <button
                        onClick={() => setActiveCategory('all')}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '50px',
                            fontWeight: '600',
                            fontSize: '14px',
                            border: '1px solid',
                            borderColor: activeCategory === 'all' ? '#2563EB' : '#e2e8f0',
                            background: activeCategory === 'all' ? '#2563EB' : '#ffffff',
                            color: activeCategory === 'all' ? '#ffffff' : '#64748b',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: activeCategory === 'all' ? '0 4px 12px rgba(37, 99, 235, 0.2)' : 'none'
                        }}
                    >
                        {current.categories.all}
                    </button>
                    {(Object.keys(current.categories) as Array<keyof typeof current.categories>).filter(key => key !== 'all').map(key => (
                        <button
                            key={key}
                            onClick={() => setActiveCategory(key)}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '50px',
                                fontWeight: '600',
                                fontSize: '14px',
                                border: '1px solid',
                                borderColor: activeCategory === key ? '#2563EB' : '#e2e8f0',
                                background: activeCategory === key ? '#2563EB' : '#ffffff',
                                color: activeCategory === key ? '#ffffff' : '#64748b',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: activeCategory === key ? '0 4px 12px rgba(37, 99, 235, 0.2)' : 'none'
                            }}
                        >
                            {current.categories[key]}
                        </button>
                    ))}
                </div>

                {/* Animated Testimonial Grid */}
                <div className="paylo-testimonials__grid" style={{ transition: 'all 0.3s ease' }}>
                    {filteredTestimonials.map((t, i) => (
                        <div 
                            key={i} 
                            className="paylo-testimonials__card"
                            style={{
                                background: '#ffffff',
                                padding: '36px',
                                borderRadius: '24px',
                                border: '1px solid rgba(226, 232, 240, 0.8)',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'default'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-6px)';
                                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)';
                                e.currentTarget.style.borderColor = '#cbd5e1';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01)';
                                e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)';
                            }}
                        >
                            {/* Gold Star Ratings */}
                            <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                                {[...Array(t.rating)].map((_, starIndex) => (
                                    <svg key={starIndex} width="16" height="16" viewBox="0 0 24 24" fill="#EAB308" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="paylo-testimonials__text" style={{
                                fontSize: '16px',
                                fontStyle: 'normal',
                                color: '#334155',
                                marginBottom: '28px',
                                lineHeight: '1.6',
                                flexGrow: 1
                            }}>
                                "{t.text}"
                            </p>

                            <div className="paylo-testimonials__author" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px', marginTop: 'auto' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: '#eff6ff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: '#2563EB',
                                    border: '2px solid #dbeafe',
                                    textTransform: 'uppercase'
                                }}>
                                    {t.name.charAt(0)}
                                </div>
                                <div style={{ marginLeft: '12px' }}>
                                    <div className="paylo-testimonials__name" style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>{t.name}</div>
                                    <div className="paylo-testimonials__role" style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
