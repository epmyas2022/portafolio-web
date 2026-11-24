import type { OperatorMode } from '@/components/composable/useSpriteAnimator'

export type DossierSectionId = 'about' | 'projects' | 'architecture' | 'timeline' | 'contact'

export interface DossierProject {
  id: string
  code: string
  title: string
  category: 'TOOLING // BACKEND' | 'OFFENSIVE SECURITY' | 'MACHINE LEARNING' | 'FRONTEND & MOBILE'
  year: string
  problem: string
  implementation: string
  outcome: string
  stack: string[]
  repositoryUrl: string
  operatorAnimation: OperatorMode
}

export interface TimelineEntry {
  period: string
  code: string
  role: string
  organization: string
  summary: string
  technicalFocus: string[]
}

export const operatorProfile = {
  name: 'ISAAC CASTILLO',
  role: 'SOFTWARE & SYSTEMS DEVELOPER',
  serialCode: 'Y D22-7.03 // SV-SAL',
  signalStatus: 'SIGNAL NOMINAL // 13.6929° N, 89.2182° W',
  skillMask: '**********',
  headline:
    'Escribo software para infraestructura pública, automatizo documentación de APIs y audito dónde fallan los sistemas antes de que lleguen a producción.',
  email: 'castillo20182017@gmail.com',
  githubUrl: 'https://github.com/epmyas2022',
  linkedinUrl: 'https://www.linkedin.com/in/isaac-castillo-b4a213225/',
  location: 'San Salvador, El Salvador',
  footerSummary:
    'Isaac Castillo desarrolla sistemas full-stack y herramientas de automatización desde San Salvador. Su trayectoria combina ingeniería en la Secretaría de Innovación de la Presidencia de El Salvador con desarrollo de paquetes open-source para Laravel, modelos de clasificación NLP en TensorFlow y pruebas de concepto de seguridad ofensiva en Python y Node.js.'
}

export const dossierProjects: DossierProject[] = [
  {
    id: 'laravel-swagger',
    code: 'CASE-01 // API_AST_GEN',
    title: 'Auto-Generate Swagger for Laravel',
    category: 'TOOLING // BACKEND',
    year: '2024',
    problem:
      'Mantener especificaciones OpenAPI a mano en proyectos Laravel grandes provoca desincronización constante entre los controladores reales y la documentación que consume frontend.',
    implementation:
      'Construí un paquete en PHP para Laravel que inspecciona rutas, reglas de validación y respuestas para compilar automáticamente el esquema compatible con Swagger UI sin ensuciar los controladores con bloques gigantes de anotaciones.',
    outcome:
      'Elimina la escritura manual repetitiva de contratos OpenAPI y mantiene el endpoint de pruebas sincronizado en cada despliegue.',
    stack: ['PHP', 'Laravel', 'OpenAPI / Swagger UI', 'Composer Package'],
    repositoryUrl: 'https://github.com/epmyas2022/laravel-swagger',
    operatorAnimation: 'computo'
  },
  {
    id: 'uped-audit',
    code: 'CASE-02 // SEC_AUDIT_UPED',
    title: 'Auditoría de Sesión & Exposición en Portal Universitario',
    category: 'OFFENSIVE SECURITY',
    year: '2023',
    problem:
      'El portal académico de la Universidad Pedagógica de El Salvador presentaba validaciones débiles en el manejo de sesiones y consultas parametrizadas.',
    implementation:
      'Desarrollé un script de prueba de concepto en Node.js que automatizó la verificación de vectores de inyección SQL y demostró cómo era posible recuperar metadatos de sesión y registros estudiantiles sin autorización.',
    outcome:
      'Evidencia técnica reproducible para documentar el vector de exposición y demostrar el impacto real de no sanitizar entradas ni rotar tokens.',
    stack: ['Node.js', 'SQL Injection PoC', 'HTTP Session Analysis', 'JSON'],
    repositoryUrl: 'https://github.com/epmyas2022/uped-vunerabilidad',
    operatorAnimation: 'computo'
  },
  {
    id: 'emotion-ml',
    code: 'CASE-03 // NLP_TENSOR_25K',
    title: 'API de Clasificación de Emociones con TensorFlow',
    category: 'MACHINE LEARNING',
    year: '2024',
    problem:
      'Clasificar polaridad emocional en texto corto en tiempo real sin depender de APIs comerciales externas de alto costo por token.',
    implementation:
      'Entrené una red neuronal en Python con TensorFlow utilizando un corpus de 25,000 textos etiquetados en tres clases (positivo, negativo, neutral) y expuse la inferencia mediante una API REST ligera.',
    outcome:
      'Modelo propio entrenado sobre 25,000 muestras capaz de responder inferencias desde un endpoint HTTP integrable en cualquier cliente.',
    stack: ['Python', 'TensorFlow', 'NLP Tokenization', 'REST API'],
    repositoryUrl: 'https://github.com/epmyas2022/tweets',
    operatorAnimation: 'computo'
  },
  {
    id: 'reverse-shell',
    code: 'CASE-04 // SOCKET_PAYLOAD',
    title: 'Reverse Shell & Control de Sockets en Python',
    category: 'OFFENSIVE SECURITY',
    year: '2023',
    problem:
      'Comprender a bajo nivel cómo operan las conexiones salientes persistentes y la ejecución remota de comandos sobre sockets TCP puros.',
    implementation:
      'Implementé en Python una arquitectura cliente-servidor sobre sockets nativos donde el payload establece un canal inverso hacia el listener controlador y serializa la salida estándar de subprocesos.',
    outcome:
      'Laboratorio funcional para pruebas de red y análisis del comportamiento de canales C2 básicos en entornos controlados.',
    stack: ['Python', 'Raw TCP Sockets', 'Subprocess I/O'],
    repositoryUrl: 'https://github.com/epmyas2022/reverse_shell',
    operatorAnimation: 'computo'
  },
  {
    id: 'animate-tailwind',
    code: 'CASE-05 // CSS_KEYFRAME_PKG',
    title: 'Plugin de Animaciones para Tailwind CSS',
    category: 'FRONTEND & MOBILE',
    year: '2024',
    problem:
      'Repetir definiciones de keyframes y utilidades de transición entre distintos proyectos con Tailwind CSS.',
    implementation:
      'Empaqueté un plugin en Node.js que inyecta utilidades listas para usar directamente en el árbol de clases de Tailwind sin hojas de estilo adicionales.',
    outcome:
      'Distribución reutilizable en cualquier configuración de tailwind.config.js con cero dependencias en runtime.',
    stack: ['Node.js', 'Tailwind CSS Plugin API', 'CSS Keyframes'],
    repositoryUrl: 'https://github.com/epmyas2022/animate-tailwind',
    operatorAnimation: 'computo'
  },
  {
    id: 'porfolio-json',
    code: 'CASE-06 // SCHEMA_TO_PRINT',
    title: 'Generador de CV Imprimible desde Esquema JSON',
    category: 'FRONTEND & MOBILE',
    year: '2023',
    problem:
      'Editar currículums en procesadores de texto rompe el diseño cada vez que se agrega experiencia.',
    implementation:
      'Construí una aplicación en Vue 3 que desacopla los datos profesionales en un archivo JSON estricto y los renderiza en una hoja optimizada para exportación a PDF e impresión nativa.',
    outcome:
      'Flujo determinista: editás un objeto JSON y obtenés un documento técnico listo para imprimir.',
    stack: ['Vue 3', 'Node.js', 'JSON Schema', 'Print CSS'],
    repositoryUrl: 'https://github.com/epmyas2022/porfolio-json',
    operatorAnimation: 'computo'
  }
]

export const timelineEntries: TimelineEntry[] = [
  {
    period: '2024 — PRESENTE',
    code: 'LOG-04 // GOVTECH_SV',
    role: 'Desarrollador de Software',
    organization: 'Secretaría de Innovación de la Presidencia (El Salvador)',
    summary:
      'Diseño e implementación de plataformas digitales e integraciones para modernizar trámites y operaciones del sector público salvadoreño.',
    technicalFocus: ['Sistemas Gubernamentales', 'Arquitectura Full-Stack', 'APIs de Alta Disponibilidad']
  },
  {
    period: '2023 — 2024',
    code: 'LOG-03 // FULLSTACK_OPS',
    role: 'Ingeniería Full-Stack & Herramientas Open Source',
    organization: 'Proyectos Independientes & Comunidad',
    summary:
      'Creación de paquetes para el ecosistema Laravel/Tailwind, aplicaciones móviles multiplataforma en Flutter y entrenamiento de modelos NLP con TensorFlow.',
    technicalFocus: ['Vue 3', 'Laravel', 'Flutter', 'TensorFlow / Python']
  },
  {
    period: '2022 — 2023',
    code: 'LOG-02 // BACKEND_SEC',
    role: 'Especialización en Backend & Seguridad de Aplicaciones',
    organization: 'Laboratorio de Sistemas',
    summary:
      'Diseño de servicios RESTful, modelado de bases de datos SQL/NoSQL y auditoría práctica de vulnerabilidades web (SQLi, sesiones, sockets).',
    technicalFocus: ['Node.js', 'PHP', 'Python Sockets', 'Auditoría Web']
  },
  {
    period: '2021 — 2022',
    code: 'LOG-01 // KERNEL_INIT',
    role: 'Fundamentos de Ingeniería Web',
    organization: 'San Salvador, El Salvador',
    summary:
      'Dominio de estándares web, protocolo HTTP, estructura del DOM, JavaScript asíncrono y control de versiones.',
    technicalFocus: ['JavaScript', 'HTML/CSS', 'Git', 'HTTP']
  }
]

export const technicalCapabilities = [
  {
    domain: '01 // BACKEND & ARQUITECTURA DE SERVICIOS',
    tools: 'Laravel, PHP, Node.js, Python, REST APIs, OpenAPI/Swagger',
    note: 'Diseño de contratos claros, automatización de documentación y desacople entre capas de datos y transporte.'
  },
  {
    domain: '02 // FRONTEND & INTERFACES DE PRECISIÓN',
    tools: 'Vue 3, TypeScript, Tailwind CSS, GSAP, Flutter',
    note: 'Componentes tipados, estado predecible con Pinia y rendimiento cuidado en web y móvil.'
  },
  {
    domain: '03 // SEGURIDAD OFENSIVA & AUDITORÍA',
    tools: 'Python Sockets, Análisis de Sesiones, SQLi PoC, Scraping de APIs',
    note: 'Mentalidad adversarial aplicada al código propio: entender cómo se rompe un endpoint para blindarlo mejor.'
  }
]
