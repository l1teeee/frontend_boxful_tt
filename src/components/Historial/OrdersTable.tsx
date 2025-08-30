import React from 'react';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { OrdersTableProps } from "@/types/Props/OrdersTableProps";


const OrdersTable: React.FC<OrdersTableProps> = ({orders, loading, selectedItems, selectAll, onSelectAll, onSelectItem, onShowProducts, pagination, onPageChange}) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            'PENDING': { color: 'bg-yellow-100 text-yellow-600', text: 'Pendiente' },
            'CONFIRMED': { color: 'bg-blue-100 text-blue-600', text: 'Confirmado' },
            'IN_TRANSIT': { color: 'bg-purple-100 text-purple-600', text: 'En tránsito' },
            'DELIVERED': { color: 'bg-green-100 text-green-600', text: 'Entregado' },
            'CANCELLED': { color: 'bg-red-100 text-red-600', text: 'Cancelado' },
        };

        const config = statusConfig[status as keyof typeof statusConfig] ||
            { color: 'bg-gray-100 text-gray-600', text: status };

        return (
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                {config.text}
            </span>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                            <input
                                type="checkbox"
                                className="rounded border-gray-300"
                                checked={selectAll}
                                onChange={onSelectAll}
                            />
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">No. de orden</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Nombre</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Apellidos</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Departamento</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Municipio</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Productos</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Estado</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Fecha</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, index) => (
                        <motion.tr
                            key={order._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                            whileHover={{ backgroundColor: '#f9fafb' }}
                            className="border-b border-gray-100 transition-colors"
                        >
                            <td className="py-3 px-4">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300"
                                    checked={selectedItems.includes(order._id)}
                                    onChange={() => onSelectItem(order._id)}
                                />
                            </td>
                            <td className="py-3 px-4 text-sm text-black font-medium">
                                {order._id}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">{order.firstName}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{order.lastName}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{order.department}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{order.municipality}</td>
                            <td className="py-3 px-4">
                                <button
                                    onClick={() => onShowProducts(order)}
                                    className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-green-100 text-green-600 text-sm font-medium hover:bg-green-200 transition-colors cursor-pointer"
                                    title="Ver productos de esta orden"
                                >
                                    {order.products?.length || 0}
                                </button>
                            </td>
                            <td className="py-3 px-4">
                                {getStatusBadge(order.status)}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                                {formatDate(order.createdAt || order.estimatedDate)}
                            </td>
                        </motion.tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {orders.length === 0 && !loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="p-8 text-center"
                >
                    <div className="text-gray-400 mb-4">
                        <Package className="mx-auto h-12 w-12" />
                    </div>
                    <p className="text-gray-500">No hay envíos registrados</p>
                    <p className="text-sm text-gray-400 mt-2">
                        Los envíos aparecerán aquí una vez que sean creados
                    </p>
                </motion.div>
            )}

            {pagination.totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Mostrando {((pagination.page - 1) * pagination.limit) + 1} a {Math.min(pagination.page * pagination.limit, pagination.total)} de {pagination.total} resultados
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onPageChange(pagination.page - 1)}
                            disabled={!pagination.hasPrevPage}
                            className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Anterior
                        </button>
                        <span className="px-3 py-1 text-sm bg-[#e5562f] text-white rounded">
                            {pagination.page}
                        </span>
                        <button
                            onClick={() => onPageChange(pagination.page + 1)}
                            disabled={!pagination.hasNextPage}
                            className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default OrdersTable;