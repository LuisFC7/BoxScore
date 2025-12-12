import { usePage } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import ModalPopUp from '@/components/ModalPopUp'
import { HiMenu, HiX } from 'react-icons/hi'


export default function Welcome() {
  const { props } = usePage<{ flash?: { title?: string; message?: string } }>()
  const [showSuccess, setShowSuccess] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (props.flash?.message) {
      setShowSuccess(true)
    }
  }, [props.flash])

  return (
    <div className="min-h-screen flex flex-col bg-[#0F0F0F] text-[#FFFFFF]">
      
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-4 bg-[#0F0F0F] border-b border-[#79BC22] shadow-md">
        <div className="flex items-center space-x-2">
          <img src="/img/minilogo.png" alt="Logo" className="h-12 w-auto" />
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="text-[#79BC22] hover:text-[#A0D23F] font-medium transition">Eventos</a>
          <a href={'/pricing'} className="text-[#79BC22] hover:text-[#A0D23F] font-medium transition">Pricing</a>
          <a href={'/login'} className="text-[#79BC22] hover:text-[#A0D23F] font-medium transition">Iniciar Sesión</a>
          <a
            href={'/register'}
            className="px-4 py-2 bg-[#79BC22] text-[#0F0F0F] font-semibold rounded-lg shadow-lg hover:bg-[#A0D23F] hover:shadow-[0_0_20px_rgba(121,188,34,0.5)] transition-all"
          >
            Regístrate
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#79BC22] focus:outline-none">
            {menuOpen ? <HiX className="h-8 w-8"/> : <HiMenu className="h-8 w-8"/>}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-[#0F0F0F] border-b border-[#79BC22] space-y-4 py-4">
          <a href="#" className="text-[#79BC22] hover:text-[#A0D23F] font-medium transition">Eventos</a>
          <a href={'/pricing'} className="text-[#79BC22] hover:text-[#A0D23F] font-medium transition">Pricing</a>
          <a href={'/login'} className="text-[#79BC22] hover:text-[#A0D23F] font-medium transition">Iniciar Sesión</a>
          <a
            href={'/register'}
            className="px-4 py-2 bg-[#79BC22] text-[#0F0F0F] font-semibold rounded-lg shadow-lg hover:bg-[#A0D23F] hover:shadow-[0_0_20px_rgba(121,188,34,0.5)] transition-all"
          >
            Regístrate
          </a>
        </div>
      )}

      {/* MAIN */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 md:px-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFFFFF] mb-6 text-center drop-shadow-md">
          Bienvenido a BoxScore
        </h1>
        <p className="text-[#CCCCCC] text-base sm:text-lg md:text-xl mb-8 text-center max-w-xl drop-shadow-sm leading-relaxed">
          Controla tus datos de manera eficiente y segura. 
        </p>
        <img
          src="/img/BoxScore.png"
          alt="Box Score"
          className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full drop-shadow-[0_0_20px_rgba(121,188,34,0.5)] rounded-lg hover:scale-105 transition-transform"
        />
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
