// @/components/LogoutButton.tsx
import React from 'react';
import { useLogout } from '@/hooks/useLogout';
import { useLanguage } from '@/contexts/LanguageContext';

interface LogoutButtonProps {
    variant?: 'default' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    children?: React.ReactNode;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
                                                              variant = 'default',
                                                              size = 'md',
                                                              className = '',
                                                              children
                                                          }) => {
    const { logout, logoutWithConfirm, loading } = useLogout();
    const { t } = useLanguage();

    const handleLogout = async () => {
        await logout();
    };

    const getVariantClasses = () => {
        switch (variant) {
            case 'danger':
                return 'bg-red-600 hover:bg-red-700 text-white';
            case 'ghost':
                return 'bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300';
            default:
                return 'bg-[#ff6139] hover:bg-[#e5562f] text-white';
        }
    };

    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'px-3 py-1.5 text-sm';
            case 'lg':
                return 'px-6 py-3 text-lg';
            default:
                return 'px-4 py-2 text-base';
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className={`
                ${getVariantClasses()}
                ${getSizeClasses()}
                rounded-lg font-medium shadow-md transform transition-all duration-200 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff6139]
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]
                ${className}
            `}
        >
            {loading ? 'Cerrando sesión...' : (children || t('logout') || 'Cerrar Sesión')}
        </button>
    );
};