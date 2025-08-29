export const validationRules = {
    required: (message = 'Este campo es requerido') => ({
        required: { value: true, message }
    }),

    minLength: (length: number, message?: string) => ({
        minLength: {
            value: length,
            message: message || `Debe tener al menos ${length} caracteres`
        }
    }),

    maxLength: (length: number, message?: string) => ({
        maxLength: {
            value: length,
            message: message || `No puede tener más de ${length} caracteres`
        }
    }),

    email: (message = 'Ingresa un correo electrónico válido') => ({
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message
        }
    }),

    phone: (message = 'Ingresa un número de teléfono válido') => ({
        pattern: {
            value: /^(\+503|\+504|\+502)\s7\d{3}\s?\d{4}$/,
            message,
        },
        minLength: {
            value: 12,
            message: 'El teléfono debe tener al menos 8 dígitos con código',
        },
    }),

    password: (message = 'La contraseña debe tener al menos 8 caracteres') => ({
        minLength: {
            value: 8,
            message
        }
    }),

    loginPassword: (message = 'La contraseña es requerida') => ({
        required: { value: true, message }
    }),

    confirmPassword: (watchPassword: string) => ({
        validate: (value: string) => {
            return value === watchPassword || 'Las contraseñas no coinciden';
        }
    }),

    name: (fieldName = 'campo') => ({
        minLength: {
            value: 2,
            message: `El ${fieldName} debe tener al menos 2 caracteres`
        },
        pattern: {
            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            message: `El ${fieldName} solo puede contener letras`
        }
    }),

    birthDate: (message = 'Debes seleccionar una fecha de nacimiento válida') => ({
        required: { value: true, message },
        validate: (value: Date | null) => {
            if (!value) return 'Debes seleccionar una fecha de nacimiento';

            const today = new Date();
            const birthDate = new Date(value);
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (age < 13 || (age === 13 && monthDiff < 0)) {
                return 'Debes ser mayor de 13 años';
            }

            if (age > 120) {
                return 'Fecha de nacimiento no válida';
            }

            if (birthDate > today) {
                return 'La fecha de nacimiento no puede ser futura';
            }

            return true;
        }
    }),


    dateRange: {
        startDate: (message = 'La fecha de inicio es requerida') => ({
            required: { value: true, message },
            validate: (value: Date | null) => {
                if (!value) return 'Debes seleccionar una fecha de inicio';
                if (value > new Date()) return 'La fecha de inicio no puede ser futura';
                return true;
            }
        }),

        endDate: (startDate: Date | null, message = 'La fecha de fin es requerida') => ({
            required: { value: true, message },
            validate: (value: Date | null) => {
                if (!value) return 'Debes seleccionar una fecha de fin';
                if (value > new Date()) return 'La fecha de fin no puede ser futura';
                if (startDate && value < startDate) return 'La fecha de fin debe ser posterior a la fecha de inicio';
                return true;
            }
        })
    }
};