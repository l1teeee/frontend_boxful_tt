
export interface ApiResponse<T = never> {
    success: boolean;
    data?: T;
    error?: ApiError;
}

export interface ApiError {
    message: string;
    error?: string;
    statusCode?: number;
}

export interface AuthResponse {
    message: string;
    user: User;
    token: string;
}

export interface User {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    sexo: string;
    fechaNacimiento: string;
    telefono: string;
}


export interface RegisterRequest {
    nombre: string;
    apellido: string;
    sexo: string;
    fechaNacimiento: string; // YYYY-MM-DD format
    email: string;
    telefono: string;
    password: string;
    confirmPassword: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

// Tipos adicionales para el frontend
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface UserData {
    firstName: string;
    lastName: string;
    sex: string;
    birthDate: Date;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}