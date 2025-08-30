import type { OrderResponse } from '@/types/api.order';

// Interfaz para estadísticas de exportación
export interface ExportStatistics {
    total: number;
    pending: number;
    confirmed: number;
    inTransit: number;
    delivered: number;
    cancelled: number;
    totalPackages: number;
    dateRange: string;
    exportDate: string;
}

// Función para generar CSV
export const exportToCSV = (orders: OrderResponse[], stats: ExportStatistics): void => {
    try {
        // Encabezados del CSV
        const headers = [
            'ID de Orden',
            'Nombre',
            'Apellidos',
            'Email',
            'Teléfono',
            'Departamento',
            'Municipio',
            'Dirección Destino',
            'Punto de Referencia',
            'Estado',
            'Fecha de Creación',
            'Fecha Estimada',
            'Productos',
            'Peso Total (lbs)',
            'Indicaciones'
        ];

        // Convertir órdenes a filas CSV
        const csvRows = orders.map(order => {
            const totalWeight = order.products?.reduce((sum, product) =>
                sum + (parseFloat(product.weight) || 0), 0
            ) || 0;

            const productsInfo = order.products?.map(p =>
                `${p.content} (${p.length}x${p.height}x${p.width}cm, ${p.weight}lbs)`
            ).join('; ') || '';

            return [
                order._id || '',
                order.firstName || '',
                order.lastName || '',
                order.email || '',
                order.phone || '',
                order.department || '',
                order.municipality || '',
                order.destinationAddress || '',
                order.referencePoint || '',
                getStatusText(order.status) || '',
                formatDateForExport(order.createdAt) || '',
                formatDateForExport(order.estimatedDate) || '',
                `"${productsInfo}"`,
                totalWeight.toFixed(2),
                `"${order.information || ''}"`
            ];
        });

        // Agregar estadísticas al final del CSV
        const statsRows = [
            [],
            ['ESTADÍSTICAS DEL REPORTE'],
            ['Total de órdenes', stats.total.toString()],
            ['Órdenes pendientes', stats.pending.toString()],
            ['Órdenes confirmadas', stats.confirmed.toString()],
            ['Órdenes en tránsito', stats.inTransit.toString()],
            ['Órdenes entregadas', stats.delivered.toString()],
            ['Órdenes canceladas', stats.cancelled.toString()],
            ['Total de productos', stats.totalPackages.toString()],
            ['Fecha de exportación', stats.exportDate],
            ['Rango de fechas', stats.dateRange]
        ];

        // Combinar encabezados, datos y estadísticas
        const allRows = [headers, ...csvRows, ...statsRows];

        // Convertir a string CSV
        const csvContent = allRows.map(row => row.join(',')).join('\n');

        // Crear y descargar archivo
        const blob = new Blob(['\uFEFF' + csvContent], {
            type: 'text/csv;charset=utf-8;'
        });

        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `mis-envios-${formatDateForFilename()}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        console.log('CSV descargado exitosamente');
    } catch (error) {
        console.error('Error al generar CSV:', error);
        throw new Error('Error al generar el archivo CSV');
    }
};

// Función para generar PDF
export const exportToPDF = async (orders: OrderResponse[], stats: ExportStatistics): Promise<void> => {
    try {
        // Crear contenido HTML para el PDF
        const htmlContent = generatePDFHTML(orders, stats);

        // Crear una nueva ventana para imprimir
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            throw new Error('No se pudo abrir la ventana de impresión. Verifique que no esté bloqueada por el navegador.');
        }

        // Escribir contenido HTML en la nueva ventana
        printWindow.document.write(htmlContent);
        printWindow.document.close();

        // Esperar a que se cargue el contenido
        printWindow.onload = () => {
            // Configurar la impresión para generar PDF
            printWindow.focus();
            printWindow.print();

            // Cerrar ventana después de la impresión
            printWindow.onafterprint = () => {
                printWindow.close();
            };
        };

        console.log('PDF generado exitosamente');
    } catch (error) {
        console.error('Error al generar PDF:', error);
        throw new Error('Error al generar el archivo PDF');
    }
};

// Función para generar HTML del PDF
const generatePDFHTML = (orders: OrderResponse[], stats: ExportStatistics): string => {
    const ordersTableRows = orders.map(order => {
        const totalWeight = order.products?.reduce((sum, product) =>
            sum + (parseFloat(product.weight) || 0), 0
        ) || 0;

        return `
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px; font-size: 10px;">${order._id || 'N/A'}</td>
                <td style="border: 1px solid #ddd; padding: 8px; font-size: 10px;">${order.firstName || ''} ${order.lastName || ''}</td>
                <td style="border: 1px solid #ddd; padding: 8px; font-size: 10px;">${order.department || ''}</td>
                <td style="border: 1px solid #ddd; padding: 8px; font-size: 10px;">${order.municipality || ''}</td>
                <td style="border: 1px solid #ddd; padding: 8px; font-size: 10px; text-align: center;">${order.products?.length || 0}</td>
                <td style="border: 1px solid #ddd; padding: 8px; font-size: 10px; text-align: center;">${totalWeight.toFixed(1)} lbs</td>
                <td style="border: 1px solid #ddd; padding: 8px; font-size: 10px; text-align: center;">
                    <span style="background-color: ${getStatusColor(order.status)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 9px;">
                        ${getStatusText(order.status)}
                    </span>
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; font-size: 10px;">${formatDateForExport(order.createdAt) || formatDateForExport(order.estimatedDate) || 'N/A'}</td>
            </tr>
        `;
    }).join('');

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Reporte de Mis Envíos</title>
            <style>
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    color: #333;
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 2px solid #e5562f;
                    padding-bottom: 20px;
                }
                .company-name {
                    color: #e5562f;
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .report-title {
                    font-size: 18px;
                    margin-bottom: 5px;
                }
                .report-date {
                    color: #666;
                    font-size: 12px;
                }
                .stats-section {
                    background-color: #f9f9f9;
                    padding: 15px;
                    border-radius: 8px;
                    margin-bottom: 30px;
                }
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 15px;
                }
                .stat-item {
                    text-align: center;
                }
                .stat-number {
                    font-size: 20px;
                    font-weight: bold;
                    color: #e5562f;
                }
                .stat-label {
                    font-size: 12px;
                    color: #666;
                    margin-top: 5px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                    font-size: 11px;
                }
                th {
                    background-color: #e5562f;
                    color: white;
                    padding: 10px 8px;
                    text-align: left;
                    font-size: 10px;
                    font-weight: bold;
                }
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 10px;
                    color: #666;
                    border-top: 1px solid #ddd;
                    padding-top: 15px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="company-name">Sistema de Envíos</div>
                <div class="report-title">Reporte de Mis Envíos</div>
                <div class="report-date">Generado el ${stats.exportDate}</div>
                ${stats.dateRange !== 'Todas las fechas' ? `<div class="report-date">Período: ${stats.dateRange}</div>` : ''}
            </div>

            <div class="stats-section">
                <h3 style="margin-top: 0; color: #333;">Estadísticas del Reporte</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-number">${stats.total}</div>
                        <div class="stat-label">Total Órdenes</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${stats.pending}</div>
                        <div class="stat-label">Pendientes</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${stats.confirmed}</div>
                        <div class="stat-label">Confirmadas</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${stats.delivered}</div>
                        <div class="stat-label">Entregadas</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${stats.totalPackages}</div>
                        <div class="stat-label">Total Productos</div>
                    </div>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID Orden</th>
                        <th>Nombre Completo</th>
                        <th>Departamento</th>
                        <th>Municipio</th>
                        <th>Productos</th>
                        <th>Peso Total</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    ${ordersTableRows}
                </tbody>
            </table>

            <div class="footer">
                <p>Este reporte contiene ${orders.length} órdenes de un total de ${stats.total} registradas.</p>
                <p>Reporte generado automáticamente por el Sistema de Envíos</p>
            </div>
        </body>
        </html>
    `;
};

const getStatusText = (status: string): string => {
    const statusMap: Record<string, string> = {
        'PENDING': 'Pendiente',
        'CONFIRMED': 'Confirmada',
        'IN_TRANSIT': 'En Tránsito',
        'DELIVERED': 'Entregada',
        'CANCELLED': 'Cancelada'
    };
    return statusMap[status] || status;
};

const getStatusColor = (status: string): string => {
    const colorMap: Record<string, string> = {
        'PENDING': '#f59e0b',
        'CONFIRMED': '#3b82f6',
        'IN_TRANSIT': '#8b5cf6',
        'DELIVERED': '#10b981',
        'CANCELLED': '#ef4444'
    };
    return colorMap[status] || '#6b7280';
};

const formatDateForExport = (dateString?: string): string => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const formatDateForFilename = (): string => {
    return new Date().toISOString().split('T')[0];
};