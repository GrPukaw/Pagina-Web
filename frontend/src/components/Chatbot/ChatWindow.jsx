import React, { useState, useEffect, useRef } from 'react';
import { faqs, categorias } from '../../data/faqs';

export default function ChatWindow({ onClose }) {
const [messages, setMessages] = useState([
    {
    id: 1,
    type: 'bot',
    text: '¡Hola! 👋 Soy el asistente virtual de PuenteX. ¿En qué puedo ayudarte?',
    timestamp: new Date()
    }
]);
const [categoriaActiva, setCategoriaActiva] = useState('todas');
const [inputText, setInputText] = useState('');
const [isTyping, setIsTyping] = useState(false);
const messagesEndRef = useRef(null);
const inputRef = useRef(null);

const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};

useEffect(() => {
    scrollToBottom();
}, [messages, isTyping]);

  // Función para buscar respuesta en FAQs
const buscarRespuesta = (preguntaUsuario) => {
    const preguntaLower = preguntaUsuario.toLowerCase();
    
    // Buscar coincidencias exactas o parciales
    const coincidencias = faqs.filter(faq => {
    const preguntaFaqLower = faq.pregunta.toLowerCase();
    const palabrasClave = preguntaFaqLower.split(' ');
    
      // Si la pregunta del usuario contiene palabras clave de la FAQ
    return palabrasClave.some(palabra => 
        palabra.length > 3 && preguntaLower.includes(palabra)
    ) || preguntaLower.includes(preguntaFaqLower) || preguntaFaqLower.includes(preguntaLower);
    });

    // Si hay coincidencias, devolver la mejor
    if (coincidencias.length > 0) {
    return coincidencias[0];
    }

    // Búsqueda por palabras clave específicas
    if (preguntaLower.includes('beca') || preguntaLower.includes('solicitar') || preguntaLower.includes('estudiante')) {
      return faqs.find(f => f.id === 1); // ¿Cómo solicito una beca?
    }
    if (preguntaLower.includes('gratis') || preguntaLower.includes('costo') || preguntaLower.includes('precio')) {
      return faqs.find(f => f.id === 2); // ¿Los cursos son gratuitos?
    }
    if (preguntaLower.includes('certificado') || preguntaLower.includes('diploma')) {
      return faqs.find(f => f.id === 3); // ¿Los cursos tienen certificado?
    }
    if (preguntaLower.includes('tiempo') || preguntaLower.includes('tardan') || preguntaLower.includes('demora')) {
      return faqs.find(f => f.id === 4); // ¿Cuánto tardan en aprobar?
    }
    if (preguntaLower.includes('contraseña') || preguntaLower.includes('password') || preguntaLower.includes('restablecer')) {
      return faqs.find(f => f.id === 6); // ¿Cómo restablezco mi contraseña?
    }
    if (preguntaLower.includes('duración') || preguntaLower.includes('dura') || preguntaLower.includes('tiempo')) {
      return faqs.find(f => f.id === 7); // ¿Cuánto dura cada curso?
    }
    if (preguntaLower.includes('contacto') || preguntaLower.includes('soporte') || preguntaLower.includes('ayuda')) {
      return faqs.find(f => f.id === 10); // ¿Cómo contacto con soporte?
    }

    return null;
};

const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!inputText.trim()) return;

    // Agregar mensaje del usuario
    const userMessage = {
    id: Date.now(),
    type: 'user',
    text: inputText,
    timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simular "escribiendo..." y buscar respuesta
    setTimeout(() => {
    const respuestaEncontrada = buscarRespuesta(inputText);
    
    let botResponse;
    if (respuestaEncontrada) {
        botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: respuestaEncontrada.respuesta,
        timestamp: new Date()
        };
    } else {
        // Si no encuentra respuesta
        botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: '🤔 No encontré una respuesta exacta a tu pregunta.\n\nPuedes:\n\n1. Hacer click en las preguntas frecuentes de abajo\n2. Reformular tu pregunta\n3. Contactar con soporte humano\n\n¿En qué más puedo ayudarte?',
        timestamp: new Date()
        };
    }

    setIsTyping(false);
    setMessages(prev => [...prev, botResponse]);
    }, 800);
};

const handleFaqClick = (faq) => {
    const userMessage = {
    id: Date.now(),
    type: 'user',
    text: faq.pregunta,
    timestamp: new Date()
    };

    setTimeout(() => {
    const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: faq.respuesta,
        timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage, botMessage]);
    }, 500);
};

const handleContactSupport = () => {
    const supportMessage = {
    id: Date.now(),
    type: 'bot',
    text: '📧 Puedes contactarnos por:\n\n• Email: PuenteX.soporte@gmail.com\n• WhatsApp: +51 985 226 470\n\nHorario: Lun-Vie 9:00 AM - 6:00 PM',
    timestamp: new Date()
    };
    setMessages(prev => [...prev, supportMessage]);
};

const faqsFiltradas = categoriaActiva === 'todas' 
    ? faqs 
    : faqs.filter(faq => faq.categoria === categoriaActiva);

return (
    <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-slideUp">
      {/* Header */}
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl">
            🤖
        </div>
        <div>
            <h3 className="font-bold">Asistente PuenteX</h3>
            <p className="text-xs text-blue-100">
            {isTyping ? 'Escribiendo...' : 'Siempre disponible'}
            </p>
        </div>
        </div>
        <button
        onClick={onClose}
        className="hover:bg-white/20 rounded-full p-2 transition"
        >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        </button>
    </div>

      {/* Messages */}
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
        <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
            <div
            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.type === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-white text-gray-800 shadow-md rounded-bl-none'
            }`}
            >
            <p className="text-sm whitespace-pre-line">{message.text}</p>
            <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                {message.timestamp.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}
            </p>
            </div>
        </div>
        ))}

        {/* Indicador "escribiendo..." */}
        {isTyping && (
        <div className="flex justify-start">
            <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
            <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            </div>
            </div>
        </div>
        )}

        <div ref={messagesEndRef} />
    </div>

      {/* Input de texto */}
    <div className="border-t bg-white p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escribe tu pregunta..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        />
        <button
            type="submit"
            disabled={!inputText.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
        </button>
        </form>
    </div>

      {/* Categorías */}
    <div className="border-t bg-white p-3">
        <div className="flex gap-2 overflow-x-auto pb-2">
        {categorias.map(cat => (
            <button
            key={cat.id}
            onClick={() => setCategoriaActiva(cat.id)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                categoriaActiva === cat.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            >
            <span>{cat.icono}</span>
            <span>{cat.nombre}</span>
            </button>
        ))}
        </div>
    </div>

      {/* FAQs */}
    <div className="border-t bg-white p-4 max-h-48 overflow-y-auto">
        <p className="text-xs text-gray-500 mb-3 font-semibold">Preguntas frecuentes:</p>
        <div className="space-y-2">
        {faqsFiltradas.slice(0, 4).map((faq) => (
            <button
            onClick={() => handleFaqClick(faq)}
            className="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition text-xs border border-gray-200 hover:border-blue-300"
            >
            <span className="mr-2">{faq.icono}</span>
            {faq.pregunta}
            </button>
        ))}
        
        <button
            onClick={handleContactSupport}
            className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition text-xs border border-green-200 hover:border-green-300"
        >
            <span className="mr-2">💬</span>
            Hablar con soporte humano
        </button>
        </div>
    </div>
    </div>
);
}