import type { CurriculumTopic } from "../../../../types/types";

export const conference19: CurriculumTopic = {
	id: "conf-19",
	title: "Conf. 19: Esquemas Drizzle I",
	content: [
		{ type: "heading", text: "Definição de Esquemas com Drizzle ORM I" },
		{
			type: "paragraph",
			text: "Objetivo: Aprender os conceitos básicos da definição de esquemas e tabelas no Drizzle, incluindo tipos de dados comuns e chaves primárias, para estruturar o banco de dados da nossa aplicação.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. O que é um Esquema?" },
		{
			type: "paragraph",
			text: "Um esquema de banco de dados é o plano de como os dados são organizados. Ele define as tabelas, as colunas dentro dessas tabelas, os tipos de dados que cada coluna pode armazenar e as relações entre as tabelas. Com o Drizzle, definimos este plano diretamente no nosso código TypeScript.",
		},
		{
			type: "paragraph",
			text: "Toda a definição do nosso esquema viverá no arquivo que especificamos no `drizzle.config.ts`, que é `db/schema.ts`.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Definindo a nossa Primeira Tabela: `users`" },
		{
			type: "paragraph",
			text: "Vamos criar uma tabela para armazenar usuários. Para isso, importamos as ferramentas necessárias de `drizzle-orm/sqlite-core` e usamos a função `sqliteTable`.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// db/schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  fullName: text('full_name'),
  email: text('email').unique(),
});
`,
		},
		{
			type: "list",
			items: [
				"**`sqliteTable('users', ...)`**: Esta função cria uma nova tabela. O primeiro argumento (`'users'`) é o nome que a tabela terá no banco de dados SQL. O segundo é um objeto que define as colunas.",
				"**`id: integer('id')`**: Define uma coluna chamada `id` do tipo inteiro. O texto `'id'` é o nome da coluna em SQL.",
				"**`fullName: text('full_name')`**: Define uma coluna de texto chamada `full_name`.",
				"**`email: text('email')`**: Define uma coluna de texto chamada `email`.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Chaves Primárias e `autoIncrement`" },
		{
			type: "paragraph",
			text: "Toda tabela precisa de uma forma de identificar univocamente cada linha. Isso é alcançado com uma **chave primária** (`primaryKey`).",
		},
		{
			type: "list",
			items: [
				"**`.primaryKey()`**: Marca a coluna `id` como a chave primária da tabela. Isso garante que cada valor nesta coluna seja único.",
				"**`{ autoIncrement: true }`**: É uma opção muito útil para chaves primárias numéricas. Diz ao banco de dados para gerar automaticamente um novo número sequencial (1, 2, 3, ...) para cada nova linha inserida. Não teremos que nos preocupar em atribuir IDs manualmente.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Tipos de Dados Comuns no SQLite" },
		{
			type: "paragraph",
			text: "O Drizzle fornece funções para os tipos de dados mais comuns do SQLite:",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { sqliteTable, text, integer, real, blob, boolean } from 'drizzle-orm/sqlite-core';

export const products = sqliteTable('products', {
  id: integer('id').primaryKey(),
  name: text('name'),          // Para strings de texto
  price: real('price'),        // Para números com casas decimais (ponto flutuante)
  stock: integer('stock'),     // Para números inteiros
  isAvailable: boolean('is_available'), // Para valores true/false
  // 'blob' é usado para dados binários, mas é menos comum no dia a dia
});
`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "É sempre uma boa prática seguir a convenção `snake_case` para os nomes das colunas em SQL (ex. `full_name`), enquanto no nosso código TypeScript usamos `camelCase` (ex. `fullName`). O Drizzle lida com essa conversão por nós.",
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Em que arquivo as tabelas do banco de dados são definidas ao usar o Drizzle?",
					options: [
						"drizzle.config.ts",
						"db/schema.ts",
						"package.json",
						"App.tsx",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Qual função do Drizzle é usada para definir uma nova tabela em um esquema SQLite?",
					options: ["createTable", "defineTable", "sqliteTable", "table"],
					correctAnswer: 2,
				},
				{
					question:
						"Para criar uma coluna de ID que é gerada automaticamente a cada nova linha, qual configuração é utilizada?",
					options: [
						"primaryKey({ autoGenerate: true })",
						"primaryKey({ sequence: true })",
						"primaryKey({ autoIncrement: true })",
						"primaryKey()",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Se você precisa armazenar um preço como 19.99, qual tipo de dado do Drizzle para SQLite é o mais adequado?",
					options: ["integer", "text", "boolean", "real"],
					correctAnswer: 3,
				},
			],
		},
	],
};
