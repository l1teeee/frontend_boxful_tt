import { httpClient } from '@/services/httpClient';
import { API_CONFIG } from '@/config/api.config';
import type { ApiResponse, AuthResponse, LoginCredentials } from '@/types/api.types';
import { AuthValidators } from '@/services/auth/validators';
import { AuthTransformers, type UserData } from '@/services/auth/transformers';
import { AuthStorage } from '@/services/auth/storage';
import { AuthResponseUtils } from '@/services/auth/responseUtils';



export class AuthService {
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

    static async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
        try {
            const response = await httpClient.post<AuthResponse>(
                API_CONFIG.ENDPOINTS.AUTH.LOGIN,
                credentials
            );

            if (AuthResponseUtils.hasToken(response)) {
                const { token, user } = response.data;
                if (token && user?.id) {
                    AuthStorage.saveAuthData(token, user, user.id);
                }
            }

            return response;
        } catch {
            return AuthResponseUtils.createErrorResponse(
                'Error al iniciar sesión. Verifica tus credenciales.'
            );
        }
    }


    /* Cerrar sesión */
    static logout(): void {
        AuthStorage.clearAuthData();
    }

    /* Verificar si el usuario está autenticado */
    static isAuthenticated(): boolean {
        return AuthStorage.isAuthenticated();
    }

    /* Verificar la token */
    static getUser() {
        return AuthStorage.getUser();
    }

}

export default AuthService;