import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Certificado() {
const { slug } = useParams();
const navigate = useNavigate();
const { user } = useContext(AuthContext);
const certificadoRef = useRef(null)
const [curso, setCurso] = useState(null);
const [loading, setLoading] = useState(true);
const [generando, setGenerando] = useState(false);
const [imagenesListas, setImagenesListas] = useState(false);
const [fechaCompletado] = useState(new Date().toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}));

// ✅ CORRECCIÓN: useCallback para fetchCurso
const fetchCurso = useCallback(async () => {
    try {
    const response = await axios.get(`http://localhost:5000/api/cursos/${slug}`);
    setCurso(response.data.curso);
    setLoading(false);
    } catch (error) {
    console.error('Error al cargar curso:', error);
    setLoading(false);
    }
}, [slug]);

// ✅ CORRECCIÓN: useCallback para precargarImagenes
const precargarImagenes = useCallback(() => {
    const imagenes = [
    '/images/certificados/logo-puentex.png',
    '/images/certificados/sello-oficial.png',
    '/images/certificados/firma-director.png'
    ];

    let cargadas = 0;
    imagenes.forEach(src => {
    const img = new Image();
    img.onload = () => {
        cargadas++;
        if (cargadas === imagenes.length) {
        setImagenesListas(true);
        }
    };
    img.onerror = () => {
        cargadas++;
        if (cargadas === imagenes.length) {
        setImagenesListas(true);
        }
    };
    img.src = src;
    });
}, []);

// ✅ CORRECCIÓN: Incluir todas las dependencias
useEffect(() => {
    if (!user) {
    alert('Debes iniciar sesión para ver tu certificado');
    navigate('/login');
    return;
    }
    fetchCurso();
    precargarImagenes();
}, [user, navigate, fetchCurso, precargarImagenes]);

const generarPDF = async () => {
    setGenerando(true);
    
    try {
    const elemento = certificadoRef.current;
    
      // Esperar un momento para que todo se renderice
    await new Promise(resolve => setTimeout(resolve, 500));
    
      // Capturar el certificado como imagen con mejor calidad
    const canvas = await html2canvas(elemento, {
        scale: 3, // Mejor calidad
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
        imageTimeout: 0,
        removeContainer: false
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    
      // Crear PDF en formato horizontal (landscape)
    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST');
    
      // Descargar PDF
    const nombreArchivo = `Certificado_${curso.title.replace(/\s+/g, '_')}_${user.fullName.replace(/\s+/g, '_')}.pdf`;
    pdf.save(nombreArchivo);
    
    setGenerando(false);
    alert('Certificado descargado exitosamente');
    } catch (error) {
    console.error('Error al generar PDF:', error);
    setGenerando(false);
    alert('Error al generar el certificado. Intenta de nuevo.');
    }
};

const compartirCertificado = (plataforma) => {
    const texto = `He completado el curso "${curso?.title}" en PuenteX`;
    const url = window.location.href;

    const urls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(texto + ' ' + url)}`
    };

    window.open(urls[plataforma], '_blank', 'width=600,height=400');
};

if (loading) {
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Cargando certificado...</p>
        </div>
    </div>
    );
}

if (!curso) {
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Curso no encontrado</h2>
        <Link to="/cursos" className="text-blue-600 hover:underline">
            Volver a cursos
        </Link>
        </div>
    </div>
    );
}

return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
    <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Tu Certificado de Finalización
        </h1>
        <p className="text-lg text-gray-600">
            Descarga o comparte tu certificado del curso: <span className="font-bold text-blue-600">{curso.title}</span>
        </p>
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
            onClick={generarPDF}
            disabled={generando || !imagenesListas}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {generando ? 'Generando PDF...' : imagenesListas ? 'Descargar PDF' : 'Cargando...'}
        </button>

        <div className="flex gap-2">
            <button
            onClick={() => compartirCertificado('linkedin')}
            className="bg-blue-700 text-white px-4 py-3 rounded-lg font-bold hover:bg-blue-800 transition shadow-lg"
            title="Compartir en LinkedIn"
            >
            LinkedIn
            </button>
            <button
            onClick={() => compartirCertificado('facebook')}
            className="bg-blue-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg"
            title="Compartir en Facebook"
            >
            Facebook
            </button>
            <button
            onClick={() => compartirCertificado('twitter')}
            className="bg-sky-500 text-white px-4 py-3 rounded-lg font-bold hover:bg-sky-600 transition shadow-lg"
            title="Compartir en Twitter"
            >
            Twitter
            </button>
            <button
            onClick={() => compartirCertificado('whatsapp')}
            className="bg-green-500 text-white px-4 py-3 rounded-lg font-bold hover:bg-green-600 transition shadow-lg"
            title="Compartir en WhatsApp"
            >
            WhatsApp
            </button>
        </div>
        </div>

        {/* Certificado Preview */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
        <div 
            ref={certificadoRef}
            className="relative bg-white p-12 md:p-16 border-8 border-double border-blue-600"
            style={{
            minHeight: '600px',
            backgroundImage: 'linear-gradient(to bottom right, #ffffff 0%, #f0f9ff 100%)'
            }}
        >
            {/* Decoración de esquinas */}
            <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-blue-600"></div>
            <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-blue-600"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-blue-600"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-blue-600"></div>

            {/* Contenido del Certificado */}
            <div className="relative z-10">
              {/* Header con Logo */}
            <div className="text-center mb-8">
                <div className="inline-block mb-4">
                <img 
                    src="/images/certificados/logo-puentex.png" 
                    alt="PuenteX Logo" 
                    className="w-24 h-24 object-contain mx-auto"
                    crossOrigin="anonymous"
                    onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'block';
                    }}
                />
                <div className="w-24 h-24 mx-auto bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold hidden">
                    PX
                </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                CERTIFICADO DE FINALIZACIÓN
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
            </div>

              {/* Texto Principal */}
            <div className="text-center mb-8">
                <p className="text-xl text-gray-600 mb-4">Se certifica que</p>
                <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2 inline-block px-8">
                {user?.fullName || 'Estudiante'}
                </h3>
                <p className="text-xl text-gray-600 mb-2 mt-4">Ha completado exitosamente el curso</p>
                <h4 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
                "{curso.title}"
                </h4>
            </div>

              {/* Detalles del Curso */}
            <div className="grid md:grid-cols-3 gap-6 mb-8 text-center">
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <p className="text-sm text-gray-600 mb-1 font-semibold">DURACIÓN</p>
                <p className="font-bold text-gray-800 text-lg">{curso.duration}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
                <p className="text-sm text-gray-600 mb-1 font-semibold">NIVEL</p>
                <p className="font-bold text-gray-800 text-lg">{curso.level}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                <p className="text-sm text-gray-600 mb-1 font-semibold">FECHA</p>
                <p className="font-bold text-gray-800 text-lg">{fechaCompletado}</p>
                </div>
            </div>

              {/* Footer con Firma y Sello */}
            <div className="flex justify-around items-end mt-12">
                <div className="text-center">
                <div className="mb-2">
                    <img 
                    src="/images/certificados/firma-director.png" 
                    alt="Firma" 
                    className="w-32 h-16 mx-auto object-contain"
                    crossOrigin="anonymous"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'block';
                    }}
                    />
                    <div className="w-32 h-16 mx-auto flex items-end justify-center hidden">
                    <svg width="120" height="60" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 40 Q 30 10, 50 40 T 90 40" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    </svg>
                    </div>
                </div>
                <div className="border-t-2 border-gray-800 pt-2">
                    <p className="font-bold text-gray-800">Director Académico</p>
                    <p className="text-sm text-gray-600">PuenteX Educación</p>
                </div>
                </div>

                <div className="text-center">
                <img 
                    src="/images/certificados/sello-oficial.png" 
                    alt="Sello Oficial" 
                    className="w-24 h-24 mx-auto object-contain"
                    crossOrigin="anonymous"
                    onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                    }}
                />
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-full items-center justify-center text-white font-bold text-xs text-center p-2 hidden">
                    <div className="flex items-center justify-center h-full">
                    <span>CERTIFICADO OFICIAL</span>
                    </div>
                </div>
                </div>
            </div>

              {/* Código de Verificación */}
            <div className="text-center mt-8 pt-8 border-t-2 border-gray-300">
                <p className="text-sm text-gray-600 mb-1">
                Código de Verificación
                </p>
                <p className="font-mono font-bold text-gray-800 text-lg">
                PX-{Date.now().toString(36).toUpperCase()}-{user?.id?.substring(0, 8).toUpperCase() || 'XXXXXXXX'}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                Verifica este certificado en: www.puentex.edu.pe/verificar
                </p>
            </div>
            </div>
        </div>
        </div>

        {/* Información Adicional */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Sobre este certificado</h3>
        <div className="grid md:grid-cols-2 gap-6">
            <div>
            <h4 className="font-bold text-gray-700 mb-2">¿Qué incluye?</h4>
            <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                <span className="text-green-500 flex-shrink-0">✓</span>
                <span>Certificado oficial en formato PDF de alta calidad</span>
                </li>
                <li className="flex items-start gap-2">
                <span className="text-green-500 flex-shrink-0">✓</span>
                <span>Código de verificación único</span>
                </li>
                <li className="flex items-start gap-2">
                <span className="text-green-500 flex-shrink-0">✓</span>
                <span>Válido para incluir en LinkedIn y CV</span>
                </li>
                <li className="flex items-start gap-2">
                <span className="text-green-500 flex-shrink-0">✓</span>
                <span>Reconocido por empresas del sector</span>
                </li>
            </ul>
            </div>
            <div>
            <h4 className="font-bold text-gray-700 mb-2">¿Cómo usarlo?</h4>
            <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                <span className="text-blue-500 flex-shrink-0">1.</span>
                <span>Descarga el PDF en alta resolución</span>
                </li>
                <li className="flex items-start gap-2">
                <span className="text-blue-500 flex-shrink-0">2.</span>
                <span>Agrégalo a tu perfil de LinkedIn</span>
                </li>
                <li className="flex items-start gap-2">
                <span className="text-blue-500 flex-shrink-0">3.</span>
                <span>Inclúyelo en tu portafolio profesional</span>
                </li>
                <li className="flex items-start gap-2">
                <span className="text-blue-500 flex-shrink-0">4.</span>
                <span>Compártelo en redes sociales</span>
                </li>
            </ul>
            </div>
        </div>
        </div>

        {/* Botones de Navegación */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
            to={`/cursos/${slug}`}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition text-center"
        >
            Volver al Curso
        </Link>
        <Link
            to="/cursos"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700 transition text-center"
        >
            Explorar Más Cursos
        </Link>
        </div>
    </div>
    </div>
);
}