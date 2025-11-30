const mongoose = require('mongoose');
const Curso = require('../models/Curso');
require('dotenv').config();

const cursosData = [
  {
    title: 'Desarrollo Web Full Stack',
    slug: 'desarrollo-web-full-stack',
    description: 'Aprende a crear aplicaciones web completas desde cero con HTML, CSS, JavaScript, React y Node.js',
    image: '💻',
    level: 'Intermedio',
    duration: '12 semanas',
    price: 0,
    videoUrl: 'https://www.youtube.com/embed/MJkdaVFHrto',
    instructor: {
      name: 'Carlos Flores',
      bio: 'Desarrollador Full Stack con 8+ años de experiencia',
      avatar: '👨‍💻'
    },
    curriculum: [
      {
        module: 'Módulo 1: Fundamentos Web',
        topics: ['HTML5 semántico', 'CSS3 y Flexbox', 'JavaScript ES6+', 'DOM y eventos']
      },
      {
        module: 'Módulo 2: Frontend con React',
        topics: ['Componentes y Props', 'State y Hooks', 'React Router', 'Context API']
      },
      {
        module: 'Módulo 3: Backend con Node.js',
        topics: ['Express.js', 'MongoDB y Mongoose', 'APIs RESTful', 'Autenticación JWT']
      },
      {
        module: 'Módulo 4: Proyecto Final',
        topics: ['Diseño de aplicación', 'Implementación completa', 'Deploy en producción']
      }
    ],
    requirements: [
      'Computadora con Windows, Mac o Linux',
      'Conocimientos básicos de programación',
      'Ganas de aprender'
    ],
    whatYouWillLearn: [
      'Crear sitios web responsive con HTML y CSS',
      'Programar con JavaScript moderno',
      'Desarrollar aplicaciones con React',
      'Construir APIs con Node.js y Express',
      'Trabajar con bases de datos MongoDB',
      'Desplegar aplicaciones en producción'
    ],
    category: 'programacion',
    students: 1250,
    rating: 4.8,
    reviews: 234
  },
  {
    title: 'Python para Data Science',
    slug: 'python-data-science',
    description: 'Domina Python, Pandas, NumPy y visualización de datos para convertirte en Data Scientist',
    image: '🐍',
    level: 'Principiante',
    duration: '10 semanas',
    price: 0,
    videoUrl: 'https://www.youtube.com/embed/DLikpfc64cA',
    instructor: {
      name: 'María García',
      bio: 'Data Scientist con experiencia en ML e IA',
      avatar: '👩‍🔬'
    },
    curriculum: [
      {
        module: 'Módulo 1: Python Básico',
        topics: ['Variables y tipos de datos', 'Estructuras de control', 'Funciones', 'POO básica']
      },
      {
        module: 'Módulo 2: Análisis de Datos',
        topics: ['Pandas para análisis', 'NumPy para cálculos', 'Limpieza de datos', 'Transformación']
      },
      {
        module: 'Módulo 3: Visualización',
        topics: ['Matplotlib', 'Seaborn', 'Plotly', 'Dashboards interactivos']
      },
      {
        module: 'Módulo 4: Machine Learning',
        topics: ['Scikit-learn', 'Modelos supervisados', 'Modelos no supervisados', 'Evaluación']
      }
    ],
    requirements: [
      'Computadora con Python instalado',
      'Conocimientos básicos de matemáticas',
      'No se requiere experiencia previa en programación'
    ],
    whatYouWillLearn: [
      'Programar en Python desde cero',
      'Analizar datos con Pandas y NumPy',
      'Crear visualizaciones impactantes',
      'Aplicar algoritmos de Machine Learning',
      'Limpiar y preparar datasets',
      'Construir modelos predictivos'
    ],
    category: 'programacion',
    students: 980,
    rating: 4.9,
    reviews: 187
  },
  {
    title: 'Diseño UX/UI',
    slug: 'diseno-ux-ui',
    description: 'Diseña experiencias de usuario increíbles con Figma y aprende los principios del diseño',
    image: '🎨',
    level: 'Principiante',
    duration: '8 semanas',
    price: 0,
    videoUrl: 'https://www.youtube.com/embed/cKZEgtQUxlU',
    instructor: {
      name: 'Ana Martínez',
      bio: 'Diseñadora UX/UI con portfolio internacional',
      avatar: '👩‍🎨'
    },
    curriculum: [
      {
        module: 'Módulo 1: Fundamentos de UX',
        topics: ['Qué es UX/UI', 'Investigación de usuarios', 'Personas y user journey', 'Wireframes']
      },
      {
        module: 'Módulo 2: Diseño Visual',
        topics: ['Teoría del color', 'Tipografía', 'Layouts y grids', 'Principios de diseño']
      },
      {
        module: 'Módulo 3: Figma',
        topics: ['Interface de Figma', 'Componentes', 'Auto Layout', 'Prototipos interactivos']
      },
      {
        module: 'Módulo 4: Portfolio',
        topics: ['Case studies', 'Presentación de proyectos', 'Portfolio personal', 'Preparación laboral']
      }
    ],
    requirements: [
      'Computadora con acceso a internet',
      'Cuenta gratuita de Figma',
      'Creatividad y pasión por el diseño'
    ],
    whatYouWillLearn: [
      'Principios fundamentales de UX/UI',
      'Investigación y análisis de usuarios',
      'Diseñar interfaces atractivas en Figma',
      'Crear prototipos interactivos',
      'Construir un portfolio profesional',
      'Prepararte para trabajar como diseñador'
    ],
    category: 'diseno',
    students: 756,
    rating: 4.7,
    reviews: 145
  }
];

const seedCursos = async () => {
  try {
    console.log('🔄 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    console.log('🗑️  Limpiando cursos existentes...');
    await Curso.deleteMany({});

    console.log('📚 Insertando cursos de ejemplo...');
    await Curso.insertMany(cursosData);

    console.log('✅ Cursos insertados exitosamente!');
    console.log(`📊 Total de cursos: ${cursosData.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedCursos();