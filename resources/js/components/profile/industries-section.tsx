import React from 'react';

export default function IndustriesSection({ lang }: { lang: 'ID' | 'EN' }) {
    const content = {
        ID: {
            label: 'Segmen Bisnis',
            title: 'Pilihan Tepat Berbagai Jenis Bisnis',
            desc: 'Ragam navigasi yang cocok untuk semua wirausaha.',
            learnMore: 'Pelajari lebih lanjut',
            tabs: [
                {
                    id: 'fnb',
                    title: 'Food & Beverages',
                    desc: 'Kelola pesanan, meja, hingga dapur dalam satu sistem terintegrasi. Cocok untuk restoran, kafe, dan kedai makanan.',
                },
                {
                    id: 'hospitality',
                    title: 'Hospitality & Service',
                    desc: 'Optimalkan layanan pelanggan dan manajemen reservasi untuk bisnis jasa, hotel, dan pusat kebugaran.',
                },
                {
                    id: 'retail',
                    title: 'Retail & Distribution',
                    desc: 'Kelola penjualan, produk, dan stok dalam satu sistem untuk membantu operasional retail dan distribusi berjalan lebih cepat dan terkontrol.',
                },
                {
                    id: 'enterprise',
                    title: 'Enterprise Solution',
                    desc: 'Solusi skala besar dengan kontrol penuh atas multi-cabang, inventaris kompleks, dan pelaporan mendalam.',
                },
                {
                    id: 'commercial',
                    title: 'Commercial Business',
                    desc: 'Dukungan penuh untuk operasional bisnis komersial dengan fleksibilitas tinggi dalam pengaturan alur kerja.',
                }
            ]
        },
        EN: {
            label: 'Business Segments',
            title: 'Right Choice for Various Business Types',
            desc: 'A range of navigation suitable for all entrepreneurs.',
            learnMore: 'Learn more',
            tabs: [
                {
                    id: 'fnb',
                    title: 'Food & Beverages',
                    desc: 'Manage orders, tables, and kitchen in one integrated system. Perfect for restaurants, cafes, and food stalls.',
                },
                {
                    id: 'hospitality',
                    title: 'Hospitality & Service',
                    desc: 'Optimize customer service and reservation management for service businesses, hotels, and fitness centers.',
                },
                {
                    id: 'retail',
                    title: 'Retail & Distribution',
                    desc: 'Manage sales, products, and stock in one system to help retail and distribution operations run faster and more controlled.',
                },
                {
                    id: 'enterprise',
                    title: 'Enterprise Solution',
                    desc: 'Large-scale solutions with full control over multi-branches, complex inventory, and deep reporting.',
                },
                {
                    id: 'commercial',
                    title: 'Commercial Business',
                    desc: 'Full support for commercial business operations with high flexibility in workflow configuration.',
                }
            ]
        }
    };

    const current = content[lang];

    return (
        <section id="industries" className="paylo-industries">
            <div className="paylo-container">
                <div className="paylo-section-header">
                    <span className="paylo-section-label">{current.label}</span>
                    <h2 className="paylo-section-title">{current.title}</h2>
                    <p className="paylo-section-desc">
                        {current.desc}
                    </p>
                </div>

                <div className="paylo-industries__grid">
                    {current.tabs.map((tab) => (
                        <div key={tab.id} className="paylo-industries__card">
                            <h3 className="paylo-industries__card-title">{tab.title}</h3>
                            <p className="paylo-industries__card-desc">{tab.desc}</p>
                            <a href="#" className="paylo-industries__card-link">
                                {current.learnMore}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
