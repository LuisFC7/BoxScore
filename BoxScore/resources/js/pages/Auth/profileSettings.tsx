import { FormEvent, useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import HeaderAuth from "@/components/HeaderAuth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Select from "react-select";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import '../../../css/app.css';
import { profileUserType } from "@/types";


export default function profileSettings({ profile }: { profile: profileUserType }) {

  type UserProfile = {
    fullname: string;
    password: string;
    password_confirmation: string;
    profile_image: File | null;
    phone: string | null;
    birthdate: Date | null;
    country: string | null;
    state: string | null;
    city: string | null;
    emergencyphone: string | null;
  };

  const { data, setData, post, processing, errors } = useForm<profileUserType>({
    email: profile.email,
    fullname: profile.fullname || "",
    password: "",
    password_confirmation: "",
    profile_image: null,
    phone: profile.phone || "",
    birthdate: profile.birthdate ? new Date(profile.birthdate) : null,
    country: profile.country || "",
    state: profile.state || "",
    city: profile.city || "",
    emergencyphone: profile.emergencyphone || "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post('profile-edit');
  }

  const [options, setOptions] = useState(countryList().getData());

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPasswordError, setPasswordEqual] = useState(false);

  // Valida que el input contenga todas las características del password
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

  // 👇 Estado para preview de la imagen
  const [preview, setPreview] = useState<string>("/img/ProfileDefault.png");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData("profile_image", file);
      setPreview(URL.createObjectURL(file)); // Previsualización
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderAuth email={profile.email} />
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Mi perfil</h1>
            <p className="text-sm text-gray-500">Modifica tus datos</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

            {/* Imagen de perfil */}
            <div className="flex flex-col items-center space-y-3">
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border"
              />
              <label
                htmlFor="profileImage"
                className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
              >
                Cambiar foto
              </label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {/* Nombre */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre completo
              </label>
              <input
                id="name"
                type="text"
                placeholder="Nombre completo"
                value={data.fullname}
                onChange={(e) => setData("fullname", e.target.value)}
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
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
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
                  className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md shadow-sm mt-2"
                  role="alert"
                >
                  <p className="font-bold mb-2">Aviso</p>
                  <p className="mb-1">La contraseña debe contener:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>
                      Al menos <strong>12 caracteres</strong>
                    </li>
                    <li>
                      Al menos <strong>una mayúscula</strong>
                    </li>
                    <li>
                      Al menos <strong>una minúscula</strong>
                    </li>
                    <li>
                      Al menos <strong>un dígito</strong>
                    </li>
                    <li>
                      Al menos <strong>un símbolo</strong>
                    </li>
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
                value={data.password_confirmation}
                onChange={(e) => {
                  const value = e.target.value;
                  setData("password_confirmation", value);

                  if (value !== "" && value !== data.password) {
                    setPasswordEqual(true);
                  } else {
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
                <div role="alert" className="mt-3">
                  <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Contraseña inválida
                  </div>
                  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>
                      Las contraseñas no coinciden. Por favor, verifica e inténtalo
                      de nuevo.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="telefono"
                className="block text-sm font-medium text-gray-700"
              >
                Telefono
              </label>
              <PhoneInput
                country={"mx"} // país por defecto
                value={data.phone || ""}
                onChange={(phone) => setData("phone", phone)}
                countryCodeEditable={false}
                inputClass="react-tel-input w-full"
                buttonClass="my-phone-button"
              />
            </div>
            <div>
              <label
                htmlFor="birthday"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha de nacimiento
              </label>
              <input
                id="birthday"
                type="date"
                placeholder=""
                value={data.birthdate ? data.birthdate.toISOString().split("T")[0] : ""}
                onChange={(e) =>
                  setData("birthdate", e.target.value ? new Date(e.target.value) : null)
                }
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700">
                País
              </label>
              <Select
                options={options}
                value={options.find((c) => c.value === data.country)}
                onChange={(val) => setData("country", val?.value || "")}
                styles={{
                  singleValue: (provided) => ({ ...provided, color: "#111827" }), // valor seleccionado
                  option: (provided) => ({ ...provided, color: "#111827" }),       // opciones del menú
                }}
              />
            </div>

            {/* Estado o  Ciudad */}
            <div>
              <label
                htmlFor="estado"
                className="block text-sm font-medium text-gray-700"
              >
                Estado o Ciudad
              </label>
              <input
                id="estado"
                type="text"
                placeholder="Estado o ciudad"
                value={data.city || ""}
                onChange={(e) => setData("city", e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* {Emergency Phone} */}
            <div>
              <label
                htmlFor="telefono"
                className="block text-sm font-medium text-gray-700"
              >
                Concacto de emergencia
              </label>
              <PhoneInput
                country={"mx"} // país por defecto
                value={data.emergencyphone || ""}
                onChange={(phone) => setData("emergencyphone", phone)}
                countryCodeEditable={false}
                inputClass="react-tel-input  w-full"
                buttonClass="my-phone-button"
              />
            </div>
            {/* Botón */}
            <button
              type="submit"
              disabled={processing}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 transition shadow-md disabled:opacity-50"
            >
              Actualizar perfil
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
