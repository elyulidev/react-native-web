import type { CurriculumTopic } from "../../../../types/types";

export const conference13: CurriculumTopic = {
	id: "conf-13",
	title: "Conf. 13: Estado Local e Context API",
	content: [
		{ type: "heading", text: "Gestão de Estado: Local vs. Global" },
		{
			type: "paragraph",
			text: "A gestão de estado é fundamental em qualquer aplicação React Native para controlar a interface do utilizador e os dados. Esta conferência irá explorar como gerir o estado ao nível do componente com `useState` e `useEffect`, e como escalar a gestão de estado para um nível global em toda a aplicação utilizando a API de Contexto do React.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Uso Avançado de useState e useEffect" },
		{
			type: "paragraph",
			text: "Estes dois hooks são a base para gerir o estado e os efeitos secundários dentro de um componente.",
		},

		{ type: "paragraph", text: "**`useState` para Estado Local:**" },
		{
			type: "paragraph",
			text: '`useState` permite-nos adicionar uma "variável de estado" aos nossos componentes. É perfeito para dados que apenas importam a um componente específico.',
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';

const DataFetcher = () => {
  // Estado para a entrada do utilizador
  const [query, setQuery] = useState('');

  // Estados para gerir o carregamento e erros de uma API
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = () => {
    setLoading(true);
    setError(null);
    // Simular uma chamada à API
    setTimeout(() => {
      if (query.toLowerCase() === 'error') {
        setError('Não foi possível carregar os dados.');
        setData(null);
      } else {
        setData(\`Dados para: \${query}\`);
        setError(null);
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <View className="p-4 border border-slate-300 rounded-lg w-full">
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Escreva 'error' para simular uma falha"
        className="border p-2 rounded-md mb-2"
      />
      <Button title="Procurar Dados" onPress={handleFetch} disabled={loading} />

      {loading && <ActivityIndicator size="large" className="mt-4" />}
      {error && <Text className="text-red-500 mt-4">{error}</Text>}
      {data && <Text className="text-green-600 mt-4">{data}</Text>}
    </View>
  );
};

export default DataFetcher;
`,
		},
		{ type: "paragraph", text: "**`useEffect` para Efeitos Secundários:**" },
		{
			type: "paragraph",
			text: "`useEffect` permite-nos executar código que interage com o mundo exterior: pedidos a APIs, subscrições, etc. É executado depois de o componente ser renderizado.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Este código executa uma vez, quando o componente é montado.
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    // Função de limpeza: executa quando o componente é desmontado.
    // É crucial para evitar fugas de memória.
    return () => clearInterval(intervalId);
  }, []); // O array de dependências vazio [] significa "executar apenas uma vez".

  return (
    <View>
      <Text>Temporizador: {seconds} segundos</Text>
    </View>
  );
};

export default Timer;
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Introdução à Context API" },
		{
			type: "paragraph",
			text: 'À medida que uma aplicação cresce, muitas vezes precisamos de partilhar dados entre componentes que estão muito separados na árvore de componentes. Passar props através de muitos níveis, conhecido como **"prop drilling"**, torna-se complicado.',
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/prop-drilling.png",
			caption:
				'"Prop drilling": O componente pai passa props através de um componente intermédio para chegar ao neto.',
		},
		{
			type: "paragraph",
			text: 'A Context API do React resolve este problema criando um "túnel" de dados ao qual qualquer componente descendente pode subscrever, sem necessidade de passar props manualmente.',
		},
		{
			type: "list",
			items: [
				"**Ideal para:** Informação do utilizador autenticado, tema (modo claro/escuro), preferências de idioma.",
				"**Alternativas:** Para estados mais complexos ou que se atualizam com muita frequência, bibliotecas como Zustand ou Redux podem oferecer melhor desempenho e ferramentas de desenvolvimento.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Tutorial: Criando um Provedor de Tema" },
		{
			type: "paragraph",
			text: "Vamos construir um sistema de temas (claro/escuro) usando o Context. É um exemplo perfeito de estado global.",
		},

		{ type: "paragraph", text: "**Passo 1: Criar o Contexto**" },
		{
			type: "paragraph",
			text: 'Primeiro, criamos um ficheiro para o nosso contexto, por exemplo, `contexts/ThemeContext.tsx`. Aqui definimos a "forma" do nosso estado e criamos o contexto.',
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { createContext, useContext, useState } from 'react';

// 1. Definir os tipos para o nosso contexto
type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// 2. Criar o Contexto com um valor padrão
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Criar o Provedor (um componente que conterá a nossa lógica)
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Criar um hook personalizado para usar o contexto facilmente
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};
`,
		},

		{
			type: "paragraph",
			text: "**Passo 2: Envolver a Aplicação com o Provedor**",
		},
		{
			type: "paragraph",
			text: "Para que toda a aplicação tenha acesso ao contexto, envolvemos o nosso layout raiz (`app/_layout.tsx`) com o `ThemeProvider`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/_layout.tsx
import { Stack } from 'expo-router';
import { ThemeProvider } from '../contexts/ThemeContext'; // Ajuste o caminho

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </ThemeProvider>
  );
}`,
		},

		{
			type: "paragraph",
			text: "**Passo 3: Consumir o Contexto num Componente**",
		},
		{
			type: "paragraph",
			text: "Agora, qualquer componente pode aceder ao tema e à função para o alterar usando o nosso hook `useTheme`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import { View, Text, Button } from 'react-native';
import { useTheme } from '../contexts/ThemeContext'; // Ajuste o caminho

const ThemedComponent = () => {
  const { theme, toggleTheme } = useTheme();

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

export default ThemedComponent;
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Vantagens e Desvantagens da Context API" },
		{
			type: "twoColumn",
			columns: [
				{
					title: "✅ Vantagens",
					content: [
						"**Evita o Prop Drilling:** O seu principal benefício, simplifica a passagem de dados.",
						"**Nativo do React:** Não precisa de bibliotecas externas para estado global simples.",
						"**Fácil de Aprender:** A API é pequena e conceptualmente simples.",
						"**Centralização:** Organiza o estado global num local lógico.",
					],
				},
				{
					title: "❌ Desvantagens",
					content: [
						"**Desempenho:** Quando o valor do contexto muda, **todos** os componentes que o consomem são re-renderizados, mesmo que não usem a parte do estado que mudou. Isto pode ser um problema em apps grandes.",
						"**Complexidade:** Para lógica de estado muito complexa, pode tornar-se difícil de gerir em comparação com soluções como o Redux, que têm padrões mais rigorosos.",
						"**Acoplamento:** Os componentes que consomem o contexto ficam acoplados à sua estrutura.",
					],
				},
			],
		},
		{
			type: "callout",
			alertType: "tip",
			text: "A chave é usar a ferramenta certa para o trabalho. `useState` para estado local e `Context API` para estado global que não muda com muita frequência. Se o desempenho se tornar um problema, explore alternativas como o Zustand.",
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question: "Qual problema principal a Context API do React resolve?",
					options: [
						"A gestão de efeitos secundários.",
						"O 'prop drilling' (passar props através de muitos níveis).",
						"A renderização de listas longas.",
						"A estilização de componentes.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Em `useEffect(() => { ... }, [])`, o que significa o array de dependências vazio `[]`?",
					options: [
						"O efeito é executado em cada renderização.",
						"O efeito é executado apenas uma vez, quando o componente é montado.",
						"O efeito nunca é executado.",
						"O efeito é executado quando o componente é desmontado.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Qual é a principal desvantagem de desempenho da Context API?",
					options: [
						"É lento para inicializar.",
						"Consome muita memória.",
						"Faz com que todos os componentes consumidores sejam re-renderizados quando o valor do contexto muda.",
						"Não pode ser usado com `React.memo`.",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Para disponibilizar um valor de contexto para toda a sua aplicação, o que deve fazer?",
					options: [
						"Exportar o contexto e usá-lo diretamente em cada componente.",
						"Envolver o componente raiz da sua aplicação (como o layout) com o componente Provedor do contexto.",
						"Chamar uma função `provideContext()` no seu arquivo principal.",
						"Configurá-lo no arquivo `app.json`.",
					],
					correctAnswer: 1,
				},
			],
		},
	],
};
