import { useState } from "react";
import { CheckIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

type ModalProps = {
    modalType: "success" | "error" | "warning";
    modalTitle?: string;
    modalMessage:string;
    modalShow : boolean;
    onClose: () => void;
}

export default function ModalPopUp({modalType, modalTitle, modalMessage, modalShow, onClose}:ModalProps){

    
    const iconMap = {
        success:CheckIcon,
        error: XCircleIcon,
        warning: ExclamationTriangleIcon,
    };

    const colorMap= {
        success: "bg-green-700",
        error: "bg-red-700",
        warning: "bg-yellow-500",
    }

    const defaultTitle = {
        success: "¡Éxito!",
        error: "¡Error!",
        warning: "Advertencia",
    };

    const Icon = iconMap[modalType];
    const bgColor = colorMap[modalType];

    if (!modalShow) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-800 rounded-xl shadow-lg max-w-sm w-full p-6 flex flex-col items-center text-center">
                
                {/* Icono */}
                <div className={`${bgColor} rounded-full p-3 mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Título */}
                <h2 className="text-white font-bold text-lg mb-2">
                {modalTitle || defaultTitle[modalType]}
                </h2>
                {/* Mensaje */}
                <p className="text-gray-400 text-sm mb-6">{modalMessage}</p>

                {/* Botón */}
                <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg w-full"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}