import type { CurriculumTopic } from "../../../../types/types";

export const conference20: CurriculumTopic = {
	id: "conf-20",
	title: "Conf. 20: Esquemas Drizzle II",
	content: [
		{ type: "heading", text: "Definição de Esquemas com Drizzle ORM II" },
		{
			type: "paragraph",
			text: "Objetivo: Aprofundar a definição de esquemas, aprendendo a aplicar restrições, valores padrão e a estabelecer relações entre tabelas para construir uma estrutura de dados robusta e relacional.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Restrições de Coluna: `notNull` e `unique`" },
		{
			type: "paragraph",
			text: "Podemos adicionar regras às nossas colunas para garantir a integridade dos dados. As mais comuns são:",
		},
		{
			type: "list",
			items: [
				"**`.notNull()`**: Garante que a coluna não pode conter valores nulos (`NULL`). É fundamental para campos obrigatórios como o email de um usuário.",
				"**`.unique()`**: Garante que cada valor nessa coluna seja único em toda a tabela. Perfeito para campos como email ou nome de usuário.",
			],
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  fullName: text('full_name').notNull(), // O nome completo é obrigatório
  email: text('email').notNull().unique(), // O email é obrigatório e único
});
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Valores Padrão: `default`" },
		{
			type: "paragraph",
			text: "A função `.default()` permite-nos especificar um valor que será inserido numa coluna se não for fornecido um explicitamente. É muito útil para campos como datas de criação ou estados iniciais.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { sqliteTable, text, integer, boolean } from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('tasks', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    description: text('description').notNull(),
    completed: boolean('completed').default(false), // Por padrão, uma tarefa não está concluída
    createdAt: text('created_at').default(new Date().toISOString()), // Data de criação padrão
});
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Estabelecendo Relações (One-to-Many)" },
		{
			type: "paragraph",
			text: "É aqui que o poder de um banco de dados relacional brilha. Vamos estabelecer uma relação onde um usuário pode ter muitas tarefas (`one-to-many`).",
		},
		{
			type: "paragraph",
			text: "Primeiro, adicionamos uma **chave estrangeira** à nossa tabela `tasks` que aponta para a tabela `users`.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// Em db/schema.ts
// (Certifique-se de que 'users' está definido antes de 'tasks')

export const tasks = sqliteTable('tasks', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    description: text('description').notNull(),
    completed: boolean('completed').default(false),

    // Chave estrangeira: Coluna para armazenar o ID do usuário proprietário da tarefa
    userId: integer('user_id').notNull().references(() => users.id),
});
`,
		},
		{
			type: "paragraph",
			text: "Em seguida, usamos a função `relations` do `drizzle-orm` para definir explicitamente esta relação. Isso permite que o Drizzle realize consultas complexas (JOINs) de maneira simples. Isso é definido fora das tabelas.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { relations } from 'drizzle-orm';
// ... (definições das tabelas users e tasks)

// Relação: Um usuário tem muitas tarefas
export const usersRelations = relations(users, ({ many }) => ({
    tasks: many(tasks),
}));

// Relação: Uma tarefa pertence a um usuário
export const tasksRelations = relations(tasks, ({ one }) => ({
    author: one(users, {
        fields: [tasks.userId],
        references: [users.id],
    }),
}));
`,
		},
		{
			type: "callout",
			alertType: "info",
			text: 'Essas definições de `relations` não alteram a estrutura do banco de dados SQL, mas dão ao Drizzle ORM o "conhecimento" para que possamos fazer consultas como "dê-me um usuário e todas as suas tarefas" facilmente.',
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Tipos `enum`" },
		{
			type: "paragraph",
			text: 'Às vezes, queremos que uma coluna aceite apenas um conjunto predefinido de valores (por exemplo, "baixa", "média", "alta"). Para isso, usamos `text` com a opção `enum`.',
		},
		{
			type: "code",
			language: "typescript",
			code: `
// db/schema.ts
export const tasks = sqliteTable('tasks', {
    // ... outras colunas
    priority: text('priority', { enum: ['baixa', 'media', 'alta'] }).default('media'),
});
`,
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Qual restrição de coluna garante que um campo não pode estar vazio?",
					options: [".unique()", ".required()", ".notNull()", ".mandatory()"],
					correctAnswer: 2,
				},
				{
					question:
						"Para estabelecer uma relação onde uma tarefa (`tasks`) pertence a um usuário (`users`), o que é adicionado à tabela `tasks`?",
					options: [
						"Uma chave primária que referencia users",
						"Um array de IDs de usuário",
						"Uma chave estrangeira (`references`) que aponta para o ID da tabela `users`",
						"Uma função `belongsTo`",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Se você quer que uma coluna `status` só possa ter os valores 'pendente', 'em_progresso' ou 'concluido', o que você usaria?",
					options: [
						"Um tipo `integer` com uma verificação",
						"Um tipo `text` com a opção `enum`",
						"Um tipo `boolean`",
						"Uma relação com uma tabela de status",
					],
					correctAnswer: 1,
				},
				{
					question: "A função `relations` do Drizzle é usada para...",
					options: [
						"Criar as tabelas SQL com chaves estrangeiras.",
						"Informar o ORM sobre as relações entre tabelas para facilitar as consultas.",
						"Validar os dados inseridos.",
						"Criar índices no banco de dados.",
					],
					correctAnswer: 1,
				},
			],
		},
	],
};
