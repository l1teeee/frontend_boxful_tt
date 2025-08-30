import React from 'react';
import { UseFormRegister, FieldValues, Path, FieldErrors } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

interface UnifiedInputProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'tel';
    register: UseFormRegister<T>;
    rules?: object;
    errors?: FieldErrors<T>;
    showPasswordToggle?: boolean;
    className?: string;
}

export function UnifiedInput<T extends FieldValues>({name, label, placeholder, type = 'text', register, rules = {}, errors, showPasswordToggle = false, className = ''}: UnifiedInputProps<T>) {
    const [showPassword, setShowPassword] = React.useState(false);

    const error = errors?.[name];
    const hasError = !!error;

    const inputType = type === 'password' && showPassword ? 'text' : type;

    const baseClassName = `w-full px-4 py-3 border rounded-lg bg-white placeholder-gray-400 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 ${
        hasError
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-200 focus:border-[#ff6139] focus:ring-[#ff6139]'
    }`;

    const finalClassName = showPasswordToggle ? `${baseClassName} pr-10` : baseClassName;

    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            <div className="relative">
                <input
                    type={inputType}
                    placeholder={placeholder}
                    className={finalClassName}
                    {...register(name, rules)}
                />

                {showPasswordToggle && type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                )}
            </div>

            {hasError && (
                <p className="mt-1 text-sm text-red-600">
                    {error?.message as string}
                </p>
            )}
        </div>
    );
}