export default function ValuesSection({ lang }: { lang: 'ID' | 'EN' }) {
    const content = {
        ID: {
            label: 'DNA KAMI',
            title: 'Misi & Nilai Kami',
            desc: 'Prinsip-prinsip yang memandu setiap keputusan yang kami ambil dan setiap baris kode yang kami tulis.',
            values: [
                { title: 'Inovasi Utama', desc: 'Kami terus mendorong batasan untuk memberikan solusi mutakhir yang membuat klien kami tetap terdepan.' },
                { title: 'Kesuksesan Pelanggan', desc: 'Kesuksesan Anda adalah kesuksesan kami. Kami mengukur dampak kami dari pertumbuhan dan efisiensi pelanggan.' },
                { title: 'Kesederhanaan', desc: 'Masalah kompleks layak mendapatkan solusi sederhana. Kami merancang antarmuka intuitif yang dapat digunakan siapa saja.' },
                { title: 'Keandalan', desc: 'Dengan uptime 99,9%, kami memastikan operasional bisnis Anda berjalan lancar sepanjang waktu, setiap hari.' },
                { title: 'Skalabilitas', desc: 'Dari satu gerai hingga ratusan, platform kami tumbuh bersama bisnis Anda tanpa hambatan.' },
                { title: 'Pengembangan Berkelanjutan', desc: 'Kami merilis pembaruan setiap dua minggu, didorong oleh masukan pelanggan dan kebutuhan bisnis yang muncul.' }
            ]
        },
        EN: {
            label: 'OUR DNA',
            title: 'Our Mission & Values',
            desc: 'The principles that guide every decision we make and every line of code we write.',
            values: [
                { title: 'Innovation First', desc: 'We continuously push boundaries to deliver cutting-edge solutions that keep our clients ahead of the curve.' },
                { title: 'Customer Success', desc: 'Your success is our success. We measure our impact by the growth and efficiency gains of our customers.' },
                { title: 'Simplicity', desc: 'Complex problems deserve simple solutions. We design intuitive interfaces that anyone can use from day one.' },
                { title: 'Reliability', desc: 'With 99.9% uptime, we ensure your business operations run smoothly around the clock, every single day.' },
                { title: 'Scalability', desc: 'From one outlet to hundreds, our platform grows with your business without missing a beat.' },
                { title: 'Continuous Improvement', desc: 'We release updates every two weeks, driven by customer feedback and emerging business needs.' }
            ]
        }
    };

    const current = content[lang];

    const icons = [
        <path d="M14 3l3 6h7l-5.5 4.5 2 7L14 17l-6.5 3.5 2-7L4 9h7z" />,
        <><path d="M14 25c6.075 0 11-4.925 11-11S20.075 3 14 3 3 7.925 3 14s4.925 11 11 11z" /><path d="M9 14l3 3 7-7" /></>,
        <><rect x="3" y="3" width="22" height="22" rx="4" /><circle cx="14" cy="14" r="4" /></>,
        <><path d="M14 3v22M3 14h22" /><path d="M7 7l14 14M21 7L7 21" /></>,
        <><path d="M4 20l5-5 4 4 6-6 5-5" /><path d="M20 4h5v5" /></>,
        <><path d="M4 14a10 10 0 0117.07-7.07" /><path d="M24 14A10 10 0 016.93 21.07" /><path d="M21 3v4h-4M7 25v-4h4" /></>
    ];

    return (
        <section className="paylo-values">
            <div className="paylo-container">
                <div className="paylo-section-header">
                    <span className="paylo-section-label">{current.label}</span>
                    <h2 className="paylo-section-title">{current.title}</h2>
                    <p className="paylo-section-desc">
                        {current.desc}
                    </p>
                </div>
                <div className="paylo-values__grid">
                    {current.values.map((v, i) => (
                        <div key={i} className="paylo-values__card">
                            <div className="paylo-values__icon">
                                <svg width="28" height="28" fill="none" stroke="#2563EB" strokeWidth="1.5">
                                    {icons[i]}
                                </svg>
                            </div>
                            <h3 className="paylo-values__title">{v.title}</h3>
                            <p className="paylo-values__desc">{v.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
