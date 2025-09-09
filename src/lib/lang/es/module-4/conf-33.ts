import type { CurriculumTopic } from "../../../../types/types";

export const conference33: CurriculumTopic = {
	id: "conf-33",
	title: "Conf. 33: Mini Proyecto Películas II",
	content: [
		{ type: "heading", text: "App de Películas (Detalles y Guardado Local)" },
		{
			type: "paragraph",
			text: 'En esta segunda parte del proyecto, construiremos la pantalla de detalles para una película seleccionada y añadiremos una funcionalidad clave: guardar películas como "favoritas" en nuestra base de datos local SQLite usando Drizzle ORM.',
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Paso 1: Esquema y Migración para Favoritos" },
		{
			type: "paragraph",
			text: "Primero, necesitamos una tabla en nuestra base de datos para almacenar las películas favoritas. Abramos `db/schema.ts` y añadamos una nueva tabla.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// db/schema.ts
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

// ... (tu tabla de 'tasks' o lo que tengas puede permanecer)

export const favoriteMovies = sqliteTable('favorite_movies', {
  id: integer('id').primaryKey(), // Usaremos el ID de la película de la API como clave primaria
  title: text('title').notNull(),
  posterPath: text('poster_path'),
  releaseDate: text('release_date'),
  voteAverage: real('vote_average'),
});
`,
		},
		{
			type: "paragraph",
			text: "Hemos usado el ID de la película de la API como clave primaria para evitar duplicados. Ahora, genera la migración:",
		},
		{ type: "code", language: "bash", code: "npm run generate" },
		{
			type: "callout",
			alertType: "info",
			text: "Recuerda que las migraciones se aplicarán automáticamente al reiniciar la app gracias al hook `useMigrations` en tu layout raíz.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Paso 2: Crear la Ruta Dinámica para Detalles" },
		{
			type: "paragraph",
			text: "Necesitamos una nueva pantalla que pueda mostrar los detalles de cualquier película. Creamos una ruta dinámica en `app/movie/[id].tsx`.",
		},
		{
			type: "code",
			language: "bash",
			code: `
app/
├── movie/
│   └── [id].tsx   # Ruta dinámica para /movie/123, /movie/456, etc.
...
`,
		},
		{
			type: "paragraph",
			text: "Registra esta nueva ruta en tu Stack Navigator raíz (`app/_layout.tsx`).",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// app/_layout.tsx
// ...
<Stack>
  <Stack.Screen name="index" options={{ title: 'Buscador de Películas' }} />
  <Stack.Screen name="movie/[id]" options={{ title: 'Detalle' }} />
</Stack>
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Paso 3: Navegar a la Pantalla de Detalles" },
		{
			type: "paragraph",
			text: "Modifiquemos nuestro `MovieListItem` para que, al ser presionado, navegue a la pantalla de detalles, pasando el ID de la película.",
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
        {/* El contenido del item que ya teníamos */}
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
			text: "Paso 4: Construir la Pantalla de Detalles y Lógica de Favoritos",
		},
		{
			type: "paragraph",
			text: "Esta es la parte central. En `app/movie/[id].tsx`, obtendremos el ID, cargaremos los datos de la película (podríamos hacer otra llamada a la API para más detalles, pero por simplicidad, pasaremos los datos básicos), y manejaremos la lógica de favoritos.",
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
// Asumimos que podemos obtener los detalles de una película por ID desde nuestra API
// import { getMovieDetails, MovieDetails } from '../../services/api';

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // En un caso real, aquí harías una llamada a la API con el id para obtener todos los detalles
  // const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!id) return;
      setLoading(true);
      const movieId = parseInt(id, 10);

      // Lógica de la BD
      const existingFavorite = await db.select().from(favoriteMovies).where(eq(favoriteMovies.id, movieId));
      setIsFavorite(existingFavorite.length > 0);

      // Aquí también cargarías los datos de la película desde la API
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
      // Necesitarías los datos de la película para insertarlos
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
      <Stack.Screen options={{ title: "Cargando..." /* movie?.title */ }} />
      <Text className="text-white text-2xl mb-4">Detalles de la Película {id}</Text>

      <Pressable onPress={toggleFavorite} className="p-3 rounded-lg bg-blue-600">
        <Text className="text-white text-center font-bold">
          {isFavorite ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}
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
			text: "El código está comentado en las partes que requerirían una llamada a la API completa para obtener los detalles, pero la lógica de la base de datos para añadir/quitar favoritos está completa. Para una implementación total, necesitarías pasar los datos de la película a través del enrutador o hacer una nueva llamada a la API.",
		},
	],
};
