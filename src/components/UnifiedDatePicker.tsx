import React from 'react';
import { FieldValues, Path, FieldErrors, Controller, Control } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface UnifiedDatePickerProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    placeholder?: string;
    control: Control<T>;
    rules?: object;
    errors?: FieldErrors<T>;
    minYear?: number;
    maxYear?: number;
    maxDate?: Date;
    className?: string;
}

export function UnifiedDatePicker<T extends FieldValues>({
                                                             name,
                                                             label,
                                                             placeholder = 'Seleccionar fecha',
                                                             control,
                                                             rules = {},
                                                             errors,
                                                             minYear = 1940,
                                                             maxYear = new Date().getFullYear(),
                                                             maxDate = new Date(),
                                                             className = ''
                                                         }: UnifiedDatePickerProps<T>) {
    const error = errors?.[name];
    const hasError = !!error;

    const inputClassName = `w-full px-4 py-3 border rounded-lg bg-white placeholder-gray-400 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 ${
        hasError
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-200 focus:border-[#ff6139] focus:ring-[#ff6139]'
    }`;

    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { value, onChange } }) => (
                    <DatePicker
                        selected={value ? new Date(value) : null}
                        onChange={(date: Date | null) => onChange(date)}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={maxYear - minYear + 1}
                        placeholderText={placeholder}
                        wrapperClassName="w-full"
                        className={inputClassName}
                        calendarClassName="rounded-lg shadow-lg border border-gray-200 bg-white"
                        popperClassName="z-50"
                        maxDate={maxDate}
                        showMonthDropdown
                        dropdownMode="select"
                    />
                )}
            />

            {hasError && (
                <p className="mt-1 text-sm text-red-600">
                    {error?.message as string}
                </p>
            )}
        </div>
    );
}