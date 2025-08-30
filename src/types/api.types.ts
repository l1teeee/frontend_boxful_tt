
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
    fechaNacimiento: string;
    email: string;
    telefono: string;
    password: string;
    confirmPassword: string;
}


export interface LoginCredentials {
    email: string;
    password: string;
}
