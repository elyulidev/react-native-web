import type { CurriculumTopic } from "../../../../types/types";

export const conference31: CurriculumTopic = {
	id: "conf-31",
	title: "Conf. 31: FlatList Avanzado",
	content: [
		{ type: "heading", text: "Características Avanzadas de FlatList" },
		{
			type: "paragraph",
			text: "Más allá del renderizado básico, `FlatList` ofrece un potente conjunto de características para crear experiencias de usuario modernas y fluidas, como la carga infinita de datos, la capacidad de refrescar la lista y la adición de cabeceras y pies de página.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "1. Carga Infinita (Infinite Scrolling) con `onEndReached`",
		},
		{
			type: "paragraph",
			text: "En lugar de cargar miles de elementos a la vez, una mejor estrategia es cargar un lote inicial (ej. 20 elementos) y cargar más a medida que el usuario se desplaza hacia el final de la lista. Esto se logra con la prop `onEndReached`.",
		},
		{
			type: "list",
			items: [
				"**`onEndReached`**: Una función que se llama cuando el usuario se ha desplazado hasta una cierta distancia del final de la lista renderizada.",
				"**`onEndReachedThreshold`**: Un número entre 0 y 1 que define a qué distancia del final de la lista (en longitudes de la parte visible) debe activarse el callback `onEndReached`. Un valor de `0.5` significa que se activará cuando el final de la lista esté a media pantalla de distancia.",
				"**`ListFooterComponent`**: Útil para mostrar un `ActivityIndicator` mientras se cargan los nuevos datos.",
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

    // Simula una petición de red
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

		{ type: "subtitle", text: '2. "Pull to Refresh" con `RefreshControl`' },
		{
			type: "paragraph",
			text: 'Una experiencia de usuario común en aplicaciones móviles es la capacidad de "tirar" de la parte superior de una lista para recargar los datos. `FlatList` soporta esto a través de la prop `refreshing` y `onRefresh`.',
		},
		{
			type: "code",
			language: "tsx",
			code: `
import React, { useState, useCallback } from 'react';
import { FlatList, RefreshControl, Text } from 'react-native';

const MyRefreshableList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([{ id: '1', title: 'Dato Inicial' }]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simula una recarga de datos
    setTimeout(() => {
      setData([{ id: String(Date.now()), title: 'Dato Refrescado' }]);
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
          tintColor="#007AFF" // Color del spinner en iOS
          colors={["#007AFF"]} // Color del spinner en Android
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
				"**`onRefresh`**: La función que se llamará cuando el usuario active el gesto de refrescar.",
				"**`refreshing`**: Un booleano que controla si el indicador de refresco está visible. Debes ponerlo a `true` al inicio de `onRefresh` y a `false` cuando los datos hayan terminado de cargarse.",
				"**`RefreshControl`**: Es el componente de `react-native` que proporciona esta funcionalidad.",
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Cabeceras y Pies de Página (`ListHeaderComponent`, `ListFooterComponent`)",
		},
		{
			type: "paragraph",
			text: "`FlatList` permite añadir componentes React en la parte superior e inferior de la lista. Estos componentes se desplazan junto con la lista.",
		},
		{
			type: "list",
			items: [
				"**`ListHeaderComponent`**: Se renderiza al principio de la lista. Es perfecto para un título, una barra de búsqueda o un resumen.",
				'**`ListFooterComponent`**: Se renderiza al final de la lista. Ya lo usamos para mostrar el indicador de carga, pero también puede usarse para un botón de "Cargar más" o información de copyright.',
			],
		},
		{
			type: "code",
			language: "tsx",
			code: `
const MyHeader = () => (
  <View className="p-5 bg-blue-500">
    <Text className="text-white text-2xl font-bold text-center">Nuestra Increíble Lista</Text>
  </View>
);

// En el componente de la lista
<FlatList
  // ... otras props
  ListHeaderComponent={MyHeader}
/>
`,
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Qué prop de `FlatList` se utiliza para implementar la carga infinita (infinite scroll)?",
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
						"Para implementar la funcionalidad de 'pull-to-refresh', ¿qué props de `FlatList` son esenciales?",
					options: [
						"`loading` y `onLoad`",
						"`refreshing` y `onRefresh`",
						"`pulling` y `onPull`",
						"`reloading` y `onReload`",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Si quieres añadir una barra de búsqueda que se desplace junto con el contenido de la lista, ¿qué prop de `FlatList` deberías usar?",
					options: [
						"`Header`",
						"`TopComponent`",
						"`ListHeaderComponent`",
						"Simplemente ponerlo antes de `FlatList` en el JSX",
					],
					correctAnswer: 2,
				},
				{
					question:
						"La prop `onEndReachedThreshold` toma un valor numérico. ¿Qué representa un valor de 0.5?",
					options: [
						"La función `onEndReached` se llamará cuando el usuario haya recorrido el 50% de la lista.",
						"La función `onEndReached` se llamará cuando el final del contenido esté a una distancia de media altura de la parte visible de la lista.",
						"La función `onEndReached` esperará 0.5 segundos antes de activarse.",
						"La función `onEndReached` se llamará cuando queden 50 elementos por mostrar.",
					],
					correctAnswer: 1,
				},
			],
		},
	],
};
