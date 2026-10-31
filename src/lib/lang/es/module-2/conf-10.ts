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
			type: "callout",
			alertType: "info",
			text: "Basta con mover los archivos: cualquier ruta dentro de `(tabs)` se convierte en pestaña automáticamente, sin declararla en `_layout.tsx`. Además, el paréntesis del nombre del grupo hace que `(tabs)` desaparezca de la URL final (`/settings`, nunca `/(tabs)/settings`).",
		},
		{
			type: "fileStructure",
			files: [
				{
					id: "root-layout",
					name: "app/_layout.tsx",
					description: [
						"Layout raíz con el Stack Navigator de la aplicación.",
						"Envuelve las pantallas fuera del grupo (como `details.tsx`) y, como una pantalla más, el grupo `(tabs)`.",
					],
				},
				{
					id: "tabs-layout",
					name: "app/(tabs)/_layout.tsx",
					description: [
						"Define el Tab Navigator que envuelve las rutas del grupo.",
						"Aquí se personalizan íconos, títulos y colores de la barra.",
					],
				},
				{
					id: "tabs-index",
					name: "app/(tabs)/index.tsx",
					description: [
						"La primera pestaña (Inicio), la ruta raíz `/`.",
					],
				},
				{
					id: "tabs-settings",
					name: "app/(tabs)/settings.tsx",
					description: [
						"La segunda pestaña (Ajustes), la ruta `/settings`.",
					],
				},
				{
					id: "details",
					name: "app/details.tsx",
					description: [
						"Fuera del grupo: al navegar hacia ella, se apila sobre la barra de pestañas y la oculta.",
					],
				},
			],
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
			text: "¿Y el layout raíz? No hay que «registrarle» nada: al vivir todos los archivos dentro de `app/`, Expo Router ya monta el grupo `(tabs)` automáticamente sobre el Stack. La única razón para añadir `<Stack.Screen name='(tabs)'>` es **configurarlo**, por ejemplo para ocultar su encabezado:",
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
			alertType: "warning",
			text: "Error común: pensar que `<Stack.Screen name='(tabs)'>` hace falta para que el grupo exista. El layout raíz ya renderiza `(tabs)` por ser parte de `app/`; la entrada solo sirve para pasarle opciones — como `headerShown: false`, que oculta el encabezado del Stack y evita un encabezado doble.",
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
import { Ionicons } from '@react-native-vector-icons/ionicons';

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
			text: "Si quisieras que una pantalla se mostrara *dentro* del Tab Navigator (reemplazando el contenido pero manteniendo la barra de pestañas), basta con mover su archivo dentro de `(tabs)`: al crear el archivo, el grupo lo monta automáticamente como una pestaña más.",
		},
		{
			type: "twoColumn",
			columns: [
				{
					title: "Archivo fuera de `(tabs)`",
					content: [
						"Como `app/details.tsx`: pertenece al Stack raíz.",
						"Al navegar, la pantalla se apila sobre las pestañas y las oculta.",
						"**Ideal para:** pantallas de detalle y flujos temporales.",
					],
				},
				{
					title: "Archivo dentro de `(tabs)`",
					content: [
						"Como `app/settings.tsx`: pertenece al grupo de pestañas.",
						"Al crear el archivo, se convierte en una pestaña más, sin configuración.",
						"**Ideal para:** secciones principales de la app.",
					],
				},
			],
		},
		{
			type: "paragraph",
			text: "Veamos la interacción completa en un ejemplo interactivo. Las pestañas `index` y `settings` viven dentro de `(tabs)`, y `details.tsx` está fuera, en el Stack raíz: al hacer `push`, se abre encima de las pestañas (tapa la barra inferior) y con `back` vuelves a la pestaña desde la que saliste. La receta de navegación: `router.push()` para apilar un detalle, `router.navigate()` para saltar de pestaña, `router.back()` para retirar y `router.dismissAll()` para vaciar la pila hasta las pestañas.",
		},
		{
			type: "codeTabs",
			codeTabs: [
				{
					name: "app/_layout.tsx",
					language: "tsx",
					code: `
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: 'center' }}>
      {/* El grupo (tabs) pone su propia barra; ocultamos el header del Stack */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="details" options={{ title: 'Detalles' }} />
    </Stack>
  );
}`,
				},
				{
					name: "app/(tabs)/_layout.tsx",
					language: "tsx",
					code: `
import { Tabs } from 'expo-router';
import { Ionicons } from '@react-native-vector-icons/ionicons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerTitleAlign: 'center' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}`,
				},
				{
					name: "app/(tabs)/index.tsx",
					language: "tsx",
					code: `
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Inicio() {
  const router = useRouter();

  return (
    <View style={styles.contenedor}>
      <Text style={styles.ruta}>app/(tabs)/index.tsx</Text>

      {/* push: abre details encima de las pestañas */}
      <Pressable style={styles.boton} onPress={() => router.push('/details')}>
        <Text>push Detalles</Text>
      </Pressable>

      {/* navigate: cambia a la otra pestaña */}
      <Pressable style={styles.boton} onPress={() => router.navigate('/settings')}>
        <Text>ir a Ajustes</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  ruta: { fontFamily: 'monospace', fontSize: 13, color: '#555', marginBottom: 12 },
  boton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbb',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
}`,
				},
				{
					name: "app/(tabs)/settings.tsx",
					language: "tsx",
					code: `
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Ajustes() {
  const router = useRouter();

  return (
    <View style={styles.contenedor}>
      <Text style={styles.ruta}>app/(tabs)/settings.tsx</Text>

      <Pressable style={styles.boton} onPress={() => router.push('/details')}>
        <Text>push Detalles</Text>
      </Pressable>

      <Pressable style={styles.boton} onPress={() => router.navigate('/')}>
        <Text>ir a Inicio</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  ruta: { fontFamily: 'monospace', fontSize: 13, color: '#555', marginBottom: 12 },
  boton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbb',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
}`,
				},
				{
					name: "app/details.tsx",
					language: "tsx",
					code: `
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Detalles() {
  const router = useRouter();

  return (
    <View style={styles.contenedor}>
      <Text style={styles.ruta}>app/details.tsx</Text>

      {/* back: quita details y vuelve a la pestaña de origen */}
      <Pressable
        style={[styles.boton, !router.canGoBack() && styles.deshabilitado]}
        disabled={!router.canGoBack()}
        onPress={() => router.back()}
      >
        <Text>back</Text>
      </Pressable>

      {/* replace: sustituye details por otra ruta sin dejar historial */}
      <Pressable style={styles.boton} onPress={() => router.replace('/settings')}>
        <Text>replace Ajustes</Text>
      </Pressable>

      {/* dismissAll: cierra todo lo apilado y vuelve a las pestañas */}
      <Pressable style={styles.boton} onPress={() => router.dismissAll()}>
        <Text>dismissAll</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  ruta: { fontFamily: 'monospace', fontSize: 13, color: '#555', marginBottom: 12 },
  boton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbb',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  deshabilitado: { opacity: 0.4 },
}`,
				},
			],
		},
		{
			type: "callout",
			alertType: "info",
			text: "Como `details.tsx` vive en el Stack raíz, no muestra la barra de pestañas. Si la quisieras visible, mueve su archivo dentro de `(tabs)` y —solo para configurar opciones— añade `<Tabs.Screen name='details' options={{ href: null }} />`: la pantalla deja de aparecer en la barra, pero sigue siendo navegable.",
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Los íconos (`home-outline`, `settings-outline`) pertenecen al set Ionicons de `@react-native-vector-icons/ionicons`. Y al tener `headerShown: false` en la pantalla `(tabs)` del Stack raíz, el encabezado de cada pestaña lo dibuja el propio `<Tabs />`.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "5. Tarea Práctica: Añade una Pestaña" },
		{
			type: "assignment",
			assignmentId: "conf-10-tabs-nueva-pestana",
			description: [
				"**Requisitos:**",
				"1. Crea `app/(tabs)/profile.tsx` con una pantalla simple. **No la registres**: crear el archivo debe hacer que aparezca en la barra al instante.",
				"2. En `app/(tabs)/_layout.tsx` añade `<Tabs.Screen name='profile'>` solo para configurarla: `title` e `tabBarIcon` (por ejemplo, el ícono `person` de Ionicons).",
				"3. Aplica `screenOptions` con `tabBarActiveTintColor` común para todas las pestañas.",
				"4. Verifica que `app/details.tsx` quede fuera del grupo: al navegar desde Inicio, la pantalla se apila sobre la barra y la oculta.",
				"5. Confirma que `app/_layout.tsx` mantiene `headerShown: false` en la pantalla `(tabs)`: al entrar a Detalles no debe verse un encabezado doble.",
				"La solución de referencia contiene las tres pestañas configuradas — fijate que `profile` existe porque creaste el archivo; `Tabs.Screen` solo le aporta ícono y título.",
			],
			code: `
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@react-native-vector-icons/ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#f4511e',
      }}
    >
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
      {/* profile.tsx no se declara para existir: crear el archivo alcanza.
          Tabs.Screen solo aporta opciones (ícono y título). */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Configuración, no registro: oculta el encabezado del Stack */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="details" options={{ title: 'Detalles' }} />
    </Stack>
  );
}

// app/(tabs)/profile.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function Perfil() {
  return (
    <View style={styles.contenedor}>
      <Text>Pestaña de Perfil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
`,
		},
	],
};
