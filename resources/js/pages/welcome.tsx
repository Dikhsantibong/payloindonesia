import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/components/profile/navbar';
import HeroSection from '@/components/profile/hero-section';
import FeaturesSection from '@/components/profile/features-section';
import WhyChooseSection from '@/components/profile/why-choose-section';
import IndustriesSection from '@/components/profile/industries-section';
import ImpactSection from '@/components/profile/impact-section';
import TestimonialsSection from '@/components/profile/testimonials-section';
import TeamSection from '@/components/profile/team-section';
import CtaSection from '@/components/profile/cta-section';
import FooterSection from '@/components/profile/footer-section';
import TopBar from '@/components/profile/top-bar';

interface WelcomeProps {
    auth: {
        user: any;
    };
    laravelVersion: string;
    phpVersion: string;
    [key: string]: unknown;
}

export default function Welcome({ auth, laravelVersion, phpVersion }: WelcomeProps) {
    const [lang, setLang] = useState<'ID' | 'EN'>('ID');

    return (
        <>
            <Head title="Paylo — Platform Teknologi Manajemen Bisnis">
                <meta name="description" content="Paylo adalah perusahaan software bisnis yang fokus menyederhanakan operasional melalui solusi inventaris, kasir, absensi, dan analitik terintegrasi untuk bisnis yang sedang berkembang." />
            </Head>
            <div className="paylo-profile">
                <TopBar />
                <Navbar lang={lang} setLang={(l) => setLang(l)} />
                <HeroSection lang={lang} />
                <FeaturesSection lang={lang} />
                <WhyChooseSection lang={lang} />
                <IndustriesSection lang={lang} />
                <ImpactSection lang={lang} />
                <TestimonialsSection lang={lang} />
                <TeamSection lang={lang} />
                <CtaSection lang={lang} />
                <FooterSection lang={lang} />
            </div>
        </>
    );
}
