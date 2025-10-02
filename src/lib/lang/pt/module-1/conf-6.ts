import type { CurriculumTopic } from "../../../../types/types";

export const conference6: CurriculumTopic = {
	id: "conf-6",
	title: "Conf. 6: NativeWind e Tailwind",
	content: [
		{
			type: "heading",
			text: "Estilização Avançada com NativeWind e Tailwind CSS",
		},
		{
			type: "paragraph",
			text: 'Bem-vindos a esta sessão avançada sobre estilização no React Native! Hoje vamos explorar o NativeWind, uma ferramenta que nos permite integrar o popular framework Tailwind CSS diretamente nas nossas aplicações React Native, oferecendo-nos um fluxo de trabalho "utility-first" para uma estilização rápida, consistente e de alta manutenibilidade.',
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Instalação e Configuração do NativeWind" },
		{
			type: "paragraph",
			text: "A configuração oficial para um projeto Expo é a seguinte:",
		},
		{
			type: "list",
			items: [
				"**1. Instalar o Nativewind e dependências:** Você precisará do `nativewind` e das suas dependências `react-native-reanimated` e `react-native-safe-area-context`. Também é uma boa prática instalar o `tailwindcss` e um plugin do Prettier para formatação.",
			],
		},
		{
			type: "code",
			language: "bash",
			code: `npm install nativewind react-native-reanimated react-native-safe-area-context\nnpm install --dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11\npnpm add nativewind react-native-reanimated react-native-safe-area-context\npnpm add -D @^3.4.17 prettier-plugin-tailwindcss@^0.5.11`,
		},
		{
			type: "list",
			items: [
				"**2. Configurar o Tailwind CSS:** Execute `npx tailwindcss init` o `pnpm tailwindcss init` para criar o seu ficheiro `tailwind.config.js`. Em seguida, configure-o para analisar os seus ficheiros e adicione o preset do NativeWind.",
			],
		},
		{
			type: "code",
			language: "javascript",
			code: `// tailwind.config.js\n/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],\n  presets: [require("nativewind/preset")],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n};`,
		},
		{
			type: "paragraph",
			text: "De seguida, crie um ficheiro chamado `global.css` na raiz do seu projeto e adicione as diretivas do Tailwind.",
		},
		{
			type: "code",
			language: "css",
			code: `/* global.css */\n@tailwind base;\n@tailwind components;\n@tailwind utilities;`,
		},
		{
			type: "list",
			items: [
				'**3. Adicionar o preset do Babel:** Modifique o seu `babel.config.js` para que o Expo saiba como transformar as classes do NativeWind. É crucial adicionar `jsxImportSource: "nativewind"`.',
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
				"**4. Criar ou modificar o `metro.config.js`:** Este ficheiro indica ao empacotador do Metro como processar o seu CSS global usando o NativeWind. Se não o tiver, crie-o na raiz do projeto.",
			],
		},
		{
			type: "code",
			language: "javascript",
			code: `// metro.config.js\nconst { getDefaultConfig } = require("expo/metro-config");\nconst { withNativeWind } = require('nativewind/metro');\n\nconst config = getDefaultConfig(__dirname);\n\nmodule.exports = withNativeWind(config, { input: './global.css' });`,
		},
		{
			type: "list",
			items: [
				"**5. Importar o seu ficheiro CSS:** Importe o ficheiro CSS que acabou de criar no seu layout raiz (`app/_layout.tsx`).",
			],
		},
		{
			type: "code",
			language: "typescript",
			code: `// app/_layout.tsx\nimport "../global.css";\n// ... resto do código`,
		},
		{
			type: "list",
			items: [
				"**6. Modificar o `app.json` para a web:** Para garantir a compatibilidade com a web, especifique que o Metro deve ser o empacotador.",
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
				"**7. Configuração do TypeScript (Opcional):** Para obter IntelliSense e segurança de tipos, crie um ficheiro `nativewind-env.d.ts` na raiz e adicione a seguinte diretiva:",
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
			text: "Importante! Após a configuração, reinicie completamente o servidor de desenvolvimento (`npx expo start --clear`) para garantir que todas as alterações sejam aplicadas corretamente.",
		},

		{ type: "divider" },

		{ type: "subtitle", text: "2. Uso de Classes do Tailwind CSS" },
		{
			type: "paragraph",
			text: "Com o NativeWind configurado, podemos aplicar estilos aos nossos componentes React Native utilizando a prop `className`, de forma muito semelhante ao que faríamos na web. Isto permite um desenvolvimento rápido e uma interface de utilizador consistente.",
		},
		{
			type: "code",
			language: "jsx",
			code: `import { Text, View } from 'react-native';\n\nexport default function App() {\n  return (\n    <View className="flex-1 items-center justify-center bg-white">\n      <Text className="text-xl font-bold text-blue-500">\n        Olá, NativeWind!\n      </Text>\n    </View>\n  );\n}`,
		},

		{ type: "divider" },

		{ type: "subtitle", text: "3. IntelliSense e Personalização do Tema" },
		{
			type: "paragraph",
			text: "A maioria dos IDEs (como o VSCode com a extensão do Tailwind CSS) oferece autocompletar e sugestões inteligentes para as classes do Tailwind. Além disso, pode estender o tema no `tailwind.config.js` para definir a sua própria paleta de cores, tipografias e mais.",
		},
		{
			type: "code",
			language: "javascript",
			code: `// tailwind.config.js\nmodule.exports = {\n  // ...\n  theme: {\n    extend: {\n      colors: {\n        primary: '#FF6363',\n        'dark-200': '#2A2A2A',\n      },\n      fontFamily: {\n        'quicksand-bold': ['Quicksand-Bold', 'sans-serif'],\n      }\n    },\n  },\n  // ...\n};`,
		},
		{
			type: "paragraph",
			text: "Uma vez definidos, pode usá-los como `text-primary`, `bg-dark-200` ou `font-quicksand-bold`.",
		},

		{ type: "divider" },

		{ type: "subtitle", text: "4. Gestão de `globals.css`" },
		{
			type: "paragraph",
			text: 'Embora o Tailwind seja "utility-first", por vezes quererá criar as suas próprias classes compostas ou "componentes" que encapsulam várias utilidades. Pode defini-las no `global.css` para uma reutilização fácil.',
		},
		{
			type: "code",
			language: "css",
			code: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer components {\n  .h1-bold {\n    @apply text-3xl font-bold text-gray-900;\n  }\n}`,
		},
		{
			type: "paragraph",
			text: 'Depois, pode usar `className="h1-bold"` no seu JSX, mantendo o código mais limpo.',
		},

		{ type: "divider" },

		{
			type: "subtitle",
			text: "5. Tarefa Prática: Refatoração para NativeWind",
		},
		{
			type: "assignment",
			assignmentId: "conf-6-nativewind-exercise",
			description: [
				"Pegue no seguinte componente que usa `StyleSheet` e refatore-o para usar exclusivamente classes do NativeWind (Tailwind CSS) através da prop `className`.",
				"O objetivo é alcançar a mesma aparência visual, mas com um código JSX mais limpo e declarativo.",
				"Adicionei comentários no objeto `styles` com as classes Tailwind equivalentes para o ajudar.",
				"**Componente Original (com StyleSheet):**",
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
