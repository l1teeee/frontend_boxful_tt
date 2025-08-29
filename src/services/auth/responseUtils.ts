import type { ApiResponse, AuthResponse } from '@/types/api.types';

export class AuthResponseUtils {
    /**
     * Crear una respuesta de error estandarizada
     */
    static createErrorResponse(message: string): ApiResponse<AuthResponse> {
        return {
            success: false,
            error: { message },
        };
    }

    /**
     * Crear una respuesta de éxito estandarizada
     */
    static createSuccessResponse(data: AuthResponse): ApiResponse<AuthResponse> {
        return {
            success: true,
            data,
        };
    }

    /**
     * Verificar si la respuesta contiene token
     */
    static hasToken(response: ApiResponse<AuthResponse>): boolean {
        return response.success && !!response.data?.token;
    }

    /**
     * Extraer mensaje de error de una respuesta
     */
    static getErrorMessage(response: ApiResponse<AuthResponse>): string {
        return response.error?.message || 'Ha ocurrido un error inesperado';
    }
}