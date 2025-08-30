import React from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw, FileText, FileSpreadsheet } from 'lucide-react';
import type { ExportMenuProps } from '@/types/ExportMenu';


const ExportMenu: React.FC<ExportMenuProps> = ({showMenu, exporting, ordersCount, onToggleMenu, onExportCSV, onExportPDF, disabled}) => {
    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onToggleMenu}
                className="text-gray-600 hover:text-[#e5562f] transition-colors px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center"
                disabled={disabled || exporting}
            >
                {exporting ? (
                    <RefreshCw size={16} className="inline mr-2 animate-spin" />
                ) : (
                    <Download size={16} className="inline mr-2" />
                )}
                {exporting ? 'Exportando...' : 'Descargar'}
            </motion.button>

            {showMenu && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                >
                    <div className="py-2">
                        <button
                            onClick={onExportCSV}
                            disabled={exporting}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center disabled:opacity-50"
                        >
                            <FileSpreadsheet size={16} className="mr-2 text-green-600" />
                            Descargar como CSV
                        </button>
                        <button
                            onClick={onExportPDF}
                            disabled={exporting}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center disabled:opacity-50"
                        >
                            <FileText size={16} className="mr-2 text-red-600" />
                            Descargar como PDF
                        </button>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-2">
                        <p className="text-xs text-gray-500">
                            {ordersCount} órdenes para exportar
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default ExportMenu;