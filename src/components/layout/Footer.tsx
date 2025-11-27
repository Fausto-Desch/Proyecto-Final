import { Instagram, Facebook, X, Mail } from 'lucide-react';

export function Footer() {
<<<<<<< HEAD
    return (
        <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">© 2024 Proyecto Final - Tup</p>
            </div>
            
            <div className="flex gap-6">
            {/* Facebook */}
            <a href="#" className="hover:text-blue-500 transition">
                <Facebook className="w-5 h-5" />
            </a>
            
            {/* Instagram */}
            <a href="#" className="hover:text-pink-500 transition">
                <Instagram className="w-5 h-5" />
            </a>
            
            {/* X (Antes Twitter) */}
            <a href="#" className="hover:text-gray-400 transition">
                <X className="w-5 h-5" />
            </a>
            
            {/* Mail */}
            <a href="#" className="hover:text-red-400 transition">
                <Mail className="w-5 h-5" />
            </a>
            </div>
        </div>
        </footer>
    )
}
=======
  return (
    <footer className="bg-gray-950 text-gray-300 py-6 mt-auto border-t border-gray-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

        {/* TEXT LEFT */}
        <p className="text-xs text-gray-500 tracking-wide mb-4 md:mb-0">
          © 2025 Proyecto Final – TUP. Todos los derechos reservados.
        </p>

        {/* ICONS */}
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
>>>>>>> KAN-58roles
