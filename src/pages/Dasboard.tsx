import React, { useState } from 'react';
import boxImage from "@/assets/box.webp"; // asegúrate que el path sea correcto

import {
    Plus,
    History,
    Package,
    Truck,
    User,
    Settings,
    ChevronLeft,
    ChevronRight,
    Calendar,
    Search,
    Download,
    Eye,
    Edit,
    Trash2
} from 'lucide-react';

interface BoxfulLogoProps {
    collapsed: boolean;
}

const BoxfulLogo: React.FC<BoxfulLogoProps> = ({ collapsed }) => (
    <div className="flex items-center space-x-2 p-4">
        {/* Imagen del logo */}
        <div className="p-2 rounded-lg">
            <img
                src={boxImage}
                alt="Boxful Logo"
                className="w-8 h-8 object-contain"
            />
        </div>

        {/* Texto visible solo si no está colapsado */}
        {!collapsed && (
            <span className="text-xl font-bold text-[#ff6139]">Boxful</span>
        )}
    </div>
);

// Componente de Item del Sidebar
const SidebarItem = ({ icon: Icon, label, active, onClick, collapsed }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            active
                ? 'bg-[#e5562f] text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100 hover:text-[#e5562f]'
        }`}
    >
        <Icon size={20} />
        {!collapsed && <span className="font-medium">{label}</span>}
    </button>
);

// Componente del Sidebar
const Sidebar = ({ activeTab, setActiveTab, collapsed, setCollapsed }) => {
    const menuItems = [
        { id: 'crear', icon: Plus, label: 'Crear orden' },
        { id: 'historial', icon: History, label: 'Historial' },
        { id: 'paquetes', icon: Package, label: 'Paquetes' },
        { id: 'envios', icon: Truck, label: 'Envíos' },
        { id: 'perfil', icon: User, label: 'Perfil' },
        { id: 'configuracion', icon: Settings, label: 'Configuración' }
    ];

    return (
        <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between">
                    <BoxfulLogo collapsed={collapsed} />
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-2 hover:bg-gray-100 rounded-lg mr-4"
                    >
                        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {menuItems.map(item => (
                        <SidebarItem
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            active={activeTab === item.id}
                            onClick={() => setActiveTab(item.id)}
                            collapsed={collapsed}
                        />
                    ))}
                </nav>
            </div>
        </div>
    );
};

// Componente de la página Crear Orden
const CrearOrden = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const Step1 = () => (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-black mb-6">Completa los datos</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-black mb-2">
                        Dirección de recolección
                    </label>
                    <input
                        type="text"
                        placeholder="Descripción Magnética, colonia 1, San Salvador"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e5562f] focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-black mb-2">
                        Fecha sugerida
                    </label>
                    <div className="relative">
                        <input
                            type="date"
                            defaultValue="2024/02/15"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e5562f] focus:border-transparent"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-black mb-2">
                        Nombre
                    </label>
                    <input
                        type="text"
                        placeholder="Andrea Rivera"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e5562f] focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-black mb-2">
                        Apellido
                    </label>
                    <input
                        type="text"
                        placeholder="Díaz López"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e5562f] focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-black mb-2">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        placeholder="andrea@email.com"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e5562f] focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-black mb-2">
                        Teléfono
                    </label>
                    <div className="flex">
                        <select className="p-3 border border-gray-300 rounded-l-lg bg-gray-50">
                            <option>503</option>
                        </select>
                        <input
                            type="tel"
                            placeholder="7777 7777"
                            className="flex-1 p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-[#e5562f] focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-black mb-2">
                        Mensaje
                    </label>
                    <input
                        type="text"
                        placeholder="Frente del Águila de Balboa I Los Proceres Sonsonate Boulevard San Salvador"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e5562f] focus:border-transparent"
                    />
                </div>

                <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-black mb-2">
                        Punto de referencia
                    </label>
                    <input
                        type="text"
                        placeholder="Cerca de restaurante Acajutla en la Plat"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e5562f] focus:border-transparent"
                    />
                </div>

                <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-black mb-2">
                        Información
                    </label>
                    <textarea
                        placeholder="Llamar antes de entregar"
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e5562f] focus:border-transparent"
                    />
                </div>
            </div>

            <div className="flex justify-end mt-6">
                <button
                    onClick={() => setCurrentStep(2)}
                    className="bg-[#e5562f] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#d4502a] transition-colors"
                >
                    Siguiente →
                </button>
            </div>
        </div>
    );

    const Step2 = () => (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-black mb-6">Agregar los productos</h2>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="border-b border-gray-200">
                        <th className="text-left py-3 text-sm font-medium text-gray-600">Largo</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-600">Alto</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-600">Ancho</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-600">Peso en libras</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-600">Cantidad</th>
                        <th className="w-10"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="border-b border-gray-100">
                        <td className="py-3">
                            <input type="number" placeholder="3" className="w-16 p-2 border border-gray-300 rounded" />
                        </td>
                        <td className="py-3">
                            <input type="number" placeholder="4" className="w-16 p-2 border border-gray-300 rounded" />
                        </td>
                        <td className="py-3">
                            <input type="number" placeholder="5" className="w-16 p-2 border border-gray-300 rounded" />
                        </td>
                        <td className="py-3">
                            <input type="number" placeholder="3 libras" className="w-20 p-2 border border-gray-300 rounded" />
                        </td>
                        <td className="py-3">
                            <input type="number" placeholder="iPhone 14 plus Max" className="w-32 p-2 border border-gray-300 rounded" />
                        </td>
                        <td className="py-3">
                            <button className="text-red-500 hover:text-red-700">
                                <Trash2 size={16} />
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Peso en libras:</span>
                    <span className="font-medium text-black">3 libras</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Contenido:</span>
                    <span className="font-medium text-black">iPhone 14 plus Max</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between items-center">
                    <span className="font-medium text-black">Subtotal:</span>
                    <span className="font-bold text-[#e5562f] text-lg">$7.50</span>
                </div>
            </div>

            <div className="flex justify-between mt-6">
                <button
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center text-gray-600 hover:text-[#e5562f] transition-colors"
                >
                    ← Regresar
                </button>
                <button className="bg-[#e5562f] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#d4502a] transition-colors">
                    Enviar →
                </button>
            </div>
        </div>
    );

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-black mb-2">Crear orden</h1>
                <p className="text-gray-600">
                    Crea una entrega competitiva e la negocio con entregas al mismo día (Área Metropolitana) y al día siguiente al nivel nacional.
                </p>
            </div>

            <div className="flex items-center mb-6">
                <div className={`flex items-center ${currentStep >= 1 ? 'text-[#e5562f]' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= 1 ? 'bg-[#e5562f] text-white' : 'bg-gray-200'
                    }`}>
                        1
                    </div>
                    <span className="ml-2 text-sm font-medium">Creación de envío - Paso 1</span>
                </div>

                <div className="flex-1 mx-4 h-px bg-gray-300"></div>

                <div className={`flex items-center ${currentStep >= 2 ? 'text-[#e5562f]' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= 2 ? 'bg-[#e5562f] text-white' : 'bg-gray-200'
                    }`}>
                        2
                    </div>
                    <span className="ml-2 text-sm font-medium">Creación de envío - Paso 2</span>
                </div>
            </div>

            {currentStep === 1 ? <Step1 /> : <Step2 />}
        </div>
    );
};

// Componente de la página Historial
const Historial = () => {
    const envios = [
        {
            id: 'a48499a8',
            fecha: 'Ayer',
            remitente: 'sin direccion',
            destinatario: 'San Salvador',
            departamento: 'San Salvador',
            mercancia: '1',
            respuesta: '3'
        }
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-black">Mis envíos</h1>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <label className="text-sm text-gray-600">Entre - días:</label>
                        <input type="date" className="p-2 border border-gray-300 rounded-lg text-sm" />
                    </div>
                    <button className="bg-[#e5562f] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#d4502a] transition-colors">
                        Buscar
                    </button>
                    <button className="text-gray-600 hover:text-[#e5562f] transition-colors">
                        Descargar Informe
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">No. de envío</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Remitente</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Apellidos</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Departamento</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Mercancía</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Respuesta en orden</th>
                            <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {envios.map((envio, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-black font-medium">{envio.id}</td>
                                <td className="py-3 px-4 text-sm text-gray-600">{envio.remitente}</td>
                                <td className="py-3 px-4 text-sm text-gray-600">{envio.destinatario}</td>
                                <td className="py-3 px-4 text-sm text-gray-600">{envio.departamento}</td>
                                <td className="py-3 px-4 text-sm text-gray-600">{envio.mercancia}</td>
                                <td className="py-3 px-4 text-sm text-[#e5562f] font-medium">{envio.respuesta}</td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center justify-center space-x-2">
                                        <button className="text-gray-400 hover:text-[#e5562f] transition-colors">
                                            <Eye size={16} />
                                        </button>
                                        <button className="text-gray-400 hover:text-[#e5562f] transition-colors">
                                            <Edit size={16} />
                                        </button>
                                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Componente placeholder para otras páginas
const PlaceholderPage = ({ title, description }) => (
    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <h1 className="text-2xl font-bold text-black mb-4">{title}</h1>
        <p className="text-gray-600">{description}</p>
    </div>
);

// Componente principal del Dashboard
const BoxfulDashboard = () => {
    const [activeTab, setActiveTab] = useState('crear');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const renderContent = () => {
        switch (activeTab) {
            case 'crear':
                return <CrearOrden />;
            case 'historial':
                return <Historial />;
            case 'paquetes':
                return <PlaceholderPage title="Paquetes" description="Gestiona todos tus paquetes aquí" />;
            case 'envios':
                return <PlaceholderPage title="Envíos" description="Seguimiento de todos los envíos" />;
            case 'perfil':
                return <PlaceholderPage title="Perfil" description="Configuración de tu perfil de usuario" />;
            case 'configuracion':
                return <PlaceholderPage title="Configuración" description="Configuración general de la aplicación" />;
            default:
                return <CrearOrden />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
            />

            <main className="flex-1 overflow-y-auto">
                <div className="p-6">
                    <div className="max-w-7xl mx-auto">
                        {renderContent()}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BoxfulDashboard;