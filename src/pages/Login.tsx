import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import BoxfulLogoBadge from '@/components/BoxfulLogoBadge';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen flex relative overflow-hidden">

            <div
                aria-hidden
                className="pointer-events-none fixed inset-0 -z-10"
            >
                <div className="absolute inset-0 animate-gradient-shift blur-3xl" />
                <div
                    className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw]
                       animate-gradient-wave blur-2xl rounded-full"
                />
                <div
                    className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw]
                       animate-gradient-shift blur-xl rounded-full"
                    style={{ animationDelay: '4s' }}
                />
            </div>


            {/* Logo  */}
            <div className="absolute top-4 right-4 z-20 group">
                <BoxfulLogoBadge />
            </div>


            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 relative">
                <div className="max-w-md mx-auto w-full relative z-10">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Bienvenido</h1>
                    <p className="text-gray-700 mb-8">Por favor ingresa tus credenciales</p>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Digite su correo"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6139] focus:border-[#ff6139]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Digite su contraseña"
                                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6139] focus:border-[#ff6139]"
                                    required
                                />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2
                                   text-gray-400 hover:text-gray-600 transition-colors
                                   focus:outline-none"
                                    >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="cursor-pointer w-full bg-[#ff6139] hover:bg-[#e5562f] text-white
                           py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg
                           transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                           focus:ring-2 focus:ring-[#ff6139] focus:ring-offset-2"
                        >
                            Iniciar sesión
                        </button>

                        <div className="text-center">
                            <span className="text-gray-700">¿Necesitas una cuenta? </span>
                            <button
                                type="button"
                                className="cursor-pointer text-[#ff6139] hover:text-[#e5562f] font-medium transition-colors duration-200 hover:underline focus:outline-none"
                            >
                                Regístrate aquí
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden m-22 lg:flex lg:w-1/2 bg-white rounded-2xl overflow-hidden relative">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src="src/assets/entrega.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                <div
                    aria-hidden
                    className="absolute inset-0 bg-black/45 pointer-events-none"
                />
            </div>
        </div>
    );
};

export default Login;
