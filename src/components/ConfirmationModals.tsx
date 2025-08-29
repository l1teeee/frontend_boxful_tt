import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    phoneNumber: string;
    language: 'es' | 'en';
    onConfirm: () => void;
    onCancel: () => void;
}

interface SuccessModalProps {
    isOpen: boolean;
    language: 'es' | 'en';
    title?: string;
    message?: string;
}

interface ErrorModalProps {
    isOpen: boolean;
    language: 'es' | 'en';
    title?: string;
    message?: string;
    onClose: () => void;
}

// Modal de Confirmación de Teléfono
export const PhoneConfirmationModal: React.FC<ConfirmationModalProps> = ({
                                                                             isOpen,
                                                                             phoneNumber,
                                                                             language,
                                                                             onConfirm,
                                                                             onCancel
                                                                         }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900/65 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform animate-scale-in">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 mb-4">
                        <svg className="h-6 w-6 text-[#ff6139]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {language === 'es' ? 'Confirmar número de teléfono' : 'Confirm phone number'}
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">
                        {language === 'es'
                            ? '¿Es correcto este número de teléfono?'
                            : 'Is this phone number correct?'}
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <p className="text-lg font-semibold text-gray-900">
                            {phoneNumber}
                        </p>
                    </div>
                    <div className="flex space-x-3">
                        <button
                            onClick={onCancel}
                            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                        >
                            {language === 'es' ? 'Cancelar' : 'Cancel'}
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 bg-[#ff6139] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#e5562f] transition-colors duration-200"
                        >
                            {language === 'es' ? 'Aceptar' : 'Accept'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Modal de Éxito
export const SuccessModal: React.FC<SuccessModalProps> = ({
                                                              isOpen,
                                                              language,
                                                              title,
                                                              message
                                                          }) => {
    if (!isOpen) return null;

    const defaultTitle = language === 'es' ? '¡Registro exitoso!' : 'Registration successful!';
    const defaultMessage = language === 'es'
        ? 'Tu cuenta ha sido creada correctamente'
        : 'Your account has been created successfully';

    return (
        <div className="fixed inset-0 bg-gray-900/65 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform animate-scale-in">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                        <svg className="h-8 w-8 text-green-500 animate-checkmark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                                className="animate-draw-check"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {title || defaultTitle}
                    </h3>
                    <p className="text-gray-500">
                        {message || defaultMessage}
                    </p>
                </div>
            </div>
        </div>
    );
};

// Modal de Error
export const ErrorModal: React.FC<ErrorModalProps> = ({
                                                          isOpen,
                                                          language,
                                                          title,
                                                          message,
                                                          onClose
                                                      }) => {
    if (!isOpen) return null;

    const defaultTitle = language === 'es' ? 'Error en el registro' : 'Registration error';
    const defaultMessage = language === 'es'
        ? 'Ha ocurrido un error durante el registro. Por favor, inténtalo de nuevo.'
        : 'An error occurred during registration. Please try again.';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform animate-scale-in">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                        <svg className="h-8 w-8 text-red-500 animate-error-shake" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {title || defaultTitle}
                    </h3>
                    <p className="text-gray-500 mb-6">
                        {message || defaultMessage}
                    </p>
                    <button
                        onClick={onClose}
                        className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
                    >
                        {language === 'es' ? 'Cerrar' : 'Close'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Componente de Estilos (para usar en el componente padre)
export const ModalStyles: React.FC = () => (
    <style>{`
        @keyframes scale-in {
            0% {
                transform: scale(0.95);
                opacity: 0;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }

        @keyframes checkmark {
            0% {
                transform: scale(0);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }

        @keyframes draw-check {
            0% {
                stroke-dasharray: 0, 100;
            }
            100% {
                stroke-dasharray: 100, 0;
            }
        }

        @keyframes error-shake {
            0%, 100% {
                transform: translateX(0);
            }
            25% {
                transform: translateX(-4px);
            }
            75% {
                transform: translateX(4px);
            }
        }

        .animate-scale-in {
            animation: scale-in 0.3s ease-out;
        }

        .animate-checkmark {
            animation: checkmark 0.6s ease-out;
        }

        .animate-draw-check {
            stroke-dasharray: 100;
            animation: draw-check 0.8s ease-out;
        }

        .animate-error-shake {
            animation: error-shake 0.5s ease-in-out;
        }
    `}</style>
);