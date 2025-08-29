import type { RegisterRequest } from '@/types/api.types';

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

export class AuthTransformers {
    /**
     * Transformar datos del frontend al formato del backend para registro
     */
    static transformUserData(userData: UserData): RegisterRequest {
        return {
            nombre: userData.firstName,
            apellido: userData.lastName,
            sexo: userData.sex,
            fechaNacimiento: userData.birthDate.toISOString().split('T')[0],
            email: userData.email,
            telefono: userData.phone,
            password: userData.password,
            confirmPassword: userData.confirmPassword,
        };
    }

    /**
     * Formatear fecha para la API
     */
    static formatDateForAPI(date: Date): string {
        return date.toISOString().split('T')[0];
    }
}