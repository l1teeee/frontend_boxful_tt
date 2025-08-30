import { API_CONFIG, getApiUrl } from '@/config/api.config';
import { CreateOrderRequest, CreateOrderResponse, OrderResponse } from '@/types/api.order';


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

export const getOrders = async (page: number = 1, limit: number = 10) => {
    try {
        const url = `${getApiUrl(API_CONFIG.ENDPOINTS.ORDERS.GET_ALL)}?page=${page}&limit=${limit}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};


export const getOrderById = async (id: string): Promise<OrderResponse> => {
    try {
        const url = `${getApiUrl(API_CONFIG.ENDPOINTS.ORDERS.GET_BY_ID)}/${id}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
};


/**
 * Actualizar una orden
 */
export const updateOrder = async (id: string, updateData: Partial<CreateOrderRequest & { status: string }>) => {
    try {
        const url = `${getApiUrl(API_CONFIG.ENDPOINTS.ORDERS.UPDATE)}/${id}`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error updating order:', error);
        throw error;
    }
};

/**
 * Eliminar una orden
 */
export const deleteOrder = async (id: string) => {
    try {
        const url = `${getApiUrl(API_CONFIG.ENDPOINTS.ORDERS.DELETE)}/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error deleting order:', error);
        throw error;
    }
};

