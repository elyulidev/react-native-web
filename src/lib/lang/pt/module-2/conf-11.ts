import type { CurriculumTopic } from "../../../../types/types";

export const conference11: CurriculumTopic = {
	id: "conf-11",
	title: "Conf. 11: Rotas Aninhadas e Dinâmicas",
	content: [
		{ type: "heading", text: "Manejo de Rotas Aninhadas e Dinâmicas" },
		{
			type: "paragraph",
			text: "Aplicações reais frequentemente precisam mostrar conteúdo baseado em um parâmetro, como o ID de um produto ou o nome de usuário de um perfil. O Expo Router lida com isso de maneira elegante por meio de rotas dinâmicas, que nos permitem criar templates de tela para uma quantidade infinita de elementos.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. O que são Rotas Dinâmicas?" },
		{
			type: "paragraph",
			text: "Uma rota dinâmica é uma rota que corresponde a múltiplas URLs baseadas em um segmento variável. No Expo Router, isso é alcançado nomeando um arquivo ou diretório com colchetes.",
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
		{
			type: "callout",
			alertType: "info",
			text: "E as rotas **aninhadas**? Você já as domina: na conferência anterior, o grupo `(tabs)` é um navegador de abas aninhado dentro do Stack raiz — um navegador dentro de outro. Nesta conferência adicionamos a outra ferramenta do cinto: as rotas **dinâmicas**, uma única tela que serve para infinitos valores.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Criando uma Rota Dinâmica para Perfis de Usuário" },
		{
			type: "paragraph",
			text: "Vamos criar um exemplo. Imagine que temos uma lista de usuários e queremos navegar ao perfil de cada um. Primeiro, criemos a tela de perfil dinâmico em `app/profile/[id].tsx`:",
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
      <Text style={{ fontSize: 24 }}>Perfil</Text>
      {/* Aqui mostraremos o ID do usuário */}
    </View>
  );
}`,
		},
		{
			type: "paragraph",
			text: "E isso é tudo. Não é preciso \"registrar\" essa rota em nenhum layout: **o arquivo já é a rota**. Ao criar `app/profile/[id].tsx`, o Expo Router registra automaticamente que qualquer visita do tipo `/profile/<valor>` renderize esta tela.",
		},
		{
			type: "callout",
			alertType: "info",
			text: "Lembre da regra da conferência anterior: criar um arquivo basta para que a tela exista. Uma entrada `<Stack.Screen>` é opcional e serve **apenas para opções** — nada de registro.",
		},
		{
			type: "paragraph",
			text: "Se quiséssemos opções para a tela (por exemplo, um título de cabeçalho), sim escrevemos a entrada no layout — apenas para configurar, nunca para registrar:",
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
      {/* Opcional: apenas opções. Escrever esta entrada não "registra" a rota */}
      <Stack.Screen name="profile/[id]" options={{ title: 'Perfil de Usuário' }} />
    </Stack>
  );
}`,
		},
		{
			type: "fileStructure",
			files: [
				{
					id: "fig-1",
					name: "app/_layout.tsx",
					description: [
						"Stack raiz da app. Não precisa de mudanças para o perfil:",
						"a rota dinâmica se registra sozinha ao criar o arquivo.",
					],
				},
				{
					id: "fig-2",
					name: "app/(tabs)/_layout.tsx",
					description: [
						"Navegador de abas, aninhado dentro do Stack raiz.",
					],
				},
				{
					id: "fig-3",
					name: "app/(tabs)/index.tsx",
					description: [
						"Início: contém a lista de links para os perfis.",
					],
				},
				{
					id: "fig-4",
					name: "app/profile/[id].tsx",
					description: [
						"A rota dinâmica: uma única tela que atende a",
						"/profile/1, /profile/lucia, /profile/x… o valor do",
						"colchete é o coringa que muda a cada visita.",
					],
				},
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Extraindo Parâmetros com `useLocalSearchParams`",
		},
		{
			type: "paragraph",
			text: "Dentro do nosso componente de tela `UserProfile`, precisamos de uma forma de acessar o valor do `id` da URL. Para isso, usamos o hook `useLocalSearchParams` do `expo-router`.",
		},
		{
			type: "paragraph",
			text: "Como o projeto é TypeScript, aproveitamos o genérico do hook para tipar os parâmetros. Assim o `id` chega com o tipo preciso que esperamos.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/profile/[id].tsx
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function UserProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Perfil do Usuário</Text>
      <Text style={{ fontSize: 20, marginTop: 10 }}>ID: {id}</Text>
    </View>
  );
}`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "Por que o genérico? Sem ele, o hook devolve cada parâmetro como `string | string[]` — os parâmetros podem chegar multivalorados (comum em query strings com a mesma chave repetida). Ao tipar `{ id: string }` dizemos ao TypeScript exatamente o que esperar desta rota.",
		},
		{
			type: "paragraph",
			text: "E agora que sabemos ler o `id`, podemos fazer algo que a opção do layout não permite: um título **dinâmico por usuário**. Um `<Stack.Screen>` renderizado **dentro** da tela configura as suas próprias opções:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/profile/[id].tsx - título dinâmico dentro da tela
<Stack.Screen options={{ title: \`Perfil \${id}\` }} />`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Este padrão é o mesmo que já usamos na conf. 9 para `app/profile.tsx`: `<Stack.Screen options={...} />` sem `name` aponta para a tela que o contém. A diferença aqui é que o título depende do parâmetro da rota.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Navegando a Rotas Dinâmicas" },
		{
			type: "paragraph",
			text: "Para navegar à nossa tela de perfil, substituímos o segmento dinâmico pelo valor real. Modifiquemos a tela de início (`app/(tabs)/index.tsx`) para incluir links a um par de perfis de exemplo:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/(tabs)/index.tsx
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

const perfiles = [
  { id: 'lucia', nombre: 'Lucía' },
  { id: 'mateo', nombre: 'Mateo' },
  { id: 'sofia', nombre: 'Sofía' },
];

export default function Inicio() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Tela de Início</Text>

      {perfiles.map((p) => (
        <Link key={p.id} href={\`/profile/\${p.id}\`} style={styles.fila}>
          Ver perfil de {p.nombre}
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  titulo: { fontSize: 18, fontWeight: '600' },
  fila: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#fff',
    color: '#2563eb',
    fontSize: 16,
  },
});`,
		},
		{
			type: "paragraph",
			text: "Repara no `href`: é um **template construído em runtime** com o valor de cada perfil. Ao clicar em um link, você será levado à tela `UserProfile`, e o hook `useLocalSearchParams` extrairá `lucia`, `mateo` ou `sofia` da URL. Em uma aplicação real, você usaria esse ID para fazer uma chamada a uma API e obter os dados completos do usuário.",
		},
		{
			type: "twoColumn",
			columns: [
				{
					title: "`<Link>` (declarativo)",
					content: [
						"Navegação **visível** na tela: listas, cards, qualquer conteúdo clicável.",
						"É o análogo a um `<a>` na web: o destino vive no JSX.",
						"Os `href` com template literals cobrem perfeitamente as rotas dinâmicas.",
					],
				},
				{
					title: "`router.push()` (programático)",
					content: [
						"Navegação por **ação**: botões, callbacks, fluxos com lógica prévia.",
						"Permite validar ou calcular a rota antes de ir — por exemplo, navegar só se o usuário carregou os seus dados.",
						"Já o usamos na conf. 9 com `push`, `back`, `replace` e `dismissAll`.",
					],
				},
			],
		},
		{
			type: "paragraph",
			text: "A versão programática com `router` é idêntica à que já conhecemos — só muda a rota construída:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/(tabs)/index.tsx (fragmento)
import { useRouter } from 'expo-router';

export default function Inicio() {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(\`/profile/\${id}\`)}
      style={styles.fila}
    >
      <Text>Ver perfil</Text>
    </Pressable>
  );
}`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "5. Tarefa Prática: Crie um Perfil Dinâmico" },
		{
			type: "assignment",
			assignmentId: "conf-11-perfil-dinamico",
			description: [
				"**Requisitos:**",
				"1. Crie `app/profile/[id].tsx`. **Não a registre em nenhum layout**: o arquivo com colchetes já gera a rota para qualquer valor (`/profile/lucia`, `/profile/123`, …).",
				"2. Extraia o `id` tipado com `useLocalSearchParams<{ id: string }>()` e mostre-o na tela.",
				"3. Em `app/(tabs)/index.tsx` adicione três links (`<Link>`) que apontem a `/profile/lucia`, `/profile/mateo` e `/profile/sofia`.",
				"4. Bônus: renderize `<Stack.Screen options={{ title: `Perfil de ${id}` }} />` dentro da tela para um título de cabeçalho dinâmico.",
				"A solução de referência usa um dicionário mock de usuários: a tela dinâmica busca o nome de acordo com o `id` que chega da URL, e index.tsx constrói cada `href` com um template literal.",
			],
			code: `
// app/profile/[id].tsx
import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const usuarios: Record<string, string> = {
  lucia: 'Lucía Fernández',
  mateo: 'Mateo Rossi',
  sofia: 'Sofía González',
};

export default function Perfil() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const nombre = usuarios[id] ?? 'Usuário desconhecido';

  return (
    <>
      <Stack.Screen options={{ title: \`Perfil de \${nombre}\` }} />
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>{nombre}</Text>
        <Text style={styles.id}>ID: {id}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
  },
  titulo: { fontSize: 24, fontWeight: '600' },
  id: { fontFamily: 'monospace', fontSize: 15, color: '#555' },
});

// app/(tabs)/index.tsx
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

const perfiles = ['lucia', 'mateo', 'sofia'];

export default function Inicio() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Tela de Início</Text>

      {perfiles.map((id) => (
        <Link key={id} href={\`/profile/\${id}\`} style={styles.fila}>
          Ver perfil de {id}
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
  },
  titulo: { fontSize: 18, fontWeight: '600' },
  fila: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#fff',
    color: '#2563eb',
    fontSize: 16,
  },
});
`,
		},
	],
};
