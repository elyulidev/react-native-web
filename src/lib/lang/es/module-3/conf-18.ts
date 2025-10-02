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
		{
			type: "callout",
			alertType: "warning",
			text: "El soporte web es experimental y puede ser inestable.",
		},

		{ type: "subtitle", text: "Paso 3: Instalar paquetes requeridos" },
		{
			type: "code",
			language: "bash",
			code: "npm i drizzle-orm\nnpm i -D drizzle-kit",
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Es posible que también necesites instalar babel-plugin-inline-import. Si encuentras errores relacionados con la importación de archivos .sql, instálalo con: npm install -D babel-plugin-inline-import",
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

		{ type: "subtitle", text: "Paso 9: Configurar Scripts de NPM" },
		{
			type: "paragraph",
			text: "Para simplificar la ejecución de los comandos de Drizzle Kit, es una práctica común añadirlos como scripts en tu `package.json`. Esto te permite ejecutar comandos más cortos y asegura que todo el equipo use los mismos comandos.",
		},
		{
			type: "code",
			language: "json",
			code: `"scripts": {\n    // ... outros scripts\n    "generate": "drizzle-kit generate",\n    "migrate": "drizzle-kit migrate",\n    "studio": "drizzle-kit studio"\n},`,
		},
		{
			type: "paragraph",
			text: "Ahora puedes ejecutar `npm run generate` para crear migraciones y `npm run studio` para abrir el visor de base de datos de Drizzle.",
		},

		{ type: "subtitle", text: "Paso 10: Aplicando cambios a la base de datos" },
		{
			type: "paragraph",
			text: "Con Expo, necesitarás generar migraciones usando el comando `drizzle-kit generate` (o `npm run generate`) y luego aplicarlas en tiempo de ejecución usando la función `useMigrations` de `drizzle-orm`.",
		},
		{ type: "paragraph", text: "Generar migraciones:" },
		{ type: "code", language: "bash", code: "npm run generate" },

		{
			type: "subtitle",
			text: "Paso 11: Aplicar migraciones y consultar tu BD",
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
			text: "Paso 12: Precompilar y ejecutar la app de Expo",
		},
		{ type: "code", language: "bash", code: "npx run start" },

		{ type: "divider" },

		{
			type: "subtitle",
			text: "Paso 13: Consideraciones de Desarrollo vs. Producción",
		},
		{
			type: "paragraph",
			text: "Es importante entender cómo manejamos la base de datos en los diferentes entornos:",
		},
		{
			type: "list",
			items: [
				{
					text: "**Desarrollo**",
					subItems: [
						"`drizzle-kit` es una dependencia de desarrollo (`-D`), no se incluye en la app final.",
						"Usamos `npm run generate` para crear migraciones cada vez que cambiamos el esquema.",
						"Las migraciones se aplican en tiempo de ejecución al iniciar la app.",
						"Drizzle Studio (`npm run studio`) es nuestra herramienta para depurar y visualizar los datos.",
					],
				},
				{
					text: "**Producción**",
					subItems: [
						"`drizzle-orm` es una dependencia de producción, es esencial para que la app funcione.",
						"Las migraciones deben aplicarse automáticamente cuando el usuario abre la aplicación por primera vez o la actualiza.",
						"No se debe almacenar información altamente sensible en la base de datos local sin encriptación.",
					],
				},
			],
		},
	],
};
