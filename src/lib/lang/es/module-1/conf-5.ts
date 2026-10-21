import type { CurriculumTopic } from "../../../../types/types";

export const conference5: CurriculumTopic = {
	id: "conf-5",
	title: "Conf. 5: Estilización y StyleSheet",
	content: [
		{ type: "heading", text: "Estilización Básica y StyleSheet" },
		{
			type: "paragraph",
			text: "¡Bienvenidos a esta sesión sobre la estilización en React Native! Hoy exploraremos cómo dar vida a nuestras aplicaciones móviles, centrándonos en las herramientas y mejores prácticas para una estilización eficiente y mantenible.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			id: "box-model",
			text: "1. El Modelo de Caja y sus Diferencias con la Web",
		},
		{
			type: "paragraph",
			text: "En React Native, construimos interfaces utilizando componentes que se mapean a vistas nativas. Esto difiere de la web, donde usamos elementos HTML. Los componentes más básicos para la estructura son `<View>` y `<Text>`.",
		},
		{
			type: "twoColumn",
			columns: [
				{
					title: "React Native",
					content: [
						"**<View>**: Es el componente más fundamental, equivalente a un `<div>`. Es un contenedor que soporta layout con flexbox y estilos.",
						"**<Text>**: Cualquier texto, sin importar su longitud, **debe** estar envuelto en un componente `<Text>`. Funciona como `<p>`, `<h1>` o `<span>`.",
					],
				},
				{
					title: "Web (HTML)",
					content: [
						"**<div>**: Un contenedor genérico para agrupar contenido y aplicar estilos.",
						"**<p>, <h1>, <span>**: Múltiples elementos para mostrar texto, cada uno con su propio comportamiento semántico y de estilo por defecto.",
					],
				},
			],
		},
		{
			type: "paragraph",
			text: "En la web, un `<div>` no se convierte en contenedor flex hasta que escribes `display: flex` en su CSS. En React Native no hace falta: **todo `<View>` es ya un contenedor flex por defecto**, así que sus hijos se reparten con las reglas de flexbox desde el primer render.",
		},
		{
			type: "callout",
			alertType: "warning",
			text: "¡Importante! Si intentas colocar texto directamente dentro de un `<View>` sin envolverlo en un `<Text>`, la aplicación lanzará un error. Todo texto debe estar explícitamente contenido.",
		},

		{ type: "divider" },

		{
			type: "subtitle",
			id: "stylesheet",
			text: "2. Creación de Estilos con `StyleSheet.create()`",
		},
		{
			type: "paragraph",
			text: "`StyleSheet` es una abstracción de React Native similar a las hojas de estilo CSS. En lugar de escribir CSS, definimos estilos usando objetos JavaScript, lo que mantiene el JSX limpio y te permite tipar las propiedades de estilo.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StyleSheetExample() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Hola, React Native!</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>Este es un ejemplo de StyleSheet.</Text>
      </View>
    </View>
  );
}

// Se definen los estilos fuera del componente.
const styles = StyleSheet.create({
  container: {
    flex: 1, // ocupa todo el espacio disponible del padre
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    // boxShadow funciona igual en Android y en iOS (disponible desde RN 0.76).
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
  },
  cardText: {
    fontSize: 16,
    color: 'darkslateblue',
  }
});`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "**¿Qué hace `flex: 1`?** Le pide al contenedor que ocupe todo el espacio disponible dentro de su padre. Es la primera de las dos propiedades de flexbox que vas a ver en detalle en la sección 3.",
		},
		{
			type: "callout",
			alertType: "info",
			text: "**Sombras multiplataforma:** `boxShadow` funciona igual en Android y en iOS desde React Native 0.76. Antes de esa versión se usaba `elevation` en Android y `shadowColor` + `shadowOffset` + `shadowOpacity` + `shadowRadius` en iOS.",
		},
		{
			type: "list",
			items: [
				"**Claridad del código:** Al mover los estilos fuera de la función de renderizado, el JSX se mantiene limpio y legible.",
				"**Semántica y reutilización:** Nombrar los estilos (ej. `styles.card`) añade significado y permite reutilizarlos fácilmente.",
				"**Tipado estricto:** `StyleSheet.create()` valida los estilos contra las propiedades nativas de cada plataforma, así que un error tipográfico o una propiedad inexistente se detecta al escribir el código.",
				"**Composición:** `StyleSheet.compose` combina dos estilos aplicando el segundo sobre el primero, y `StyleSheet.flatten` aplana un array de estilos en un único objeto.",
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			id: "flexbox",
			text: "3. Dominando Flexbox en React Native",
		},
		{
			type: "paragraph",
			text: "Flexbox es el pilar del diseño de layouts en React Native. Permite crear interfaces complejas y adaptables de manera predecible. La principal diferencia con la web es la dirección por defecto.",
		},
		{
			type: "callout",
			alertType: "tip",
			text: "**Diferencia clave:** En React Native, `flexDirection` es `'column'` por defecto, mientras que en la web es `'row'`. Los elementos se apilan verticalmente.",
		},
		{
			type: "callout",
			alertType: "info",
			text: "**Nada de `display: flex`:** las imágenes de esta sección están anotadas con la notación de CSS, donde un contenedor necesita `display: flex` para convertirse en flex. En React Native eso ya está hecho: todo `<View>` es un contenedor flex por defecto, así que en tu código nunca vas a escribir `display: flex`.",
		},
		{
			type: "image",
			imageUrl:
				process.env.NODE_ENV === "production"
					? "https://kvskvfok8cknjmpl.public.blob.vercel-storage.com/conf5/flex-direction.webp"
					: "/conf5/flex-direction.webp",
			caption:
				'`flexDirection`: "column" (izquierda, por defecto) apila los elementos verticalmente. "row" (derecha) los alinea horizontalmente.',
		},
		{
			type: "paragraph",
			text: "Este es el código mínimo que reproduce el cuadro anterior. Cambia `flexDirection` y observa cómo los tres hijos se reorganizan.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { View, Text, StyleSheet } from 'react-native';

type ItemProps = { label: string };

const Item = ({ label }: ItemProps) => <Text style={styles.item}>{label}</Text>;

// Defaults de flexbox en React Native:
//   justifyContent: 'flex-start' -> los hijos se pegan al inicio del eje principal.
//   alignItems: 'stretch'         -> los hijos se estiran hasta ocupar el eje transversal.
// Este ejemplo solo toca flexDirection. Los items tienen width y height fijos,
// así que el 'stretch' de alignItems no los deforma.
export default function FlexDirectionExample() {
  return (
    <View style={styles.container}>
      {/* flexDirection: 'row' -> los hijos se alinean en horizontal */}
      <View style={styles.row}>
        <Item label="1" />
        <Item label="2" />
        <Item label="3" />
      </View>

      {/* flexDirection: 'column' -> los hijos se apilan en vertical (valor por defecto) */}
      <View style={styles.column}>
        <Item label="1" />
        <Item label="2" />
        <Item label="3" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  row: { flexDirection: 'row', backgroundColor: '#1E90FF', padding: 8 },
  column: { flexDirection: 'column', backgroundColor: '#1E90FF', padding: 8 },
  item: {
    width: 48,
    height: 48,
    lineHeight: 48, // centra el numero en vertical
    textAlign: 'center', // lo centra en horizontal
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#ffffff',
    margin: 4,
  },
});`,
		},
		{
			type: "paragraph",
			text: "`justifyContent` alinea los elementos a lo largo del eje principal (el eje de `flexDirection`).",
		},
		{
			type: "image",
			imageUrl:
				process.env.NODE_ENV === "production"
					? "https://kvskvfok8cknjmpl.public.blob.vercel-storage.com/conf5/jc-all.webp"
					: "/conf5/jc-all.webp",

			caption:
				'Opciones de `justifyContent` con `flexDirection: "column"`. Controla el espaciado vertical.',
		},
		{
			type: "paragraph",
			text: "Este playground reproduce los seis cuadros de `justifyContent` que acabas de ver. Toca cada botón y observa cómo se reparten los tres hijos a lo largo del eje principal.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { useState } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

const OPCIONES = [
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
] as const;

type JustifyContent = (typeof OPCIONES)[number];

// Una nota por valor: el texto de abajo cambia con el botón que toques.
const DESCRIPCIONES: Record<JustifyContent, string> = {
  'flex-start': 'Los items se pegan al inicio del eje principal, sin espacio entre ellos.',
  'center': 'Los items se agrupan en el centro del eje principal.',
  'flex-end': 'Los items se pegan al final del eje principal.',
  'space-between': 'El espacio sobrante queda solo entre los items: el primero al inicio y el último al final.',
  'space-around': 'Cada item recibe el mismo espacio a cada lado, así que entre dos items hay el doble que en los bordes.',
  'space-evenly': 'El espacio sobrante se reparte por igual: entre los items y también en los bordes.',
};

export default function JustifyContentPlayground() {
  const [justifyContent, setJustifyContent] = useState<JustifyContent>('flex-start');

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        {OPCIONES.map((opcion) => {
          const activo = opcion === justifyContent;

          return (
            <Pressable
              key={opcion}
              onPress={() => setJustifyContent(opcion)}
              style={[styles.button, activo && styles.buttonActive]}
            >
              <Text style={[styles.buttonText, activo && styles.buttonTextActive]}>
                {opcion}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* El contenedor azul es el mismo de los cuadros de la imagen. */}
      <View style={[styles.demo, { justifyContent }]}>
        {['1', '2', '3'].map((n) => (
          <View key={n} style={styles.item}>
            <Text style={styles.itemText}>{n}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.current}>justifyContent: {justifyContent}</Text>
      <Text style={styles.description}>{DESCRIPCIONES[justifyContent]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  buttons: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#e2e8f0',
  },
  buttonActive: { backgroundColor: '#1E90FF' },
  buttonText: { fontSize: 12, color: '#0f172a' },
  buttonTextActive: { color: '#ffffff' },
  demo: { height: 220, backgroundColor: '#1E90FF', padding: 8 },
  item: {
    width: 48,
    height: 48,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: { fontSize: 16, color: '#000000' },
  current: { fontSize: 12, color: '#475569' },
  description: { fontSize: 13, color: '#334155', lineHeight: 19 },
});`,
		},
		{
			type: "paragraph",
			text: "**Ojo con `space-around` y `space-evenly`:** parecen iguales, pero no lo son. `space-around` reparte el sobrante alrededor de cada item, así que entre dos items hay el doble de espacio que en los bordes. `space-evenly` reparte el sobrante por igual, incluidos los bordes. Con 100 px libres y 3 items: `space-around` deja 17 px en cada borde y 33 px entre items, mientras que `space-evenly` deja 25 px en todos los lugares.",
		},
		{
			type: "paragraph",
			text: "`alignItems` alinea los elementos a lo largo del eje transversal (perpendicular al eje principal).",
		},
		{
			type: "image",
			imageUrl:
				process.env.NODE_ENV === "production"
					? "https://kvskvfok8cknjmpl.public.blob.vercel-storage.com/conf5/ai-all.png"
					: "/conf5/ai-all.webp",

			caption:
				'Opciones de `alignItems` con `flexDirection: "column"`. Controla la alineación horizontal.',
		},
		{
			type: "paragraph",
			text: "Este playground hace lo mismo con `alignItems`. Fíjate en que `stretch` y `baseline` solo se notan cuando los hijos no tienen un ancho fijo.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { useState } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

const OPCIONES = ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'] as const;

type AlignItems = (typeof OPCIONES)[number];

// Una nota por valor: el texto de abajo cambia con el botón que toques.
const DESCRIPCIONES: Record<AlignItems, string> = {
  'flex-start': 'Los items se pegan al inicio del eje transversal.',
  'center': 'Los items se centran en el eje transversal.',
  'flex-end': 'Los items se pegan al final del eje transversal.',
  'stretch': 'Los items se estiran hasta ocupar todo el eje transversal: por eso este playground no les define width.',
  'baseline': 'Los items alinean su primera línea de texto: los tres números quedan apoyados en la misma base aunque tengan tamaños distintos.',
};

// Tamaños de fuente distintos para que se note el caso 'baseline'.
const TAMANOS = [16, 24, 32];

export default function AlignItemsPlayground() {
  const [alignItems, setAlignItems] = useState<AlignItems>('flex-start');

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        {OPCIONES.map((opcion) => {
          const activo = opcion === alignItems;

          return (
            <Pressable
              key={opcion}
              onPress={() => setAlignItems(opcion)}
              style={[styles.button, activo && styles.buttonActive]}
            >
              <Text style={[styles.buttonText, activo && styles.buttonTextActive]}>
                {opcion}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={[styles.demo, { alignItems }]}>
        {TAMANOS.map((tamano, indice) => (
          <View key={tamano} style={styles.item}>
            <Text style={[styles.itemText, { fontSize: tamano }]}>{indice + 1}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.current}>alignItems: {alignItems}</Text>
      <Text style={styles.description}>{DESCRIPCIONES[alignItems]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  buttons: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#e2e8f0',
  },
  buttonActive: { backgroundColor: '#1E90FF' },
  buttonText: { fontSize: 12, color: '#0f172a' },
  buttonTextActive: { color: '#ffffff' },
  demo: { height: 220, backgroundColor: '#1E90FF', padding: 8 },
  item: { backgroundColor: '#ffffff', paddingHorizontal: 12, paddingVertical: 8, margin: 2 },
  itemText: { color: '#000000' },
  current: { fontSize: 12, color: '#475569' },
  description: { fontSize: 13, color: '#334155', lineHeight: 19 },
});`,
		},
		{
			type: "paragraph",
			text: "**Ojo con `baseline`:** no alinea los items por su caja, sino por la **base de su primera línea de texto**. Por eso en el playground los tres números tienen tamaños de fuente distintos: con `flex-start` se apilan desde arriba, mientras que con `baseline` quedan los tres apoyados sobre la misma línea base, como cuando tienes un título grande y un subtítulo chico en la misma fila.",
		},
		{
			type: "paragraph",
			text: "`gap` define el espaciado entre los hijos sin necesidad de márgenes. Está disponible desde React Native 0.71 y es la forma recomendada de separar elementos dentro de un layout.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// Con flexDirection: 'row', el comportamiento es similar al de la web.
// justifyContent controla el eje horizontal y alignItems el vertical.
<>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
    <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />
    <View style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
  </View>

  {/* gap separa los hijos sin usar márgenes. */}
  <View style={{ flexDirection: 'row', gap: 12 }}>
    <View style={{ flex: 1, height: 50, backgroundColor: 'red' }} />
    <View style={{ flex: 1, height: 50, backgroundColor: 'green' }} />
    <View style={{ flex: 1, height: 50, backgroundColor: 'blue' }} />
  </View>
</>
`,
		},
		{
			type: "paragraph",
			text: "**`flex: 1`:** es la forma corta de `flexGrow: 1`, `flexShrink: 1` y `flexBasis: '0%'`. Le dice al hijo que crezca para ocupar el espacio que sobra, que se encoja si no entra y que parta de una base de tamaño cero. Sin ella (`flex: 0`, que es el valor por defecto) el hijo mide exactamente lo que mide su contenido.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { View, Text, StyleSheet } from 'react-native';

export default function FlexGrowExample() {
  return (
    <View style={styles.container}>
      {/* flex: 0 (el default) -> mide solo lo que mide su contenido */}
      <View style={styles.fixed}>
        <Text style={styles.text}>fijo</Text>
      </View>

      {/* flex: 1 -> crece y se queda con el espacio que sobra */}
      <View style={styles.grow}>
        <Text style={styles.text}>crece</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', padding: 16 },
  fixed: { backgroundColor: '#1E90FF', padding: 12 },
  grow: { flex: 1, backgroundColor: '#38BDF8', padding: 12 },
  text: { color: '#ffffff' },
});`,
		},
		{
			type: "paragraph",
			text: "La caja azul se queda con el tamaño de su texto, mientras que la celeste se lleva todo el espacio que sobra. Es el mismo `flex: 1` que ves en el `container` de los ejemplos anteriores: ahí hace que la pantalla entera se ocupe.",
		},

		{ type: "divider" },

		{
			type: "subtitle",
			id: "stylesheet-vs-inline",
			text: "4. Ventajas de `StyleSheet` Frente a Estilos en Línea",
		},
		{
			type: "paragraph",
			text: "Aunque técnicamente puedes pasar un objeto de estilo directamente a un componente, usar `StyleSheet.create()` es la práctica recomendada por varias razones clave.",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "CodeBracketIcon",
					title: "Legibilidad y Organización",
					text: "Los estilos en línea desordenan el JSX. `StyleSheet` los mantiene separados y limpios, mejorando la mantenibilidad.",
				},
				{
					icon: "ArrowPathIcon",
					title: "Reutilización de Estilos",
					text: "Define un estilo una vez y reutilízalo en múltiples componentes. Esto sigue el principio DRY (Don't Repeat Yourself).",
				},
				{
					icon: "RectangleStackIcon",
					title: "Composición de Estilos",
					text: "`StyleSheet.compose` aplica un estilo sobre otro sin duplicar reglas, y `StyleSheet.flatten` convierte un array de estilos en un único objeto.",
				},
				{
					icon: "SparklesIcon",
					title: "Autocompletado y Validación",
					text: "Con TypeScript, `StyleSheet.create()` valida cada propiedad contra los estilos nativos de la plataforma: un `marginTopt` mal escrito se marca en el editor, no en el dispositivo. Los IDEs además completan los nombres de estilo por ti.",
				},
			],
		},
		{
			type: "callout",
			alertType: "info",
			text: "**¿Y el rendimiento?** Desde React Native 0.56, `StyleSheet.create()` ya no ofrece ventaja de rendimiento sobre los estilos en línea: su beneficio real es la organización y el tipado. Con la arquitectura nueva (la única desde RN 0.82) los estilos en línea también son válidos. En la siguiente conferencia vas a ver NativeWind, que lleva los estilos reutilizables un paso más allá.",
		},

		{ type: "divider" },

		{
			type: "subtitle",
			id: "theming",
			text: "5. Introducción a la Gestión de Temas",
		},
		{
			type: "paragraph",
			text: "La gestión de temas permite una estilización consistente y fácil de adaptar a diferentes modos (claro/oscuro) o marcas. Esto se logra combinando estilos centralizados con el Context API de React.",
		},
		{
			type: "image",
			imageUrl:
				process.env.NODE_ENV === "production"
					? "https://kvskvfok8cknjmpl.public.blob.vercel-storage.com/conf5/dark-light-mode.webp"
					: "/conf5/dark-light-mode.webp",

			caption:
				"Una interfaz de usuario que se adapta al modo claro y oscuro para una mejor experiencia de usuario.",
		},
		{
			type: "list",
			items: [
				"**Colores Centralizados:** Define una paleta de colores para los modos claro y oscuro en un archivo de constantes.",
				'**Contexto del Tema:** Crea un `ThemeContext` que provea el tema actual (ej. "light" o "dark") y una función para cambiarlo.',
				"**Preferencia del Sistema:** El hook `useColorScheme` de React Native ya devuelve el modo claro u oscuro según la configuración del dispositivo. Úsalo como valor por defecto antes de permitir que la persona elija manualmente.",
				"**Hook Personalizado (`useTheme`):** Un hook simple `useTheme` que consume el contexto y devuelve los colores del tema activo.",
				"**Persistencia:** Usa `AsyncStorage` para guardar la preferencia de tema entre sesiones. `expo-secure-store` es para secretos, como tokens o claves: no lo uses para preferencias de interfaz.",
				"**StatusBar Dinámica:** Utiliza el componente `<StatusBar>` para cambiar el estilo de la barra de estado (claro/oscuro) según el tema activo.",
			],
		},
		{
			type: "code",
			language: "typescript",
			code: `
// hook-conceptual.ts
import { useContext } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeContext, colores } from './ThemeProvider';

export const useTheme = () => {
  const { theme } = useContext(ThemeContext); // Tema elegido, puede ser undefined
  const preferenciaSistema = useColorScheme(); // 'light' | 'dark' | null
  return colores[theme ?? preferenciaSistema ?? 'light'];
};

// Component.tsx
import { View, Text } from 'react-native';
import { useTheme } from './hooks/useTheme';

export default function ThemedComponent() {
  const colors = useTheme(); // Obtiene los colores del tema activo

  return (
    // Los estilos se adaptan dinámicamente
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Contenido aquí</Text>
    </View>
  );
}`,
		},
		{ type: "divider" },
		{
			type: "heading",
			text: "Tarea Extraclase: Sistema de Estilos con Tema Claro y Oscuro",
		},
		{
			type: "paragraph",
			text: "Pon en práctica lo aprendido llevando una pantalla a un sistema de estilos coherente y con soporte de tema claro y oscuro. Esta tarea es individual y deberás entregar un informe simple con capturas y las respuestas a las preguntas finales.",
		},
		{
			type: "list",
			items: [
				"1. **Crea un proyecto** llamado `mi-estilos-tema` con `bun create expo mi-estilos-tema` e inícialo con `bun expo start`.",
				"2. **Centraliza la paleta:** crea un archivo `src/styles/theme.ts` con una paleta `claro` y otra `oscuro`, y mueve los estilos de tu pantalla principal a un `StyleSheet.create()` tipado.",
				"3. **Monta el tema:** implementa un `ThemeContext` con un hook `useTheme` que devuelva la paleta activa, y usa `useColorScheme` como valor por defecto cuando la persona todavía no eligió un tema.",
				"4. **Rehaz el layout:** aplica `gap` en lugar de márgenes manuales y `boxShadow` para las sombras de las tarjetas. Toma una captura en modo claro y otra en modo oscuro.",
				"5. **Responde en tu informe**: ¿qué ventaja te dio `StyleSheet.create()` frente a los estilos en línea, y cuáles son de organización y cuáles de tipado? ¿Qué cambiarías si el equipo migrara a NativeWind?",
			],
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Consejo: si los colores parpadean al cambiar de tema, revisa que estés leyendo la paleta desde `useTheme()` y no con valores fijos en el JSX.",
		},
	],
};
