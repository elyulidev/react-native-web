import type { CurriculumTopic } from "../../../../types/types";

export const conference17: CurriculumTopic = {
	id: "conf-17",
	title: "Conf. 17: Introducción a BD Locales",
	content: [
		{ type: "heading", text: "Introducción a Bases de Datos Locales" },
		{
			type: "paragraph",
			text: "En el desarrollo móvil, no siempre podemos depender de una conexión a internet. La persistencia de datos local nos permite guardar información directamente en el dispositivo del usuario, creando aplicaciones más rápidas, fiables y funcionales incluso sin conexión.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "1. ¿Por qué es Fundamental la Persistencia Local?",
		},
		{
			type: "paragraph",
			text: "La persistencia de datos local es un pilar en el desarrollo de aplicaciones móviles robustas. Sus ventajas clave impactan directamente en la experiencia del usuario y el rendimiento de la aplicación.",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "BoltIcon",
					title: "Soporte Offline",
					text: "Permite que la aplicación funcione sin conexión a internet. Los datos importantes se almacenan en el dispositivo, asegurando la disponibilidad continua.",
				},
				{
					icon: "ArrowPathIcon",
					title: "Rendimiento Mejorado",
					text: "Acceder a datos locales es significativamente más rápido que consultar un servidor remoto, lo que reduce la latencia y acelera los tiempos de carga.",
				},
				{
					icon: "SparklesIcon",
					title: "Experiencia Fluida",
					text: "Almacenar datos como la sesión del usuario o preferencias localmente evita recargas innecesarias y mantiene un estado consistente entre sesiones.",
				},
				{
					icon: "RectangleStackIcon",
					title: "Gestión de Estado Global",
					text: "Ideal para almacenar información que necesita ser accesible globalmente, como datos de perfil, sin necesidad de peticiones repetitivas.",
				},
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Explorando Opciones Populares" },
		{
			type: "paragraph",
			text: "Existen diversas opciones para la persistencia de datos en React Native. Las dos más comunes son AsyncStorage y SQLite, cada una con un propósito diferente.",
		},
		{
			type: "twoColumn",
			columns: [
				{
					title: "AsyncStorage (Clave-Valor Simple)",
					content: [
						"Un sistema de almacenamiento simple, asíncrono y no relacional.",
						"**Ideal para:** Pequeñas cantidades de datos como preferencias de usuario (ej. tema claro/oscuro), tokens de autenticación o datos de sesión.",
						"**Analogía:** Similar al `localStorage` del navegador web.",
					],
				},
				{
					title: "SQLite (Base de Datos Relacional)",
					content: [
						"Una base de datos relacional completa, robusta y potente.",
						"**Ideal para:** Grandes volúmenes de datos estructurados, relaciones complejas entre datos y consultas avanzadas.",
						"**Ejemplo:** Guardar una lista de tareas, productos de un e-commerce o mensajes de un chat.",
					],
				},
			],
		},
		{
			type: "callout",
			alertType: "info",
			text: "Otras opciones como MMKV (rápido clave-valor) y WatermelonDB (reactivo, para grandes datasets) también existen, pero para este bootcamp nos centraremos en la potencia de SQLite.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. ¿Qué es un ORM y por qué usar Drizzle?" },
		{
			type: "paragraph",
			text: "Un ORM (Object-Relational Mapper) como Drizzle actúa como un traductor entre nuestro código (JavaScript/TypeScript) y la base de datos relacional (SQL). Nos permite interactuar con las tablas y datos usando objetos y métodos, en lugar de escribir consultas SQL crudas.",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "CodeBracketIcon",
					title: "Abstracción de SQL",
					text: "En lugar de escribir `INSERT INTO users...`, usas un método como `db.insert(users)...`. Esto reduce errores y acelera el desarrollo.",
				},
				{
					icon: "ShieldCheckIcon",
					title: "Seguridad de Tipos",
					text: "Drizzle se integra perfectamente con TypeScript, detectando errores de tipo antes de que tu código se ejecute. ¡No más insertar un número en una columna de texto por error!",
				},
				{
					icon: "RectangleGroupIcon",
					title: "Esquemas en Código",
					text: "Defines la estructura de tu base de datos directamente en archivos TypeScript, lo que facilita el control de versiones y la colaboración.",
				},
				{
					icon: "UsersIcon",
					title: "Código Reutilizable",
					text: "Define tu esquema una vez y reutilízalo en toda tu aplicación, asegurando consistencia y reduciendo la duplicación de código.",
				},
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Instalación del Módulo `expo-sqlite`" },
		{
			type: "paragraph",
			text: "Para que Drizzle ORM pueda comunicarse con la base de datos SQLite en el dispositivo, primero debemos instalar la librería que proporciona esa conexión:",
		},
		{ type: "code", language: "bash", code: "npx expo install expo-sqlite" },
		{
			type: "callout",
			alertType: "tip",
			text: "Este paquete es el puente fundamental que permite a nuestra aplicación React Native acceder y manipular una base de datos SQLite local. En la próxima conferencia, instalaremos Drizzle sobre esta base.",
		},
		{ type: "divider" },
		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Cuál de estas opciones NO es una ventaja principal de la persistencia de datos local?",
					options: [
						"Soporte Offline",
						"Mejora en el rendimiento",
						"Aumento de la seguridad del servidor",
						"Mantenimiento de estado entre sesiones",
					],
					correctAnswer: 2,
				},
				{
					question:
						"¿Para qué caso de uso es más adecuado `AsyncStorage` que SQLite?",
					options: [
						"Almacenar una lista de 10,000 productos con categorías.",
						"Guardar la preferencia del usuario para el tema (claro/oscuro).",
						"Gestionar mensajes de un chat con sus usuarios.",
						"Almacenar datos de transacciones financieras.",
					],
					correctAnswer: 1,
				},
				{
					question: "Un ORM como Drizzle principalmente ayuda a:",
					options: [
						"Mejorar la velocidad de la base de datos.",
						"Traducir código JavaScript/TypeScript a consultas SQL y añadir seguridad de tipos.",
						"Encriptar la base de datos local.",
						"Conectarse a bases de datos en la nube.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"¿Qué comando se utiliza para instalar la librería base que permite a una app de Expo usar SQLite?",
					options: [
						"npm install sqlite3",
						"npx expo install drizzle-orm",
						"npm install react-native-sqlite-storage",
						"npx expo install expo-sqlite",
					],
					correctAnswer: 3,
				},
			],
		},
	],
};
