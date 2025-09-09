import type { CurriculumTopic } from "../../../../types/types";

export const conference3: CurriculumTopic = {
	id: "conf-3",
	title: "Conf. 3: Componentes de UI I",
	content: [
		{ type: "heading", text: "Componentes Fundamentais de UI" },
		{
			type: "paragraph",
			text: "O React Native fornece um conjunto de componentes essenciais prontos a usar para construir as suas interfaces de utilizador. Estes componentes mapeiam para os elementos de interface de utilizador nativos correspondentes em cada plataforma. Apresentam-se a seguir os blocos de construção mais comuns que irá utilizar.",
		},
		{
			type: "componentGrid",
			componentGridItems: [
				{ id: "view", title: "View", icon: "RectangleGroupIcon" },
				{ id: "text", title: "Text", icon: "DocumentTextIcon" },
				{ id: "image", title: "Image", icon: "PhotoIcon" },
				{ id: "text-input", title: "TextInput", icon: "Bars3BottomLeftIcon" },
				{ id: "scroll-view", title: "ScrollView", icon: "ArrowsUpDownIcon" },
				{ id: "pressable", title: "Pressable", icon: "CursorArrowRaysIcon" },
				{ id: "button", title: "Button", icon: "CursorArrowRaysIcon" },
				{ id: "switch", title: "Switch", icon: "PowerIcon" },
				{ id: "flat-list", title: "FlatList", icon: "ListBulletIcon" },
				{ id: "section-list", title: "SectionList", icon: "ListBulletIcon" },
			],
		},
		{ type: "divider" },

		{ type: "subtitle", id: "view", text: "View" },
		{
			type: "paragraph",
			text: "O componente mais fundamental para construir uma UI. É um contentor que suporta layout com flexbox, estilos e manuseamento de toques. Uma View mapeia diretamente para as vistas nativas subjacentes, seja `UIView` no iOS, `android.view.View` no Android ou `<div>` na web. É ideal para aninhar outros componentes.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ViewExample() {
  return (
    <View style={styles.container}>
      <View style={styles.box1} />
      <View style={styles.box2} />
      <View style={styles.box3} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  box1: { width: 50, height: 50, backgroundColor: 'powderblue' },
  box2: { width: 50, height: 50, backgroundColor: 'skyblue' },
  box3: { width: 50, height: 50, backgroundColor: 'steelblue' },
});`,
		},

		{ type: "subtitle", id: "text", text: "Text" },
		{
			type: "paragraph",
			text: "Um componente para exibir texto. `Text` suporta aninhamento, estilos e manuseamento de toques. Qualquer texto que queira exibir na sua aplicação deve estar dentro de um componente `Text`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function TextExample() {
  return (
    <Text style={styles.baseText}>
      Eu sou texto base.
      <Text style={styles.innerText}> E eu sou texto aninhado e a negrito.</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'sans-serif',
    fontSize: 16,
  },
  innerText: {
    fontWeight: 'bold',
    color: 'red',
  },
});`,
		},

		{ type: "subtitle", id: "image", text: "Image" },
		{
			type: "paragraph",
			text: "Um componente para exibir imagens. Pode carregar imagens do pacote da sua aplicação (imagens locais) ou da rede.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function ImageExample() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
      />
      <Image
        style={styles.logo}
        source={require('./assets/icon.png')} // Certifique-se de que tem esta imagem
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: 'center',
  },
  logo: {
    width: 66,
    height: 58,
    marginBottom: 10,
  },
});`,
		},

		{ type: "subtitle", id: "text-input", text: "TextInput" },
		{
			type: "paragraph",
			text: "Um componente de entrada de texto fundamental que permite ao utilizador introduzir texto. Tem propriedades como `onChangeText` para manusear as alterações de texto e `onSubmitEditing` para quando o texto é submetido.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

export default function TextInputExample() {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Escreva algo aqui..."
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      <Text style={{padding: 10, fontSize: 22}}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});`,
		},

		{ type: "subtitle", id: "scroll-view", text: "ScrollView" },
		{
			type: "paragraph",
			text: "Um contentor genérico com capacidade de deslocamento que pode albergar múltiplos componentes e vistas. É útil para apresentar uma pequena quantidade de elementos de comprimento variável. Para listas longas, é melhor usar `FlatList` pelo seu desempenho.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

export default function ScrollViewExample() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...
        {/* Repita o texto para o tornar mais longo */}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { height: 200, borderWidth: 1, borderColor: 'gray' },
  text: { fontSize: 32 },
});`,
		},

		{ type: "subtitle", id: "pressable", text: "Pressable" },
		{
			type: "paragraph",
			text: "O componente `Pressable` é um contentor que deteta várias fases de interações de pressão em qualquer um dos seus elementos descendentes. É uma abstração mais potente e flexível do que `Button` ou `TouchableOpacity`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function PressableExample() {
  const [timesPressed, setTimesPressed] = useState(0);

  return (
    <Pressable
      onPress={() => setTimesPressed(current => current + 1)}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white' }
      ]}>
      {/* FIX: Escaped inner template literal to prevent parsing errors. */}
      <Text style={styles.text}>{\`Pressionado \${timesPressed} vezes\`}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { padding: 10, borderWidth: 1, borderColor: 'blue' },
  text: { fontSize: 16 }
});`,
		},

		{ type: "subtitle", id: "button", text: "Button" },
		{
			type: "paragraph",
			text: "Um componente de botão básico que é renderizado de forma nativa em cada plataforma. É simples de usar mas menos personalizável do que `Pressable` ou `TouchableOpacity`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';

export default function ButtonExample() {
  return (
    <View style={styles.container}>
      <Button
        title="Pressione-me"
        onPress={() => Alert.alert('Botão simples pressionado!')}
      />
      <Button
        title="Botão desativado"
        disabled
        onPress={() => Alert.alert('Não me pode pressionar')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});`,
		},

		{ type: "subtitle", id: "switch", text: "Switch" },
		{
			type: "paragraph",
			text: "Um componente booleano de ligar/desligar. É um controlo que pode estar num de dois estados: ativado ou desativado.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React, { useState } from 'react';
import { View, Switch, StyleSheet } from 'react-native';

export default function SwitchExample() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});`,
		},

		{ type: "subtitle", id: "flat-list", text: "FlatList" },
		{
			type: "paragraph",
			text: "Um componente de alto desempenho para renderizar listas. `FlatList` é ideal para listas longas e dinâmicas, pois apenas renderiza os itens que estão atualmente no ecrã, poupando memória и tempo de processamento.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

const DATA = [
  { id: '1', title: 'Primeiro Item' },
  { id: '2', title: 'Segundo Item' },
  { id: '3', title: 'Terceiro Item' },
];

export default function FlatListExample() {
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  item: { backgroundColor: '#f9c2ff', padding: 20, marginVertical: 8 },
  title: { fontSize: 24 },
});`,
		},

		{ type: "subtitle", id: "section-list", text: "SectionList" },
		{
			type: "paragraph",
			text: "Semelhante a `FlatList`, mas para renderizar listas seccionadas. É útil quando tem dados agrupados e quer mostrar cabeçalhos para cada secção.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React from 'react';
import { SectionList, Text, View, StyleSheet } from 'react-native';

const DATA = [
  { title: 'Pratos Principais', data: ['Pizza', 'Hambúrguer', 'Risoto'] },
  { title: 'Acompanhamentos', data: ['Batatas Fritas', 'Anéis de Cebola', 'Salada'] },
];

export default function SectionListExample() {
  return (
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item}</Text>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: { backgroundColor: '#f9c2ff', padding: 20, marginVertical: 8 },
  header: { fontSize: 32, backgroundColor: '#fff' },
  title: { fontSize: 24 },
});`,
		},
		{ type: "divider" },
		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Qual é o componente mais fundamental para agrupar outros componentes e aplicar estilos de layout no React Native?",
					options: ["Text", "View", "StyleSheet", "Box"],
					correctAnswer: 1,
				},
				{
					question:
						"Para renderizar uma longa lista de dados de forma eficiente, que componente deve usar?",
					options: ["ScrollView", "View", "FlatList", "SectionList"],
					correctAnswer: 2,
				},
				{
					question:
						"Se quiser que um texto ou imagem responda a um toque do utilizador, qual é o componente mais flexível e recomendado para os envolver?",
					options: ["Button", "TouchableOpacity", "View", "Pressable"],
					correctAnswer: 3,
				},
				{
					question:
						"Que componente é utilizado para que o utilizador possa introduzir texto?",
					options: ["Text", "Input", "TextInput", "Form"],
					correctAnswer: 2,
				},
			],
		},
	],
};
