import type { CurriculumTopic } from "../../../../types/types";

export const conference48: CurriculumTopic = {
	id: "conf-48",
	title: "Conf. 48: Recapitulación y Próximos Pasos",
	content: [
		{ type: "heading", text: "Recapitulación y Ruta de Aprendizaje Continuo" },
		{
			type: "paragraph",
			text: "¡Felicidades por llegar al final del bootcamp! Has recorrido un largo camino, desde los fundamentos de React Native hasta la construcción de aplicaciones completas con bases de datos locales y arquitecturas robustas. Esta última sesión es para consolidar lo que has aprendido y darte una hoja de ruta para tu continuo crecimiento como desarrollador móvil.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Nuestro Viaje a Través del Bootcamp" },
		{
			type: "list",
			items: [
				{
					text: "**Módulo 1: Fundamentos**",
					subItems: [
						"Aprendimos qué es React Native, cómo se diferencia de la web, y configuramos nuestro entorno con Expo. Dominamos los componentes básicos de UI y la estilización con StyleSheet y NativeWind.",
					],
				},
				{
					text: "**Módulo 2: Navegación**",
					subItems: [
						"Construimos la estructura de nuestras aplicaciones con Expo Router. Implementamos navegación de Pila (Stack) y Pestañas (Tabs), manejamos rutas dinámicas y aprendimos a organizar nuestro código con grupos de rutas.",
					],
				},
				{
					text: "**Módulo 3: Persistencia de Datos**",
					subItems: [
						"Nos sumergimos en el almacenamiento local. Configuramos SQLite con Drizzle ORM, definimos esquemas, generamos migraciones y realizamos todas las operaciones CRUD (Crear, Leer, Actualizar, Borrar) para dar persistencia a nuestras aplicaciones.",
					],
				},
				{
					text: "**Módulo 4: APIs y Optimización**",
					subItems: [
						"Conectamos nuestras aplicaciones al mundo exterior consumiendo APIs REST. Aprendimos a manejar estados de carga y errores, optimizamos el rendimiento de listas con `FlatList` y aplicamos `debouncing` para una mejor experiencia de usuario.",
					],
				},
				{
					text: "**Módulo 5: Tópicos Avanzados**",
					subItems: [
						"Elevamos nuestro nivel profesional. Discutimos la arquitectura de aplicaciones, exploramos la gestión de estado avanzada con Zustand, aprendimos a depurar y manejar errores, y construimos proyectos complejos aplicando principios de código limpio y diseño responsivo.",
					],
				},
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "La Ruta de Aprendizaje Continuo" },
		{
			type: "paragraph",
			text: "La tecnología nunca se detiene, y un gran desarrollador siempre está aprendiendo. Aquí hay algunas áreas clave en las que puedes profundizar para seguir creciendo:",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "CodeBracketIcon",
					title: "Pruebas (Testing)",
					text: "Aprende a escribir pruebas unitarias y de integración para tus componentes y lógica con herramientas como Jest y React Native Testing Library. Las pruebas son cruciales para construir aplicaciones fiables.",
				},
				{
					icon: "SparklesIcon",
					title: "Animaciones Avanzadas",
					text: "Exploramos lo básico de `react-native-reanimated`. Profundiza en gestos complejos con `react-native-gesture-handler` y renderizado de alto rendimiento con `react-native-skia`.",
				},
				{
					icon: "RectangleStackIcon",
					title: "Gestión de Estado a Gran Escala",
					text: "Para aplicaciones muy grandes, explora soluciones más estructuradas como Redux Toolkit. Comprender sus patrones te hará un desarrollador más versátil.",
				},
				{
					icon: "BoltIcon",
					title: "Rendimiento Nativo",
					text: "Aprende a usar los perfiles de rendimiento (Performance Profilers) para identificar y solucionar cuellos de botella en tus aplicaciones. En casos extremos, aprende los conceptos básicos de cómo escribir tus propios Módulos Nativos.",
				},
				{
					icon: "UsersIcon",
					title: "Backend y Despliegue Completo",
					text: "Explora servicios de Backend-as-a-Service como Supabase o Firebase para añadir autenticación real, bases de datos en la nube y notificaciones push. Aprende el proceso completo de despliegue en la App Store de Apple y Google Play Store con EAS.",
				},
			],
		},
		{
			type: "callout",
			alertType: "tip",
			text: "El mejor consejo es: ¡sigue construyendo! Elige un proyecto personal que te apasione y aplica lo que has aprendido. La experiencia práctica es la forma más rápida de solidificar tus conocimientos.",
		},
		{ type: "divider" },

		{ type: "heading", text: "Examen Final: ¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Cuál es el componente principal en React Native para crear contenedores y aplicar estilos de layout, similar a un `<div>` en la web?",
					options: ["<Text>", "<View>", "<Container>", "<Box>"],
					correctAnswer: 1,
				},
				{
					question:
						"En Expo Router, ¿cómo se crea una ruta dinámica para mostrar el detalle de un producto con un ID específico?",
					options: [
						"app/products/(id).tsx",
						"app/products/[id].tsx",
						"app/products/{id}.tsx",
						"app/products/id.tsx",
					],
					correctAnswer: 1,
				},
				{
					question:
						"¿Cuál es la principal ventaja de usar `FlatList` en lugar de `ScrollView` para mostrar una lista larga de datos?",
					options: [
						"`FlatList` es más fácil de estilizar.",
						"`FlatList` solo renderiza los elementos visibles en pantalla, mejorando el rendimiento.",
						"`ScrollView` no permite el desplazamiento vertical.",
						"`FlatList` tiene soporte para animaciones por defecto.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"¿Qué comando de Drizzle Kit se utiliza para generar los archivos de migración SQL a partir de los cambios en tu esquema?",
					options: [
						"drizzle-kit push",
						"drizzle-kit apply",
						"drizzle-kit generate",
						"drizzle-kit migrate",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Para aplicar clases de Tailwind CSS en un componente de React Native usando NativeWind, ¿qué prop se utiliza?",
					options: ["style", "tw", "className", "css"],
					correctAnswer: 2,
				},
			],
		},
	],
};
