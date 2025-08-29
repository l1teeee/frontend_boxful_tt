import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { UnifiedDateRangePicker} from "@/components/UnifiedDateRangePicker";
import { validationRules } from '@/utils/validate/validationRules';
import { useForm } from 'react-hook-form';

interface Envio {
    id: string;
    nombre: string;
    apellidos: string;
    departamento: string;
    municipio: string;
    paquetes: string;
}

const Historial: React.FC = () => {
    const [envios] = useState<Envio[]>([
        {
            id: '3446788',
            nombre: 'Julio',
            apellidos: 'Armendáriz',
            departamento: 'San Salvador',
            municipio: 'San Salvador',
            paquetes: '4'
        },
        {
            id: 'b59500b9',
            nombre: 'María',
            apellidos: 'González',
            departamento: 'Santa Ana',
            municipio: 'Santa Ana',
            paquetes: '2'
        },
        {
            id: 'c70611c0',
            nombre: 'Carlos',
            apellidos: 'Hernández',
            departamento: 'La Libertad',
            municipio: 'Antiguo Cuscatlán',
            paquetes: '1'
        }
    ]);

    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const { control, watch, formState: { errors } } = useForm();
    const startDate = watch('fechaInicio');


    const handleDescargar = () => {
        console.log('Descargando informe...');
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
            setSelectAll(false);
        } else {
            setSelectedItems(envios.map(envio => envio.id));
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
            if (newSelected.length === envios.length) {
                setSelectAll(true);
            }
        }
    };

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
                <h1 className="text-2xl font-bold text-black">Mis envíos</h1>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center space-x-2">
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
                    </div>
                    <div className="flex space-x-2">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-[#e5562f] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#d4502a] transition-colors"
                        >
                            Buscar
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleDescargar}
                            className="text-gray-600 hover:text-[#e5562f] transition-colors px-4 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                            <Download size={16} className="inline mr-2" />
                            Descargar
                        </motion.button>
                    </div>
                </div>
            </motion.div>

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
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">No. de orden</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Nombre</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Apellidos</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Departamento</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Municipio</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Paquetes en orden</th>
                        </tr>
                        </thead>
                        <tbody>
                        {envios.map((envio, index) => (
                            <motion.tr
                                key={envio.id}
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
                                        checked={selectedItems.includes(envio.id)}
                                        onChange={() => handleSelectItem(envio.id)}
                                    />
                                </td>
                                <td className="py-3 px-4 text-sm text-black font-medium">{envio.id}</td>
                                <td className="py-3 px-4 text-sm text-gray-600">{envio.nombre}</td>
                                <td className="py-3 px-4 text-sm text-gray-600">{envio.apellidos}</td>
                                <td className="py-3 px-4 text-sm text-gray-600">{envio.departamento}</td>
                                <td className="py-3 px-4 text-sm text-gray-600">{envio.municipio}</td>
                                <td className="py-3 px-4">
                                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-green-100 text-green-600 text-sm font-medium">
                                            {envio.paquetes}
                                        </span>
                                </td>
                            </motion.tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {envios.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                        className="p-8 text-center"
                    >
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-3 3-3-3m-4 8l-3-3-3 3" />
                            </svg>
                        </div>
                        <p className="text-gray-500">No hay envíos registrados</p>
                        <p className="text-sm text-gray-400 mt-2">Los envíos aparecerán aquí una vez que sean creados</p>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default Historial;