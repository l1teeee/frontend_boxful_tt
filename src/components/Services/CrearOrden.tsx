import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { UnifiedInput } from '@/components/UnifiedInput';
import { UnifiedDatePicker } from '@/components/UnifiedDatePicker';
import { UnifiedPhoneInput } from '@/components/UnifiedPhone';
import { UnifiedSelect } from '@/components/UnifiedSelect';

import { validationRules } from '@/utils/validate/validationRules';
// Configuración de animaciones
const stepTransitions = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};

interface CrearOrdenFormData {
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

interface Product {
    id: string;
    length: string;
    height: string;
    width: string;
    weight: string;
    content: string;
}

const CrearOrden: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<CrearOrdenFormData>();

    const onSubmit = (data: CrearOrdenFormData) => {
        console.log('Datos del formulario:', data);
        alert('¡Orden creada exitosamente!');
        reset();
        setCurrentStep(1);
    };

    const Step1 = () => {
        const departamentos = [
            'Ahuachapán', 'Cabañas', 'Chalatenango', 'Cuscatlán', 'La Libertad',
            'La Paz', 'La Unión', 'Morazán', 'San Miguel', 'San Salvador',
            'San Vicente', 'Santa Ana', 'Sonsonate', 'Usulután'
        ];

        const municipios = [
            'Aguilares', 'Apopa', 'Ayutuxtepeque', 'Ciudad Delgado', 'Cuscatancingo',
            'El Paisnal', 'Guazapa', 'Ilopango', 'Mejicanos', 'Nejapa',
            'Panchimalco', 'Rosario de Mora', 'San Marcos', 'San Martín',
            'San Salvador', 'Santiago Texacuangos', 'Santo Tomás', 'Soyapango',
            'Tonacatepeque', 'Antiguo Cuscatlán', 'Chiltiupán', 'Colón',
            'Comasagua', 'Huizúcar', 'Jayaque', 'Jicalapa', 'La Libertad',
            'Nueva San Salvador', 'Opico', 'Quezaltepeque', 'Sacacoyo',
            'San José Villanueva', 'San Matías', 'San Pablo Tacachico',
            'Talnique', 'Tamanique', 'Teotepeque', 'Tepecoyo', 'Zaragoza'
        ];

        return (
            <motion.div
                initial={stepTransitions.initial}
                animate={stepTransitions.animate}
                exit={stepTransitions.exit}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="bg-white rounded-lg shadow-sm p-6"
            >
                <h2 className="text-xl font-semibold text-black mb-6">Completa los datos</h2>

                <form className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <UnifiedInput
                        name="pickupAddress"
                        label="Dirección de recolección"
                        placeholder="Descripción Magnética, colonia 1, San Salvador"
                        register={register}
                        rules={validationRules.required('La dirección de recolección es requerida')}
                        errors={errors}
                    />

                    <UnifiedDatePicker
                        name="estimatedDate"
                        label="Fecha programada"
                        placeholder="Selecciona una fecha estimada"
                        control={control}
                        rules={validationRules.required('La fecha estimada es requerida')}
                        errors={errors}
                        variant="future"
                    />

                    <UnifiedInput
                        name="firstName"
                        label="Nombres"
                        placeholder="Gabriela Romeo"
                        register={register}
                        rules={{
                            ...validationRules.required('El nombre es requerido'),
                            ...validationRules.name('nombre')
                        }}
                        errors={errors}
                    />

                    <UnifiedInput
                        name="lastName"
                        label="Apellidos"
                        placeholder="Díaz López"
                        register={register}
                        rules={{
                            ...validationRules.required('El apellido es requerido'),
                            ...validationRules.name('apellido')
                        }}
                        errors={errors}
                    />

                    <UnifiedInput
                        name="email"
                        label="Correo electrónico"
                        placeholder="gabydasu@gmail.com"
                        type="email"
                        register={register}
                        rules={{
                            ...validationRules.required('El correo electrónico es requerido'),
                            ...validationRules.email()
                        }}
                        errors={errors}
                    />

                    <UnifiedPhoneInput
                        name="phone"
                        label="Teléfono"
                        control={control}
                        register={register}
                        rules={{
                            ...validationRules.required('El número de teléfono es requerido'),
                            ...validationRules.phone()
                        }}
                        errors={errors}
                    />

                    <UnifiedInput
                        name="destinationAddress"
                        label="Dirección del destinatario"
                        placeholder="Final 49 Av. Sur y Bulevar Los Próceres, Soyapango, Bodega 888, San Salvador"
                        register={register}
                        rules={validationRules.required('La dirección del destinatario es requerida')}
                        errors={errors}
                        className="lg:col-span-2"
                    />

                    <UnifiedSelect
                        name="department"
                        label="Departamento"
                        placeholder="San Salvador"
                        options={departamentos}
                        control={control}
                        rules={validationRules.required('El departamento es requerido')}
                        errors={errors}
                    />

                    <UnifiedSelect
                        name="municipality"
                        label="Municipio"
                        placeholder="San Salvador"
                        options={municipios}
                        control={control}
                        rules={validationRules.required('El municipio es requerido')}
                        errors={errors}
                    />

                    <UnifiedInput
                        name="referencePoint"
                        label="Punto de referencia"
                        placeholder="Cerca de restaurante Árbol de La Paz"
                        register={register}
                        rules={validationRules.required('El punto de referencia es requerido')}
                        errors={errors}
                        className="lg:col-span-2"
                    />

                    <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-black mb-2">
                            Indicaciones
                        </label>
                        <textarea
                            {...register('information', validationRules.required('Las indicaciones son requeridas'))}
                            placeholder="Llamar antes de entregar"
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e5562f] focus:border-transparent focus:outline-none"
                        />
                        {errors.information && (
                            <p className="mt-1 text-sm text-red-600">{errors.information.message}</p>
                        )}
                    </div>
                </form>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={() => setCurrentStep(2)}
                        className="bg-[#e5562f] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#d4502a] transition-colors"
                    >
                        Siguiente →
                    </button>
                </div>
            </motion.div>
        );
    };


    const Step2 = () => {
        const [products, setProducts] = useState<Product[]>([
            {
                id: '1',
                length: '',
                height: '',
                width: '',
                weight: '',
                content: ''
            }
        ]);

        const addProduct = () => {
            const newProduct: Product = {
                id: Date.now().toString(),
                length: '',
                height: '',
                width: '',
                weight: '',
                content: ''
            };
            setProducts([...products, newProduct]);
        };

        const removeProduct = (id: string) => {
            if (products.length > 1) {
                setProducts(products.filter(product => product.id !== id));
            }
        };

        const updateProduct = (id: string, field: keyof Product, value: string) => {
            setProducts(products.map(product =>
                product.id === id ? { ...product, [field]: value } : product
            ));
        };

        const getTotalWeight = () => {
            return products.reduce((total, product) => {
                return total + (parseFloat(product.weight) || 0);
            }, 0);
        };

        const getAllContent = () => {
            return products
                .filter(product => product.content.trim() !== '')
                .map(product => product.content)
                .join(', ');
        };

        const stepTransitions = {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -20 }
        };

        return (
            <motion.div
                initial={stepTransitions.initial}
                animate={stepTransitions.animate}
                exit={stepTransitions.exit}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="bg-white rounded-lg shadow-sm p-6"
            >
                <h2 className="text-xl font-semibold text-black mb-6">Agregar los productos</h2>

                <div className="space-y-4">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                        >
                            <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-600">
                                Producto #{index + 1}
                            </span>
                                {products.length > 1 && (
                                    <button
                                        onClick={() => removeProduct(product.id)}
                                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Largo
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            type="number"
                                            placeholder="15"
                                            value={product.length}
                                            onChange={(e) => updateProduct(product.id, 'length', e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#e5562f] focus:border-transparent"
                                        />
                                        <span className="ml-2 text-xs text-gray-500">cm</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Alto
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            type="number"
                                            placeholder="10"
                                            value={product.height}
                                            onChange={(e) => updateProduct(product.id, 'height', e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#e5562f] focus:border-transparent"
                                        />
                                        <span className="ml-2 text-xs text-gray-500">cm</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Ancho
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            type="number"
                                            placeholder="15"
                                            value={product.width}
                                            onChange={(e) => updateProduct(product.id, 'width', e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#e5562f] focus:border-transparent"
                                        />
                                        <span className="ml-2 text-xs text-gray-500">cm</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Peso en libras
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="3"
                                        value={product.weight}
                                        onChange={(e) => updateProduct(product.id, 'weight', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#e5562f] focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Contenido
                                </label>
                                <input
                                    type="text"
                                    placeholder="iPhone 14 pro Max"
                                    value={product.content}
                                    onChange={(e) => updateProduct(product.id, 'content', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#e5562f] focus:border-transparent"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <button
                    onClick={addProduct}
                    className="mt-4 text-[#e5562f] hover:bg-orange-50 px-4 py-2 rounded-lg transition-colors flex items-center border border-[#e5562f] border-dashed hover:border-solid"
                >
                    <Plus size={16} className="mr-2" />
                    Agregar
                </button>

                {products.length > 0 && products.some(p => p.content.trim() !== '') && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 border-2 border-green-200 rounded-lg p-4 bg-green-50"
                    >
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Productos agregados:</h3>
                        <div className="space-y-2">
                            {products
                                .filter(product => product.content.trim() !== '')
                                .map((product) => (
                                    <div key={product.id} className="flex justify-between items-center py-2 border-b border-green-200 last:border-b-0">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-4">
                                            <span className="text-sm font-medium text-gray-700">
                                                {product.content}
                                            </span>
                                                <div className="text-xs text-gray-500 space-x-2">
                                                    <span>{product.length}×{product.height}×{product.width} cm</span>
                                                    <span>•</span>
                                                    <span>{product.weight} libras</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeProduct(product.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors p-1 ml-2"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Peso total:</span>
                            <span className="font-medium text-black">
                            {getTotalWeight().toFixed(1)} libras
                        </span>
                        </div>

                        {getAllContent() && (
                            <div className="flex justify-between items-start">
                                <span className="text-sm text-gray-600">Contenido:</span>
                                <span className="font-medium text-black text-right max-w-xs">
                                {getAllContent()}
                            </span>
                            </div>
                        )}

                        <hr className="my-3 border-gray-200" />

                        <div className="flex justify-between items-center">
                            <span className="font-medium text-black">Subtotal:</span>
                            <span className="font-bold text-[#e5562f] text-lg">
                            ${(getTotalWeight() * 2.5).toFixed(2)}
                        </span>
                        </div>
                    </div>
                </motion.div>

                <div className="flex justify-between mt-6">
                    <button
                        onClick={() => setCurrentStep(1)}
                        className="flex items-center text-gray-600 hover:text-[#e5562f] transition-colors px-4 py-2"
                    >
                        ← Regresar
                    </button>
                    <button
                        onClick={handleSubmit(onSubmit)}
                        className="bg-[#e5562f] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#d4502a] transition-colors"
                    >
                        Enviar
                    </button>
                </div>
            </motion.div>
        );
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
                {currentStep === 1 ? <Step1 key="step1" /> : <Step2 key="step2" />}
            </AnimatePresence>
        </motion.div>
    );
};

export default CrearOrden;