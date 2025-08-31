import { API_CONFIG, getApiUrl } from '@/config/api.config';
import { CreateOrderRequest, CreateOrderResponse, OrderResponse } from '@/types/api.order';
import { AuthStorage } from "@/services/auth";

// Interfaz para la respuesta de órdenes del usuario
export interface GetUserOrdersResponse {
    success: boolean;
    message: string;
    data?: OrderResponse[];
    meta?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
        userId: string;
        statusFilter: string | null;
        sortOrder: string;
        sortBy: string;
    };
    error?: string;
}

// Parámetros para obtener órdenes del usuario
export interface GetUserOrdersParams {
    page?: number;
    limit?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
}

export const createOrder = async (orderData: CreateOrderRequest): Promise<CreateOrderResponse> => {
    try {
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.ORDERS.CREATE), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const result: CreateOrderResponse = await response.json();
        return result;
    } catch (error) {
        console.error('Error creating order:', error);
        return {
            success: false,
            message: 'Error al crear la orden',
            error: error instanceof Error ? error.message : 'Error desconocido'
        };
    }
};

export const getUserOrders = async (): Promise<GetUserOrdersResponse> => {
    try {
        const userId = AuthStorage.getUserId();

        if (!userId) {
            return {
                success: false,
                message: 'Usuario no autenticado',
                error: 'No se pudo obtener el ID del usuario'
            };
        }
        console.log('Fetching user orders from:', getApiUrl(`${API_CONFIG.ENDPOINTS.ORDERS.GET_ALL}/user/${userId}`));
        const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.ORDERS.GET_ALL}/user/${userId}`), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const result: GetUserOrdersResponse = await response.json();
        return result;

    } catch (error) {
        console.error('Error fetching user orders:', error);
        return {
            success: false,
            message: 'Error al obtener las órdenes del usuario',
            error: error instanceof Error ? error.message : 'Error desconocido'
        };
    }
};


// Función auxiliar para filtrar órdenes por rango de fechas en el frontend
export const filterOrdersByDateRange = (
    orders: OrderResponse[],
    startDate?: string,
    endDate?: string
): OrderResponse[] => {
    if (!startDate && !endDate) {
        return orders;
    }

    return orders.filter(order => {
        const orderDate = new Date(order.createdAt || order.estimatedDate);

        if (startDate && orderDate < new Date(startDate)) {
            return false;
        }

        if (endDate && orderDate > new Date(endDate)) {
            return false;
        }

        return true;
    });
};

// Función auxiliar para obtener estadísticas básicas de las órdenes
export const getOrdersStatistics = (orders: OrderResponse[]) => {
    const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'PENDING').length,
        confirmed: orders.filter(o => o.status === 'CONFIRMED').length,
        inTransit: orders.filter(o => o.status === 'IN_TRANSIT').length,
        delivered: orders.filter(o => o.status === 'DELIVERED').length,
        cancelled: orders.filter(o => o.status === 'CANCELLED').length,
        totalPackages: orders.reduce((acc, order) => acc + (order.products?.length || 0), 0),
    };

    return stats;
};