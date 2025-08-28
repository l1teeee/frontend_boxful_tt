import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import BoxfulLogoBadge from '@/components/BoxfulLogoBadge';
import { UnifiedInput } from '@/components/UnifiedInput';
import { UnifiedSelect } from '@/components/UnifiedSelect';
import { UnifiedDatePicker } from '@/components/UnifiedDatePicker';
import { validationRules } from '@/utils/validate/validationRules';
import { UnifiedPhoneInput } from '@/components/UnifiedPhone';



interface FormData {
    firstName: string;
    lastName: string;
    sex: string;
    birthDate: Date | null;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const navigate = useNavigate();
    const { t, language } = useLanguage();


    const { register, handleSubmit, control, watch, formState: { errors, isSubmitting } } = useForm<FormData>();

    const watchPassword = watch('password');

    const sexOptions = {
        es: ['Femenino', 'Masculino', 'Otro'],
        en: ['Female', 'Male', 'Other']
    };

    const onSubmit = async (data: FormData) => {
        try {
            console.log('Form submitted:', data);
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const handleLoginClick = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen py-12 flex relative overflow-hidden">
            <div className="absolute top-4 right-4 z-20 group">
                <BoxfulLogoBadge/>
            </div>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#ff613915] via-[#ff8a6520] to-[#ffab9110] animate-gradient-shift filter blur-3xl" />
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-[#ff704320] via-[#ff613925] to-transparent animate-gradient-wave filter blur-2xl" />
            <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-[#ffab9115] via-[#ff8a6530] to-transparent animate-gradient-shift filter blur-xl" style={{ animationDelay: '4s' }} />

            <div className="hidden m-22 lg:flex lg:w-1/2 bg-white rounded-2xl overflow-hidden relative">
                <video className="absolute inset-0 w-full h-full object-cover" src="src/assets/register.mp4" autoPlay muted loop playsInline />
                <div aria-hidden className="absolute inset-0 bg-black/45 pointer-events-none" />
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 relative">
                <div className="max-w-xl mx-auto w-full relative z-10">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('createAccount')}</h1>
                    <p className="text-gray-600 mb-8">{t('joinUs')}</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Nombre y Apellido */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <UnifiedInput
                                name="firstName"
                                label={t('firstName')}
                                placeholder={t('enterFirstName')}
                                register={register}
                                rules={{
                                    ...validationRules.required(),
                                    ...validationRules.name('nombre')
                                }}
                                errors={errors}
                            />

                            <UnifiedInput
                                name="lastName"
                                label={t('lastName')}
                                placeholder={t('enterLastName')}
                                register={register}
                                rules={{
                                    ...validationRules.required(),
                                    ...validationRules.name('apellido')
                                }}
                                errors={errors}
                            />
                        </div>

                        {/* Sexo y Fecha */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <UnifiedSelect
                                name="sex"
                                label={language === 'es' ? 'Sexo' : 'Gender'}
                                placeholder={language === 'es' ? 'Seleccionar' : 'Select'}
                                options={sexOptions[language]}
                                control={control}
                                rules={validationRules.required('Debes seleccionar una opción')}
                                errors={errors}
                            />

                            <UnifiedDatePicker
                                name="birthDate"
                                label={t('birthDate')}
                                placeholder={t('selectDate')}
                                control={control}
                                rules={validationRules.birthDate()}
                                errors={errors}
                                minYear={1940}
                                maxYear={new Date().getFullYear()}
                                maxDate={new Date()}
                            />
                        </div>

                        {/* Email y Teléfono */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <UnifiedInput
                                name="email"
                                label={t('email')}
                                placeholder={t('enterEmail')}
                                type="email"
                                register={register}
                                rules={{
                                    ...validationRules.required(),
                                    ...validationRules.email()
                                }}
                                errors={errors}
                            />

                            <UnifiedPhoneInput
                                name="phone"
                                label="Número de teléfono"
                                control={control}
                                register={register}
                                rules={{
                                    ...validationRules.required('El número de teléfono es requerido'),
                                    ...validationRules.phone()
                                }}
                                errors={errors}
                            />
                        </div>

                        {/* Contraseñas */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <UnifiedInput
                                name="password"
                                label={t('password')}
                                placeholder={t('enterPassword')}
                                type="password"
                                showPasswordToggle={true}
                                register={register}
                                rules={{
                                    ...validationRules.required(),
                                    ...validationRules.password()
                                }}
                                errors={errors}
                            />

                            <UnifiedInput
                                name="confirmPassword"
                                label={t('confirmPassword')}
                                placeholder={t('confirmPasswordPlaceholder')}
                                type="password"
                                showPasswordToggle={true}
                                register={register}
                                rules={{
                                    ...validationRules.required(),
                                    ...validationRules.confirmPassword(watchPassword)
                                }}
                                errors={errors}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full text-white py-3 px-4 rounded-lg font-medium shadow-md transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6139] focus:ring-offset-2 ${
                                isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-[#ff6139] hover:bg-[#e5562f] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                            }`}
                        >
                            {isSubmitting ? 'Registrando...' : t('register')}
                        </button>

                        <div className="text-center">
                            <span className="text-gray-700">{t('alreadyHaveAccount')}</span>
                            <button
                                type="button"
                                onClick={handleLoginClick}
                                className="cursor-pointer text-[#ff6139] hover:text-[#e5562f] font-medium transition-colors duration-200 hover:underline focus:outline-none"
                            >
                                {t('signInHere')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;