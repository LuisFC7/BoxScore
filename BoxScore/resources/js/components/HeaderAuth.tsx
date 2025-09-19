import { useForm } from "@inertiajs/react";
import React, { FormEvent, useState } from "react";

type HeaderProps = {
  user: string;
  avatarUrl?: string; 
};

export default function HeaderAuth({ user, avatarUrl }: HeaderProps) {

  const { post } = useForm({});
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post('/logout');
  }
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
            <div className="flex-shrink-0">
                <img
                src="/img/miniLogo.png"
                alt="Logo de MiFitnessApp"
                className="h-12 w-auto" // 👈 ajusta el alto, el ancho se calcula solo
                />
            </div>

          {/* Avatar con menú */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center focus:outline-none"
            >
              <img
                src={avatarUrl || `https://ui-avatars.com/api/?name=${user}&background=random`}
                alt="avatar"
                className="w-10 h-10 rounded-full border-2 border-green-500"
              />
            </button>

            {/* Dropdown */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2">
                <a
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Ajustes
                </a>

                <a
                  href="/bench-movements"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Benchmarks
                </a>

                <form onSubmit={handleSubmit}>
                  <button
                    type="submit"
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </form>

              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
