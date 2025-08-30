export interface CrearOrdenFormData {
    estimatedDate?: Date;
    pickupAddress: string;
    suggestedDate: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    referencePoint: string;
    information: string;
    destinationAddress: string
    department: string;
    municipality: string;
    products: Product[];
    totalWeight: number;
    totalContent: string;
    totalPrice: number;
    totalPriceWithTax: number;
    totalPriceWithTaxFormatted: string;
    totalPriceFormatted: string;
    totalPriceWithTaxWithDiscount: number;
}

export interface Product {
    id: string;
    length: string;
    height: string;
    width: string;
    weight: string;
    content: string;
}
