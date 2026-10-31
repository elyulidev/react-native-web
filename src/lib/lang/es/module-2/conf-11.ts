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
		{
			type: "callout",
			alertType: "info",
			text: "¿Y las rutas **anidadas**? Ya las dominas: en la conferencia anterior, el grupo `(tabs)` es un navegador de pestañas anidado dentro del Stack raíz — un navegador dentro de otro. En esta conferencia agregamos la otra herramienta del cinturón: las rutas **dinámicas**, una sola pantalla que sirve para infinitos valores.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Creando una Ruta Dinámica para Perfiles de Usuario" },
		{
			type: "paragraph",
			text: "Vamos a crear un ejemplo. Imagina que tenemos una lista de usuarios y queremos navegar al perfil de cada uno. Primero, creemos la pantalla de perfil dinámico en `app/profile/[id].tsx`:",
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
      <Text style={{ fontSize: 24 }}>Perfil</Text>
      {/* Aquí mostraremos el ID del usuario */}
    </View>
  );
}`,
		},
		{
			type: "paragraph",
			text: "Y eso es todo. No hay que \"registrar\" esta ruta en ningún layout: **el archivo ya es la ruta**. Al crear `app/profile/[id].tsx`, Expo Router registra automáticamente que cualquier visita del tipo `/profile/<valor>` renderice esta pantalla.",
		},
		{
			type: "callout",
			alertType: "info",
			text: "Recordá la regla de la conferencia anterior: crear un archivo basta para que la pantalla exista. Una entrada `<Stack.Screen>` es opcional y sirve **solo para opciones** — nada de registro.",
		},
		{
			type: "paragraph",
			text: "Si quisiéramos opciones para la pantalla (por ejemplo, un título de encabezado), sí escribimos la entrada en el layout — únicamente para configurar, nunca para registrar:",
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
      {/* Opcional: solo opciones. Escribir esta entrada no "registra" la ruta */}
      <Stack.Screen name="profile/[id]" options={{ title: 'Perfil de Usuario' }} />
    </Stack>
  );
}`,
		},
		{
			type: "fileStructure",
			files: [
				{
					id: "fig-1",
					name: "app/_layout.tsx",
					description: [
						"Stack raíz de la app. No necesita cambios para el perfil:",
						"la ruta dinámica se registra sola al crear el archivo.",
					],
				},
				{
					id: "fig-2",
					name: "app/(tabs)/_layout.tsx",
					description: [
						"Navegador de pestañas, anidado dentro del Stack raíz.",
					],
				},
				{
					id: "fig-3",
					name: "app/(tabs)/index.tsx",
					description: [
						"Inicio: contiene la lista de enlaces a los perfiles.",
					],
				},
				{
					id: "fig-4",
					name: "app/profile/[id].tsx",
					description: [
						"La ruta dinámica: una sola pantalla que atiende a",
						"/profile/1, /profile/lucia, /profile/x… el valor del",
						"corchete es el comodín que cambia en cada visita.",
					],
				},
			],
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
			text: "Como el proyecto es TypeScript, aprovechamos el genérico del hook para tipar los parámetros. Así el `id` llega con el tipo preciso que esperamos.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/profile/[id].tsx
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function UserProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Perfil del Usuario</Text>
      <Text style={{ fontSize: 20, marginTop: 10 }}>ID: {id}</Text>
    </View>
  );
}`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "¿Por qué el genérico? Sin él, el hook devuelve cada parámetro como `string | string[]` — los parámetros pueden llegar multivaluados (típico en query strings con la misma clave repetida). Al tipar `{ id: string }` le decimos a TypeScript exactamente qué esperar de esta ruta.",
		},
		{
			type: "paragraph",
			text: "Y ahora que sabemos leer el `id`, podemos hacer algo que la opción del layout no permite: un título **dinámico por usuario**. Un `<Stack.Screen>` renderizado **dentro** de la pantalla configura sus propias opciones:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/profile/[id].tsx - título dinámico dentro de la pantalla
<Stack.Screen options={{ title: \`Perfil \${id}\` }} />`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Este patrón es el mismo que ya usamos en la conf. 9 para `app/profile.tsx`: `<Stack.Screen options={...} />` sin `name` apunta a la pantalla que lo contiene. La diferencia acá es que el título depende del parámetro de la ruta.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Navegando a Rutas Dinámicas" },
		{
			type: "paragraph",
			text: "Para navegar a nuestra pantalla de perfil, reemplazamos el segmento dinámico con el valor real. Modifiquemos la pantalla de inicio (`app/(tabs)/index.tsx`) para incluir enlaces a un par de perfiles de ejemplo:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/(tabs)/index.tsx
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

const perfiles = [
  { id: 'lucia', nombre: 'Lucía' },
  { id: 'mateo', nombre: 'Mateo' },
  { id: 'sofia', nombre: 'Sofía' },
];

export default function Inicio() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Pantalla de Inicio</Text>

      {perfiles.map((p) => (
        <Link key={p.id} href={\`/profile/\${p.id}\`} style={styles.fila}>
          Ver perfil de {p.nombre}
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  titulo: { fontSize: 18, fontWeight: '600' },
  fila: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#fff',
    color: '#2563eb',
    fontSize: 16,
  },
});`,
		},
		{
			type: "paragraph",
			text: "Fijate en el `href`: es una **plantilla construida en runtime** con el valor de cada perfil. Al hacer clic en un enlace, serás llevado a la pantalla `UserProfile`, y el hook `useLocalSearchParams` extraerá `lucia`, `mateo` o `sofia` de la URL. En una aplicación real, usarías ese ID para hacer una llamada a una API y obtener los datos completos del usuario.",
		},
		{
			type: "twoColumn",
			columns: [
				{
					title: "`<Link>` (declarativo)",
					content: [
						"Navegación **visible** en la pantalla: listas, tarjetas, cualquier contenido clicable.",
						"Es lo análogo a un `<a>` en la web: el destino vive en el JSX.",
						"Los `href` con template literals cubren perfectamente las rutas dinámicas.",
					],
				},
				{
					title: "`router.push()` (programático)",
					content: [
						"Navegación por **acción**: botones, callbacks, flujos con lógica previa.",
						"Permite validar o calcular la ruta antes de ir — por ejemplo, navegar recién si el usuario cargó sus datos.",
						"Ya lo usamos en la conf. 9 con `push`, `back`, `replace` y `dismissAll`.",
					],
				},
			],
		},
		{
			type: "paragraph",
			text: "La versión programática con `router` es idéntica a la que ya conocemos — solo cambia la ruta construida:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/(tabs)/index.tsx (fragmento)
import { useRouter } from 'expo-router';

export default function Inicio() {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(\`/profile/\${id}\`)}
      style={styles.fila}
    >
      <Text>Ver perfil</Text>
    </Pressable>
  );
}`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "5. Tarea Práctica: Crea un Perfil Dinámico" },
		{
			type: "assignment",
			assignmentId: "conf-11-perfil-dinamico",
			description: [
				"**Requisitos:**",
				"1. Crea `app/profile/[id].tsx`. **No la registres en ningún layout**: el archivo con corchetes ya genera la ruta para cualquier valor (`/profile/lucia`, `/profile/123`, …).",
				"2. Extrae el `id` tipado con `useLocalSearchParams<{ id: string }>()` y muéstralo en pantalla.",
				"3. En `app/(tabs)/index.tsx` agrega tres enlaces (`<Link>`) que apunten a `/profile/lucia`, `/profile/mateo` y `/profile/sofia`.",
				"4. Bonus: renderiza `<Stack.Screen options={{ title: `Perfil de ${id}` }} />` dentro de la pantalla para un título de encabezado dinámico.",
				"La solución de referencia usa un diccionario mock de usuarios: la pantalla dinámica busca el nombre según el `id` que llega de la URL, e index.tsx construye cada `href` con un template literal.",
			],
			code: `
// app/profile/[id].tsx
import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const usuarios: Record<string, string> = {
  lucia: 'Lucía Fernández',
  mateo: 'Mateo Rossi',
  sofia: 'Sofía González',
};

export default function Perfil() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const nombre = usuarios[id] ?? 'Usuario desconocido';

  return (
    <>
      <Stack.Screen options={{ title: \`Perfil de \${nombre}\` }} />
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>{nombre}</Text>
        <Text style={styles.id}>ID: {id}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
  },
  titulo: { fontSize: 24, fontWeight: '600' },
  id: { fontFamily: 'monospace', fontSize: 15, color: '#555' },
});

// app/(tabs)/index.tsx
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

const perfiles = ['lucia', 'mateo', 'sofia'];

export default function Inicio() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Pantalla de Inicio</Text>

      {perfiles.map((id) => (
        <Link key={id} href={\`/profile/\${id}\`} style={styles.fila}>
          Ver perfil de {id}
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
  },
  titulo: { fontSize: 18, fontWeight: '600' },
  fila: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#fff',
    color: '#2563eb',
    fontSize: 16,
  },
});
`,
		},
	],
};
