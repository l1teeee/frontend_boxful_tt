import React from 'react';
import { FieldValues, Path, FieldErrors, Controller, Control } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface UnifiedDateRangePickerProps<T extends FieldValues> {
    startDateName: Path<T>;
    endDateName: Path<T>;
    label: string;
    startPlaceholder?: string;
    endPlaceholder?: string;
    control: Control<T>;
    startDateRules?: object;
    endDateRules?: object;
    errors?: FieldErrors<T>;
    minDate?: Date;
    maxDate?: Date;
    className?: string;
}

export function UnifiedDateRangePicker<T extends FieldValues>({
                                                                  startDateName,
                                                                  endDateName,
                                                                  label,
                                                                  startPlaceholder = 'Fecha inicio',
                                                                  endPlaceholder = 'Fecha fin',
                                                                  control,
                                                                  startDateRules = {},
                                                                  endDateRules = {},
                                                                  errors,
                                                                  minDate,
                                                                  maxDate = new Date(),
                                                                  className = ''
                                                              }: UnifiedDateRangePickerProps<T>) {
    const startError = errors?.[startDateName];
    const endError = errors?.[endDateName];
    const hasStartError = !!startError;
    const hasEndError = !!endError;

    const getInputClassName = (hasError: boolean) =>
        `p-2 border rounded-lg text-sm bg-white placeholder-gray-400 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 ${
            hasError
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-[#e5562f] focus:ring-[#e5562f]'
        }`;

    return (
        <div className={className}>
            <label className="text-sm text-gray-600 whitespace-nowrap mb-2 block">
                {label}
            </label>

            <div className="flex items-center space-x-2">
                <Controller
                    name={startDateName}
                    control={control}
                    rules={startDateRules}
                    render={({ field: { value, onChange } }) => (
                        <DatePicker
                            selected={value ? new Date(value) : null}
                            onChange={(date: Date | null) => onChange(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText={startPlaceholder}
                            wrapperClassName="w-full"
                            className={getInputClassName(hasStartError)}
                            calendarClassName="rounded-lg shadow-lg border border-gray-200 bg-white"
                            popperClassName="z-50"
                            minDate={minDate}
                            maxDate={maxDate}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                        />
                    )}
                />

                <span className="text-gray-400">-</span>

                <Controller
                    name={endDateName}
                    control={control}
                    rules={endDateRules}
                    render={({ field: { value, onChange } }) => (
                        <DatePicker
                            selected={value ? new Date(value) : null}
                            onChange={(date: Date | null) => onChange(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText={endPlaceholder}
                            wrapperClassName="w-full"
                            className={getInputClassName(hasEndError)}
                            calendarClassName="rounded-lg shadow-lg border border-gray-200 bg-white"
                            popperClassName="z-50"
                            minDate={minDate}
                            maxDate={maxDate}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                        />
                    )}
                />
            </div>

            {(hasStartError || hasEndError) && (
                <div className="mt-1">
                    {hasStartError && (
                        <p className="text-sm text-red-600">
                            {startError?.message as string}
                        </p>
                    )}
                    {hasEndError && (
                        <p className="text-sm text-red-600">
                            {endError?.message as string}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}