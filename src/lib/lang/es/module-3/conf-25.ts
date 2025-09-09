import type { CurriculumTopic } from "../../../../types/types";

export const conference25: CurriculumTopic = {
	id: "conf-25",
	title: "Conf. 25: Drizzle Studio",
	content: [
		{ type: "heading", text: "Drizzle Studio y Depuración de Datos Locales" },
		{
			type: "paragraph",
			text: "Objetivo: Aprender a utilizar Drizzle Studio, una potente herramienta visual que nos permite inspeccionar, manipular y depurar nuestra base de datos SQLite local de manera interactiva, agilizando enormemente el ciclo de desarrollo.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. ¿Qué es Drizzle Studio?" },
		{
			type: "paragraph",
			text: 'Drizzle Studio es una interfaz gráfica de usuario (GUI) similar a un administrador de bases de datos, pero diseñada específicamente para proyectos Drizzle. Se ejecuta localmente y se conecta a tu base de datos, proporcionando una vista de "hoja de cálculo" de tus tablas y datos.',
		},
		{
			type: "image",
			imageUrl: "https://orm.drizzle.team/images/drizzle-studio-light.webp",
			caption: "Interfaz de Drizzle Studio mostrando tablas y datos.",
		},
		{
			type: "callout",
			alertType: "info",
			text: "Drizzle Studio es una herramienta exclusiva para el entorno de desarrollo y no forma parte de tu aplicación en producción. Es una de las grandes ventajas de usar `drizzle-kit`.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Lanzando Drizzle Studio" },
		{
			type: "paragraph",
			text: "Gracias al script npm que configuramos en la Conferencia 18, lanzar Drizzle Studio es muy sencillo. Simplemente ejecuta el siguiente comando en la terminal, en la raíz de tu proyecto:",
		},
		{ type: "code", language: "bash", code: "npm run studio" },
		{
			type: "paragraph",
			text: "Este comando leerá tu archivo `drizzle.config.ts` para encontrar la ubicación de tu base de datos y tu esquema, y luego abrirá una nueva pestaña en tu navegador web en una dirección como `http://local.drizzle.studio`.",
		},
		{
			type: "paragraph",
			text: "Para que funcione con Expo, es común que necesites que tu aplicación esté corriendo en el simulador o en tu dispositivo al mismo tiempo.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Funcionalidades Clave de Drizzle Studio" },
		{
			type: "paragraph",
			text: "Una vez abierto, Drizzle Studio te ofrece un control total sobre tu base de datos local:",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "RectangleGroupIcon",
					title: "Visualización de Tablas y Esquemas",
					text: "En el panel izquierdo, verás una lista de todas las tablas definidas en tu `schema.ts`. Puedes hacer clic en ellas para ver su estructura y sus datos.",
				},
				{
					icon: "MagnifyingGlassPlusIcon",
					title: "Exploración de Datos",
					text: "El panel principal muestra los datos de la tabla seleccionada en un formato de tabla. Puedes ordenar por columnas y navegar por las páginas si tienes muchos registros.",
				},
				{
					icon: "SparklesIcon",
					title: "Manipulación de Datos (CRUD)",
					text: "Puedes añadir nuevas filas, editar celdas directamente haciendo doble clic, o eliminar filas. Esto es extremadamente útil para probar cómo reacciona tu UI a diferentes datos sin tener que codificar la lógica para crearlos primero.",
				},
				{
					icon: "LinkIcon",
					title: "Navegación por Relaciones",
					text: "Si has definido relaciones entre tus tablas, Drizzle Studio te permitirá navegar fácilmente de un registro a sus registros relacionados (por ejemplo, de un usuario a todas sus tareas).",
				},
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Caso de Uso: Depurando la App To-Do" },
		{
			type: "paragraph",
			text: "Imagina que estás desarrollando una nueva función para marcar una tarea como completada, pero no funciona. ¿El problema está en la UI o en la base de datos?",
		},
		{
			type: "list",
			items: [
				"**Paso 1:** Lanza Drizzle Studio (`npm run studio`).",
				"**Paso 2:** Navega a la tabla `tasks`.",
				"**Paso 3:** Busca la tarea con la que estás teniendo problemas y observa el valor en la columna `completed`.",
				"**Paso 4:** Intenta cambiar el valor directamente en Drizzle Studio (por ejemplo, de `0` a `1`). Si el cambio se guarda, sabes que la base de datos funciona.",
				"**Paso 5:** Recarga la UI de tu app. Si ahora la tarea aparece como completada, el problema probablemente estaba en tu lógica de `UPDATE`. Si no se refleja el cambio, el problema podría estar en tu lógica de `SELECT` o en cómo renderizas el estado en la UI.",
				"**Conclusión:** Drizzle Studio te permite aislar el problema rápidamente, ahorrándote horas de depuración a ciegas.",
			],
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question: "¿Qué es Drizzle Studio?",
					options: [
						"Una librería para optimizar consultas SQL.",
						"Una herramienta visual para inspeccionar y manipular la base de datos en desarrollo.",
						"El motor de base de datos que usa Drizzle.",
						"Un plugin de VSCode para escribir esquemas.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"¿Qué comando se usa para iniciar Drizzle Studio (asumiendo el script npm estándar)?",
					options: [
						"npm run generate",
						"npm run start",
						"npm run studio",
						"npm run debug",
					],
					correctAnswer: 2,
				},
				{
					question:
						"¿Qué información utiliza Drizzle Studio para conectarse a tu base de datos?",
					options: [
						"El archivo `package.json`.",
						"El archivo `app.json`.",
						"El archivo `drizzle.config.ts`.",
						"Pregunta al usuario cada vez que se inicia.",
					],
					correctAnswer: 2,
				},
				{
					question:
						"¿Cuál de las siguientes acciones NO puedes realizar directamente en Drizzle Studio?",
					options: [
						"Añadir una nueva fila a una tabla.",
						"Editar el valor de una celda.",
						"Eliminar una fila.",
						"Añadir una nueva columna a una tabla (modificar el esquema).",
					],
					correctAnswer: 3,
				},
			],
		},
	],
};
