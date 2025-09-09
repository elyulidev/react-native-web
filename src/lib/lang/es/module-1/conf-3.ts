import type { CurriculumTopic } from "../../../../types/types";

export const conference3: CurriculumTopic = {
	id: "conf-3",
	title: "Conf. 3: Componentes UI I",
	content: [
		{ type: "heading", text: "Componentes Fundamentales de UI" },
		{
			type: "paragraph",
			text: "React Native proporciona un conjunto de componentes esenciales listos para usar para construir tus interfaces de usuario. Estos componentes se asignan a los elementos de la interfaz de usuario nativos correspondientes en cada plataforma. A continuación se presentan los bloques de construcción más comunes que utilizarás.",
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
			text: "El componente más fundamental para construir una UI. Es un contenedor que soporta layout con flexbox, estilos y manejo de toques. Un View se mapea directamente a las vistas nativas subyacentes, ya sea `UIView` en iOS, `android.view.View` en Android o `<div>` en la web. Es ideal para anidar otros componentes.",
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
			text: "Un componente para mostrar texto. `Text` soporta anidamiento, estilos y manejo de toques. Cualquier texto que quieras mostrar en tu aplicación debe estar dentro de un componente `Text`.",
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
        Yo soy texto base.
        <Text style={styles.innerText}> Y yo soy texto anidado y en negrita.</Text>
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
			text: "Un componente para mostrar imágenes. Puedes cargar imágenes desde el paquete de tu aplicación (imágenes locales) o desde la red.",
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
        source={require('./assets/icon.png')} // Asegúrate de tener esta imagen
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
			text: "Un componente de entrada de texto fundamental que permite al usuario introducir texto. Tiene propiedades como `onChangeText` para manejar los cambios de texto y `onSubmitEditing` para cuando se envía el texto.",
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
        placeholder="Escribe algo aquí..."
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
			text: "Un contenedor genérico con capacidad de desplazamiento que puede albergar múltiples componentes y vistas. Es útil para presentar una pequeña cantidad de elementos de longitud variable. Para listas largas, es mejor usar `FlatList` por su rendimiento.",
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
        {/* Repite el texto para hacerlo más largo */}
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
			text: "El componente `Pressable` es un contenedor que detecta varias etapas de interacciones de presión en cualquiera de sus elementos descendientes. Es una abstracción más potente y flexible que `Button` o `TouchableOpacity`.",
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
        <Text style={styles.text}>{\`Presionado \${timesPressed} veces\`}</Text>
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
			text: "Un componente de botón básico que se renderiza de forma nativa en cada plataforma. Es simple de usar pero menos personalizable que `Pressable` o `TouchableOpacity`.",
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
        title="Presióname"
        onPress={() => Alert.alert('¡Botón simple presionado!')}
        />
        <Button
        title="Botón deshabilitado"
        disabled
        onPress={() => Alert.alert('No me puedes presionar')}
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
			text: "Un componente booleano de encendido/apagado. Es un control que puede estar en uno de dos estados: activado o desactivado.",
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
			text: "Un componente de alto rendimiento para renderizar listas. `FlatList` es ideal para listas largas y dinámicas, ya que solo renderiza los elementos que están actualmente en pantalla, ahorrando memoria y tiempo de procesamiento.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

const DATA = [
    { id: '1', title: 'Primer Elemento' },
    { id: '2', title: 'Segundo Elemento' },
    { id: '3', title: 'Tercer Elemento' },
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
			text: "Similar a `FlatList`, pero para renderizar listas seccionadas. Es útil cuando tienes datos agrupados y quieres mostrar encabezados para cada sección.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React from 'react';
import { SectionList, Text, View, StyleSheet } from 'react-native';

const DATA = [
    { title: 'Platos Principales', data: ['Pizza', 'Hamburguesa', 'Risotto'] },
    { title: 'Acompañamientos', data: ['Papas Fritas', 'Aros de Cebolla', 'Ensalada'] },
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
		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Cuál es el componente más fundamental para agrupar otros componentes y aplicar estilos de layout en React Native?",
					options: ["Text", "View", "StyleSheet", "Box"],
					correctAnswer: 1,
				},
				{
					question:
						"Para renderizar una lista larga de datos de manera eficiente, ¿qué componente deberías usar?",
					options: ["ScrollView", "View", "FlatList", "SectionList"],
					correctAnswer: 2,
				},
				{
					question:
						"Si quieres que un texto o una imagen respondan a una pulsación del usuario, ¿qué componente es el más flexible y recomendado para envolverlos?",
					options: ["Button", "TouchableOpacity", "View", "Pressable"],
					correctAnswer: 3,
				},
				{
					question:
						"¿Qué componente se utiliza para que el usuario pueda introducir texto?",
					options: ["Text", "Input", "TextInput", "Form"],
					correctAnswer: 2,
				},
			],
		},
	],
};
