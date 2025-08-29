import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AnimatedRoutes } from '@/animations/Routes/AnimatedRoutes';
import { LanguageProvider } from '@/contexts/LanguageContext';
import AuthService from '@/services/auth/authService';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Register from '@/pages/Register';
import Dashboard from "@/pages/Dasboard";
import Unauthorized from '@/pages/Unauthorized';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isAuthenticated = AuthService.isAuthenticated();

    if (!isAuthenticated) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isAuthenticated = AuthService.isAuthenticated();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

export const RouterProvider: React.FC = () => {
    return (
        <LanguageProvider>
            <AnimatedRoutes>
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route path="/unauthorized" element={<Unauthorized />} />

                <Route path="*" element={<NotFound />} />
            </AnimatedRoutes>
        </LanguageProvider>
    );
};