import type { CurriculumTopic } from "../../../../types/types";

export const conference19: CurriculumTopic = {
	id: "conf-19",
	title: "Conf. 19: Esquemas Drizzle I",
	content: [
		{ type: "heading", text: "Definición de Esquemas con Drizzle ORM I" },
		{
			type: "paragraph",
			text: "Objetivo: Aprender los conceptos básicos de la definición de esquemas y tablas en Drizzle, incluyendo tipos de datos comunes y claves primarias, para estructurar la base de datos de nuestra aplicación.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. ¿Qué es un Esquema?" },
		{
			type: "paragraph",
			text: "Un esquema de base de datos es el plano de cómo se organizan los datos. Define las tablas, las columnas dentro de esas tablas, los tipos de datos que cada columna puede almacenar y las relaciones entre las tablas. Con Drizzle, definimos este plano directamente en nuestro código TypeScript.",
		},
		{
			type: "paragraph",
			text: "Toda la definición de nuestro esquema vivirá en el archivo que especificamos en `drizzle.config.ts`, que es `db/schema.ts`.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Definiendo nuestra Primera Tabla: `users`" },
		{
			type: "paragraph",
			text: "Vamos a crear una tabla para almacenar usuarios. Para ello, importamos las herramientas necesarias de `drizzle-orm/sqlite-core` y usamos la función `sqliteTable`.",
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
				"**`sqliteTable('users', ...)`**: Esta función crea una nueva tabla. El primer argumento (`'users'`) es el nombre que tendrá la tabla en la base de datos SQL. El segundo es un objeto que define las columnas.",
				"**`id: integer('id')`**: Define una columna llamada `id` de tipo entero. El texto `'id'` es el nombre de la columna en SQL.",
				"**`fullName: text('full_name')`**: Define una columna de texto llamada `full_name`.",
				"**`email: text('email')`**: Define una columna de texto llamada `email`.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Claves Primarias y `autoIncrement`" },
		{
			type: "paragraph",
			text: "Toda tabla necesita una forma de identificar unívocamente cada fila. Esto se logra con una **clave primaria** (`primaryKey`).",
		},
		{
			type: "list",
			items: [
				"**`.primaryKey()`**: Marca la columna `id` como la clave primaria de la tabla. Esto asegura que cada valor en esta columna sea único.",
				"**`{ autoIncrement: true }`**: Es una opción muy útil para las claves primarias numéricas. Le dice a la base de datos que genere automáticamente un nuevo número secuencial (1, 2, 3, ...) para cada nueva fila insertada. No tendremos que preocuparnos por asignar IDs manualmente.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Tipos de Datos Comunes en SQLite" },
		{
			type: "paragraph",
			text: "Drizzle proporciona funciones para los tipos de datos más comunes de SQLite:",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { sqliteTable, text, integer, real, blob, boolean } from 'drizzle-orm/sqlite-core';

export const products = sqliteTable('products', {
  id: integer('id').primaryKey(),
  name: text('name'),          // Para cadenas de texto
  price: real('price'),        // Para números con decimales (punto flotante)
  stock: integer('stock'),     // Para números enteros
  isAvailable: boolean('is_available'), // Para valores true/false
  // 'blob' se usa para datos binarios, pero es menos común en el día a día
});
`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Siempre es una buena práctica seguir la convención `snake_case` para los nombres de las columnas en SQL (ej. `full_name`), mientras que en nuestro código TypeScript usamos `camelCase` (ej. `fullName`). Drizzle maneja esta conversión por nosotros.",
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿En qué archivo se definen las tablas de la base de datos al usar Drizzle?",
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
						"¿Qué función de Drizzle se usa para definir una nueva tabla en un esquema de SQLite?",
					options: ["createTable", "defineTable", "sqliteTable", "table"],
					correctAnswer: 2,
				},
				{
					question:
						"Para crear una columna de ID que se genera automáticamente con cada nueva fila, ¿qué configuración se utiliza?",
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
						"Si necesitas almacenar un precio como 19.99, ¿qué tipo de dato de Drizzle para SQLite es el más adecuado?",
					options: ["integer", "text", "boolean", "real"],
					correctAnswer: 3,
				},
			],
		},
	],
};
