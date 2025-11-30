const mongoose = require('mongoose');
const Curso = require('../models/Curso');
require('dotenv').config();

const cursosCompletos = [
  // ========== CURSO 1: SQL COMPLETO (13 de 25 secciones) ==========
  {
    title: 'Curso Completo de SQL',
    slug: 'sql-completo',
    description: 'Aprende SQL desde cero hasta nivel avanzado. Domina consultas, bases de datos, normalización y mucho más con Oracle SQL Developer.',
    image: '/images/cursos/sql-curso.jpg',
    level: 'Principiante',
    duration: '25 secciones',
    price: 0,
    category: 'programacion',
    students: 3420,
    rating: 4.9,
    reviews: 678,
    instructor: {
      name: 'Carlos Flores',
      bio: 'Experto en Bases de Datos con 10+ años de experiencia',
      avatar: '👨‍💻'
    },
    requirements: [
      'Computadora con Windows',
      'Ganas de aprender',
      'No se requiere experiencia previa'
    ],
    whatYouWillLearn: [
      'Instalar y configurar Oracle SQL Developer',
      'Realizar consultas SQL básicas y avanzadas',
      'Normalización de bases de datos',
      'Crear y modificar tablas',
      'Manejo de relaciones entre tablas',
      'Funciones agregadas y agrupamiento de datos'
    ],
    secciones: [
      {
        numero: 1,
        titulo: 'Curso Completo de SQL',
        videoUrl: 'https://www.youtube.com/embed/j4VeiHGZVMA',
        temario: [
          'Requisitos Previos para la Instalación de Oracle y SQL Developer',
          'Instalación de Oracle Database en Windows',
          'Instalación de SQL Developer en Windows',
          'Configuración Inicial de Oracle SQL Developer'
        ]
      },
      {
        numero: 2,
        titulo: 'Consultas Básicas en SQL',
        videoUrl: 'https://www.youtube.com/embed/7Up48UeVcEs',
        temario: [
          'Introducción a las Consultas SELECT',
          'Filtrado de Datos con WHERE',
          'Ordenamiento de Resultados con ORDER BY',
          'Uso de Funciones Agregadas'
        ]
      },
      {
        numero: 3,
        titulo: 'Normalización (1FN, 2FN y 3FN)',
        videoUrl: 'https://www.youtube.com/embed/DXzsTKmRTHI',
        temario: [
          '¿Qué es la Normalización?',
          'Primera Forma Normal (1FN)',
          'Segunda Forma Normal (2FN)',
          'Tercera Forma Normal (3FN)'
        ]
      },
      {
        numero: 4,
        titulo: 'Creación de usuario y contraseña',
        videoUrl: 'https://www.youtube.com/embed/mbxCzjMMXsU',
        temario: [
          '¿Cómo Crear un Usuario en Oracle SQL Developer?',
          'Asignación de Privilegios al Usuario',
          'Establecer Contraseña para el Usuario',
          'Asignación de Roles a un Usuario'
        ]
      },
      {
        numero: 5,
        titulo: 'Cómo crear tablas en SQL developer',
        videoUrl: 'https://www.youtube.com/embed/-jw6OBWX3EI',
        temario: [
          '¿Qué es una tabla en SQL?',
          'Crear una tabla con SQL Developer',
          'Modificar una tabla existente',
          'Tipos de datos comunes en Oracle'
        ]
      },
      {
        numero: 6,
        titulo: 'Relaciones 1aN, 1a1 y NaN',
        videoUrl: 'https://www.youtube.com/embed/UhWuLuI-YH0',
        temario: [
          '¿Qué son las relaciones en una base de datos?',
          'Relación 1 a N (Uno a Muchos)',
          'Relación 1 a 1 (Uno a Uno)',
          'Relación N a N (Muchos a Muchos)'
        ]
      },
      {
        numero: 7,
        titulo: 'Insertar datos en una tabla',
        videoUrl: 'https://www.youtube.com/embed/Ud6OZNGA0aE',
        temario: [
          '¿Qué es el comando INSERT?',
          'Sintaxis básica del comando INSERT',
          'Insertar múltiples registros',
          'Insertar datos con valores nulos'
        ]
      },
      {
        numero: 8,
        titulo: 'Consultas en SQL: SELECT',
        videoUrl: 'https://www.youtube.com/embed/jGqBiT1jp-4',
        temario: [
          'Sintaxis básica de SELECT',
          'Seleccionar columnas específicas',
          'Seleccionar todas las columnas'
        ]
      },
      {
        numero: 9,
        titulo: 'Consultas en SQL: WHERE',
        videoUrl: 'https://www.youtube.com/embed/4hQcoAZgkzk',
        temario: [
          'Sintaxis básica de WHERE',
          'Filtrar por un valor específico',
          'Usar operadores lógicos en WHERE',
          'Combinación de condiciones con AND y OR'
        ]
      },
      {
        numero: 10,
        titulo: 'Operadores relacionales',
        videoUrl: 'https://www.youtube.com/embed/VSStMXIRJwk',
        temario: [
          'Definición de operadores relacionales',
          'Operadores: =, <>, >, <, >=, <=',
          'Uso de operadores en consultas SELECT',
          'Comparar cadenas de texto y números'
        ]
      },
      {
        numero: 11,
        titulo: 'Borrar registros: DELETE',
        videoUrl: 'https://www.youtube.com/embed/kHa0NREFKFo',
        temario: [
          'Sintaxis básica de DELETE',
          'Eliminar registros específicos',
          'Eliminar todos los registros de una tabla',
          'Eliminar registros con condiciones'
        ]
      },
      {
        numero: 12,
        titulo: 'Actualizar registros: UPDATE',
        videoUrl: 'https://www.youtube.com/embed/GwPudStdxyE',
        temario: [
          'Sintaxis básica de UPDATE',
          'Actualizar un registro específico',
          'Actualizar múltiples registros',
          'Uso de condiciones con UPDATE'
        ]
      },
      {
        numero: 13,
        titulo: 'Operadores aritméticos',
        videoUrl: 'https://www.youtube.com/embed/OtX4PlALfoY',
        temario: [
          'Definición de operadores aritméticos',
          'Operadores: +, -, *, /',
          'Usar operadores en consultas SELECT',
          'Operadores con valores nulos'
        ]
      }
    ]
  },

  // ========== CURSO 2: PYTHON (13 de 25 secciones) ==========
  {
    title: 'Python desde Cero',
    slug: 'python-desde-cero',
    description: 'Aprende Python desde los fundamentos hasta programación orientada a objetos. Curso completo para principiantes.',
    image: '/images/cursos/python-curso.jpg',
    level: 'Principiante',
    duration: '25 secciones',
    price: 0,
    category: 'programacion',
    students: 5890,
    rating: 4.9,
    reviews: 1234,
    instructor: {
      name: 'María González',
      bio: 'Desarrolladora Python con 8+ años de experiencia',
      avatar: '👩‍💻'
    },
    requirements: [
      'Computadora con Windows, Mac o Linux',
      'Python 3.x instalado',
      'No se requiere experiencia previa'
    ],
    whatYouWillLearn: [
      'Instalar y configurar Python',
      'Sintaxis básica y variables',
      'Estructuras de control y ciclos',
      'Funciones y módulos',
      'Programación Orientada a Objetos',
      'Manejo de archivos'
    ],
    secciones: [
      {
        numero: 1,
        titulo: '¿Cómo instalar Python en Windows?',
        videoUrl: 'https://www.youtube.com/embed/LD_Wr93PiMA',
        temario: [
          'Requisitos previos para la instalación',
          'Descargar Python desde la página oficial',
          'Configuración de variables de entorno',
          'Verificación de la instalación'
        ]
      },
      {
        numero: 2,
        titulo: 'Hola Mundo en Python',
        videoUrl: 'https://www.youtube.com/embed/M5gzj07DDxc',
        temario: [
          'Introducción a los programas básicos',
          '¿Qué es el programa Hola Mundo?',
          'Cómo escribir y ejecutar tu primer programa',
          'Explicación de la sintaxis básica'
        ]
      },
      {
        numero: 3,
        titulo: 'Función print en Python',
        videoUrl: 'https://www.youtube.com/embed/UGqHeeWkXLk',
        temario: [
          '¿Qué es la función print()?',
          'Sintaxis básica de print()',
          'Uso con variables y formatos de texto',
          'Ejercicio práctico'
        ]
      },
      {
        numero: 4,
        titulo: 'Variables primitivas en Python',
        videoUrl: 'https://www.youtube.com/embed/JxwcwXVCCkw',
        temario: [
          'Tipos de datos básicos',
          'Cómo asignar valores',
          'Conversión de tipos',
          'Operaciones comunes'
        ]
      },
      {
        numero: 5,
        titulo: 'Operadores aritméticos',
        videoUrl: 'https://www.youtube.com/embed/Xbps3dgFEAU',
        temario: [
          'Explicación de operadores',
          'Prioridad de operaciones',
          'Ejemplos prácticos',
          'Uso con expresiones complejas'
        ]
      },
      {
        numero: 6,
        titulo: 'Ejercicios de operadores',
        videoUrl: 'https://www.youtube.com/embed/nHpiSlxl580',
        temario: [
          'Ejercicios de suma y resta',
          'Multiplicación y división',
          'Operaciones con flotantes',
          'Ejercicios combinados'
        ]
      },
      {
        numero: 7,
        titulo: 'Operadores de incremento',
        videoUrl: 'https://www.youtube.com/embed/DwiyyyvHrZY',
        temario: [
          'Explicación de += y -=',
          'Cómo incrementar valores',
          'Ejemplos en ciclos',
          'Ejercicios prácticos'
        ]
      },
      {
        numero: 8,
        titulo: 'Condicionales: if-elif-else',
        videoUrl: 'https://www.youtube.com/embed/SlHTi2cR3zg',
        temario: [
          'Estructura básica de if',
          'Uso de elif y else',
          'Condiciones anidadas',
          'Ejercicios prácticos'
        ]
      },
      {
        numero: 9,
        titulo: 'Operadores relacionales',
        videoUrl: 'https://www.youtube.com/embed/pfoPSl14sjg',
        temario: [
          'Comparación de valores',
          'Cómo evaluar condiciones',
          'Uso en estructuras',
          'Ejemplos prácticos'
        ]
      },
      {
        numero: 10,
        titulo: 'Operadores lógicos',
        videoUrl: 'https://www.youtube.com/embed/f4GbWZ-w-Hw',
        temario: [
          'Explicación de and, or, not',
          'Combinación de condiciones',
          'Ejemplos de uso',
          'Ejercicios prácticos'
        ]
      },
      {
        numero: 11,
        titulo: 'Listas en Python',
        videoUrl: 'https://www.youtube.com/embed/QTcAkAtKG2I',
        temario: [
          '¿Qué es una lista?',
          'Crear y modificar listas',
          'Métodos: append, remove, pop',
          'Ejercicios prácticos'
        ]
      },
      {
        numero: 12,
        titulo: 'Tuplas en Python',
        videoUrl: 'https://www.youtube.com/embed/sqgIXurdwtk',
        temario: [
          'Diferencias con listas',
          'Crear y acceder tuplas',
          'Inmutabilidad',
          'Ejemplos de uso'
        ]
      },
      {
        numero: 13,
        titulo: 'Conjuntos en Python',
        videoUrl: 'https://www.youtube.com/embed/YFnATKf_kLc',
        temario: [
          '¿Qué son los sets?',
          'Creación y manipulación',
          'Operaciones: unión, intersección',
          'Ejemplos prácticos'
        ]
      }
    ]
  },

  // ========== CURSO 3: LÓGICA DE PROGRAMACIÓN (4 de 8 secciones) ==========
  {
    title: 'Lógica de Programación',
    slug: 'logica-programacion',
    description: 'Aprende los fundamentos de la lógica de programación con PSeInt. Ideal para principiantes.',
    image: '/images/cursos/logica-curso.jpg',
    level: 'Principiante',
    duration: '8 secciones',
    price: 0,
    category: 'programacion',
    students: 2340,
    rating: 4.8,
    reviews: 456,
    instructor: {
      name: 'Roberto Silva',
      bio: 'Instructor de Lógica con 6+ años de experiencia',
      avatar: '👨‍🏫'
    },
    requirements: [
      'Computadora con Windows',
      'PSeInt instalado',
      'No se requiere experiencia previa'
    ],
    whatYouWillLearn: [
      'Instalar y usar PSeInt',
      'Crear algoritmos desde cero',
      'Usar variables y operadores',
      'Estructuras condicionales',
      'Ciclos y bucles'
    ],
    secciones: [
      {
        numero: 1,
        titulo: '¿Cómo instalar PSeInt?',
        videoUrl: 'https://www.youtube.com/embed/SwotuYiD4LA',
        temario: [
          'Introducción al software PSeInt',
          'Proceso de descarga',
          'Instalación paso a paso',
          'Configuración inicial'
        ]
      },
      {
        numero: 2,
        titulo: '¿Qué es un algoritmo?',
        videoUrl: 'https://www.youtube.com/embed/Vn_hl32UCM8',
        temario: [
          'Definición de algoritmo',
          'Características básicas',
          'Ejemplos prácticos',
          'Pseudocódigo y diagramas'
        ]
      },
      {
        numero: 3,
        titulo: 'Variables en programación',
        videoUrl: 'https://www.youtube.com/embed/5H8WVpmxKmU',
        temario: [
          '¿Qué es una variable?',
          'Tipos de datos básicos',
          'Declaración y asignación',
          'Buenas prácticas'
        ]
      },
      {
        numero: 4,
        titulo: 'Operadores aritméticos',
        videoUrl: 'https://www.youtube.com/embed/-bCwu7gGGgE',
        temario: [
          'Introducción a operadores',
          'Uso en expresiones',
          'Prioridad de operadores',
          'Ejemplos prácticos'
        ]
      }
    ]
  },

  // ========== CURSO 4: JAVA BÁSICO (19 de 38 secciones) ==========
  {
    title: 'Java Básico - Curso Completo',
    slug: 'java-basico',
    description: 'Aprende Java desde cero con NetBeans. Curso completo desde instalación hasta POO.',
    image: '/images/cursos/java-curso.jpg',
    level: 'Principiante',
    duration: '38 secciones',
    price: 0,
    category: 'programacion',
    students: 4560,
    rating: 4.9,
    reviews: 892,
    instructor: {
      name: 'Diego Ramírez',
      bio: 'Desarrollador Java Senior con 12+ años',
      avatar: '👨‍💼'
    },
    requirements: [
      'Computadora con Windows, Mac o Linux',
      'NetBeans y JDK instalados',
      'Conocimientos básicos de programación'
    ],
    whatYouWillLearn: [
      'Instalar NetBeans y JDK',
      'Crear formularios gráficos',
      'Sintaxis básica de Java',
      'Estructuras de control',
      'Arreglos y colecciones',
      'Programación Orientada a Objetos'
    ],
    secciones: [
      {
        numero: 1,
        titulo: 'Instalación de NetBeans y JDK',
        videoUrl: 'https://www.youtube.com/embed/q51BYZSGVUI',
        temario: [
          'Introducción a NetBeans y JDK',
          'Descarga e instalación de JDK',
          'Configuración de NetBeans IDE',
          'Verificación de la instalación'
        ]
      },
      {
        numero: 2,
        titulo: 'Creación de formularios',
        videoUrl: 'https://www.youtube.com/embed/JOhIwqzeSHg',
        temario: [
          'Introducción a interfaces gráficas',
          'Uso del diseñador de formularios',
          'Agregar funcionalidad a botones',
          'Prueba y depuración'
        ]
      },
      {
        numero: 3,
        titulo: 'Hola Mundo en Java',
        videoUrl: 'https://www.youtube.com/embed/fCNv-9uT1fQ',
        temario: [
          'Creación de un proyecto básico',
          'Estructura de un programa Java',
          'Uso de System.out.println',
          'Compilación y ejecución'
        ]
      },
      {
        numero: 4,
        titulo: 'Tipos de datos primitivos',
        videoUrl: 'https://www.youtube.com/embed/596piLbyXcw',
        temario: [
          'Introducción a tipos primitivos',
          'Uso de int, double y char',
          'Manejo de booleanos',
          'Ejemplos prácticos'
        ]
      },
      {
        numero: 5,
        titulo: 'Tipos no primitivos y cadenas',
        videoUrl: 'https://www.youtube.com/embed/uKUP0oSbA2k',
        temario: [
          'Diferencias entre tipos',
          'Uso de la clase String',
          'Métodos comunes',
          'Ejemplos prácticos'
        ]
      },
      {
        numero: 6,
        titulo: 'Uso de JOptionPane',
        videoUrl: 'https://www.youtube.com/embed/ZSZJ2y2a_X0',
        temario: [
          'Introducción a JOptionPane',
          'Creación de cuadros de diálogo',
          'Manejo de mensajes',
          'Ejemplos prácticos'
        ]
      },
      {
        numero: 7,
        titulo: 'Operadores aritméticos',
        videoUrl: 'https://www.youtube.com/embed/E4xq6hrPf6Q',
        temario: [
          'Introducción a operadores',
          'Suma, resta, multiplicación',
          'Operador módulo',
          'Ejemplos prácticos'
        ]
      },
      {
        numero: 8,
        titulo: 'Ejercicios de operadores',
        videoUrl: 'https://www.youtube.com/embed/1_eHrqxFv3o',
        temario: [
          'Resolución de problemas',
          'Cálculo de áreas',
          'Aplicación de fórmulas',
          'Ejercicios avanzados'
        ]
      },
      {
        numero: 9,
        titulo: 'Operadores de incremento',
        videoUrl: 'https://www.youtube.com/embed/4sZUd-BienM',
        temario: [
          'Introducción a ++ y --',
          'Uso en bucles',
          'Pre y post incremento',
          'Ejemplos prácticos'
        ]
      },
      {
        numero: 10,
        titulo: 'Uso de la clase Math',
        videoUrl: 'https://www.youtube.com/embed/oHw57Tbwin8',
        temario: [
          'Introducción a clase Math',
          'Uso de sqrt, pow, ceil',
          'Números aleatorios',
          'Ejemplos prácticos'
        ]
      },
      {
        numero: 11,
        titulo: 'Calcular promedio',
        videoUrl: 'https://www.youtube.com/embed/Llela3I8hjM',
        temario: [
          'Solicitud de notas',
          'Cálculo del promedio',
          'Validación de entradas',
          'Muestra de resultados'
        ]
      },
      {
        numero: 12,
        titulo: 'Área de figuras',
        videoUrl: 'https://www.youtube.com/embed/0Ut0wLpx5AY',
        temario: [
          'Fórmulas geométricas',
          'Cálculo de áreas',
          'Uso de entradas',
          'Muestra de resultados'
        ]
      },
      {
        numero: 13,
        titulo: 'Condicionales: IF-ELSE',
        videoUrl: 'https://www.youtube.com/embed/tzRVWR_1S1I',
        temario: [
          'Tomar decisiones',
          'Aplicar condiciones',
          'Validar entradas',
          'Usar operadores lógicos'
        ]
      },
      {
        numero: 14,
        titulo: 'Condicionales: SWITCH',
        videoUrl: 'https://www.youtube.com/embed/p_E-XgG7dwU',
        temario: [
          'Introducción a switch',
          'Simplificar decisiones',
          'Manejo de casos',
          'Ejemplos prácticos'
        ]
      },
      {
        numero: 15,
        titulo: 'Ordenar números',
        videoUrl: 'https://www.youtube.com/embed/jWNNuxgBmrw',
        temario: [
          'Algoritmos de ordenamiento',
          'Implementación básica',
          'Uso de condicionales',
          'Ejemplos prácticos'
        ]
      },
      {
        numero: 16,
        titulo: 'Usuario y contraseña',
        videoUrl: 'https://www.youtube.com/embed/UProyTisZo0',
        temario: [
          'Sistema de autenticación',
          'Validación de credenciales',
          'Manejo de errores',
          'Ejemplos prácticos'
        ]
      },
      {
        numero: 17,
        titulo: 'Ciclo FOR',
        videoUrl: 'https://www.youtube.com/embed/YWCXfLb4CVI',
        temario: [
          'Introducción al for',
          'Uso de índices',
          'Tareas repetitivas',
          'Ejemplos prácticos'
        ]
      },
      {
        numero: 18,
        titulo: 'Ciclo WHILE',
        videoUrl: 'https://www.youtube.com/embed/YWCXfLb4CVI',
        temario: [
          'Introducción al while',
          'Control de condiciones',
          'Ciclos infinitos',
          'Ejemplos prácticos'
        ]
      },
      {
        numero: 19,
        titulo: 'Ciclo DO-WHILE',
        videoUrl: 'https://www.youtube.com/embed/PqS-DAMvqOg',
        temario: [
          'Introducción al do-while',
          'Diferencias con while',
          'Menús interactivos',
          'Ejemplos prácticos'
        ]
      }
    ]
  },

  // ========== CURSO 5: C# BÁSICO (6 de 12 secciones) ==========
  {
    title: 'C# Básico - Curso Completo',
    slug: 'csharp-basico',
    description: 'Aprende C# desde cero con Visual Studio. Domina los fundamentos de C# y .NET.',
    image: '/images/cursos/csharp-curso.jpg',
    level: 'Principiante',
    duration: '12 secciones',
    price: 0,
    category: 'programacion',
    students: 3120,
    rating: 4.8,
    reviews: 623,
    instructor: {
      name: 'Laura Martínez',
      bio: 'Desarrolladora .NET con 9+ años',
      avatar: '👩‍💻'
    },
    requirements: [
      'Computadora con Windows',
      'Visual Studio instalado',
      'Conocimientos básicos de programación'
    ],
    whatYouWillLearn: [
      'Instalar Visual Studio',
      'Sintaxis básica de C#',
      'Tipos de variables',
      'Estructuras de control',
      'Ciclos y bucles',
      'POO con C#'
    ],
    secciones: [
      {
        numero: 1,
        titulo: 'Instalar Visual Studio',
        videoUrl: 'https://www.youtube.com/embed/_8YuteyK3gk',
        temario: [
          'Instalar Visual Studio',
          'Configurar entorno',
          'Familiarizarse con interfaz',
          'Ejercicios adicionales'
        ]
      },
      {
        numero: 2,
        titulo: 'Hola Mundo en C#',
        videoUrl: 'https://www.youtube.com/embed/pH6bnQOxiXM',
        temario: [
          'Crear primer programa',
          'Compilar y ejecutar',
          'Entender estructura',
          'Ejercicios adicionales'
        ]
      },
      {
        numero: 3,
        titulo: 'Tipos de variables',
        videoUrl: 'https://www.youtube.com/embed/T8XE-b0CrBk',
        temario: [
          'Tipos: int, string, bool',
          'Declarar y usar variables',
          'Diferencia entre tipos',
          'Ejercicios adicionales'
        ]
      },
      {
        numero: 4,
        titulo: 'Operadores aritméticos',
        videoUrl: 'https://www.youtube.com/embed/OOnnF7h47gQ',
        temario: [
          'Operadores: +, -, *, /, %',
          'Realizar operaciones',
          'Aplicar en ejemplos',
          'Ejercicios adicionales'
        ]
      },
      {
        numero: 5,
        titulo: 'Operadores incremento',
        videoUrl: 'https://www.youtube.com/embed/xSlUwjCvEd8',
        temario: [
          'Usar ++ y --',
          'Cómo afectan variables',
          'Aplicar en ciclos',
          'Ejercicios adicionales'
        ]
      },
      {
        numero: 6,
        titulo: 'Condicionales: if-else',
        videoUrl: 'https://www.youtube.com/embed/UxmYfdhzFxc',
        temario: [
          'Usar if-else',
          'Tomar decisiones',
          'Practicar con ejemplos',
          'Ejercicios adicionales'
        ]
      }
    ]
  },

  // ========== CURSO 6: SPRING BOOT (3 de 6 secciones) ==========
  {
    title: 'Spring Boot - Curso Básico',
    slug: 'spring-boot-basico',
    description: 'Aprende Spring Boot desde cero. Crea aplicaciones web empresariales.',
    image: '/images/cursos/spring-curso.jpg',
    level: 'Intermedio',
    duration: '6 secciones',
    price: 0,
    category: 'programacion',
    students: 2890,
    rating: 4.9,
    reviews: 567,
    instructor: {
      name: 'Andrea Gómez',
      bio: 'Arquitecta de Software Spring',
      avatar: '👩‍💼'
    },
    requirements: [
      'Conocimientos de Java',
      'Spring Tools Suite instalado',
      'Comprensión de POO',
      'MySQL Workbench'
    ],
    whatYouWillLearn: [
      'Instalar Spring Tools Suite',
      'Crear proyecto Spring Boot',
      'Sistema de registro',
      'Inyección de dependencias',
      'Integrar HTML y Bootstrap',
      'Conectar con MySQL'
    ],
    secciones: [
      {
        numero: 1,
        titulo: 'Descargar Spring Tools Suite',
        videoUrl: 'https://www.youtube.com/embed/fLVHXoNq9rE',
        temario: [
          'Instalar Spring Tools Suite',
          'Configurar entorno',
          'Familiarizarse con interfaz',
          'Verificar instalación'
        ]
      },
      {
        numero: 2,
        titulo: 'Hola Mundo Spring Boot',
        videoUrl: 'https://www.youtube.com/embed/Bo2J69MOzic',
        temario: [
          'Crear primer programa',
          'Compilar y ejecutar',
          'Entender estructura',
          'Modificar el mensaje'
        ]
      },
      {
        numero: 3,
        titulo: 'Registro y listado',
        videoUrl: 'https://www.youtube.com/embed/EAVovddUDTE',
        temario: [
          'Crear sistema de registro',
          'Configurar controlador HTTP',
          'Implementar vistas básicas',
          'Agregar validaciones'
        ]
      }
    ]
  }
];

const seedCursosCompletos = async () => {
  try {
    console.log('🔄 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    console.log('🗑️  Limpiando cursos existentes...');
    await Curso.deleteMany({});

    console.log('📚 Insertando cursos completos...');
    await Curso.insertMany(cursosCompletos);

    console.log('✅ Cursos insertados exitosamente!');
    console.log(`📊 Total de cursos: ${cursosCompletos.length}`);
    
    console.log('\n🎓 Cursos disponibles:');
    cursosCompletos.forEach((curso, i) => {
      console.log(`   ${i + 1}. ${curso.title} (${curso.secciones.length} secciones)`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedCursosCompletos();