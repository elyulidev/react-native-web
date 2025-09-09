import type { CurriculumTopic } from "../../../../types/types";

export const conference9: CurriculumTopic = {
	id: "conf-9",
	title: "Conf. 9: Expo Router y Navegación Stack",
	content: [
		{ type: "heading", text: "Introducción a la Navegación con Expo Router" },
		{
			type: "paragraph",
			text: "Expo Router es un sistema de enrutamiento basado en archivos para aplicaciones React Native y web. Utiliza la estructura de directorios de tu proyecto para definir la navegación, lo que simplifica enormemente la gestión de rutas. Está construido sobre React Navigation, por lo que hereda su potencia y rendimiento nativo.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. El Directorio `app` y la Creación de Rutas" },
		{
			type: "paragraph",
			text: "El corazón de Expo Router es el directorio `app`. Cada archivo que creas dentro de `app` se convierte automáticamente en una ruta en tu aplicación.",
		},
		{
			type: "list",
			items: [
				"Un archivo llamado `index.tsx` se mapea a la ruta raíz del directorio que lo contiene.",
				"Por ejemplo, `app/index.tsx` corresponde a la ruta `/`.",
			],
		},
		{
			type: "paragraph",
			text: "Comencemos creando nuestra primera pantalla. Si seguiste la conferencia de configuración, ya deberías tener un archivo `app/index.tsx`. Asegúrate de que tenga un contenido simple:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pantalla de Inicio</Text>
    </View>
  );
}`,
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "2. El Archivo `_layout.tsx` y el Stack Navigator",
		},
		{
			type: "paragraph",
			text: "Un archivo `_layout.tsx` define la estructura de navegación para un directorio. El layout raíz, `app/_layout.tsx`, es el componente principal de tu aplicación y es perfecto para configurar el navegador principal, como un Stack Navigator.",
		},
		{
			type: "paragraph",
			text: "Un **Stack Navigator** (Navegador de Pila) gestiona las pantallas en una pila, como un mazo de cartas. Cuando navegas a una nueva pantalla, se coloca en la parte superior de la pila. Al volver atrás, se retira de la pila.",
		},
		{
			type: "paragraph",
			text: "Modifiquemos `app/_layout.tsx` para definir un Stack que controle nuestras pantallas:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "La propiedad `name` en `<Stack.Screen>` se refiere al nombre del archivo de la ruta (sin la extensión). Por ejemplo, `index` para `index.tsx`.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Creando una Segunda Ruta y Navegando" },
		{
			type: "paragraph",
			text: "Vamos a crear una nueva pantalla. Crea un archivo llamado `app/details.tsx`. Esto creará automáticamente la ruta `/details`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/details.tsx
import { View, Text } from 'react-native';

export default function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pantalla de Detalles</Text>
    </View>
  );
}`,
		},
		{
			type: "paragraph",
			text: "Ahora, debemos registrar esta nueva pantalla en nuestro Stack Navigator dentro de `app/_layout.tsx`:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="details" />
    </Stack>
  );
}`,
		},
		{
			type: "paragraph",
			text: "Para navegar entre pantallas, usamos el componente `<Link>` de `expo-router`. Es el equivalente a la etiqueta `<a>` en la web. Modifiquemos `app/index.tsx` para añadir un enlace a la pantalla de detalles.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
      <Text>Pantalla de Inicio</Text>
      <Link href="/details" style={{ color: 'blue' }}>
        Ir a Detalles
      </Link>
    </View>
  );
}`,
		},
		{
			type: "paragraph",
			text: "¡Ahora deberías poder navegar de la pantalla de inicio a la de detalles y volver atrás usando el botón de retroceso del encabezado que el Stack Navigator proporciona por defecto!",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Configuración de Opciones de Pantalla" },
		{
			type: "paragraph",
			text: "Podemos personalizar la apariencia de cada pantalla en el Stack, como el título del encabezado. Esto se hace a través de la propiedad `options` en `Stack.Screen`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Inicio'
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: 'Detalles de la App',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
        }}
      />
    </Stack>
  );
}`,
		},
		{
			type: "paragraph",
			text: "También podemos aplicar opciones a todo el Stack a la vez usando la prop `screenOptions` en el componente `<Stack>`.",
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question: "¿Qué archivo define la ruta raíz `/` en Expo Router?",
					options: [
						"app/_layout.tsx",
						"app/root.tsx",
						"app/index.tsx",
						"app/home.tsx",
					],
					correctAnswer: 2,
				},
				{
					question:
						"¿Para qué se utiliza principalmente el archivo `_layout.tsx`?",
					options: [
						"Para definir estilos globales.",
						"Para declarar variables de estado globales.",
						"Para configurar la estructura de navegación de un directorio (como un Stack o Tabs).",
						"Para exportar componentes reutilizables.",
					],
					correctAnswer: 2,
				},
				{
					question:
						"¿Qué componente se usa para navegar programáticamente entre rutas en Expo Router?",
					options: ["<Button>", "<Navigate>", "<a href...>", "<Link>"],
					correctAnswer: 3,
				},
				{
					question:
						"En `<Stack.Screen name='profile' />`, ¿a qué archivo de ruta se refiere `name='profile'`?",
					options: [
						"app/profile/index.tsx",
						"app/Profile.tsx",
						"app/profile.tsx",
						"app/(tabs)/profile.js",
					],
					correctAnswer: 2,
				},
			],
		},
	],
};
