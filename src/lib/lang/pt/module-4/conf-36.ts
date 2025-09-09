import type { CurriculumTopic } from "../../../../types/types";

export const conference36: CurriculumTopic = {
	id: "conf-36",
	title: "Conf. 36: Workshop de APIs",
	content: [
		{
			type: "heading",
			text: "Workshop: Construção de uma App de Entrega de Comida",
		},
		{
			type: "paragraph",
			text: 'Neste workshop final do módulo, aplicaremos todos os conceitos aprendidos para construir o esqueleto de uma aplicação de entrega de comida. O projeto integrará o consumo de uma API externa, a gestão de estado de rede, listas otimizadas com `FlatList`, `debouncing` para a busca, e armazenamento local com SQLite/Drizzle para uma funcionalidade de "favoritos".',
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Objetivos do Workshop" },
		{
			type: "list",
			items: [
				"**Tela Principal:** Exibir uma lista de categorias de comida e os pratos mais populares, obtidos da API [TheMealDB](https://www.themealdb.com/api.php).",
				"**Busca e Filtros:** Implementar uma barra de busca com `debouncing` e filtros por categoria.",
				"**Lista de Resultados:** Usar `FlatList` para exibir os resultados da busca/filtro de maneira eficiente.",
				"**Tela de Detalhes:** Criar uma rota dinâmica para exibir os detalhes completos de uma receita.",
				"**Favoritos Locais:** Permitir ao utilizador guardar as suas receitas favoritas numa base de dados SQLite local usando o Drizzle ORM.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Guia de Implementação (Passo a Passo)" },

		{ type: "paragraph", text: "**1. Configuração do Projeto e da API:**" },
		{
			type: "list",
			items: [
				"Certifique-se de que tem um projeto Expo com TypeScript, NativeWind, Drizzle ORM e `expo-sqlite` configurados.",
				"Não precisa de uma chave de API para a versão 1 do TheMealDB, o que simplifica a configuração.",
				"Crie um serviço de API (`services/mealApi.ts`) para encapsular todas as chamadas `fetch`.",
			],
		},

		{
			type: "paragraph",
			text: "**2. Esquema da Base de Dados para Favoritos:**",
		},
		{
			type: "list",
			items: [
				"Defina uma tabela `favorite_recipes` no seu `db/schema.ts` para armazenar o ID, nome e miniatura da receita.",
				"Gere a migração com `npm run generate`.",
			],
		},

		{ type: "paragraph", text: "**3. Tela Principal (`app/index.tsx`):**" },
		{
			type: "list",
			items: [
				"Use `useEffect` para carregar as categorias de comida e uma lista de pratos padrão ao iniciar a tela.",
				"Exiba as categorias num `ScrollView` horizontal.",
				"Exiba os pratos num `FlatList`.",
				"Adicione um `TextInput` para a busca.",
			],
		},

		{ type: "paragraph", text: "**4. Lógica de Busca e Filtro:**" },
		{
			type: "list",
			items: [
				"Utilize o hook `useDebounce` para o valor do `TextInput`.",
				'Crie um `useEffect` que dependa do termo de busca "debounced" e da categoria selecionada.',
				"Dentro do `useEffect`, implemente a lógica para chamar a API correta (`search.php?s=` ou `filter.php?c=`) e atualizar o estado dos resultados.",
				"Gerencie os estados de `loading`, `error` e `data` para fornecer feedback ao utilizador.",
			],
		},

		{
			type: "paragraph",
			text: "**5. Tela de Detalhes (`app/recipe/[id].tsx`):**",
		},
		{
			type: "list",
			items: [
				"Crie a rota dinâmica.",
				"Use `useLocalSearchParams` para obter o ID da receita.",
				"Faça uma chamada à API (`lookup.php?i=`) para obter os detalhes completos da receita (ingredientes, instruções).",
				"Crie uma UI atraente para exibir toda a informação.",
			],
		},

		{ type: "paragraph", text: "**6. Lógica de Favoritos:**" },
		{
			type: "list",
			items: [
				"Na tela de detalhes, adicione um botão (ex. um ícone de coração).",
				"Crie um estado `isFavorite` e use um `useEffect` para verificar se a receita atual já existe na sua tabela `favorite_recipes` do Drizzle.",
				"Implemente a função `onPress` do botão para que insira ou elimine o registo da base de dados local e atualize o estado `isFavorite`.",
			],
		},
		{ type: "divider" },

		{
			type: "callout",
			alertType: "tip",
			text: "Este workshop é uma excelente oportunidade para rever e conectar todos os conceitos do módulo. Leve o seu tempo para entender como cada peça (API, estado, UI, base de dados) interage com as outras. Não hesite em usar o Drizzle Studio para verificar se os seus favoritos são guardados corretamente!",
		},
	],
};
