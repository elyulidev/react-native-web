import type { CurriculumTopic } from "../../../../types/types";

export const conference35: CurriculumTopic = {
	id: "conf-35",
	title: "Conf. 35: Busca e Filtragem",
	content: [
		{ type: "heading", text: "Busca e Filtragem Dinâmica" },
		{
			type: "paragraph",
			text: 'Combinar uma busca por texto com filtros por categorias é uma funcionalidade poderosa em muitas aplicações, desde e-commerce a apps de receitas. Permite aos utilizadores refinar os resultados de forma precisa. Nesta conferência, aprenderemos a gerir o estado de múltiplos filtros e a combiná-los com uma busca "debounced".',
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Gestão do Estado para Múltiplos Filtros" },
		{
			type: "paragraph",
			text: "Primeiro, precisamos de uma forma de armazenar que filtros estão ativos. Usaremos o `useState` para gerir tanto o termo de busca como a categoria selecionada.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import React, { useState, useEffect } from 'react';
// ...

const CATEGORIES = ['Beef', 'Chicken', 'Dessert', 'Pasta'];

const RecipeSearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // ... resto da lógica
}
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Criação da UI para os Filtros" },
		{
			type: "paragraph",
			text: "Podemos usar uma série de botões ou um `ScrollView` horizontal para mostrar as categorias disponíveis. O estilo do botão mudará para indicar qual está atualmente selecionado.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// Dentro do componente RecipeSearchScreen

const handleSelectCategory = (category: string) => {
  // Se a mesma categoria for pressionada, é desmarcada.
  setSelectedCategory(prev => (prev === category ? null : category));
};

return (
  <View>
    {/* ... TextInput de busca ... */}
    <View className="my-4">
      <Text className="font-bold mb-2">Categorias</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map(category => (
          <Pressable
            key={category}
            onPress={() => handleSelectCategory(category)}
            className={\`p-3 mr-2 rounded-full \${selectedCategory === category ? 'bg-blue-500' : 'bg-gray-200'}\`}
          >
            <Text className={\`font-semibold \${selectedCategory === category ? 'text-white' : 'text-black'}\`}>
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
    {/* ... FlatList de resultados ... */}
  </View>
);
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Combinando Busca e Filtros na Lógica" },
		{
			type: "paragraph",
			text: 'Agora, precisamos que a nossa chamada à API reaja a alterações tanto no termo de busca "debounced" como na categoria selecionada. Podemos alcançar isto fazendo com que o nosso `useEffect` principal dependa de ambos os valores.',
		},
		{
			type: "paragraph",
			text: "Modificaremos a nossa chamada à API para que, se houver uma categoria selecionada, a utilize. O TheMealDB permite-nos filtrar por categoria.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// ... dentro do componente

const debouncedSearchTerm = useDebounce(searchTerm, 500);

useEffect(() => {
  const fetchRecipes = async () => {
    setLoading(true);
    let url = '';

    if (selectedCategory) {
      // Se houver uma categoria, filtramos por ela E opcionalmente pelo termo de busca
      url = \`https://www.themealdb.com/api/json/v1/1/filter.php?c=\${selectedCategory}\`;
    } else if (debouncedSearchTerm) {
      // Se não houver categoria mas sim um termo de busca
      url = \`https://www.themealdb.com/api/json/v1/1/search.php?s=\${debouncedSearchTerm}\`;
    } else {
      // Se não houver nada, não buscamos
      setResults([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      let meals = data.meals || [];

      // Se houver categoria E termo de busca, filtramos localmente os resultados da categoria
      if (selectedCategory && debouncedSearchTerm) {
        meals = meals.filter((meal: any) =>
          meal.strMeal.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
      }

      setResults(meals);
    } catch (e) {
      setError('Erro ao carregar receitas.');
    } finally {
      setLoading(false);
    }
  };

  fetchRecipes();
// O efeito é acionado se o termo debounced OU a categoria mudarem
}, [debouncedSearchTerm, selectedCategory]);
`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Nota: O TheMealDB não permite procurar por texto e categoria num único pedido. Por isso, se ambos estiverem ativos, primeiro filtramos por categoria (que devolve uma lista) e depois filtramos essa lista localmente pelo termo de busca. Outras APIs podem permitir ambos os filtros no mesmo pedido.",
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Num `useEffect` que depende de múltiplos estados como `[debouncedSearchTerm, selectedCategory]`, quando é que a função do efeito é executada?",
					options: [
						"Apenas quando ambos os estados mudam ao mesmo tempo.",
						"Quando qualquer um dos dois estados muda o seu valor.",
						"Apenas quando o componente é montado pela primeira vez.",
						"Cada vez que o componente é renderizado.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Para criar uma lista horizontal de botões de filtro que pode ser rolada, que componente é o mais adequado?",
					options: [
						"`<View style={{ flexDirection: 'row' }}`",
						"`FlatList` com `horizontal={true}`",
						"`ScrollView` com `horizontal={true}`",
						"Qualquer uma das anteriores funcionará igualmente bem.",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Se uma API não permite filtrar por categoria e procurar por texto no mesmo pedido, qual é uma estratégia válida?",
					options: [
						"Mostrar um erro ao utilizador.",
						"Fazer dois pedidos separados e tentar combiná-los.",
						"Fazer o pedido mais restritivo (ex. por categoria) e depois filtrar os resultados localmente com o segundo critério.",
						"É impossível implementar esta funcionalidade.",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Na UI de filtros, como se pode implementar a funcionalidade de desmarcar uma categoria se for pressionada novamente?",
					options: [
						"Usando dois botões, um para selecionar e outro para desmarcar.",
						"No manipulador de eventos, comparar a categoria pressionada com o estado atual e definir o estado como `null` se forem iguais.",
						"É uma funcionalidade automática do componente `Pressable`.",
						"Usando um `useEffect` para redefinir o estado.",
					],
					correctAnswer: 1,
				},
			],
		},
	],
};
