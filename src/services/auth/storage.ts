import type { User } from '@/types/api.types';

export class AuthStorage {
    private static readonly TOKEN_KEY = 'auth_token';
    private static readonly USER_KEY = 'user_data';

    /**
     * Guardar datos de autenticación
     */
    static saveAuthData(token: string, user: User): void {
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }

    /**
     * Obtener el token de autenticación
     */
    static getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    /**
     * Obtener datos del usuario
     */
    static getUser(): User | null {
        const userData = localStorage.getItem(this.USER_KEY);
        return userData ? JSON.parse(userData) : null;
    }

    /**
     * Verificar si el usuario está autenticado
     */
    static isAuthenticated(): boolean {
        return !!this.getToken();
    }

    /**
     * Limpiar datos de autenticación
     */
    static clearAuthData(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
    }
}