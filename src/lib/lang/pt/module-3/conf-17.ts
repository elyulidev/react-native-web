import type { CurriculumTopic } from "../../../../types/types";

export const conference17: CurriculumTopic = {
	id: "conf-17",
	title: "Conf. 17: Introdução a BD Locais",
	content: [
		{ type: "heading", text: "Introdução a Bancos de Dados Locais" },
		{
			type: "paragraph",
			text: "No desenvolvimento móvel, nem sempre podemos depender de uma ligação à internet. A persistência de dados local permite-nos guardar informação diretamente no dispositivo do utilizador, criando aplicações mais rápidas, fiáveis e funcionais mesmo offline.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Porque é Fundamental a Persistência Local?" },
		{
			type: "paragraph",
			text: "A persistência de dados local é um pilar no desenvolvimento de aplicações móveis robustas. As suas vantagens chave impactam diretamente na experiência do utilizador e no desempenho da aplicação.",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "BoltIcon",
					title: "Suporte Offline",
					text: "Permite que a aplicação funcione sem ligação à internet. Os dados importantes são armazenados no dispositivo, assegurando a disponibilidade contínua.",
				},
				{
					icon: "ArrowPathIcon",
					title: "Desempenho Melhorado",
					text: "Aceder a dados locais é significativamente mais rápido do que consultar um servidor remoto, o que reduz a latência e acelera os tempos de carregamento.",
				},
				{
					icon: "SparklesIcon",
					title: "Experiência Fluida",
					text: "Armazenar dados como a sessão do utilizador ou preferências localmente evita recarregamentos desnecessários e mantém um estado consistente entre sessões.",
				},
				{
					icon: "RectangleStackIcon",
					title: "Gestão de Estado Global",
					text: "Ideal para armazenar informação que precisa de ser acessível globalmente, como dados de perfil, sem necessidade de pedidos repetitivos.",
				},
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Explorando Opções Populares" },
		{
			type: "paragraph",
			text: "Existem diversas opções para a persistência de dados no React Native. As duas mais comuns são o AsyncStorage e o SQLite, cada uma com um propósito diferente.",
		},
		{
			type: "twoColumn",
			columns: [
				{
					title: "AsyncStorage (Chave-Valor Simples)",
					content: [
						"Um sistema de armazenamento simples, assíncrono e não relacional.",
						"**Ideal para:** Pequenas quantidades de dados como preferências do utilizador (ex. tema claro/escuro), tokens de autenticação ou dados de sessão.",
						"**Analogia:** Semelhante ao `localStorage` do navegador web.",
					],
				},
				{
					title: "SQLite (Base de Dados Relacional)",
					content: [
						"Una base de dados relacional completa, robusta e potente.",
						"**Ideal para:** Grandes volumes de dados estruturados, relações complexas entre dados e consultas avançadas.",
						"**Exemplo:** Guardar uma lista de tarefas, produtos de um e-commerce ou mensagens de um chat.",
					],
				},
			],
		},
		{
			type: "callout",
			alertType: "info",
			text: "Outras opções como o MMKV (rápido chave-valor) e o WatermelonDB (reativo, para grandes datasets) também existem, mas para este bootcamp vamos focar-nos na potência do SQLite.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "O que é um ORM e porquê usar o Drizzle?" },
		{
			type: "paragraph",
			text: "Um ORM (Object-Relational Mapper) como o Drizzle atua como um tradutor entre o nosso código (JavaScript/TypeScript) e a base de dados relacional (SQL). Permite-nos interagir com as tabelas e dados usando objetos e métodos, em vez de escrever consultas SQL brutas.",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "CodeBracketIcon",
					title: "Abstração de SQL",
					text: "Em vez de escrever `INSERT INTO users...`, usa um método como `db.insert(users)...`. Isto reduz erros e acelera o desenvolvimento.",
				},
				{
					icon: "ShieldCheckIcon",
					title: "Segurança de Tipos",
					text: "O Drizzle integra-se perfeitamente com o TypeScript, detetando erros de tipo antes de o seu código ser executado. Acabaram-se os erros de inserir um número numa coluna de texto!",
				},
				{
					icon: "RectangleGroupIcon",
					title: "Esquemas em Código",
					text: "Define a estrutura da sua base de dados diretamente em ficheiros TypeScript, o que facilita o controlo de versões e a colaboração.",
				},
				{
					icon: "UsersIcon",
					title: "Código Reutilizável",
					text: "Define o seu esquema uma vez e reutilize-o em toda a sua aplicação, assegurando consistência e reduzindo a duplicação de código.",
				},
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Instalação do Módulo `expo-sqlite`" },
		{
			type: "paragraph",
			text: "Para que o Drizzle ORM possa comunicar com a base de dados SQLite no dispositivo, primeiro devemos instalar a biblioteca que fornece essa ligação:",
		},
		{ type: "code", language: "bash", code: "npx expo install expo-sqlite" },
		{
			type: "callout",
			alertType: "tip",
			text: "Este pacote é a ponte fundamental que permite à nossa aplicação React Native aceder e manipular uma base de dados SQLite local. Na próxima conferência, instalaremos o Drizzle sobre esta base.",
		},
		{ type: "divider" },
		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Qual destas opções NÃO é uma vantagem principal da persistência de dados local?",
					options: [
						"Suporte Offline",
						"Melhoria de desempenho",
						"Aumento da segurança do servidor",
						"Manutenção do estado entre sessões",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Para que caso de uso é o `AsyncStorage` mais adequado do que o SQLite?",
					options: [
						"Armazenar uma lista de 10.000 produtos com categorias.",
						"Guardar a preferência do utilizador para o tema (claro/escuro).",
						"Gerir mensagens de um chat com os seus utilizadores.",
						"Armazenar dados de transações financeiras.",
					],
					correctAnswer: 1,
				},
				{
					question: "Um ORM como o Drizzle ajuda principalmente a:",
					options: [
						"Melhorar a velocidade da base de dados.",
						"Traduzir código JavaScript/TypeScript para consultas SQL e adicionar segurança de tipos.",
						"Encriptar a base de dados local.",
						"Ligar-se a bases de dados na nuvem.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Que comando é utilizado para instalar a biblioteca base que permite a uma app Expo usar SQLite?",
					options: [
						"npm install sqlite3",
						"npx expo install drizzle-orm",
						"npm install react-native-sqlite-storage",
						"npx expo install expo-sqlite",
					],
					correctAnswer: 3,
				},
			],
		},
	],
};
