import type { CurriculumTopic } from "../../../../types/types";

export const conference38: CurriculumTopic = {
	id: "conf-38",
	title: "Conf. 38: Gestión de Estado Avanzada",
	content: [
		{
			type: "heading",
			text: "Gestión de Estado Global Avanzada: Context vs. Zustand",
		},
		{
			type: "paragraph",
			text: 'Ya hemos visto cómo la Context API de React nos ayuda a evitar el "prop drilling". Es una herramienta nativa y excelente para datos que no cambian con frecuencia. Sin embargo, cuando el estado global se vuelve más complejo o se actualiza a menudo, puede causar problemas de rendimiento. Aquí es donde brillan las librerías dedicadas como Zustand.',
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. El Problema de Rendimiento de Context API" },
		{
			type: "paragraph",
			text: "La principal desventaja de Context es que cuando una parte del valor del contexto cambia, **TODOS** los componentes que consumen ese contexto se vuelven a renderizar, incluso si solo están interesados en una parte del estado que no cambió. Esto puede llevar a re-renderizados innecesarios y a una aplicación lenta.",
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/context-rerender.png",
			caption:
				"Cuando el tema cambia en el contexto, tanto el Componente A (que usa el tema) como el Componente B (que solo usa el usuario) se re-renderizan.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "2. Introducción a Zustand: Simple y Performante",
		},
		{
			type: "paragraph",
			text: 'Zustand es una librería de gestión de estado pequeña, rápida y escalable. Su lema es "simple, sin boilerplate, y basada en hooks".',
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "BoltIcon",
					title: "Rendimiento por Defecto",
					text: 'Los componentes solo se re-renderizan si la parte exacta del estado que usan ("slice") ha cambiado. Esto resuelve el problema principal de Context.',
				},
				{
					icon: "CodeBracketIcon",
					title: "Mínimo Boilerplate",
					text: 'No necesitas envolver tu aplicación en proveedores. Creas un "store" y lo usas directamente en tus componentes a través de un hook.',
				},
				{
					icon: "SparklesIcon",
					title: "Fácil de Usar",
					text: "La API es intuitiva y se siente como una extensión natural de los hooks de React.",
				},
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Tutorial: Refactorizando nuestro ThemeContext a un Store de Zustand",
		},
		{
			type: "paragraph",
			text: "Vamos a ver lo fácil que es. Recrearemos nuestro sistema de temas claro/oscuro usando Zustand.",
		},

		{ type: "paragraph", text: "**Paso 1: Instalar Zustand**" },
		{ type: "code", language: "bash", code: "npm install zustand" },

		{ type: "paragraph", text: "**Paso 2: Crear el Store de Tema**" },
		{
			type: "paragraph",
			text: "Crea una carpeta `store` y dentro un archivo `themeStore.ts`.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { create } from 'zustand';

type Theme = 'light' | 'dark';

// Definimos la "forma" de nuestro store: el estado y las acciones
interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

// Creamos el store
export const useThemeStore = create<ThemeState>((set) => ({
  // Estado inicial
  theme: 'light',

  // Acciones (funciones que modifican el estado)
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),
}));
`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "`set` es la función que usamos para actualizar el estado de forma inmutable. Zustand se encarga de todo lo demás.",
		},

		{ type: "paragraph", text: "**Paso 3: Usar el Store en un Componente**" },
		{
			type: "paragraph",
			text: "¡Y eso es todo! No necesitamos `ThemeProvider`. Podemos usar nuestro hook `useThemeStore` directamente en cualquier componente.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { View, Text, Button } from 'react-native';
import { useThemeStore } from '../store/themeStore'; // Ajusta la ruta

const ThemedComponentWithZustand = () => {
  // Obtenemos el estado y las acciones del store
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const isDarkMode = theme === 'dark';
  const containerClass = isDarkMode ? 'bg-slate-900' : 'bg-white';
  const textClass = isDarkMode ? 'text-white' : 'text-black';

  return (
    <View className={'flex-1 items-center justify-center ' + containerClass}>
      <Text className={'text-2xl mb-4 ' + textClass}>
        El tema actual es: {theme}
      </Text>
      <Button title="Cambiar Tema" onPress={toggleTheme} />
    </View>
  );
};

export default ThemedComponentWithZustand;
`,
		},
		{
			type: "paragraph",
			text: "Nota clave: `useThemeStore((state) => state.theme)` es un **selector**. Le dice a Zustand que este componente solo se preocupa por la propiedad `theme`. Si otra parte del estado cambiara, este componente no se re-renderizaría. ¡Esa es la magia del rendimiento de Zustand!",
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Cuál es la principal desventaja de rendimiento de la Context API que Zustand resuelve?",
					options: [
						"Tarda mucho en cargar inicialmente.",
						"Consume mucha memoria RAM.",
						"Causa que todos los componentes consumidores se re-rendericen cuando cualquier parte del contexto cambia.",
						"No se puede usar en componentes de clase.",
					],
					correctAnswer: 2,
				},
				{
					question:
						"¿Qué se necesita para empezar a usar un store de Zustand en un componente?",
					options: [
						"Envolver la aplicación en un `<ZustandProvider>`.",
						"Importar el hook creado con `create` y usarlo directamente.",
						"Configurar un archivo `zustand.config.js`.",
						"Conectar cada componente con una función `connect()`.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"En Zustand, ¿qué hace un selector como `useMyStore((state) => state.count)`?",
					options: [
						"Obtiene todo el estado del store.",
						"Permite que el componente se suscriba solo a los cambios de la propiedad `count`, evitando re-renderizados innecesarios.",
						"Es una forma de actualizar el estado `count`.",
						"Crea una copia local del estado `count`.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Dentro de la función `create` de Zustand, ¿qué función se utiliza para actualizar el estado?",
					options: ["`update`", "`dispatch`", "`setState`", "`set`"],
					correctAnswer: 3,
				},
			],
		},
	],
};
