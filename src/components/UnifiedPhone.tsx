import React, { useState } from 'react';
import { UseFormRegister, FieldValues, Path, FieldErrors, Controller, Control } from 'react-hook-form';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDown, Check } from 'lucide-react';

interface CountryOption {
    code: string;
    country: string;
    flag: string;
    format: string;
    placeholder: string;
}

interface UnifiedPhoneInputProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    control: Control<T>;
    register: UseFormRegister<T>;
    rules?: object;
    errors?: FieldErrors<T>;
    onPhoneSubmit?: (countryCode: string, phoneNumber: string, fullNumber: string) => void;
    className?: string;
}

const countryOptions: CountryOption[] = [
    {
        code: '+503',
        country: 'El Salvador',
        flag: '🇸🇻',
        format: '#### ####',
        placeholder: '7777 7777'
    },
    {
        code: '+502',
        country: 'Guatemala',
        flag: '🇬🇹',
        format: '#### ####',
        placeholder: '5555 5555'
    },
    {
        code: '+504',
        country: 'Honduras',
        flag: '🇭🇳',
        format: '#### ####',
        placeholder: '9999 9999'
    }
];

export function UnifiedPhoneInput<T extends FieldValues>({
                                                             name,
                                                             label,
                                                             control,
                                                             register,
                                                             rules = {},
                                                             errors,
                                                             onPhoneSubmit,
                                                             className = ''
                                                         }: UnifiedPhoneInputProps<T>) {
    const [selectedCountry, setSelectedCountry] = useState<CountryOption>(countryOptions[0]);
    const [phoneNumber, setPhoneNumber] = useState('');

    const error = errors?.[name];
    const hasError = !!error;

    const formatPhoneNumber = (value: string, format: string) => {
        const numbers = value.replace(/\D/g, '');
        let formatted = '';
        let numberIndex = 0;

        for (let i = 0; i < format.length && numberIndex < numbers.length; i++) {
            if (format[i] === '#') {
                formatted += numbers[numberIndex];
                numberIndex++;
            } else {
                formatted += format[i];
            }
        }

        return formatted;
    };

    const handlePhoneChange = (value: string) => {
        const formatted = formatPhoneNumber(value, selectedCountry.format);
        setPhoneNumber(formatted);

        if (formatted.replace(/\s/g, '').length >= 8 && onPhoneSubmit) {
            const fullNumber = selectedCountry.code + ' ' + formatted;
            onPhoneSubmit(selectedCountry.code, formatted, fullNumber);
        }
    };

    const handleCountryChange = (country: CountryOption) => {
        setSelectedCountry(country);
        setPhoneNumber('');
    };

    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { onChange } }) => (
                    <div className={`group flex items-stretch rounded-lg border bg-white transition-all duration-200 focus-within:ring-2 ${
                        hasError
                            ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500'
                            : 'border-gray-200 focus-within:border-[#ff6139] focus-within:ring-[#ff6139]'
                    }`}>
                        <div className="relative">
                            <Listbox
                                value={selectedCountry}
                                onChange={handleCountryChange}
                                as="div"                 // ⬅️ Forzamos contenedor real
                                className="relative"     // ⬅️ para posicionar el popup
                            >
                                {({ open }) => (
                                    <div>                  {/* ⬅️ NO usar <>...</> */}
                                        <Listbox.Button className="relative flex items-center gap-2 px-3 py-3 pr-8 text-left text-gray-900 outline-none">
                                            <span className="text-lg">{selectedCountry.flag}</span>
                                            <span className="text-sm font-medium">{selectedCountry.code}</span>
                                            <ChevronDown
                                                className={`absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 transition-transform ${
                                                    open ? 'rotate-180 text-[#ff6139]' : 'text-gray-400'
                                                }`}
                                            />
                                        </Listbox.Button>

                                        {/* ⬇️ Transition con un elemento real, no Fragment */}
                                        <Transition
                                            as="div"
                                            show={open}
                                            enter="transition ease-out duration-150"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Listbox.Options className="absolute z-50 mt-2 w-56 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg focus:outline-none">
                                                {countryOptions.map((option) => (
                                                    <Listbox.Option
                                                        key={option.code}
                                                        value={option}
                                                        className={({ active }) =>
                                                            `px-3 py-3 text-sm cursor-pointer flex items-center justify-between ${
                                                                active ? 'bg-[#ff613920]' : ''
                                                            }`
                                                        }
                                                    >
                                                        {({ selected }) => (
                                                            <div className="flex items-center justify-between w-full">
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-lg">{option.flag}</span>
                                                                    <div className="flex flex-col">
                                                                        <span className="text-gray-900 font-medium">{option.code}</span>
                                                                        <span className="text-xs text-gray-500">{option.country}</span>
                                                                    </div>
                                                                </div>
                                                                {selected && <Check className="h-4 w-4 text-[#ff6139]" />}
                                                            </div>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                )}
                            </Listbox>
                        </div>

                        <span className="w-px bg-gray-200 self-stretch" />

                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                handlePhoneChange(newValue);
                                onChange(selectedCountry.code + ' ' + formatPhoneNumber(newValue, selectedCountry.format));
                            }}
                            placeholder={selectedCountry.placeholder}
                            maxLength={selectedCountry.format.length}
                            className="flex-1 px-3 py-3 bg-transparent placeholder-gray-400 text-gray-900 outline-none"
                        />
                    </div>
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