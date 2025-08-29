import React, { Fragment } from 'react';
import { FieldValues, Path, FieldErrors, Controller, Control } from 'react-hook-form';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDown, Check } from 'lucide-react';

interface UnifiedSelectProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    placeholder?: string;
    options: string[];
    control: Control<T>;
    rules?: object;
    errors?: FieldErrors<T>;
    className?: string;
}

export function UnifiedSelect<T extends FieldValues>({
                                                         name,
                                                         label,
                                                         placeholder = 'Seleccionar',
                                                         options,
                                                         control,
                                                         rules = {},
                                                         errors,
                                                         className = ''
                                                     }: UnifiedSelectProps<T>) {
    const error = errors?.[name];
    const hasError = !!error;

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
                    <Listbox value={value || ''} onChange={onChange}>
                        {({ open }) => (
                            <div className="relative z-50">
                                <Listbox.Button
                                    className={`w-full px-4 py-3 rounded-lg border bg-white text-left text-gray-900 transition-all focus:outline-none focus:ring-2 ${
                                        hasError
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                            : open
                                                ? 'border-[#ff6139] ring-[#ff6139]'
                                                : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <span className={`${!value ? 'text-gray-400' : ''}`}>
                                        {value || placeholder}
                                    </span>
                                    <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-transform ${open ? 'rotate-180 text-[#ff6139]' : 'text-gray-400'}`} />
                                </Listbox.Button>

                                <Transition
                                    as={Fragment}
                                    show={open}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-1"
                                >
                                    <Listbox.Options className="absolute z-[9999] mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg focus:outline-none">
                                        {options.map((option) => (
                                            <Listbox.Option
                                                key={option}
                                                value={option}
                                                className={({ active }) =>
                                                    `px-3 py-2 text-sm cursor-pointer flex items-center justify-between ${active ? 'bg-[#ff613920]' : ''}`
                                                }
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span className="text-gray-900">{option}</span>
                                                        {selected && <Check className="h-4 w-4 text-[#ff6139]" />}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        )}
                    </Listbox>
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