import type { CurriculumTopic } from "../../../../types/types";

export const conference29: CurriculumTopic = {
	id: "conf-29",
	title: "Conf. 29: Estado de Servidor con TanStack Query",
	content: [
		{
			type: "heading",
			text: "Gestión de Estado de Servidor con TanStack Query",
		},
		{
			type: "paragraph",
			text: "TanStack Query (anteriormente conocido como React Query) es una potente librería para buscar, cachear, sincronizar y actualizar el estado del servidor en tus aplicaciones React. Simplifica drásticamente la lógica de manejo de datos, gestionando automáticamente los estados de carga, errores, reintentos y el cacheo.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. ¿Por qué usar TanStack Query?" },
		{
			type: "paragraph",
			text: "Manejar el estado del servidor manualmente con `useState` y `useEffect` puede volverse complejo rápidamente. TanStack Query resuelve esto ofreciendo:",
		},
		{
			type: "list",
			items: [
				"**Cacheo automático:** Evita volver a pedir datos que ya tienes.",
				"**Actualización en segundo plano:** Mantiene los datos frescos sin bloquear la UI.",
				"**Gestión de estados:** Proporciona estados claros como `isLoading`, `isError`, `isSuccess`.",
				"**Optimización de rendimiento:** Reduce las peticiones de red innecesarias.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Instalación y Configuración" },
		{
			type: "paragraph",
			text: "Dentro de tu proyecto React Native, instala la librería `@tanstack/react-query`:",
		},
		{
			type: "code",
			language: "bash",
			code: `npm install @tanstack/react-query`,
		},
		{
			type: "paragraph",
			text: "Ahora, en tu archivo de layout raíz (`app/_layout.tsx`), necesitas inicializar `QueryClientProvider` para que esté disponible en toda tu aplicación.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';

// 1. Crea una instancia del cliente
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    // 2. Envuelve tu aplicación con el proveedor
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </QueryClientProvider>
  );
}
`,
		},
		{
			type: "list",
			items: [
				"**`QueryClient`**: Es el gestor de todo el cacheo y las peticiones en tu app.",
				"**`QueryClientProvider`**: Es un proveedor de Contexto que hace que el `QueryClient` esté disponible para todos los componentes hijos.",
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Creando un Hook Personalizado para Buscar Datos",
		},
		{
			type: "paragraph",
			text: "Es una excelente práctica encapsular la lógica de tus peticiones en hooks personalizados. Crearemos un hook `useSearchRecipes` que utilizará el hook `useQuery` de TanStack Query.",
		},
		{
			type: "paragraph",
			text: "Primero, una función para la API en `services/mealApi.ts`:",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// services/mealApi.ts
export const searchRecipesByName = async (name: string) => {
    if (!name) return [];
    const response = await fetch(\`https://www.themealdb.com/api/json/v1/1/search.php?s=\${name}\`);
    if (!response.ok) {
        throw new Error('La respuesta de la red no fue correcta');
    }
    const data = await response.json();
    return data.meals || [];
};
`,
		},
		{
			type: "paragraph",
			text: "Ahora, el hook personalizado en `hooks/useSearchRecipes.ts`:",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { useQuery } from '@tanstack/react-query';
import { searchRecipesByName } from '../services/mealApi';

export function useSearchRecipes(searchTerm: string) {
  return useQuery({
    queryKey: ['recipes', searchTerm],
    queryFn: () => searchRecipesByName(searchTerm),
    enabled: !!searchTerm, // La consulta solo se ejecutará si searchTerm no está vacío
  });
}
`,
		},
		{
			type: "list",
			items: [
				"**`useQuery`**: Es el hook principal para peticiones GET.",
				"**`queryKey`**: Un array que identifica unívocamente esta consulta. TanStack Query lo usa para el cacheo. Si la `queryKey` cambia, se volverá a ejecutar la consulta.",
				"**`queryFn`**: La función asíncrona que realmente busca los datos.",
				"**`enabled`**: Una opción muy útil para controlar cuándo se debe ejecutar la consulta.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Mostrando los Datos en la Pantalla" },
		{
			type: "paragraph",
			text: "Ahora usar nuestro hook en la pantalla es increíblemente limpio. `useQuery` nos devuelve todo lo que necesitamos.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { View, TextInput, Text, FlatList, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useSearchRecipes } from '../hooks/useSearchRecipes'; // Ajusta la ruta

export default function RecipeSearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');

  // ¡Nuestra lógica de fetching y estado ahora es una sola línea!
  const { data: recipes, isLoading, isError, error } = useSearchRecipes(searchTerm);

  return (
    <View className="flex-1 p-4">
      <TextInput
        placeholder="Buscar receta..."
        onChangeText={setSearchTerm}
        value={searchTerm}
        className="p-3 border rounded-lg"
      />

      {isLoading && <ActivityIndicator size="large" className="mt-4" />}
      {isError && <Text className="text-red-500 mt-4">Error: {error.message}</Text>}

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => <Text className="p-2">{item.strMeal}</Text>}
        className="mt-4"
      />
    </View>
  );
}
`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Nota cómo ya no necesitamos `useState` para `loading`, `error` y `data`. TanStack Query gestiona todo eso por nosotros.",
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Cuál es el propósito principal de envolver tu aplicación en `QueryClientProvider`?",
					options: [
						"Para proporcionar estilos globales.",
						"Para hacer la instancia de `QueryClient` (y su caché) accesible a todos los componentes.",
						"Para manejar la autenticación de usuarios.",
						"Es un requisito de Expo Router.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"En el hook `useQuery`, ¿para qué se utiliza la `queryKey`?",
					options: [
						"Es el nombre de la función que busca los datos.",
						"Es una clave única utilizada por TanStack Query para cachear los resultados de la consulta.",
						"Es una contraseña para acceder a la API.",
						"Determina con qué frecuencia se debe actualizar la consulta.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Si tienes `useQuery({ queryKey: ['todos', 5], ... })`, ¿qué sucede si el ID cambia a 6?",
					options: [
						"TanStack Query devolverá los datos cacheados para el ID 5.",
						"TanStack Query ejecutará una nueva consulta porque la `queryKey` ha cambiado.",
						"Ocurrirá un error porque la `queryKey` no puede cambiar.",
						"No sucederá nada hasta que se refresque manualmente.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"¿Qué propiedad de `useQuery` usarías para evitar que una consulta se ejecute hasta que una condición sea verdadera (por ejemplo, que el usuario haya escrito algo)?",
					options: ["`staleTime`", "`cacheTime`", "`enabled`", "`onSuccess`"],
					correctAnswer: 2,
				},
			],
		},
	],
};
