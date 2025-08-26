import { useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Register() {

    type UserForm = {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    };

    const {data, setData, post, processing, errors} = useForm<UserForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const handleSubmit = (e: FormEvent) =>{
        e.preventDefault();
        post('createUser');
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [showPasswordError, setPasswordConfirm] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Crea tu cuenta</h1>
                    <p className="text-sm text-gray-500">Únete a la comunidad BoxScore y compite en eventos</p>
                </div>

                {/* Form */}
                <form className="space-y-5">
                    {/* Nombre */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre completo</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Ej. User Name"
                            className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="usuario@correo.com"
                            className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 pr-10 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                            />
                            <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                            >
                            {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                            </button>
                        </div>
                        </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label
                        htmlFor="password_confirmation"
                        className="block text-sm font-medium text-gray-700"
                        >
                        Confirmar contraseña
                        </label>
                        <input
                        id="password_confirmation"
                        type={showConfirm ? "text" : "password"}
                        placeholder="********"
                        className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 pr-10 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                        />
                        <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                        >
                        {showConfirm ? (
                            <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                            <EyeIcon className="h-5 w-5" />
                        )}
                        </button>
                    </div>

                    {/* Botón */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 transition shadow-md disabled:opacity-50"
                    >
                        Registrarme
                    </button>
                </form>
            </div>
        </div>
    );
}
