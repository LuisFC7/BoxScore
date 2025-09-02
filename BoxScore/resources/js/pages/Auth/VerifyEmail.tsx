import { useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }: { status?: string }) {
  const { post } = useForm({});

  const resend = () => {
    post('/email/verification-notification');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h1 className="text-xl font-bold mb-4">Verifica tu correo</h1>
        <p className="mb-4">
          Te hemos enviado un enlace de verificación a tu correo.  
          Si no lo recibiste, da clic abajo.
        </p>
        {status === 'verification-link-sent' && (
          <p className="text-green-600 mb-4">
            ¡Se envió un nuevo enlace de verificación!
          </p>
        )}
        <button
          onClick={resend}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reenviar correo
        </button>
      </div>
    </div>
  );
}
