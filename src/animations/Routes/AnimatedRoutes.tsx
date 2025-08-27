import React from 'react';
import { Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { pageTransitions } from '@/animations/pageTransitions';

interface AnimatedRoutesProps {
    children: React.ReactNode;
}

export const AnimatedRoutes: React.FC<AnimatedRoutesProps> = ({ children }) => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={location.pathname}
                initial={pageTransitions.initial}
                animate={pageTransitions.animate}
                exit={pageTransitions.exit}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="min-h-screen overflow-hidden"
            >
                <Routes location={location}>
                    {children}
                </Routes>
            </motion.div>
        </AnimatePresence>
    );
};