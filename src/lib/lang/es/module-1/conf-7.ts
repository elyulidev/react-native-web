import type { CurriculumTopic } from "../../../../types/types";

export const conference7: CurriculumTopic = {
	id: "conf-7",
	title: "Conf. 7: Gestión de Assets",
	content: [
		{ type: "heading", text: "Gestión de Assets: Imágenes, Fuentes e Íconos" },
		{
			type: "paragraph",
			text: "¡Bienvenidos a una sesión esencial para el desarrollo de interfaces de usuario en React Native! Hoy nos enfocaremos en la gestión de assets, cubriendo cómo trabajar con imágenes, configurar fuentes tipográficas personalizadas e integrar librerías de íconos. Una buena gestión de estos recursos no solo mejora la estética de nuestra aplicación, sino también su rendimiento y mantenibilidad.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "1. Uso Eficiente de Imágenes Locales Mediante require()",
		},
		{
			type: "paragraph",
			text: "Las imágenes son un componente fundamental en casi cualquier aplicación. En React Native, tenemos varias formas de mostrarlas, pero es crucial entender la diferencia entre imágenes locales y remotas, y cuándo usar cada una.",
		},
		{
			type: "list",
			items: [
				{
					text: "**Componentes de Imagen:** React Native proporciona el componente `Image` para mostrar diferentes tipos de imágenes (red, estáticos, locales). Para mayor optimización, se recomienda el componente `Image` de `expo-image`, que ofrece políticas de caché y `contentFit`. Para SVGs, se necesita un paquete de terceros como `react-native-svg`.",
				},
				{
					text: "**ImageBackground:** Permite usar imágenes como fondo, superponiendo otros componentes.",
				},
			],
		},
		{ type: "paragraph", text: "**Imágenes Locales con `require()`:**" },
		{
			type: "list",
			items: [
				"Para cargar imágenes desde el almacenamiento local de tu proyecto, se utiliza la función `require()` dentro de la prop `source` del componente `Image`.",
				"La ruta a la imagen debe ser relativa al archivo donde se usa `require()`.",
				"**Importante:** Es crucial especificar las dimensiones (`width` y `height`) para las imágenes, ya que por defecto no se muestran si no se definen.",
			],
		},
		{
			type: "code",
			language: "jsx",
			code: `import { Image, View, StyleSheet } from 'react-native';\n\nconst Logo = () => (\n  <Image \n    source={require('../assets/images/logo.png')} \n    style={{ width: 100, height: 100 }}\n  />\n);`,
		},

		{ type: "paragraph", text: "**Imágenes Remotas con URI:**" },
		{
			type: "list",
			items: [
				"Para imágenes alojadas en una URL, se pasa un objeto con una propiedad `uri` a la prop `source`.",
				"Al igual que con las imágenes locales, es necesario especificar las dimensiones.",
			],
		},
		{
			type: "code",
			language: "jsx",
			code: `import { Image, View, StyleSheet } from 'react-native';\n\nconst RemoteImage = () => (\n  <Image \n    source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} \n    style={{ width: 50, height: 50 }}\n  />\n);`,
		},

		{
			type: "paragraph",
			text: "**Configuración de `images.d.ts` para TypeScript:**",
		},
		{
			type: "paragraph",
			text: "Si utilizas TypeScript, es común que el IDE se queje de la falta de declaraciones de tipo para los archivos de imagen. Para solucionar esto, crea un archivo `images.d.ts` en la raíz de tu proyecto y declara los módulos:",
		},
		{
			type: "code",
			language: "typescript",
			code: `// images.d.ts\ndeclare module '*.png';\ndeclare module '*.jpg';\ndeclare module '*.jpeg';`,
		},

		{ type: "paragraph", text: "**Organización de Assets:**" },
		{
			type: "paragraph",
			text: "Es una buena práctica organizar tus imágenes en una carpeta `assets/images`. También puedes centralizar la importación y exportación de imágenes desde un solo archivo (ej. `constants/images.ts`) para facilitar su uso en toda la aplicación.",
		},

		{ type: "divider" },

		{
			type: "subtitle",
			text: "2. Configuración y Aplicación de Fuentes Personalizadas",
		},
		{
			type: "paragraph",
			text: "Usar fuentes personalizadas es clave para la identidad visual de una aplicación. Expo facilita enormemente este proceso con el paquete `expo-font`.",
		},
		{
			type: "list",
			items: [
				"**1. Organizar las Fuentes:** Guarda los archivos de las fuentes (`.ttf`, `.otf`) en una carpeta dedicada, como `assets/fonts/`.",
				"**2. Cargar las Fuentes con `useFonts`:** El hook `useFonts` de `expo-font` es la forma recomendada para cargar fuentes asincrónicamente. Esto se hace generalmente en el archivo de layout principal (`app/_layout.tsx`).",
				"**3. Controlar la Splash Screen:** Es importante usar `SplashScreen.preventAutoHideAsync()` al inicio y `SplashScreen.hideAsync()` una vez que las fuentes se han cargado para una experiencia de usuario fluida.",
			],
		},
		{
			type: "code",
			language: "jsx",
			code: `// app/_layout.tsx
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }
  // ... resto del layout
}`,
		},
		{
			type: "list",
			items: [
				"**4. Extender el Tema de Tailwind CSS:** Para que Tailwind reconozca y permita usar tus fuentes personalizadas a través de clases, debes extender la propiedad `fontFamily` en `tailwind.config.js`.",
			],
		},
		{
			type: "code",
			language: "javascript",
			code: `// tailwind.config.js
module.exports = {
  // ...
  theme: {
    extend: {
      fontFamily: {
        'q-bold': ['Quicksand-Bold', 'sans-serif'],
        'q-reg': ['Quicksand-Regular', 'sans-serif'],
      },
    },
  },
  // ...
};`,
		},
		{
			type: "list",
			items: [
				'**5. Aplicar las Fuentes:** Una vez configuradas en Tailwind, puedes aplicar las fuentes a tus componentes usando las clases CSS correspondientes, por ejemplo: `<Text className="font-q-bold">Mi Texto</Text>`.',
			],
		},

		{ type: "divider" },

		{ type: "subtitle", text: "3. Integración de Librerías de Íconos" },
		{
			type: "paragraph",
			text: "Los íconos son elementos esenciales para la navegación y la comunicación visual. `expo/vector-icons` es una colección muy completa que facilita la inclusión de miles de íconos.",
		},
		{
			type: "list",
			items: [
				"**Expo Vector Icons:** Esta librería es una colección de diferentes conjuntos de íconos, como `Ionicons`, `Feather`, `MaterialIcons`, `AntDesign`, etc. Para usarlos, primero necesitas importar el conjunto específico que desees desde `@expo/vector-icons`.",
			],
		},
		{
			type: "code",
			language: "jsx",
			code: `import { Ionicons } from '@expo/vector-icons';\n\nconst HomeIcon = () => (\n  <Ionicons name="home-outline" size={24} color="black" />\n);`,
		},
		{
			type: "list",
			items: [
				"**Íconos en la Barra de Navegación:** En Expo Router, puedes definir íconos personalizados para cada pestaña en la barra de navegación utilizando la prop `tabBarIcon` dentro de `Tabs.Screen.options`. Esta prop recibe una función de callback que proporciona `color`, `size` y el estado `focused`, permitiendo cambiar el estilo del ícono dinámicamente.",
				"**Iconos Personalizados desde Assets:** Además de las librerías de íconos, puedes usar tus propios archivos de imagen (PNG, etc.) como íconos, importándolos desde tu carpeta `assets/icons` utilizando `require()`.",
				"**Ícono de la App y Splash Screen (`app.json`):** El archivo `app.json` es el centro de configuración. Aquí puedes definir la ruta al ícono de tu aplicación (propiedad `icon`) y de la splash screen (propiedad `splash.image`).",
			],
		},

		{ type: "divider" },

		{ type: "subtitle", text: "4. Práctica: Mejorar la Barra de Navegación" },
		{
			type: "paragraph",
			text: "Para consolidar lo aprendido, vamos a mejorar la barra de navegación inferior (Tab Bar) de nuestra aplicación, usando íconos de Expo Vector Icons y aplicando una fuente personalizada.",
		},
		{
			type: "list",
			items: [
				"**1. Preparación:** Asegúrate de tener una fuente personalizada en `assets/fonts/` y que esté cargada en `app/_layout.tsx` (como se mostró anteriormente).",
				"**2. Extender Tailwind:** Añade la fuente personalizada a `tailwind.config.js` y reinicia el servidor (`npx expo start --clear`).",
				"**3. Refactorizar `app/(tabs)/_layout.tsx`:** Abre el layout de tus pestañas. Usa la prop `tabBarIcon` para definir los íconos de cada pestaña y un componente personalizado para el texto y el ícono.",
			],
		},
		{
			type: "code",
			language: "jsx",
			code: `// app/(tabs)/_layout.tsx (Ejemplo para la pestaña 'Home')
import { Tabs } from 'expo-router';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      {icon}
      <Text style={{ color: color, fontFamily: focused ? 'Quicksand-Bold' : 'Quicksand-Regular' }}>
        {name}
      </Text>
    </View>
  );
};

// ... en el componente de Layout
<Tabs.Screen
  name="home"
  options={{
    title: 'Home',
    tabBarIcon: ({ color, focused }) => (
      <TabIcon
        icon={<Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />}
        color={color}
        name="Home"
        focused={focused}
      />
    ),
  }}
/>`,
		},
		{
			type: "paragraph",
			text: "**Resultado Esperado:** Al ejecutar la aplicación, deberías ver los íconos personalizados en la barra de navegación inferior, que cambian de estilo cuando están activos, y el texto debería usar la fuente personalizada que has configurado.",
		},
		{ type: "divider" },
		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Cuál es la forma correcta de incluir una imagen local en un componente de React Native?",
					options: [
						"source={require('../assets/image.png')}",
						'src="../assets/image.png"',
						'source="../assets/image.png"',
						"source={{ uri: '../assets/image.png' }}",
					],
					correctAnswer: 0,
				},
				{
					question:
						"¿Qué hook de `expo-font` se recomienda para cargar fuentes personalizadas en tu aplicación?",
					options: ["loadAsync", "useFonts", "useEffect", "Font.loadAsync"],
					correctAnswer: 1,
				},
				{
					question:
						"Para usar íconos del conjunto Ionicons en tu componente, ¿cuál es la declaración de importación correcta?",
					options: [
						"import { Ionicons } from 'react-native-vector-icons';",
						"import { Icon } from '@expo/vector-icons';",
						"import { Ionicons } from '@expo/vector-icons';",
						"import { Ionicons } from 'expo-icons';",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Si usas TypeScript e importas un archivo PNG, ¿qué debes hacer para evitar errores de tipo?",
					options: [
						"Ignorar el error, es solo una advertencia.",
						"Crear un archivo `images.d.ts` y declarar el módulo `*.png`.",
						"Hacer un cast de la declaración require a `any`.",
						"Instalar `@types/images`.",
					],
					correctAnswer: 1,
				},
			],
		},
	],
};
