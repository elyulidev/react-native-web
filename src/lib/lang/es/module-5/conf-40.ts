import type { CurriculumTopic } from "../../../../types/types";

export const conference40: CurriculumTopic = {
	id: "conf-40",
	title: "Conf. 40: Código Limpio y Refactorización",
	content: [
		{ type: "heading", text: "Refactorización y Código Limpio" },
		{
			type: "paragraph",
			text: "Escribir código que funciona es solo el primer paso. Escribir código limpio —código que es legible, mantenible y fácil de modificar— es una habilidad esencial para el desarrollo profesional. La refactorización es el proceso de reestructurar el código existente, sin cambiar su comportamiento externo, para mejorar estos atributos.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Principios Clave del Código Limpio" },
		{
			type: "list",
			items: [
				"**DRY (Don't Repeat Yourself):** No te repitas. Si tienes el mismo bloque de código en dos o más lugares, probablemente deberías extraerlo a una función o componente reutilizable.",
				"**SRP (Single Responsibility Principle):** Principio de Responsabilidad Única. Cada componente o función debe tener una, y solo una, razón para cambiar. Un componente no debería ser responsable de buscar datos, manejar el estado de un formulario Y renderizar una lista compleja.",
				"**Nombres Significativos:** Usa nombres de variables, funciones y componentes que describan claramente su propósito. `MovieSearchScreen` es mejor que `Screen1`. `isLoading` es mejor que `flag`.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: '2. "Code Smells" Comunes a Evitar' },
		{
			type: "paragraph",
			text: 'Los "Code Smells" (malos olores en el código) son síntomas de que algo podría estar mal en tu código y podría beneficiarse de una refactorización.',
		},
		{
			type: "list",
			items: [
				"**Componentes Monstruosos:** Un solo archivo de componente con cientos de líneas de código, manejando múltiples responsabilidades.",
				"**Lógica Duplicada:** La misma lógica de `fetch` o de manejo de estado copiada y pegada en diferentes componentes.",
				"**Nombres Mágicos:** Usar strings o números directamente en el código sin explicación (ej. `if (user.status === 2)`). Es mejor usar constantes (ej. `if (user.status === STATUS.ACTIVE)`).",
				"**Anidamiento Excesivo:** Múltiples niveles de `if` o bucles anidados que hacen que el código sea difícil de seguir.",
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Ejercicio Práctico: Refactorizando una Pantalla de Búsqueda",
		},
		{
			type: "paragraph",
			text: "Tomemos la pantalla de búsqueda de películas del módulo anterior. Aunque funcional, mezcla la lógica de la API, el manejo del estado y la renderización de la UI en un solo componente. Vamos a refactorizarla.",
		},

		{ type: "paragraph", text: "**ANTES: El Componente Monstruoso**" },
		{
			type: "paragraph",
			text: "Todo está en `app/index.tsx`. Es difícil de leer y aún más difícil de reutilizar cualquier parte de su lógica.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// app/index.tsx (Versión original, sin refactorizar)
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, ActivityIndicator, SafeAreaView, Image } from 'react-native';

const API_KEY = 'TU_CLAVE';

// ... (hook useDebounce definido aquí o importado) ...

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      fetch(\`https://api.themoviedb.org/3/search/movie?api_key=\${API_KEY}&query=\${debouncedSearchTerm}\`)
        .then(res => res.json())
        .then(data => setResults(data.results))
        .catch(err => setError('Error al cargar'))
        .finally(() => setLoading(false));
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <SafeAreaView>
      <TextInput value={searchTerm} onChangeText={setSearchTerm} />
      {loading && <ActivityIndicator />}
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: \`https://image.tmdb.org/t/p/w500\${item.poster_path}\` }} />
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
`,
		},

		{ type: "paragraph", text: "**DESPUÉS: La Versión Refactorizada**" },
		{
			type: "paragraph",
			text: "Separaremos las responsabilidades en archivos más pequeños y manejables.",
		},

		{
			type: "paragraph",
			text: "**1. Mover la Lógica a un Hook Personalizado (`hooks/useMovieSearch.ts`)**",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';
import { searchMovies, Movie } from '../services/api'; // Suponiendo que la API está en services

export const useMovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      setError(null);
      searchMovies(debouncedSearchTerm)
        .then(setResults)
        .catch(() => setError('No se pudieron cargar las películas.'))
        .finally(() => setLoading(false));
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return { searchTerm, setSearchTerm, results, loading, error };
};
`,
		},
		{
			type: "paragraph",
			text: "**2. Crear un Componente de UI Reutilizable (`components/MovieListItem.tsx`)**",
		},
		{
			type: "paragraph",
			text: "Esto ya lo hicimos en el proyecto del módulo 4, demostrando que ya estábamos aplicando buenos principios.",
		},

		{
			type: "paragraph",
			text: "**3. El Componente de la Pantalla Ahora es Limpio y Declarativo**",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// app/index.tsx (Versión refactorizada)
import React from 'react';
import { View, TextInput, FlatList, Text, ActivityIndicator, SafeAreaView } from 'react-native';
import { useMovieSearch } from '../hooks/useMovieSearch';
import MovieListItem from '../components/MovieListItem';

export default function SearchScreen() {
  const { searchTerm, setSearchTerm, results, loading, error } = useMovieSearch();

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="p-4">
        <TextInput
          className="bg-slate-800 text-white p-4 rounded-lg"
          placeholder="Buscar película..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        {loading && <ActivityIndicator size="large" className="mt-10" />}
        {error && <Text className="text-red-500 text-center mt-10">{error}</Text>}

        <FlatList
          data={results}
          renderItem={({ item }) => <MovieListItem movie={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}
`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Observa cómo la pantalla ahora solo se preocupa de la UI y de conectar el estado del hook con los componentes. La lógica de búsqueda es completamente independiente y podría ser reutilizada en otra parte de la app.",
		},
	],
};
