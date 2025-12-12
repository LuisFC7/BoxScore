import { usePage, useForm } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import ModalPopUp from '@/components/ModalPopUp'
import HeaderAuth from '@/components/HeaderAuth'
import BackButton from '@/components/BackButton'
import { BaseUser } from '@/types'
import { router } from '@inertiajs/react';

export default function PricingLogin({userData}: {userData:BaseUser}) {
    
    const { props } = usePage<{ flash?: { title?: string; message?: string } }>()
    const [showSuccess, setShowSuccess] = useState(false)


const selectPlan = (plan: string) => {
    
    router.post('/pricing-form', { 
        plan: plan 
    }, {
        preserveState: false,
        preserveScroll: true,
        onFinish: () => {
        }
    });
}


    useEffect(() => {
        if (props.flash?.message) {
            setShowSuccess(true)
        }
    }, [props.flash])

    return (
        <div className="min-h-screen flex flex-col">
            <HeaderAuth
                user={userData.fullname}
                avatarUrl={userData.avatarUrl ? `/storage/${userData.avatarUrl}` : undefined}
            />
            <BackButton />

            {/* MAIN */}
            <main className="flex flex-1 flex-col items-center px-4 md:px-0 py-12">

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
                    Planes Disponibles
                </h1>
                <p className="text-[#CCCCCC] text-base md:text-lg mb-12 text-center max-w-2xl">
                    Elige el plan que mejor se adapte a tu box o competencia.
                </p>

                {/* PRICING GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">

                    {/* FREE PLAN */}
                    <div className="bg-[#1A1A1A] border border-[#79BC22] rounded-xl p-8 shadow-xl hover:shadow-[0_0_25px_rgba(121,188,34,0.3)] transition-all">
                        <h2 className="text-2xl font-bold text-white mb-4">Basic</h2>
                        <p className="text-[#79BC22] text-4xl font-extrabold mb-4">$0</p>
                        <p className="text-[#CCCCCC] mb-6">Perfecto para una competencia sencilla.</p>

                        <ul className="text-[#FFFFFF] space-y-2 mb-6">
                            <li>✔ Accede desde cualquier dispositivo</li>
                            <li>✔ Leaderboard</li>
                            <li>✔ Redes Sociales</li>
                            <li>✔ Registro de atletas ilimitado</li>
                            <li className="line-through opacity-40">Soporte Prioritario</li>
                        </ul>

                        <button
                            onClick={() => selectPlan('basic')}
                            className="w-full bg-[#79BC22] text-[#0F0F0F] py-3 rounded-lg font-semibold hover:bg-[#A0D23F] transition"
                        >
                            Adquirir
                        </button>

                    </div>

                    {/* PRO PLAN */}
                    <div className="bg-[#1A1A1A] border-2 border-[#79BC22] rounded-xl p-8 shadow-2xl scale-105 hover:scale-110 transition-all">
                        <h2 className="text-2xl font-bold text-white mb-4">Pro</h2>
                        <p className="text-[#79BC22] text-4xl font-extrabold mb-4">$349 MXN</p>
                        <p className="text-[#CCCCCC] mb-6">Ideal para competencias medianas.</p>

                        <ul className="text-[#FFFFFF] space-y-2 mb-6">
                            <li>✔ Accede desde cualquier dispositivo</li>
                            <li>✔ Leaderboard</li>
                            <li>✔ Organización de Heats</li>
                            <li>✔ Exportación de Resultados</li>
                            <li>✔ Soporte Básico</li>
                        </ul>

                        <button
                            onClick={() => selectPlan('pro')}
                            className="w-full bg-[#79BC22] text-[#0F0F0F] py-3 rounded-lg font-semibold hover:bg-[#A0D23F] transition"
                        >
                            Adquirir
                        </button>
                    </div>

                    {/* ELITE PLAN */}
                    <div className="bg-[#1A1A1A] border border-[#79BC22] rounded-xl p-8 shadow-xl hover:shadow-[0_0_25px_rgba(121,188,34,0.3)] transition-all">
                        <h2 className="text-2xl font-bold text-white mb-4">Elite</h2>
                        <p className="text-[#79BC22] text-4xl font-extrabold mb-4">$599 MXN</p>
                        <p className="text-[#CCCCCC] mb-6">Para eventos grandes y profesionales.</p>

                        <ul className="text-[#FFFFFF] space-y-2 mb-6">
                            <li>✔ Eventos Ilimitados</li>
                            <li>✔ 500+ Atletas</li>
                            <li>✔ Panel Avanzado</li>
                            <li>✔ Publicación en Tiempo Real</li>
                            <li>✔ Soporte Prioritario 24/7</li>
                        </ul>

                        <button
                            onClick={() => selectPlan('elite')}
                            className="w-full bg-[#79BC22] text-[#0F0F0F] py-3 rounded-lg font-semibold hover:bg-[#A0D23F] transition"
                        >
                            Adquirir
                        </button>
                    </div>

                </div>

            </main>


            {/* MODAL */}
            {showSuccess && (
                <ModalPopUp
                    modalType="success"
                    modalTitle={props.flash?.title || 'Éxito'}
                    modalMessage={props.flash?.message || 'Registro exitoso'}
                    modalShow={showSuccess}
                    onClose={() => setShowSuccess(false)}
                />
            )}
        </div>
    )
}