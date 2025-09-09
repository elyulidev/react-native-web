import type { CurriculumTopic } from "../../../../types/types";

export const conference12: CurriculumTopic = {
	id: "conf-12",
	title: "Conf. 12: Agrupamento de Rotas e Layouts",
	content: [
		{ type: "heading", text: "Agrupamento de Rotas e Layouts Específicos" },
		{
			type: "paragraph",
			text: 'À medida que uma aplicação cresce, manter a estrutura de ficheiros organizada torna-se crucial. O Expo Router oferece uma funcionalidade poderosa chamada "Grupos de Rotas" que nos permite organizar o nosso código sem afetar os URLs, e aplicar diferentes layouts a distintas secções da app.',
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. O que são Grupos de Rotas?" },
		{
			type: "paragraph",
			text: "Um grupo de rotas é criado nomeando um diretório com parênteses, por exemplo, `(auth)` ou `(tabs)`. A principal característica de um grupo é que **o nome da pasta é omitido do URL**.",
		},
		{
			type: "list",
			items: [
				"**`app/(marketing)/about.tsx`** torna-se a rota `/about`",
				"**`app/(shop)/products/index.tsx`** torna-se a rota `/products`",
			],
		},
		{ type: "paragraph", text: "O propósito dos grupos é duplo:" },
		{
			type: "list",
			items: [
				"**Organização:** Agrupar rotas relacionadas para manter a pasta `app` limpa e legível.",
				"**Layouts Partilhados:** Aplicar um ficheiro `_layout.tsx` específico a todas as rotas dentro desse grupo.",
			],
		},
		{
			type: "callout",
			alertType: "info",
			text: "Já estivemos a usar um grupo de rotas: `(tabs)`. O nome `(tabs)` não aparece no URL, mas permite-nos aplicar um layout de abas a todas as telas dentro desse diretório.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "2. Caso de Uso: Fluxo de Autenticação vs. Fluxo Principal",
		},
		{
			type: "paragraph",
			text: "Um caso de uso clássico para grupos é separar as telas de autenticação (login, registo) das telas principais da aplicação. Cada fluxo tem um layout diferente: o fluxo de autenticação não deve ter uma barra de abas, enquanto o fluxo principal sim.",
		},
		{ type: "paragraph", text: "Imaginemos esta estrutura de ficheiros:" },
		{
			type: "code",
			language: "bash",
			code: `
app/
├── (auth)/
│   ├── _layout.tsx      # Layout para o Stack de autenticação
│   ├── login.tsx        # Rota /login
│   └── register.tsx     # Rota /register
├── (tabs)/
│   ├── _layout.tsx      # Layout para o Tab Navigator principal
│   ├── home.tsx         # Rota /home
│   └── profile.tsx      # Rota /profile
└── _layout.tsx          # Layout Raiz que decide que grupo mostrar
      `,
		},
		{
			type: "paragraph",
			text: "No `_layout.tsx` do grupo `(auth)`, definiríamos um Stack simples:",
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
			text: "Enquanto que em `app/(tabs)/_layout.tsx`, definimos os nossos `Tabs` como já vimos. O layout raiz (`app/_layout.tsx`) seria o responsável por decidir que grupo renderizar, normalmente com base em se o utilizador está autenticado ou não.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Rotas Fora de Grupos de Navegação" },
		{
			type: "paragraph",
			text: "Por vezes, é necessário que uma tela não pertença a um layout de navegação específico. Por exemplo, uma tela de detalhes de um produto que se abre a partir de uma aba, mas que deve ocupar toda a tela e ocultar a barra de abas.",
		},
		{
			type: "paragraph",
			text: "A chave para conseguir isto é a hierarquia no nosso `StackNavigator` raiz (`app/_layout.tsx`).",
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

      {/* Esta tela de detalhes será empilhada EM CIMA do Tab Navigator */}
      <Stack.Screen
        name="product/[id]"
        options={{ title: 'Detalhe do Produto' }}
      />

      {/* Uma tela modal que pode aparecer de qualquer lugar */}
      <Stack.Screen
        name="share-modal"
        options={{ presentation: 'modal', title: 'Partilhar' }}
      />
    </Stack>
  );
}`,
		},
		{
			type: "list",
			items: [
				"Ao colocar `product/[id]` como irmão de `(tabs)` no Stack raiz, dizemos ao Expo Router que quando navegarmos para um produto, esta nova tela deve ser empilhada por cima de tudo, ocultando temporariamente a interface de abas.",
				"A opção `presentation: 'modal'` é uma forma poderosa de mostrar telas que deslizam de baixo, ideal para formulários ou diálogos de ação.",
			],
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Qual é o principal benefício de nomear um diretório como `(marketing)`?",
					options: [
						"Torna todas as rotas dentro dele privadas.",
						"Permite organizar ficheiros num grupo sem que '(marketing)' apareça no URL.",
						"Aplica automaticamente um tema de marketing às telas.",
						"É apenas uma convenção de nomenclatura sem efeito técnico.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Se tiver uma rota `app/(shop)/settings.tsx`, qual será o seu URL final?",
					options: [
						"/(shop)/settings",
						"/shop/settings",
						"/settings",
						"/app/(shop)/settings",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Num Stack Navigator raiz, como garante que uma tela de detalhes (`details.tsx`) é mostrada por cima do seu Tab Navigator (`(tabs)`)?",
					options: [
						"Movendo `details.tsx` para dentro da pasta `(tabs)`.",
						"Declarando `<Stack.Screen name='details' />` como irmão de `<Stack.Screen name='(tabs)' />` no layout raiz.",
						"Usando um `Link` especial com uma propriedade `overlay`.",
						"Não é possível, as telas de detalhe devem estar sempre dentro das abas.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Que opção de `Stack.Screen` usaria para que uma tela se apresente como uma janela modal que desliza de baixo?",
					options: [
						"`style: 'modal'`",
						"`isModal: true`",
						"`mode: 'modal'`",
						"`presentation: 'modal'`",
					],
					correctAnswer: 3,
				},
			],
		},
	],
};
