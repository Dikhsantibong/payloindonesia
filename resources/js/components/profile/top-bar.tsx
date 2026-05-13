import { useState, useEffect } from 'react';

export default function TopBar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className={`paylo-topbar ${scrolled ? 'paylo-topbar--hidden' : ''}`}>
            <div className="paylo-topbar__inner">
                <div className="paylo-topbar__left">
                    <span className="paylo-topbar__item">PAYLO CARE</span>
                    <span className="paylo-topbar__item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline mr-1">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 015.06 2h3a2 2 0 012 1.72 12.81 12.81 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l2.19-2.19a2 2 0 012.11-.45 12.81 12.81 0 002.81.7A2 2 0 0122 16.92z"/>
                        </svg>
                        0811 500 460
                    </span>
                </div>
                <div className="paylo-topbar__center">
                    <a href="#" className="paylo-topbar__promo">
                        <span className="paylo-topbar__badge">DISKON 50%</span>
                        SEMUA PAKET PAYLO <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="inline ml-1"><path d="M9 18l6-6-6-6"/></svg>
                    </a>
                </div>
                <div className="paylo-topbar__right" />
            </div>
        </div>
    );
}
