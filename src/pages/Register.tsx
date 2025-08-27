import React, { useState, Fragment } from 'react';
import { Eye, EyeOff, ChevronLeft, Calendar, Check, ChevronDown } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { Listbox, Transition } from '@headlessui/react';
import 'react-day-picker/dist/style.css';
import { useNavigate } from 'react-router-dom';
import BoxfulLogoBadge from "@/components/BoxfulLogoBadge";

const sexOptions = ['Femenino', 'Masculino', 'Otro'];
const codeOptions = ['+503', '+502', '+504'];

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [birthDate, setBirthDate] = useState('');
    const [selected, setSelected] = useState<never>();
    const [showCalendar, setShowCalendar] = useState(false);

    const [sex, setSex] = useState<string | null>(null);
    const [code, setCode] = useState<string>(codeOptions[0]);

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen flex relative overflow-hidden">
            <div className="absolute ml-4 top-4 left z-20 group">
                <BoxfulLogoBadge />
            </div>
            {/* Fondo animado existente */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#ff613915] via-[#ff8a6520] to-[#ffab9110] animate-gradient-shift filter blur-3xl" />
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-[#ff704320] via-[#ff613925] to-transparent animate-gradient-wave filter blur-2xl" />
            <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-[#ffab9115] via-[#ff8a6530] to-transparent animate-gradient-shift filter blur-xl" style={{ animationDelay: '4s' }} />

            {/* Video izquierda */}
            <div className="hidden m-22 lg:flex lg:w-1/2 bg-white rounded-2xl overflow-hidden relative">
                <video className="absolute inset-0 w-full h-full object-cover" src="src/assets/register.mp4" autoPlay muted loop playsInline />
                <div aria-hidden className="absolute inset-0 bg-black/45 pointer-events-none" />
            </div>

            {/* Formulario derecha */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 relative">
                <div className="max-w-xl mx-auto w-full relative z-10">
                    <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                        <span>Volver</span>
                    </button>

                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Cuéntanos de ti</h1>
                    <p className="text-gray-600 mb-8">Completa la información de registro</p>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                                <input className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white placeholder-gray-400 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6139] focus:border-[#ff6139]" placeholder="Digita tu nombre" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                                <input className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white placeholder-gray-400 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6139] focus:border-[#ff6139]" placeholder="Digita tu apellido" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Dropdown suave (Headless UI): Sexo */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sexo</label>
                                <Listbox value={sex} onChange={setSex}>
                                    {({ open }) => (
                                        <div className="relative">
                                            <Listbox.Button
                                                className={`w-full px-4 py-3 rounded-lg border bg-white text-left text-gray-900 transition-all focus:outline-none
                                      ${open ? 'border-[#ff6139] ring-2 ring-[#ff6139]/50' : 'border-gray-200 hover:border-gray-300'}`}
                                            >
                                                <span className={`${!sex ? 'text-gray-400' : ''}`}>{sex ?? 'Seleccionar'}</span>
                                                <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-transform ${open ? 'rotate-180 text-[#ff6139]' : 'text-gray-400'}`} />
                                            </Listbox.Button>
                                            <Transition
                                                as={Fragment}
                                                show={open}
                                                enter="transition ease-out duration-150"
                                                enterFrom="opacity-0 scale-95"
                                                enterTo="opacity-100 scale-100"
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100 scale-100"
                                                leaveTo="opacity-0 scale-95"
                                            >
                                                <Listbox.Options className="absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg focus:outline-none">
                                                    {sexOptions.map((opt) => (
                                                        <Listbox.Option
                                                            key={opt}
                                                            value={opt}
                                                            className={({ active }) =>
                                                                `px-3 py-2 text-sm cursor-pointer flex items-center justify-between ${active ? 'bg-[#ff613920]' : ''}`
                                                            }
                                                        >
                                                            {({ selected }) => (
                                                                <>
                                                                    <span className="text-gray-900">{opt}</span>
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
                            </div>

                            {/* Fecha */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de nacimiento</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={birthDate}
                                        onClick={() => setShowCalendar(!showCalendar)}
                                        readOnly
                                        className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg bg-white text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6139] focus:border-[#ff6139] cursor-pointer"
                                        placeholder="Seleccionar fecha"
                                    />
                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                                {showCalendar && (
                                    <div className="absolute z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                                        <DayPicker
                                            mode="single"
                                            selected={selected}
                                            onSelect={(date) => {
                                                // @ts-ignore
                                                setSelected(date);
                                                if (date) {
                                                    setBirthDate(date.toLocaleDateString('es-ES'));
                                                    setShowCalendar(false);
                                                }
                                            }}
                                            toDate={new Date()}
                                            fromYear={1940}
                                            toYear={new Date().getFullYear()}
                                            className="p-3"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
                                <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white placeholder-gray-400 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6139] focus:border-[#ff6139]" placeholder="Digitar correo" />
                            </div>

                            {/* Dropdown suave: código país focus:ring-[#ff6139] focus:border-[#ff6139] */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Número de WhatsApp</label>

                                <div className="relative">
                                    <div className="group flex items-stretch rounded-lg border border-gray-200 bg-white focus-within:border-[#ff6139] focus-within:ring-2 focus-within:ring-[#ff6139]">
                                        {/* Prefijo (Listbox) */}
                                        <div className="relative">
                                            <Listbox value={code} onChange={setCode}>
                                                {({ open }) => (
                                                    <>
                                                        <Listbox.Button
                                                            className={`px-3 py-3 pr-8 min-w-[96px] text-left text-gray-900 outline-none
                            flex items-center gap-1 ${open ? 'text-[#ff6139]' : ''}`}
                                                        >
                                                            {code}
                                                            <ChevronDown
                                                                className={`absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 transition-transform
                              ${open ? 'rotate-180 text-[#ff6139]' : 'text-gray-400'}`}
                                                            />
                                                        </Listbox.Button>

                                                        <Transition
                                                            as={Fragment}
                                                            show={open}
                                                            enter="transition ease-out duration-150"
                                                            enterFrom="opacity-0 scale-95"
                                                            enterTo="opacity-100 scale-100"
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100 scale-100"
                                                            leaveTo="opacity-0 scale-95"
                                                        >
                                                            <Listbox.Options className="absolute z-50 mt-2 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg focus:outline-none">
                                                                {codeOptions.map((opt) => (
                                                                    <Listbox.Option
                                                                        key={opt}
                                                                        value={opt}
                                                                        className={({ active }) =>
                                                                            `px-3 py-2 text-sm cursor-pointer flex items-center justify-between
                         ${active ? 'bg-[#ff613920]' : ''}`
                                                                        }
                                                                    >
                                                                        {({ selected }) => (
                                                                            <>
                                                                                <span className="text-gray-900">{opt}</span>
                                                                                {selected && <Check className="h-4 w-4 text-[#ff6139]" />}
                                                                            </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                ))}
                                                            </Listbox.Options>
                                                        </Transition>
                                                    </>
                                                )}
                                            </Listbox>
                                        </div>

                                        {/* Separador */}
                                        <span className="w-px bg-gray-200 self-stretch" />

                                        {/* Input número */}
                                        <input
                                            className="flex-1 px-3 py-3 bg-transparent placeholder-gray-400 text-gray-900 outline-none"
                                            placeholder="7777 7777"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg bg-white placeholder-gray-400 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6139] focus:border-[#ff6139]"
                                        placeholder="Digitar contraseña"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Repetir contraseña</label>
                                <div className="relative">
                                    <input
                                        type={showPassword2 ? 'text' : 'password'}
                                        className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg bg-white placeholder-gray-400 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6139] focus:border-[#ff6139]"
                                        placeholder="Digitar contraseña"
                                    />
                                    <button type="button" onClick={() => setShowPassword2(!showPassword2)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
                                        {showPassword2 ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-[#ff6139] hover:bg-[#e5562f] text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#ff6139] focus:ring-offset-2">
                            Registrarse
                        </button>
                        <div className="text-center">
                            <span className="text-gray-700">¿Ya tienes una cuenta? </span>
                            <button
                                type="button"
                                onClick={handleLoginClick}
                                className="cursor-pointer text-[#ff6139] hover:text-[#e5562f] font-medium transition-colors duration-200 hover:underline focus:outline-none"
                            >
                                Inicia sesión aquí
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
