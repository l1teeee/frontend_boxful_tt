import React from 'react';
import { Route } from 'react-router-dom';
import { AnimatedRoutes } from '@/animations/Routes/AnimatedRoutes';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Register from '@/pages/Register'

export const RouterProvider: React.FC = () => {
    return (
        <AnimatedRoutes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
        </AnimatedRoutes>
    );
};