import type { CurriculumTopic } from "../../../../types/types";

export const conference16: CurriculumTopic = {
	id: "conf-16",
	title: "Conf. 16: Mini Proyecto Navegación",
	content: [
		{
			type: "heading",
			text: "Mini Proyecto: App de Blog con Navegación Completa",
		},
		{
			type: "paragraph",
			text: "¡Es hora de consolidar todo lo aprendido en el Módulo 2! En este proyecto, construiremos una aplicación de blog simple pero completa. Integraremos un Stack Navigator, un Tab Navigator, rutas dinámicas para los artículos y una estructura de archivos lógica usando grupos de rutas.",
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/blog-app-nav-structure.png",
			caption: "Estructura de navegación de nuestra aplicación de blog.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Paso 1: Estructura de Archivos del Proyecto" },
		{
			type: "paragraph",
			text: "Una buena estructura de archivos es clave. Vamos a organizar nuestras rutas de la siguiente manera dentro de la carpeta `app`:",
		},
		{
			type: "code",
			language: "bash",
			code: `
app/
├── (tabs)/
│   ├── _layout.tsx      # Define el Tab Navigator
│   ├── index.tsx        # Pantalla de lista de artículos (Pestaña 1)
│   └── about.tsx        # Pantalla "Acerca de" (Pestaña 2)
├── posts/
│   └── [id].tsx         # Pantalla dinámica para detalles de un artículo
└── _layout.tsx          # Define el Stack Navigator raíz
      `,
		},
		{
			type: "list",
			items: [
				"**`_layout.tsx` (raíz):** Nuestro navegador principal será un Stack que gestionará las pestañas y las pantallas de detalle.",
				"**`(tabs)`:** Un grupo de rutas para las pantallas que tendrán la barra de pestañas inferior.",
				'**`(tabs)/_layout.tsx`:** Configura el Tab Navigator con las pestañas "Artículos" y "Acerca de".',
				"**`posts/[id].tsx`:** Una ruta dinámica. El archivo `[id].tsx` actuará como una plantilla para mostrar cualquier artículo basado en su ID.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Paso 2: Configurar el Stack Navigator Raíz" },
		{
			type: "paragraph",
			text: "Modifiquemos `app/_layout.tsx` para definir nuestro Stack principal. Gestionará el grupo de pestañas y la pantalla de detalles de los posts.",
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
      <Stack.Screen name="posts/[id]" options={{ title: 'Detalle del Artículo' }} />
    </Stack>
  );
}`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "Ocultamos el encabezado para `(tabs)` para que el Tab Navigator pueda gestionar sus propios encabezados, evitando una doble barra de título.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Paso 3: Configurar el Tab Navigator" },
		{
			type: "paragraph",
			text: "Ahora, configuremos las pestañas en `app/(tabs)/_layout.tsx`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Artículos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Acerca de',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Paso 4: Crear la Lista de Artículos" },
		{
			type: "paragraph",
			text: "La pantalla `index` en nuestras pestañas mostrará la lista de artículos. Usaremos `FlatList` y `<Link>` para navegar a los detalles. Para mantenerlo simple, los datos estarán directamente en el archivo.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/(tabs)/index.tsx
import { View, Text, FlatList, Pressable } from 'react-native';
import { Link } from 'expo-router';

const POSTS = [
  { id: 1, title: 'Introducción a React Native', content: 'React Native permite construir apps móviles con JavaScript y React...' },
  { id: 2, title: 'Estilizando con NativeWind', content: 'NativeWind trae el poder de Tailwind CSS a React Native para una estilización rápida...' },
  { id: 3, title: 'Navegación con Expo Router', content: 'Expo Router simplifica la navegación con su innovador sistema basado en archivos...' },
];

export default function ArticlesScreen() {
  return (
    <View className="flex-1 p-4 bg-gray-100">
      <FlatList
        data={POSTS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={\`/posts/\${item.id}\`} asChild>
            <Pressable className="p-4 mb-4 bg-white rounded-lg shadow-md active:bg-gray-200">
              <Text className="text-xl font-bold text-slate-800">{item.title}</Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "El prop `asChild` en el componente `<Link>` le permite pasar sus propiedades de navegación al primer componente hijo (`Pressable`), haciendo que toda el área sea clicable.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: 'Paso 5: Crear la Pantalla "Acerca de"' },
		{
			type: "paragraph",
			text: "Esta será una pantalla estática simple en `app/(tabs)/about.tsx`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/(tabs)/about.tsx
import { View, Text } from 'react-native';

export default function AboutScreen() {
  return (
    <View className="flex-1 justify-center items-center p-4 bg-gray-100">
      <Text className="text-2xl font-bold text-slate-800">Mi App de Blog</Text>
      <Text className="text-lg text-center mt-2 text-slate-600">
        Este es un mini proyecto para demostrar la navegación con Expo Router.
      </Text>
    </View>
  );
}`,
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "Paso 6: Crear la Pantalla de Detalles Dinámica",
		},
		{
			type: "paragraph",
			text: "Finalmente, la pantalla `app/posts/[id].tsx`. Usaremos `useLocalSearchParams` para obtener el ID de la URL y mostrar el artículo correcto.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/posts/[id].tsx
import { View, Text } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';

// Replicamos los mismos datos para poder encontrarlos
const POSTS = [
  { id: 1, title: 'Introducción a React Native', content: 'React Native permite construir apps móviles con JavaScript y React, compartiendo código entre iOS, Android y la web.' },
  { id: 2, title: 'Estilizando con NativeWind', content: 'NativeWind trae el poder de Tailwind CSS a React Native para una estilización rápida, consistente y mantenible usando clases de utilidad.' },
  { id: 3, title: 'Navegación con Expo Router', content: 'Expo Router simplifica la navegación con su innovador sistema basado en archivos, donde la estructura del directorio app define las rutas de la aplicación.' },
];

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams();
  const post = POSTS.find(p => p.id.toString() === id);

  if (!post) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-red-500">Artículo no encontrado</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-6 bg-white">
      <Stack.Screen options={{ title: post.title }} />
      <Text className="text-3xl font-extrabold mb-4 text-slate-900">{post.title}</Text>
      <Text className="text-base leading-7 text-slate-700">{post.content}</Text>
    </View>
  );
}`,
		},
		{
			type: "list",
			items: [
				"**`useLocalSearchParams`**: Extrae el `id` de la URL.",
				"**`.find()`**: Buscamos el post correspondiente en nuestros datos de ejemplo.",
				"**`<Stack.Screen options>`**: Usamos esto dentro del componente para establecer dinámicamente el título del encabezado con el título del post.",
			],
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Felicidades!" },
		{
			type: "paragraph",
			text: "Has construido con éxito una aplicación con una estructura de navegación completa. Has combinado un Stack Navigator con un Tab Navigator, has usado grupos de rutas para organizar tu código, has creado rutas dinámicas y has pasado datos entre pantallas. ¡Este es el fundamento de casi cualquier aplicación móvil compleja!",
		},
	],
};
