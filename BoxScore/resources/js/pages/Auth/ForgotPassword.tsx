import { resetPasswordForm } from "@/types"
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import Header from "@/components/Header";


export default function ResetPassword(){

    const { data, setData, post, processing, errors } = useForm<resetPasswordForm>({
        email: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/reset-password'); 
    };

    return(
        <div className="min-h-screen bg-gradient-to-br from-[#0F0F0F] via-[#1a1a1a] to-[#0F0F0F] flex flex-col">
              
        
            <Header />
            <h1>Reestablecer contraseña</h1>
            <p>Ingresa tu correo electrónico para recibir el enlace de reestablecimiento</p>

            <form action="">
                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        name="email"
                        value={data.email}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 transition"
                    >
                    {processing ? 'Enviando...' : 'Enviar enlace de reestablecimiento'}
                </button>
            </form>
        </div>
    )
}