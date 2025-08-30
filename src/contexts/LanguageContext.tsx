import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
    es: {
        welcome: 'Bienvenido',
        pleaseEnterCredentials: 'Por favor ingresa tus credenciales',
        email: 'Correo electrónico',
        enterEmail: 'Digite su correo',
        password: 'Contraseña',
        enterPassword: 'Digite su contraseña',
        signIn: 'Iniciar sesión',
        needAccount: '¿Necesitas una cuenta? ',
        registerHere: 'Regístrate aquí',

        createAccount: 'Crear cuenta',
        joinUs: 'Únete a nosotros',
        firstName: 'Nombre',
        enterFirstName: 'Digite su nombre',
        lastName: 'Apellido',
        enterLastName: 'Digite su apellido',
        birthDate: 'Fecha de nacimiento',
        phoneNumber: 'Número de teléfono',
        confirmPassword: 'Confirmar contraseña',
        confirmPasswordPlaceholder: 'Confirme su contraseña',
        register: 'Registrarse',
        alreadyHaveAccount: '¿Ya tienes cuenta? ',
        signInHere: 'Inicia sesión aquí',

        selectDate: 'Seleccionar fecha'
    },
    en: {
        welcome: 'Welcome',
        pleaseEnterCredentials: 'Please enter your credentials',
        email: 'Email',
        enterEmail: 'Enter your email',
        password: 'Password',
        enterPassword: 'Enter your password',
        signIn: 'Sign In',
        needAccount: 'Need an account? ',
        registerHere: 'Register here',

        createAccount: 'Create Account',
        joinUs: 'Join us',
        firstName: 'First Name',
        enterFirstName: 'Enter your first name',
        lastName: 'Last Name',
        enterLastName: 'Enter your last name',
        birthDate: 'Birth Date',
        phoneNumber: 'Phone Number',
        confirmPassword: 'Confirm Password',
        confirmPasswordPlaceholder: 'Confirm your password',
        register: 'Register',
        alreadyHaveAccount: 'Already have an account? ',
        signInHere: 'Sign in here',

        selectDate: 'Select date'
    }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('es');

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
            setLanguageState(savedLanguage);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    };

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};