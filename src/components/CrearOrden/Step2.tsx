import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import type { Product } from '@/types/api.order';

interface Step2Props {
    onBack: () => void;
    onSubmit: (products: Product[]) => void;
    isSubmitting: boolean;
}

const stepTransitions = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
};

const Step2: React.FC<Step2Props> = ({ onBack, onSubmit, isSubmitting }) => {
    const [products, setProducts] = useState<Product[]>([
        {
            id: Date.now().toString(),
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

    const handleSubmit = () => {
        onSubmit(products);
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
                                    type="button"
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
                                    Largo <span className="text-red-500">*</span>
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
                                    Alto <span className="text-red-500">*</span>
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
                                    Ancho <span className="text-red-500">*</span>
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
                                    Peso en libras <span className="text-red-500">*</span>
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
                                Contenido <span className="text-red-500">*</span>
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
                type="button"
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
                                        type="button"
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
                    type="button"
                    onClick={onBack}
                    disabled={isSubmitting}
                    className="flex items-center text-gray-600 hover:text-[#e5562f] transition-colors px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ← Regresar
                </button>

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-[#e5562f] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#d4502a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enviando...
                        </>
                    ) : (
                        'Enviar'
                    )}
                </button>
            </div>
        </motion.div>
    );
};

export default Step2;