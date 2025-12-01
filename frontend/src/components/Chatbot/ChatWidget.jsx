import React, { useState } from 'react';
import ChatWindow from './ChatWindow';

export default function ChatWidget() {
const [isOpen, setIsOpen] = useState(false);
const [hasNewMessage, setHasNewMessage] = useState(false);

const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
    setHasNewMessage(false);
    }
};

return (
    <>
      {/* Ventana del Chat */}
    {isOpen && (
        <ChatWindow onClose={() => setIsOpen(false)} />
    )}

      {/* Botón Flotante */}
    <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-50 group"
        aria-label="Abrir chat de ayuda"
    >
        {isOpen ? (
          // Icono de cerrar (X)
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        ) : (
          // Icono de chat
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        )}
        
        {/* Badge de notificación */}
        {!isOpen && hasNewMessage && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            1
        </span>
        )}

        {/* Tooltip */}
        <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        ¿Necesitas ayuda?
        </span>
    </button>
    </>
);
}