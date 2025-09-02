import { useForm } from '@inertiajs/react';
import { useState } from 'react';

import { EnvelopeIcon } from '@heroicons/react/24/outline'; 
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function VerifyEmail({ status, email }: { status?: string, email: string }) {
  const { post } = useForm({ email });
  const [sending, setSending] = useState(false);

  const resend = () => {
    setSending(true);
    post('/email/verification-notification', {
      onSuccess: () => setSending(false),
      onError: () => setSending(false),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-100">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h1 className="text-xl font-bold mb-4 text-black">Verifica tu correo</h1>
         <div className="flex justify-center mb-4">
          <EnvelopeIcon className="w-12 h-12 text-blue-600" />
        </div>
        <p className="mb-4 text-black">
          Te hemos enviado un enlace de verificación a tu correo.
          Si no lo recibiste, da clic abajo.
        </p>
        {status === 'verification-link-sent' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex items-center justify-center space-x-2">
            <CheckCircleIcon className="w-5 h-5 text-green-600" />
            <p className="text-green-700 font-semibold">
              ¡Se envió un nuevo enlace de verificación!
            </p>
          </div>
        )}
        <button
          onClick={resend}
          disabled={sending}
          className={`px-4 py-2 rounded text-white ${sending ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {sending ? 'Enviando...' : 'Reenviar correo'}
        </button>
      </div>
    </div>
  );
}
