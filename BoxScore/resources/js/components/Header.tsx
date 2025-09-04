export default function Header() {
  return (
    <header className="w-full bg-[#0F0F0F] border-b border-[#79BC22] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div>
          <img src="/img/miniLogo.png" alt="Logo" className="h-12 w-auto" />
        </div>

        {/* Link Inicio */}
        <nav>
          <a
            href="#"
            className="text-[#79BC22] hover:text-[#A0D23F] font-medium transition"
          >
            Inicio
          </a>
        </nav>
      </div>
    </header>
  );
}
