import type { CurriculumTopic } from "../../../../types/types";

export const conference32: CurriculumTopic = {
	id: "conf-32",
	title: "Conf. 32: Mini Proyecto Películas I",
	content: [
		{ type: "heading", text: "Mini Proyecto: App de Películas (Búsqueda)" },
		{
			type: "paragraph",
			text: "En este proyecto práctico, construiremos la primera parte de una aplicación para buscar películas. Integraremos una API externa (TheMovieDB), implementaremos una pantalla de búsqueda con `TextInput` y `debouncing`, y mostraremos los resultados de manera eficiente usando `FlatList`. Este proyecto consolidará todo lo aprendido sobre consumo de APIs y manejo de listas.",
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/movie-app-search.png",
			caption: "La pantalla de búsqueda de películas que construiremos.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "Parte 1: Obtener una Clave de API y Configurar el Entorno",
		},
		{
			type: "paragraph",
			text: "Para comunicarnos con The Movie Database (TMDB), primero necesitas una clave de API. Es gratis y esencial para nuestro proyecto.",
		},
		{
			type: "list",
			items: [
				"**1. Regístrate:** Ve a [themoviedb.org](https://www.themoviedb.org/) y crea una cuenta.",
				'**2. Solicita una clave de API:** En los ajustes de tu perfil, ve a la sección "API" y sigue los pasos para solicitar una clave de desarrollador.',
				"**3. Almacena la clave de forma segura:** Una vez que tengas tu clave, crea un archivo llamado `.env` en la raíz de tu proyecto Expo. Este archivo guardará tus secretos de forma segura.",
			],
		},
		{
			type: "code",
			language: "bash",
			code: `
# .env
# IMPORTANTE: El prefijo EXPO_PUBLIC_ es necesario para que Expo la reconozca.
EXPO_PUBLIC_TMDB_API_KEY="TU_CLAVE_DE_API_AQUI"
`,
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Asegúrate de añadir el archivo `.env` a tu `.gitignore` para no subir tus claves a repositorios públicos. Después de crear o modificar el archivo `.env`, debes reiniciar el servidor de desarrollo de Expo con el comando `npx expo start --clear` para que los cambios surtan efecto.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Parte 2: Crear el Servicio de la API" },
		{
			type: "paragraph",
			text: "Es una buena práctica encapsular toda la lógica de las llamadas a la API en un solo lugar. Crea una nueva carpeta `services` y, dentro de ella, un archivo `api.ts`.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// services/api.ts
const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const API_URL = 'https://api.themoviedb.org/3';

// Definimos la "forma" de los datos de una película que esperamos de la API
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

// Función para buscar películas por un término de búsqueda (query)
export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (!query) {
    return []; // Si no hay búsqueda, devuelve un array vacío
  }
  try {
    const response = await fetch(
      \`\${API_URL}/search/movie?api_key=\${API_KEY}&query=\${encodeURIComponent(query)}&language=es-ES\`
    );
    if (!response.ok) {
      throw new Error('La respuesta de la red no fue correcta');
    }
    const data = await response.json();
    return data.results as Movie[]; // Devuelve la lista de películas
  } catch (error) {
    console.error("Error al buscar películas:", error);
    throw error; // Relanza el error para que el componente que llama lo maneje
  }
};
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Parte 3: Implementar el Hook `useDebounce`" },
		{
			type: "paragraph",
			text: 'Para evitar hacer una llamada a la API cada vez que el usuario presiona una tecla, usaremos la técnica de "debouncing". Crearemos un hook personalizado para esto. Crea una carpeta `hooks` y dentro un archivo `useDebounce.ts`.',
		},
		{
			type: "code",
			language: "typescript",
			code: `
// hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Configura un temporizador para actualizar el valor después del retraso
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpia el temporizador si el valor cambia (por ejemplo, el usuario sigue escribiendo)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Solo se vuelve a ejecutar si el valor o el retraso cambian

  return debouncedValue;
}
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Parte 4: Crear el Componente `MovieListItem`" },
		{
			type: "paragraph",
			text: "Para mantener nuestro código limpio, crearemos un componente separado para cada elemento de la lista. Crea una carpeta `components` y dentro un archivo `MovieListItem.tsx`.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// components/MovieListItem.tsx
import React from 'react';
import { View, Text, Image } from 'react-native';
import { Movie } from '../services/api'; // Ajusta la ruta si es necesario

type MovieListItemProps = {
  movie: Movie;
};

const MovieListItem = ({ movie }: MovieListItemProps) => {
  // Construye la URL completa del póster o usa una imagen de marcador de posición
  const posterUrl = movie.poster_path
    ? \`https://image.tmdb.org/t/p/w500\${movie.poster_path}\`
    : 'https://via.placeholder.com/150/111827/FFFFFF/?text=No+Image';

  // Extrae el año de la fecha de lanzamiento
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <View className="flex-row items-center bg-slate-800 my-2 rounded-lg overflow-hidden">
      <Image source={{ uri: posterUrl }} className="w-24 h-36" />
      <View className="flex-1 p-3">
        <Text className="text-white text-lg font-bold">{movie.title}</Text>
        <Text className="text-slate-400 mt-1">{year}</Text>
        <Text className="text-yellow-400 mt-2 font-bold">
          ⭐ {movie.vote_average.toFixed(1)}
        </Text>
      </View>
    </View>
  );
};

export default MovieListItem;
`,
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "Parte 5: Construir la Pantalla de Búsqueda Principal",
		},
		{
			type: "paragraph",
			text: "Finalmente, ensamblamos todo en nuestra pantalla principal. Modifica tu `app/index.tsx` para que contenga toda la lógica de estado y la UI de la búsqueda.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// app/index.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, ActivityIndicator, SafeAreaView } from 'react-native';
import { useDebounce } from '../hooks/useDebounce';
import { searchMovies, Movie } from '../services/api';
import MovieListItem from '../components/MovieListItem';

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Aplica el debounce al término de búsqueda
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Este efecto se ejecuta cuando el término "debounced" cambia
  useEffect(() => {
    const fetchMovies = async () => {
      // Solo busca si hay un término de búsqueda
      if (debouncedSearchTerm) {
        setLoading(true);
        setError(null);
        try {
          const movies = await searchMovies(debouncedSearchTerm);
          setResults(movies);
        } catch (e) {
          setError('No se pudieron cargar las películas.');
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]); // Limpia los resultados si la búsqueda está vacía
      }
    };
    fetchMovies();
  }, [debouncedSearchTerm]);

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="p-4">
        <TextInput
          className="bg-slate-800 text-white p-4 rounded-lg text-lg"
          placeholder="Buscar película..."
          placeholderTextColor="#9ca3af"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        {loading && <ActivityIndicator size="large" className="mt-10" />}
        {error && <Text className="text-red-500 text-center mt-10">{error}</Text>}

        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieListItem movie={item} />}
          className="mt-4"
          ListEmptyComponent={() => (
            !loading && debouncedSearchTerm ?
            <Text className="text-slate-400 text-center mt-10">No se encontraron resultados para "{debouncedSearchTerm}".</Text>
            : null
          )}
        />
      </View>
    </SafeAreaView>
  );
}
`,
		},
		{
			type: "paragraph",
			text: "¡Y listo! Ahora tienes una pantalla de búsqueda funcional. Al escribir, la aplicación esperará 500ms, llamará a la API de TMDB y mostrará los resultados en una lista virtualizada, manejando los estados de carga y error. En la próxima conferencia, añadiremos la navegación a una pantalla de detalles.",
		},
	],
};
