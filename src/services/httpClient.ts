import { API_CONFIG } from '@/config/api.config';
import type { ApiResponse } from '@/types/api.types';

class HttpClient {
    private baseURL: string;
    private timeout: number;

    constructor() {
        this.baseURL = API_CONFIG.BASE_URL;
        this.timeout = API_CONFIG.TIMEOUT;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const url = `${this.baseURL}${endpoint}`;

            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });

            clearTimeout(timeoutId);

            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    error: {
                        message: data.message || 'Ha ocurrido un error',
                        error: data.error,
                        statusCode: response.status,
                    },
                };
            }

            return {
                success: true,
                data,
            };
        } catch (error) {
            clearTimeout(timeoutId);

            let errorMessage = 'Error de conexión';

            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    errorMessage = 'La solicitud ha tardado demasiado';
                } else {
                    errorMessage = error.message;
                }
            }

            return {
                success: false,
                error: {
                    message: errorMessage,
                },
            };
        }
    }

    async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

}

export const httpClient = new HttpClient();