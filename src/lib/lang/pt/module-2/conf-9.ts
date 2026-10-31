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
			type: "callout",
			alertType: "info",
			text: "`app` ou `src/app`: os projetos criados com o template oficial (`bun create expo`) colocam o diretório de rotas em `src/app/`. O Expo Router também aceita um diretório `app/` na raiz do projeto; ambas as localizações são equivalentes. Nesta conferência usamos `app/` por brevidade: se o seu projeto tiver `src/app/`, tudo o que vê aqui funciona igual, antecedendo `src/` a cada rota.",
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
			type: "stackDemo",
			stackDemo: {
				screens: [
					{ id: "index", route: "/", name: "Início" },
					{ id: "details", route: "/details", name: "Detalhes" },
					{ id: "profile", route: "/profile", name: "Perfil" },
				],
				backLabel: "Voltar atrás",
				resetLabel: "Reiniciar",
				caption: "Experimente a pilha: push coloca uma tela nova no topo, Voltar atrás remove a visível e replace a substitui sem deixá-la no histórico.",
			},
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
			text: "Vamos criar uma nova tela. Crie um arquivo chamado `app/details.tsx`. Isso cria automaticamente a rota `/details`.",
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
			text: "E agora? Nada: criar o arquivo foi suficiente. O Expo Router registra cada arquivo do diretório no navegador que o envolve, de modo que a rota `/details` já existe e o Stack já sabe como mostrá-la.",
		},
		{
			type: "fileStructure",
			files: [
				{
					id: "layout",
					name: "app/_layout.tsx",
					description: [
						"Define o Stack Navigator que envolve todas as telas do diretório `app`.",
						"É aqui que personalizamos as telas quando precisamos (títulos, estilos do cabeçalho), mas não é o registro das rotas.",
					],
				},
				{
					id: "index",
					name: "app/index.tsx",
					description: [
						"A tela inicial, a rota `/`.",
						"É a primeira rota do Stack, por isso o navegador a carrega por padrão.",
					],
				},
				{
					id: "details",
					name: "app/details.tsx",
					description: [
						"Torna-se automaticamente a rota `/details`.",
						"Criar o arquivo alcança: declará-la no layout só se faz se quisermos configurar opções para ela.",
					],
				},
			],
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Erro comum: pensar que cada tela tem de ser «registada» manualmente em `_layout.tsx`. Não é assim. Se você adicionou `app/data.tsx`, a rota `/data` já funciona. `<Stack.Screen>` é opcional e serve apenas para configurar opções (título, estilos do cabeçalho).",
		},
		{
			type: "paragraph",
			text: "Para navegar entre telas de forma declarativa, usamos o componente `<Link>` do `expo-router`. É o equivalente à tag `<a>` na web. Vamos modificar o `app/index.tsx` para adicionar um link para a tela de detalhes.",
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

		{
			type: "subtitle",
			text: "4. Navegação Programática com `router`",
		},
		{
			type: "paragraph",
			text: "`<Link>` é navegação **declarativa**: você descreve o destino no JSX e o componente trata do resto. Mas muitas navegações acontecem após uma ação do usuário, como enviar um formulário ou confirmar um salvamento. Para esses casos, o Expo Router exporta o hook `useRouter`, que devolve um objeto `router` com métodos de navegação.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
      <Text>Tela Inicial</Text>
      <Button
        title="Ir para Detalhes"
        onPress={() => router.push('/details')}
      />
      <Button title="Voltar atrás" onPress={() => router.back()} />
    </View>
  );
}`,
		},
		{
			type: "twoColumn",
			columns: [
				{
					title: "`<Link>`: declarativa",
					content: [
						"Descreve-se no JSX: `<Link href=\"/details\">`.",
						"Ideal para conteúdo visível: listas, cartões, menus.",
						"É o equivalente da tag `<a>` da web.",
					],
				},
				{
					title: "`router`: programática",
					content: [
						"Executa-se como código: `router.push('/details')`.",
						"Ideal para ações dentro de callbacks: envios, confirmações, fluxos.",
						"`router.back()` regressa à tela anterior e `router.replace('/')` navega substituindo a tela atual no histórico.",
					],
				},
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "5. Configuração de Opções de Tela" },
		{
			type: "paragraph",
			text: "Podemos personalizar a aparência de cada tela no Stack, como o título do cabeçalho. Isso é feito através da propriedade `options` em `Stack.Screen`.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#f4511e' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Início' }} />
      <Stack.Screen name="details" options={{ title: 'Detalhes da App' }} />
    </Stack>
  );
}`,
		},
		{
			type: "paragraph",
			text: "Com `screenOptions` definimos opções comuns para todas as telas do Stack de uma só vez; cada `<Stack.Screen>` pode sobrescrever com o seu próprio `options` o que precisar.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "6. Tarefa Prática: Navega a Pilha" },
		{
			type: "assignment",
			assignmentId: "conf-9-stack-tres-rutas",
			description: [
				"**Requisitos:**",
				"1. Crie duas novas telas: `app/profile.tsx` e `app/settings.tsx`. **Não declare nenhuma das duas dentro de `<Stack>`**: o registro automático deve tratar disso.",
				"2. No `app/index.tsx` adicione um `<Link>` para `/profile` e um `<Button>` que navegue para `/settings` com `router.push`.",
				"3. No `app/settings.tsx` adicione um botão «Voltar» que execute `router.back()`.",
				"4. No `app/_layout.tsx` use `screenOptions` para aplicar a todas as telas um `backgroundColor` de cabeçalho em comum e um `headerTintColor` legível.",
				"5. Personalize o título do `app/profile.tsx` —sem declará-la no layout— renderizando `<Stack.Screen options={{ title: 'Meu Perfil' }} />` dentro da tela.",
				"A solução de referência conta com um componente `Pantalla` reutilizável: as quatro telas apenas declaram o nome do seu arquivo, e toda a lógica de navegação (`push`, `replace`, `back`, `dismissAll`) vive num único lugar.",
			],
			code: `
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#f4511e' },
        headerTintColor: '#fff',
      }}
    >
      {/* Apenas o título do início; profile e settings registram-se sozinhas */}
      <Stack.Screen name="index" options={{ title: 'Início' }} />
    </Stack>
  );
}

// components/Pantalla.tsx — tela comum reutilizável
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

type Props = {
  arquivo: string; // apenas para mostrar em tela, ex. "app/details.tsx"
};

function Boton({
  texto,
  onPress,
  deshabilitado = false,
}: {
  texto: string;
  onPress: () => void;
  deshabilitado?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={deshabilitado}
      style={({ pressed }) => [
        styles.boton,
        pressed && styles.botonPresionado,
        deshabilitado && styles.botonDeshabilitado,
      ]}
    >
      <Text style={styles.botonTexto}>{texto}</Text>
    </Pressable>
  );
}

export default function Pantalla({ archivo }: Props) {
  const router = useRouter();
  const hayAnterior = router.canGoBack();

  return (
    <View style={styles.contenedor}>
      <Text style={styles.archivo}>{archivo}</Text>

      <View style={styles.acciones}>
        {/* push: adiciona uma tela no topo da pilha */}
        <Boton texto="push Detalhes" onPress={() => router.push('/details')} />
        <Boton texto="push Perfil" onPress={() => router.push('/profile')} />
        <Boton texto="push Ajustes" onPress={() => router.push('/settings')} />

        {/* replace: troca a tela atual sem crescer a pilha */}
        <Boton texto="replace Ajustes" onPress={() => router.replace('/settings')} />

        {/* back: remove a tela de cima */}
        <Boton texto="back" onPress={() => router.back()} deshabilitado={!hayAnterior} />

        {/* dismissAll: volta à primeira tela da pilha */}
        <Boton
          texto="dismissAll"
          onPress={() => router.dismissAll()}
          deshabilitado={!hayAnterior}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    padding: 24,
  },
  archivo: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#555',
  },
  acciones: {
    width: '100%',
    gap: 10,
  },
  boton: {
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbb',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  botonPresionado: { backgroundColor: '#eee' },
  botonDeshabilitado: { opacity: 0.4 },
  botonTexto: { fontSize: 15 },
});

// app/index.tsx
import { Link } from 'expo-router';
import Pantalla from '../components/Pantalla';

export default function Inicio() {
  return (
    <>
      <Link href="/profile" style={{ alignSelf: 'center', margin: 12 }}>
        Ir ao perfil
      </Link>
      <Pantalla archivo="app/index.tsx" />
    </>
  );
}

// app/details.tsx
import Pantalla from '../components/Pantalla';

export default function Detalles() {
  return <Pantalla arquivo="app/details.tsx" />;
}

// app/profile.tsx — título próprio sem declará-la no layout
import { Stack } from 'expo-router';
import Pantalla from '../components/Pantalla';

export default function Perfil() {
  return (
    <>
      <Stack.Screen options={{ title: 'Meu Perfil' }} />
      <Pantalla arquivo="app/profile.tsx" />
    </>
  );
}

// app/settings.tsx
import Pantalla from '../components/Pantalla';

export default function Ajustes() {
  return <Pantalla arquivo="app/settings.tsx" />;
}
`,
		},
	],
};
