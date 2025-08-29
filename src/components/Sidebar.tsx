import React from 'react';
import {
    Plus,
    History,
    ChevronLeft,
    ChevronRight,
    LogOut
} from 'lucide-react';
import boxImg from "@/assets/box.webp";

const Sidebar = ({ activeTab, setActiveTab, collapsed, setCollapsed, userName = "Usuario", onLogout }) => {
    const menuItems = [
        { id: 'crear', icon: Plus, label: 'Crear orden' },
        { id: 'historial', icon: History, label: 'Historial' }
    ];

    const getUserInitial = (name) => {
        return name.charAt(0).toUpperCase();
    };

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        }
    };

    return (
        <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} flex-shrink-0`}>
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b border-gray-200">
                    <div className="flex items-center space-x-2 p-4">
                        <div className="w-8 h-8  rounded-lg flex items-center justify-center">
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

                <div className={`py-4 border-b border-gray-100 transition-all duration-300 ${collapsed ? 'px-2' : 'px-4'}`}>
                    <div
                        className={`flex items-center p-3 rounded-xl transition-all duration-200 hover:bg-gray-50 cursor-pointer group ${
                            collapsed ? 'justify-center' : 'space-x-3'
                        }`}
                        title={collapsed ? userName : undefined}
                    >
                        <div className={`bg-gradient-to-br from-[#ff6139] to-[#e5562f] rounded-lg flex items-center justify-center text-white font-semibold shadow-sm group-hover:shadow-md transition-all duration-200 ${
                            collapsed ? 'w-8 h-8 text-xs' : 'w-9 h-9 text-sm'
                        }`}>
                            {getUserInitial(userName)}
                        </div>
                        {!collapsed && (
                            <div className="flex-1 min-w-0 opacity-100 transition-opacity duration-300">
                                <p className="text-sm font-medium text-gray-900 truncate group-hover:text-[#ff6139] transition-colors duration-200">
                                    {userName}
                                </p>
                                <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
                                    En línea
                                </p>
                            </div>
                        )}
                    </div>
                </div>

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

                <div className="px-4 pb-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className={`cursor-pointer w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none text-gray-700 hover:bg-red-50 hover:text-red-600 mt-4 ${
                            collapsed ? 'justify-center' : ''
                        }`}
                        title={collapsed ? 'Cerrar sesión' : undefined}
                    >
                        <LogOut size={20} />
                        {!collapsed && <span className="font-medium ">Cerrar sesión</span>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;