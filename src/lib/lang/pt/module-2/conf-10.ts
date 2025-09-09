import type { CurriculumTopic } from "../../../../types/types";

export const conference10: CurriculumTopic = {
	id: "conf-10",
	title: "Conf. 10: Navegação por Abas (Tabs)",
	content: [
		{
			type: "heading",
			text: "Implementando Navegação por Abas com Tab Navigator",
		},
		{
			type: "paragraph",
			text: "A navegação por abas é um dos padrões mais comuns em aplicações móveis, permitindo ao utilizador alternar entre diferentes secções principais da app. Com o Expo Router, criar uma barra de abas (Tab Bar) é tão simples como estruturar os seus ficheiros de uma forma específica.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Estrutura de Ficheiros para Tabs" },
		{
			type: "paragraph",
			text: "Para criar um Tab Navigator, precisamos de organizar as nossas rotas dentro de um diretório de grupo. Um **grupo de rotas** é uma pasta cujo nome está entre parênteses, como `(tabs)`. Isto organiza os ficheiros sem afetar o URL final.",
		},
		{
			type: "paragraph",
			text: "Vamos reestruturar o nosso projeto. Crie uma pasta `app/(tabs)` e mova o seu ficheiro `index.tsx`. De seguida, crie uma nova tela `settings.tsx` dentro de `(tabs)`. Certifique-se de que `details.tsx` fica fora do grupo.",
		},
		{
			type: "list",
			items: [
				"**`app/(tabs)/index.tsx`**: Será a nossa primeira aba (Início).",
				"**`app/(tabs)/settings.tsx`**: Será a nossa segunda aba (Definições).",
				"**`app/details.tsx`**: Fica fora do grupo `(tabs)` para não aparecer na barra de abas.",
			],
		},
		{
			type: "paragraph",
			text: "A sua nova estrutura de ficheiros deve parecer-se com isto:",
		},
		{
			type: "code",
			language: "bash",
			code: `
app/
├── (tabs)/
│   ├── _layout.tsx      # Layout para o Tab Navigator
│   ├── index.tsx        # Tela da primeira aba (Home)
│   └── settings.tsx     # Tela da segunda aba (Settings)
├── _layout.tsx          # Layout Raiz (Stack Navigator)
└── details.tsx          # Tela de detalhes (acessível a partir de Home)
      `,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Configurando o Layout das Abas" },
		{
			type: "paragraph",
			text: "Agora, o ficheiro chave é `app/(tabs)/_layout.tsx`. Aqui definiremos o nosso Tab Navigator usando o componente `<Tabs>` do `expo-router`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}`,
		},
		{
			type: "paragraph",
			text: "Finalmente, devemos dizer ao nosso layout raiz (`app/_layout.tsx`) para renderizar este grupo de abas como uma única tela dentro do Stack.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="details" options={{ title: 'Detalhes' }} />
    </Stack>
  );
}`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Usamos `headerShown: false` na tela `(tabs)` para ocultar o cabeçalho do Stack e deixar que cada aba gira o seu próprio, se necessário. Isto evita um cabeçalho duplo.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Personalizando as Abas com Ícones e Títulos",
		},
		{
			type: "paragraph",
			text: "Uma barra de abas não está completa sem ícones. Podemos personalizar cada `Tabs.Screen` com a propriedade `options`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: 'blue', // Cor para a aba ativa
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Definições',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}`,
		},
		{
			type: "list",
			items: [
				"**`screenOptions`**: Aplica estilos a todas as abas, como `tabBarActiveTintColor`.",
				"**`options`**: Permite configurar cada aba individualmente.",
				"**`title`**: Define o texto que aparece na aba e no cabeçalho da tela.",
				"**`tabBarIcon`**: É uma função que recebe propriedades como `color`, `size` e `focused`, permitindo-lhe renderizar um ícone e alterar a sua aparência se a aba estiver ativa.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Interação entre Tabs e Stack" },
		{
			type: "paragraph",
			text: "Na nossa estrutura, o `TabNavigator` está aninhado dentro do `StackNavigator`. Isto significa que ao navegar de uma tela dentro das abas (como `index.tsx`) para uma tela fora do grupo de abas (como `details.tsx`), a nova tela será empilhada sobre a barra de abas, ocultando-a. Este é o comportamento desejado para telas de detalhe.",
		},
		{
			type: "callout",
			alertType: "info",
			text: "Se quisesse que uma tela fosse mostrada *dentro* do Tab Navigator (substituindo o conteúdo mas mantendo a barra de abas), deveria colocar o seu ficheiro dentro do diretório `(tabs)` e registá-lo no layout das abas (`app/(tabs)/_layout.tsx`).",
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Como se cria um grupo de rotas no Expo Router para organizar ficheiros sem afetar o URL?",
					options: [
						"Usando uma pasta com colchetes, ex. [tabs]",
						"Usando uma pasta com parênteses, ex. (tabs)",
						"Usando um ficheiro especial chamado _group.tsx",
						"Não é possível agrupar rotas.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Que componente do `expo-router` é utilizado para criar uma navegação por abas?",
					options: ["<Stack>", "<Navigator>", "<Tabs>", "<BottomBar>"],
					correctAnswer: 2,
				},
				{
					question:
						"Nas opções do `Tabs.Screen`, que propriedade é usada para definir o ícone da aba?",
					options: ["icon", "tabBarIcon", "renderIcon", "iconComponent"],
					correctAnswer: 1,
				},
				{
					question:
						"Se tiver um Stack Navigator raiz e um Tab Navigator aninhado, por que é comum usar `headerShown: false` na tela do grupo de abas?",
					options: [
						"Para melhorar o desempenho.",
						"Para evitar que seja mostrado um cabeçalho duplo (o do Stack e o da aba).",
						"Porque os Tab Navigators não suportam cabeçalhos.",
						"Para permitir gestos de deslize.",
					],
					correctAnswer: 1,
				},
			],
		},
	],
};
