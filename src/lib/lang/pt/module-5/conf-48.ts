import type { CurriculumTopic } from "../../../../types/types";

export const conference48: CurriculumTopic = {
	id: "conf-48",
	title: "Conf. 48: Recapitulação e Próximos Passos",
	content: [
		{ type: "heading", text: "Recapitulação e Rota de Aprendizagem Contínua" },
		{
			type: "paragraph",
			text: "Parabéns por chegar ao final do bootcamp! Percorreu um longo caminho, desde os fundamentos do React Native até à construção de aplicações completas com bases de dados locais e arquiteturas robustas. Esta última sessão serve para consolidar o que aprendeu e dar-lhe um roteiro para o seu crescimento contínuo como desenvolvedor móvel.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "A Nossa Viagem Através do Bootcamp" },
		{
			type: "list",
			items: [
				{
					text: "**Módulo 1: Fundamentos**",
					subItems: [
						"Aprendemos o que é o React Native, como se diferencia da web, e configurámos o nosso ambiente com o Expo. Dominámos os componentes básicos de UI e a estilização com StyleSheet e NativeWind.",
					],
				},
				{
					text: "**Módulo 2: Navegação**",
					subItems: [
						"Construímos a estrutura das nossas aplicações com o Expo Router. Implementámos navegação de Pilha (Stack) e Abas (Tabs), lidámos com rotas dinâmicas e aprendemos a organizar o nosso código com grupos de rotas.",
					],
				},
				{
					text: "**Módulo 3: Persistência de Dados**",
					subItems: [
						"Mergulhámos no armazenamento local. Configurámos o SQLite com o Drizzle ORM, definimos esquemas, gerámos migrações e realizámos todas as operações CRUD (Criar, Ler, Atualizar, Eliminar) para dar persistência às nossas aplicações.",
					],
				},
				{
					text: "**Módulo 4: APIs e Otimização**",
					subItems: [
						"Ligámos as nossas aplicações ao mundo exterior consumindo APIs REST. Aprendemos a gerir estados de carregamento e erros, otimizámos o desempenho de listas com `FlatList` e aplicámos `debouncing` para uma melhor experiência do utilizador.",
					],
				},
				{
					text: "**Módulo 5: Tópicos Avançados**",
					subItems: [
						"Elevámos o nosso nível profissional. Discutimos a arquitetura de aplicações, explorámos a gestão de estado avançada com o Zustand, aprendemos a depurar e a lidar com erros, e construímos projetos complexos aplicando princípios de código limpo e design responsivo.",
					],
				},
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "A Rota de Aprendizagem Contínua" },
		{
			type: "paragraph",
			text: "A tecnologia nunca para, e um grande desenvolvedor está sempre a aprender. Aqui estão algumas áreas chave nas quais pode aprofundar para continuar a crescer:",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "CodeBracketIcon",
					title: "Testes (Testing)",
					text: "Aprenda a escrever testes unitários e de integração para os seus componentes e lógica com ferramentas como Jest e React Native Testing Library. Os testes são cruciais para construir aplicações fiáveis.",
				},
				{
					icon: "SparklesIcon",
					title: "Animações Avançadas",
					text: "Explorámos o básico de `react-native-reanimated`. Aprofunde em gestos complexos com `react-native-gesture-handler` e renderização de alto desempenho com `react-native-skia`.",
				},
				{
					icon: "RectangleStackIcon",
					title: "Gestão de Estado em Larga Escala",
					text: "Para aplicações muito grandes, explore soluções mais estruturadas como o Redux Toolkit. Compreender os seus padrões torná-lo-á um desenvolvedor mais versátil.",
				},
				{
					icon: "BoltIcon",
					title: "Desempenho Nativo",
					text: "Aprenda a usar os perfis de desempenho (Performance Profilers) для identificar e resolver estrangulamentos nas suas aplicações. Em casos extremos, aprenda os conceitos básicos de como escrever os seus próprios Módulos Nativos.",
				},
				{
					icon: "UsersIcon",
					title: "Backend e Implementação Completa",
					text: "Explore serviços de Backend-as-a-Service como Supabase ou Firebase para adicionar autenticação real, bases de dados na nuvem e notificações push. Aprenda o processo completo de implementação na App Store da Apple e na Google Play Store com o EAS.",
				},
			],
		},
		{
			type: "callout",
			alertType: "tip",
			text: "O melhor conselho é: continue a construir! Escolha um projeto pessoal que o apaixone e aplique o que aprendeu. A experiência prática é a forma mais rápida de solidificar os seus conhecimentos.",
		},
		{ type: "divider" },

		{ type: "heading", text: "Exame Final: Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Qual é o componente principal no React Native para criar contentores e aplicar estilos de layout, semelhante a um `<div>` na web?",
					options: ["<Text>", "<View>", "<Container>", "<Box>"],
					correctAnswer: 1,
				},
				{
					question:
						"No Expo Router, como se cria uma rota dinâmica para exibir os detalhes de um produto com um ID específico?",
					options: [
						"app/products/(id).tsx",
						"app/products/[id].tsx",
						"app/products/{id}.tsx",
						"app/products/id.tsx",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Qual é a principal vantagem de usar `FlatList` em vez de `ScrollView` para exibir uma longa lista de dados?",
					options: [
						"`FlatList` é mais fácil de estilizar.",
						"`FlatList` renderiza apenas os itens visíveis no ecrã, melhorando o desempenho.",
						"`ScrollView` não permite a rolagem vertical.",
						"`FlatList` tem suporte para animações por padrão.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Que comando do Drizzle Kit é utilizado para gerar os ficheiros de migração SQL a partir das alterações no seu esquema?",
					options: [
						"drizzle-kit push",
						"drizzle-kit apply",
						"drizzle-kit generate",
						"drizzle-kit migrate",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Para aplicar classes do Tailwind CSS num componente React Native usando NativeWind, que prop é utilizada?",
					options: ["style", "tw", "className", "css"],
					correctAnswer: 2,
				},
			],
		},
	],
};
