import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Box, Package } from 'lucide-react';
import { ProductModalProps } from '@/types/Props/ProductModalProps';

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, products, orderNumber }) => {
    if (!isOpen) return null;

    const getTotalWeight = () => {
        return products.reduce((total, product) => total + (parseFloat(product.weight) || 0), 0);
    };

    const getTotalVolume = () => {
        return products.reduce((total, product) => {
            const length = parseFloat(product.length) || 0;
            const height = parseFloat(product.height) || 0;
            const width = parseFloat(product.width) || 0;
            return total + (length * height * width);
        }, 0);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-gray-900/65 bg-opacity-50"
                    onClick={onClose}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <Box className="h-6 w-6 text-[#e5562f]" />
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Productos de la orden</h2>
                                <p className="text-sm text-gray-600">#{orderNumber}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>

                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                        <div className="grid gap-4 mb-6">
                            {products.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="font-medium text-gray-900">Producto #{index + 1}</h3>
                                        <span className="text-sm text-gray-500">ID: {product.id}</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                                            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                                                {product.content || 'No especificado'}
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Peso</label>
                                            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                                                {product.weight} lbs
                                            </p>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Dimensiones (L × A × An)
                                            </label>
                                            <div className="flex items-center space-x-2 text-sm text-gray-900">
                                                <span className="bg-gray-50 p-2 rounded">{product.length} cm</span>
                                                <span>×</span>
                                                <span className="bg-gray-50 p-2 rounded">{product.height} cm</span>
                                                <span>×</span>
                                                <span className="bg-gray-50 p-2 rounded">{product.width} cm</span>
                                                <span className="text-gray-500 ml-2">
                                                    (Vol: {((parseFloat(product.length) || 0) *
                                                    (parseFloat(product.height) || 0) *
                                                    (parseFloat(product.width) || 0)).toLocaleString()} cm³)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen de la orden</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <Package className="h-5 w-5 text-blue-600" />
                                        <span className="text-sm font-medium text-blue-900">Total de productos</span>
                                    </div>
                                    <p className="text-2xl font-bold text-blue-600 mt-1">{products.length}</p>
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-green-900">Peso total</span>
                                    </div>
                                    <p className="text-2xl font-bold text-green-600 mt-1">{getTotalWeight().toFixed(2)} lbs</p>
                                </div>

                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-purple-900">Volumen total</span>
                                    </div>
                                    <p className="text-2xl font-bold text-purple-600 mt-1">
                                        {getTotalVolume().toLocaleString()} cm³
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 px-6 py-4">
                        <div className="flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ProductModal;