import React from 'react';
import { Route } from 'react-router-dom';
import { AnimatedRoutes } from '@/animations/Routes/AnimatedRoutes';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Register from '@/pages/Register';
import Dasboard from "@/pages/Dasboard";

export const RouterProvider: React.FC = () => {
    return (
        <LanguageProvider>
            <AnimatedRoutes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dasboard />} />
                <Route path="*" element={<NotFound />} />
            </AnimatedRoutes>
        </LanguageProvider>
    );
};