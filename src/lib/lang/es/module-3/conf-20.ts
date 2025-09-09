import type { CurriculumTopic } from "../../../../types/types";

export const conference20: CurriculumTopic = {
	id: "conf-20",
	title: "Conf. 20: Esquemas Drizzle II",
	content: [
		{ type: "heading", text: "Definición de Esquemas con Drizzle ORM II" },
		{
			type: "paragraph",
			text: "Objetivo: Profundizar en la definición de esquemas, aprendiendo a aplicar restricciones, valores por defecto y a establecer relaciones entre tablas para construir una estructura de datos robusta y relacional.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "1. Restricciones de Columna: `notNull` y `unique`",
		},
		{
			type: "paragraph",
			text: "Podemos añadir reglas a nuestras columnas para asegurar la integridad de los datos. Las más comunes son:",
		},
		{
			type: "list",
			items: [
				"**`.notNull()`**: Asegura que la columna no puede contener valores nulos (`NULL`). Es fundamental para campos obligatorios como el email de un usuario.",
				"**`.unique()`**: Garantiza que cada valor en esa columna sea único en toda la tabla. Perfecto para campos como el email o el nombre de usuario.",
			],
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  fullName: text('full_name').notNull(), // El nombre completo es obligatorio
  email: text('email').notNull().unique(), // El email es obligatorio y único
});
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Valores por Defecto: `default`" },
		{
			type: "paragraph",
			text: "La función `.default()` nos permite especificar un valor que se insertará en una columna si no se proporciona uno explícitamente. Es muy útil para campos como fechas de creación o estados iniciales.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { sqliteTable, text, integer, boolean } from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('tasks', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    description: text('description').notNull(),
    completed: boolean('completed').default(false), // Por defecto, una tarea no está completada
    createdAt: text('created_at').default(new Date().toISOString()), // Fecha de creación por defecto
});
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Estableciendo Relaciones (One-to-Many)" },
		{
			type: "paragraph",
			text: "Aquí es donde el poder de una base de datos relacional brilla. Vamos a establecer una relación donde un usuario puede tener muchas tareas (`one-to-many`).",
		},
		{
			type: "paragraph",
			text: "Primero, añadimos una **clave foránea** a nuestra tabla `tasks` que apunte a la tabla `users`.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// En db/schema.ts
// (Asegúrate de que 'users' esté definido antes que 'tasks')

export const tasks = sqliteTable('tasks', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    description: text('description').notNull(),
    completed: boolean('completed').default(false),

    // Clave foránea: Columna para almacenar el ID del usuario propietario de la tarea
    userId: integer('user_id').notNull().references(() => users.id),
});
`,
		},
		{
			type: "paragraph",
			text: "Luego, usamos la función `relations` de `drizzle-orm` para definir explícitamente esta relación. Esto le permite a Drizzle realizar consultas complejas (JOINs) de manera sencilla. Esto se define fuera de las tablas.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { relations } from 'drizzle-orm';
// ... (definiciones de tablas users y tasks)

// Relación: Un usuario tiene muchas tareas
export const usersRelations = relations(users, ({ many }) => ({
    tasks: many(tasks),
}));

// Relación: Una tarea pertenece a un usuario
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
			text: 'Estas definiciones de `relations` no cambian la estructura de la base de datos SQL, pero le dan a Drizzle ORM el "conocimiento" para que podamos hacer consultas como "dame un usuario y todas sus tareas" fácilmente.',
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Tipos `enum`" },
		{
			type: "paragraph",
			text: 'A veces queremos que una columna solo acepte un conjunto predefinido de valores (por ejemplo, "baja", "media", "alta"). Para esto usamos `text` con la opción `enum`.',
		},
		{
			type: "code",
			language: "typescript",
			code: `
// db/schema.ts
export const tasks = sqliteTable('tasks', {
    // ... otras columnas
    priority: text('priority', { enum: ['baja', 'media', 'alta'] }).default('media'),
});
`,
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Qué restricción de columna asegura que un campo no puede estar vacío?",
					options: [".unique()", ".required()", ".notNull()", ".mandatory()"],
					correctAnswer: 2,
				},
				{
					question:
						"Para establecer una relación donde una tarea (`tasks`) pertenece a un usuario (`users`), ¿qué se añade a la tabla `tasks`?",
					options: [
						"Una clave primaria que referencia a users",
						"Un array de IDs de usuario",
						"Una clave foránea (`references`) que apunta al ID de la tabla `users`",
						"Una función `belongsTo`",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Si quieres que una columna `status` solo pueda tener los valores 'pendiente', 'en_progreso' o 'completado', ¿qué utilizarías?",
					options: [
						"Un tipo `integer` con un check",
						"Un tipo `text` con la opción `enum`",
						"Un tipo `boolean`",
						"Una relación a una tabla de estados",
					],
					correctAnswer: 1,
				},
				{
					question: "La función `relations` de Drizzle se usa para...",
					options: [
						"Crear las tablas SQL con claves foráneas.",
						"Informar al ORM sobre las relaciones entre tablas para facilitar las consultas.",
						"Validar los datos insertados.",
						"Crear índices en la base de datos.",
					],
					correctAnswer: 1,
				},
			],
		},
	],
};
