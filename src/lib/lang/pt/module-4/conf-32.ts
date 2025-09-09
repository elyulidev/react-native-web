import type { CurriculumTopic } from "../../../../types/types";

export const conference32: CurriculumTopic = {
	id: "conf-32",
	title: "Conf. 32: Mini Projeto de Filmes I",
	content: [
		{ type: "heading", text: "Mini Projeto: App de Filmes (Busca)" },
		{
			type: "paragraph",
			text: "Neste projeto prático, construiremos a primeira parte de uma aplicação para procurar filmes. Integraremos uma API externa (TheMovieDB), implementaremos uma tela de busca com `TextInput` e `debouncing`, e exibiremos os resultados de forma eficiente usando `FlatList`. Este projeto consolidará tudo o que foi aprendido sobre consumo de APIs e gestão de listas.",
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/movie-app-search.png",
			caption: "A tela de busca de filmes que construiremos.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "Parte 1: Obter uma Chave de API e Configurar o Ambiente",
		},
		{
			type: "paragraph",
			text: "Para nos comunicarmos com o The Movie Database (TMDB), primeiro, você precisa de uma chave de API. É grátis e essencial para o nosso projeto.",
		},
		{
			type: "list",
			items: [
				"**1. Registe-se:** Vá a [themoviedb.org](https://www.themoviedb.org/) e crie uma conta.",
				'**2. Solicite uma chave de API:** Nas configurações do seu perfil, vá à secção "API" e siga os passos para solicitar uma chave de programador.',
				"**3. Armazene a chave de forma segura:** Assim que tiver a sua chave, crie um ficheiro chamado `.env` na raiz do seu projeto Expo. Este ficheiro guardará os seus segredos de forma segura.",
			],
		},
		{
			type: "code",
			language: "bash",
			code: `
# .env
# IMPORTANTE: O prefixo EXPO_PUBLIC_ é necessário para que o Expo a reconheça.
EXPO_PUBLIC_TMDB_API_KEY="A_SUA_CHAVE_DE_API_AQUI"
`,
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Certifique-se de adicionar o ficheiro `.env` ao seu `.gitignore` para não enviar as suas chaves para repositórios públicos. Depois de criar ou modificar o ficheiro `.env`, deve reiniciar o servidor de desenvolvimento do Expo com o comando `npx expo start --clear` para que as alterações entrem em vigor.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Parte 2: Criar o Serviço da API" },
		{
			type: "paragraph",
			text: "É uma boa prática encapsular toda a lógica das chamadas à API num único local. Crie uma nova pasta `services` e, dentro dela, um ficheiro `api.ts`.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
// services/api.ts
const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const API_URL = 'https://api.themoviedb.org/3';

// Definimos a "forma" dos dados de um filme que esperamos da API
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

// Função para procurar filmes por um termo de busca (query)
export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (!query) {
    return []; // Se não houver busca, devolve um array vazio
  }
  try {
    const response = await fetch(
      \`\${API_URL}/search/movie?api_key=\${API_KEY}&query=\${encodeURIComponent(query)}&language=pt-BR\`
    );
    if (!response.ok) {
      throw new Error('A resposta da rede não foi bem-sucedida');
    }
    const data = await response.json();
    return data.results as Movie[]; // Devolve a lista de filmes
  } catch (error) {
    console.error("Erro ao procurar filmes:", error);
    throw error; // Relança o erro para que o componente que chama o trate
  }
};
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Parte 3: Implementar o Hook `useDebounce`" },
		{
			type: "paragraph",
			text: 'Para evitar fazer uma chamada à API cada vez que o utilizador prime uma tecla, usaremos a técnica de "debouncing". Criaremos um hook personalizado para isto. Crie uma pasta `hooks` e dentro dela um ficheiro `useDebounce.ts`.',
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
    // Configura um temporizador para atualizar o valor após o atraso
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpa o temporizador se o valor mudar (por exemplo, o utilizador continua a escrever)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Só é executado novamente se o valor ou o atraso mudarem

  return debouncedValue;
}
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Parte 4: Criar o Componente `MovieListItem`" },
		{
			type: "paragraph",
			text: "Para manter o nosso código limpo, criaremos um componente separado para cada item da lista. Crie uma pasta `components` e dentro dela um ficheiro `MovieListItem.tsx`.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// components/MovieListItem.tsx
import React from 'react';
import { View, Text, Image } from 'react-native';
import { Movie } from '../services/api'; // Ajuste o caminho se necessário

type MovieListItemProps = {
  movie: Movie;
};

const MovieListItem = ({ movie }: MovieListItemProps) => {
  // Constrói o URL completo do poster ou usa uma imagem de placeholder
  const posterUrl = movie.poster_path
    ? \`https://image.tmdb.org/t/p/w500\${movie.poster_path}\`
    : 'https://via.placeholder.com/150/111827/FFFFFF/?text=No+Image';

  // Extrai o ano da data de lançamento
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

		{ type: "subtitle", text: "Parte 5: Construir a Tela de Busca Principal" },
		{
			type: "paragraph",
			text: "Finalmente, montamos tudo na nossa tela principal. Modifique o seu `app/index.tsx` para conter toda a lógica de estado e a UI da busca.",
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

  // Aplica o debounce ao termo de busca
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Este efeito é executado quando o termo "debounced" muda
  useEffect(() => {
    const fetchMovies = async () => {
      // Apenas busca se houver um termo de busca
      if (debouncedSearchTerm) {
        setLoading(true);
        setError(null);
        try {
          const movies = await searchMovies(debouncedSearchTerm);
          setResults(movies);
        } catch (e) {
          setError('Não foi possível carregar os filmes.');
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]); // Limpa os resultados se a busca estiver vazia
      }
    };
    fetchMovies();
  }, [debouncedSearchTerm]);

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="p-4">
        <TextInput
          className="bg-slate-800 text-white p-4 rounded-lg text-lg"
          placeholder="Procurar filme..."
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
            <Text className="text-slate-400 text-center mt-10">Não foram encontrados resultados para "{debouncedSearchTerm}".</Text>
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
			text: "E está pronto! Agora tem uma tela de busca funcional. Ao escrever, a aplicação esperará 500ms, chamará a API do TMDB e exibirá os resultados numa lista virtualizada, gerindo os estados de carregamento e erro. Na próxima conferência, adicionaremos a navegação para uma tela de detalhes.",
		},
	],
};
