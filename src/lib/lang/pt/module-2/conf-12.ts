import type { CurriculumTopic } from "../../../../types/types";

export const conference12: CurriculumTopic = {
	id: "conf-12",
	title: "Conf. 12: Agrupamento de Rotas e Layouts",
	content: [
		{ type: "heading", text: "Agrupamento de Rotas e Layouts Específicos" },
		{
			type: "paragraph",
			text: 'À medida que uma aplicação cresce, manter organizada a estrutura de arquivos se torna crucial. O Expo Router oferece uma função poderosa chamada "Grupos de Rotas" que nos permite organizar nosso código sem afetar as URLs, e aplicar diferentes layouts a distintas seções da app.',
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. O que são Grupos de Rotas?" },
		{
			type: "paragraph",
			text: "Um grupo de rotas é criado nomeando um diretório com parênteses, por exemplo, `(auth)` ou `(tabs)`. A principal característica de um grupo é que **o nome da pasta é omitido da URL**.",
		},
		{
			type: "list",
			items: [
				"**`app/(marketing)/about.tsx`** se converte na rota `/about`",
				"**`app/(shop)/products/index.tsx`** se converte na rota `/products`",
			],
		},
		{ type: "paragraph", text: "O propósito dos grupos é duplo:" },
		{
			type: "list",
			items: [
				"**Organização:** Agrupar rotas relacionadas para manter a pasta `app` limpa e legível.",
				"**Layouts Compartilhados:** Aplicar um arquivo `_layout.tsx` específico a todas as rotas dentro desse grupo.",
			],
		},
		{
			type: "callout",
			alertType: "info",
			text: "Já estivemos usando um grupo de rotas: `(tabs)`. O nome `(tabs)` não aparece na URL, mas nos permite aplicar um layout de abas a todas as telas dentro desse diretório.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Caso de Uso: Fluxo de Autenticação vs. Fluxo Principal" },
		{
			type: "paragraph",
			text: "Um caso de uso clássico para os grupos é separar as telas de autenticação (login, registro) das telas principais da aplicação. Cada fluxo tem um layout diferente: o fluxo de autenticação não deveria ter uma barra de abas, enquanto que o fluxo principal sim.",
		},
		{ type: "paragraph", text: "Imaginemos esta estrutura de arquivos:" },
		{
			type: "fileStructure",
			files: [
				{
					id: "fig-1",
					name: "app/_layout.tsx",
					description: [
						"Stack raiz: decide qual grupo está habilitado",
						"de acordo com o estado de sessão (vemos na seção 3).",
					],
				},
				{
					id: "fig-2",
					name: "app/(auth)/_layout.tsx",
					description: [
						"Layout do grupo de autenticação: um Stack simples",
						"sem barra de abas.",
					],
				},
				{
					id: "fig-3",
					name: "app/(auth)/login.tsx",
					description: [
						"O arquivo É a rota: se registra como /login",
						"sem escrever nada em nenhum layout.",
					],
				},
				{
					id: "fig-4",
					name: "app/(auth)/register.tsx",
					description: [
						"Se registra automaticamente como /register.",
					],
				},
				{
					id: "fig-5",
					name: "app/(tabs)/_layout.tsx",
					description: [
						"O navegador de abas do fluxo principal,",
						"o mesmo que configuramos na conf. 10.",
					],
				},
				{
					id: "fig-6",
					name: "app/(tabs)/index.tsx",
					description: [
						"Início do fluxo logado: a rota /index,",
						"também registrada sozinha por ser arquivo.",
					],
				},
			],
		},
		{
			type: "paragraph",
			text: "No `_layout.tsx` do grupo `(auth)`, definimos um Stack simples:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';

export default function AuthLayout() {
  // Um Stack sem barra de abas
  return <Stack />;
}`,
		},
		{
			type: "paragraph",
			text: "E em `app/(tabs)/_layout.tsx`, definimos o nosso `Tabs` como já vimos na conf. 10. Falta uma peça: quem decide qual grupo mostrar de acordo com o estado de sessão. Fazê-lo manualmente (render condicional no layout raiz) era o padrão antigo; o Expo Router traz uma ferramenta melhor — o tema da próxima seção.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Protegendo o Fluxo com `Stack.Protected`" },
		{
			type: "paragraph",
			text: "No Expo Router, **todas as rotas existem sempre** e são acessíveis por definição: criar o arquivo cria a rota. Para bloquear o acesso de acordo com o estado de sessão, usamos `<Stack.Protected>`: um `guard` booleano que decide se a tela está habilitada em cada render. É a ferramenta oficial de Expo Router v5+ para fluxos de autenticação.",
		},
		{
			type: "paragraph",
			text: "O estado de sessão geralmente vive em um React Context que envolve toda a app (`useSession`). Com isso, o layout raiz fica assim:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/_layout.tsx
import { Stack } from 'expo-router';
import { SessionProvider, useSession } from '../lib/session';

function NavigatorProtegido() {
  const { session } = useSession();

  return (
    <Stack>
      {/* (tabs) só é acessível COM sessão iniciada */}
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* (auth) só é acessível SEM sessão */}
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SessionProvider>
      {/* O componente que usa useSession deve ficar DENTRO do provider */}
      <NavigatorProtegido />
    </SessionProvider>
  );
}`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "O que faz o `guard`? Com `false`, a tela fica **blindada**: se o usuário tentar navegá-la, ou desembarcar por um *deep link*, o Expo Router o redireciona para a primeira tela disponível. E se o estado muda **enquanto a tela está ativa** (o exemplo clássico: `signOut` estando em Início), a redireção ocorre no instante — sem escrever uma única linha de navegação.",
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Se você encontrar tutoriais que renderizam grupos com um ternário (`session ? <TabsGroup /> : <AuthGroup />`) no layout raiz: esse é o padrão anterior, totalmente substituído pelo `Stack.Protected`. A sessão real e persistente é guardada com `expo-secure-store` — vemos na conf. 14.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Rotas Fora de Grupos de Navegação" },
		{
			type: "paragraph",
			text: "Às vezes é preciso que uma tela não pertença a um layout de navegação específico. Por exemplo, uma tela de detalhes de um produto que abre a partir de uma aba, mas que deve ocupar a tela toda e ocultar a barra de abas.",
		},
		{
			type: "paragraph",
			text: "O que decide o empilhamento é a **localização do arquivo**: uma tela na raiz de `app/` (fora do grupo) é irmã de `(tabs)` no Stack raiz, e por isso se empilha por cima dele. A entrada no layout é opcional e serve apenas para opções.",
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
      {/* O grupo de abas é tratado como uma única tela no Stack */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Estas entradas são APENAS opções: a existência já a deram os arquivos */}
      <Stack.Screen
        name="product/[id]"
        options={{ title: 'Detalhe do Produto' }}
      />

      {/* Uma tela modal que poderia aparecer de qualquer lugar */}
      <Stack.Screen
        name="share-modal"
        options={{ presentation: 'modal', title: 'Compartilhar' }}
      />
    </Stack>
  );
}`,
		},
		{
			type: "list",
			items: [
				"`product/[id].tsx` vive na **raiz** de `app/` (fora do grupo), assim é irmã de `(tabs)` — e ao navegar a um produto, empilha-se **por cima** de tudo, ocultando temporariamente a interface de abas. Um `router.push('/product/42')` alcança.",
				"A opção `presentation: 'modal'` é uma forma poderosa de mostrar telas que deslizam de baixo, ideal para formulários ou diálogos de ação.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "5. Tarefa Prática: Separe o Fluxo de Autenticação" },
		{
			type: "assignment",
			assignmentId: "conf-12-grupos-protected",
			description: [
				"**Requisitos:**",
				"1. Crie o grupo `(auth)` com `(auth)/login.tsx`, `(auth)/register.tsx` e `(auth)/_layout.tsx` com um `<Stack />` simples. **Não registre nada a mano**: os arquivos bastam.",
				"2. Crie um contexto de sessão mínimo (`session`, `signIn`, `signOut`) e coloque-o no layout raiz, envolvendo o navegador.",
				"3. No layout raiz, envolva `(tabs)` com `<Stack.Protected guard={!!session}>` e o grupo `(auth)` com `guard={!session}`.",
				"4. Em `login.tsx`, inicie a sessão com `signIn()` e navegue com `router.replace('/')`: `replace` apaga o histórico, assim o botão Voltar não traz o login de volta.",
				"5. Verifique: ao fazer `signOut()` estando em Início, a app redireciona sozinha a `/login` — isso é o `Stack.Protected` trabalhando, sem uma linha de navegação escrita por você.",
				"A solução de referência guarda a sessão em um `useState` do provider (mock). Para uma sessão real e persistente, seguiria `expo-secure-store`, como veremos na conf. 14.",
			],
			code: `
// lib/session.tsx
import { createContext, use, useState } from 'react';
import type { PropsWithChildren } from 'react';

const SessionContext = createContext<{
  session: boolean;
  signIn: () => void;
  signOut: () => void;
} | null>(null);

export function useSession() {
  const value = use(SessionContext);
  if (!value) {
    throw new Error('useSession deve ser usado dentro de <SessionProvider />');
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  // Mock: a sessão real e persistente vive em expo-secure-store (conf. 14)
  const [session, setSession] = useState(false);

  return (
    <SessionContext.Provider
      value={{
        session,
        signIn: () => setSession(true),
        signOut: () => setSession(false),
      }}>
      {children}
    </SessionContext.Provider>
  );
}

// app/_layout.tsx
import { Stack } from 'expo-router';
import { SessionProvider, useSession } from '../lib/session';

function NavigatorProtegido() {
  const { session } = useSession();

  return (
    <Stack>
      {/* (tabs) só é acessível COM sessão iniciada */}
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* (auth) só é acessível SEM sessão */}
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SessionProvider>
      {/* O componente que usa useSession deve ficar DENTRO do provider */}
      <NavigatorProtegido />
    </SessionProvider>
  );
}

// app/(auth)/login.tsx
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useSession } from '../../lib/session';

export default function Login() {
  const { signIn } = useSession();

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Entrar</Text>

      <Pressable
        style={styles.boton}
        onPress={() => {
          signIn();
          // replace: sem o login atrás no histórico
          router.replace('/');
        }}
      >
        <Text>Iniciar sessão</Text>
      </Pressable>
    </View>
  );
}

// styles… (idem: contêiner centralizado, botão de borda)

// app/(tabs)/index.tsx
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSession } from '../../lib/session';

export default function Inicio() {
  const { signOut } = useSession();

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Início</Text>

      {/* signOut muda o guard e o Protected redireciona a /login sozinho */}
      <Pressable style={styles.boton} onPress={() => signOut()}>
        <Text>Terminar sessão</Text>
      </Pressable>
    </View>
  );
}
`,
		},
	],
};
