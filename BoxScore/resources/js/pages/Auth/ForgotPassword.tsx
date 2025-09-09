import { resetPasswordForm } from "@/types"
import { useForm, usePage } from "@inertiajs/react";
import { FormEvent, useEffect, useState } from "react";
import Header from "@/components/Header";
import ModalPopUp from "@/components/ModalPopUp";


export default function ResetPassword() {
    const { data, setData, post, processing, errors } = useForm<resetPasswordForm>({
        email: '',
    });

    const { props } = usePage<{ flash?: { title?: string; message?: string } }>()
    const[modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (props.flash?.message) {
          setModalOpen(true)
        }
      }, [props.flash])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        post('/sendLinkPassword', {
            onSuccess: () => {
                // Aquí llamas tu modal
                // Por ejemplo, si usas un state para abrirlo:
                setModalOpen(true);
            },
            onError: (errors) => {
                // Aquí puedes manejar errores de validación si quieres
                console.log(errors);
            },
        });
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0F0F0F] via-[#1a1a1a] to-[#0F0F0F] flex flex-col">
            {/* Header arriba */}
            <Header />

            {/* Contenedor centrado */}
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Reestablecer contraseña</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Ingresa tu correo electrónico para recibir el enlace de reestablecimiento
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 transition"
                        >
                            {processing
                                ? "Enviando..."
                                : "Enviar enlace de reestablecimiento"}
                        </button>
                    </form>
                </div>
                {modalOpen && (
                    <ModalPopUp
                              modalType="success"
                              modalTitle={props.flash?.title || 'Éxito'}
                              modalMessage={props.flash?.message || 'Se ha enviado el enlace de recuperación a tu correo'}
                              modalShow={modalOpen}
                              onClose={() => setModalOpen(false)}
                    />
                )}
            </div>
        </div>
    );
}
