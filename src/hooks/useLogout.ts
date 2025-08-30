import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '@/services/auth';

export interface UseLogoutReturn {
    loading: boolean;
    logout: () => Promise<void>;
    logoutWithConfirm: () => Promise<boolean>;
}

export const useLogout = (): UseLogoutReturn => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const logout = async (): Promise<void> => {
        setLoading(true);

        try {
            AuthService.logout();
            await new Promise(resolve => setTimeout(resolve, 300));
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setLoading(false);
        }
    };

    const logoutWithConfirm = async (): Promise<boolean> => {
        const confirmed = window.confirm('¿Estás seguro de que deseas cerrar sesión?');

        if (confirmed) {
            await logout();
            return true;
        }

        return false;
    };

    return {
        loading,
        logout,
        logoutWithConfirm,
    };
};