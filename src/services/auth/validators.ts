
export class AuthValidators {
    private static readonly PHONE_REGEX = /^(\+503|\+504|\+502)\s7\d{3}\s\d{4}$/;

    /**
     * Validar formato de teléfono centroamericano
     */
    static validatePhoneNumber(phone: string): boolean {
        return this.PHONE_REGEX.test(phone.trim());
    }

    /**
     * Validar que las contraseñas coincidan
     */
    static validatePasswordMatch(password: string, confirmPassword: string): boolean {
        return password === confirmPassword;
    }

    /**
     * Validar datos de registro completos
     */
    static validateRegistrationData(userData: {
        phone: string;
        password: string;
        confirmPassword: string;
    }): string | null {
        if (!this.validatePhoneNumber(userData.phone)) {
            return 'El número de teléfono no tiene un formato válido';
        }

        if (!this.validatePasswordMatch(userData.password, userData.confirmPassword)) {
            return 'Las contraseñas no coinciden';
        }

        return null;
    }
}