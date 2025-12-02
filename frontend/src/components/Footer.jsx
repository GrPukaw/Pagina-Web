import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
const socialLinks = [
    {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/hector-carlos-flores-torres-109a71380/',
    color: 'bg-blue-700 hover:bg-blue-800',
    icon: ''
    },
    {
    name: 'Facebook',
    url: 'https://www.facebook.com/carlos.florestorres.50/',
    color: 'bg-blue-600 hover:bg-blue-700',
    icon: ''
    },
    {
    name: 'Instagram',
    url: 'https://www.instagram.com/carlos.florestorres.50/',
    color: 'bg-pink-600 hover:bg-pink-700',
    icon: ''
    },
    {
    name: 'Twitter',
    url: 'https://twitter.com',
    color: 'bg-sky-500 hover:bg-sky-600',
    icon: ''
    },
    {
    name: 'WhatsApp',
    url: 'https://wa.me/+51985226470',
    color: 'bg-green-500 hover:bg-green-600',
    icon: ''
    },
    {
    name: 'Discord',
    url: 'https://discord.gg/yUDCGQRd',
    color: 'bg-indigo-600 hover:bg-indigo-700',
    icon: ''
    },
    {
    name: 'Github',
    url: 'https://github.com/GrPukaw',
    color: 'bg-gray-700 hover:bg-gray-800',
    icon: ''
    }
];



const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
};

return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-16">
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        
        {/* Redes Sociales */}
        <div className="mb-8">
        <h3 className="text-center text-xl font-bold mb-6 flex items-center justify-center gap-2">
            <span className="text-2xl"></span>
            Síguenos en Redes Sociales
        </h3>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {socialLinks.map((social, index) => (
            <button
                key={index}
                onClick={() => handleSocialClick(social.url)}
                className={`${social.color} text-white px-4 md:px-6 py-3 rounded-lg font-bold transition shadow-lg transform hover:scale-105 flex items-center gap-2 text-sm md:text-base`}
                title={`Seguir en ${social.name}`}
            >
                <span className="text-lg">{social.icon}</span>
                <span>{social.name}</span>
            </button>
            ))}
        </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Copyright y Links Legales */}
        <div className="text-center space-y-4">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs md:text-sm text-gray-400">
            <Link to="/terminos" className="hover:text-blue-400 transition-colors">
            Términos y Condiciones
            </Link>
            <span className="text-gray-600">•</span>
            <Link to="/privacidad" className="hover:text-blue-400 transition-colors">
            Política de Privacidad
            </Link>
            <span className="text-gray-600">•</span>
            <Link to="/cookies" className="hover:text-blue-400 transition-colors">
            Cookies
            </Link>
        </div>
        
        <p className="text-gray-400 text-xs md:text-sm">
            © {new Date().getFullYear()} <span className="font-bold text-blue-400">PuenteX</span>. Todos los derechos reservados.
        </p>
        
        <p className="text-gray-500 text-xs flex items-center justify-center gap-2">
            <span>Hecho con</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>PUKA</span>
        </p>
        </div>
    </div>
    </footer>
);
}