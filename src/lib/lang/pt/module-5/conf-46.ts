import type { CurriculumTopic } from "../../../../types/types";

export const conference46: CurriculumTopic = {
	id: "conf-46",
	title: "Conf. 46: Mini Projeto de Mídia Social",
	content: [
		{ type: "heading", text: "Mini Projeto: Feed de Mídia Social (Local)" },
		{
			type: "paragraph",
			text: 'Neste projeto, construiremos um protótipo de uma aplicação de mídia social. Criaremos um feed onde poderão ser exibidas publicações com texto e imagem, e os utilizadores poderão dar "like". Toda a informação, incluindo as publicações e os likes, será armazenada e gerida localmente na base de dados SQLite com Drizzle.',
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Passo 1: Definir o Esquema da Base de Dados" },
		{
			type: "paragraph",
			text: 'Precisamos de duas tabelas: uma para as publicações e outra para registar os likes de cada publicação. A relação será "uma publicação pode ter muitos likes".',
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
  imageUrl: text('image_url'), // URI de ficheiro local
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(new Date()),
});

export const likes = sqliteTable('likes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  postId: integer('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
});

// Definimos a relação para que o Drizzle possa fazer JOINs
export const postsRelations = relations(posts, ({ many }) => ({
  likes: many(likes),
}));
`,
		},
		{
			type: "paragraph",
			text: "Não se esqueça de gerar a nova migração: `npm run generate`.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "Passo 2: Criar o Formulário de Nova Publicação",
		},
		{
			type: "paragraph",
			text: "Crie um novo ecrã modal para que os utilizadores possam criar publicações. Use `expo-image-picker` e `expo-file-system` para lidar com a seleção e o armazenamento de imagens.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// app/create-post.tsx
// (Certifique-se de configurar este ecrã como modal no seu _layout.tsx)
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

    const pickImage = async () => { /* ... (lógica do ImagePicker) ... */ };

    const handleCreatePost = async () => {
        let savedImageUri: string | null = null;
        if (imageUri) {
            // Guardar imagem no diretório da app
            const filename = imageUri.split('/').pop();
            savedImageUri = FileSystem.documentDirectory + filename;
            await FileSystem.copyAsync({ from: imageUri, to: savedImageUri });
        }

        await db.insert(posts).values({
            content,
            imageUrl: savedImageUri,
            createdAt: new Date(),
        });

        router.back(); // Voltar ao feed
    };

    return (
        <View>
            <TextInput placeholder="O que está a pensar?" value={content} onChangeText={setContent} multiline />
            <Button title="Selecionar Imagem" onPress={pickImage} />
            {imageUri && <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />}
            <Button title="Publicar" onPress={handleCreatePost} />
        </View>
    );
}
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Passo 3: Construir o Feed Principal" },
		{
			type: "paragraph",
			text: "O ecrã principal (`app/index.tsx`) buscará todas as publicações e os seus likes, e exibi-los-á numa `FlatList`.",
		},

		{ type: "paragraph", text: "**A Consulta com `with` para Relações:**" },
		{
			type: "paragraph",
			text: "Para obter as publicações e os seus likes relacionados de forma eficiente, usamos a sintaxe `with` do Drizzle, que realiza um JOIN por baixo.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// No seu ecrã de feed
async function fetchPostsWithLikes() {
    const postsWithLikes = await db.query.posts.findMany({
        with: {
            likes: true, // Isto diz ao Drizzle para incluir os likes relacionados
        },
        orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
    // postsWithLikes será um array de:
    // { id, content, ..., likes: [{ id, postId }, ...] }
    return postsWithLikes;
}
`,
		},

		{ type: "paragraph", text: "**O Componente `PostCard`:**" },
		{
			type: "paragraph",
			text: 'Crie um componente reutilizável para exibir cada publicação. Este componente também tratará da lógica de dar "like".',
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

// O tipo de dado que recebemos da consulta
type PostWithLikes = Awaited<ReturnType<typeof fetchPostsWithLikes>>[0];

export default function PostCard({ post, refetch }: { post: PostWithLikes, refetch: () => void }) {
    // Para este exemplo, assumimos um único utilizador, pelo que não precisamos de user_id.
    // Numa app real, verificaria se o utilizador atual já deu like.
    const isLiked = post.likes.length > 0;

    const handleLike = async () => {
        if (isLiked) {
            // Apaga todos os likes para esta publicação (simplificado)
            await db.delete(likes).where(eq(likes.postId, post.id));
        } else {
            await db.insert(likes).values({ postId: post.id });
        }
        refetch(); // Volta a carregar as publicações para atualizar a UI
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
			text: "Passar uma função `refetch` como prop ao `PostCard` é uma forma simples de fazer com que o feed se atualize imediatamente após dar like. Em aplicações mais complexas, seriam usadas soluções de gestão de estado mais sofisticadas.",
		},
	],
};
