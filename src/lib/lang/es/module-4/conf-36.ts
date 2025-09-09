import type { CurriculumTopic } from "../../../../types/types";

export const conference36: CurriculumTopic = {
	id: "conf-36",
	title: "Conf. 36: Taller APIs",
	content: [
		{
			type: "heading",
			text: "Taller: Construcción de una App de Food Delivery",
		},
		{
			type: "paragraph",
			text: 'En este taller final del módulo, aplicaremos todos los conceptos aprendidos para construir el esqueleto de una aplicación de entrega de comida. El proyecto integrará el consumo de una API externa, la gestión de estado de red, listas optimizadas con `FlatList`, `debouncing` para la búsqueda, y almacenamiento local con SQLite/Drizzle para una funcionalidad de "favoritos".',
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Objetivos del Taller" },
		{
			type: "list",
			items: [
				"**Pantalla Principal:** Mostrar una lista de categorías de comida y los platos más populares, obtenidos de la API [TheMealDB](https://www.themealdb.com/api.php).",
				"**Búsqueda y Filtros:** Implementar una barra de búsqueda con `debouncing` y filtros por categoría.",
				"**Lista de Resultados:** Usar `FlatList` para mostrar los resultados de la búsqueda/filtro de manera eficiente.",
				"**Pantalla de Detalles:** Crear una ruta dinámica para mostrar los detalles completos de una receta.",
				"**Favoritos Locales:** Permitir al usuario guardar sus recetas favoritas en una base de datos SQLite local usando Drizzle ORM.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Guía de Implementación (Paso a Paso)" },

		{ type: "paragraph", text: "**1. Configuración del Proyecto y la API:**" },
		{
			type: "list",
			items: [
				"Asegúrate de tener un proyecto Expo con TypeScript, NativeWind, Drizzle ORM y `expo-sqlite` configurados.",
				"No necesitas una clave de API para la versión 1 de TheMealDB, lo que simplifica la configuración.",
				"Crea un servicio de API (`services/mealApi.ts`) para encapsular todas las llamadas a `fetch`.",
			],
		},

		{
			type: "paragraph",
			text: "**2. Esquema de la Base de Datos para Favoritos:**",
		},
		{
			type: "list",
			items: [
				"Define una tabla `favorite_recipes` en tu `db/schema.ts` para almacenar el ID, nombre, y miniatura de la receta.",
				"Genera la migración con `npm run generate`.",
			],
		},

		{ type: "paragraph", text: "**3. Pantalla Principal (`app/index.tsx`):**" },
		{
			type: "list",
			items: [
				"Usa `useEffect` para cargar las categorías de comida y una lista de platos por defecto al iniciar la pantalla.",
				"Muestra las categorías en un `ScrollView` horizontal.",
				"Muestra los platos en un `FlatList`.",
				"Añade un `TextInput` para la búsqueda.",
			],
		},

		{ type: "paragraph", text: "**4. Lógica de Búsqueda y Filtro:**" },
		{
			type: "list",
			items: [
				"Utiliza el hook `useDebounce` para el valor del `TextInput`.",
				'Crea un `useEffect` que dependa del término de búsqueda "debounced" y de la categoría seleccionada.',
				"Dentro del `useEffect`, implementa la lógica para llamar a la API correcta (`search.php?s=` o `filter.php?c=`) y actualizar el estado de los resultados.",
				"Gestiona los estados de `loading`, `error` y `data` para proporcionar feedback al usuario.",
			],
		},

		{
			type: "paragraph",
			text: "**5. Pantalla de Detalles (`app/recipe/[id].tsx`):**",
		},
		{
			type: "list",
			items: [
				"Crea la ruta dinámica.",
				"Usa `useLocalSearchParams` para obtener el ID de la receta.",
				"Realiza una llamada a la API (`lookup.php?i=`) para obtener los detalles completos de la receta (ingredientes, instrucciones).",
				"Diseña una UI atractiva para mostrar toda la información.",
			],
		},

		{ type: "paragraph", text: "**6. Lógica de Favoritos:**" },
		{
			type: "list",
			items: [
				"En la pantalla de detalles, añade un botón (ej. un ícono de corazón).",
				"Crea un estado `isFavorite` y usa un `useEffect` para comprobar si la receta actual ya existe en tu tabla `favorite_recipes` de Drizzle.",
				"Implementa la función `onPress` del botón para que inserte o elimine el registro de la base de datos local y actualice el estado `isFavorite`.",
			],
		},
		{ type: "divider" },

		{
			type: "callout",
			alertType: "tip",
			text: "Este taller es una excelente oportunidad para revisar y conectar todos los conceptos del módulo. Tómate tu tiempo para entender cómo cada pieza (API, estado, UI, base de datos) interactúa con las demás. ¡No dudes en usar Drizzle Studio para verificar que tus favoritos se guardan correctamente!",
		},
	],
};
