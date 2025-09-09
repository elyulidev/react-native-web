import type { CurriculumTopic } from "../../../../types/types";

export const conference7: CurriculumTopic = {
	id: "conf-7",
	title: "Conf. 7: Gerenciamento de Ativos",
	content: [
		{
			type: "heading",
			text: "Gerenciamento de Ativos: Imagens, Fontes e Ícones",
		},
		{
			type: "paragraph",
			text: "Bem-vindos a uma sessão essencial para o desenvolvimento de interfaces de usuário no React Native! Hoje vamos focar no gerenciamento de ativos, cobrindo como trabalhar com imagens, configurar fontes tipográficas personalizadas e integrar bibliotecas de ícones. Um bom gerenciamento desses recursos não só melhora a estética da nossa aplicação, mas também seu desempenho e manutenibilidade.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "1. Uso Eficiente de Imagens Locais Através do require()",
		},
		{
			type: "paragraph",
			text: "As imagens são um componente fundamental em quase qualquer aplicação. No React Native, temos várias formas de exibi-las, mas é crucial entender a diferença entre imagens locais e remotas, e quando usar cada uma.",
		},
		{
			type: "list",
			items: [
				{
					text: "**Componentes de Imagem:** O React Native fornece o componente `Image` para exibir diferentes tipos de imagens (rede, estáticos, locais). Para maior otimização, recomenda-se o componente `Image` de `expo-image`, que oferece políticas de cache e `contentFit`. Para SVGs, é necessário um pacote de terceiros como `react-native-svg`.",
				},
				{
					text: "**ImageBackground:** Permite usar imagens como fundo, sobrepondo outros componentes.",
				},
			],
		},
		{ type: "paragraph", text: "**Imagens Locais com `require()`:**" },
		{
			type: "list",
			items: [
				"Para carregar imagens do armazenamento local do seu projeto, utiliza-se a função `require()` dentro da prop `source` do componente `Image`.",
				"O caminho para a imagem deve ser relativo ao arquivo onde `require()` é usado.",
				"**Importante:** É crucial especificar as dimensões (`width` e `height`) para as imagens, pois por padrão elas não são exibidas se não forem definidas.",
			],
		},
		{
			type: "code",
			language: "jsx",
			code: `import { Image, View, StyleSheet } from 'react-native';\n\nconst Logo = () => (\n  <Image \n    source={require('../assets/images/logo.png')} \n    style={{ width: 100, height: 100 }}\n  />\n);`,
		},

		{ type: "paragraph", text: "**Imagens Remotas com URI:**" },
		{
			type: "list",
			items: [
				"Para imagens hospedadas numa URL, passa-se um objeto com uma propriedade `uri` para a prop `source`.",
				"Assim como com as imagens locais, é necessário especificar as dimensões.",
			],
		},
		{
			type: "code",
			language: "jsx",
			code: `import { Image, View, StyleSheet } from 'react-native';\n\nconst RemoteImage = () => (\n  <Image \n    source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} \n    style={{ width: 50, height: 50 }}\n  />\n);`,
		},

		{
			type: "paragraph",
			text: "**Configuração de `images.d.ts` para TypeScript:**",
		},
		{
			type: "paragraph",
			text: "Se você utiliza TypeScript, é comum que o IDE reclame da falta de declarações de tipo para os arquivos de imagem. Para solucionar isso, crie um arquivo `images.d.ts` na raiz do seu projeto e declare os módulos:",
		},
		{
			type: "code",
			language: "typescript",
			code: `// images.d.ts\ndeclare module '*.png';\ndeclare module '*.jpg';\ndeclare module '*.jpeg';`,
		},

		{ type: "paragraph", text: "**Organização de Ativos:**" },
		{
			type: "paragraph",
			text: "É uma boa prática organizar suas imagens numa pasta `assets/images`. Você também pode centralizar a importação e exportação de imagens de um único arquivo (ex. `constants/images.ts`) para facilitar seu uso em toda a aplicação.",
		},

		{ type: "divider" },

		{
			type: "subtitle",
			text: "2. Configuração e Aplicação de Fontes Personalizadas",
		},
		{
			type: "paragraph",
			text: "Usar fontes personalizadas é fundamental para a identidade visual de uma aplicação. O Expo facilita enormemente este processo com o pacote `expo-font`.",
		},
		{
			type: "list",
			items: [
				"**1. Organizar as Fontes:** Salve os arquivos das fontes (`.ttf`, `.otf`) numa pasta dedicada, como `assets/fonts/`.",
				"**2. Carregar as Fontes com `useFonts`:** O hook `useFonts` de `expo-font` é a forma recomendada para carregar fontes de forma assíncrona. Isso geralmente é feito no arquivo de layout principal (`app/_layout.tsx`).",
				"**3. Controlar a Tela de Abertura:** É importante usar `SplashScreen.preventAutoHideAsync()` no início e `SplashScreen.hideAsync()` assim que as fontes forem carregadas para uma experiência de usuário fluida.",
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
  // ... resto do layout
}`,
		},
		{
			type: "list",
			items: [
				"**4. Estender o Tema do Tailwind CSS:** Para que o Tailwind reconheça e permita usar suas fontes personalizadas através de classes, você deve estender a propriedade `fontFamily` no `tailwind.config.js`.",
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
				'**5. Aplicar as Fontes:** Uma vez configuradas no Tailwind, você pode aplicar as fontes aos seus componentes usando as classes CSS correspondentes, por exemplo: `<Text className="font-q-bold">Meu Texto</Text>`.',
			],
		},

		{ type: "divider" },

		{ type: "subtitle", text: "3. Integração de Bibliotecas de Ícones" },
		{
			type: "paragraph",
			text: "Os ícones são elementos essenciais para a navegação e a comunicação visual. A `expo/vector-icons` é uma coleção muito completa que facilita a inclusão de milhares de ícones.",
		},
		{
			type: "list",
			items: [
				"**Expo Vector Icons:** Esta biblioteca é uma coleção de diferentes conjuntos de ícones, como `Ionicons`, `Feather`, `MaterialIcons`, `AntDesign`, etc. Para usá-los, primeiro você precisa importar o conjunto específico que deseja de `@expo/vector-icons`.",
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
				"**Ícones na Barra de Navegação:** No Expo Router, você pode definir ícones personalizados para cada aba na barra de navegação utilizando a prop `tabBarIcon` dentro de `Tabs.Screen.options`. Esta prop recebe uma função de callback que fornece `color`, `size` e o estado `focused`, permitindo alterar o estilo do ícone dinamicamente.",
				"**Ícones Personalizados a partir de Ativos:** Além das bibliotecas de ícones, você pode usar seus próprios arquivos de imagem (PNG, etc.) como ícones, importando-os da sua pasta `assets/icons` utilizando `require()`.",
				"**Ícone da App e Tela de Abertura (`app.json`):** O arquivo `app.json` é o centro de configuração. Aqui você pode definir o caminho para o ícone da sua aplicação (propriedade `icon`) e da tela de abertura (propriedade `splash.image`).",
			],
		},

		{ type: "divider" },

		{ type: "subtitle", text: "4. Prática: Melhorar a Barra de Navegação" },
		{
			type: "paragraph",
			text: "Para consolidar o que foi aprendido, vamos mejorar a barra de navegação inferior (Tab Bar) da nossa aplicação, usando ícones do Expo Vector Icons e aplicando uma fonte personalizada.",
		},
		{
			type: "list",
			items: [
				"**1. Preparação:** Certifique-se de que tem uma fonte personalizada em `assets/fonts/` e que está carregada no `app/_layout.tsx` (como mostrado anteriormente).",
				"**2. Estender o Tailwind:** Adicione a fonte personalizada ao `tailwind.config.js` e reinicie o servidor (`npx expo start --clear`).",
				"**3. Refatorar `app/(tabs)/_layout.tsx`:** Abra o layout das suas abas. Use a prop `tabBarIcon` para definir os ícones de cada aba e um componente personalizado para o texto e o ícone.",
			],
		},
		{
			type: "code",
			language: "jsx",
			code: `// app/(tabs)/_layout.tsx (Exemplo para a aba 'Home')
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

// ... no componente de Layout
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
			text: "**Resultado Esperado:** Ao executar a aplicação, você deverá ver os ícones personalizados na barra de navegação inferior, que mudam de estilo quando estão ativos, e o texto deverá usar a fonte personalizada que você configurou.",
		},
		{ type: "divider" },
		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Qual é a forma correta de incluir uma imagem local num componente React Native?",
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
						"Que hook do `expo-font` é recomendado para carregar fontes personalizadas na sua aplicação?",
					options: ["loadAsync", "useFonts", "useEffect", "Font.loadAsync"],
					correctAnswer: 1,
				},
				{
					question:
						"Para usar ícones do conjunto Ionicons no seu componente, qual é a declaração de importação correta?",
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
						"Se utilizar TypeScript e importar um ficheiro PNG, o que deve fazer para evitar erros de tipo?",
					options: [
						"Ignorar o erro, é apenas um aviso.",
						"Criar um ficheiro `images.d.ts` e declarar o módulo `*.png`.",
						"Fazer um cast da declaração require para `any`.",
						"Instalar `@types/images`.",
					],
					correctAnswer: 1,
				},
			],
		},
	],
};
