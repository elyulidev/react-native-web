import type { CurriculumTopic } from "../../../../types/types";

export const conference6: CurriculumTopic = {
	id: "conf-6",
	title: "Conf. 6: NativeWind y Tailwind",
	content: [
		{
			type: "heading",
			text: "Estilización Avanzada con NativeWind y Tailwind CSS",
		},
		{
			type: "paragraph",
			text: '¡Bienvenidos a esta sesión avanzada sobre estilización en React Native! Hoy vamos a explorar NativeWind, una herramienta que nos permite integrar el popular framework Tailwind CSS directamente en nuestras aplicaciones React Native, ofreciéndonos un flujo de trabajo de "utilidad primero" para una estilización rápida, consistente y altamente mantenible.',
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Instalación y Configuración de NativeWind" },
		{
			type: "paragraph",
			text: "La configuración oficial para un proyecto de Expo es la siguiente:",
		},
		{
			type: "list",
			items: [
				"**1. Instalar NativeWind y dependencias:** `nativewind` necesita `react-native-reanimated` y `react-native-safe-area-context` como peer dependencies. En Expo SDK 57, Reanimated 4 va acompañado de `react-native-worklets`. Como devDependencies agregás `tailwindcss`, el plugin de Prettier y `babel-preset-expo`, que es el preset que se usa en el paso 3.",
			],
		},
		{
			type: "code",
			language: "bash",
			code: `bun add nativewind@4.2.7\nbun expo install react-native-reanimated react-native-worklets react-native-safe-area-context\nbun add --dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11 babel-preset-expo`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "**Versión actual:** NativeWind v4.2.7 agrega soporte para Expo SDK 57 e incluye `react-native-css-interop` 0.2.7. Mantiene la configuración de Tailwind CSS 3, el preset de Babel de NativeWind y la integración `withNativeWind(config, { input })`, así que actualizar dentro de la v4 no requiere migración a la v5. Reinicia Metro después de actualizar y reconstruye la app nativa si cambiaste dependencias nativas.",
		},
		{
			type: "callout",
			alertType: "tip",
			text: "**Atajo:** si preferís arrancar de cero, `bunx rn-new --nativewind` crea un proyecto Expo con NativeWind y Tailwind ya configurados.",
		},
		{
			type: "list",
			items: [
				"**2. Configurar Tailwind CSS:** Ejecuta `bunx tailwindcss init` para crear tu archivo `tailwind.config.js`. Luego, configúralo para que escanee tus archivos y añada el preset de NativeWind.",
			],
		},
		{
			type: "code",
			language: "javascript",
			code: `// tailwind.config.js\n/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  // NOTE: actualiza esto para incluir las rutas de todos los archivos que contienen clases de NativeWind.\n  content: ["./src/**/*.{js,jsx,ts,tsx}"],\n  presets: [require("nativewind/preset")],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n};`,
		},
		{
			type: "paragraph",
			text: "A continuación, abre el archivo `src/global.css` que ya viene en la plantilla de Expo y añade las directivas de Tailwind al principio. Las variables `--font-*` que ya están ahí se conservan: solo agregás las directivas.",
		},
		{
			type: "code",
			language: "css",
			code: `/* global.css */\n@tailwind base;\n@tailwind components;\n@tailwind utilities;`,
		},
		{
			type: "list",
			items: [
				'**3. Añadir el preset de Babel:** Modifica tu `babel.config.js` para que Expo sepa cómo transformar las clases de NativeWind. Es crucial añadir `jsxImportSource: "nativewind"`.',
			],
		},
		{
			type: "code",
			language: "javascript",
			code: `// babel.config.js\nmodule.exports = function (api) {\n  api.cache(true);\n  return {\n    presets: [\n      ["babel-preset-expo", { jsxImportSource: "nativewind" }],\n      "nativewind/babel",\n    ],\n  };\n};`,
		},
		{
			type: "list",
			items: [
				"**4. Crear o modificar `metro.config.js`:** Este archivo le indica al empaquetador de Metro cómo procesar tu CSS global usando NativeWind. Si no lo tienes, créalo en la raíz del proyecto.",
			],
		},
		{
			type: "code",
			language: "javascript",
			code: `// metro.config.js\nconst { getDefaultConfig } = require("expo/metro-config");\nconst { withNativeWind } = require('nativewind/metro');\n\nconst config = getDefaultConfig(__dirname);\n\nmodule.exports = withNativeWind(config, { input: './src/global.css' });`,
		},
		{
			type: "list",
			items: [
				"**5. Importar el archivo CSS:** Importa el archivo CSS que acabas de configurar en tu layout raíz (`src/app/_layout.tsx`).",
			],
		},
		{
			type: "code",
			language: "typescript",
			code: `// src/app/_layout.tsx\nimport "../global.css";\n// ... resto del código`,
		},
		{
			type: "list",
			items: [
				"**6. Modificar `app.json` para la web:** Para asegurar la compatibilidad con la web, especifica que Metro debe ser el empaquetador.",
			],
		},
		{
			type: "code",
			language: "json",
			code: `{\n  "expo": {\n    "web": {\n      "bundler": "metro"\n    }\n  }\n}`,
		},
		{
			type: "list",
			items: [
				"**7. Configuración de TypeScript (opcional):** Para obtener IntelliSense y seguridad de tipos, crea un archivo `nativewind-env.d.ts` en la raíz y añade la siguiente directiva:",
			],
		},
		{
			type: "code",
			language: "typescript",
			code: `/// <reference types="nativewind/types" />`,
		},
		{
			type: "callout",
			alertType: "warning",
			text: "**Cuidado con el nombre del archivo:** no lo llames `nativewind.d.ts`, ni con el mismo nombre que otro archivo o carpeta del mismo directorio (por ejemplo `app.d.ts` si existe una carpeta `/app`), ni con el nombre de una carpeta de `node_modules` (por ejemplo `react.d.ts`). Si lo hacés, TypeScript no va a recoger los tipos.",
		},
		{
			type: "callout",
			alertType: "warning",
			text: "¡Importante! Después de la configuración, reinicia completamente el servidor de desarrollo (`bun expo start --clear`) para asegurarte de que todos los cambios se apliquen correctamente.",
		},

		{ type: "divider" },

		{ type: "subtitle", text: "2. Uso de Clases de Tailwind CSS" },
		{
			type: "paragraph",
			text: "Con NativeWind configurado, podemos aplicar estilos a nuestros componentes de React Native utilizando la prop `className`, de forma muy similar a como lo haríamos en la web. Esto permite un desarrollo rápido y una interfaz consistente.",
		},
		{
			type: "code",
			language: "jsx",
			code: `import { Text, View } from 'react-native';\n\nexport default function App() {\n  return (\n    <View className="flex-1 items-center justify-center bg-white">\n      <Text className="text-xl font-bold text-blue-500">\n        ¡Hola, NativeWind!\n      </Text>\n    </View>\n  );\n}`,
		},

		{ type: "divider" },

		{ type: "subtitle", text: "3. IntelliSense y Personalización del Tema" },
		{
			type: "paragraph",
			text: "La mayoría de los IDEs (como VSCode con la extensión de Tailwind CSS) ofrecen autocompletado y sugerencias inteligentes para las clases de Tailwind. Además, puedes extender el tema en `tailwind.config.js` para definir tu propia paleta de colores, tipografías y más.",
		},
		{
			type: "code",
			language: "javascript",
			code: `// tailwind.config.js\nmodule.exports = {\n  // ...\n  theme: {\n    extend: {\n      colors: {\n        primary: '#FF6363',\n        'dark-200': '#2A2A2A',\n      },\n      fontFamily: {\n        'quicksand-bold': ['Quicksand-Bold', 'sans-serif'],\n      }\n    },\n  },\n  // ...\n};`,
		},
		{
			type: "paragraph",
			text: "Una vez definidos, puedes usarlos como `text-primary`, `bg-dark-200` o `font-quicksand-bold`.",
		},

		{ type: "divider" },

		{ type: "subtitle", text: "4. Gestión de `global.css`" },
		{
			type: "paragraph",
			text: 'Aunque Tailwind es "utilidad primero", a veces querrás crear tus propias clases compuestas o "componentes" que encapsulen varias utilidades. Puedes definirlas en `global.css` para una fácil reutilización.',
		},
		{
			type: "code",
			language: "css",
			code: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer components {\n  .h1-bold {\n    @apply text-3xl font-bold text-gray-900;\n  }\n}`,
		},
		{
			type: "paragraph",
			text: 'Luego, puedes usar `className="h1-bold"` en tu JSX, manteniendo el código más limpio.',
		},

		{ type: "divider" },

		{
			type: "subtitle",
			text: "5. Tarea Práctica: Refactorización a NativeWind",
		},
		{
			type: "assignment",
			assignmentId: "conf-6-nativewind-exercise",
			description: [
				"Toma el siguiente componente que usa `StyleSheet` y refactorízalo para que use exclusivamente clases de NativeWind (Tailwind CSS) a través de la prop `className`.",
				"El objetivo es lograr la misma apariencia visual pero con un código JSX más limpio y declarativo.",
				"He añadido comentarios en el objeto `styles` con las clases de Tailwind equivalentes para ayudarte.",
				"**Componente Original (con StyleSheet):**",
			],
			code: `import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const ExerciseComponent = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>React Native</Text>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,                  // className="flex-1"
    padding: 24,              // className="p-6"
    backgroundColor: '#eaeaea', // className="bg-zinc-200"
  },
  title: {
    marginTop: 16,            // className="mt-4"
    paddingVertical: 8,       // className="py-2"
    borderWidth: 4,           // className="border-4"
    borderColor: '#20232a',   // className="border-slate-800"
    borderRadius: 6,          // className="rounded-md"
    backgroundColor: '#61dafb', // className="bg-cyan-300"
    color: '#20232a',         // className="text-slate-800"
    textAlign: 'center',      // className="text-center"
    fontSize: 30,             // className="text-3xl"
    fontWeight: 'bold',       // className="font-bold"
  },
});

export default ExerciseComponent;`,
		},
	],
};
