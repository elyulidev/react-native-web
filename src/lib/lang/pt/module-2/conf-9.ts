import type { CurriculumTopic } from "../../../../types/types";

export const conference9: CurriculumTopic = {
	id: "conf-9",
	title: "Conf. 9: Expo Router e Navegação Stack",
	content: [
		{ type: "heading", text: "Introdução à Navegação com Expo Router" },
		{
			type: "paragraph",
			text: "O Expo Router é um sistema de roteamento baseado em arquivos para aplicações React Native e web. Ele utiliza a estrutura de diretórios do seu projeto para definir a navegação, o que simplifica enormemente a gestão de rotas. É construído sobre o React Navigation, herdando assim a sua potência e desempenho nativo.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. O Diretório `app` e a Criação de Rotas" },
		{
			type: "paragraph",
			text: "O coração do Expo Router é o diretório `app`. Cada arquivo que você cria dentro de `app` torna-se automaticamente uma rota na sua aplicação.",
		},
		{
			type: "list",
			items: [
				"Um arquivo chamado `index.tsx` mapeia para a rota raiz do diretório que o contém.",
				"Por exemplo, `app/index.tsx` corresponde à rota `/`.",
			],
		},
		{
			type: "paragraph",
			text: "Vamos começar por criar a nossa primeira tela. Se seguiu a conferência de configuração, já deverá ter um arquivo `app/index.tsx`. Certifique-se de que tem um conteúdo simples:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tela Inicial</Text>
    </View>
  );
}`,
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "2. O Arquivo `_layout.tsx` e o Stack Navigator",
		},
		{
			type: "paragraph",
			text: "Um arquivo `_layout.tsx` define a estrutura de navegação para um diretório. O layout raiz, `app/_layout.tsx`, é o componente principal da sua aplicação e é perfeito para configurar o navegador principal, como um Stack Navigator.",
		},
		{
			type: "paragraph",
			text: "Um **Stack Navigator** (Navegador de Pilha) gere as telas numa pilha, como um baralho de cartas. Quando navega para uma nova tela, ela é colocada no topo da pilha. Ao voltar atrás, ela é removida da pilha.",
		},
		{
			type: "paragraph",
			text: "Vamos modificar o `app/_layout.tsx` para definir um Stack que controle as nossas telas:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "A propriedade `name` em `<Stack.Screen>` refere-se ao nome do arquivo da rota (sem a extensão). Por exemplo, `index` para `index.tsx`.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Criando uma Segunda Rota e Navegando" },
		{
			type: "paragraph",
			text: "Vamos criar uma nova tela. Crie um arquivo chamado `app/details.tsx`. Isto criará automaticamente a rota `/details`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/details.tsx
import { View, Text } from 'react-native';

export default function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tela de Detalhes</Text>
    </View>
  );
}`,
		},
		{
			type: "paragraph",
			text: "Agora, debemos registar esta nova tela no nosso Stack Navigator dentro de `app/_layout.tsx`:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="details" />
    </Stack>
  );
}`,
		},
		{
			type: "paragraph",
			text: "Para navegar entre telas, usamos o componente `<Link>` do `expo-router`. É o equivalente à tag `<a>` na web. Vamos modificar o `app/index.tsx` para adicionar um link para a tela de detalhes.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
      <Text>Tela Inicial</Text>
      <Link href="/details" style={{ color: 'blue' }}>
        Ir para Detalhes
      </Link>
    </View>
  );
}`,
		},
		{
			type: "paragraph",
			text: "Agora deverá ser capaz de navegar da tela inicial para a de detalhes e voltar atrás usando o botão de retrocesso do cabeçalho que o Stack Navigator fornece por padrão!",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Configuração de Opções de Tela" },
		{
			type: "paragraph",
			text: "Podemos personalizar a aparência de cada tela no Stack, como o título do cabeçalho. Isto é feito através da propriedade `options` em `Stack.Screen`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Início'
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: 'Detalhes da App',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
        }}
      />
    </Stack>
  );
}`,
		},
		{
			type: "paragraph",
			text: "Também podemos aplicar opções a todo o Stack de uma só vez usando a prop `screenOptions` no componente `<Stack>`.",
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question: "Que ficheiro define a rota raiz `/` no Expo Router?",
					options: [
						"app/_layout.tsx",
						"app/root.tsx",
						"app/index.tsx",
						"app/home.tsx",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Para que é utilizado principalmente o ficheiro `_layout.tsx`?",
					options: [
						"Para definir estilos globais.",
						"Para declarar variáveis de estado globais.",
						"Para configurar a estrutura de navegação de um diretório (como um Stack ou Tabs).",
						"Para exportar componentes reutilizáveis.",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Que componente é usado para navegar programaticamente entre rotas no Expo Router?",
					options: ["<Button>", "<Navigate>", "<a href...>", "<Link>"],
					correctAnswer: 3,
				},
				{
					question:
						"Em `<Stack.Screen name='profile' />`, a que ficheiro de rota se refere `name='profile'`?",
					options: [
						"app/profile/index.tsx",
						"app/Profile.tsx",
						"app/profile.tsx",
						"app/(tabs)/profile.js",
					],
					correctAnswer: 2,
				},
			],
		},
	],
};
