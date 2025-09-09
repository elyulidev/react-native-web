import type { CurriculumTopic } from "../../../../types/types";

export const conference40: CurriculumTopic = {
	id: "conf-40",
	title: "Conf. 40: Código Limpo e Refatoração",
	content: [
		{ type: "heading", text: "Refatoração e Código Limpo" },
		{
			type: "paragraph",
			text: "Escrever código que funciona é apenas o primeiro passo. Escrever código limpo — código que é legível, de fácil manutenção e modificação — é uma habilidade essencial para o desenvolvimento profissional. A refatoração é o processo de reestruturar o código existente, sem alterar o seu comportamento externo, para melhorar estes atributos.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Princípios Chave do Código Limpo" },
		{
			type: "list",
			items: [
				"**DRY (Don't Repeat Yourself):** Não se repita. Se tem o mesmo bloco de código em dois ou mais locais, provavelmente deveria extraí-lo para uma função ou componente reutilizável.",
				"**SRP (Single Responsibility Principle):** Princípio da Responsabilidade Única. Cada componente ou função deve ter uma, e apenas uma, razão para mudar. Um componente não deve ser responsável por buscar dados, gerir o estado de um formulário E renderizar uma lista complexa.",
				"**Nomes Significativos:** Use nomes de variáveis, funções e componentes que descrevam claramente o seu propósito. `MovieSearchScreen` é melhor que `Screen1`. `isLoading` é melhor que `flag`.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: '2. "Code Smells" Comuns a Evitar' },
		{
			type: "paragraph",
			text: 'Os "Code Smells" (maus cheiros no código) são sintomas de que algo pode estar errado no seu código e poderia beneficiar de uma refatoração.',
		},
		{
			type: "list",
			items: [
				"**Componentes Monstruosos:** Um único ficheiro de componente com centenas de linhas de código, a gerir múltiplas responsabilidades.",
				"**Lógica Duplicada:** A mesma lógica de `fetch` ou de gestão de estado copiada e colada em diferentes componentes.",
				"**Nomes Mágicos:** Usar strings ou números diretamente no código sem explicação (ex. `if (user.status === 2)`). É melhor usar constantes (ex. `if (user.status === STATUS.ACTIVE)`).",
				"**Aninhamento Excessivo:** Múltiplos níveis de `if` ou ciclos aninhados que tornam o código difícil de seguir.",
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Exercício Prático: Refatorando um Ecrã de Pesquisa",
		},
		{
			type: "paragraph",
			text: "Vamos pegar no ecrã de pesquisa de filmes do módulo anterior. Embora funcional, mistura a lógica da API, a gestão de estado e a renderização da UI num único componente. Vamos refatorá-lo.",
		},

		{ type: "paragraph", text: "**ANTES: O Componente Monstruoso**" },
		{
			type: "paragraph",
			text: "Tudo está em `app/index.tsx`. É difícil de ler e ainda mais difícil de reutilizar qualquer parte da sua lógica.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// app/index.tsx (Versão original, não refatorada)
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, ActivityIndicator, SafeAreaView, Image } from 'react-native';

const API_KEY = 'SUA_CHAVE';

// ... (hook useDebounce definido aqui ou importado) ...

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
        .catch(err => setError('Erro ao carregar'))
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

		{ type: "paragraph", text: "**DEPOIS: A Versão Refatorada**" },
		{
			type: "paragraph",
			text: "Separaremos as responsabilidades em ficheiros mais pequenos e manejáveis.",
		},

		{
			type: "paragraph",
			text: "**1. Mover a Lógica para um Hook Personalizado (`hooks/useMovieSearch.ts`)**",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';
import { searchMovies, Movie } from '../services/api'; // Assumindo que a API está em services

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
        .catch(() => setError('Não foi possível carregar os filmes.'))
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
			text: "**2. Criar um Componente de UI Reutilizável (`components/MovieListItem.tsx`)**",
		},
		{
			type: "paragraph",
			text: "Isto já fizemos no projeto do módulo 4, demonstrando que já estávamos a aplicar bons princípios.",
		},

		{
			type: "paragraph",
			text: "**3. O Componente do Ecrã Agora é Limpo e Declarativo**",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// app/index.tsx (Versão refatorada)
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
          placeholder="Procurar filme..."
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
			text: "Observe como o ecrã agora só se preocupa com a UI e em ligar o estado do hook aos componentes. A lógica de pesquisa é completamente independente e poderia ser reutilizada noutra parte da app.",
		},
	],
};
