import type { CurriculumTopic } from "@/types/types";

export const conference18: CurriculumTopic = {
	id: "conf-18",
	title: "Conf. 18: Drizzle ORM e Kit",
	content: [
		{ type: "heading", text: "Primeiros Passos com Drizzle e Expo" },
		{
			type: "paragraph",
			text: "Este guia assume familiaridade com o Expo SQLite, uma biblioteca que fornece acesso a um banco de dados que pode ser consultado através de uma API SQLite.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "Passo 1: Configurar um projeto a partir de um template do Expo",
		},
		{
			type: "code",
			language: "bash",
			code: "npx create-expo-app --template blank-typescript\npnpm create expo-app --template blank-typescript",
		},

		{ type: "subtitle", text: "Estrutura de arquivos básica" },
		{
			type: "paragraph",
			text: "Após instalar o template e adicionar a pasta `db`, você encontrará o seguinte conteúdo: No arquivo `db/schema.ts` com as definições das tabelas do Drizzle. A pasta `drizzle` contém arquivos de migração SQL e snapshots.",
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

		{ type: "subtitle", text: "Passo 2: Instalar o pacote `expo-sqlite`" },
		{ type: "code", language: "bash", code: "npx expo install expo-sqlite" },
		{
			type: "callout",
			alertType: "warning",
			text: "O suporte da Web é experimental e pode ser instável.",
		},

		{ type: "subtitle", text: "Passo 3: Instalar pacotes necessários" },
		{
			type: "code",
			language: "bash",
			code: "npm i drizzle-orm\nnpm i -D drizzle-kit",
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Pode ser que você também precise instalar o babel-plugin-inline-import. Se encontrar erros relacionados à importação de arquivos .sql, instale-o com: npm install -D babel-plugin-inline-import",
		},

		{
			type: "subtitle",
			text: "Passo 4: Conectar o Drizzle ORM ao banco de dados",
		},
		{
			type: "paragraph",
			text: "Crie um arquivo App.tsx no diretório raiz e inicialize a conexão:",
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

		{ type: "subtitle", text: "Passo 5: Criar uma tabela" },
		{
			type: "paragraph",
			text: "Crie um arquivo `schema.ts` no diretório `db` e declare sua tabela:",
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
			text: "Passo 6: Configurar o arquivo de configuração do Drizzle",
		},
		{
			type: "paragraph",
			text: "Crie um arquivo `drizzle.config.ts` na raiz do seu projeto e adicione o seguinte conteúdo:",
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

		{ type: "subtitle", text: "Passo 7: Configurar o Metro" },
		{
			type: "paragraph",
			text: "Crie um arquivo `metro.config.js` na pasta raiz e adicione este código dentro:",
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

		{ type: "subtitle", text: "Passo 8: Atualizar a configuração do Babel" },
		{
			type: "code",
			language: "javascript",
			code: `
// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [["inline-import", { "extensions": [".sql"] }]] // <-- adicione isto
  };
};`,
		},

		{ type: "subtitle", text: "Passo 9: Configurar Scripts NPM" },
		{
			type: "paragraph",
			text: "Para simplificar a execução dos comandos do Drizzle Kit, é uma prática comum adicioná-los como scripts no seu `package.json`. Isso permite executar comandos mais curtos e garante que toda a equipe use os mesmos comandos.",
		},
		{
			type: "code",
			language: "json",
			code: `"scripts": {\n    // ... outros scripts\n    "generate": "drizzle-kit generate",\n    "migrate": "drizzle-kit migrate",\n    "studio": "drizzle-kit studio"\n},`,
		},
		{
			type: "paragraph",
			text: "Agora você pode executar `npm run generate` para criar migrações e `npm run studio` para abrir o visualizador de banco de dados do Drizzle.",
		},

		{
			type: "subtitle",
			text: "Passo 10: Aplicando alterações ao banco de dados",
		},
		{
			type: "paragraph",
			text: "Com o Expo, você precisará gerar migrações usando o comando `drizzle-kit generate` (ou `npm run generate`) e depois aplicá-las em tempo de execução usando a função `useMigrations` do `drizzle-orm`.",
		},
		{ type: "paragraph", text: "Gerar migrações:" },
		{ type: "code", language: "bash", code: "npm run generate" },

		{
			type: "subtitle",
			text: "Passo 11: Aplicar migrações e consultar seu BD",
		},
		{
			type: "paragraph",
			text: "Vamos atualizar o arquivo `App.tsx` com a lógica de migrações e consultas para criar, ler, atualizar e excluir usuários.",
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
        <Text>Erro de migração: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View>
        <Text>Migração em andamento...</Text>
      </View>
    );
  }
  if (items === null || items.length === 0) {
    return (
      <View>
        <Text>Vazio</Text>
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
			text: "Passo 12: Pré-compilar e executar o app do Expo",
		},
		{ type: "code", language: "bash", code: "npx run start" },

		{ type: "divider" },

		{
			type: "subtitle",
			text: "Passo 13: Considerações de Desenvolvimento vs. Produção",
		},
		{
			type: "paragraph",
			text: "É importante entender como gerenciamos o banco de dados nos diferentes ambientes:",
		},
		{
			type: "list",
			items: [
				{
					text: "**Desenvolvimento**",
					subItems: [
						"`drizzle-kit` é uma dependência de desenvolvimento (`-D`), não é incluído na aplicação final.",
						"Usamos `npm run generate` para criar migrações cada vez que mudamos o esquema.",
						"As migrações são aplicadas em tempo de execução ao iniciar a app.",
						"O Drizzle Studio (`npm run studio`) é a nossa ferramenta para depurar e visualizar os dados.",
					],
				},
				{
					text: "**Produção**",
					subItems: [
						"`drizzle-orm` é uma dependência de produção, é essencial para que a app funcione.",
						"As migrações devem ser aplicadas automaticamente quando o utilizador abre a aplicação pela primeira vez ou a atualiza.",
						"Não se deve armazenar informação altamente sensível no banco de dados local sem encriptação.",
					],
				},
			],
		},
	],
};
