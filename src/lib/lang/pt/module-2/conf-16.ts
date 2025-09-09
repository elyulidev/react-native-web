import type { CurriculumTopic } from "../../../../types/types";

export const conference16: CurriculumTopic = {
	id: "conf-16",
	title: "Conf. 16: Mini Projeto de Navegação",
	content: [
		{
			type: "heading",
			text: "Mini Projeto: App de Blog com Navegação Completa",
		},
		{
			type: "paragraph",
			text: "É hora de consolidar tudo o que aprendemos no Módulo 2! Neste projeto, construiremos uma aplicação de blog simples, mas completa. Integraremos um Stack Navigator, um Tab Navigator, rotas dinâmicas para os artigos e uma estrutura de ficheiros lógica usando grupos de rotas.",
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/blog-app-nav-structure.png",
			caption: "Estrutura de navegação da nossa aplicação de blog.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Passo 1: Estrutura de Ficheiros do Projeto" },
		{
			type: "paragraph",
			text: "Uma boa estrutura de ficheiros é fundamental. Vamos organizar as nossas rotas da seguinte forma dentro da pasta `app`:",
		},
		{
			type: "code",
			language: "bash",
			code: `
app/
├── (tabs)/
│   ├── _layout.tsx      # Define o Tab Navigator
│   ├── index.tsx        # Tela de lista de artigos (Aba 1)
│   └── about.tsx        # Tela "Sobre" (Aba 2)
├── posts/
│   └── [id].tsx         # Tela dinâmica para detalhes de um artigo
└── _layout.tsx          # Define o Stack Navigator raiz
      `,
		},
		{
			type: "list",
			items: [
				"**`_layout.tsx` (raiz):** O nosso navegador principal será um Stack que irá gerir as abas e as telas de detalhe.",
				"**`(tabs)`:** Um grupo de rotas para as telas que terão a barra de abas inferior.",
				'**`(tabs)/_layout.tsx`:** Configura o Tab Navigator com as abas "Artigos" e "Sobre".',
				"**`posts/[id].tsx`:** Uma rota dinâmica. O ficheiro `[id].tsx` atuará como um modelo para exibir qualquer artigo com base no seu ID.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Passo 2: Configurar o Stack Navigator Raiz" },
		{
			type: "paragraph",
			text: "Vamos modificar o `app/_layout.tsx` para definir o nosso Stack principal. Ele irá gerir o grupo de abas e a tela de detalhes dos posts.",
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
      <Stack.Screen name="posts/[id]" options={{ title: 'Detalhe do Artigo' }} />
    </Stack>
  );
}`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "Ocultamos o cabeçalho para `(tabs)` para que o Tab Navigator possa gerir os seus próprios cabeçalhos, evitando uma barra de título dupla.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Passo 3: Configurar o Tab Navigator" },
		{
			type: "paragraph",
			text: "Agora, vamos configurar as abas em `app/(tabs)/_layout.tsx`.",
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
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Artigos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Passo 4: Criar a Lista de Artigos" },
		{
			type: "paragraph",
			text: "A tela `index` nas nossas abas irá exibir a lista de artigos. Usaremos `FlatList` e `<Link>` para navegar para os detalhes. Para manter as coisas simples, os dados estarão diretamente no ficheiro.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/(tabs)/index.tsx
import { View, Text, FlatList, Pressable } from 'react-native';
import { Link } from 'expo-router';

const POSTS = [
  { id: 1, title: 'Introdução ao React Native', content: 'O React Native permite construir apps móveis com JavaScript e React...' },
  { id: 2, title: 'Estilizando com NativeWind', content: 'O NativeWind traz o poder do Tailwind CSS para o React Native para uma estilização rápida...' },
  { id: 3, title: 'Navegação com Expo Router', content: 'O Expo Router simplifica a navegação com o seu inovador sistema baseado em ficheiros...' },
];

export default function ArticlesScreen() {
  return (
    <View className="flex-1 p-4 bg-gray-100">
      <FlatList
        data={POSTS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={\`/posts/\${item.id}\`} asChild>
            <Pressable className="p-4 mb-4 bg-white rounded-lg shadow-md active:bg-gray-200">
              <Text className="text-xl font-bold text-slate-800">{item.title}</Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "O prop `asChild` no componente `<Link>` permite-lhe passar as suas propriedades de navegação para o primeiro componente filho (`Pressable`), tornando toda a área clicável.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: 'Passo 5: Criar a Tela "Sobre"' },
		{
			type: "paragraph",
			text: "Esta será uma tela estática simples em `app/(tabs)/about.tsx`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/(tabs)/about.tsx
import { View, Text } from 'react-native';

export default function AboutScreen() {
  return (
    <View className="flex-1 justify-center items-center p-4 bg-gray-100">
      <Text className="text-2xl font-bold text-slate-800">Minha App de Blog</Text>
      <Text className="text-lg text-center mt-2 text-slate-600">
        Este é um mini projeto para demonstrar a navegação com o Expo Router.
      </Text>
    </View>
  );
}`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Passo 6: Criar a Tela de Detalhes Dinâmica" },
		{
			type: "paragraph",
			text: "Finalmente, a tela `app/posts/[id].tsx`. Usaremos `useLocalSearchParams` para obter o ID do URL e exibir o artigo correto.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/posts/[id].tsx
import { View, Text } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';

// Replicamos os mesmos dados para os podermos encontrar
const POSTS = [
  { id: 1, title: 'Introdução ao React Native', content: 'O React Native permite construir apps móveis com JavaScript e React, partilhando código entre iOS, Android e a web.' },
  { id: 2, title: 'Estilizando com NativeWind', content: 'O NativeWind traz o poder do Tailwind CSS para o React Native para uma estilização rápida, consistente e de fácil manutenção, usando classes de utilidade.' },
  { id: 3, title: 'Navegação com Expo Router', content: 'O Expo Router simplifica a navegação com o seu inovador sistema baseado em ficheiros, onde a estrutura do diretório app define as rotas da aplicação.' },
];

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams();
  const post = POSTS.find(p => p.id.toString() === id);

  if (!post) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-red-500">Artigo não encontrado</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-6 bg-white">
      <Stack.Screen options={{ title: post.title }} />
      <Text className="text-3xl font-extrabold mb-4 text-slate-900">{post.title}</Text>
      <Text className="text-base leading-7 text-slate-700">{post.content}</Text>
    </View>
  );
}`,
		},
		{
			type: "list",
			items: [
				"**`useLocalSearchParams`**: Extrai o `id` do URL.",
				"**`.find()`**: Procuramos o post correspondente nos nossos dados de exemplo.",
				"**`<Stack.Screen options>`**: Usamos isto dentro do componente para definir dinamicamente o título do cabeçalho com o título do post.",
			],
		},
		{ type: "divider" },

		{ type: "heading", text: "Parabéns!" },
		{
			type: "paragraph",
			text: "Você construiu com sucesso uma aplicação com uma estrutura de navegação completa. Combinou um Stack Navigator com um Tab Navigator, usou grupos de rotas para organizar o seu código, criou rotas dinâmicas e passou dados entre telas. Este é o fundamento de quase qualquer aplicação móvel complexa!",
		},
	],
};
