import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import BoxfulLogoBadge from '@/components/BoxfulLogoBadge';

const Unauthorized: React.FC = () => {
    const navigate = useNavigate();
    const { language } = useLanguage();

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center">

            <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute inset-0 animate-gradient-shift blur-3xl" />
                <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] animate-gradient-wave blur-2xl rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] animate-gradient-shift blur-xl rounded-full" style={{ animationDelay: '4s' }} />
            </div>

            <main className="w-full px-6">
                <section className="max-w-3xl mx-auto text-center">
                    <div className="mx-auto grid place-items-center">
                        <BoxfulLogoBadge size={100} />
                    </div>

                    <h1 className="mt-6 text-3xl sm:text-4xl font-bold text-gray-900">
                        {language === 'es' ? 'Acceso Denegado' : 'Access Denied'}
                    </h1>
                    <p className="mt-2 text-gray-700">
                        {language === 'es'
                            ? 'Necesitas iniciar sesión para acceder a esta página. Por favor, autentícate primero.'
                            : 'You need to log in to access this page. Please authenticate first.'
                        }
                    </p>

                    {/* CTA buttons (coherentes con el login) */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        <button
                            onClick={() => navigate('/')}
                            className="cursor-pointer bg-[#ff6139] hover:bg-[#e5562f] text-white
                           px-5 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg
                           transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                           focus:outline-none focus:ring-2 focus:ring-[#ff6139] focus:ring-offset-2"
                        >
                            {language === 'es' ? 'Iniciar Sesión' : 'Sign In'}
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="cursor-pointer bg-white text-gray-800 border border-gray-200
                           px-5 py-2.5 rounded-lg font-medium shadow-sm hover:shadow
                           transition-all duration-200 hover:bg-gray-50
                           focus:outline-none focus:ring-2 focus:ring-[#ff6139] focus:ring-offset-2"
                        >
                            {language === 'es' ? 'Crear Cuenta' : 'Create Account'}
                        </button>
                    </div>

                    <div className="mt-4">
                        <button
                            onClick={() => window.open('mailto:soporte@tuapp.com', '_blank')}
                            className="cursor-pointer text-[#ff6139] hover:text-[#e5562f] font-medium underline underline-offset-4"
                        >
                            {language === 'es' ? 'Contactar soporte' : 'Contact support'}
                        </button>
                    </div>

                    <p className="mt-4 text-xs text-gray-500">
                        {language === 'es'
                            ? 'Código de error: 403 • Si crees que esto es un error, avísanos.'
                            : 'Error code: 403 • If you think this is an error, let us know.'
                        }
                    </p>
                </section>
            </main>
        </div>
    );
};

export default Unauthorized;