import { Link } from '@inertiajs/react';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0 bg-white">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex border-r border-slate-100">
                {/* Background with overlay */}
                <div className="absolute inset-0 bg-blue-600">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900 opacity-90" />
                    <div 
                        className="absolute inset-0 opacity-20" 
                        style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                    />
                </div>

                <div className="relative z-20 flex-1 flex flex-col justify-center">
                    <div className="max-w-lg">
                        <div className="mb-12">
                            <h3 className="text-4xl font-bold mb-4">Mulai Bisnis Anda</h3>
                            <p className="text-blue-100 text-lg">Hanya 4 langkah sederhana untuk mulai menggunakan Paylo dan kelola operasional bisnis dengan lebih efisien</p>
                        </div>
                        
                        <div className="space-y-6">
                            {[
                                {
                                    icon: (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    ),
                                    title: 'Daftar Akun',
                                    desc: 'Buat akun bisnis Anda dengan mudah dalam hitungan menit'
                                },
                                {
                                    icon: (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                        </svg>
                                    ),
                                    title: 'Pilih Paket',
                                    desc: 'Pilih paket langganan yang sesuai dengan kebutuhan bisnis Anda'
                                },
                                {
                                    icon: (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    ),
                                    title: 'Pembayaran',
                                    desc: 'Selesaikan pembayaran dengan berbagai metode yang tersedia'
                                },
                                {
                                    icon: (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    ),
                                    title: 'Siap Pakai',
                                    desc: 'Sistem otomatis membuat domain dan akses aplikasi langsung aktif'
                                }
                            ].map((step, index) => (
                                <div key={index} className="flex items-center gap-5 group">
                                    <div className="relative">
                                        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                                            {step.icon}
                                        </div>
                                        {index < 3 && (
                                            <div className="absolute left-8 top-16 w-0.5 h-10 bg-gradient-to-b from-white/30 to-transparent" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                                        <p className="text-sm text-blue-100/90">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative z-20 mt-8">
                    <div className="flex items-center gap-6 text-sm text-blue-100/80">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Gratis 14 hari trial</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Tanpa kartu kredit</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Support 24/7</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:p-8 bg-slate-50 flex items-center justify-center">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] bg-white p-8 sm:p-12 rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-100">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{title}</h1>
                        <p className="text-sm text-slate-500">
                            {description}
                        </p>
                    </div>
                    <div className="py-2">
                        {children}
                    </div>
                    <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                        &copy; {new Date().getFullYear()} Paylo Indonesia
                    </p>
                </div>
            </div>
        </div>
    );
}
