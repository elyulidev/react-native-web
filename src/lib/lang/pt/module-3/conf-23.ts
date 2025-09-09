import type { CurriculumTopic } from "../../../../types/types";

export const conference23: CurriculumTopic = {
	id: "conf-23",
	title: "Conf. 23: CRUD (Atualizar e Excluir)",
	content: [
		{ type: "heading", text: "Operações CRUD: Atualizar e Excluir Dados" },
		{
			type: "paragraph",
			text: "Objetivo: Completar o ciclo CRUD aprendendo a modificar registos existentes com a operação de atualização e a eliminá-los permanentemente da base de dados.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Atualizando Dados (UPDATE)" },
		{
			type: "paragraph",
			text: "Para modificar uma ou mais linhas que já existem numa tabela, usamos o método `db.update()`.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { db } from './db';
import { tasks } from './db/schema';
import { eq } from 'drizzle-orm';

async function toggleTaskCompletion(taskId: number) {
  try {
    // Primeiro, obtemos a tarefa para saber o seu estado atual
    const taskArray = await db.select().from(tasks).where(eq(tasks.id, taskId));
    if (taskArray.length === 0) {
      console.log('Tarefa não encontrada');
      return;
    }
    const currentTask = taskArray[0];

    // Atualizamos a tarefa, invertendo o valor de 'completed'
    const updatedTask = await db.update(tasks)
      .set({ completed: !currentTask.completed })
      .where(eq(tasks.id, taskId))
      .returning();

    console.log('Tarefa atualizada:', updatedTask[0]);
  } catch (error) {
    console.error('Erro ao atualizar a tarefa:', error);
  }
}
`,
		},
		{
			type: "list",
			items: [
				"**`db.update(tasks)`**: Especifica que a operação de atualização será realizada na tabela `tasks`.",
				"**`.set({ ... })`**: Recebe um objeto com as colunas e os novos valores que devem ser aplicados às linhas que correspondem à condição `where`.",
				"**`.where(eq(tasks.id, taskId))`**: É a condição que determina **quais linhas** serão atualizadas. Sem um `.where()`, você atualizaria todas as linhas da tabela!",
				"**`.returning()`**: Tal como no `insert`, retorna a linha atualizada.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Excluindo Dados (DELETE)" },
		{
			type: "paragraph",
			text: "Para eliminar linhas de uma tabela, usamos o método `db.delete()`. Esta operação é permanente e deve ser usada com cuidado.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { db } from './db';
import { tasks } from './db/schema';
import { eq } from 'drizzle-orm';

async function deleteTask(taskId: number) {
  try {
    const deletedTask = await db.delete(tasks)
      .where(eq(tasks.id, taskId))
      .returning();

    if (deletedTask.length > 0) {
      console.log('Tarefa eliminada:', deletedTask[0]);
    } else {
      console.log('Não foi encontrada a tarefa para eliminar.');
    }
  } catch (error) {
    console.error('Erro ao eliminar a tarefa:', error);
  }
}
`,
		},
		{
			type: "list",
			items: [
				"**`db.delete(tasks)`**: Indica que vamos eliminar linhas da tabela `tasks`.",
				"**`.where(eq(tasks.id, taskId))`**: É a condição crucial que especifica quais linhas devem ser eliminadas.",
				"**Atenção!**: Se omitir a cláusula `.where()` numa operação de exclusão, o Drizzle eliminará **TODAS AS LINHAS** da tabela. Certifique-se sempre de ter uma condição `where`, a menos que realmente queira esvaziar a tabela!",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Breve Introdução às Transações" },
		{
			type: "paragraph",
			text: "O que acontece se precisar de realizar várias operações na base de dados e quiser que todas sejam bem-sucedidas ou que nenhuma o seja? Por exemplo, transferir dinheiro implica subtrair de uma conta e adicionar a outra. Se uma das duas operações falhar, a base de dados ficaria num estado inconsistente.",
		},
		{
			type: "paragraph",
			text: "Uma **transação** agrupa múltiplas operações como uma única unidade atômica. O Drizzle lida com isto com `db.transaction(async (tx) => { ... })`.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
await db.transaction(async (tx) => {
  // Todas as operações dentro deste bloco usam 'tx' em vez de 'db'
  await tx.update(accounts).set({ balance: 100 }).where(eq(accounts.id, 1));
  await tx.update(accounts).set({ balance: 200 }).where(eq(accounts.id, 2));

  // Se alguma destas operações falhar, o Drizzle desfaz automaticamente
  // todas as operações anteriores dentro da transação.
});
`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "As transações são um conceito mais avançado, mas é bom saber que existem para garantir a consistência dos dados em operações complexas.",
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Qual método é utilizado para modificar um registo existente no Drizzle?",
					options: ["db.modify()", "db.change()", "db.update()", "db.set()"],
					correctAnswer: 2,
				},
				{
					question:
						"Numa operação `db.update(tasks).set({ ... })`, o que acontece se omitir a cláusula `.where()`?",
					options: [
						"O Drizzle lança um erro.",
						"Nenhuma linha é atualizada.",
						"Apenas a primeira linha é atualizada.",
						"Todas as linhas da tabela são atualizadas.",
					],
					correctAnswer: 3,
				},
				{
					question: "O método para eliminar uma linha de uma tabela é:",
					options: ["db.remove()", "db.destroy()", "db.erase()", "db.delete()"],
					correctAnswer: 3,
				},
				{
					question:
						"Para que é utilizada uma transação no contexto de uma base de dados?",
					options: [
						"Para agrupar múltiplas operações como uma única unidade atômica, garantindo que todas sejam bem-sucedidas ou nenhuma o seja.",
						"Para acelerar as consultas de leitura.",
						"Para fazer uma cópia de segurança da base de dados.",
						"Para encriptar os dados antes de os guardar.",
					],
					correctAnswer: 0,
				},
			],
		},
	],
};
