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
			text: "`StyleSheet` es una abstracción de React Native similar a las hojas de estilo CSS. En lugar de escribir CSS, definimos estilos usando objetos JavaScript para una mayor optimización y organización.",
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
    flex: 1,
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
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 16,
    color: 'darkslateblue',
  }
});`,
		},
		{
			type: "list",
			items: [
				"**Claridad del código:** Al mover los estilos fuera de la función de renderizado, el JSX se mantiene limpio y legible.",
				"**Semántica y reutilización:** Nombrar los estilos (ej. `styles.card`) añade significado y permite reutilizarlos fácilmente.",
				"**Optimización:** React Native puede optimizar los estilos, enviándolos al lado nativo solo una vez, lo que es más eficiente que los estilos en línea.",
				"**Validación:** `StyleSheet.create()` valida tus estilos en tiempo de compilación, ayudando a detectar errores tipográficos o propiedades no válidas.",
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
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/flex-direction-rn.png",
			caption:
				'`flexDirection`: "column" (izquierda, por defecto) apila los elementos verticalmente. "row" (derecha) los alinea horizontalmente.',
		},
		{
			type: "paragraph",
			text: "`justifyContent` alinea los elementos a lo largo del eje principal (el eje de `flexDirection`).",
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/justify-content-rn.png",
			caption:
				'Opciones de `justifyContent` con `flexDirection: "column"`. Controla el espaciado vertical.',
		},
		{
			type: "paragraph",
			text: "`alignItems` alinea los elementos a lo largo del eje transversal (perpendicular al eje principal).",
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/align-items-rn.png",
			caption:
				'Opciones de `alignItems` con `flexDirection: "column"`. Controla la alineación horizontal.',
		},
		{
			type: "code",
			language: "jsx",
			code: `
// Con flexDirection: 'row', el comportamiento es similar al de la web.
// justifyContent controla el eje horizontal y alignItems el vertical.
<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
    <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />
    <View style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
</View>
`,
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
					icon: "BoltIcon",
					title: "Rendimiento",
					text: "React Native optimiza los estilos de `StyleSheet` enviándolos al puente nativo una sola vez, lo que es más eficiente que crear nuevos objetos de estilo en cada renderizado.",
				},
				{
					icon: "SparklesIcon",
					title: "Autocompletado y Validación",
					text: "Los IDEs ofrecen mejor autocompletado y validación de tipos para los estilos definidos con `StyleSheet`, ayudando a prevenir errores.",
				},
			],
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
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/light-dark-theme.png",
			caption:
				"Una interfaz de usuario que se adapta al modo claro y oscuro para una mejor experiencia de usuario.",
		},
		{
			type: "list",
			items: [
				"**Colores Centralizados:** Define una paleta de colores para los modos claro y oscuro en un archivo de constantes.",
				// FIX: Replaced single quotes with double quotes around 'light' and 'dark' to prevent potential parsing errors.
				'**Contexto del Tema:** Crea un `ThemeContext` que provea el tema actual (ej. "light" o "dark") y una función para cambiarlo.',
				"**Hook Personalizado (`useTheme`):** Un hook simple `useTheme` que consume el contexto y devuelve los colores del tema activo.",
				"**Persistencia:** Usa `expo-secure-store` o `AsyncStorage` para guardar la preferencia de tema del usuario entre sesiones.",
				"**StatusBar Dinámica:** Utiliza el componente `<StatusBar>` para cambiar el estilo de la barra de estado (claro/oscuro) según el tema activo.",
			],
		},
		// FIX: Replaced invalid identifier 'a-colores' with 'colores' and updated conceptual file name.
		{
			type: "code",
			language: "typescript",
			code: `
// hook-conceptual.ts
import { useContext } from 'react';
import { ThemeContext, colores } from './ThemeProvider';

export const useTheme = () => {
  const { theme } = useContext(ThemeContext);
  return colores[theme]; // Devuelve el objeto de colores del tema actual
};

// Component.tsx
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from './hooks/useTheme';

export default function ThemedComponent() {
  const colors = useTheme(); // Obtiene los colores del tema actual

  return (
    // Los estilos se adaptan dinámicamente
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Contenido aquí</Text>
    </View>
  );
}`,
		},
		{ type: "divider" },
		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Cuál es la dirección de `flexDirection` por defecto en React Native?",
					options: [
						"row",
						"column",
						"row-reverse",
						"No tiene valor por defecto",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Si tienes `flexDirection: 'column'`, ¿qué propiedad usarías para centrar los elementos horizontalmente?",
					options: [
						"justifyContent: 'center'",
						"alignItems: 'center'",
						"alignContent: 'center'",
						"flex: 1",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Principalmente, ¿por qué se recomienda usar `StyleSheet.create()` en lugar de estilos en línea?",
					options: [
						"Para que el código sea más corto",
						"Por optimización de rendimiento y mejor organización",
						"Porque los estilos en línea no soportan todas las propiedades",
						"Es la única forma de aplicar estilos",
					],
					correctAnswer: 1,
				},
				{
					question:
						"¿Qué es incorrecto acerca de la estilización de texto en React Native?",
					options: [
						"Todo texto debe ir dentro de un componente <Text>",
						"Puedes anidar componentes <Text> para heredar estilos",
						"Puedes poner texto directamente dentro de un <View> para un mejor rendimiento",
						"El componente <Text> soporta la propiedad `style`",
					],
					correctAnswer: 2,
				},
			],
		},
	],
};
