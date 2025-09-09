import type { CurriculumTopic } from "../../../../types/types";

export const conference15: CurriculumTopic = {
	id: "conf-15",
	title: "Conf. 15: Tipado con TypeScript",
	content: [
		{ type: "heading", text: "Tipado con TypeScript en React Native" },
		{
			type: "paragraph",
			text: "TypeScript es una extensión de JavaScript que añade tipos estáticos. En el desarrollo con React Native, nos permite escribir código más robusto, predecible y fácil de mantener, detectando errores comunes durante el desarrollo en lugar de en tiempo de ejecución.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Introducción y Configuración" },
		{
			type: "paragraph",
			text: "Afortunadamente, Expo simplifica enormemente la configuración de TypeScript. Al crear un nuevo proyecto, podemos elegir una plantilla de TypeScript y Expo se encarga de todo.",
		},
		{
			type: "code",
			language: "bash",
			code: "npx create-expo-app@latest mi-app-con-ts --template blank-ts",
		},
		{
			type: "paragraph",
			text: "Esto genera un archivo `tsconfig.json` en la raíz de tu proyecto. Este archivo contiene las reglas que TypeScript utilizará para verificar tu código. Generalmente, no necesitas modificar la configuración por defecto.",
		},
		{
			type: "paragraph",
			text: "Para que TypeScript reconozca tipos de archivos no-código, como imágenes, creamos un archivo de declaración de tipos. Por ejemplo, un archivo `images.d.ts` en la raíz:",
		},
		{
			type: "code",
			language: "typescript",
			code: `// images.d.ts
declare module '*.png';
declare module '*.jpg';`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "La extensión de archivo para componentes React que usan TypeScript es `.tsx`.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Beneficios Clave de Usar TypeScript" },
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "ShieldCheckIcon",
					title: "Seguridad de Tipos",
					text: "Define explícitamente los tipos para variables, props y estados. El compilador te avisa si pasas un número donde se espera un string, evitando errores inesperados en producción.",
				},
				{
					icon: "ArrowPathIcon",
					title: "Refactorización Segura",
					text: "Al cambiar el nombre de una propiedad o su tipo, TypeScript te mostrará todos los lugares en tu código que necesitan ser actualizados. Esto hace que la refactorización sea mucho menos propensa a errores.",
				},
				{
					icon: "DocumentTextIcon",
					title: "Código Autodocumentado y Mantenible",
					text: "Los tipos e interfaces actúan como documentación. Facilitan que otros desarrolladores (¡y tu yo del futuro!) entiendan la estructura de los datos y cómo funcionan los componentes, además de potenciar el autocompletado en tu editor.",
				},
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Declaración de Tipos e Interfaces" },
		{
			type: "paragraph",
			text: 'Usamos `interface` o `type` para definir la "forma" de nuestros objetos. Son la base para tipar props, estados y datos.',
		},

		{ type: "paragraph", text: "**Tipado de Props de Componentes:**" },
		{
			type: "paragraph",
			text: "Para asegurar que un componente reutilizable reciba las propiedades correctas, definimos una interfaz para sus props.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import React from 'react';
import { Pressable, Text, PressableProps } from 'react-native';

// 1. Definimos la interfaz para las props
interface CustomButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

// 2. Usamos la interfaz para tipar las props del componente
const CustomButton: React.FC<CustomButtonProps> = ({ title, variant = 'primary', ...props }) => {
  const buttonClass = variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500';

  return (
    <Pressable className={'p-3 rounded-lg ' + buttonClass} {...props}>
      <Text className="text-white text-center font-bold">{title}</Text>
    </Pressable>
  );
};

export default CustomButton;
`,
		},

		{ type: "paragraph", text: "**Tipado de Estado (`useState`):**" },
		{
			type: "paragraph",
			text: "TypeScript a menudo puede inferir el tipo del estado a partir de su valor inicial. Sin embargo, si el estado puede tener más de un tipo (ej. un objeto de usuario o `null` antes de iniciar sesión), debemos ser explícitos.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { useState } from 'react';

// Interfaz para nuestro modelo de datos
interface User {
  id: number;
  name: string;
}

const UserProfile = () => {
  // TypeScript infiere que 'counter' es de tipo 'number'
  const [counter, setCounter] = useState(0);

  // Aquí debemos ser explícitos: el usuario puede ser de tipo User O null
  const [user, setUser] = useState<User | null>(null);

  // ...
};
`,
		},

		{ type: "paragraph", text: "**Tipado de Datos (Modelos de API/DB):**" },
		{
			type: "paragraph",
			text: "Es una excelente práctica definir interfaces para las estructuras de datos que manejas en tu aplicación, como las respuestas de una API.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
export interface Movie {
  id: string;
  title: string;
  releaseYear: number;
  posterUrl: string;
  rating?: number; // La interrogación indica que la propiedad es opcional
}

// En un componente que consume una API...
const [movie, setMovie] = useState<Movie | null>(null);
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Integración con el Ecosistema" },
		{ type: "paragraph", text: "**Expo Router y `useLocalSearchParams`:**" },
		{
			type: "paragraph",
			text: "TypeScript brilla al trabajar con rutas dinámicas. El hook `useLocalSearchParams` devuelve los parámetros de la URL, y podemos usar TypeScript para asegurar que estamos accediendo a los parámetros correctos.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// En app/movies/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function MovieDetailsScreen() {
  // Los parámetros son strings por defecto.
  const { id } = useLocalSearchParams<{ id: string }>();

  // Ahora TypeScript sabe que 'id' es un string.
  // Podríamos usar este 'id' para buscar la película en nuestra API.

  return (
    <View>
      <Text>Detalles de la Película con ID: {id}</Text>
    </View>
  );
}`,
		},

		{ type: "paragraph", text: "**Componentes Nativos de React Native:**" },
		{
			type: "paragraph",
			text: "La mayoría de las librerías, incluyendo React Native, vienen con sus propios tipos. Esto significa que si intentas pasar una prop incorrecta a un componente nativo, TypeScript te lo advertirá.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { ActivityIndicator } from 'react-native';

const MyLoader = () => {
  return (
    <ActivityIndicator
      size="large"
      // color={123} // ¡Error! TypeScript te dirá:
      // El tipo 'number' no se puede asignar al tipo 'ColorValue'.
      color="#0000ff" // Correcto
    />
  );
};
`,
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Cuál es la principal ventaja de usar TypeScript en React Native?",
					options: [
						"Hace que la aplicación sea más rápida.",
						"Añade seguridad de tipos para detectar errores durante el desarrollo.",
						"Permite usar CSS directamente.",
						"Es requerido por Apple para publicar en la App Store.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"¿Qué extensión de archivo se usa para un componente React que contiene código TypeScript?",
					options: [".js", ".ts", ".jsx", ".tsx"],
					correctAnswer: 3,
				},
				{
					question:
						"Si tienes un estado que puede ser un objeto `User` o `null`, ¿cómo lo tiparías con `useState`?",
					options: [
						"useState<User>",
						"useState(User | null)",
						"useState<User | null>(null)",
						"useState<User & null>(null)",
					],
					correctAnswer: 2,
				},
				{
					question:
						"¿Cómo se define que la prop `onPress` es opcional en una interfaz de TypeScript?",
					options: [
						"onPress: function?",
						"onPress?: () => void;",
						"optional onPress: () => void;",
						"onPress: optional<() => void>;",
					],
					correctAnswer: 1,
				},
			],
		},
	],
};
