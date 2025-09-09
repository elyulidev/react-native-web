import type { CurriculumTopic } from "../../../../types/types";

export const conference22: CurriculumTopic = {
	id: "conf-22",
	title: "Conf. 22: CRUD (Crear y Leer)",
	content: [
		{ type: "heading", text: "Operaciones CRUD: Crear y Leer Datos" },
		{
			type: "paragraph",
			text: "Objetivo: Aprender a realizar las dos primeras operaciones fundamentales de CRUD (Create, Read, Update, Delete) utilizando Drizzle ORM para insertar nuevos datos en la base de datos y consultarlos.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "1. Estableciendo la Conexión a la Base de Datos",
		},
		{
			type: "paragraph",
			text: "Antes de poder interactuar con la base de datos, necesitamos una instancia de cliente de Drizzle. Es una buena práctica crear un archivo centralizado para esto, por ejemplo, `db/index.ts`.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// db/index.ts
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from './schema'; // Importa todo desde tu schema

// Abre la base de datos
const expoDb = SQLite.openDatabaseSync('db.db');

// Crea la instancia de Drizzle, pasando la conexión y el schema
export const db = drizzle(expoDb, { schema });
`,
		},
		{
			type: "paragraph",
			text: "Ahora, podemos importar esta instancia `db` en cualquier parte de nuestra aplicación para realizar operaciones en la base de datos.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Creando Datos (INSERT)" },
		{
			type: "paragraph",
			text: "Para insertar una nueva fila en una tabla, usamos el método `db.insert()`.",
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

    // El método insert devuelve un array con los resultados
    const result = await db.insert(users).values(newUser).returning();

    console.log('Usuario creado:', result[0]);
    // Salida: { id: 1, fullName: 'Jane Doe', email: 'jane.doe@example.com' }
  } catch (error) {
    console.error('Error creando usuario:', error);
  }
}
`,
		},
		{
			type: "list",
			items: [
				"**`db.insert(users)`**: Le decimos a Drizzle que queremos insertar en la tabla `users`.",
				"**`.values(newUser)`**: Pasamos un objeto (o un array de objetos) con los datos a insertar. Las claves del objeto deben coincidir con los nombres de las propiedades en tu `schema.ts`.",
				"**`.returning()`**: Este método es muy útil. Le pide a Drizzle que, después de insertar, devuelva la fila completa que se acaba de crear, incluyendo el `id` autogenerado.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Leyendo Datos (SELECT)" },
		{
			type: "paragraph",
			text: "Para leer datos, usamos el método `db.select()`. Por defecto, si no especificamos columnas, seleccionará todas (`SELECT *`).",
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
    // 1. Obtener todos los usuarios
    const allUsers = await db.select().from(users);
    console.log('Todos los usuarios:', allUsers);

    // 2. Obtener un usuario por ID
    const userId = 1;
    const userById = await db.select().from(users).where(eq(users.id, userId));
    if (userById.length > 0) {
      console.log('Usuario con ID 1:', userById[0]);
    }
  } catch (error) {
    console.error('Error leyendo usuarios:', error);
  }
}
`,
		},
		{
			type: "list",
			items: [
				"**`db.select().from(users)`**: Construye una consulta `SELECT * FROM users`.",
				"**`.where()`**: Permite añadir condiciones para filtrar los resultados. Es el equivalente a la cláusula `WHERE` de SQL.",
				'**`eq(users.id, userId)`**: `eq` es un "comparador" de Drizzle que significa "equals" (igual a). Estamos diciendo: "donde la columna `users.id` sea igual al valor de la variable `userId`". Drizzle proporciona muchos otros comparadores (`gt`, `lt`, `like`, etc.).',
			],
		},
		{
			type: "callout",
			alertType: "info",
			text: "Drizzle ORM es totalmente tipado. Cuando ejecutes `await db.select().from(users)`, TypeScript sabrá que `allUsers` es un array de objetos con la forma `{ id: number, fullName: string, email: string }`. ¡Esto evita muchos errores!",
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Qué método de Drizzle se utiliza para insertar nuevas filas en una tabla?",
					options: ["db.create()", "db.add()", "db.insert()", "db.new()"],
					correctAnswer: 2,
				},
				{
					question:
						"En una operación de inserción, ¿para qué sirve el método `.returning()`?",
					options: [
						"Para deshacer la inserción si hay un error.",
						"Para devolver la fila completa que se acaba de crear, incluyendo el ID.",
						"Para comprobar si la inserción fue exitosa.",
						"Para especificar qué columnas insertar.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"¿Cómo se obtienen todos los registros de una tabla llamada `products`?",
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
						"Para filtrar resultados en una consulta `select`, ¿qué método y comparador usarías para encontrar un usuario donde `email` sea 'test@test.com'?",
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
