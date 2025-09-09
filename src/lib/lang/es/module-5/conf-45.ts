import type { CurriculumTopic } from "../../../../types/types";

export const conference45: CurriculumTopic = {
	id: "conf-45",
	title: "Conf. 45: UI/UX Avanzada y Animaciones",
	content: [
		{ type: "heading", text: "UI/UX Avanzada: Modals, Alerts y Animaciones" },
		{
			type: "paragraph",
			text: "Una gran experiencia de usuario a menudo reside en los detalles: cómo se presenta la información, cómo se confirman las acciones y cómo las animaciones fluidas guían la atención. En esta sesión, exploraremos los Modals, Alerts y daremos nuestros primeros pasos en el mundo de las animaciones con `react-native-reanimated`.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Modals y Alerts Nativos" },
		{
			type: "paragraph",
			text: "React Native nos proporciona componentes para mostrar contenido superpuesto y diálogos nativos.",
		},
		{
			type: "list",
			items: [
				"**`Modal`**: Un componente para presentar contenido por encima de la vista principal. Es una vista en blanco que puedes estilizar como quieras. Ideal para formularios, selectores personalizados o vistas a pantalla completa que aparecen temporalmente.",
				'**`Alert.alert()`**: Una API simple para lanzar un diálogo de alerta nativo del sistema operativo. Es perfecto para confirmaciones rápidas (ej. "¿Estás seguro de que quieres eliminar esto?") o para mostrar mensajes de error/éxito. Es menos personalizable que un `Modal`.',
			],
		},
		{
			type: "code",
			language: "javascript",
			code: `
import { Alert, Button } from 'react-native';

const showConfirmationAlert = () => {
    Alert.alert(
        'Confirmar Eliminación',
        'Esta acción no se puede deshacer.',
        [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Eliminar', style: 'destructive', onPress: () => console.log('Eliminado') },
        ]
    );
}

// <Button title="Eliminar" onPress={showConfirmationAlert} />
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Introducción a `react-native-reanimated`" },
		{
			type: "paragraph",
			text: "Mientras que la API `Animated` original de React Native funciona, `react-native-reanimated` es la biblioteca moderna y recomendada para animaciones. Su principal ventaja es que permite que las animaciones se ejecuten principalmente en el hilo de la UI en lugar del hilo de JavaScript, lo que resulta en animaciones mucho más fluidas y de mayor rendimiento, incluso cuando la lógica de JS está ocupada.",
		},

		{ type: "paragraph", text: "**Paso 1: Instalación y Configuración**" },
		{
			type: "code",
			language: "bash",
			code: "npx expo install react-native-reanimated",
		},
		{
			type: "paragraph",
			text: "Luego, añade el plugin a tu `babel.config.js`:",
		},
		{
			type: "code",
			language: "javascript",
			code: `
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // ... otros plugins
      'react-native-reanimated/plugin', // ¡Añade esto al final!
    ],
  };
};
`,
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Después de añadir el plugin de Babel, es crucial reiniciar el servidor de desarrollo con `npx expo start --clear`.",
		},

		{ type: "subtitle", text: "3. Conceptos Básicos de Reanimated" },
		{
			type: "list",
			items: [
				'**`useSharedValue`**: Similar a `useRef`, crea un valor "compartido" que puede ser leído y modificado tanto por el hilo de JS como por el hilo de la UI. Este es el núcleo de las animaciones.',
				"**`useAnimatedStyle`**: Un hook que crea un objeto de estilo que puede reaccionar a los cambios en los `sharedValues`.",
				'**`withTiming` y `withSpring`**: Funciones "worklet" que describen *cómo* un `sharedValue` debe cambiar. `withTiming` es para animaciones basadas en duración, y `withSpring` para animaciones basadas en físicas de resorte.',
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "4. Práctica: Animando la Aparición de un Componente",
		},
		{
			type: "paragraph",
			text: 'Vamos a crear un efecto de "fade in" y deslizamiento hacia arriba para un componente cuando aparece.',
		},
		{
			type: "code",
			language: "tsx",
			code: `
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

const AnimatedComponent = () => {
  // 1. Crear shared values para la opacidad y la posición Y
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  // 2. Crear el estilo animado que depende de los shared values
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  // 3. Iniciar la animación cuando el componente se monta
  useEffect(() => {
    // Anima la opacidad a 1 en 500ms
    opacity.value = withTiming(1, { duration: 500 });
    // Anima la posición Y a 0 con un efecto de resorte
    translateY.value = withSpring(0);
  }, []);

  return (
    // 4. Aplicar el estilo al componente animado
    // Nota: El componente debe ser un 'Animated.View', 'Animated.Text', etc.
    <Animated.View style={[{ padding: 20, backgroundColor: 'lightblue', borderRadius: 10 }, animatedStyle]}>
      <Text>¡Hola, Reanimated!</Text>
    </Animated.View>
  );
};

export default AnimatedComponent;
`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "La clave es usar los componentes `Animated` (ej. `Animated.View`) para que Reanimated pueda aplicar eficientemente los estilos calculados en el hilo de la UI.",
		},
	],
};
