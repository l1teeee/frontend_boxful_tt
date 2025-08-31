import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { UnifiedDateRangePicker } from "@/components/UnifiedDateRangePicker";
import { validationRules } from '@/utils/validate/validationRules';
import { useForm } from 'react-hook-form';
import { getUserOrders, filterOrdersByDateRange, getOrdersStatistics } from '@/services/order/orderService';
import { exportToCSV, exportToPDF } from '@/utils/exportUtils';
import ProductModal from '@/components/Historial/ProductModal';
import OrdersTable from '@/components/Historial/OrdersTable';
import ExportMenu from '@/components/Historial/ExportMenu';
import type { OrderResponse, Product } from '@/types/api.order';
import type { ExportStatistics } from '@/utils/exportUtils';

const Historial: React.FC = () => {
    const [envios, setEnvios] = useState<OrderResponse[]>([]);
    const [filteredEnvios, setFilteredEnvios] = useState<OrderResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [showExportMenu, setShowExportMenu] = useState<boolean>(false);
    const [exporting, setExporting] = useState<boolean>(false);
    const [showProductModal, setShowProductModal] = useState<boolean>(false);
    const [selectedOrderProducts, setSelectedOrderProducts] = useState<Product[]>([]);
    const [selectedOrderNumber, setSelectedOrderNumber] = useState<string>('');
    const [pagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false
    });

    const { control, watch, formState: { errors }, handleSubmit } = useForm();
    const startDate = watch('fechaInicio');
    const endDate = watch('fechaFin');

    const loadOrders = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getUserOrders();

            if (response.success && response.data) {
                setEnvios(response.data);
                setFilteredEnvios(response.data);
            } else {
                setError(response.message || 'Error al cargar las órdenes');
                setEnvios([]);
                setFilteredEnvios([]);
            }
        } catch (error) {
            console.error('Error loading orders:', error);
            setError('Error de conexión al cargar las órdenes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    useEffect(() => {
        if (startDate || endDate) {
            const filtered = filterOrdersByDateRange(envios, startDate, endDate);
            setFilteredEnvios(filtered);
        } else {
            setFilteredEnvios(envios);
        }
        setSelectedItems([]);
        setSelectAll(false);
    }, [startDate, endDate, envios]);

    const handleBuscar = handleSubmit(() => {
        console.log('Buscando con fechas:', { startDate, endDate });
    });


    const handleRefresh = () => {
        loadOrders();
    };

    const handlePageChange = () => {
        loadOrders();
    };

    const prepareExportData = (): ExportStatistics => {
        const stats = getOrdersStatistics(filteredEnvios);

        let dateRange = 'Todas las fechas';
        if (startDate && endDate) {
            const start = new Date(startDate).toLocaleDateString('es-ES');
            const end = new Date(endDate).toLocaleDateString('es-ES');
            dateRange = `${start} - ${end}`;
        } else if (startDate) {
            dateRange = `Desde ${new Date(startDate).toLocaleDateString('es-ES')}`;
        } else if (endDate) {
            dateRange = `Hasta ${new Date(endDate).toLocaleDateString('es-ES')}`;
        }

        return {
            total: stats.total,
            pending: stats.pending,
            confirmed: stats.confirmed,
            inTransit: stats.inTransit,
            delivered: stats.delivered,
            cancelled: stats.cancelled,
            totalPackages: stats.totalPackages,
            dateRange,
            exportDate: new Date().toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };
    };

    const handleExportCSV = async () => {
        try {
            setExporting(true);
            const exportStats = prepareExportData();
            await exportToCSV(filteredEnvios, exportStats);
            setShowExportMenu(false);
        } catch (error) {
            console.error('Error exporting CSV:', error);
            setError('Error al generar el archivo CSV');
        } finally {
            setExporting(false);
        }
    };

    const handleExportPDF = async () => {
        try {
            setExporting(true);
            const exportStats = prepareExportData();
            await exportToPDF(filteredEnvios, exportStats);
            setShowExportMenu(false);
        } catch (error) {
            console.error('Error exporting PDF:', error);
            setError('Error al generar el archivo PDF');
        } finally {
            setExporting(false);
        }
    };

    const handleShowProducts = (order: OrderResponse) => {
        setSelectedOrderProducts(order.products || []);
        setSelectedOrderNumber(order._id);
        setShowProductModal(true);
    };

    const handleCloseProductModal = () => {
        setShowProductModal(false);
        setSelectedOrderProducts([]);
        setSelectedOrderNumber('');
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
            setSelectAll(false);
        } else {
            setSelectedItems(filteredEnvios.map(envio => envio._id));
            setSelectAll(true);
        }
    };

    const handleSelectItem = (id: string) => {
        if (selectedItems.includes(id)) {
            const newSelected = selectedItems.filter(item => item !== id);
            setSelectedItems(newSelected);
            setSelectAll(false);
        } else {
            const newSelected = [...selectedItems, id];
            setSelectedItems(newSelected);
            if (newSelected.length === filteredEnvios.length) {
                setSelectAll(true);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <RefreshCw className="animate-spin h-8 w-8 text-[#e5562f]" />
                <span className="ml-2 text-gray-600">Cargando envíos...</span>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 space-y-4 lg:space-y-0"
            >
                <div>
                    <h1 className="text-2xl font-bold text-black">Mis envíos</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Total: {pagination.total} órdenes | Página {pagination.page} de {pagination.totalPages}
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <form onSubmit={handleBuscar} className="flex items-center space-x-2">
                        <UnifiedDateRangePicker
                            startDateName="fechaInicio"
                            endDateName="fechaFin"
                            label="Entre fechas:"
                            startPlaceholder="Fecha inicio"
                            endPlaceholder="Fecha fin"
                            control={control}
                            startDateRules={validationRules.dateRange.startDate()}
                            endDateRules={validationRules.dateRange.endDate(startDate)}
                            errors={errors}
                            maxDate={new Date()}
                        />
                    </form>
                    <div className="flex space-x-2">
                        <motion.button
                            type="button"
                            onClick={handleRefresh}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="text-gray-600 hover:text-[#e5562f] transition-colors px-4 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                            <RefreshCw size={16} className="inline mr-2" />
                            Actualizar
                        </motion.button>

                        <ExportMenu
                            showMenu={showExportMenu}
                            exporting={exporting}
                            ordersCount={filteredEnvios.length}
                            onToggleMenu={() => setShowExportMenu(!showExportMenu)}
                            onExportCSV={handleExportCSV}
                            onExportPDF={handleExportPDF}
                            disabled={filteredEnvios.length === 0}
                        />
                    </div>
                </div>
            </motion.div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
                >
                    <p className="text-red-600 text-sm">{error}</p>
                </motion.div>
            )}

            {showExportMenu && (
                <div
                    className="fixed inset-0 z-5"
                    onClick={() => setShowExportMenu(false)}
                />
            )}

            <OrdersTable
                orders={filteredEnvios}
                loading={loading}
                selectedItems={selectedItems}
                selectAll={selectAll}
                onSelectAll={handleSelectAll}
                onSelectItem={handleSelectItem}
                onShowProducts={handleShowProducts}
                pagination={pagination}
                onPageChange={handlePageChange}
            />

            <ProductModal
                isOpen={showProductModal}
                onClose={handleCloseProductModal}
                products={selectedOrderProducts}
                orderNumber={selectedOrderNumber}
            />
        </motion.div>
    );
};

export default Historial;