import type { CurriculumTopic } from "../../../../types/types";

export const conference31: CurriculumTopic = {
	id: "conf-31",
	title: "Conf. 31: FlatList Avançado",
	content: [
		{ type: "heading", text: "Funcionalidades Avançadas do FlatList" },
		{
			type: "paragraph",
			text: "Além da renderização básica, o `FlatList` oferece um conjunto potente de funcionalidades para criar experiências de utilizador modernas e fluidas, como o carregamento infinito de dados, a capacidade de atualizar a lista e a adição de cabeçalhos e rodapés.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "1. Carregamento Infinito (Infinite Scrolling) com `onEndReached`",
		},
		{
			type: "paragraph",
			text: "Em vez de carregar milhares de itens de uma só vez, uma estratégia melhor é carregar um lote inicial (ex. 20 itens) e carregar mais à medida que o utilizador se desloca para o final da lista. Isto é alcançado com a prop `onEndReached`.",
		},
		{
			type: "list",
			items: [
				"**`onEndReached`**: Uma função que é chamada quando o utilizador se deslocou até uma certa distância do final da lista renderizada.",
				"**`onEndReachedThreshold`**: Um número entre 0 e 1 que define a que distância do final da lista (em comprimentos da parte visível) o callback `onEndReached` deve ser ativado. Um valor de `0.5` significa que será ativado quando o final da lista estiver a meia altura de ecrã de distância.",
				"**`ListFooterComponent`**: Útil para mostrar um `ActivityIndicator` enquanto os novos dados estão a ser carregados.",
			],
		},
		{
			type: "code",
			language: "tsx",
			code: `
import React, { useState, useCallback } from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';

const MyInfiniteList = () => {
  const [data, setData] = useState(Array.from({ length: 20 }, (_, i) => ({ id: String(i), title: \`Item \${i + 1}\` })));
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const fetchMoreData = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);

    // Simula um pedido de rede
    setTimeout(() => {
      const newItems = Array.from({ length: 20 }, (_, i) => ({
        id: String(data.length + i),
        title: \`Item \${data.length + i + 1}\`
      }));
      setData(prevData => [...prevData, ...newItems]);
      setPage(prevPage => prevPage + 1);
      setLoadingMore(false);
    }, 1500);
  }, [loadingMore, data.length]);

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Text className="p-5 border-b border-gray-200 text-lg">{item.title}</Text>}
      onEndReached={fetchMoreData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loadingMore ? <ActivityIndicator size="large" /> : null}
    />
  );
};

export default MyInfiniteList;
`,
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: '2. "Puxar para Atualizar" (Pull to Refresh) com `RefreshControl`',
		},
		{
			type: "paragraph",
			text: 'Uma experiência de utilizador comum em aplicações móveis é a capacidade de "puxar" do topo de uma lista para recarregar os dados. `FlatList` suporta isto através das props `refreshing` e `onRefresh`.',
		},
		{
			type: "code",
			language: "tsx",
			code: `
import React, { useState, useCallback } from 'react';
import { FlatList, RefreshControl, Text } from 'react-native';

const MyRefreshableList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([{ id: '1', title: 'Dado Inicial' }]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simula uma recarga de dados
    setTimeout(() => {
      setData([{ id: String(Date.now()), title: 'Dado Atualizado' }]);
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Text className="p-5 text-lg">{item.title}</Text>}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#007AFF" // Cor do spinner no iOS
          colors={["#007AFF"]} // Cor do spinner no Android
        />
      }
    />
  );
};
`,
		},
		{
			type: "list",
			items: [
				"**`onRefresh`**: A função que será chamada quando o utilizador ativar o gesto de atualizar.",
				"**`refreshing`**: Um booleano que controla se o indicador de atualização está visível. Deve colocá-lo a `true` no início de `onRefresh` e a `false` quando os dados terminarem de carregar.",
				"**`RefreshControl`**: É o componente de `react-native` que fornece esta funcionalidade.",
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Cabeçalhos e Rodapés (`ListHeaderComponent`, `ListFooterComponent`)",
		},
		{
			type: "paragraph",
			text: "`FlatList` permite adicionar componentes React no topo e na base da lista. Estes componentes deslocam-se juntamente com a lista.",
		},
		{
			type: "list",
			items: [
				"**`ListHeaderComponent`**: É renderizado no início da lista. É perfeito para um título, uma barra de pesquisa ou um resumo.",
				'**`ListFooterComponent`**: É renderizado no final da lista. Já o usámos para mostrar o indicador de carregamento, mas também pode ser usado para um botão de "Carregar mais" ou informação de direitos de autor.',
			],
		},
		{
			type: "code",
			language: "tsx",
			code: `
const MyHeader = () => (
  <View className="p-5 bg-blue-500">
    <Text className="text-white text-2xl font-bold text-center">A Nossa Incrível Lista</Text>
  </View>
);

// No componente da lista
<FlatList
  // ... outras props
  ListHeaderComponent={MyHeader}
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
						"Qual prop do `FlatList` é utilizada para implementar o carregamento infinito (infinite scroll)?",
					options: [
						"`onScrollEnd`",
						"`onLoadMore`",
						"`onEndReached`",
						"`onScroll`",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Para implementar a funcionalidade de 'puxar para atualizar', que props do `FlatList` são essenciais?",
					options: [
						"`loading` e `onLoad`",
						"`refreshing` e `onRefresh`",
						"`pulling` e `onPull`",
						"`reloading` e `onReload`",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Se quiser adicionar uma barra de pesquisa que se desloque juntamente com o conteúdo da lista, que prop do `FlatList` deve usar?",
					options: [
						"`Header`",
						"`TopComponent`",
						"`ListHeaderComponent`",
						"Simplesmente colocá-lo antes do `FlatList` no JSX",
					],
					correctAnswer: 2,
				},
				{
					question:
						"A prop `onEndReachedThreshold` recebe um valor numérico. O que representa um valor de 0.5?",
					options: [
						"A função `onEndReached` será chamada quando o utilizador tiver percorrido 50% da lista.",
						"A função `onEndReached` será chamada quando o final do conteúdo estiver a uma distância de meia altura da parte visível da lista.",
						"A função `onEndReached` esperará 0.5 segundos antes de ser ativada.",
						"A função `onEndReached` será chamada quando restarem 50 itens para mostrar.",
					],
					correctAnswer: 1,
				},
			],
		},
	],
};
