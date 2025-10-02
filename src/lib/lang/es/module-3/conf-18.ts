import type { CurriculumTopic } from "@/types/types";

export const conference18: CurriculumTopic = {
	id: "conf-18",
	title: "Conf. 18: Drizzle ORM y Kit",
	content: [
		{ type: "heading", text: "Primeros Pasos con Drizzle y Expo" },
		{
			type: "paragraph",
			text: "Esta guía asume familiaridad con Expo SQLite, una biblioteca que proporciona acceso a una base de datos que se puede consultar a través de una API de SQLite.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "Paso 1: Configurar un proyecto desde una plantilla de Expo",
		},
		{
			type: "code",
			language: "bash",
			code: "npx create-expo-app --template blank-typescript\npnpm create expo-app --template blank-typescript",
		},

		{ type: "subtitle", text: "Estructura de archivos básica" },
		{
			type: "paragraph",
			text: "Después de instalar la plantilla y agregar la carpeta `db`, encontrarás el siguiente contenido: En el archivo `db/schema.ts` con las definiciones de las tablas de Drizzle. La carpeta `drizzle` contiene archivos de migración SQL e instantáneas.",
		},
		{
			type: "code",
			language: "bash",
			code: `
📦 <project root>
 ├ 📂 assets
 ├ 📂 drizzle
 ├ 📂 db
 │  └ 📜 schema.ts
 ├ 📜 .gitignore
 ├ 📜 .npmrc
 ├ 📜 app.json
 ├ 📜 App.tsx
 ├ 📜 babel.config.ts
 ├ 📜 drizzle.config.ts
 ├ 📜 package.json
 └ 📜 tsconfig.json
`,
		},

		{ type: "subtitle", text: "Paso 2: Instalar el paquete `expo-sqlite`" },
		{ type: "code", language: "bash", code: "npx expo install expo-sqlite" },

		{ type: "subtitle", text: "Paso 3: Instalar paquetes requeridos" },
		{
			type: "code",
			language: "bash",
			code: "npm i drizzle-orm\nnpm i -D drizzle-kit\npnpm add drizzle-orm\npnpm add -D drizzle-kit",
		},

		{
			type: "subtitle",
			text: "Paso 4: Conectar Drizzle ORM a la base de datos",
		},
		{
			type: "paragraph",
			text: "Crea un archivo App.tsx en el directorio raíz e inicializa la conexión:",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);`,
		},

		{ type: "subtitle", text: "Paso 5: Crear una tabla" },
		{
			type: "paragraph",
			text: "Crea un archivo `schema.ts` en el directorio `db` y declara tu tabla:",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// db/schema.ts
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  age: int('age').notNull(),
  email: text('email').notNull().unique(),
});`,
		},

		{
			type: "subtitle",
			text: "Paso 6: Configurar el archivo de configuración de Drizzle",
		},
		{
			type: "paragraph",
			text: "Crea un archivo `drizzle.config.ts` en la raíz de tu proyecto y agrega el siguiente contenido:",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  dialect: 'sqlite',
  driver: 'expo',
  schema: './db/schema.ts',
  out: './drizzle',
});`,
		},

		{ type: "subtitle", text: "Paso 7: Configurar Metro" },
		{
			type: "paragraph",
			text: "Crea un archivo `metro.config.js` en la carpeta raíz y agrega este código dentro:",
		},
		{
			type: "code",
			language: "javascript",
			code: `
// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('sql');
module.exports = config;`,
		},

		{ type: "subtitle", text: "Paso 8: Actualizar la configuración de Babel" },
		{
			type: "code",
			language: "javascript",
			code: `
// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [["inline-import", { "extensions": [".sql"] }]] // <-- add this
  };
};`,
		},

		{ type: "subtitle", text: "Paso 9: Aplicando cambios a la base de datos" },
		{
			type: "paragraph",
			text: "Con Expo, necesitarás generar migraciones usando el comando `drizzle-kit generate` y luego aplicarlas en tiempo de ejecución usando la función `useMigrations` de `drizzle-orm`.",
		},
		{ type: "paragraph", text: "Generar migraciones:" },
		{ type: "code", language: "bash", code: "npx drizzle-kit generate" },

		{
			type: "subtitle",
			text: "Paso 10: Aplicar migraciones y consultar tu BD",
		},
		{
			type: "paragraph",
			text: "Vamos a actualizar el archivo `App.tsx` con la lógica de migraciones y consultas para crear, leer, actualizar y eliminar usuarios.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { usersTable } from './db/schema';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './drizzle/migrations';

const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);

export default function App() {
  const { success, error } = useMigrations(db, migrations);
  const [items, setItems] = useState<(typeof usersTable.$inferSelect)[] | null>(null);

  useEffect(() => {
    if (!success) return;
    (async () => {
      await db.delete(usersTable);
      await db.insert(usersTable).values([
        {
            name: 'John',
            age: 30,
            email: 'john@example.com',
        },
      ]);
      const users = await db.select().from(usersTable);
      setItems(users);
    })();
  }, [success]);

  if (error) {
    return (
      <View>
        <Text>Error de migración: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View>
        <Text>Migración en progreso...</Text>
      </View>
    );
  }
  if (items === null || items.length === 0) {
    return (
      <View>
        <Text>Vacío</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      {items.map((item) => (
        <Text key={item.id}>{item.email}</Text>
      ))}
    </View>
  );
}
`,
		},

		{
			type: "subtitle",
			text: "Paso 11: Precompilar y ejecutar la app de Expo",
		},
		{ type: "code", language: "bash", code: "npm run start" },

		{ type: "divider" },

		{ type: "subtitle", text: "Paso 12: Configurar Scripts de NPM" },
		{
			type: "paragraph",
			text: "Para simplificar la ejecución de los comandos de Drizzle Kit, es una práctica común añadirlos como scripts en tu `package.json`. Esto te permite ejecutar comandos más cortos y asegura que todo el equipo use los mismos comandos.",
		},
		{
			type: "code",
			language: "json",
			code: `"scripts": {\n    // ... otros scripts\n    "generate": "drizzle-kit generate",\n    "migrate": "drizzle-kit migrate",\n    "studio": "drizzle-kit studio"\n},`,
		},
		{
			type: "paragraph",
			text: "Ahora puedes ejecutar `npm run generate` para crear migraciones y `npm run studio` para abrir el visor de base de datos de Drizzle.",
		},

		{
			type: "subtitle",
			text: "Paso 13: Entendiendo Drizzle ORM vs. Drizzle Kit",
		},
		{
			type: "paragraph",
			text: "Es importante distinguir entre los dos paquetes principales que hemos instalado:",
		},
		{
			type: "list",
			items: [
				"**`drizzle-orm`**: Es el ORM en sí, la librería que usas en el código de tu aplicación en tiempo de ejecución. Proporciona las funciones como `db.select()`, `db.insert()`, etc., para interactuar con la base de datos. Es una dependencia de producción.",
				"**`drizzle-kit`**: Es un conjunto de herramientas de línea de comandos para el desarrollo. No se incluye en tu aplicación final. Sus principales funciones son comparar tu esquema con la base de datos para `generar` migraciones SQL y proporcionar Drizzle `Studio` para una inspección visual de tus datos. Es una dependencia de desarrollo (`-D`).",
			],
		},
	],
};
