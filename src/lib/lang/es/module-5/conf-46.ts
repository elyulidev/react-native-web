import type { CurriculumTopic } from "../../../../types/types";

export const conference46: CurriculumTopic = {
	id: "conf-46",
	title: "Conf. 46: Mini Proyecto Social Media",
	content: [
		{ type: "heading", text: "Mini Proyecto: Feed de Red Social (Local)" },
		{
			type: "paragraph",
			text: 'En este proyecto, construiremos un prototipo de una aplicación de red social. Crearemos un feed donde se podrán mostrar publicaciones con texto e imagen, y los usuarios podrán dar "like". Toda la información, incluyendo los posts y los likes, se almacenará y gestionará localmente en la base de datos SQLite con Drizzle.',
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "Paso 1: Definir el Esquema de la Base de Datos",
		},
		{
			type: "paragraph",
			text: 'Necesitamos dos tablas: una para los posts y otra para registrar los likes de cada post. La relación será "un post puede tener muchos likes".',
		},
		{
			type: "code",
			language: "typescript",
			code: `
// db/schema.ts
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  content: text('content').notNull(),
  imageUrl: text('image_url'), // URI de archivo local
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(new Date()),
});

export const likes = sqliteTable('likes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  postId: integer('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
});

// Definimos la relación para que Drizzle pueda hacer JOINs
export const postsRelations = relations(posts, ({ many }) => ({
  likes: many(likes),
}));
`,
		},
		{
			type: "paragraph",
			text: "No olvides generar la nueva migración: `npm run generate`.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Paso 2: Crear el Formulario de Nuevo Post" },
		{
			type: "paragraph",
			text: "Crea una nueva pantalla modal para que los usuarios puedan crear posts. Usa `expo-image-picker` y `expo-file-system` para manejar la selección y guardado de imágenes.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// app/create-post.tsx
// (Asegúrate de configurar esta pantalla como modal en tu _layout.tsx)
import React, { useState } from 'react';
import { View, TextInput, Button, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { db } from '../db';
import { posts } from '../db/schema';

export default function CreatePostScreen() {
    const router = useRouter();
    const [content, setContent] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);

    const pickImage = async () => { /* ... (lógica de ImagePicker) ... */ };

    const handleCreatePost = async () => {
        let savedImageUri: string | null = null;
        if (imageUri) {
            // Guardar imagen en el directorio de la app
            const filename = imageUri.split('/').pop();
            savedImageUri = FileSystem.documentDirectory + filename;
            await FileSystem.copyAsync({ from: imageUri, to: savedImageUri });
        }

        await db.insert(posts).values({
            content,
            imageUrl: savedImageUri,
            createdAt: new Date(),
        });

        router.back(); // Volver al feed
    };

    return (
        <View>
            <TextInput placeholder="¿Qué estás pensando?" value={content} onChangeText={setContent} multiline />
            <Button title="Seleccionar Imagen" onPress={pickImage} />
            {imageUri && <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />}
            <Button title="Publicar" onPress={handleCreatePost} />
        </View>
    );
}
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Paso 3: Construir el Feed Principal" },
		{
			type: "paragraph",
			text: "La pantalla principal (`app/index.tsx`) buscará todos los posts y sus likes, y los mostrará en una `FlatList`.",
		},

		{ type: "paragraph", text: "**La Consulta con `with` para Relaciones:**" },
		{
			type: "paragraph",
			text: "Para obtener los posts y sus likes relacionados de manera eficiente, usamos la sintaxis `with` de Drizzle, que realiza un JOIN por debajo.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// En tu pantalla de feed
async function fetchPostsWithLikes() {
    const postsWithLikes = await db.query.posts.findMany({
        with: {
            likes: true, // Esto le dice a Drizzle que incluya los likes relacionados
        },
        orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
    // postsWithLikes será un array de:
    // { id, content, ..., likes: [{ id, postId }, ...] }
    return postsWithLikes;
}
`,
		},

		{ type: "paragraph", text: "**El Componente `PostCard`:**" },
		{
			type: "paragraph",
			text: 'Crea un componente reutilizable para mostrar cada post. Este componente también manejará la lógica para dar "like".',
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { View, Text, Image, Pressable } from 'react-native';
import { db } from '../db';
import { likes } from '../db/schema';
import { eq } from 'drizzle-orm';
import { Ionicons } from '@expo/vector-icons';

// El tipo de dato que recibimos de la consulta
type PostWithLikes = Awaited<ReturnType<typeof fetchPostsWithLikes>>[0];

export default function PostCard({ post, refetch }: { post: PostWithLikes, refetch: () => void }) {
    // Para este ejemplo, asumimos un único usuario, por lo que no necesitamos user_id.
    // En una app real, comprobarías si el usuario actual ya ha dado like.
    const isLiked = post.likes.length > 0;

    const handleLike = async () => {
        if (isLiked) {
            // Borra todos los likes para este post (simplificado)
            await db.delete(likes).where(eq(likes.postId, post.id));
        } else {
            await db.insert(likes).values({ postId: post.id });
        }
        refetch(); // Vuelve a cargar los posts para actualizar la UI
    };

    return (
        <View className="bg-white dark:bg-slate-800 p-4 mb-4 rounded-lg">
            <Text className="text-slate-800 dark:text-slate-200 mb-2">{post.content}</Text>
            {post.imageUrl && <Image source={{ uri: post.imageUrl }} className="w-full h-48 rounded-md" />}
            <View className="flex-row items-center mt-3">
                <Pressable onPress={handleLike} className="flex-row items-center gap-2">
                    <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={24} color={isLiked ? 'red' : 'gray'} />
                    <Text className="text-gray-500">{post.likes.length}</Text>
                </Pressable>
            </View>
        </View>
    );
}
`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Pasar una función `refetch` como prop al `PostCard` es una forma simple de hacer que el feed se actualice inmediatamente después de dar like. En aplicaciones más complejas, se usarían soluciones de gestión de estado más sofisticadas.",
		},
	],
};
