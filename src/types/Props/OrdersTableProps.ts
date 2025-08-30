import {OrderResponse} from "@/types/api.order";

export interface OrdersTableProps {
    orders: OrderResponse[];
    loading: boolean;
    selectedItems: string[];
    selectAll: boolean;
    onSelectAll: () => void;
    onSelectItem: (id: string) => void;
    onShowProducts: (order: OrderResponse) => void;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
    onPageChange: (page: number) => void;
}
