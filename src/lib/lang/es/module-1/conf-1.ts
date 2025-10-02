import type { CurriculumTopic } from "../../../../types/types";

export const conference1: CurriculumTopic = {
	id: "conf-1",
	title: "Conf. 1: Introducción a RN y Expo",
	content: [
		{ type: "heading", text: "Introducción a React Native y Expo" },
		{
			type: "paragraph",
			text: "Una comprensión sólida de React Native y Expo, cubriendo sus fundamentos, configuración del entorno, componentes básicos de UI y los conceptos esenciales de enrutamiento.",
		},

		{ type: "divider" },

		{ type: "subtitle", text: "Parte 1: Descubriendo React Native" },
		{
			type: "paragraph",
			text: "React Native es un framework que permite construir aplicaciones móviles nativas para iOS y Android desde una única base de código utilizando React.",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "CodeBracketIcon",
					title: "Código Único",
					text: "Escribe el código una vez y despliégalo en iOS y Android, ahorrando tiempo y recursos.",
				},
				{
					icon: "UsersIcon",
					title: "Gran Adopción",
					text: "Utilizado por gigantes como Meta, Microsoft, Tesla, y Airbnb.",
				},
				{
					icon: "BoltIcon",
					title: "Alto Rendimiento",
					text: "La nueva arquitectura (JSI, Turbo Modules, Fabric) ofrece un rendimiento cercano al nativo.",
				},
			],
		},

		{
			type: "callout",
			alertType: "info",
			text: "Aproximadamente el 75% del conocimiento de React para desarrollo web se traslada directamente al móvil.",
		},

		{ type: "subtitle", text: "React Native vs. React Web" },
		{
			type: "image",
			imageUrl:
				process.env.NODE_ENV === "production"
					? "https://kvskvfok8cknjmpl.public.blob.vercel-storage.com/react-native-vs-react-web.webp"
					: "/conf1/react-native-vs-react-web.webp",
			caption:
				"Visualización conceptual de las diferencias de componentes entre React Web y React Native.",
		},
		{
			type: "twoColumn",
			columns: [
				{
					title: "Componentes",
					content: [
						"<div> → <View>",
						"<p>, <h1> → <Text>",
						"<img> → <Image>",
						"<input> → <TextInput>",
					],
				},
				{
					title: "Estilos y Eventos",
					content: [
						"className → style={StyleSheet.create(...)}",
						"CSS → NativeWind (Tailwind)",
						"onClick → onPress",
						"onMouseOver → onLongPress",
					],
				},
			],
		},

		{ type: "divider" },

		{ type: "subtitle", text: "Parte 2: Introducción a Expo" },
		{
			type: "paragraph",
			text: "Expo es un framework y ecosistema de herramientas para React Native que simplifica enormemente el desarrollo, la revisión y el despliegue.",
		},
		{
			type: "image",
			imageUrl:
				process.env.NODE_ENV === "production"
					? "https://kvskvfok8cknjmpl.public.blob.vercel-storage.com/expo-ecosystem.webp"
					: "/conf1/expo-ecosystem.webp",
			caption:
				"El ecosistema de Expo: un conjunto de herramientas sobre React Native para agilizar el desarrollo.",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "AcademicCapIcon",
					title: "Recomendado Oficialmente",
					text: "La documentación de React Native recomienda Expo como la mejor manera de empezar.",
				},
				{
					icon: "BoltIcon",
					title: "Configuración Simple",
					text: "No necesitas instalar Android Studio o Xcode para empezar a desarrollar.",
				},
				{
					icon: "DevicePhoneMobileIcon",
					title: "Expo Go",
					text: "Una app para probar tus desarrollos en tiempo real en tu dispositivo físico.",
				},
				{
					icon: "FolderIcon",
					title: "Expo Router",
					text: "Sistema de enrutamiento basado en archivos, similar a Next.js.",
				},
			],
		},

		{ type: "divider" },

		{ type: "subtitle", text: "Parte 3: Configuración y Estructura" },
		{
			type: "paragraph",
			text: "Comenzar un nuevo proyecto es tan simple como ejecutar un solo comando en tu terminal.",
		},
		{ type: "code", language: "bash", code: "npx create-expo-app my-app" },
		{
			type: "paragraph",
			text: "Luego, inícialo y escanea el QR con la app Expo Go en tu teléfono.",
		},
		{ type: "code", language: "bash", code: "cd my-app\nnpx expo start" },
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/expo-go-workflow.png",
			caption:
				"Flujo de desarrollo con Expo Go: codifica, escanea el QR y visualiza tu app instantáneamente en tu dispositivo.",
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Importante: Tu ordenador y tu dispositivo móvil deben estar conectados a la misma red Wi-Fi.",
		},

		{ type: "divider" },

		{ type: "subtitle", text: "Parte 4: Componentes Core y Estilos" },
		{
			type: "paragraph",
			text: "La UI se construye combinando componentes. Los más básicos son View para contenedores y Text para cualquier texto.",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "RectangleGroupIcon",
					title: "SafeAreaView",
					text: "Esencial para asegurar que tu UI no se superponga con la barra de estado o las muescas del dispositivo.",
				},
				{
					icon: "CodeBracketIcon",
					title: "StyleSheet.create",
					text: "La forma recomendada de organizar y reutilizar estilos para un rendimiento óptimo.",
				},
				{
					icon: "ArrowRightIcon",
					title: "FlatList",
					text: "Componente de alto rendimiento para renderizar listas largas y dinámicas de datos.",
				},
			],
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/safe-area-view.png",
			caption:
				"Comparación visual: Sin `SafeAreaView` (izquierda) el contenido es obstruido por los elementos del sistema, mientras que con `SafeAreaView` (derecha) se ajusta perfectamente al área visible.",
		},

		{ type: "divider" },

		{ type: "subtitle", text: "Parte 5: Enrutamiento con Expo Router" },
		{
			type: "paragraph",
			text: "La navegación en tu app se define por la estructura de archivos dentro de la carpeta `app/`.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// app/_layout.tsx (Define la navegación principal)
import { Stack } from 'expo-router';
export default () => <Stack />;

// app/index.tsx -> Ruta '/'
import { Link } from 'expo-router';
import { Text, View } from 'react-native';
export default () => (
    <View>
    <Text>Home Screen</Text>
    <Link href="/about">Go to About</Link>
    </View>
);

// app/about.tsx -> Ruta '/about'
import { Text, View } from 'react-native';
export default () => <Text>About Screen</Text>;
                    `,
		},
		{
			type: "image",
			imageUrl:
				process.env.NODE_ENV === "production"
					? "https://kvskvfok8cknjmpl.public.blob.vercel-storage.com/stack-vs-tabs.webp"
					: "/conf1/stack-vs-tabs.webp",
			caption:
				"Patrones de navegación: Stack Navigator organiza las pantallas en una pila, mientras que Tabs Navigator ofrece una barra de pestañas para la navegación principal.",
		},

		{ type: "divider" },
	],
};
