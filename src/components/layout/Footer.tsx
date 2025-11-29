import { Instagram, Facebook, X, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-6 mt-auto border-t border-gray-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

        {/* Texto izquierdo */}
        <p className="text-xs text-gray-500 tracking-wide mb-4 md:mb-0">
          © 2025 Sport manager – TUP. Todos los derechos reservados.
        </p>

        {/* Íconos de redes sociales */}
        <div className="flex gap-6">
          {/* Facebook */}
          <a
            href="#"
            className="text-white transition-all duration-300 hover:text-blue-400 hover:drop-shadow-[0_0_6px_#60A5FA]"
          >
            <Facebook className="w-4 h-4" />
          </a>

          {/* Instagram */}
          <a
            href="#"
            className="text-white transition-all duration-300 hover:text-pink-400 hover:drop-shadow-[0_0_6px_#F472B6]"
          >
            <Instagram className="w-4 h-4" />
          </a>

          {/* X */}
          <a
            href="#"
            className="text-white transition-all duration-300 hover:text-gray-400 hover:drop-shadow-[0_0_6px_#9CA3AF]"
          >
            <X className="w-4 h-4" />
          </a>

          {/* Mail */}
          <a
            href="#"
            className="text-white transition-all duration-300 hover:text-red-400 hover:drop-shadow-[0_0_6px_#F87171]"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
