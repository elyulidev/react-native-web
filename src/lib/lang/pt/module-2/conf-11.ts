import type { CurriculumTopic } from "../../../../types/types";

export const conference11: CurriculumTopic = {
	id: "conf-11",
	title: "Conf. 11: Rotas Aninhadas e Dinâmicas",
	content: [
		{ type: "heading", text: "Gestão de Rotas Aninhadas e Dinâmicas" },
		{
			type: "paragraph",
			text: "As aplicações reais muitas vezes precisam de exibir conteúdo com base num parâmetro, como o ID de um produto ou o nome de utilizador de um perfil. O Expo Router lida com isto de forma elegante através de rotas dinâmicas, que nos permitem criar modelos de tela para uma quantidade infinita de itens.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. O que são Rotas Dinâmicas?" },
		{
			type: "paragraph",
			text: "Uma rota dinâmica é uma rota que corresponde a múltiplos URLs com base num segmento variável. No Expo Router, isto é alcançado nomeando um ficheiro ou diretório com parênteses retos.",
		},
		{
			type: "list",
			items: [
				"**`app/users/[id].tsx`**: Corresponderá a `/users/1`, `/users/123`, `/users/abc`, etc.",
				"**`app/posts/[slug].tsx`**: Corresponderá a `/posts/meu-primeiro-post`, `/posts/novidades-2024`, etc.",
			],
		},
		{
			type: "paragraph",
			text: "O valor do segmento dinâmico (o `id` ou o `slug`) estará disponível dentro do componente da tela para que possamos carregar os dados correspondentes.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "2. Criando uma Rota Dinâmica para Perfis de Utilizador",
		},
		{
			type: "paragraph",
			text: "Vamos criar um exemplo. Imagine que temos uma lista de utilizadores e queremos navegar para o perfil de cada um. Primeiro, vamos criar a tela de perfil dinâmico em `app/profile/[id].tsx`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/profile/[id].tsx
import { View, Text } from 'react-native';

export default function UserProfile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Perfil de Utilizador</Text>
      {/* Aqui mostraremos o ID do utilizador */}
    </View>
  );
}`,
		},
		{
			type: "paragraph",
			text: "De seguida, devemos registar esta nova rota no nosso layout raiz (`app/_layout.tsx`). Note que usamos o nome do ficheiro com parênteses retos.",
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
      <Stack.Screen
        name="profile/[id]"
        options={{ title: 'Perfil de Utilizador' }}
      />
    </Stack>
  );
}`,
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Extraindo Parâmetros com `useLocalSearchParams`",
		},
		{
			type: "paragraph",
			text: "Dentro do nosso componente de tela `UserProfile`, precisamos de uma forma de aceder ao valor do `id` do URL. Para isso, usamos o hook `useLocalSearchParams` do `expo-router`.",
		},
		{
			type: "paragraph",
			text: "Este hook devolve um objeto onde as chaves são os nomes dos segmentos dinâmicos da rota (neste caso, `id`).",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/profile/[id].tsx
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function UserProfile() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Perfil do Utilizador</Text>
      <Text style={{ fontSize: 20, marginTop: 10 }}>ID: {id}</Text>
    </View>
  );
}`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Navegando para Rotas Dinâmicas" },
		{
			type: "paragraph",
			text: "Para navegar para a nossa nova tela de perfil, simplesmente usamos o componente `<Link>` como antes, mas substituímos o segmento dinâmico pelo valor real.",
		},
		{
			type: "paragraph",
			text: "Vamos modificar a nossa tela inicial (`app/(tabs)/index.tsx`) para incluir links para alguns perfis de utilizador de exemplo:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/(tabs)/index.tsx
import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 15 }}>
      <Text>Tela Inicial</Text>

      <Link href="/profile/1" style={{ color: 'blue', fontSize: 18 }}>
        Ver Perfil de Utilizador 1
      </Link>

      <Link href="/profile/25" style={{ color: 'blue', fontSize: 18 }}>
        Ver Perfil de Utilizador 25
      </Link>
    </View>
  );
}`,
		},
		{
			type: "paragraph",
			text: "Ao clicar nestes links, será levado para a tela `UserProfile`, e o hook `useLocalSearchParams` extrairá `1` ou `25` do URL, permitindo-lhe exibi-lo na tela. Numa aplicação real, usaria este ID para fazer uma chamada a uma API e obter os dados completos do utilizador.",
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Que convenção de nomenclatura de ficheiros é usada para criar uma rota dinâmica para posts de um blog?",
					options: [
						"app/posts/(slug).tsx",
						"app/posts/[slug].tsx",
						"app/posts/{slug}.tsx",
						"app/posts/dynamic.tsx",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Que hook do `expo-router` é utilizado para aceder aos parâmetros de uma rota dinâmica?",
					options: [
						"useParams()",
						"useRoute()",
						"useLocalSearchParams()",
						"useDynamicRoute()",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Se a sua rota for `app/products/[id].tsx` e navegar para `/products/123`, o que devolverá `useLocalSearchParams()`?",
					options: [
						"`{ id: '123' }`",
						"`'123'`",
						"`['123']`",
						"`{ products: '123' }`",
					],
					correctAnswer: 0,
				},
				{
					question:
						"Como se navega para a rota dinâmica de um utilizador com o id 'ana'?",
					options: [
						"<Link href='/user?id=ana'>",
						"<Link href='/user/[id]' params={{ id: 'ana' }}>",
						"<Link href='/user' id='ana'>",
						"<Link href='/user/ana'>",
					],
					correctAnswer: 3,
				},
			],
		},
	],
};
