import type { CurriculumTopic } from "../../../../types/types";

export const conference12: CurriculumTopic = {
	id: "conf-12",
	title: "Conf. 12: Agrupación de Rutas y Layouts",
	content: [
		{ type: "heading", text: "Agrupación de Rutas y Diseños Específicos" },
		{
			type: "paragraph",
			text: 'A medida que una aplicación crece, mantener organizada la estructura de archivos se vuelve crucial. Expo Router ofrece una potente función llamada "Grupos de Rutas" que nos permite organizar nuestro código sin afectar las URLs, y aplicar diferentes layouts a distintas secciones de la app.',
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. ¿Qué son los Grupos de Rutas?" },
		{
			type: "paragraph",
			text: "Un grupo de rutas se crea nombrando un directorio con paréntesis, por ejemplo, `(auth)` o `(tabs)`. La principal característica de un grupo es que **el nombre de la carpeta se omite de la URL**.",
		},
		{
			type: "list",
			items: [
				"**`app/(marketing)/about.tsx`** se convierte en la ruta `/about`",
				"**`app/(shop)/products/index.tsx`** se convierte en la ruta `/products`",
			],
		},
		{ type: "paragraph", text: "El propósito de los grupos es doble:" },
		{
			type: "list",
			items: [
				"**Organización:** Agrupar rutas relacionadas para mantener la carpeta `app` limpia y legible.",
				"**Layouts Compartidos:** Aplicar un archivo `_layout.tsx` específico a todas las rutas dentro de ese grupo.",
			],
		},
		{
			type: "callout",
			alertType: "info",
			text: "Ya hemos estado usando un grupo de rutas: `(tabs)`. El nombre `(tabs)` no aparece en la URL, pero nos permite aplicar un layout de pestañas a todas las pantallas dentro de ese directorio.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Caso de Uso: Flujo de Autenticación vs. Flujo Principal" },
		{
			type: "paragraph",
			text: "Un caso de uso clásico para los grupos es separar las pantallas de autenticación (login, registro) de las pantallas principales de la aplicación. Cada flujo tiene un layout diferente: el flujo de autenticación no debería tener una barra de pestañas, mientras que el flujo principal sí.",
		},
		{ type: "paragraph", text: "Imaginemos esta estructura de archivos:" },
		{
			type: "fileStructure",
			files: [
				{
					id: "fig-1",
					name: "app/_layout.tsx",
					description: [
						"Stack raíz: decide qué grupo está habilitado",
						"según el estado de sesión (lo vemos en la sección 3).",
					],
				},
				{
					id: "fig-2",
					name: "app/(auth)/_layout.tsx",
					description: [
						"Layout del grupo de autenticación: un Stack simple",
						"sin barra de pestañas.",
					],
				},
				{
					id: "fig-3",
					name: "app/(auth)/login.tsx",
					description: [
						"El archivo ES la ruta: se registra como /login",
						"sin escribir nada en ningún layout.",
					],
				},
				{
					id: "fig-4",
					name: "app/(auth)/register.tsx",
					description: [
						"Se registra automáticamente como /register.",
					],
				},
				{
					id: "fig-5",
					name: "app/(tabs)/_layout.tsx",
					description: [
						"El navegador de pestañas del flujo principal,",
						"el mismo que configuramos en la conf. 10.",
					],
				},
				{
					id: "fig-6",
					name: "app/(tabs)/index.tsx",
					description: [
						"Inicio del flujo logueado: la ruta /index,",
						"también registrada sola por ser archivo.",
					],
				},
			],
		},
		{
			type: "paragraph",
			text: "En el `_layout.tsx` del grupo `(auth)`, definimos un Stack simple:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';

export default function AuthLayout() {
  // Un Stack sin barra de pestañas
  return <Stack />;
}`,
		},
		{
			type: "paragraph",
			text: "Y en `app/(tabs)/_layout.tsx`, definimos nuestro `Tabs` como ya vimos en la conf. 10. Falta una pieza: quién decide qué grupo mostrar según el estado de sesión. Hacerlo a mano (render condicional en el layout raíz) era el patrón antiguo; Expo Router trae una herramienta mejor — el tema de la siguiente sección.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Protegiendo el Flujo con `Stack.Protected`" },
		{
			type: "paragraph",
			text: "En Expo Router, **todas las rutas existen siempre** y son accesibles por definición: crear el archivo crea la ruta. Para bloquear el acceso según el estado de sesión, usamos `<Stack.Protected>`: un `guard` booleano que decide si la pantalla está habilitada en cada render. Es la herramienta oficial de Expo Router v5+ para flujos de autenticación.",
		},
		{
			type: "paragraph",
			text: "El estado de sesión suele vivir en un React Context que envuelve toda la app (`useSession`). Con eso, el layout raíz queda así:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/_layout.tsx
import { Stack } from 'expo-router';
import { SessionProvider, useSession } from '../lib/session';

function NavigatorProtegido() {
  const { session } = useSession();

  return (
    <Stack>
      {/* (tabs) solo es accesible CON sesión iniciada */}
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* (auth) solo es accesible SIN sesión */}
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SessionProvider>
      {/* El componente que usa useSession debe quedar DENTRO del provider */}
      <NavigatorProtegido />
    </SessionProvider>
  );
}`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "¿Qué hace `guard`? Con `false`, la pantalla queda **blindada**: si el usuario intenta navegarla, o desembarca por un *deep link*, Expo Router lo redirige a la primera pantalla disponible. Y si el estado cambia **mientras la pantalla está activa** (el ejemplo clásico: `signOut` estando en Inicio), la redirección ocurre en el instante — sin escribir una sola línea de navegación.",
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Si encontrás tutoriales que renderizan grupos con un ternario (`session ? <TabsGroup /> : <AuthGroup />`) en el layout raíz: ese es el patrón anterior, enteramente reemplazado por `Stack.Protected`. La sesión real y persistente se guarda con `expo-secure-store` — lo vemos en la conf. 14.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Rutas Fuera de Grupos de Navegación" },
		{
			type: "paragraph",
			text: "A veces necesitas que una pantalla no pertenezca a un layout de navegación específico. Por ejemplo, una pantalla de detalles de un producto que se abre desde una pestaña, pero que debe ocupar toda la pantalla y ocultar la barra de pestañas.",
		},
		{
			type: "paragraph",
			text: "Lo que decide el apilamiento es la **ubicación del archivo**: una pantalla en la raíz de `app/` (fuera del grupo) es hermana de `(tabs)` en el Stack raíz, y por eso se apila encima de él. La entrada en el layout es opcional y solo sirve para opciones.",
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
      {/* El grupo de pestañas se trata como una sola pantalla en el Stack */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Estas entradas son SOLO opciones: la existencia ya la dieron los archivos */}
      <Stack.Screen
        name="product/[id]"
        options={{ title: 'Detalle del Producto' }}
      />

      {/* Una pantalla modal que podría aparecer desde cualquier lugar */}
      <Stack.Screen
        name="share-modal"
        options={{ presentation: 'modal', title: 'Compartir' }}
      />
    </Stack>
  );
}`,
		},
		{
			type: "list",
			items: [
				"`product/[id].tsx` vive en la **raíz** de `app/` (fuera del grupo), así que es hermana de `(tabs)` — y al navegar a un producto, se apila **encima** de todo, ocultando temporalmente la interfaz de pestañas. Un `router.push('/product/42')` alcanza.",
				"La opción `presentation: 'modal'` es una forma poderosa de mostrar pantallas que se deslizan desde abajo, ideal para formularios o diálogos de acción.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "5. Tarea Práctica: Separa el Flujo de Autenticación" },
		{
			type: "assignment",
			assignmentId: "conf-12-grupos-protected",
			description: [
				"**Requisitos:**",
				"1. Crea el grupo `(auth)` con `(auth)/login.tsx`, `(auth)/register.tsx` y `(auth)/_layout.tsx` con un `<Stack />` simple. **No registres nada a mano**: los archivos bastan.",
				"2. Crea un contexto de sesión mínimo (`session`, `signIn`, `signOut`) y ponélo en el layout raíz, envolviendo el navegador.",
				"3. En el layout raíz, envuelve `(tabs)` con `<Stack.Protected guard={!!session}>` y el grupo `(auth)` con `guard={!session}`.",
				"4. En `login.tsx`, inicia la sesión con `signIn()` y navega con `router.replace('/')`: `replace` borra el historial, así el botón Volver no te trae el login de vuelta.",
				"5. Verifica: al hacer `signOut()` estando en Inicio, la app redirige sola a `/login` — eso es `Stack.Protected` trabajando, sin una línea de navegación escrita por vos.",
				"La solución de referencia guarda la sesión en un `useState` del provider (mock). Para una sesión real y persistente, seguiría `expo-secure-store`, como veremos en la conf. 14.",
			],
			code: `
// lib/session.tsx
import { createContext, use, useState } from 'react';
import type { PropsWithChildren } from 'react';

const SessionContext = createContext<{
  session: boolean;
  signIn: () => void;
  signOut: () => void;
} | null>(null);

export function useSession() {
  const value = use(SessionContext);
  if (!value) {
    throw new Error('useSession debe usarse dentro de <SessionProvider />');
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  // Mock: la sesión real y persistente vive en expo-secure-store (conf. 14)
  const [session, setSession] = useState(false);

  return (
    <SessionContext.Provider
      value={{
        session,
        signIn: () => setSession(true),
        signOut: () => setSession(false),
      }}>
      {children}
    </SessionContext.Provider>
  );
}

// app/_layout.tsx
import { Stack } from 'expo-router';
import { SessionProvider, useSession } from '../lib/session';

function NavigatorProtegido() {
  const { session } = useSession();

  return (
    <Stack>
      {/* (tabs) solo es accesible CON sesión iniciada */}
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* (auth) solo es accesible SIN sesión */}
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SessionProvider>
      {/* El componente que usa useSession debe quedar DENTRO del provider */}
      <NavigatorProtegido />
    </SessionProvider>
  );
}

// app/(auth)/login.tsx
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useSession } from '../../lib/session';

export default function Login() {
  const { signIn } = useSession();

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Ingresar</Text>

      <Pressable
        style={styles.boton}
        onPress={() => {
          signIn();
          // replace: sin el login detrás en el historial
          router.replace('/');
        }}
      >
        <Text>Iniciar sesión</Text>
      </Pressable>
    </View>
  );
}

// styles… (idem: contenedor centrado, botón de borde)

// app/(tabs)/index.tsx
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSession } from '../../lib/session';

export default function Inicio() {
  const { signOut } = useSession();

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Inicio</Text>

      {/* signOut cambia el guard y Protected redirige a /login solo */}
      <Pressable style={styles.boton} onPress={() => signOut()}>
        <Text>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}
`,
		},
	],
};
