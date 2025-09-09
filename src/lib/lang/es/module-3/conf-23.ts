import type { CurriculumTopic } from "../../../../types/types";

export const conference23: CurriculumTopic = {
	id: "conf-23",
	title: "Conf. 23: CRUD (Actualizar y Borrar)",
	content: [
		{ type: "heading", text: "Operaciones CRUD: Actualizar y Borrar Datos" },
		{
			type: "paragraph",
			text: "Objetivo: Completar el ciclo CRUD aprendiendo a modificar registros existentes con la operación de actualización y a eliminarlos permanentemente de la base de datos.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Actualizando Datos (UPDATE)" },
		{
			type: "paragraph",
			text: "Para modificar una o más filas que ya existen en una tabla, usamos el método `db.update()`.",
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
    // Primero, obtenemos la tarea para saber su estado actual
    const taskArray = await db.select().from(tasks).where(eq(tasks.id, taskId));
    if (taskArray.length === 0) {
      console.log('Tarea no encontrada');
      return;
    }
    const currentTask = taskArray[0];

    // Actualizamos la tarea, invirtiendo el valor de 'completed'
    const updatedTask = await db.update(tasks)
      .set({ completed: !currentTask.completed })
      .where(eq(tasks.id, taskId))
      .returning();

    console.log('Tarea actualizada:', updatedTask[0]);
  } catch (error) {
    console.error('Error actualizando la tarea:', error);
  }
}
`,
		},
		{
			type: "list",
			items: [
				"**`db.update(tasks)`**: Especifica que la operación de actualización se realizará en la tabla `tasks`.",
				"**`.set({ ... })`**: Recibe un objeto con las columnas y los nuevos valores que se deben aplicar a las filas que coincidan con la condición `where`.",
				"**`.where(eq(tasks.id, taskId))`**: Es la condición que determina **qué filas** se van a actualizar. Sin un `.where()`, ¡actualizarías todas las filas de la tabla!",
				"**`.returning()`**: Al igual que en `insert`, devuelve la fila actualizada.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Borrando Datos (DELETE)" },
		{
			type: "paragraph",
			text: "Para eliminar filas de una tabla, usamos el método `db.delete()`. Esta operación es permanente y debe usarse con cuidado.",
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
      console.log('Tarea eliminada:', deletedTask[0]);
    } else {
      console.log('No se encontró la tarea para eliminar.');
    }
  } catch (error) {
    console.error('Error eliminando la tarea:', error);
  }
}
`,
		},
		{
			type: "list",
			items: [
				"**`db.delete(tasks)`**: Indica que vamos a eliminar filas de la tabla `tasks`.",
				"**`.where(eq(tasks.id, taskId))`**: Es la condición crucial que especifica qué filas deben ser eliminadas.",
				"**¡Advertencia!**: Si omites la cláusula `.where()` en una operación de borrado, Drizzle eliminará **TODAS LAS FILAS** de la tabla. ¡Siempre asegúrate de tener una condición `where` a menos que realmente quieras vaciar la tabla!",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Breve Introducción a las Transacciones" },
		{
			type: "paragraph",
			text: "¿Qué pasa si necesitas realizar varias operaciones de base de datos y quieres que todas tengan éxito o que ninguna lo tenga? Por ejemplo, transferir dinero implica restar de una cuenta y sumar a otra. Si una de las dos operaciones falla, la base de datos quedaría en un estado inconsistente.",
		},
		{
			type: "paragraph",
			text: "Una **transacción** agrupa múltiples operaciones como una sola unidad atómica. Drizzle lo maneja con `db.transaction(async (tx) => { ... })`.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
await db.transaction(async (tx) => {
  // Todas las operaciones dentro de este bloque usan 'tx' en lugar de 'db'
  await tx.update(accounts).set({ balance: 100 }).where(eq(accounts.id, 1));
  await tx.update(accounts).set({ balance: 200 }).where(eq(accounts.id, 2));

  // Si alguna de estas operaciones falla, Drizzle deshará automáticamente
  // todas las operaciones anteriores dentro de la transacción.
});
`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "Las transacciones son un concepto más avanzado, pero es bueno saber que existen para garantizar la consistencia de los datos en operaciones complejas.",
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Qué método se utiliza para modificar un registro existente en Drizzle?",
					options: ["db.modify()", "db.change()", "db.update()", "db.set()"],
					correctAnswer: 2,
				},
				{
					question:
						"En una operación `db.update(tasks).set({ ... })`, ¿qué sucede si omites la cláusula `.where()`?",
					options: [
						"Drizzle lanza un error.",
						"No se actualiza ninguna fila.",
						"Se actualiza solo la primera fila.",
						"Se actualizan todas las filas de la tabla.",
					],
					correctAnswer: 3,
				},
				{
					question: "El método para eliminar una fila de una tabla es:",
					options: ["db.remove()", "db.destroy()", "db.erase()", "db.delete()"],
					correctAnswer: 3,
				},
				{
					question:
						"¿Para qué se utiliza una transacción en el contexto de una base de datos?",
					options: [
						"Para agrupar múltiples operaciones como una sola unidad atómica, asegurando que todas tengan éxito o ninguna lo tenga.",
						"Para acelerar las consultas de lectura.",
						"Para hacer una copia de seguridad de la base de datos.",
						"Para encriptar los datos antes de guardarlos.",
					],
					correctAnswer: 0,
				},
			],
		},
	],
};
