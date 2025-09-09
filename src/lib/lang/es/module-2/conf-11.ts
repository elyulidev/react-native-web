import type { CurriculumTopic } from "../../../../types/types";

export const conference11: CurriculumTopic = {
	id: "conf-11",
	title: "Conf. 11: Rutas Anidadas y Dinámicas",
	content: [
		{ type: "heading", text: "Manejo de Rutas Anidadas y Dinámicas" },
		{
			type: "paragraph",
			text: "Las aplicaciones reales a menudo necesitan mostrar contenido basado en un parámetro, como el ID de un producto o el nombre de usuario de un perfil. Expo Router maneja esto de manera elegante a través de rutas dinámicas, que nos permiten crear plantillas de pantalla para una cantidad infinita de elementos.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. ¿Qué son las Rutas Dinámicas?" },
		{
			type: "paragraph",
			text: "Una ruta dinámica es una ruta que coincide con múltiples URLs basadas en un segmento variable. En Expo Router, esto se logra nombrando un archivo o directorio con corchetes.",
		},
		{
			type: "list",
			items: [
				"**`app/users/[id].tsx`**: Coincidirá con `/users/1`, `/users/123`, `/users/abc`, etc.",
				"**`app/posts/[slug].tsx`**: Coincidirá con `/posts/mi-primer-post`, `/posts/novedades-2024`, etc.",
			],
		},
		{
			type: "paragraph",
			text: "El valor del segmento dinámico (el `id` o el `slug`) estará disponible dentro del componente de la pantalla para que podamos cargar los datos correspondientes.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "2. Creando una Ruta Dinámica para Perfiles de Usuario",
		},
		{
			type: "paragraph",
			text: "Vamos a crear un ejemplo. Imagina que tenemos una lista de usuarios y queremos navegar al perfil de cada uno. Primero, creemos la pantalla de perfil dinámico en `app/profile/[id].tsx`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/profile/[id].tsx
import { View, Text } from 'react-native';

export default function UserProfile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Perfil de Usuario</Text>
      {/* Aquí mostraremos el ID del usuario */}
    </View>
  );
}`,
		},
		{
			type: "paragraph",
			text: "A continuación, debemos registrar esta nueva ruta en nuestro layout raíz (`app/_layout.tsx`). Nota que usamos el nombre del archivo con corchetes.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="details" options={{ title: 'Detalles' }} />
      <Stack.Screen
        name="profile/[id]"
        options={{ title: 'Perfil de Usuario' }}
      />
    </Stack>
  );
}`,
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Extrayendo Parámetros con `useLocalSearchParams`",
		},
		{
			type: "paragraph",
			text: "Dentro de nuestro componente de pantalla `UserProfile`, necesitamos una forma de acceder al valor del `id` de la URL. Para esto, usamos el hook `useLocalSearchParams` de `expo-router`.",
		},
		{
			type: "paragraph",
			text: "Este hook devuelve un objeto donde las claves son los nombres de los segmentos dinámicos de la ruta (en este caso, `id`).",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/profile/[id].tsx
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function UserProfile() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Perfil del Usuario</Text>
      <Text style={{ fontSize: 20, marginTop: 10 }}>ID: {id}</Text>
    </View>
  );
}`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Navegando a Rutas Dinámicas" },
		{
			type: "paragraph",
			text: "Para navegar a nuestra nueva pantalla de perfil, simplemente usamos el componente `<Link>` como antes, pero reemplazamos el segmento dinámico con el valor real.",
		},
		{
			type: "paragraph",
			text: "Modifiquemos nuestra pantalla de inicio (`app/(tabs)/index.tsx`) para incluir enlaces a un par de perfiles de usuario de ejemplo:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/(tabs)/index.tsx
import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 15 }}>
      <Text>Pantalla de Inicio</Text>

      <Link href="/profile/1" style={{ color: 'blue', fontSize: 18 }}>
        Ver Perfil de Usuario 1
      </Link>

      <Link href="/profile/25" style={{ color: 'blue', fontSize: 18 }}>
        Ver Perfil de Usuario 25
      </Link>
    </View>
  );
}`,
		},
		{
			type: "paragraph",
			text: "Al hacer clic en estos enlaces, serás llevado a la pantalla `UserProfile`, y el hook `useLocalSearchParams` extraerá `1` o `25` de la URL, permitiéndote mostrarlo en la pantalla. En una aplicación real, usarías este ID para hacer una llamada a una API y obtener los datos completos del usuario.",
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Qué convención de nomenclatura de archivos se usa para crear una ruta dinámica para posts de un blog?",
					options: [
						"app/posts/(slug).tsx",
						"app/posts/[slug].tsx",
						"app/posts/{slug}.tsx",
						"app/posts/dynamic.tsx",
					],
					correctAnswer: 1,
				},
				{
					question:
						"¿Qué hook de `expo-router` se utiliza para acceder a los parámetros de una ruta dinámica?",
					options: [
						"useParams()",
						"useRoute()",
						"useLocalSearchParams()",
						"useDynamicRoute()",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Si tu ruta es `app/products/[id].tsx` y navegas a `/products/123`, ¿qué devolverá `useLocalSearchParams()`?",
					options: [
						"`{ id: '123' }`",
						"`'123'`",
						"`['123']`",
						"`{ products: '123' }`",
					],
					correctAnswer: 0,
				},
				{
					question:
						"¿Cómo se navega a la ruta dinámica para un usuario con id 'ana'?",
					options: [
						"<Link href='/user?id=ana'>",
						"<Link href='/user/[id]' params={{ id: 'ana' }}>",
						"<Link href='/user' id='ana'>",
						"<Link href='/user/ana'>",
					],
					correctAnswer: 3,
				},
			],
		},
	],
};
