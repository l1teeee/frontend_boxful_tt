import React from 'react';
import {
    Plus,
    History,
    ChevronLeft,
    ChevronRight,
    LogOut
} from 'lucide-react';
import AuthService from '@/services/auth/authService';
import { useLogout } from '@/hooks/useLogout';
import boxImg from "@/assets/box.webp";
import {AuthStorage} from "@/services/auth";

interface SidebarProps {
    activeTab: 'crear' | 'historial';
    setActiveTab: (tab: 'crear' | 'historial') => void;
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    userName?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
                                             activeTab,
                                             setActiveTab,
                                             collapsed,
                                             setCollapsed,
                                             userName
                                         }) => {
    const { logout, loading } = useLogout();

    // Obtener nombre del usuario desde el servicio de auth si no se pasa como prop
    const currentUser = AuthService.getUser();
    const displayName = userName || currentUser?.nombre || 'Usuario';

    const menuItems = [
        { id: 'crear' as const, icon: Plus, label: 'Crear orden' },
        { id: 'historial' as const, icon: History, label: 'Historial' }
    ];

    const getUserInitial = (name: string): string => {
        return name.charAt(0).toUpperCase();
    };

    return (
        <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} flex-shrink-0`}>
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200">
                    <div className="flex items-center space-x-2 p-4">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                            <img src={boxImg} alt="Box" className="w-8 h-8" />
                        </div>
                        {!collapsed && (
                            <span className="text-xl font-bold text-[#ff6139]">Boxful</span>
                        )}
                    </div>
                    {!collapsed && (
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="p-2 hover:bg-gray-100 rounded-lg mr-4 transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>
                    )}
                </div>

                {/* Expand Button (when collapsed) */}
                {collapsed && (
                    <div className="flex justify-center py-2 border-b border-gray-200">
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                )}

                {/* User Profile */}
                <div className={`py-4 border-b border-gray-100 transition-all duration-300 ${collapsed ? 'px-2' : 'px-4'}`}>
                    <div
                        className={`rounded-xl transition-all duration-200 hover:bg-gray-50 cursor-pointer group ${
                            collapsed ? 'p-2' : 'p-3'
                        }`}
                        title={collapsed ? displayName : undefined}
                    >
                        {/* Línea superior: Icono y Nombre */}
                        <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
                            <div className={`bg-gradient-to-br from-[#ff6139] to-[#e5562f] rounded-lg flex items-center justify-center text-white font-semibold shadow-sm group-hover:shadow-md transition-all duration-200 flex-shrink-0 ${
                                collapsed ? 'w-8 h-8 text-xs' : 'w-9 h-9 text-sm'
                            }`}>
                                {getUserInitial(displayName)}
                            </div>
                            {!collapsed && (
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate group-hover:text-[#ff6139] transition-colors duration-200">
                                        {displayName}
                                    </p>
                                </div>
                            )}
                        </div>

                        {!collapsed && (
                            <div className="mt-2">
                                <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
                                    ID: {AuthStorage.getUserId()}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                {/* Navigation Menu */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`cursor-pointer w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none ${
                                activeTab === item.id
                                    ? 'bg-[#e5562f] text-white shadow-lg'
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-[#e5562f]'
                            }`}
                            title={collapsed ? item.label : undefined}
                        >
                            <item.icon size={20} />
                            {!collapsed && <span className="font-medium">{item.label}</span>}
                        </button>
                    ))}
                </nav>

                {/* Logout Button - Bottom */}
                <div className={`border-t border-gray-100 transition-all duration-300 ${collapsed ? 'p-2' : 'p-4'}`}>
                    <button
                        onClick={logout}
                        disabled={loading}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none text-red-600 hover:bg-red-50 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed ${
                            collapsed ? 'justify-center' : ''
                        }`}
                        title={collapsed ? 'Cerrar Sesión' : undefined}
                    >
                        <LogOut size={20} />
                        {!collapsed && (
                            <span className="font-medium">
                                {loading ? 'Cerrando...' : 'Cerrar Sesión'}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;