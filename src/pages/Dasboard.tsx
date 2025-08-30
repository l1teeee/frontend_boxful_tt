import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import CrearOrden from '@/components/Services/CrearOrden';
import Historial from '@/components/Services/Historial';
import { pageTransitions } from '@/animations/pageTransitions';

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'crear' | 'historial'>('crear');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
            />

            <main className="flex-1 overflow-y-auto bg-gray-50 mt-16 md:mt-2">
                <div className="p-6">
                    <div className="max-w-7xl mx-auto">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={activeTab}
                                initial={pageTransitions.initial}
                                animate={pageTransitions.animate}
                                exit={pageTransitions.exit}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="min-h-full overflow-hidden"
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
