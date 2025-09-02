import { useForm, usePage, Link } from '@inertiajs/react';
import { useState, useEffect, FormEvent } from 'react';
import ModalPopUp from '@/components/ModalPopUp';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {

  type LoginForm = {
    email: string;
    password: string;
  };

  const { data, setData, post, processing, errors } = useForm<LoginForm>({
    email: '',
    password: ''
  });

  const { props } = usePage<{ flash?: { title?: string; message?: string } }>();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

 const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post('/user-login'); 
};

  useEffect(() => {
    if (props.flash?.message) {
      setShowSuccess(true);
    }
  }, [props.flash]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black-900 via-black-800 to-black-900 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Iniciar sesión</h1>
          <p className="text-sm text-gray-500 mt-1">
            Bienvenido a BoxScore
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              id='email'
              type='email'
              placeholder='tu@email.com'
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={data.password}
                onChange={e => setData('password', e.target.value)}
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
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={processing}
            className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 transition"
          >
            {processing ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>

        {/* Register */}
        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-blue-600 font-medium hover:underline">
            Regístrate
          </Link>
        </p>
      </div>

      {/* Modal de éxito */}
      {showSuccess && (
        <ModalPopUp
          modalType="success"
          modalTitle={props.flash?.title || 'Éxito'}
          modalMessage={props.flash?.message || 'Verificación exitosa'}
          modalShow={showSuccess}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}
function route(arg0: string): string {
  throw new Error('Function not implemented.');
}

