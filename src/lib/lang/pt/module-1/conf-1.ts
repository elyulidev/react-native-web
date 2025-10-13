import type { CurriculumTopic } from "../../../../types/types";

export const conference1: CurriculumTopic = {
	id: "conf-1",
	title: "Conf. 1: Introdução a RN e Expo",
	content: [
		{ type: "heading", text: "Introdução ao React Native e Expo" },
		{
			type: "paragraph",
			text: "Uma compreensão sólida de React Native e Expo, cobrindo seus fundamentos, configuração do ambiente, componentes básicos de UI e os conceitos essenciais de roteamento.",
		},

		{ type: "divider" },

		{ type: "subtitle", text: "Parte 1: Descobrindo o React Native" },
		{
			type: "paragraph",
			text: "React Native é um framework que permite construir aplicações móveis nativas para iOS e Android a partir de uma única base de código usando React.",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "CodeBracketIcon",
					title: "Código Único",
					text: "Escreva o código uma vez e implemente-o em iOS и Android, economizando tempo e recursos.",
				},
				{
					icon: "UsersIcon",
					title: "Grande Adoção",
					text: "Utilizado por gigantes como Meta, Microsoft, Tesla e Airbnb.",
				},
				{
					icon: "BoltIcon",
					title: "Alto Desempenho",
					text: "A nova arquitetura (JSI, Turbo Modules, Fabric) oferece um desempenho próximo ao nativo.",
				},
			],
		},

		{
			type: "callout",
			alertType: "info",
			text: "Aproximadamente 75% do conhecimento de React para desenvolvimento web é transferido diretamente para o móvel.",
		},

		{ type: "subtitle", text: "React Native vs. React Web" },
		{
			type: "image",
			imageUrl:
				process.env.NODE_ENV === "production"
					? "https://kvskvfok8cknjmpl.public.blob.vercel-storage.com/react-native-vs-react-web.webp"
					: "/conf1/react-native-vs-react-web.webp",
			caption:
				"Visualização conceitual das diferenças de componentes entre React Web e React Native.",
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
					title: "Estilos e Eventos",
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

		{ type: "subtitle", text: "Parte 2: Introdução ao Expo" },
		{
			type: "paragraph",
			text: "Expo é um framework e ecossistema de ferramentas para React Native que simplifica enormemente o desenvolvimento, a revisão e a implantação.",
		},
		{
			type: "image",
			imageUrl:
				process.env.NODE_ENV === "production"
					? "https://kvskvfok8cknjmpl.public.blob.vercel-storage.com/expo-ecosystem.webp"
					: "/conf1/expo-ecosystem.webp",
			caption:
				"O ecossistema Expo: um conjunto de ferramentas sobre React Native para agilizar o desenvolvimento.",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "AcademicCapIcon",
					title: "Recomendado Oficialmente",
					text: "A documentação do React Native recomenda o Expo como a melhor maneira de começar.",
				},
				{
					icon: "BoltIcon",
					title: "Configuração Simples",
					text: "Você não precisa instalar o Android Studio ou o Xcode para começar a desenvolver.",
				},
				{
					icon: "DevicePhoneMobileIcon",
					title: "Expo Go",
					text: "Um aplicativo para testar seus desenvolvimentos в tempo real no seu dispositivo físico.",
				},
				{
					icon: "FolderIcon",
					title: "Expo Router",
					text: "Sistema de roteamento baseado em arquivos, semelhante ao Next.js.",
				},
			],
		},

		{ type: "divider" },

		{ type: "subtitle", text: "Parte 3: Configuração e Estrutura" },
		{
			type: "paragraph",
			text: "Começar um novo projeto é tão simples quanto executar um único comando no seu terminal.",
		},
		{ type: "code", language: "bash", code: "npx create-expo-app my-app" },
		{
			type: "paragraph",
			text: "Em seguida, inicie-o e escaneie o QR com o aplicativo Expo Go no seu telefone.",
		},
		{ type: "code", language: "bash", code: "cd my-app\nnpx expo start" },
		{
			type: "image",
			imageUrl:
				process.env.NODE_ENV === "production"
					? "https://kvskvfok8cknjmpl.public.blob.vercel-storage.com/expo-go-scan.webp"
					: "/conf1/expo-go-scan.webp",
			caption:
				"Fluxo de desenvolvimento com o Expo Go: codifique, escaneie o QR e visualize seu aplicativo instantaneamente no seu dispositivo.",
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Importante: Seu computador e seu dispositivo móvel devem estar conectados à mesma rede Wi-Fi.",
		},

		{ type: "divider" },

		{ type: "subtitle", text: "Parte 4: Componentes Core e Estilos" },
		{
			type: "paragraph",
			text: "A UI é construída combinando componentes. Os mais básicos são View para contêineres e Text para qualquer texto.",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "RectangleGroupIcon",
					title: "SafeAreaView",
					text: "Essencial para garantir que sua UI não se sobreponha à barra de status ou aos entalhes do dispositivo.",
				},
				{
					icon: "CodeBracketIcon",
					title: "StyleSheet.create",
					text: "A maneira recomendada de organizar e reutilizar estilos para um desempenho ideal.",
				},
				{
					icon: "ArrowRightIcon",
					title: "FlatList",
					text: "Componente de alto desempenho para renderizar listas longas e dinâmicas de dados.",
				},
			],
		},
		{
			type: "image",
			imageUrl:
				process.env.NODE_ENV === "production"
					? "https://kvskvfok8cknjmpl.public.blob.vercel-storage.com/comparative_SafeAreaView.webp"
					: "/conf1/comparative_SafeAreaView.webp",

			caption:
				"Comparação visual: Sem `SafeAreaView` (esquerda) o conteúdo é obstruído pelos elementos do sistema, enquanto com `SafeAreaView` (direita) se ajusta perfeitamente à área visível.",
		},

		{ type: "divider" },

		{ type: "subtitle", text: "Parte 5: Roteamento com Expo Router" },
		{
			type: "paragraph",
			text: "A navegação em seu aplicativo é definida pela estrutura de arquivos dentro da pasta `app/`.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// app/_layout.tsx (Define a navegação principal)
import { Stack } from 'expo-router';
export default () => <Stack />;

// app/index.tsx -> Rota '/'
import { Link } from 'expo-router';
import { Text, View } from 'react-native';
export default () => (
  <View>
    <Text>Home Screen</Text>
    <Link href="/about">Go to About</Link>
  </View>
);

// app/about.tsx -> Rota '/about'
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
				"Padrões de navegação: Stack Navigator organiza as telas em uma pilha, enquanto Tabs Navigator oferece uma barra de abas para a navegação principal.",
		},

		{ type: "divider" },
	],
};
