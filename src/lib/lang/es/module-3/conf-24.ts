import type { CurriculumTopic } from "../../../../types/types";

export const conference24: CurriculumTopic = {
	id: "conf-24",
	title: "Conf. 24: Seeding de BD",
	content: [
		{ type: "heading", text: "Seeding de la Base de Datos Local" },
		{
			type: "paragraph",
			text: 'Objetivo: Entender qué es el "seeding" de la base de datos, por qué es una práctica esencial durante el desarrollo y cómo implementar un script para poblar nuestra base de datos local con datos de prueba realistas.',
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "1. ¿Qué es el Seeding y por qué es Importante?",
		},
		{
			type: "paragraph",
			text: 'El **seeding** (o "sembrado") de una base de datos es el proceso de poblarla con un conjunto inicial de datos. En lugar de añadir manualmente usuarios, tareas o productos cada vez que borramos la base de datos o empezamos desde cero, un script de seeding lo hace por nosotros de forma automática y consistente.',
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "BoltIcon",
					title: "Acelera el Desarrollo",
					text: "Permite empezar a trabajar en la UI y la lógica de negocio inmediatamente, sin tener que pasar tiempo creando datos de prueba manualmente a través de la interfaz.",
				},
				{
					icon: "RectangleStackIcon",
					title: "Datos Consistentes",
					text: "Asegura que todos los desarrolladores del equipo trabajen con el mismo conjunto de datos inicial, evitando inconsistencias.",
				},
				{
					icon: "SparklesIcon",
					title: "Pruebas Realistas",
					text: "Facilita la prueba de la aplicación con una cantidad de datos similar a la de producción, ayudando a identificar problemas de rendimiento o de UI con listas largas.",
				},
				{
					icon: "ArrowPathIcon",
					title: "Estado Reiniciable",
					text: "Permite restablecer la base de datos a un estado conocido y limpio en cualquier momento, lo cual es invaluable para la depuración.",
				},
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Creando un Script de Seeding" },
		{
			type: "paragraph",
			text: "Podemos crear una función o un script simple que se encargue de este proceso. Este script típicamente realiza dos acciones: primero, limpia las tablas para evitar duplicados y, segundo, inserta los nuevos datos.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { db } from './db';
import { users, tasks } from './db/schema';

export async function seedDatabase() {
  try {
    console.log('Limpiando la base de datos...');
    // Limpia las tablas en el orden correcto para evitar problemas con claves foráneas
    await db.delete(tasks);
    await db.delete(users);

    console.log('Insertando datos de prueba...');

    // Crear usuarios
    const insertedUsers = await db.insert(users).values([
      { fullName: 'Alice Johnson', email: 'alice@example.com' },
      { fullName: 'Bob Williams', email: 'bob@example.com' },
    ]).returning();

    const alice = insertedUsers.find(u => u.email === 'alice@example.com');
    const bob = insertedUsers.find(u => u.email === 'bob@example.com');

    if (!alice || !bob) {
      throw new Error('No se pudieron crear los usuarios de prueba');
    }

    // Crear tareas para los usuarios
    await db.insert(tasks).values([
      { description: 'Comprar leche', userId: alice.id },
      { description: 'Pasear al perro', userId: alice.id, completed: true },
      { description: 'Terminar el informe del proyecto', userId: bob.id },
      { description: 'Llamar al dentista', userId: bob.id },
    ]);

    console.log('¡Seeding completado con éxito!');

  } catch (error) {
    console.error('Error durante el seeding:', error);
  }
}
`,
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Al eliminar datos, es importante hacerlo en el orden inverso a las dependencias. Como las tareas (`tasks`) dependen de los usuarios (`users`), debemos eliminar las tareas primero y luego los usuarios.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Ejecutando el Script de Seeding" },
		{
			type: "paragraph",
			text: "¿Cuándo y cómo ejecutamos esta función `seedDatabase`? Hay varias estrategias, pero una común en el desarrollo móvil es ejecutarla condicionalmente al inicio de la aplicación, por ejemplo, solo en modo de desarrollo o cuando la base de datos está vacía.",
		},
		{
			type: "paragraph",
			text: "Podríamos añadir un botón en una pantalla de desarrollo oculta o ejecutarlo una vez después de aplicar las migraciones.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { useEffect } from 'react';
import { Button } from 'react-native';
import { seedDatabase } from './db/seed'; // Importa tu función

// En algún componente de tu app (preferiblemente uno de desarrollo)
const DevScreen = () => {

  // Opcional: Ejecutar el seeding al montar el componente
  // useEffect(() => {
  //   seedDatabase();
  // }, []);

  return (
    <Button title="Poblar Base de Datos" onPress={seedDatabase} />
  );
};
`,
		},
		{ type: "divider" },

		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Cuál NO es un beneficio del seeding de una base de datos?",
					options: [
						"Acelerar el desarrollo al tener datos listos.",
						"Asegurar que la base de datos de producción esté siempre vacía.",
						"Permitir pruebas con datos consistentes y realistas.",
						"Facilitar el restablecimiento de la base de datos a un estado conocido.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Al crear un script de seeding, ¿qué es lo primero que se suele hacer para evitar datos duplicados?",
					options: [
						"Insertar los nuevos datos.",
						"Hacer una copia de seguridad de las tablas.",
						"Limpiar (eliminar los datos de) las tablas existentes.",
						"Crear nuevas tablas.",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Si la tabla `comments` tiene una clave foránea que apunta a `posts`, ¿en qué orden debes limpiar las tablas?",
					options: [
						"No importa el orden.",
						"Primero `posts`, luego `comments`.",
						"Primero `comments`, luego `posts`.",
						"Debes limpiarlas al mismo tiempo en una transacción.",
					],
					correctAnswer: 2,
				},
				{
					question: "¿Cuándo es más útil ejecutar un script de seeding?",
					options: [
						"Solo una vez, en producción.",
						"Cada vez que un usuario inicia sesión.",
						"Durante el desarrollo, para tener datos de prueba consistentes.",
						"Antes de cada operación de lectura.",
					],
					correctAnswer: 2,
				},
			],
		},
	],
};
