import type { CurriculumTopic } from "../../../../types/types";

export const conference33: CurriculumTopic = {
	id: "conf-33",
	title: "Conf. 33: Mini Projeto de Filmes II",
	content: [
		{ type: "heading", text: "App de Filmes (Detalhes e Armazenamento Local)" },
		{
			type: "paragraph",
			text: 'Nesta segunda parte do projeto, construiremos a tela de detalhes para um filme selecionado e adicionaremos uma funcionalidade chave: guardar filmes como "favoritos" na nossa base de dados local SQLite usando o Drizzle ORM.',
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Passo 1: Esquema e Migração para Favoritos" },
		{
			type: "paragraph",
			text: "Primeiro, precisamos de uma tabela na nossa base de dados para armazenar os filmes favoritos. Vamos abrir `db/schema.ts` e adicionar uma nova tabela.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// db/schema.ts
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

// ... (a sua tabela 'tasks' ou o que quer que tenha pode permanecer)

export const favoriteMovies = sqliteTable('favorite_movies', {
  id: integer('id').primaryKey(), // Usaremos o ID do filme da API como chave primária
  title: text('title').notNull(),
  posterPath: text('poster_path'),
  releaseDate: text('release_date'),
  voteAverage: real('vote_average'),
});
`,
		},
		{
			type: "paragraph",
			text: "Usamos o ID do filme da API como chave primária para evitar duplicados. Agora, gere a migração:",
		},
		{ type: "code", language: "bash", code: "npm run generate" },
		{
			type: "callout",
			alertType: "info",
			text: "Lembre-se que as migrações serão aplicadas automaticamente ao reiniciar a app graças ao hook `useMigrations` no seu layout raiz.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Passo 2: Criar a Rota Dinâmica para Detalhes" },
		{
			type: "paragraph",
			text: "Precisamos de uma nova tela que possa mostrar os detalhes de qualquer filme. Criamos uma rota dinâmica em `app/movie/[id].tsx`.",
		},
		{
			type: "code",
			language: "bash",
			code: `
app/
├── movie/
│   └── [id].tsx   # Rota dinâmica para /movie/123, /movie/456, etc.
...
`,
		},
		{
			type: "paragraph",
			text: "Registe esta nova rota no seu Stack Navigator raiz (`app/_layout.tsx`).",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// app/_layout.tsx
// ...
<Stack>
  <Stack.Screen name="index" options={{ title: 'Buscador de Filmes' }} />
  <Stack.Screen name="movie/[id]" options={{ title: 'Detalhe' }} />
</Stack>
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Passo 3: Navegar para a Tela de Detalhes" },
		{
			type: "paragraph",
			text: "Vamos modificar o nosso `MovieListItem` para que, ao ser pressionado, navegue para a tela de detalhes, passando o ID do filme.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// components/MovieListItem.tsx
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
// ...

const MovieListItem = ({ movie }: MovieListItemProps) => {
  // ...
  return (
    <Link href={\`/movie/\${movie.id}\`} asChild>
      <Pressable>
        {/* O conteúdo do item que já tínhamos */}
        <View className="flex-row items-center bg-slate-800 my-2 rounded-lg overflow-hidden">
          {/* ... */}
        </View>
      </Pressable>
    </Link>
  );
};
`,
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "Passo 4: Construir a Tela de Detalhes e a Lógica de Favoritos",
		},
		{
			type: "paragraph",
			text: "Esta é a parte central. Em `app/movie/[id].tsx`, obteremos o ID, carregaremos os dados do filme (poderíamos fazer outra chamada à API para mais detalhes, mas por simplicidade, passaremos os dados básicos), e trataremos da lógica de favoritos.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// app/movie/[id].tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { db } from '../../db';
import { favoriteMovies } from '../../db/schema';
import { eq } from 'drizzle-orm';
// Assumimos que podemos obter os detalhes de um filme por ID da nossa API
// import { getMovieDetails, MovieDetails } from '../../services/api';

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // Num caso real, aqui faria uma chamada à API com o id para obter todos os detalhes
  // const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!id) return;
      setLoading(true);
      const movieId = parseInt(id, 10);

      // Lógica da BD
      const existingFavorite = await db.select().from(favoriteMovies).where(eq(favoriteMovies.id, movieId));
      setIsFavorite(existingFavorite.length > 0);

      // Aqui também carregaria os dados do filme da API
      // const movieDetails = await getMovieDetails(movieId);
      // setMovie(movieDetails);

      setLoading(false);
    };

    checkIfFavorite();
  }, [id]);

  const toggleFavorite = async () => {
    if (!id /* || !movie */) return;
    const movieId = parseInt(id, 10);

    if (isFavorite) {
      await db.delete(favoriteMovies).where(eq(favoriteMovies.id, movieId));
    } else {
      // Precisaria dos dados do filme para os inserir
      // await db.insert(favoriteMovies).values({
      //   id: movie.id,
      //   title: movie.title,
      //   ...
      // });
    }
    setIsFavorite(!isFavorite);
  };

  if (loading) return <ActivityIndicator />;

  return (
    <View className="flex-1 p-4 bg-slate-900">
      <Stack.Screen options={{ title: "A carregar..." /* movie?.title */ }} />
      <Text className="text-white text-2xl mb-4">Detalhes do Filme {id}</Text>

      <Pressable onPress={toggleFavorite} className="p-3 rounded-lg bg-blue-600">
        <Text className="text-white text-center font-bold">
          {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        </Text>
      </Pressable>
    </View>
  );
}
`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "O código está comentado nas partes que exigiriam uma chamada à API completa para obter os detalhes, mas a lógica da base de dados para adicionar/remover favoritos está completa. Para uma implementação total, precisaria de passar os dados do filme através do router ou fazer uma nova chamada à API.",
		},
	],
};
