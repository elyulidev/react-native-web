import type { CurriculumTopic } from "../../../../types/types";

export const conference29: CurriculumTopic = {
	id: "conf-29",
	title: "Conf. 29: Estado do Servidor com TanStack Query",
	content: [
		{
			type: "heading",
			text: "Gerenciamento de Estado do Servidor com TanStack Query",
		},
		{
			type: "paragraph",
			text: "O TanStack Query (anteriormente conhecido como React Query) é uma poderosa biblioteca para buscar, armazenar em cache, sincronizar e atualizar o estado do servidor em suas aplicações React. Ele simplifica drasticamente a lógica de gerenciamento de dados, cuidando automaticamente dos estados de carregamento, erros, novas tentativas e cache.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Por que usar o TanStack Query?" },
		{
			type: "paragraph",
			text: "Gerenciar o estado do servidor manualmente com `useState` e `useEffect` pode se tornar complexo rapidamente. O TanStack Query resolve isso oferecendo:",
		},
		{
			type: "list",
			items: [
				"**Cache automático:** Evita solicitar novamente dados que você já possui.",
				"**Atualização em segundo plano:** Mantém os dados atualizados sem bloquear a UI.",
				"**Gerenciamento de estados:** Fornece estados claros como `isLoading`, `isError`, `isSuccess`.",
				"**Otimização de desempenho:** Reduz requisições de rede desnecessárias.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Instalação e Configuração" },
		{
			type: "paragraph",
			text: "Dentro do seu projeto React Native, instale a biblioteca `@tanstack/react-query`:",
		},
		{
			type: "code",
			language: "bash",
			code: `npm install @tanstack/react-query`,
		},
		{
			type: "paragraph",
			text: "Agora, em seu arquivo de layout raiz (`app/_layout.tsx`), você precisa inicializar o `QueryClientProvider` para que ele esteja disponível em toda a sua aplicação.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';

// 1. Crie uma instância do cliente
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    // 2. Envolva sua aplicação com o provedor
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </QueryClientProvider>
  );
}
`,
		},
		{
			type: "list",
			items: [
				"**`QueryClient`**: É o gerenciador de todo o cache e requisições em sua aplicação.",
				"**`QueryClientProvider`**: É um provedor de Contexto que torna o `QueryClient` disponível para todos os componentes filhos.",
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Criando um Hook Personalizado para Buscar Dados",
		},
		{
			type: "paragraph",
			text: "É uma excelente prática encapsular a lógica de suas requisições em hooks personalizados. Criaremos um hook `useSearchRecipes` que utilizará o hook `useQuery` do TanStack Query.",
		},
		{
			type: "paragraph",
			text: "Primeiro, uma função para a API em `services/mealApi.ts`:",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// services/mealApi.ts
export const searchRecipesByName = async (name: string) => {
    if (!name) return [];
    const response = await fetch(\`https://www.themealdb.com/api/json/v1/1/search.php?s=\${name}\`);
    if (!response.ok) {
        throw new Error('A resposta da rede não foi bem-sucedida');
    }
    const data = await response.json();
    return data.meals || [];
};
`,
		},
		{
			type: "paragraph",
			text: "Agora, o hook personalizado em `hooks/useSearchRecipes.ts`:",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { useQuery } from '@tanstack/react-query';
import { searchRecipesByName } from '../services/mealApi';

export function useSearchRecipes(searchTerm: string) {
  return useQuery({
    queryKey: ['recipes', searchTerm],
    queryFn: () => searchRecipesByName(searchTerm),
    enabled: !!searchTerm, // A consulta só será executada se searchTerm não estiver vazio
  });
}
`,
		},
		{
			type: "list",
			items: [
				"**`useQuery`**: É o hook principal para requisições GET.",
				"**`queryKey`**: Um array que identifica unicamente esta consulta. O TanStack Query o usa para o cache. Se a `queryKey` mudar, a consulta será executada novamente.",
				"**`queryFn`**: A função assíncrona que realmente busca os dados.",
				"**`enabled`**: Uma opção muito útil para controlar quando a consulta deve ser executada.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Exibindo os Dados na Tela" },
		{
			type: "paragraph",
			text: "Agora, usar nosso hook na tela é incrivelmente limpo. `useQuery` nos retorna tudo o que precisamos.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { View, TextInput, Text, FlatList, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useSearchRecipes } from '../hooks/useSearchRecipes'; // Ajuste o caminho

export default function RecipeSearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');

  // Nossa lógica de busca e estado agora é uma única linha!
  const { data: recipes, isLoading, isError, error } = useSearchRecipes(searchTerm);

  return (
    <View className="flex-1 p-4">
      <TextInput
        placeholder="Procurar receita..."
        onChangeText={setSearchTerm}
        value={searchTerm}
        className="p-3 border rounded-lg"
      />

      {isLoading && <ActivityIndicator size="large" className="mt-4" />}
      {isError && <Text className="text-red-500 mt-4">Erro: {error.message}</Text>}

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => <Text className="p-2">{item.strMeal}</Text>}
        className="mt-4"
      />
    </View>
  );
}
`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Note como não precisamos mais do `useState` para `loading`, `error` e `data`. O TanStack Query gerencia tudo isso para nós.",
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Qual é o principal propósito de envolver sua aplicação em `QueryClientProvider`?",
					options: [
						"Para fornecer estilos globais.",
						"Para tornar a instância do `QueryClient` (e seu cache) acessível a todos os componentes.",
						"Para gerenciar a autenticação de usuários.",
						"É um requisito do Expo Router.",
					],
					correctAnswer: 1,
				},
				{
					question: "No hook `useQuery`, para que é utilizada a `queryKey`?",
					options: [
						"É o nome da função que busca os dados.",
						"É uma chave única usada pelo TanStack Query para armazenar em cache os resultados da consulta.",
						"É uma senha para acessar a API.",
						"Determina com que frequência a consulta deve ser atualizada.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Se você tem `useQuery({ queryKey: ['todos', 5], ... })`, o que acontece se o ID mudar para 6?",
					options: [
						"O TanStack Query retornará os dados em cache para o ID 5.",
						"O TanStack Query executará uma nova consulta porque a `queryKey` mudou.",
						"Ocorrerá um erro porque a `queryKey` não pode mudar.",
						"Nada acontecerá até que seja atualizado manualmente.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Qual propriedade do `useQuery` você usaria para impedir que uma consulta seja executada até que uma condição seja verdadeira (por exemplo, que o usuário tenha digitado algo)?",
					options: ["`staleTime`", "`cacheTime`", "`enabled`", "`onSuccess`"],
					correctAnswer: 2,
				},
			],
		},
	],
};
