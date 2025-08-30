import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { SuccessModal, ErrorModal, ModalStyles } from '@/components/ConfirmationModals';
import type { CreateOrderRequest, Product } from '@/types/api.order';
import { createOrder } from '@/services/order/orderService';
import { AuthStorage } from "@/services/auth";
import Step1 from '@/components/CrearOrden/Step1';
import Step2 from '@/components/CrearOrden/Step2';

const CrearOrden: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const { register, control, formState: { errors }, setValue, trigger, getValues } = useForm<CreateOrderRequest>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [errorType, setErrorType] = useState<'validation' | 'network' | 'general'>('general');

    const reset = () => {
        setValue('information', '');
        setValue('pickupAddress', '');
        setValue('estimatedDate', '');
        setValue('firstName', '');
        setValue('lastName', '');
        setValue('email', '');
        setValue('phone', '');
        setValue('destinationAddress', '');
        setValue('department', '');
        setValue('municipality', '');
        setValue('referencePoint', '');
    };

    const showValidationError = (missingFields?: string[]) => {
        setErrorType('validation');

        if (missingFields && missingFields.length > 0) {
            const fieldNames: Record<string, string> = {
                'pickupAddress': 'Dirección de recolección',
                'estimatedDate': 'Fecha programada',
                'firstName': 'Nombres',
                'lastName': 'Apellidos',
                'email': 'Correo electrónico',
                'phone': 'Teléfono',
                'destinationAddress': 'Dirección del destinatario',
                'department': 'Departamento',
                'municipality': 'Municipio',
                'referencePoint': 'Punto de referencia',
                'information': 'Indicaciones'
            };

            const missingFieldNames = missingFields.map(field => fieldNames[field] || field);
            setModalTitle('Campos requeridos');
            setModalMessage(`Por favor completa los siguientes campos: ${missingFieldNames.join(', ')}`);
        } else {
            setModalTitle('');
            setModalMessage('');
        }

        setShowErrorModal(true);
    };

    const showProductValidationError = () => {
        setErrorType('validation');
        setModalTitle('Productos incompletos');
        setModalMessage('Por favor completa todos los campos de los productos (largo, alto, ancho, peso y contenido).');
        setShowErrorModal(true);
    };

    const showOrderSuccess = (orderNumber?: string) => {
        if (orderNumber) {
            setModalTitle('¡Orden creada exitosamente!');
            setModalMessage(`Tu orden #${orderNumber} ha sido creada y está siendo procesada. Recibirás una notificación cuando un conductor la tome.`);
        } else {
            setModalTitle('');
            setModalMessage('');
        }
        setShowSuccessModal(true);
    };

    const handleCloseError = () => {
        setShowErrorModal(false);
        setModalTitle('');
        setModalMessage('');
    };

    const handleCloseSuccess = () => {
        setShowSuccessModal(false);
        setModalTitle('');
        setModalMessage('');
    };

    const validateStep1 = async () => {
        const fieldsToValidate = [
            'pickupAddress',
            'estimatedDate',
            'firstName',
            'lastName',
            'email',
            'phone',
            'destinationAddress',
            'department',
            'municipality',
            'referencePoint',
            'information'
        ] as const;

        const isValid = await trigger(fieldsToValidate);

        if (!isValid) {
            // Encontrar los campos específicos que fallan la validación
            const formValues = getValues();
            const missingFields = fieldsToValidate.filter(field => {
                const value = formValues[field];
                return !value || (typeof value === 'string' && value.trim() === '');
            });

            showValidationError(missingFields);
            return false;
        }
        return true;
    };

    const validateProducts = (products: Product[]) => {
        if (products.length === 0) {
            setErrorType('validation');
            setModalTitle('Sin productos');
            setModalMessage('Debes agregar al menos un producto para crear la orden.');
            setShowErrorModal(true);
            return false;
        }

        const emptyProducts = products.filter(product =>
            !product.length.trim() ||
            !product.height.trim() ||
            !product.width.trim() ||
            !product.weight.trim() ||
            !product.content.trim()
        );

        if (emptyProducts.length > 0) {
            showProductValidationError();
            return false;
        }

        return true;
    };

    const handleNextStep = async () => {
        if (currentStep === 1) {
            const isValid = await validateStep1();
            if (isValid) {
                setCurrentStep(2);
            }
        }
    };

    const handlePreviousStep = () => {
        setCurrentStep(1);
    };

    const handleFinalSubmit = async (products: Product[]) => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            const step1Valid = await validateStep1();
            if (!step1Valid) {
                setCurrentStep(1);
                return;
            }

            const productsValid = validateProducts(products);
            if (!productsValid) {
                return;
            }

            const formData = getValues();

            const estimatedDate = formData.estimatedDate
                ? new Date(formData.estimatedDate).toISOString()
                : new Date().toISOString();

            const orderData: CreateOrderRequest = {
                information: formData.information,
                pickupAddress: formData.pickupAddress,
                estimatedDate: estimatedDate,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                destinationAddress: formData.destinationAddress,
                department: formData.department,
                municipality: formData.municipality,
                referencePoint: formData.referencePoint,
                idUserCreate: AuthStorage.getUserId(),
                products: products.map(product => ({
                    id: product.id,
                    length: product.length,
                    height: product.height,
                    width: product.width,
                    weight: product.weight,
                    content: product.content
                }))
            };

            console.log('Datos del formulario:', orderData);

            const result = await createOrder(orderData);

            if (result.success) {
                const orderInfo = result.data?._id ? `ID: ${result.data._id}` : 'creada correctamente';
                showOrderSuccess(orderInfo);

                reset();
                setCurrentStep(1);
            } else {
                throw new Error(result.error || result.message || 'Error al crear la orden');
            }

        } catch (error: any) {
            console.error('Error al crear la orden:', error);

            setErrorType('network');
            setModalTitle('Error al crear orden');
            setModalMessage(error.message || 'No se pudo crear la orden. Verifica tu conexión a internet e inténtalo de nuevo.');
            setShowErrorModal(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-black mb-2">Crear orden</h1>
                <p className="text-gray-600">
                    Crea una entrega competitiva con entregas al mismo día (Área Metropolitana) y al día siguiente a nivel nacional.
                </p>
            </div>

            {/* Indicador de pasos */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="flex items-center mb-6"
            >
                <motion.div
                    animate={{
                        color: currentStep >= 1 ? '#e5562f' : '#9ca3af'
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center"
                >
                    <motion.div
                        animate={{
                            backgroundColor: currentStep >= 1 ? '#e5562f' : '#e5e7eb',
                            color: currentStep >= 1 ? '#ffffff' : '#6b7280'
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                    >
                        1
                    </motion.div>
                    <span className="ml-2 text-sm font-medium">Creación de envío - Paso 1</span>
                </motion.div>

                <div className="flex-1 mx-4 h-px bg-gray-300"></div>

                <motion.div
                    animate={{
                        color: currentStep >= 2 ? '#e5562f' : '#9ca3af'
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center"
                >
                    <motion.div
                        animate={{
                            backgroundColor: currentStep >= 2 ? '#e5562f' : '#e5e7eb',
                            color: currentStep >= 2 ? '#ffffff' : '#6b7280'
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                    >
                        2
                    </motion.div>
                    <span className="ml-2 text-sm font-medium">Creación de envío - Paso 2</span>
                </motion.div>
            </motion.div>

            {/* Contenido de pasos con AnimatePresence */}
            <AnimatePresence mode="wait" initial={false}>
                {currentStep === 1 ? (
                    <Step1
                        key="step1"
                        register={register}
                        control={control}
                        errors={errors}
                        setValue={setValue}
                        onNext={handleNextStep}
                    />
                ) : (
                    <Step2
                        key="step2"
                        onBack={handlePreviousStep}
                        onSubmit={handleFinalSubmit}
                        isSubmitting={isSubmitting}
                    />
                )}
            </AnimatePresence>

            {/* Modales */}
            <ModalStyles />

            {/* Modal de Éxito */}
            <SuccessModal
                isOpen={showSuccessModal}
                language="es"
                type="order"
                title={modalTitle || undefined}
                message={modalMessage || undefined}
                onClose={handleCloseSuccess}
            />

            {/* Modal de Error */}
            <ErrorModal
                isOpen={showErrorModal}
                language="es"
                type={errorType}
                title={modalTitle || undefined}
                message={modalMessage || undefined}
                onClose={handleCloseError}
            />
        </motion.div>
    );
};

export default CrearOrden;