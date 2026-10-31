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
			type: "callout",
			alertType: "info",
			text: "Basta mover os ficheiros: qualquer rota dentro de `(tabs)` torna-se uma aba automaticamente, sem a declarar no `_layout.tsx`. Além disso, os parênteses do nome do grupo fazem com que `(tabs)` desapareça do URL final (`/settings`, nunca `/(tabs)/settings`).",
		},
		{
			type: "fileStructure",
			files: [
				{
					id: "root-layout",
					name: "app/_layout.tsx",
					description: [
						"Layout raiz com o Stack Navigator da aplicação.",
						"Envolve as telas fora do grupo (como `details.tsx`) e, como mais uma tela, o grupo `(tabs)`.",
					],
				},
				{
					id: "tabs-layout",
					name: "app/(tabs)/_layout.tsx",
					description: [
						"Define o Tab Navigator que envolve as rotas do grupo.",
						"É aqui que se personalizam ícones, títulos e cores da barra.",
					],
				},
				{
					id: "tabs-index",
					name: "app/(tabs)/index.tsx",
					description: [
						"A primeira aba (Início), a rota raiz `/`.",
					],
				},
				{
					id: "tabs-settings",
					name: "app/(tabs)/settings.tsx",
					description: [
						"A segunda aba (Definições), a rota `/settings`.",
					],
				},
				{
					id: "details",
					name: "app/details.tsx",
					description: [
						"Fora do grupo: ao navegar para ela, empilha-se sobre a barra de abas e oculta-a.",
					],
				},
			],
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
			text: "E o layout raiz? Não é preciso «registar» nada: como todos os ficheiros vivem dentro de `app/`, o Expo Router já monta o grupo `(tabs)` automaticamente sobre o Stack. A única razão para adicionar `<Stack.Screen name='(tabs)'>` é **configurá-lo**, por exemplo para ocultar o seu cabeçalho:",
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
			alertType: "warning",
			text: "Erro comum: pensar que `<Stack.Screen name='(tabs)'>` é necessário para que o grupo exista. O layout raiz já renderiza `(tabs)` por fazer parte de `app/`; a entrada serve apenas para passar-lhe opções — como `headerShown: false`, que oculta o cabeçalho do Stack e evita um cabeçalho duplo.",
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
import { Ionicons } from '@react-native-vector-icons/ionicons';

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
			text: "Se quisesse que uma tela fosse mostrada *dentro* do Tab Navigator (substituindo o conteúdo mas mantendo a barra de abas), basta mover o seu ficheiro para dentro de `(tabs)`: ao criar o ficheiro, o grupo monta-o automaticamente como uma aba a mais.",
		},
		{
			type: "twoColumn",
			columns: [
				{
					title: "Ficheiro fora de `(tabs)`",
					content: [
						"Como `app/details.tsx`: pertence ao Stack raiz.",
						"Ao navegar, a tela empilha-se sobre as abas e oculta-as.",
						"**Ideal para:** telas de detalhe e fluxos temporais.",
					],
				},
				{
					title: "Ficheiro dentro de `(tabs)`",
					content: [
						"Como `app/settings.tsx`: pertence ao grupo de abas.",
						"Ao criar o ficheiro, torna-se mais uma aba, sem configuração.",
						"**Ideal para:** secções principais da app.",
					],
				},
			],
		},
		{
			type: "paragraph",
			text: "Vejamos a interação completa num exemplo interativo. As abas `index` e `settings` vivem dentro de `(tabs)`, e `details.tsx` está fora, no Stack raiz: ao fazer `push`, abre-se por cima das abas (cobre a barra inferior) e com `back` regressa à aba de onde saiu. A receita de navegação: `router.push()` para empilhar um detalhe, `router.navigate()` para saltar de aba, `router.back()` para remover e `router.dismissAll()` para esvaziar a pilha até às abas.",
		},
		{
			type: "codeTabs",
			codeTabs: [
				{
					name: "app/_layout.tsx",
					language: "tsx",
					code: `
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: 'center' }}>
      {/* O grupo (tabs) traz a sua própria barra; ocultamos o header do Stack */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="details" options={{ title: 'Detalhes' }} />
    </Stack>
  );
}`,
				},
				{
					name: "app/(tabs)/_layout.tsx",
					language: "tsx",
					code: `
import { Tabs } from 'expo-router';
import { Ionicons } from '@react-native-vector-icons/ionicons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerTitleAlign: 'center' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Definições',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}`,
				},
				{
					name: "app/(tabs)/index.tsx",
					language: "tsx",
					code: `
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Inicio() {
  const router = useRouter();

  return (
    <View style={styles.contenedor}>
      <Text style={styles.ruta}>app/(tabs)/index.tsx</Text>

      {/* push: abre details por cima das abas */}
      <Pressable style={styles.boton} onPress={() => router.push('/details')}>
        <Text>push Detalhes</Text>
      </Pressable>

      {/* navigate: muda para a outra aba */}
      <Pressable style={styles.boton} onPress={() => router.navigate('/settings')}>
        <Text>ir para Definições</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  ruta: { fontFamily: 'monospace', fontSize: 13, color: '#555', marginBottom: 12 },
  boton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbb',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
}`,
				},
				{
					name: "app/(tabs)/settings.tsx",
					language: "tsx",
					code: `
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Ajustes() {
  const router = useRouter();

  return (
    <View style={styles.contenedor}>
      <Text style={styles.ruta}>app/(tabs)/settings.tsx</Text>

      <Pressable style={styles.boton} onPress={() => router.push('/details')}>
        <Text>push Detalhes</Text>
      </Pressable>

      <Pressable style={styles.boton} onPress={() => router.navigate('/')}>
        <Text>ir para Início</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  ruta: { fontFamily: 'monospace', fontSize: 13, color: '#555', marginBottom: 12 },
  boton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbb',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
}`,
				},
				{
					name: "app/details.tsx",
					language: "tsx",
					code: `
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Detalhes() {
  const router = useRouter();

  return (
    <View style={styles.contenedor}>
      <Text style={styles.ruta}>app/details.tsx</Text>

      {/* back: remove details e regressa à aba de origem */}
      <Pressable
        style={[styles.boton, !router.canGoBack() && styles.deshabilitado]}
        disabled={!router.canGoBack()}
        onPress={() => router.back()}
      >
        <Text>back</Text>
      </Pressable>

      {/* replace: substitui details por outra rota sem deixar histórico */}
      <Pressable style={styles.boton} onPress={() => router.replace('/settings')}>
        <Text>replace Definições</Text>
      </Pressable>

      {/* dismissAll: fecha tudo o que está empilhado e regressa às abas */}
      <Pressable style={styles.boton} onPress={() => router.dismissAll()}>
        <Text>dismissAll</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  ruta: { fontFamily: 'monospace', fontSize: 13, color: '#555', marginBottom: 12 },
  boton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbb',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  deshabilitado: { opacity: 0.4 },
}`,
				},
			],
		},
		{
			type: "callout",
			alertType: "info",
			text: "Como o `details.tsx` vive no Stack raiz, não mostra a barra de abas. Se a quisesse visível, mova o seu ficheiro para dentro de `(tabs)` e —apenas para configurar opções— adicione `<Tabs.Screen name='details' options={{ href: null }} />`: a tela deixa de aparecer na barra, mas continua navegável.",
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Os ícones (`home-outline`, `settings-outline`) pertencem ao set Ionicons de `@react-native-vector-icons/ionicons`. E ao ter `headerShown: false` na tela `(tabs)` do Stack raiz, o cabeçalho de cada aba é desenhado pelo próprio `<Tabs />`.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "5. Tarefa Prática: Adiciona uma Aba" },
		{
			type: "assignment",
			assignmentId: "conf-10-tabs-nueva-pestana",
			description: [
				"**Requisitos:**",
				"1. Cria o `app/(tabs)/profile.tsx` com uma tela simples. **Não a registes**: criar o ficheiro deve fazê-la aparecer na barra logo.",
				"2. No `app/(tabs)/_layout.tsx` adiciona `<Tabs.Screen name='profile'>` apenas para configurá-la: `title` e `tabBarIcon` (por exemplo, o ícone `person` do Ionicons).",
				"3. Aplica `screenOptions` com `tabBarActiveTintColor` comum para todas as abas.",
				"4. Verifica que o `app/details.tsx` fica fora do grupo: ao navegar desde Início, a tela empilha-se sobre a barra e oculta-a.",
				"5. Confirma que o `app/_layout.tsx` mantém `headerShown: false` na tela `(tabs)`: ao entrar em Detalhes não deve ver-se um cabeçalho duplo.",
				"A solução de referência contém as três abas configuradas — repara que o `profile` existe porque criaste o ficheiro; o `Tabs.Screen` apenas lhe aporta ícone e título.",
			],
			code: `
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@react-native-vector-icons/ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#f4511e',
      }}
    >
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
      {/* profile.tsx não se declara para existir: criar o ficheiro alcança.
          O Tabs.Screen apenas aporta opções (ícone e título). */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Configuração, não registro: oculta o cabeçalho do Stack */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="details" options={{ title: 'Detalhes' }} />
    </Stack>
  );
}

// app/(tabs)/profile.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function Perfil() {
  return (
    <View style={styles.contenedor}>
      <Text>Aba de Perfil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
`,
		},
	],
};
