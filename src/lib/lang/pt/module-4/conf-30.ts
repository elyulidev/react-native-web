import type { CurriculumTopic } from "../../../../types/types";

export const conference30: CurriculumTopic = {
	id: "conf-30",
	title: "Conf. 30: FlatList",
	content: [
		{ type: "heading", text: "Listas Grandes e Desempenho: FlatList" },
		{
			type: "paragraph",
			text: "Quando precisamos de mostrar uma lista de itens, a nossa primeira inclinação pode ser usar `ScrollView` e um `.map()`. Isto funciona bem para um número pequeno de itens. No entanto, para listas longas (centenas ou milhares de itens), esta abordagem causa sérios problemas de desempenho, pois renderiza todos os itens de uma só vez, mesmo os que não estão visíveis no ecrã. `FlatList` é a solução do React Native para este problema.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "1. Porque é que o `ScrollView` não é suficiente?",
		},
		{
			type: "paragraph",
			text: "Imagine uma lista com 1000 itens. Um `ScrollView` com um `.map()` faria o seguinte:",
		},
		{
			type: "list",
			items: [
				"Renderizar os 1000 componentes na memória.",
				"Criar 1000 vistas nativas correspondentes.",
				"Consumir uma grande quantidade de memória e poder de processamento, o que pode levar a uma interface de utilizador lenta (lag), tempos de arranque longos e até ao encerramento da aplicação por falta de memória.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Introdução ao `FlatList` e à Virtualização" },
		{
			type: "paragraph",
			text: '`FlatList` utiliza uma estratégia chamada **virtualização**. Em vez de renderizar toda a lista, `FlatList` apenas renderiza os itens que estão visíveis no ecrã num determinado momento, mais alguns itens adicionais fora do ecrã para que a rolagem seja fluida. À medida que o utilizador rola, os itens que saem do ecrã são "desmontados" (reciclando as suas vistas nativas) e os novos itens que entram são renderizados.',
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/flatlist-virtualization.png",
			caption:
				"FlatList apenas mantém em memória os itens visíveis e um pequeno buffer.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Propriedades Essenciais do `FlatList`" },
		{
			type: "paragraph",
			text: "Para usar `FlatList`, precisa de fornecer pelo menos três propriedades chave:",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import React from 'react';
import { SafeAreaView, FlatList, Text, View } from 'react-native';

const DATA = Array.from({ length: 50 }, (_, i) => ({
  id: String(i),
  title: \`Item #\${i + 1}\`,
}));

type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
  <View className="p-5 border-b border-gray-200">
    <Text className="text-lg">{title}</Text>
  </View>
);

const MyList = () => {
  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default MyList;
`,
		},
		{
			type: "list",
			items: [
				"**`data`**: Um array dos dados que serão renderizados. No exemplo, é o nosso `DATA`.",
				"**`renderItem`**: Uma função que recebe um elemento do array `data` e devolve o componente React que deve ser renderizado para esse elemento. Recebe um objeto com uma propriedade `item`.",
				"**`keyExtractor`**: Uma função que diz ao `FlatList` como encontrar uma chave única para cada elemento. O React precisa destas chaves para gerir eficientemente a lista e as suas atualizações. Deve devolver uma string única.",
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "4. Gerindo Estados Vazios com `ListEmptyComponent`",
		},
		{
			type: "paragraph",
			text: "O que acontece se o seu array `data` estiver vazio? Por defeito, `FlatList` não mostrará nada. Para uma melhor experiência do utilizador, podemos fornecer um componente para ser renderizado neste caso, usando a prop `ListEmptyComponent`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
const EmptyListMessage = () => (
  <View className="flex-1 justify-center items-center mt-20">
    <Text className="text-gray-500 text-lg">Não há itens para mostrar.</Text>
  </View>
);

// Dentro do componente MyList
<FlatList
  data={[]} // Simulando uma lista vazia
  renderItem={({ item }) => <Item title={item.title} />}
  keyExtractor={item => item.id}
  ListEmptyComponent={EmptyListMessage}
/>
`,
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Qual é o principal problema de desempenho ao usar `ScrollView` com um `.map()` para uma lista muito longa?",
					options: [
						"Renderiza todos os itens da lista de uma só vez, consumindo muita memória.",
						"Não permite rolagem horizontal.",
						"É difícil de estilizar.",
						"Não consegue lidar com dados assíncronos.",
					],
					correctAnswer: 0,
				},
				{
					question:
						"A técnica que `FlatList` utiliza para renderizar apenas os itens visíveis no ecrã chama-se:",
					options: [
						"Lazy Loading",
						"Virtualização",
						"Memoização",
						"Renderização Condicional",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Qual prop do `FlatList` é responsável por definir como cada item da lista deve ser renderizado?",
					options: ["`data`", "`component`", "`keyExtractor`", "`renderItem`"],
					correctAnswer: 3,
				},
				{
					question:
						"Se o seu array de dados estiver vazio, que prop do `FlatList` pode usar para mostrar uma mensagem ao utilizador?",
					options: [
						"`EmptyComponent`",
						"`ListEmptyComponent`",
						"`renderEmpty`",
						"`fallback`",
					],
					correctAnswer: 1,
				},
			],
		},
	],
};
