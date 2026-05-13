import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/components/profile/navbar';
import FooterSection from '@/components/profile/footer-section';
import TopBar from '@/components/profile/top-bar';
import DemoSection from '@/components/profile/demo-section';

export default function Demo() {
    const [lang, setLang] = useState<'ID' | 'EN'>('ID');

    return (
        <>
            <Head title="Coba Demo Paylo — Eksplorasi Fitur Mandiri" />
            <div className="paylo-profile">
                <TopBar />
                <Navbar lang={lang} setLang={setLang} />
                
                <div className="pt-20">
                    <DemoSection lang={lang} />
                </div>

                <FooterSection lang={lang} />
            </div>
        </>
    );
}
