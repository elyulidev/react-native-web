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

		{
			type: "subtitle",
			text: "2. Caso de Uso: Flujo de Autenticación vs. Flujo Principal",
		},
		{
			type: "paragraph",
			text: "Un caso de uso clásico para los grupos es separar las pantallas de autenticación (login, registro) de las pantallas principales de la aplicación. Cada flujo tiene un layout diferente: el flujo de autenticación no debería tener una barra de pestañas, mientras que el flujo principal sí.",
		},
		{ type: "paragraph", text: "Imaginemos esta estructura de archivos:" },
		{
			type: "code",
			language: "bash",
			code: `
app/
├── (auth)/
│   ├── _layout.tsx      # Layout para el Stack de autenticación
│   ├── login.tsx        # Ruta /login
│   └── register.tsx     # Ruta /register
├── (tabs)/
│   ├── _layout.tsx      # Layout para el Tab Navigator principal
│   ├── home.tsx         # Ruta /home
│   └── profile.tsx      # Ruta /profile
└── _layout.tsx          # Layout Raíz que decide qué grupo mostrar
      `,
		},
		{
			type: "paragraph",
			text: "En el `_layout.tsx` del grupo `(auth)`, definiríamos un Stack simple:",
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
			text: "Mientras que en `app/(tabs)/_layout.tsx`, definimos nuestro `Tabs` como ya hemos visto. El layout raíz (`app/_layout.tsx`) sería el responsable de decidir qué grupo renderizar, normalmente basándose en si el usuario está autenticado o no.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Rutas Fuera de Grupos de Navegación" },
		{
			type: "paragraph",
			text: "A veces necesitas que una pantalla no pertenezca a un layout de navegación específico. Por ejemplo, una pantalla de detalles de un producto que se abre desde una pestaña, pero que debe ocupar toda la pantalla y ocultar la barra de pestañas.",
		},
		{
			type: "paragraph",
			text: "La clave para lograr esto es la jerarquía en nuestro `StackNavigator` raíz (`app/_layout.tsx`).",
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

      {/* Esta pantalla de detalles se apilará ENCIMA del Tab Navigator */}
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
				"Al colocar `product/[id]` como un hermano de `(tabs)` en el Stack raíz, le decimos a Expo Router que cuando naveguemos a un producto, esta nueva pantalla debe apilarse encima de todo, ocultando temporalmente la interfaz de pestañas.",
				"La opción `presentation: 'modal'` es una forma poderosa de mostrar pantallas que se deslizan desde abajo, ideal para formularios o diálogos de acción.",
			],
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Cuál es el principal beneficio de nombrar un directorio como `(marketing)`?",
					options: [
						"Hace que todas las rutas dentro sean privadas.",
						"Permite organizar archivos en un grupo sin que '(marketing)' aparezca en la URL.",
						"Aplica automáticamente un tema de marketing a las pantallas.",
						"Es solo una convención de nomenclatura sin efecto técnico.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Si tienes una ruta `app/(shop)/settings.tsx`, ¿cuál será su URL final?",
					options: [
						"/(shop)/settings",
						"/shop/settings",
						"/settings",
						"/app/(shop)/settings",
					],
					correctAnswer: 2,
				},
				{
					question:
						"En un Stack Navigator raíz, ¿cómo te aseguras de que una pantalla de detalles (`details.tsx`) se muestre encima de tu Tab Navigator (`(tabs)`)?",
					options: [
						"Moviendo `details.tsx` dentro de la carpeta `(tabs)`.",
						"Declarando `<Stack.Screen name='details' />` como hermano de `<Stack.Screen name='(tabs)' />` en el layout raíz.",
						"Usando un `Link` especial con una propiedad `overlay`.",
						"No es posible, las pantallas de detalle siempre deben estar dentro de las pestañas.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"¿Qué opción de `Stack.Screen` usarías para que una pantalla se presente como una ventana modal que se desliza desde abajo?",
					options: [
						"`style: 'modal'`",
						"`isModal: true`",
						"`mode: 'modal'`",
						"`presentation: 'modal'`",
					],
					correctAnswer: 3,
				},
			],
		},
	],
};
