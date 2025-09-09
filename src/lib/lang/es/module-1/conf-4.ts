import type { CurriculumTopic } from "../../../../types/types";

export const conference4: CurriculumTopic = {
	id: "conf-4",
	title: "Conf. 4: Componentes UI II",
	content: [
		{ type: "heading", text: "Componentes Avanzados y APIs de UI" },
		{
			type: "paragraph",
			text: "Más allá de los bloques de construcción básicos, React Native ofrece un rico conjunto de componentes y APIs para crear experiencias de usuario pulidas e interactivas. Esta lección explora cómo manejar la carga de datos, mostrar alertas, crear animaciones y responder a las dimensiones del dispositivo.",
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
			text: "Muestra un indicador de carga circular. Es extremadamente útil para dar feedback al usuario de que un proceso está en curso, como la carga de datos desde una red. Puedes personalizar su tamaño y color.",
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
			text: "Lanza un cuadro de diálogo de alerta nativo con un título, un mensaje y botones. La API `Alert` es multiplataforma y te permite crear alertas simples o con múltiples botones para acciones como confirmar o cancelar.",
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
      'Título de la Alerta',
      'Mi Mensaje de Alerta',
      [
        { text: 'Cancelar', onPress: () => console.log('Cancelado'), style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK Presionado') },
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
			text: "La librería `Animated` está diseñada para crear animaciones fluidas e interactivas. Permite controlar valores a lo largo del tiempo y aplicarlos a estilos de componentes. Es una API potente para crear efectos visuales complejos como desvanecimientos, deslizamientos y transformaciones.",
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
      <Text style={styles.text}>Apareciendo...</Text>
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
			text: "Proporciona una API para obtener las dimensiones (ancho y alto) de la pantalla o la ventana del dispositivo. Es útil para crear diseños responsivos que se adaptan a diferentes tamaños de pantalla, aunque para cambios dinámicos (como la rotación) se recomiendan otros enfoques como los hooks.",
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
      <Text>Ancho: {windowWidth.toFixed(2)}</Text>
      <Text>Alto: {windowHeight.toFixed(2)}</Text>
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
			text: "Es un componente diseñado para resolver un problema común: el teclado virtual cubriendo los campos de texto. Este componente ajusta automáticamente su altura, posición o relleno inferior en respuesta a la aparición del teclado.",
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
        <TextInput placeholder="Toca para ver el teclado..." style={styles.input} />
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
			text: "Proporciona una interfaz para interactuar con enlaces de aplicaciones tanto entrantes como salientes. Puede usarse para abrir URLs en un navegador web, enviar correos electrónicos, abrir mapas o realizar una llamada telefónica.",
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
            Alert.alert(\`No se puede abrir esta URL: \${url}\`);
        }
    };
    return <Button title="Abrir Documentación" onPress={openURL} />;
}`,
		},

		{ type: "subtitle", id: "modal", text: "Modal" },
		{
			type: "paragraph",
			text: "El componente Modal es una forma de presentar contenido por encima de una vista principal. Es ideal para mostrar alertas personalizadas, selectores o cualquier contenido que deba captar la atención del usuario temporalmente.",
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
            <Text>¡Esto es un modal!</Text>
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
			text: "`PixelRatio` te da acceso a la densidad de píxeles del dispositivo. Es útil para ajustar el tamaño de imágenes y otros elementos para que se vean nítidos en pantallas de alta resolución (como las pantallas Retina).",
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
      <Text>Relación de Píxeles: {ratio}</Text>
      <Text>Escala de Fuente: {fontScale}</Text>
    </View>
  );
}
const styles = StyleSheet.create({ container: { padding: 10 } });`,
		},

		{ type: "subtitle", id: "refresh-control", text: "RefreshControl" },
		{
			type: "paragraph",
			text: 'Este componente se usa dentro de un `ScrollView` o `FlatList` para añadir la funcionalidad de "deslizar para refrescar" (pull-to-refresh). Es un patrón de UX muy común para recargar datos.',
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
      <Text>¡Desliza hacia abajo para refrescar!</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, alignItems: 'center', paddingTop: 30 } });`,
		},

		{ type: "subtitle", id: "statusbar", text: "StatusBar" },
		{
			type: "paragraph",
			text: "Permite controlar la barra de estado de la aplicación. Puedes cambiar el color del texto (claro u oscuro), el color de fondo e incluso ocultarla. Es clave para integrar tu aplicación con el aspecto del sistema operativo.",
		},
		// FIX: Added 'Text' to import in StatusBarExample code snippet below.
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
      <Text>Estilo actual: {barStyle}</Text>
      <Button title="Cambiar Estilo" onPress={() => setBarStyle(STYLES[(STYLES.indexOf(barStyle) + 1) % STYLES.length])} />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 } });`,
		},
		{ type: "divider" },
		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Qué componente usarías para mostrar un indicador de carga circular mientras se obtienen datos de una API?",
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
						"Para implementar la funcionalidad 'deslizar para refrescar' en una lista, ¿qué componente deberías usar dentro de un `ScrollView`?",
					options: ["Animated", "Linking", "RefreshControl", "Alert"],
					correctAnswer: 2,
				},
				{
					question:
						"¿Qué API te permite abrir un enlace web o una aplicación de correo electrónico desde tu app?",
					options: ["Dimensions", "PixelRatio", "Linking", "Alert"],
					correctAnswer: 2,
				},
				{
					question:
						"Si necesitas que un campo de texto no sea cubierto por el teclado cuando el usuario escribe, ¿qué componente es el más adecuado para envolver tu pantalla?",
					options: ["View", "KeyboardAvoidingView", "Modal", "ScrollView"],
					correctAnswer: 1,
				},
			],
		},
	],
};
