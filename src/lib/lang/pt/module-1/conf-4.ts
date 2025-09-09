import type { CurriculumTopic } from "../../../../types/types";

export const conference4: CurriculumTopic = {
	id: "conf-4",
	title: "Conf. 4: Componentes de UI II",
	content: [
		{ type: "heading", text: "Componentes Avançados e APIs de UI" },
		{
			type: "paragraph",
			text: "Além dos blocos de construção básicos, o React Native oferece um rico conjunto de componentes e APIs para criar experiências de utilizador polidas e interativas. Esta lição explora como gerir o carregamento de dados, exibir alertas, criar animações e responder às dimensões do dispositivo.",
		},
		{
			type: "componentGrid",
			componentGridItems: [
				{
					id: "activity-indicator",
					title: "ActivityIndicator",
					icon: "ArrowPathIcon",
				},
				{ id: "alert", title: "Alert", icon: "ChatBubbleBottomCenterTextIcon" },
				{ id: "animated", title: "Animated", icon: "SparklesIcon" },
				{
					id: "dimensions",
					title: "Dimensions",
					icon: "DevicePhoneMobileIcon",
				},
				{
					id: "keyboard-avoiding-view",
					title: "KeyboardAvoidingView",
					icon: "KeyIcon",
				},
				{ id: "linking", title: "Linking", icon: "LinkIcon" },
				{ id: "modal", title: "Modal", icon: "RectangleStackIcon" },
				{
					id: "pixel-ratio",
					title: "PixelRatio",
					icon: "MagnifyingGlassPlusIcon",
				},
				{
					id: "refresh-control",
					title: "RefreshControl",
					icon: "ArrowsUpDownIcon",
				},
				{ id: "statusbar", title: "StatusBar", icon: "WindowIcon" },
			],
		},
		{ type: "divider" },

		{ type: "subtitle", id: "activity-indicator", text: "ActivityIndicator" },
		{
			type: "paragraph",
			text: "Exibe um indicador de carregamento circular. É extremamente útil para dar feedback ao utilizador de que um processo está em andamento, como o carregamento de dados de uma rede. Pode personalizar o seu tamanho e cor.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default function ActivityIndicatorExample() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <ActivityIndicator size="small" color="#00ff00" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});`,
		},

		{ type: "subtitle", id: "alert", text: "Alert" },
		{
			type: "paragraph",
			text: "Lança uma caixa de diálogo de alerta nativa com um título, uma mensagem e botões. A API `Alert` é multiplataforma и permite-lhe criar alertas simples ou com múltiplos botões para ações como confirmar ou cancelar.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';

export default function AlertExample() {
  const createTwoButtonAlert = () =>
    Alert.alert(
      'Título do Alerta',
      'Minha Mensagem de Alerta',
      [
        { text: 'Cancelar', onPress: () => console.log('Cancelado'), style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK Pressionado') },
      ]
    );

  return (
    <View style={styles.container}>
      <Button title="Mostrar Alerta" onPress={createTwoButtonAlert} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});`,
		},

		{ type: "subtitle", id: "animated", text: "Animated" },
		{
			type: "paragraph",
			text: "A biblioteca `Animated` foi projetada para criar animações fluidas e interativas. Permite controlar valores ao longo do tempo e aplicá-los a estilos de componentes. É uma API poderosa para criar efeitos visuais complexos como desvanecimentos, deslizes e transformações.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React, { useRef, useEffect } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

export default function AnimatedExample() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
      <Text style={styles.text}>A aparecer...</Text>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: 'powderblue' },
    text: { fontSize: 24, textAlign: 'center' }
})`,
		},

		{ type: "subtitle", id: "dimensions", text: "Dimensions" },
		{
			type: "paragraph",
			text: "Fornece uma API para obter as dimensões (largura e altura) do ecrã ou da janela do dispositivo. É útil para criar layouts responsivos que se adaptam a diferentes tamanhos de ecrã, embora para alterações dinâmicas (como a rotação) se recomendem outras abordagens como os hooks.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function DimensionsExample() {
  return (
    <View style={styles.container}>
      <Text>Largura: {windowWidth.toFixed(2)}</Text>
      <Text>Altura: {windowHeight.toFixed(2)}</Text>
    </View>
  );
}
const styles = StyleSheet.create({ container: { padding: 10 } });`,
		},

		{
			type: "subtitle",
			id: "keyboard-avoiding-view",
			text: "KeyboardAvoidingView",
		},
		{
			type: "paragraph",
			text: "É um componente projetado para resolver um problema comum: o teclado virtual a cobrir os campos de texto. Este componente ajusta automaticamente a sua altura, posição ou preenchimento inferior em resposta ao aparecimento do teclado.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React from 'react';
import { KeyboardAvoidingView, TextInput, View, StyleSheet, Platform } from 'react-native';

export default function KeyboardAvoidingViewExample() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.inner}>
        <TextInput placeholder="Toque para ver o teclado..." style={styles.input} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, justifyContent: 'flex-end', padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 },
});`,
		},

		{ type: "subtitle", id: "linking", text: "Linking" },
		{
			type: "paragraph",
			text: "Fornece uma interface para interagir com links de aplicações, tanto de entrada como de saída. Pode ser usado para abrir URLs num navegador web, enviar e-mails, abrir mapas ou fazer uma chamada telefónica.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React from 'react';
import { Button, Linking, View, StyleSheet, Alert } from 'react-native';

export default function LinkingExample() {
    const openURL = async () => {
        const url = 'https://reactnative.dev';
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(\`Não é possível abrir este URL: \${url}\`);
        }
    };
    return <Button title="Abrir Documentação" onPress={openURL} />;
}`,
		},

		{ type: "subtitle", id: "modal", text: "Modal" },
		{
			type: "paragraph",
			text: "O componente Modal é uma forma de apresentar conteúdo por cima de uma vista principal. É ideal para exibir alertas personalizados, seletores ou qualquer conteúdo que deva captar a atenção do utilizador temporariamente.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

export default function ModalExample() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Isto é um modal!</Text>
            <Button title="Ocultar Modal" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <Button title="Mostrar Modal" onPress={() => setModalVisible(true)} />
    </View>
  );
}
const styles = StyleSheet.create({
    centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    modalView: { margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
});`,
		},

		{ type: "subtitle", id: "pixel-ratio", text: "PixelRatio" },
		{
			type: "paragraph",
			text: "`PixelRatio` dá-lhe acesso à densidade de píxeis do dispositivo. É útil para ajustar o tamanho de imagens e outros elementos para que pareçam nítidos em ecrãs de alta resolução (como os ecrãs Retina).",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React from 'react';
import { View, Text, PixelRatio, StyleSheet } from 'react-native';

export default function PixelRatioExample() {
  const ratio = PixelRatio.get();
  const fontScale = PixelRatio.getFontScale();
  return (
    <View style={styles.container}>
      <Text>Rácio de Píxeis: {ratio}</Text>
      <Text>Escala da Fonte: {fontScale}</Text>
    </View>
  );
}
const styles = StyleSheet.create({ container: { padding: 10 } });`,
		},

		{ type: "subtitle", id: "refresh-control", text: "RefreshControl" },
		{
			type: "paragraph",
			text: 'Este componente é usado dentro de um `ScrollView` ou `FlatList` para adicionar a funcionalidade de "puxar para atualizar" (pull-to-refresh). É um padrão de UX muito comum para recarregar dados.',
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React, { useState, useCallback } from 'react';
import { ScrollView, RefreshControl, Text, StyleSheet } from 'react-native';

export default function RefreshControlExample() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Text>Puxe para baixo para atualizar!</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, alignItems: 'center', paddingTop: 30 } });`,
		},

		{ type: "subtitle", id: "statusbar", text: "StatusBar" },
		{
			type: "paragraph",
			text: "Permite controlar a barra de estado da aplicação. Pode alterar a cor do texto (claro ou escuro), a cor de fundo e até ocultá-la. É fundamental para integrar a sua aplicação com o aspeto do sistema operativo.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React, { useState } from 'react';
import { View, StatusBar, Button, StyleSheet, Platform, Text } from 'react-native';

export default function StatusBarExample() {
  const STYLES = ['default', 'dark-content', 'light-content'];
  const [barStyle, setBarStyle] = useState(STYLES[0]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={barStyle} backgroundColor="#61dafb" />
      <Text>Estilo atual: {barStyle}</Text>
      <Button title="Mudar Estilo" onPress={() => setBarStyle(STYLES[(STYLES.indexOf(barStyle) + 1) % STYLES.length])} />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 } });`,
		},
		{ type: "divider" },
		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Que componente usaria para exibir um indicador de carregamento circular enquanto obtém dados de uma API?",
					options: [
						"StatusBar",
						"ActivityIndicator",
						"RefreshControl",
						"Modal",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Para implementar a funcionalidade 'puxar para atualizar' numa lista, que componente deve usar dentro de um `ScrollView`?",
					options: ["Animated", "Linking", "RefreshControl", "Alert"],
					correctAnswer: 2,
				},
				{
					question:
						"Que API lhe permite abrir um link da web ou uma aplicação de e-mail a partir da sua app?",
					options: ["Dimensions", "PixelRatio", "Linking", "Alert"],
					correctAnswer: 2,
				},
				{
					question:
						"Se precisar que um campo de texto não seja coberto pelo teclado quando o utilizador escreve, qual é o componente mais adequado para envolver o seu ecrã?",
					options: ["View", "KeyboardAvoidingView", "Modal", "ScrollView"],
					correctAnswer: 1,
				},
			],
		},
	],
};
