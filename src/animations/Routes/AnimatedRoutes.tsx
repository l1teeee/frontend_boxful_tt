import React from 'react';
import { Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { pageTransitions } from '@/animations/pageTransitions';

interface AnimatedRoutesProps {
    children: React.ReactNode;
}

export const AnimatedRoutes: React.FC<AnimatedRoutesProps> = ({ children }) => {
    const location = useLocation();
    const routeKey = location.pathname + location.search + location.hash;

    return (
        <AnimatePresence mode="wait" initial={true}>
            <motion.div
                key={routeKey}
                initial={pageTransitions.initial}
                animate={pageTransitions.animate}
                exit={pageTransitions.exit}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="min-h-screen overflow-hidden"
            >
                <Routes location={location} key={routeKey}>
                    {children}
                </Routes>
            </motion.div>
        </AnimatePresence>
    );
};
