import React, { useEffect } from 'react';
import { Control, FieldErrors, UseFormRegister, UseFormSetValue, useWatch } from 'react-hook-form';
import { motion } from 'framer-motion';
import { UnifiedInput } from '@/components/UnifiedInput';
import { UnifiedDatePicker } from '@/components/UnifiedDatePicker';
import { UnifiedPhoneInput } from '@/components/UnifiedPhone';
import { UnifiedSelect } from '@/components/UnifiedSelect';
import { departamentosMunicipios } from '@/data/departamentosMunicipio';
import { validationRules } from '@/utils/validate/validationRules';
import type { CreateOrderRequest } from '@/types/api.order';

interface Step1Props {
    register: UseFormRegister<CreateOrderRequest>;
    control: Control<CreateOrderRequest>;
    errors: FieldErrors<CreateOrderRequest>;
    setValue: UseFormSetValue<CreateOrderRequest>;
    onNext: () => void;
}

const stepTransitions = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
};

const Step1: React.FC<Step1Props> = ({register, control, errors, setValue, onNext}) => {
    const departamentos = Object.keys(departamentosMunicipios);

    const selectedDepartment = useWatch({
        control,
        name: 'department'
    });

    const availableMunicipios = selectedDepartment
        ? departamentosMunicipios[selectedDepartment as keyof typeof departamentosMunicipios] || []
        : [];

    useEffect(() => {
        if (selectedDepartment) {
            setValue('municipality', '');
            if (selectedDepartment === 'San Salvador') {
                setValue('municipality', 'Soyapango');
            }
        }
    }, [selectedDepartment, setValue]);

    useEffect(() => {
        setValue('department', 'San Salvador');
        setValue('municipality', 'Soyapango');
    }, [setValue]);

    return (
        <motion.div
            initial={stepTransitions.initial}
            animate={stepTransitions.animate}
            exit={stepTransitions.exit}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-white rounded-lg shadow-sm p-6"
        >
            <h2 className="text-xl font-semibold text-black mb-6">Completa los datos</h2>

            <form className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <UnifiedInput
                    name="pickupAddress"
                    label="Dirección de recolección"
                    placeholder="Descripción Magnética, colonia 1, San Salvador"
                    register={register}
                    rules={validationRules.required('La dirección de recolección es requerida')}
                    errors={errors}
                />

                <UnifiedDatePicker
                    name="estimatedDate"
                    label="Fecha programada"
                    placeholder="Selecciona una fecha estimada"
                    control={control}
                    rules={validationRules.required('La fecha estimada es requerida')}
                    errors={errors}
                    variant="future"
                />

                <UnifiedInput
                    name="firstName"
                    label="Nombres"
                    placeholder="Gabriela Romeo"
                    register={register}
                    rules={{
                        ...validationRules.required('El nombre es requerido'),
                        ...validationRules.name('nombre')
                    }}
                    errors={errors}
                />

                <UnifiedInput
                    name="lastName"
                    label="Apellidos"
                    placeholder="Díaz López"
                    register={register}
                    rules={{
                        ...validationRules.required('El apellido es requerido'),
                        ...validationRules.name('apellido')
                    }}
                    errors={errors}
                />

                <UnifiedInput
                    name="email"
                    label="Correo electrónico"
                    placeholder="gabydasu@gmail.com"
                    type="email"
                    register={register}
                    rules={{
                        ...validationRules.required('El correo electrónico es requerido'),
                        ...validationRules.email()
                    }}
                    errors={errors}
                />

                <UnifiedPhoneInput
                    name="phone"
                    label="Teléfono"
                    control={control}
                    register={register}
                    rules={{
                        ...validationRules.required('El número de teléfono es requerido'),
                        ...validationRules.phone()
                    }}
                    errors={errors}
                />

                <UnifiedInput
                    name="destinationAddress"
                    label="Dirección del destinatario"
                    placeholder="Final 49 Av. Sur y Bulevar Los Próceres, Soyapango, Bodega 888, San Salvador"
                    register={register}
                    rules={validationRules.required('La dirección del destinatario es requerida')}
                    errors={errors}
                    className="lg:col-span-2"
                />

                <UnifiedSelect
                    name="department"
                    label="Departamento"
                    placeholder="San Salvador"
                    options={departamentos}
                    control={control}
                    rules={validationRules.required('El departamento es requerido')}
                    errors={errors}
                />

                <UnifiedSelect
                    name="municipality"
                    label="Municipio"
                    placeholder="Seleccionar municipio"
                    options={availableMunicipios}
                    control={control}
                    rules={validationRules.required('El municipio es requerido')}
                    errors={errors}
                />

                <UnifiedInput
                    name="referencePoint"
                    label="Punto de referencia"
                    placeholder="Cerca de restaurante Árbol de La Paz"
                    register={register}
                    rules={validationRules.required('El punto de referencia es requerido')}
                    errors={errors}
                    className="lg:col-span-2"
                />

                <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-black mb-2">
                        Indicaciones
                    </label>
                    <textarea
                        {...register('information', validationRules.required('Las indicaciones son requeridas'))}
                        placeholder="Llamar antes de entregar"
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e5562f] focus:border-transparent focus:outline-none"
                    />
                    {errors.information && (
                        <p className="mt-1 text-sm text-red-600">{errors.information.message}</p>
                    )}
                </div>
            </form>

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    onClick={onNext}
                    className="bg-[#e5562f] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#d4502a] transition-colors"
                >
                    Siguiente →
                </button>
            </div>
        </motion.div>
    );
};

export default Step1;