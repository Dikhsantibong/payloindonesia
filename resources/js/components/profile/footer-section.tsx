export default function FooterSection({ lang }: { lang: 'ID' | 'EN' }) {
    const content = {
        ID: {
            desc: 'Menyederhanakan operasional bisnis dengan solusi digital modern.',
            col1Title: 'Perusahaan',
            col1Links: ['Tentang Kami', 'Karir', 'Kontak'],
            col2Title: 'Produk & Layanan',
            col2Links: ['Paylo POS', 'Paylo Inventaris', 'Paylo Absensi', 'Layanan Konsultasi'],
            col3Title: 'Sumber Daya',
            col3Links: ['Pusat Bantuan', 'Blog', 'Suport'],
            col4Title: 'Sosial',
            legal: ['Kebijakan Privasi', 'Syarat dan Ketentuan'],
            copyright: 'Hak cipta dilindungi undang-undang.'
        },
        EN: {
            desc: 'Simplifying business operations with modern digital solutions.',
            col1Title: 'Company',
            col1Links: ['About Us', 'Careers', 'Contact'],
            col2Title: 'Products & Services',
            col2Links: ['Paylo POS', 'Paylo Inventory', 'Paylo Attendance', 'Consulting Services'],
            col3Title: 'Resources',
            col3Links: ['Help Center', 'Blog', 'Support'],
            col4Title: 'Social',
            legal: ['Privacy Policy', 'Terms of Service'],
            copyright: 'All rights reserved.'
        }
    };

    const current = content[lang];

    return (
        <footer className="paylo-footer">
            <div className="paylo-container">
                <div className="paylo-footer__grid">
                    <div className="paylo-footer__brand">
                        <a href="#" className="paylo-footer__logo">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <rect width="32" height="32" rx="8" fill="#2563EB" />
                                <path d="M9 22V10h5.5a4.5 4.5 0 010 9H12.5v3H9z" fill="#fff" />
                            </svg>
                            <span>Paylo</span>
                        </a>
                        <p className="paylo-footer__desc">
                            {current.desc}
                        </p>
                        <div className="paylo-footer__contact">
                            <a href="mailto:hello@paylo.id" className="paylo-footer__contact-link">hello@paylo.id</a>
                            <a href="tel:+628123456789" className="paylo-footer__contact-link">+62 812 3456 789</a>
                        </div>
                    </div>

                    <div className="paylo-footer__nav">
                        <div className="paylo-footer__col">
                            <h4 className="paylo-footer__title">{current.col1Title}</h4>
                            <ul className="paylo-footer__links">
                                {current.col1Links.map(l => <li key={l}><a href="#">{l}</a></li>)}
                            </ul>
                        </div>
                        <div className="paylo-footer__col">
                            <h4 className="paylo-footer__title">{current.col2Title}</h4>
                            <ul className="paylo-footer__links">
                                {current.col2Links.map(l => <li key={l}><a href="#">{l}</a></li>)}
                            </ul>
                        </div>
                        <div className="paylo-footer__col">
                            <h4 className="paylo-footer__title">{current.col3Title}</h4>
                            <ul className="paylo-footer__links">
                                {current.col3Links.map(l => <li key={l}><a href="#">{l}</a></li>)}
                            </ul>
                        </div>
                        <div className="paylo-footer__col">
                            <h4 className="paylo-footer__title">{current.col4Title}</h4>
                            <ul className="paylo-footer__links">
                                <li><a href="#">LinkedIn</a></li>
                                <li><a href="#">Instagram</a></li>
                                <li><a href="#">WhatsApp</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="paylo-footer__bottom">
                    <p>© {new Date().getFullYear()} Paylo (PT KREATIF TEKNOLOGI MAJU BERSAMA). {current.copyright}</p>
                    <div className="paylo-footer__legal">
                        {current.legal.map(l => <a key={l} href="#">{l}</a>)}
                    </div>
                </div>
            </div>
        </footer>
    );
}
