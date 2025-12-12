import { PricingPlanType } from "@/types"
import HeaderAuth from '@/components/HeaderAuth'
import BackButton from '@/components/BackButton'
import { useForm } from '@inertiajs/react'
import { useState } from 'react'
import {
    EyeIcon,
    EyeSlashIcon,
    CreditCardIcon,
    CalendarIcon,
    LockClosedIcon
} from '@heroicons/react/24/outline'
import ModalPopUp from "@/components/ModalPopUp"

export default function PaymentCompetitionOrganizer({ planData }: { planData: PricingPlanType }) {

    const { data, setData, post } = useForm({
        name: planData.fullname,
        email: planData.email,
        plan: planData.plan,
        cardNumber: '',
        expiry: '',
        cvc: ''
    })

    const amounts = {
        basic: 900,
        pro: 3000,
        elite: 4500
    }

    const amount = amounts[planData.plan as keyof typeof amounts] || 0;

    const [loading, setLoading] = useState(false)
    const [showCVC, setShowCVC] = useState(false)

    const [modal, setModal] = useState({
        show: false,
        type: "error",
        title: "",
        message: ""
    });

    // ---------------------------------------------------
    // 🔥 DETECCIÓN DEL TIPO DE TARJETA
    // ---------------------------------------------------
    const getCardType = (number: string) => {
        number = number.replace(/\s/g, "");

        if (/^4/.test(number)) return "visa";
        if (/^5[1-5]/.test(number)) return "mastercard";
        if (/^3[47]/.test(number)) return "amex";

        return "unknown";
    };

    // ---------------------------------------------------
    // 🔥 VALIDACIÓN LUHN
    // ---------------------------------------------------
    const luhnCheck = (num: string) => {
        let sum = 0;
        let shouldDouble = false;

        for (let i = num.length - 1; i >= 0; i--) {
            let digit = parseInt(num.charAt(i));

            if (shouldDouble) digit = digit * 2 > 9 ? digit * 2 - 9 : digit * 2;

            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0;
    };

    // ---------------------------------------------------
    // 🔥 FORMATEO Y VALIDACIÓN DEL NÚMERO DE TARJETA
    // ---------------------------------------------------
    const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");

        value = value.slice(0, 16);
        value = value.replace(/(.{4})/g, "$1 ").trim();

        setData("cardNumber", value);
    };

    const validateCardNumber = () => {
        const clean = data.cardNumber.replace(/\s/g, "");

        if (clean.length !== 16 || !luhnCheck(clean)) {
            setModal({
                show: true,
                type: "error",
                title: "Tarjeta inválida",
                message: "El número de tarjeta no es válido."
            });
            return false;
        }
        return true;
    };

    // ---------------------------------------------------
    // 🔥 VALIDACIÓN DE EXPIRACIÓN MM/AA
    // ---------------------------------------------------
    const validateExpiry = () => {
        const [mm, yy] = data.expiry.split("/");
        if (!mm || !yy || mm.length !== 2 || yy.length !== 2) {
            setModal({
                show: true,
                type: "error",
                title: "Formato inválido",
                message: "Usa el formato MM/AA."
            });
            return false;
        }

        const month = parseInt(mm);
        const year = parseInt("20" + yy);

        if (month < 1 || month > 12) {
            setModal({
                show: true,
                type: "error",
                title: "Mes inválido",
                message: "Debe estar entre 01 y 12."
            });
            return false;
        }

        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            setModal({
                show: true,
                type: "error",
                title: "Expiración inválida",
                message: "La tarjeta está expirada."
            });
            return false;
        }

        return true;
    };

    // ---------------------------------------------------
    // 🔥 SUBMIT
    // ---------------------------------------------------
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateCardNumber() || !validateExpiry()) return;

        setLoading(true);

        post('/process-payment', {
            onFinish: () => setLoading(false),
            onSuccess: () => alert('Pago realizado con éxito'),
            onError: () => alert('Error al procesar el pago')
        });
    };

    // ---------------------------------------------------
    // 🔥 LOGO DINÁMICO SEGÚN TARJETA
    // ---------------------------------------------------
    const cardType = getCardType(data.cardNumber.replace(/\s/g, ""));
    const renderCardLogo = () => {
        if (cardType === "visa")
            return <img src="/img/settings_img/cards/visa.png" className="h-6 absolute right-2" />;
        if (cardType === "mastercard")
            return <img src="/img/settings_img/cards/mastercard.png" className="h-6 absolute right-2" />;
        if (cardType === "amex")
            return <img src="/img/settings_img/cards/amex.png" className="h-6 absolute right-2" />;

        return null;
    };

    return (
        <div className="min-h-screen flex flex-col">
            <HeaderAuth
                user={planData.fullname}
                avatarUrl={planData.avatarUrl ? `/storage/${planData.avatarUrl}` : undefined}
            />

            <BackButton />

            <div className="flex flex-1 items-center justify-center px-4 py-12">
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#1A1A1A] p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
                >
                    <h2 className="text-2xl font-bold text-white text-center mb-4">
                        Pago del plan {planData.plan.toUpperCase()}
                    </h2>

                    {/* Nombre */}
                    <div>
                        <label className="text-white">Nombre en la tarjeta *</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="w-full p-2 rounded bg-[#2A2A2A] text-white"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-white">Email *</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            className="w-full p-2 rounded bg-[#2A2A2A] text-white"
                            required
                        />
                    </div>

                    {/* Tarjeta */}
                    <div className="relative">
                        <label className="text-white">Número de tarjeta *</label>
                        <div className="flex items-center">
                            <CreditCardIcon className="h-5 w-5 text-gray-400 absolute ml-2" />

                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={19}
                                value={data.cardNumber}
                                onChange={handleCardNumber}
                                onBlur={validateCardNumber}
                                className="w-full p-2 pl-8 rounded bg-[#2A2A2A] text-white"
                                placeholder="1234 5678 9012 3456"
                                required
                            />

                            {renderCardLogo()}
                        </div>
                    </div>

                    {/* Expiración */}
                    <div className="relative">
                        <label className="text-white">Expiración (MM/AA) *</label>
                        <div className="flex items-center">
                            <CalendarIcon className="h-5 w-5 text-gray-400 absolute ml-2" />

                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={5}
                                value={data.expiry}
                                onChange={e => {
                                    let v = e.target.value.replace(/\D/g, "");
                                    if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
                                    setData("expiry", v);
                                }}
                                onBlur={validateExpiry}
                                className="w-full p-2 pl-8 rounded bg-[#2A2A2A] text-white"
                                placeholder="12/25"
                                required
                            />
                        </div>
                    </div>

                    {/* CVC */}
                    <div className="relative">
                        <label className="text-white">CVC *</label>
                        <div className="flex items-center">
                            <LockClosedIcon className="h-5 w-5 text-gray-400 absolute ml-2" />

                            <input
                                type={showCVC ? "text" : "password"}
                                maxLength={3}
                                inputMode="numeric"
                                value={data.cvc}
                                onChange={e => {
                                    const nums = e.target.value.replace(/\D/g, "");
                                    setData("cvc", nums.slice(0, 3));
                                }}
                                className="w-full p-2 pl-8 rounded bg-[#2A2A2A] text-white"
                                placeholder="123"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowCVC(!showCVC)}
                                className="absolute right-2"
                            >
                                {showCVC ? (
                                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Monto */}
                    <div>
                        <label className="text-white">Monto a pagar</label>
                        <input
                            type="text"
                            value={`$${amount.toFixed(2)} MXN`}
                            readOnly
                            className="w-full p-2 rounded bg-[#2A2A2A] text-white opacity-60 cursor-not-allowed"
                        />
                    </div>

                    {/* Botón */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#79BC22] text-black py-3 rounded-lg font-semibold hover:bg-[#A0D23F] transition"
                    >
                        {loading ? "Procesando..." : `Pagar $${amount} MXN`}
                    </button>
                </form>
            </div>

            <ModalPopUp
                modalType={modal.type as any}
                modalTitle={modal.title}
                modalMessage={modal.message}
                modalShow={modal.show}
                onClose={() => setModal({ ...modal, show: false })}
            />
        </div>
    );
}
