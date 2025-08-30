export interface ConfirmationModalProps {
    isOpen: boolean;
    phoneNumber: string;
    language: 'es' | 'en';
    onConfirm: () => void;
    onCancel: () => void;
}

export interface SuccessModalProps {
    isOpen: boolean;
    language: 'es' | 'en';
    title?: string;
    message?: string;
    type?: 'login' | 'register' | 'order' | 'custom';
    onClose?: () => void;
    autoClose?: boolean;
    autoCloseDelay?: number;
}

export interface ErrorModalProps {
    isOpen: boolean;
    language: 'es' | 'en';
    title?: string;
    message?: string;
    type?: 'general' | 'validation' | 'network' | 'custom';
    onClose: () => void;
}
