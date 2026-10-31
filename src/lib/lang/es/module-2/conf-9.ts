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
			type: "callout",
			alertType: "info",
			text: "`app` o `src/app`: los proyectos creados con la plantilla oficial (`bun create expo`) colocan el directorio de rutas en `src/app/`. Expo Router también acepta un directorio `app/` en la raíz del proyecto; ambas ubicaciones son equivalentes. En esta conferencia usamos `app/` por brevedad: si tu proyecto tiene `src/app/`, todo lo que veas aquí funciona igual anteponiendo `src/` a cada ruta.",
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
			type: "stackDemo",
			stackDemo: {
				screens: [
					{ id: "index", route: "/", name: "Inicio" },
					{ id: "details", route: "/details", name: "Detalles" },
					{ id: "profile", route: "/profile", name: "Perfil" },
				],
				backLabel: "Volver atrás",
				resetLabel: "Reiniciar",
				caption: "Prueba la pila: push coloca una pantalla nueva arriba, Volver atrás retira la visible y replace la sustituye sin dejarla en la historia.",
			},
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
			text: "Vamos a crear una nueva pantalla. Crea un archivo llamado `app/details.tsx`. Esto crea automáticamente la ruta `/details`.",
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
			text: "¿Y ahora qué? Nada: crear el archivo fue suficiente. Expo Router registra cada archivo del directorio en el navegador que lo envuelve, así que la ruta `/details` ya existe y el Stack ya sabe cómo mostrarla.",
		},
		{
			type: "fileStructure",
			files: [
				{
					id: "layout",
					name: "app/_layout.tsx",
					description: [
						"Define el Stack Navigator que envuelve todas las pantallas del directorio `app`.",
						"Aquí se personalizan las pantallas cuando lo necesitamos (títulos, estilos del encabezado), pero no es el registro de las rutas.",
					],
				},
				{
					id: "index",
					name: "app/index.tsx",
					description: [
						"La pantalla inicial, la ruta `/`.",
						"Es la primera ruta del Stack, por lo que el navegador la carga por defecto.",
					],
				},
				{
					id: "details",
					name: "app/details.tsx",
					description: [
						"Se convierte automáticamente en la ruta `/details`.",
						"Crear el archivo alcanza: declararla en el layout solo se hace si queremos configurar opciones para ella.",
					],
				},
			],
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Error común: pensar que cada pantalla hay que «registrarla» manualmente en `_layout.tsx`. No es así. Si agregaste `app/data.tsx`, la ruta `/data` ya funciona. `<Stack.Screen>` es opcional y solo sirve para configurar opciones (título, estilos del encabezado).",
		},
		{
			type: "paragraph",
			text: "Para navegar entre pantallas declarativamente, usamos el componente `<Link>` de `expo-router`. Es el equivalente a la etiqueta `<a>` en la web. Modifiquemos `app/index.tsx` para añadir un enlace a la pantalla de detalles.",
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

		{
			type: "subtitle",
			text: "4. Navegación Programática con `router`",
		},
		{
			type: "paragraph",
			text: "`<Link>` es navegación **declarativa**: describes el destino en el JSX y el componente se encarga del resto. Pero muchas navegaciones ocurren después de una acción del usuario, como enviar un formulario o confirmar un guardado. Para esos casos, Expo Router exporta el hook `useRouter`, que devuelve un objeto `router` con métodos de navegación.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
      <Text>Pantalla de Inicio</Text>
      <Button
        title="Ir a Detalles"
        onPress={() => router.push('/details')}
      />
      <Button title="Volver atrás" onPress={() => router.back()} />
    </View>
  );
}`,
		},
		{
			type: "twoColumn",
			columns: [
				{
					title: "`<Link>`: declarativa",
					content: [
						"Se describe en el JSX: `<Link href=\"/details\">`.",
						"Ideal para contenido visible: listas, tarjetas, menús.",
						"Es el equivalente de la etiqueta `<a>` de la web.",
					],
				},
				{
					title: "`router`: programática",
					content: [
						"Se ejecuta como código: `router.push('/details')`.",
						"Ideal para acciones dentro de callbacks: envíos, confirmaciones, flujos.",
						"`router.back()` regresa a la pantalla anterior y `router.replace('/')` navega sustituyendo la pantalla actual en la historia.",
					],
				},
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "5. Configuración de Opciones de Pantalla" },
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
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#f4511e' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Inicio' }} />
      <Stack.Screen name="details" options={{ title: 'Detalles de la App' }} />
    </Stack>
  );
}`,
		},
		{
			type: "paragraph",
			text: "Con `screenOptions` definimos opciones comunes para todas las pantallas del Stack de una sola vez; cada `<Stack.Screen>` puede sobrescribir con su propio `options` lo que necesite.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "6. Tarea Práctica: Navega la Pila" },
		{
			type: "assignment",
			assignmentId: "conf-9-stack-tres-rutas",
			description: [
				"**Requisitos:**",
				"1. Crea dos pantallas nuevas: `app/profile.tsx` y `app/settings.tsx`. **No declares ninguna de las dos dentro de `<Stack>`**: el registro automático debe encargarse.",
				"2. En `app/index.tsx` agrega un `<Link>` hacia `/profile` y un `<Button>` que navegue a `/settings` con `router.push`.",
				"3. En `app/settings.tsx` agrega un botón «Volver» que ejecute `router.back()`.",
				"4. En `app/_layout.tsx` usa `screenOptions` para aplicar a todas las pantallas un `backgroundColor` de encabezado en común y un `headerTintColor` legible.",
				"5. Personaliza el título de `app/profile.tsx` —sin declararla en el layout— renderizando `<Stack.Screen options={{ title: 'Mi Perfil' }} />` dentro de la pantalla.",
				"La solución de referencia se apoya en un componente `Pantalla` reutilizable: las cuatro pantallas solo declaran su nombre de archivo, y toda la lógica de navegación (`push`, `replace`, `back`, `dismissAll`) vive en un único lugar.",
			],
			code: `
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#f4511e' },
        headerTintColor: '#fff',
      }}
    >
      {/* Solo el título del inicio; profile y settings se registran solas */}
      <Stack.Screen name="index" options={{ title: 'Inicio' }} />
    </Stack>
  );
}

// components/Pantalla.tsx — pantalla común reutilizable
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

type Props = {
  archivo: string; // solo para mostrarlo en pantalla, ej. "app/details.tsx"
};

function Boton({
  texto,
  onPress,
  deshabilitado = false,
}: {
  texto: string;
  onPress: () => void;
  deshabilitado?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={deshabilitado}
      style={({ pressed }) => [
        styles.boton,
        pressed && styles.botonPresionado,
        deshabilitado && styles.botonDeshabilitado,
      ]}
    >
      <Text style={styles.botonTexto}>{texto}</Text>
    </Pressable>
  );
}

export default function Pantalla({ archivo }: Props) {
  const router = useRouter();
  const hayAnterior = router.canGoBack();

  return (
    <View style={styles.contenedor}>
      <Text style={styles.archivo}>{archivo}</Text>

      <View style={styles.acciones}>
        {/* push: añade una pantalla encima de la pila */}
        <Boton texto="push Detalles" onPress={() => router.push('/details')} />
        <Boton texto="push Perfil" onPress={() => router.push('/profile')} />
        <Boton texto="push Ajustes" onPress={() => router.push('/settings')} />

        {/* replace: cambia la pantalla actual sin crecer la pila */}
        <Boton texto="replace Ajustes" onPress={() => router.replace('/settings')} />

        {/* back: quita la pantalla de arriba */}
        <Boton texto="back" onPress={() => router.back()} deshabilitado={!hayAnterior} />

        {/* dismissAll: vuelve a la primera pantalla de la pila */}
        <Boton
          texto="dismissAll"
          onPress={() => router.dismissAll()}
          deshabilitado={!hayAnterior}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    padding: 24,
  },
  archivo: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#555',
  },
  acciones: {
    width: '100%',
    gap: 10,
  },
  boton: {
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbb',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  botonPresionado: { backgroundColor: '#eee' },
  botonDeshabilitado: { opacity: 0.4 },
  botonTexto: { fontSize: 15 },
});

// app/index.tsx
import { Link } from 'expo-router';
import Pantalla from '../components/Pantalla';

export default function Inicio() {
  return (
    <>
      <Link href="/profile" style={{ alignSelf: 'center', margin: 12 }}>
        Ir al perfil
      </Link>
      <Pantalla archivo="app/index.tsx" />
    </>
  );
}

// app/details.tsx
import Pantalla from '../components/Pantalla';

export default function Detalles() {
  return <Pantalla archivo="app/details.tsx" />;
}

// app/profile.tsx — título propio sin declararla en el layout
import { Stack } from 'expo-router';
import Pantalla from '../components/Pantalla';

export default function Perfil() {
  return (
    <>
      <Stack.Screen options={{ title: 'Mi Perfil' }} />
      <Pantalla archivo="app/profile.tsx" />
    </>
  );
}

// app/settings.tsx
import Pantalla from '../components/Pantalla';

export default function Ajustes() {
  return <Pantalla archivo="app/settings.tsx" />;
}
`,
		},
	],
};
