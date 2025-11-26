import { Instagram, Facebook, X, Mail } from 'lucide-react';

export function Footer() {
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