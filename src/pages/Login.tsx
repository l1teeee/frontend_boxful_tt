import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import BoxfulLogoBadge from '@/components/BoxfulLogoBadge';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import AuthService from '@/services/auth/authService';
import { UnifiedInput } from '@/components/UnifiedInput';
import { validationRules } from '@/utils/validate/validationRules';
import {
    SuccessModal,
    ErrorModal,
    ModalStyles
} from '@/components/ConfirmationModals';
import videoRegister from "@/assets/register.mp4";

interface LoginFormData {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const { t, language } = useLanguage();

    // Estados locales
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>();

    // Redirigir si ya está autenticado
    useEffect(() => {
        if (AuthService.isAuthenticated()) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);

        try {
            console.log('Login form submitted:', data);

            const response = await AuthService.login({
                email: data.email,
                password: data.password,
            });

            if (response.success) {
                // Mostrar modal de éxito
                setShowSuccessModal(true);

                // Redirigir después del éxito
                setTimeout(() => {
                    setShowSuccessModal(false);
                    navigate('/dashboard');
                }, 2000);

            } else {
                // Mostrar modal de error
                setErrorMessage(
                    response.error?.message ||
                    (language === 'es'
                        ? 'Error al iniciar sesión. Verifica tus credenciales.'
                        : 'Login error. Please check your credentials.')
                );
                setShowErrorModal(true);
            }

        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage(
                language === 'es'
                    ? 'Error de conexión. Verifica tu conexión a internet.'
                    : 'Connection error. Please check your internet connection.'
            );
            setShowErrorModal(true);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleCloseError = () => {
        setShowErrorModal(false);
        setErrorMessage('');
    };

    return (
        <>
            <ModalStyles />
            <div className="min-h-screen  flex relative overflow-hidden">
                <div
                    aria-hidden
                    className="pointer-events-none fixed inset-0 -z-10"
                >
                    <div className="absolute inset-0 animate-gradient-shift blur-3xl" />
                    <div
                        className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw]
                           animate-gradient-wave blur-2xl rounded-full"
                    />
                    <div
                        className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw]
                           animate-gradient-shift blur-xl rounded-full"
                        style={{ animationDelay: '4s' }}
                    />
                </div>

                <div className="absolute top-4 right-4 z-20 group">
                    <BoxfulLogoBadge/>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 relative">
                    <div className="max-w-md mx-auto w-full relative z-10">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('welcome')}</h1>
                        <p className="text-gray-700 mb-8">{t('pleaseEnterCredentials')}</p>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <UnifiedInput
                                name="email"
                                label={t('email')}
                                placeholder={t('enterEmail')}
                                type="email"
                                register={register}
                                rules={{
                                    ...validationRules.required('El correo electrónico es requerido'),
                                    ...validationRules.email()
                                }}
                                errors={errors}
                            />

                            <UnifiedInput
                                name="password"
                                label={t('password')}
                                placeholder={t('enterPassword')}
                                type="password"
                                showPasswordToggle={true}
                                register={register}
                                rules={validationRules.loginPassword('La contraseña es requerida')}
                                errors={errors}
                            />

                            <button
                                type="submit"
                                disabled={isSubmitting || loading}
                                className={`w-full text-white py-3 px-4 rounded-lg font-medium shadow-md transform transition-all duration-200 focus:ring-2 focus:ring-[#ff6139] focus:ring-offset-2 ${
                                    isSubmitting || loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-[#ff6139] hover:bg-[#e5562f] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                                }`}
                            >
                                {isSubmitting || loading ? 'Iniciando sesión...' : t('signIn')}
                            </button>

                            <div className="text-center">
                                <span className="text-gray-700">{t('needAccount')}</span>
                                <button
                                    type="button"
                                    onClick={handleRegisterClick}
                                    className="cursor-pointer text-[#ff6139] hover:text-[#e5562f] font-medium transition-colors duration-200 hover:underline focus:outline-none"
                                >
                                    {t('registerHere')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="hidden m-22 lg:flex lg:w-1/2 bg-white rounded-2xl overflow-hidden relative">
                    <video
                        className="absolute inset-0 w-full h-full object-cover"
                        src={videoRegister}
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                    <div
                        aria-hidden
                        className="absolute inset-0 bg-black/45 pointer-events-none"
                    />
                </div>

                {/* Modal de Éxito */}
                <SuccessModal
                    isOpen={showSuccessModal}
                    language={language}
                />

                {/* Modal de Error */}
                <ErrorModal
                    isOpen={showErrorModal}
                    language={language}
                    message={errorMessage}
                    onClose={handleCloseError}
                />
            </div>
        </>
    );
};

export default Login;