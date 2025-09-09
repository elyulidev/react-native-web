import type { CurriculumTopic } from "../../../../types/types";

export const conference10: CurriculumTopic = {
	id: "conf-10",
	title: "Conf. 10: Navegación por Pestañas (Tabs)",
	content: [
		{
			type: "heading",
			text: "Implementando Navegación por Pestañas con Tab Navigator",
		},
		{
			type: "paragraph",
			text: "La navegación por pestañas es uno de los patrones más comunes en las aplicaciones móviles, permitiendo al usuario cambiar entre diferentes secciones principales de la app. Con Expo Router, crear una barra de pestañas (Tab Bar) es tan simple como estructurar tus archivos de una manera específica.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Estructura de Archivos para Tabs" },
		{
			type: "paragraph",
			text: "Para crear un Tab Navigator, necesitamos organizar nuestras rutas dentro de un directorio de grupo. Un **grupo de rutas** es una carpeta cuyo nombre está entre paréntesis, como `(tabs)`. Esto organiza los archivos sin afectar la URL final.",
		},
		{
			type: "paragraph",
			text: "Vamos a reestructurar nuestro proyecto. Crea una carpeta `app/(tabs)` y mueve tu archivo `index.tsx`. Luego, crea una nueva pantalla `settings.tsx` dentro de `(tabs)`. Asegúrate de que `details.tsx` quede fuera del grupo.",
		},
		{
			type: "list",
			items: [
				"**`app/(tabs)/index.tsx`**: Será nuestra primera pestaña (Inicio).",
				"**`app/(tabs)/settings.tsx`**: Será nuestra segunda pestaña (Ajustes).",
				"**`app/details.tsx`**: Queda fuera del grupo `(tabs)` para que no aparezca en la barra de pestañas.",
			],
		},
		{
			type: "paragraph",
			text: "Tu nueva estructura de archivos debería verse así:",
		},
		{
			type: "code",
			language: "bash",
			code: `
app/
├── (tabs)/
│   ├── _layout.tsx      # Layout para el Tab Navigator
│   ├── index.tsx        # Pantalla de la primera pestaña (Home)
│   └── settings.tsx     # Pantalla de la segunda pestaña (Settings)
├── _layout.tsx          # Layout Raíz (Stack Navigator)
└── details.tsx          # Pantalla de detalles (accesible desde Home)
      `,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Configurando el Layout de las Pestañas" },
		{
			type: "paragraph",
			text: "Ahora, el archivo clave es `app/(tabs)/_layout.tsx`. Aquí definiremos nuestro Tab Navigator usando el componente `<Tabs>` de `expo-router`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}`,
		},
		{
			type: "paragraph",
			text: "Finalmente, debemos decirle a nuestro layout raíz (`app/_layout.tsx`) que renderice este grupo de pestañas como una sola pantalla dentro del Stack.",
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
    </Stack>
  );
}`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Usamos `headerShown: false` en la pantalla `(tabs)` para ocultar el encabezado del Stack y dejar que cada pestaña gestione el suyo propio si es necesario. Esto evita un doble encabezado.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Personalizando las Pestañas con Íconos y Títulos",
		},
		{
			type: "paragraph",
			text: "Una barra de pestañas no está completa sin íconos. Podemos personalizar cada `Tabs.Screen` con la propiedad `options`.",
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
    <Tabs screenOptions={{
      tabBarActiveTintColor: 'blue', // Color para la pestaña activa
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}`,
		},
		{
			type: "list",
			items: [
				"**`screenOptions`**: Aplica estilos a todas las pestañas, como `tabBarActiveTintColor`.",
				"**`options`**: Permite configurar cada pestaña individualmente.",
				"**`title`**: Define el texto que aparece en la pestaña y en el encabezado de la pantalla.",
				"**`tabBarIcon`**: Es una función que recibe propiedades como `color`, `size` y `focused`, permitiéndote renderizar un ícono y cambiar su apariencia si la pestaña está activa.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Interacción entre Tabs y Stack" },
		{
			type: "paragraph",
			text: "En nuestra estructura, el `TabNavigator` está anidado dentro del `StackNavigator`. Esto significa que al navegar desde una pantalla dentro de las pestañas (como `index.tsx`) a una pantalla fuera del grupo de pestañas (como `details.tsx`), la nueva pantalla se apilará sobre la barra de pestañas, ocultándola. Este es el comportamiento deseado para pantallas de detalle.",
		},
		{
			type: "callout",
			alertType: "info",
			text: "Si quisieras que una pantalla se mostrara *dentro* del Tab Navigator (reemplazando el contenido pero manteniendo la barra de pestañas), deberías colocar su archivo dentro del directorio `(tabs)` y registrarlo en el layout de las pestañas (`app/(tabs)/_layout.tsx`).",
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Cómo se crea un grupo de rutas en Expo Router para organizar archivos sin afectar la URL?",
					options: [
						"Usando una carpeta con corchetes, ej. [tabs]",
						"Usando una carpeta con paréntesis, ej. (tabs)",
						"Usando un archivo especial llamado _group.tsx",
						"No es posible agrupar rutas.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"¿Qué componente de `expo-router` se utiliza para crear una navegación por pestañas?",
					options: ["<Stack>", "<Navigator>", "<Tabs>", "<BottomBar>"],
					correctAnswer: 2,
				},
				{
					question:
						"En las opciones de `Tabs.Screen`, ¿qué propiedad se usa para definir el ícono de la pestaña?",
					options: ["icon", "tabBarIcon", "renderIcon", "iconComponent"],
					correctAnswer: 1,
				},
				{
					question:
						"Si tienes un Stack Navigator raíz y un Tab Navigator anidado, ¿por qué es común usar `headerShown: false` en la pantalla del grupo de pestañas?",
					options: [
						"Para mejorar el rendimiento.",
						"Para evitar que se muestre un doble encabezado (el del Stack y el de la pestaña).",
						"Porque los Tab Navigators no soportan encabezados.",
						"Para permitir gestos de deslizamiento.",
					],
					correctAnswer: 1,
				},
			],
		},
	],
};
