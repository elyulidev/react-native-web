import type { CurriculumTopic } from "../../../../types/types";

export const conference18: CurriculumTopic = {
	id: "conf-18",
	title: "Conf. 18: Drizzle ORM e Kit",
	content: [
		{ type: "heading", text: "Configuração do Drizzle ORM e Drizzle Kit" },
		{
			type: "paragraph",
			text: "Objetivo: Instalar e configurar o Drizzle ORM e o Drizzle Kit para um projeto Expo com um banco de dados SQLite, estabelecendo as bases para o gerenciamento de dados locais.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Instalação das Bibliotecas Necessárias" },
		{
			type: "paragraph",
			text: "Para trabalhar com o Drizzle ORM e o Expo SQLite, precisaremos instalar dois pacotes principais do Drizzle, além do `expo-sqlite` (que deveríamos ter instalado na conferência anterior).",
		},
		{
			type: "list",
			items: [
				"**`drizzle-orm`**: Este é o Object-Relational Mapper (ORM) principal. É uma dependência de produção que nos permite interagir com o banco de dados de maneira tipada.",
				"**`drizzle-kit`**: Esta é uma ferramenta de desenvolvimento (`-D`) utilizada para tarefas como a geração de migrações e o gerenciamento de esquemas.",
			],
		},
		{
			type: "code",
			language: "bash",
			code: `npm install drizzle-orm\nnpm install -D drizzle-kit`,
		},
		{
			type: "paragraph",
			text: "Também devemos garantir que o `expo-sqlite` esteja instalado:",
		},
		{ type: "code", language: "bash", code: "npx expo install expo-sqlite" },
		{
			type: "callout",
			alertType: "tip",
			text: "Após a instalação, você pode verificar as versões no seu arquivo `package.json`.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Configuração do `drizzle.config.ts`" },
		{
			type: "paragraph",
			text: "O arquivo `drizzle.config.ts` é crucial, pois contém todas as informações que o Drizzle Kit precisa para entender como interagir com seu banco de dados. Você deve criá-lo na raiz do seu projeto.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  driver: 'expo', // Importante para o Expo
  schema: './db/schema.ts', // Caminho para o seu arquivo de esquema
  out: './drizzle', // Pasta onde as migrações serão salvas
});
`,
		},
		{
			type: "list",
			items: [
				"**`dialect`**: Define o tipo de banco de dados (no nosso caso, `sqlite`).",
				"**`driver`**: Especifica o driver, que para o Expo é `expo`.",
				"**`schema`**: O caminho para o arquivo donde você definirá as tabelas do seu banco de dados.",
				"**`out`**: A pasta onde o Drizzle Kit gerará os arquivos de migração SQL.",
			],
		},
		{
			type: "paragraph",
			text: "Certifique-se de criar as pastas e o arquivo mencionados, por exemplo, `db/schema.ts`.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Criação de Scripts NPM" },
		{
			type: "paragraph",
			text: "Para simplificar a execução dos comandos do Drizzle Kit, nós os adicionamos como scripts no nosso `package.json`.",
		},
		{
			type: "code",
			language: "json",
			code: `
"scripts": {
  "start": "expo start",
  "android": "expo run:android",
  "ios": "expo run:ios",
  "web": "expo start --web",
  "generate": "drizzle-kit generate",
  "migrate": "drizzle-kit migrate",
  "studio": "drizzle-kit studio"
},
`,
		},
		{
			type: "list",
			items: [
				"**`generate`**: Executa `npx drizzle-kit generate`. Usaremos para criar migrações com base nas alterações do nosso esquema.",
				"**`migrate`**: Executa `npx drizzle-kit migrate`. Este comando aplica as migrações ao banco de dados (mais útil para desenvolvimento com bancos de dados remotos; no Expo, faremos isso em tempo de execução).",
				"**`studio`**: Executa `npx drizzle-kit studio`. Inicia uma interface visual para explorar nosso banco de dados local.",
			],
		},
		{
			type: "paragraph",
			text: "Agora você pode executar `npm run generate` ou `npm run studio` no seu terminal.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "4. Considerações de Desenvolvimento vs. Produção",
		},
		{
			type: "paragraph",
			text: "É importante entender como gerenciamos o banco de dados nos diferentes ambientes:",
		},
		{
			type: "twoColumn",
			columns: [
				{
					title: "Desenvolvimento",
					content: [
						"`drizzle-kit` é uma dependência de desenvolvimento (`-D`), não é incluído no aplicativo final.",
						"Usamos `npm run generate` para criar migrações sempre que alteramos o esquema.",
						"As migrações são aplicadas em tempo de execução ao iniciar o aplicativo.",
						"O Drizzle Studio (`npm run studio`) é nossa ferramenta para depurar e visualizar os dados.",
					],
				},
				{
					title: "Produção",
					content: [
						"`drizzle-orm` é uma dependência de produção, essencial para o funcionamento do aplicativo.",
						"As migrações devem ser aplicadas automaticamente quando o usuário abre o aplicativo pela primeira vez ou o atualiza.",
						"Não se deve armazenar informações altamente sensíveis no banco de dados local sem criptografia.",
					],
				},
			],
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Qual pacote do Drizzle é uma dependência de desenvolvimento e é usado para gerar migrações?",
					options: [
						"drizzle-orm",
						"drizzle-kit",
						"expo-drizzle",
						"sqlite-drizzle",
					],
					correctAnswer: 1,
				},
				{
					question:
						"No `drizzle.config.ts`, qual propriedade especifica a pasta onde os arquivos de migração serão salvos?",
					options: ["schema", "driver", "dialect", "out"],
					correctAnswer: 3,
				},
				{
					question:
						"Qual script npm você usaria para iniciar la interface visual do Drizzle para o seu banco de dados?",
					options: [
						"npm run generate",
						"npm run migrate",
						"npm run studio",
						"npm run start",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Para usar o Drizzle com o Expo, qual valor a propriedade `driver` deve ter na configuração?",
					options: ["sqlite", "expo-sqlite", "expo", "react-native"],
					correctAnswer: 2,
				},
			],
		},
	],
};
