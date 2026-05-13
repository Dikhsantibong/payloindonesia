export default function CtaSection({ lang }: { lang: 'ID' | 'EN' }) {
    const content = {
        ID: {
            title: 'Siap Tumbuh Bersama Paylo?',
            subtext: 'Mulai gunakan Paylo hari ini dan sederhanakan cara Anda mengelola bisnis. Bergabunglah dengan lebih dari 500+ bisnis yang sudah berkembang bersama kami.',
            ctaPrimary: 'Coba Gratis Sekarang',
            ctaSecondary: 'Bicara dengan Tim Kami'
        },
        EN: {
            title: 'Ready to Grow with Paylo?',
            subtext: 'Start using Paylo today and simplify the way you manage your business. Join over 500+ businesses already growing with us.',
            ctaPrimary: 'Start Free Trial',
            ctaSecondary: 'Talk to Our Team'
        }
    };

    const current = content[lang];

    return (
        <section className="paylo-cta">
            <div className="paylo-container">
                <div className="paylo-cta__box">
                    <h2 className="paylo-cta__title">{current.title}</h2>
                    <p className="paylo-cta__subtext">
                        {current.subtext}
                    </p>
                    <div className="paylo-cta__actions">
                        <a href="#" className="paylo-btn paylo-btn--primary paylo-btn--lg">
                            {current.ctaPrimary}
                        </a>
                        <a href="#" className="paylo-btn paylo-btn--white paylo-btn--lg">
                            {current.ctaSecondary}
                        </a>
                    </div>
                    <div className="paylo-cta__decoration">
                        <div className="paylo-cta__circle paylo-cta__circle--1" />
                        <div className="paylo-cta__circle paylo-cta__circle--2" />
                    </div>
                </div>
            </div>
        </section>
    );
}
