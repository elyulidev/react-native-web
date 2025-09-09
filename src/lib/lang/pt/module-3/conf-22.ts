import type { CurriculumTopic } from "../../../../types/types";

export const conference22: CurriculumTopic = {
	id: "conf-22",
	title: "Conf. 22: CRUD (Criar e Ler)",
	content: [
		{ type: "heading", text: "Operações CRUD: Criar e Ler Dados" },
		{
			type: "paragraph",
			text: "Objetivo: Aprender a realizar as duas primeiras operações fundamentais do CRUD (Create, Read, Update, Delete) utilizando o Drizzle ORM para inserir novos dados no banco de dados e consultá-los.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "1. Estabelecendo a Conexão com o Banco de Dados",
		},
		{
			type: "paragraph",
			text: "Antes de podermos interagir com o banco de dados, precisamos de uma instância do cliente Drizzle. É uma boa prática criar um arquivo centralizado para isso, por exemplo, `db/index.ts`.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// db/index.ts
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from './schema'; // Importa tudo do seu schema

// Abre o banco de dados
const expoDb = SQLite.openDatabaseSync('db.db');

// Cria a instância do Drizzle, passando a conexão e o schema
export const db = drizzle(expoDb, { schema });
`,
		},
		{
			type: "paragraph",
			text: "Agora, podemos importar esta instância `db` em qualquer parte da nossa aplicação para realizar operações no banco de dados.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Criando Dados (INSERT)" },
		{
			type: "paragraph",
			text: "Para inserir uma nova linha numa tabela, usamos o método `db.insert()`.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { db } from './db';
import { users } from './db/schema';

async function createUser() {
  try {
    const newUser = {
      fullName: 'Jane Doe',
      email: 'jane.doe@example.com',
    };

    // O método insert retorna um array com os resultados
    const result = await db.insert(users).values(newUser).returning();

    console.log('Usuário criado:', result[0]);
    // Saída: { id: 1, fullName: 'Jane Doe', email: 'jane.doe@example.com' }
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
}
`,
		},
		{
			type: "list",
			items: [
				"**`db.insert(users)`**: Dizemos ao Drizzle que queremos inserir na tabela `users`.",
				"**`.values(newUser)`**: Passamos um objeto (ou um array de objetos) com os dados a serem inseridos. As chaves do objeto devem corresponder aos nomes das propriedades no seu `schema.ts`.",
				"**`.returning()`**: Este método é muito útil. Ele pede ao Drizzle que, após a inserção, retorne a linha completa que acabou de ser criada, incluindo o `id` autogerado.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Lendo Dados (SELECT)" },
		{
			type: "paragraph",
			text: "Para ler dados, usamos o método `db.select()`. Por padrão, se não especificarmos colunas, ele selecionará todas (`SELECT *`).",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { db } from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';

async function getUsers() {
  try {
    // 1. Obter todos os usuários
    const allUsers = await db.select().from(users);
    console.log('Todos os usuários:', allUsers);

    // 2. Obter um usuário por ID
    const userId = 1;
    const userById = await db.select().from(users).where(eq(users.id, userId));
    if (userById.length > 0) {
      console.log('Usuário com ID 1:', userById[0]);
    }
  } catch (error) {
    console.error('Erro ao ler usuários:', error);
  }
}
`,
		},
		{
			type: "list",
			items: [
				"**`db.select().from(users)`**: Constrói uma consulta `SELECT * FROM users`.",
				"**`.where()`**: Permite adicionar condições para filtrar os resultados. É o equivalente à cláusula `WHERE` do SQL.",
				'**`eq(users.id, userId)`**: `eq` é um "comparador" do Drizzle que significa "equals" (igual a). Estamos a dizer: "onde a coluna `users.id` seja igual ao valor da variável `userId`". O Drizzle fornece muitos outros comparadores (`gt`, `lt`, `like`, etc.).',
			],
		},
		{
			type: "callout",
			alertType: "info",
			text: "O Drizzle ORM é totalmente tipado. Quando você executa `await db.select().from(users)`, o TypeScript saberá que `allUsers` é um array de objetos com a forma `{ id: number, fullName: string, email: string }`. Isso evita muitos erros!",
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Qual método do Drizzle é utilizado para inserir novas linhas numa tabela?",
					options: ["db.create()", "db.add()", "db.insert()", "db.new()"],
					correctAnswer: 2,
				},
				{
					question:
						"Numa operação de inserção, para que serve o método `.returning()`?",
					options: [
						"Para desfazer a inserção se houver um erro.",
						"Para retornar a linha completa que acabou de ser criada, incluindo o ID.",
						"Para verificar se a inserção foi bem-sucedida.",
						"Para especificar quais colunas inserir.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Como se obtêm todos os registos de uma tabela chamada `products`?",
					options: [
						"`db.query(products)`",
						"`db.select().from(products)`",
						"`db.getAll(products)`",
						"`db.fetch(products)`",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Para filtrar resultados numa consulta `select`, que método e comparador usaria para encontrar um usuário onde `email` seja 'test@test.com'?",
					options: [
						".filter(users.email = 'test@test.com')",
						".where(eq(users.email, 'test@test.com'))",
						".find(users.email === 'test@test.com')",
						".where(users.email, 'test@test.com')",
					],
					correctAnswer: 1,
				},
			],
		},
	],
};
