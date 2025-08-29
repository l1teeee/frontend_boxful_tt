import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import CrearOrden from '@/components/Services/CrearOrden';
import Historial from '@/components/Services/Historial';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'crear' | 'historial'>('crear');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const navigate = useNavigate();

    const renderContent = () => {
        switch (activeTab) {
            case 'crear':
                return <CrearOrden />;
            case 'historial':
                return <Historial />;
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
                onLogout={() => {
                    localStorage.removeItem('token');
                    navigate('/');
                }}
            />

            <main className="flex-1 overflow-y-auto bg-gray-50">
                <div className="p-6">
                    <div className="max-w-7xl mx-auto">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="min-h-full"
                            >
                                {renderContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;