import { useForm } from '@inertiajs/react';
import { FormEvent, useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import ModalPopUp from '@/components/ModalPopUp';

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
        post('user-store');
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [showPasswordError, setPasswordEqual] = useState(false);

    //Para Modal de errores
    const [modalShow, setModalShow] = useState(false);

    //Valida que el input contenga todas las caracteristicas del password
    const validatePassword = (password: string) => {
        const minLength = password.length >= 12;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[^A-Za-z0-9]/.test(password);

        return minLength && hasUpper && hasLower && hasNumber && hasSymbol;
    };

    const [isPasswordValid, setIsPasswordValid] = useState(false);

    useEffect(() => {
    setIsPasswordValid(validatePassword(data.password));
    }, [data.password]);


    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
        setModalShow(true);
        }
    }, [errors]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black-900 via-black-800 to-black-900 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Crea tu cuenta</h1>
                    <p className="text-sm text-gray-500">Únete a la comunidad BoxScore y compite en eventos</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Nombre */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre completo</label>
                        <input
                            id="name"
                            type="text"
                            value = {data.name}
                            onChange={e => setData('name', e.target.value)}
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
                            value = {data.email}
                            onChange={e => setData('email', e.target.value)}
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
                            value = {data.password}
                            onChange={e => setData('password', e.target.value)}
                            onFocus={()=> setIsPasswordFocused(true)}
                            onBlur={()=> setIsPasswordFocused(false)}
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
                        {isPasswordFocused && !isPasswordValid && (
                            <div 
                                className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md shadow-sm" 
                                role="alert"
                            >
                                <p className="font-bold mb-2">Aviso</p>
                                <p className="mb-1">La contraseña debe contener:</p>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Al menos <strong>12 caracteres</strong></li>
                                <li>Al menos <strong>una mayúscula</strong></li>
                                <li>Al menos <strong>una minúscula</strong></li>
                                <li>Al menos <strong>un dígito</strong></li>
                                <li>Al menos <strong>un símbolo</strong></li>
                                </ul>
                            </div>
                        )}


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
                            value = {data.password_confirmation}
                            onChange={e =>{
                                const value = e.target.value; 
                                setData('password_confirmation', value)

                                if(value !== "" && value !== data.password){
                                    setPasswordEqual(true);
                                }else{
                                    setPasswordEqual(false);
                                }
                            
                            }}
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

                        {showPasswordError && (
                            <div role="alert" className="mb-4">
                                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                Contraseña inválida
                                </div>
                                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                <p>Las contraseñas no coinciden. Por favor, verifica e inténtalo de nuevo.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Botón */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 transition shadow-md disabled:opacity-50"
                    >
                        Registrarme
                    </button>

                    {/* Modal de errores */}
                    {modalShow && (
                        <ModalPopUp
                        modalType="error"
                        modalTitle='Ha ocurrido un error'
                        modalMessage={"Error:\n" + Object.values(errors).join("\n")}
                        modalShow={modalShow}
                        onClose={() => setModalShow(false)} 
                        />
                    )}

                </form>
            </div>
        </div>
    );
}