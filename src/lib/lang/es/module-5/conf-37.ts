import type { CurriculumTopic } from "../../../../types/types";

export const conference37: CurriculumTopic = {
	id: "conf-37",
	title: "Conf. 37: Arquitectura de Aplicaciones",
	content: [
		{ type: "heading", text: "Arquitectura de Aplicaciones Móviles" },
		{
			type: "paragraph",
			text: "Una buena arquitectura es la base de una aplicación escalable, mantenible y fácil de depurar. No se trata de reglas estrictas, sino de principios que guían cómo organizamos nuestro código para evitar el caos a medida que el proyecto crece.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Principios de Diseño Clave" },
		{
			type: "list",
			items: [
				"**Separación de incumbencias (Separation of Concerns):** Cada parte de tu aplicación debe tener una única responsabilidad. La lógica de la UI debe estar separada de la lógica de negocio y del acceso a datos.",
				"**Component-Driven Development (CDD):** Piensa en tu UI como un conjunto de bloques de Lego. Construye componentes pequeños, aislados y reutilizables (Botones, Tarjetas, Avatares) y luego compónlos para crear pantallas complejas.",
				"**Centralización de la Lógica:** Evita duplicar código. Si varias partes de tu app necesitan la misma lógica (ej. formatear una fecha), créala una vez en un archivo de utilidades (`utils`) y impórtala donde la necesites.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Estructura de Carpetas Recomendada" },
		{
			type: "paragraph",
			text: "Una estructura de carpetas bien definida es la manifestación física de una buena arquitectura. Aquí tienes una estructura robusta y comúnmente utilizada en proyectos de React Native:",
		},
		{
			type: "fileStructure",
			files: [
				{
					id: "app",
					name: "app/",
					description: [
						"Contiene las rutas y la navegación de la aplicación, gestionado por Expo Router. Cada archivo aquí es una pantalla.",
					],
				},
				{
					id: "assets",
					name: "assets/",
					description: [
						"Almacena todos los archivos estáticos como imágenes, fuentes e íconos.",
					],
				},
				{
					id: "components",
					name: "components/",
					description: [
						"El corazón de tu UI. Contiene componentes reutilizables. A menudo se subdivide en `ui/` (genéricos como Button, Input) y `shared/` (específicos de la app como MovieCard).",
					],
				},
				{
					id: "constants",
					name: "constants/",
					description: [
						"Guarda valores que no cambian, como paletas de colores, claves de API, o URLs base.",
					],
				},
				{
					id: "contexts",
					name: "contexts/",
					description: [
						"Para la gestión de estado global con React Context. Cada contexto (ej. `AuthContext`, `ThemeContext`) tiene su propio archivo.",
					],
				},
				{
					id: "db",
					name: "db/",
					description: [
						"Toda la lógica de la base de datos local vive aquí. Incluye `schema.ts`, la conexión (`index.ts`) y scripts de seeding.",
					],
				},
				{
					id: "hooks",
					name: "hooks/",
					description: [
						"Almacena hooks personalizados (`useDebounce`, `useTheme`, `useApi`) para encapsular y reutilizar lógica de estado.",
					],
				},
				{
					id: "services",
					name: "services/",
					description: [
						"Centraliza la comunicación con APIs externas. Cada función aquí se encarga de una petición de red específica.",
					],
				},
				{
					id: "types",
					name: "types/",
					description: [
						"Define las interfaces y tipos de TypeScript que se usan en toda la aplicación (ej. `User`, `Movie`, `Property`).",
					],
				},
				{
					id: "utils",
					name: "utils/",
					description: [
						"Contiene funciones de ayuda puras y reutilizables que no dependen del estado de React, como formateadores de fecha o validadores.",
					],
				},
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Flujo de Datos Típico" },
		{
			type: "paragraph",
			text: "Con esta arquitectura, el flujo de datos para mostrar una lista de películas, por ejemplo, sería así:",
		},
		{
			type: "list",
			items: [
				"**1. Pantalla (`app/index.tsx`):** El componente de la pantalla se monta.",
				"**2. Hook (`hooks/useMovies.ts`):** La pantalla llama a un hook personalizado `useMovies()` para obtener los datos.",
				"**3. Servicio (`services/api.ts`):** El hook `useMovies` llama a la función `fetchPopularMovies()` del servicio de API.",
				"**4. API Externa:** El servicio realiza la petición `fetch` a la API de TMDB.",
				"**5. Tipos (`types/index.ts`):** Los datos recibidos se validan contra la interfaz `Movie` definida.",
				"**6. Estado del Hook:** El hook actualiza su estado interno (`data`, `loading`, `error`) y lo devuelve a la pantalla.",
				"**7. Renderizado en UI:** La pantalla recibe los datos y los pasa a los componentes de UI (`components/MovieCard.tsx`) para su renderizado.",
			],
		},
		{
			type: "callout",
			alertType: "info",
			text: "Este flujo unidireccional y la separación clara de responsabilidades hacen que la aplicación sea mucho más fácil de entender, depurar y escalar.",
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿En qué carpeta colocarías un hook personalizado como `useDebounce`?",
					options: ["components/", "utils/", "hooks/", "services/"],
					correctAnswer: 2,
				},
				{
					question:
						"Una función que formatea un número a un string de moneda (ej. 100 a '$100.00') es un buen candidato para estar en la carpeta...",
					options: ["hooks/", "constants/", "utils/", "components/"],
					correctAnswer: 2,
				},
				{
					question:
						"El principio de 'Separación de incumbencias' sugiere que...",
					options: [
						"Debes separar tu código en tantos archivos como sea posible.",
						"La lógica de la UI, la lógica de negocio y el acceso a datos deben estar en partes distintas y bien definidas de tu código.",
						"Cada componente debe tener su propio archivo de estilos.",
						"Debes usar un hook para cada pieza de estado.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"La lógica para hacer una petición `fetch` a una API de usuarios debería vivir en...",
					options: [
						"El componente de la pantalla de perfil.",
						"Un hook `useUsers`.",
						"La carpeta `db/`.",
						"Un archivo dentro de la carpeta `services/`.",
					],
					correctAnswer: 3,
				},
			],
		},
	],
};
