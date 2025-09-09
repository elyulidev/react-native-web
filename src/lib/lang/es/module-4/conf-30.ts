import type { CurriculumTopic } from "../../../../types/types";

export const conference30: CurriculumTopic = {
	id: "conf-30",
	title: "Conf. 30: FlatList",
	content: [
		{ type: "heading", text: "Listas Grandes y Rendimiento: FlatList" },
		{
			type: "paragraph",
			text: "Cuando necesitamos mostrar una lista de elementos, nuestra primera inclinación podría ser usar `ScrollView` y un `.map()`. Esto funciona bien para un número pequeño de elementos. Sin embargo, para listas largas (cientos o miles de elementos), este enfoque causa serios problemas de rendimiento, ya que renderiza todos los elementos a la vez, incluso los que no están visibles en la pantalla. `FlatList` es la solución de React Native para este problema.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. ¿Por qué `ScrollView` no es suficiente?" },
		{
			type: "paragraph",
			text: "Imagina una lista con 1000 elementos. Un `ScrollView` con un `.map()` haría lo siguiente:",
		},
		{
			type: "list",
			items: [
				"Renderizar los 1000 componentes en la memoria.",
				"Crear 1000 vistas nativas correspondientes.",
				"Consumir una gran cantidad de memoria y potencia de procesamiento, lo que puede llevar a una interfaz de usuario lenta (lag), tiempos de inicio largos e incluso a que la aplicación se cierre por falta de memoria.",
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "2. Introducción a `FlatList` y la Virtualización",
		},
		{
			type: "paragraph",
			text: '`FlatList` utiliza una estrategia llamada **virtualización**. En lugar de renderizar toda la lista, `FlatList` solo renderiza los elementos que son visibles en la pantalla en un momento dado, más algunos elementos adicionales fuera de la pantalla para que el desplazamiento sea fluido. A medida que el usuario se desplaza, los elementos que salen de la pantalla se "desmontan" (reciclando sus vistas nativas) y los nuevos elementos que entran se renderizan.',
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/flatlist-virtualization.png",
			caption:
				"FlatList solo mantiene en memoria los elementos visibles y un pequeño búfer.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Propiedades Esenciales de `FlatList`" },
		{
			type: "paragraph",
			text: "Para usar `FlatList`, necesitas proporcionar al menos tres propiedades clave:",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import React from 'react';
import { SafeAreaView, FlatList, Text, View } from 'react-native';

const DATA = Array.from({ length: 50 }, (_, i) => ({
  id: String(i),
  title: \`Elemento #\${i + 1}\`,
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
				"**`data`**: Un array de los datos que se van a renderizar. En el ejemplo, es nuestro `DATA`.",
				"**`renderItem`**: Una función que toma un elemento del array de `data` y devuelve el componente React que debe ser renderizado para ese elemento. Recibe un objeto con una propiedad `item`.",
				"**`keyExtractor`**: Una función que le dice a `FlatList` cómo encontrar una clave única para cada elemento. React necesita estas claves para gestionar eficientemente la lista y sus actualizaciones. Debe devolver un string único.",
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "4. Manejando Estados Vacíos con `ListEmptyComponent`",
		},
		{
			type: "paragraph",
			text: "¿Qué sucede si tu array de `data` está vacío? Por defecto, `FlatList` no mostrará nada. Para una mejor experiencia de usuario, podemos proporcionar un componente para que se renderice en este caso usando la prop `ListEmptyComponent`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
const EmptyListMessage = () => (
  <View className="flex-1 justify-center items-center mt-20">
    <Text className="text-gray-500 text-lg">No hay elementos para mostrar.</Text>
  </View>
);

// Dentro del componente MyList
<FlatList
  data={[]} // Simulando una lista vacía
  renderItem={({ item }) => <Item title={item.title} />}
  keyExtractor={item => item.id}
  ListEmptyComponent={EmptyListMessage}
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
						"¿Cuál es el principal problema de rendimiento al usar `ScrollView` con un `.map()` para una lista muy larga?",
					options: [
						"Renderiza todos los elementos de la lista a la vez, consumiendo mucha memoria.",
						"No permite el desplazamiento horizontal.",
						"Es difícil de estilizar.",
						"No puede manejar datos asíncronos.",
					],
					correctAnswer: 0,
				},
				{
					question:
						"La técnica que `FlatList` utiliza para renderizar solo los elementos visibles en la pantalla se llama:",
					options: [
						"Lazy Loading",
						"Virtualización",
						"Memoización",
						"Renderizado Condicional",
					],
					correctAnswer: 1,
				},
				{
					question:
						"¿Qué prop de `FlatList` es responsable de definir cómo se debe renderizar cada elemento de la lista?",
					options: ["`data`", "`component`", "`keyExtractor`", "`renderItem`"],
					correctAnswer: 3,
				},
				{
					question:
						"Si tu array de datos está vacío, ¿qué prop de `FlatList` puedes usar para mostrar un mensaje al usuario?",
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
