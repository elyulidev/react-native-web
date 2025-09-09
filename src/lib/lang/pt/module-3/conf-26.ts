import type { CurriculumTopic } from "../../../../types/types";

export const conference26: CurriculumTopic = {
	id: "conf-26",
	title: "Conf. 26: Mini Projeto App de Lista de Tarefas",
	content: [
		{
			type: "heading",
			text: "Mini Projeto: Aplicação de Lista de Tarefas Completa (Local)",
		},
		{
			type: "paragraph",
			text: "É hora de aplicar tudo o que aprendemos no Módulo 3! Neste projeto, construiremos uma aplicação de lista de tarefas (To-Do) funcional do zero. Implementaremos todas as operações CRUD (Criar, Ler, Atualizar, Excluir) utilizando o Drizzle ORM para gerenciar os dados localmente no dispositivo.",
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/todo-app-project-goal.png",
			caption: "O resultado final da nossa aplicação de lista de tarefas.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Passo 1: Criação e Configuração do Projeto" },
		{
			type: "paragraph",
			text: "Começaremos do zero para simular um cenário real. Abra o seu terminal e execute os seguintes comandos:",
		},
		{
			type: "code",
			language: "bash",
			code: `
# 1. Crie um novo projeto Expo com o modelo TypeScript em branco
npx create-expo-app@latest todo-app --template blank-ts

# 2. Navegue para o diretório do projeto
cd todo-app

# 3. Instale as dependências necessárias
npx expo install expo-sqlite
npm install drizzle-orm
npm install -D drizzle-kit
`,
		},
		{
			type: "paragraph",
			text: "Em seguida, configure o seu `package.json` com os scripts do Drizzle para facilitar o desenvolvimento:",
		},
		{
			type: "code",
			language: "json",
			code: `"scripts": {
    ...
    "generate": "drizzle-kit generate",
    "studio": "drizzle-kit studio"
},`,
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "Passo 2: Definir o Esquema e Configurar o Drizzle",
		},
		{
			type: "paragraph",
			text: "Agora, criaremos a estrutura do nosso banco de dados. Crie uma pasta `db` e, dentro dela, um arquivo `schema.ts`.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// db/schema.ts
import { sqliteTable, text, integer, boolean } from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  content: text('content').notNull(),
  completed: boolean('completed').notNull().default(false),
});

// Opcional: Para ter tipos inferidos seguros
export type Task = typeof tasks.$inferSelect;
`,
		},
		{
			type: "paragraph",
			text: "Em seguida, crie o arquivo de configuração `drizzle.config.ts` na raiz do projeto:",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  driver: 'expo',
  schema: './db/schema.ts',
  out: './drizzle',
});`,
		},
		{
			type: "paragraph",
			text: "Com o esquema e a configuração prontos, gere a sua primeira migração:",
		},
		{ type: "code", language: "bash", code: "npm run generate" },
		{ type: "divider" },

		{ type: "subtitle", text: "Passo 3: Conexão e Migração na App" },
		{
			type: "paragraph",
			text: "Crie um arquivo `db/index.ts` para centralizar a conexão com o banco de dados.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// db/index.ts
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from './schema';

const expoDb = SQLite.openDatabaseSync('todo.db');
export const db = drizzle(expoDb, { schema });`,
		},
		{
			type: "paragraph",
			text: "Agora, configure o seu layout raiz (`app/_layout.tsx`) para aplicar as migrações ao iniciar a aplicação. Isso garante que o banco de dados esteja sempre atualizado.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/_layout.tsx
import { Stack } from 'expo-router';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../drizzle/migrations';
import { db } from '../db'; // Certifique-se de que o caminho está correto
import { View, Text } from 'react-native';

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View><Text>Erro de migração: {error.message}</Text></View>
    );
  }
  if (!success) {
    return (
      <View><Text>Aplicando migrações...</Text></View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Minha Lista de Tarefas' }} />
    </Stack>
  );
}`,
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Lembre-se de configurar o `metro.config.js` e o `babel.config.js` para importar arquivos `.sql`, como explicado na Conferência 21.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Passo 4: Construção da UI e Lógica CRUD" },
		{
			type: "paragraph",
			text: "Substitua o conteúdo de `app/index.tsx` pela lógica completa da aplicação. Aqui, implementaremos as funções para ler, criar, atualizar e excluir tarefas, conectando-as à interface do usuário.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { db } from '../db';
import { tasks, Task } from '../db/schema';
import { eq, desc } from 'drizzle-orm';
import { Ionicons } from '@expo/vector-icons';

export default function TodoScreen() {
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [newTaskContent, setNewTaskContent] = useState('');
    const [loading, setLoading] = useState(true);

    // --- LER (READ) ---
    async function fetchTasks() {
        try {
            const result = await db.select().from(tasks).orderBy(desc(tasks.id));
            setAllTasks(result);
        } catch (e) {
            console.error("Erro ao carregar tarefas", e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    // --- CRIAR (CREATE) ---
    async function addTask() {
        if (newTaskContent.trim().length === 0) return;
        await db.insert(tasks).values({ content: newTaskContent });
        setNewTaskContent('');
        await fetchTasks();
    }

    // --- ATUALIZAR (UPDATE) ---
    async function toggleTask(id: number) {
        const currentTask = allTasks.find(t => t.id === id);
        if (currentTask) {
            await db.update(tasks)
                .set({ completed: !currentTask.completed })
                .where(eq(tasks.id, id));
            await fetchTasks();
        }
    }

    // --- EXCLUIR (DELETE) ---
    async function deleteTask(id: number) {
        await db.delete(tasks).where(eq(tasks.id, id));
        await fetchTasks();
    }

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-slate-100">
                <ActivityIndicator size="large" color="#0ea5e9" />
            </View>
        );
    }

    return (
        <View className="flex-1 p-4 bg-slate-100 dark:bg-slate-900">
            <View className="flex-row mb-4">
                <TextInput
                    className="flex-1 border border-slate-400 dark:border-slate-600 rounded-l-lg p-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                    placeholder="Escreva uma nova tarefa..."
                    placeholderTextColor="#9ca3af"
                    value={newTaskContent}
                    onChangeText={setNewTaskContent}
                />
                <Pressable className="bg-primary-500 p-3 rounded-r-lg justify-center items-center active:bg-primary-600" onPress={addTask}>
                    <Text className="text-white font-bold">Adicionar</Text>
                </Pressable>
            </View>

            <FlatList
                data={allTasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View className="flex-row items-center p-3 mb-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <Pressable onPress={() => toggleTask(item.id)} className="p-2">
                            <Ionicons
                                name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
                                size={26}
                                color={item.completed ? '#22c55e' : '#64748b'}
                            />
                        </Pressable>
                        <Text className={'flex-1 text-base mx-2 ' + (item.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200')}>
                            {item.content}
                        </Text>
                        <Pressable onPress={() => deleteTask(item.id)} className="p-2">
                             <Ionicons name="trash-bin-outline" size={24} color="#ef4444" />
                        </Pressable>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <View className="mt-10 items-center">
                        <Text className="text-slate-500 dark:text-slate-400">Não há tarefas pendentes. Adicione uma!</Text>
                    </View>
                )}
            />
        </View>
    );
}`,
		},
		{ type: "heading", text: "Parabéns!" },
		{
			type: "paragraph",
			text: "Você construiu uma aplicação To-Do completamente funcional que salva dados localmente. Você praticou a definição de esquemas, a geração de migrações e a implementação de todas as operações CRUD com o Drizzle ORM, um pilar fundamental para criar aplicações móveis robustas e com capacidade offline.",
		},
	],
};
