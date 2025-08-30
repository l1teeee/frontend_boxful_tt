import type {Product} from "@/types/api.order";


export interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    products: Product[];
    orderNumber: string;
}