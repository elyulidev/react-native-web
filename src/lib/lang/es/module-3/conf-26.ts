import type { CurriculumTopic } from "../../../../types/types";

export const conference26: CurriculumTopic = {
	id: "conf-26",
	title: "Conf. 26: Mini Proyecto App To-Do",
	content: [
		{
			type: "heading",
			text: "Mini Proyecto: Aplicación To-Do Completa (Local)",
		},
		{
			type: "paragraph",
			text: "¡Es hora de aplicar todo lo aprendido en el Módulo 3! En este proyecto, construiremos una aplicación de lista de tareas (To-Do) funcional desde cero. Implementaremos todas las operaciones CRUD (Crear, Leer, Actualizar, Borrar) utilizando Drizzle ORM para gestionar los datos de forma local en el dispositivo.",
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/todo-app-project-goal.png",
			caption: "El resultado final de nuestra aplicación de lista de tareas.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Paso 1: Creación y Configuración del Proyecto" },
		{
			type: "paragraph",
			text: "Empezaremos desde cero para simular un escenario real. Abre tu terminal y ejecuta los siguientes comandos:",
		},
		{
			type: "code",
			language: "bash",
			code: `
# 1. Crea un nuevo proyecto Expo con la plantilla de TypeScript en blanco
npx create-expo-app@latest todo-app --template blank-ts

# 2. Navega al directorio del proyecto
cd todo-app

# 3. Instala las dependencias necesarias
npx expo install expo-sqlite
npm install drizzle-orm
npm install -D drizzle-kit
`,
		},
		{
			type: "paragraph",
			text: "A continuación, configura tu `package.json` con los scripts de Drizzle para facilitar el desarrollo:",
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
			text: "Paso 2: Definir el Esquema y Configurar Drizzle",
		},
		{
			type: "paragraph",
			text: "Ahora, crearemos la estructura de nuestra base de datos. Crea una carpeta `db` y dentro, un archivo `schema.ts`.",
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

// Opcional: Para tener tipos inferidos seguros
export type Task = typeof tasks.$inferSelect;
`,
		},
		{
			type: "paragraph",
			text: "Luego, crea el archivo de configuración `drizzle.config.ts` en la raíz del proyecto:",
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
			text: "Con el esquema y la configuración listos, genera tu primera migración:",
		},
		{ type: "code", language: "bash", code: "npm run generate" },
		{ type: "divider" },

		{ type: "subtitle", text: "Paso 3: Conexión y Migración en la App" },
		{
			type: "paragraph",
			text: "Crea un archivo `db/index.ts` para centralizar la conexión a la base de datos.",
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
			text: "Ahora, configura tu layout raíz (`app/_layout.tsx`) para aplicar las migraciones al iniciar la aplicación. Esto asegura que la base de datos siempre esté actualizada.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// app/_layout.tsx
import { Stack } from 'expo-router';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../drizzle/migrations';
import { db } from '../db'; // Asegúrate que la ruta sea correcta
import { View, Text } from 'react-native';

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View><Text>Error de migración: {error.message}</Text></View>
    );
  }
  if (!success) {
    return (
      <View><Text>Aplicando migraciones...</Text></View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Mi Lista de Tareas' }} />
    </Stack>
  );
}`,
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Recuerda configurar `metro.config.js` y `babel.config.js` para importar archivos `.sql` como se explicó en la Conferencia 21.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Paso 4: Construcción de la UI y Lógica CRUD" },
		{
			type: "paragraph",
			text: "Reemplaza el contenido de `app/index.tsx` con la lógica completa de la aplicación. Aquí implementaremos las funciones para leer, crear, actualizar y borrar tareas, conectándolas a la interfaz de usuario.",
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

    // --- LEER (READ) ---
    async function fetchTasks() {
        try {
            const result = await db.select().from(tasks).orderBy(desc(tasks.id));
            setAllTasks(result);
        } catch (e) {
            console.error("Error al cargar tareas", e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    // --- CREAR (CREATE) ---
    async function addTask() {
        if (newTaskContent.trim().length === 0) return;
        await db.insert(tasks).values({ content: newTaskContent });
        setNewTaskContent('');
        await fetchTasks();
    }

    // --- ACTUALIZAR (UPDATE) ---
    async function toggleTask(id: number) {
        const currentTask = allTasks.find(t => t.id === id);
        if (currentTask) {
            await db.update(tasks)
                .set({ completed: !currentTask.completed })
                .where(eq(tasks.id, id));
            await fetchTasks();
        }
    }

    // --- BORRAR (DELETE) ---
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
                    placeholder="Escribe una nueva tarea..."
                    placeholderTextColor="#9ca3af"
                    value={newTaskContent}
                    onChangeText={setNewTaskContent}
                />
                <Pressable className="bg-primary-500 p-3 rounded-r-lg justify-center items-center active:bg-primary-600" onPress={addTask}>
                    <Text className="text-white font-bold">Añadir</Text>
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
                        <Text className="text-slate-500 dark:text-slate-400">No hay tareas pendientes. ¡Añade una!</Text>
                    </View>
                )}
            />
        </View>
    );
}`,
		},
		{ type: "heading", text: "¡Felicidades!" },
		{
			type: "paragraph",
			text: "Has construido una aplicación To-Do completamente funcional que guarda datos localmente. Has practicado la definición de esquemas, la generación de migraciones y la implementación de todas las operaciones CRUD con Drizzle ORM, un pilar fundamental para crear aplicaciones móviles robustas y con capacidad offline.",
		},
	],
};
