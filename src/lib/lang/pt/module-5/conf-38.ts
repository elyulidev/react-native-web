import type { CurriculumTopic } from "../../../../types/types";

export const conference38: CurriculumTopic = {
	id: "conf-38",
	title: "Conf. 38: Gerenciamento de Estado Avançado",
	content: [
		{
			type: "heading",
			text: "Gerenciamento de Estado Global Avançado: Context vs. Zustand",
		},
		{
			type: "paragraph",
			text: 'Já vimos como a Context API do React nos ajuda a evitar o "prop drilling". É uma ferramenta nativa e excelente para dados que não mudam com frequência. No entanto, quando o estado global se torna mais complexo ou é atualizado frequentemente, pode causar problemas de desempenho. É aqui que brilham as bibliotecas dedicadas como o Zustand.',
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. O Problema de Desempenho da Context API" },
		{
			type: "paragraph",
			text: "A principal desvantagem do Context é que, quando uma parte do valor do contexto muda, **TODOS** os componentes que consomem esse contexto são re-renderizados, mesmo que estejam interessados apenas numa parte do estado que não mudou. Isto pode levar a re-renderizações desnecessárias e a uma aplicação lenta.",
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/context-rerender.png",
			caption:
				"Quando o tema muda no contexto, tanto o Componente A (que usa o tema) como o Componente B (que apenas usa o utilizador) são re-renderizados.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "2. Introdução ao Zustand: Simples e Performante",
		},
		{
			type: "paragraph",
			text: 'Zustand é uma biblioteca de gestão de estado pequena, rápida e escalável. O seu lema é "simples, sem boilerplate, e baseada em hooks".',
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "BoltIcon",
					title: "Desempenho por Padrão",
					text: 'Os componentes só são re-renderizados se a parte exata do estado que usam ("slice") tiver mudado. Isto resolve o problema principal do Context.',
				},
				{
					icon: "CodeBracketIcon",
					title: "Mínimo Boilerplate",
					text: 'Não precisa de envolver a sua aplicação em provedores. Cria uma "store" e usa-a diretamente nos seus componentes através de um hook.',
				},
				{
					icon: "SparklesIcon",
					title: "Fácil de Usar",
					text: "A API é intuitiva e parece uma extensão natural dos hooks do React.",
				},
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Tutorial: Refatorando o nosso ThemeContext para uma Store do Zustand",
		},
		{
			type: "paragraph",
			text: "Vamos ver como é fácil. Recriaremos o nosso sistema de temas claro/escuro usando o Zustand.",
		},

		{ type: "paragraph", text: "**Passo 1: Instalar o Zustand**" },
		{ type: "code", language: "bash", code: "npm install zustand" },

		{ type: "paragraph", text: "**Passo 2: Criar a Store de Tema**" },
		{
			type: "paragraph",
			text: "Crie uma pasta `store` e, dentro dela, um ficheiro `themeStore.ts`.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { create } from 'zustand';

type Theme = 'light' | 'dark';

// Definimos a "forma" da nossa store: o estado e as ações
interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

// Criamos a store
export const useThemeStore = create<ThemeState>((set) => ({
  // Estado inicial
  theme: 'light',

  // Ações (funções que modificam o estado)
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),
}));
`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "`set` é a função que usamos para atualizar o estado de forma imutável. O Zustand trata de tudo o resto.",
		},

		{ type: "paragraph", text: "**Passo 3: Usar a Store num Componente**" },
		{
			type: "paragraph",
			text: "E é tudo! Não precisamos de `ThemeProvider`. Podemos usar o nosso hook `useThemeStore` diretamente em qualquer componente.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { View, Text, Button } from 'react-native';
import { useThemeStore } from '../store/themeStore'; // Ajuste o caminho

const ThemedComponentWithZustand = () => {
  // Obtemos o estado e as ações da store
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const isDarkMode = theme === 'dark';
  const containerClass = isDarkMode ? 'bg-slate-900' : 'bg-white';
  const textClass = isDarkMode ? 'text-white' : 'text-black';

  return (
    <View className={'flex-1 items-center justify-center ' + containerClass}>
      <Text className={'text-2xl mb-4 ' + textClass}>
        O tema atual é: {theme}
      </Text>
      <Button title="Mudar Tema" onPress={toggleTheme} />
    </View>
  );
};

export default ThemedComponentWithZustand;
`,
		},
		{
			type: "paragraph",
			text: "Nota chave: `useThemeStore((state) => state.theme)` é um **seletor**. Diz ao Zustand que este componente só se preocupa com a propriedade `theme`. Se outra parte do estado mudasse, este componente não seria re-renderizado. Essa é a magia do desempenho do Zustand!",
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Qual é a principal desvantagem de desempenho da Context API que o Zustand resolve?",
					options: [
						"Leva muito tempo a carregar inicialmente.",
						"Consome muita memória RAM.",
						"Faz com que todos os componentes consumidores sejam re-renderizados quando qualquer parte do contexto muda.",
						"Não pode ser usado em componentes de classe.",
					],
					correctAnswer: 2,
				},
				{
					question:
						"O que é necessário para começar a usar uma store do Zustand num componente?",
					options: [
						"Envolver a aplicação num `<ZustandProvider>`.",
						"Importar o hook criado com `create` e usá-lo diretamente.",
						"Configurar um ficheiro `zustand.config.js`.",
						"Ligar cada componente com uma função `connect()`.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"No Zustand, o que faz um seletor como `useMyStore((state) => state.count)`?",
					options: [
						"Obtém todo o estado da store.",
						"Permite que o componente se subscreva apenas a alterações da propriedade `count`, evitando re-renderizações desnecessárias.",
						"É uma forma de atualizar o estado `count`.",
						"Cria uma cópia local do estado `count`.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Dentro da função `create` do Zustand, que função é utilizada para atualizar o estado?",
					options: ["`update`", "`dispatch`", "`setState`", "`set`"],
					correctAnswer: 3,
				},
			],
		},
	],
};
