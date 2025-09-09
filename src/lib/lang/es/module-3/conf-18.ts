import type { CurriculumTopic } from "../../../../types/types";

export const conference18: CurriculumTopic = {
	id: "conf-18",
	title: "Conf. 18: Drizzle ORM y Kit",
	content: [
		{ type: "heading", text: "Configuración de Drizzle ORM y Drizzle Kit" },
		{
			type: "paragraph",
			text: "Objetivo: Instalar y configurar Drizzle ORM y Drizzle Kit para un proyecto Expo con una base de datos SQLite, sentando las bases para la gestión de datos locales.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Instalación de las Librerías Necesarias" },
		{
			type: "paragraph",
			text: "Para trabajar con Drizzle ORM y Expo SQLite, necesitaremos instalar dos paquetes principales de Drizzle, además de `expo-sqlite` (que debimos haber instalado en la conferencia anterior).",
		},
		{
			type: "list",
			items: [
				"**`drizzle-orm`**: Este es el Object-Relational Mapper (ORM) principal. Es una dependencia de producción que nos permite interactuar con la base de datos de manera tipada.",
				"**`drizzle-kit`**: Esta es una herramienta de desarrollo (`-D`) utilizada para tareas como la generación de migraciones y la gestión de esquemas.",
			],
		},
		{
			type: "code",
			language: "bash",
			code: `npm install drizzle-orm\nnpm install -D drizzle-kit`,
		},
		{
			type: "paragraph",
			text: "También debemos asegurarnos de que `expo-sqlite` esté instalado:",
		},
		{ type: "code", language: "bash", code: "npx expo install expo-sqlite" },
		{
			type: "callout",
			alertType: "tip",
			text: "Después de la instalación, puedes verificar las versiones en tu archivo `package.json`.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Configuración de `drizzle.config.ts`" },
		{
			type: "paragraph",
			text: "El archivo `drizzle.config.ts` es crucial, ya que contiene toda la información que Drizzle Kit necesita para entender cómo interactuar con tu base de datos. Debes crearlo en la raíz de tu proyecto.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  driver: 'expo', // Importante para Expo
  schema: './db/schema.ts', // Ruta a tu archivo de esquema
  out: './drizzle', // Carpeta donde se guardarán las migraciones
});
`,
		},
		{
			type: "list",
			items: [
				"**`dialect`**: Define el tipo de base de datos (en nuestro caso, `sqlite`).",
				"**`driver`**: Especifica el driver, que para Expo es `expo`.",
				"**`schema`**: La ruta al archivo donde definirás las tablas de tu base de datos.",
				"**`out`**: La carpeta donde Drizzle Kit generará los archivos de migración SQL.",
			],
		},
		{
			type: "paragraph",
			text: "Asegúrate de crear las carpetas y el archivo que se mencionan, por ejemplo, `db/schema.ts`.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Creación de Scripts NPM" },
		{
			type: "paragraph",
			text: "Para simplificar la ejecución de los comandos de Drizzle Kit, los añadimos como scripts en nuestro `package.json`.",
		},
		{
			type: "code",
			language: "json",
			code: `
"scripts": {
  "start": "expo start",
  "android": "expo run:android",
  "ios": "expo run:ios",
  "web": "expo start --web",
  "generate": "drizzle-kit generate",
  "migrate": "drizzle-kit migrate",
  "studio": "drizzle-kit studio"
},
`,
		},
		{
			type: "list",
			items: [
				"**`generate`**: Ejecuta `npx drizzle-kit generate`. Lo usaremos para crear migraciones basadas en los cambios de nuestro esquema.",
				"**`migrate`**: Ejecuta `npx drizzle-kit migrate`. Este comando aplica las migraciones a la base de datos (más útil para desarrollo con bases de datos remotas; en Expo lo haremos en runtime).",
				"**`studio`**: Ejecuta `npx drizzle-kit studio`. Lanza una interfaz visual para explorar nuestra base de datos local.",
			],
		},
		{
			type: "paragraph",
			text: "Ahora puedes ejecutar `npm run generate` o `npm run studio` desde tu terminal.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "4. Consideraciones de Desarrollo vs. Producción",
		},
		{
			type: "paragraph",
			text: "Es importante entender cómo manejamos la base de datos en los diferentes entornos:",
		},
		{
			type: "twoColumn",
			columns: [
				{
					title: "Desarrollo",
					content: [
						"`drizzle-kit` es una dependencia de desarrollo (`-D`), no se incluye en la app final.",
						"Usamos `npm run generate` para crear migraciones cada vez que cambiamos el esquema.",
						"Las migraciones se aplican en tiempo de ejecución al iniciar la app.",
						"Drizzle Studio (`npm run studio`) es nuestra herramienta para depurar y visualizar los datos.",
					],
				},
				{
					title: "Producción",
					content: [
						"`drizzle-orm` es una dependencia de producción, es esencial para que la app funcione.",
						"Las migraciones deben aplicarse automáticamente cuando el usuario abre la aplicación por primera vez o la actualiza.",
						"No se debe almacenar información altamente sensible en la base de datos local sin encriptación.",
					],
				},
			],
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Qué paquete de Drizzle es una dependencia de desarrollo y se usa para generar migraciones?",
					options: [
						"drizzle-orm",
						"drizzle-kit",
						"expo-drizzle",
						"sqlite-drizzle",
					],
					correctAnswer: 1,
				},
				{
					question:
						"En `drizzle.config.ts`, ¿qué propiedad especifica la carpeta donde se guardarán los archivos de migración?",
					options: ["schema", "driver", "dialect", "out"],
					correctAnswer: 3,
				},
				{
					question:
						"¿Qué script de npm usarías para lanzar la interfaz visual de Drizzle para tu base de datos?",
					options: [
						"npm run generate",
						"npm run migrate",
						"npm run studio",
						"npm run start",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Para usar Drizzle con Expo, ¿qué valor debe tener la propiedad `driver` en la configuración?",
					options: ["sqlite", "expo-sqlite", "expo", "react-native"],
					correctAnswer: 2,
				},
			],
		},
	],
};
