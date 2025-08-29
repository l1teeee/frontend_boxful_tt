import { httpClient } from '@/services/httpClient';
import { API_CONFIG } from '@/config/api.config';
import type { ApiResponse, AuthResponse } from '@/types/api.types';

import { AuthValidators } from '@/services/auth/validators';
import { AuthTransformers, type UserData } from '@/services/auth/transformers';
import { AuthStorage } from '@/services/auth/storage';
import { AuthResponseUtils } from '@/services/auth/responseUtils';

export interface LoginCredentials {
    email: string;
    password: string;
}

export class AuthService {
    /**
     * Registrar un nuevo usuario (NO guarda token, solo crea cuenta)
     */
    static async register(userData: UserData): Promise<ApiResponse<AuthResponse>> {
        const validationError = AuthValidators.validateRegistrationData(userData);
        if (validationError) {
            return AuthResponseUtils.createErrorResponse(validationError);
        }

        const registerData = AuthTransformers.transformUserData(userData);

        try {
            const response = await httpClient.post<AuthResponse>(
                API_CONFIG.ENDPOINTS.AUTH.REGISTER,
                registerData
            );

            return response;
        } catch {
            return AuthResponseUtils.createErrorResponse(
                'Error al registrar usuario. Inténtalo de nuevo.'
            );
        }
    }

    /**
     * Iniciar sesión (SOLO el login guarda token)
     */
    static async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
        try {
            const response = await httpClient.post<AuthResponse>(
                API_CONFIG.ENDPOINTS.AUTH.LOGIN,
                credentials
            );

            if (AuthResponseUtils.hasToken(response)) {
                AuthStorage.saveAuthData(response.data!.token!, response.data!.user);
            }

            return response;
        } catch {
            return AuthResponseUtils.createErrorResponse(
                'Error al iniciar sesión. Verifica tus credenciales.'
            );
        }
    }

    /**
     * Cerrar sesión
     */
    static logout(): void {
        AuthStorage.clearAuthData();
    }

    /**
     * Verificar si el usuario está autenticado
     */
    static isAuthenticated(): boolean {
        return AuthStorage.isAuthenticated();
    }

    /**
     * Obtener el token de autenticación
     */
    static getToken(): string | null {
        return AuthStorage.getToken();
    }

    /**
     * Obtener datos del usuario
     */
    static getUser() {
        return AuthStorage.getUser();
    }

    /**
     * Validar formato de teléfono
     */
    static validatePhoneNumber(phone: string): boolean {
        return AuthValidators.validatePhoneNumber(phone);
    }
}

export default AuthService;