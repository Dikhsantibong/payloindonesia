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

                <Link
                    href="/"
                    className="relative z-20 flex items-center gap-2 text-2xl font-extrabold tracking-tight"
                >
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-blue-600 rounded-sm" />
                    </div>
                    paylo
                </Link>

                <div className="relative z-20 mt-auto">
                    {(() => {
                        const quotes = [
                            {
                                text: "Paylo has revolutionized how we manage our multi-outlet inventory. The real-time syncing and automated reporting have saved us dozens of hours every week.",
                                author: "Budi Santoso, CEO of Retail Group"
                            },
                            {
                                text: "The best POS system I've ever used. Simple yet powerful enough to handle all our complex business logic.",
                                author: "Siti Aminah, Founder of Fashion Hub"
                            },
                            {
                                text: "Transitioning to Paylo was the best decision for our warehouse operations. Accuracy went up by 40% in just two months.",
                                author: "Hendra Wijaya, Operations Director"
                            }
                        ];
                        const quote = quotes[Math.floor(Math.random() * quotes.length)];
                        return (
                            <blockquote className="space-y-2">
                                <p className="text-lg font-medium">&ldquo;{quote.text}&rdquo;</p>
                                <footer className="text-sm">{quote.author}</footer>
                            </blockquote>
                        );
                    })()}
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
