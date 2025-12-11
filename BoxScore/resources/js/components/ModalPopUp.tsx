import { useEffect } from "react";
import confetti from "canvas-confetti";
import { CheckIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

type ModalProps = {
  modalType: "success" | "error" | "warning";
  modalTitle?: string;
  modalMessage: string;
  modalShow: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
};

export default function ModalPopUp({
  modalType,
  modalTitle,
  modalMessage,
  modalShow,
  onClose,
  onConfirm,
  confirmText = "Aceptar",
}: ModalProps) {

  const iconMap = {
    success: CheckIcon,
    error: XCircleIcon,
    warning: ExclamationTriangleIcon,
  };

  const colorMap = {
    success: "bg-green-700",
    error: "bg-red-700",
    warning: "bg-yellow-500",
  };

  const defaultTitle = {
    success: "¡Éxito!",
    error: "¡Error!",
    warning: "Advertencia",
  };

  const Icon = iconMap[modalType];
  const bgColor = colorMap[modalType];

  // 🎉 Lanza confeti cuando se muestre un modal de éxito
  useEffect(() => {
    if (modalShow && modalType === "success") {
      const duration = 1600;

      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [modalShow, modalType]);

  if (!modalShow) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 rounded-xl shadow-lg max-w-sm w-full p-6 flex flex-col items-center text-center">
        
        <div className={`${bgColor} rounded-full p-3 mb-4`}>
          <Icon className="h-6 w-6 text-white" />
        </div>

        <h2 className="text-white font-bold text-lg mb-2">
          {modalTitle || defaultTitle[modalType]}
        </h2>

        <p className="text-gray-400 text-sm mb-6 whitespace-pre-line">
          {modalMessage}
        </p>

        <div className="flex gap-2 w-full">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg flex-1"
            onClick={onClose}
          >
            Cerrar
          </button>

          {onConfirm && (
            <button
              className={`${modalType === "error" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"} text-white font-semibold py-2 px-4 rounded-lg flex-1`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
