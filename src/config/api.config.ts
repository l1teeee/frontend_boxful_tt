// config/api.ts
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
    ENDPOINTS: {
        AUTH: {
            REGISTER: '/auth/register',
            LOGIN: '/auth/login',
        },
        ORDERS: {
            CREATE: '/orders',
            GET_ALL: '/orders',
            GET_BY_ID: '/orders',
            GET_BY_EMAIL: '/orders/email',
            GET_BY_STATUS: '/orders/status',
            UPDATE: '/orders',
            DELETE: '/orders',
            STATISTICS: '/orders/statistics',
        },
    },
} as const;

export const getApiUrl = (endpoint: string): string => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
};