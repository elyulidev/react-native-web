import type { CurriculumTopic } from "../../../../types/types";

export const conference8: CurriculumTopic = {
	id: "conf-8",
	title: "Conf. 8: Mini Projeto de UI",
	content: [
		{ type: "heading", text: "Mini Projeto: Criando um Cartão de Filme" },
		{
			type: "paragraph",
			text: "É hora de colocar em prática tudo o que aprendemos no Módulo 1! Neste mini projeto, construiremos um componente de UI reutilizável e visualmente atraente: um cartão de filme. Este exercício consolidará seus conhecimentos sobre componentes, layout com Flexbox, estilização com NativeWind e gerenciamento de ativos.",
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/movie-card-project-goal.png",
			caption: "O componente `MovieCard` que iremos construir.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "Passo 1: Preparação do Componente e Ativos" },
		{
			type: "paragraph",
			text: "Primeiro, vamos criar o arquivo para o nosso novo componente. Dentro do seu projeto, crie uma pasta `components` (se ainda não existir) e, dentro dela, um novo arquivo chamado `MovieCard.tsx`.",
		},
		{
			type: "paragraph",
			text: "Copie o seguinte código base para o seu novo arquivo. Este será o nosso ponto de partida.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dados de exemplo para o filme
const movieData = {
  posterUrl: 'https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/movie-poster-interstellar.jpg',
  title: 'Interstellar',
  year: '2014',
  genre: 'Ficção Científica',
  rating: '8.6',
};

const MovieCard = () => {
  // Aqui construiremos o nosso componente
  return (
    <View>
      <Text>Cartão de Filme</Text>
    </View>
  );
};

export default MovieCard;
`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "Para a imagem do cartaz, usaremos uma URL. Num projeto real, você poderia obter estes dados de uma API ou dos seus ativos locais.",
		},

		{ type: "divider" },

		{
			type: "subtitle",
			text: "Passo 2: Estrutura Principal e Estilo do Contentor",
		},
		{
			type: "paragraph",
			text: "Vamos começar pelo contentor principal. Queremos que ele tenha um fundo escuro, cantos arredondados e uma sombra para que pareça um cartão. Usaremos o NativeWind para isso.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// ... (importações e dados)

const MovieCard = () => {
  return (
    // Contentor principal do cartão
    <View className="bg-slate-800 rounded-2xl overflow-hidden w-full max-w-xs shadow-lg">
      {/* Aqui irão a imagem e os detalhes */}
    </View>
  );
};

export default MovieCard;
`,
		},
		{
			type: "list",
			items: [
				"**`bg-slate-800`**: Define uma cor de fundo cinza-escura.",
				"**`rounded-2xl`**: Aplica um raio de borda grande para cantos suaves.",
				"**`overflow-hidden`**: Garante que a imagem que colocarmos dentro também tenha os cantos arredondados.",
				"**`w-full max-w-xs`**: Faz com que o cartão ocupe toda a largura disponível até um máximo de `xs` (extra small).",
				"**`shadow-lg`**: Adiciona uma sombra pronunciada (mais visível no iOS).",
			],
		},

		{ type: "divider" },

		{ type: "subtitle", text: "Passo 3: Adicionar a Imagem do Cartaz" },
		{
			type: "paragraph",
			text: "Agora, vamos adicionar a imagem do cartaz dentro do nosso contentor. Faremos com que ocupe toda a largura do cartão e daremos uma altura fixa.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// ...

const MovieCard = () => {
  return (
    <View className="bg-slate-800 rounded-2xl overflow-hidden w-full max-w-xs shadow-lg">
      <Image
        source={{ uri: movieData.posterUrl }}
        className="w-full h-96"
      />
      {/* Contentor para os detalhes do filme */}
    </View>
  );
};

// ...
`,
		},
		{
			type: "list",
			items: [
				"**`source={{ uri: movieData.posterUrl }}`**: Carrega a imagem a partir da URL que definimos.",
				"**`w-full h-96`**: A imagem ocupará 100% da largura do contentor e terá uma altura de 96 unidades (384px por padrão).",
			],
		},

		{ type: "divider" },

		{ type: "subtitle", text: "Passo 4: Adicionar os Detalhes do Filme" },
		{
			type: "paragraph",
			text: "Abaixo da imagem, criaremos uma secção com o título, o gênero e a classificação. Usaremos uma `<View>` com preenchimento e flexbox para organizar o conteúdo.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// ...

const MovieCard = () => {
  return (
    <View className="bg-slate-800 rounded-2xl overflow-hidden w-full max-w-xs shadow-lg">
      <Image
        source={{ uri: movieData.posterUrl }}
        className="w-full h-96"
      />
      {/* Contentor para os detalhes */}
      <View className="p-4">
        <Text className="text-white text-2xl font-bold mb-1">{movieData.title}</Text>
        <Text className="text-slate-400 text-base mb-3">{movieData.year} · {movieData.genre}</Text>

        {/* Contentor para a classificação */}
        <View className="flex-row items-center gap-2">
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text className="text-white text-lg font-semibold">{movieData.rating}</Text>
        </View>
      </View>
    </View>
  );
};
// ...
`,
		},
		{
			type: "list",
			items: [
				"**`p-4`**: Adiciona preenchimento ao redor da secção de detalhes.",
				"**`text-white`, `text-slate-400`**: Aplica cores ao texto, criando hierarquia visual.",
				"**`text-2xl`, `text-base`, `font-bold`**: Controla o tamanho e o peso da fonte.",
				"**`mb-1`, `mb-3`**: Adiciona margem inferior para espaçar os elementos.",
				"**`flex-row items-center gap-2`**: Cria um layout horizontal para a classificação, alinha os elementos verticalmente ao centro e adiciona um pequeno espaço entre o ícone e o texto.",
			],
		},

		{ type: "divider" },

		{ type: "subtitle", text: "Passo 5: Adicionar um Botão de Ação" },
		{
			type: "paragraph",
			text: 'Para completar o nosso cartão, adicionaremos um botão "Ver Detalhes". Usaremos o componente `<Pressable>` para que seja interativo e estilizá-lo-emos para que se destaque.',
		},
		{
			type: "code",
			language: "jsx",
			code: `
// ... (dentro da View com p-4, depois da classificação)

        {/* ... (código da classificação) */}

        <Pressable className="bg-primary-500 rounded-lg py-3 mt-4">
          <Text className="text-white font-bold text-center text-lg">Ver Detalhes</Text>
        </Pressable>
`,
		},
		{
			type: "list",
			items: [
				"**`bg-primary-500`**: Usa a cor primária definida no nosso tema para o fundo.",
				"**`rounded-lg py-3 mt-4`**: Dá forma ao botão com cantos arredondados, preenchimento vertical e uma margem superior para separá-lo do conteúdo anterior.",
				"**`text-white font-bold text-center text-lg`**: Estiliza o texto do botão para que seja legível e claro.",
			],
		},

		{ type: "divider" },

		{ type: "subtitle", text: "Passo 6: Código Final e Uso do Componente" },
		{
			type: "paragraph",
			text: "Parabéns! Você construiu um componente complexo e reutilizável. Aqui está o código completo para `MovieCard.tsx`:",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const movieData = {
  posterUrl: 'https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/movie-poster-interstellar.jpg',
  title: 'Interstellar',
  year: '2014',
  genre: 'Ficção Científica',
  rating: '8.6',
};

const MovieCard = () => {
  return (
    <View className="bg-slate-800 rounded-2xl overflow-hidden w-full max-w-xs shadow-lg">
      <Image
        source={{ uri: movieData.posterUrl }}
        className="w-full h-96"
      />
      <View className="p-4">
        <Text className="text-white text-2xl font-bold mb-1">{movieData.title}</Text>
        <Text className="text-slate-400 text-base mb-3">{movieData.year} · {movieData.genre}</Text>

        <View className="flex-row items-center gap-2">
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text className="text-white text-lg font-semibold">{movieData.rating}</Text>
        </View>

        <Pressable className="bg-primary-500 rounded-lg py-3 mt-4">
          <Text className="text-white font-bold text-center text-lg">Ver Detalhes</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MovieCard;
`,
		},
		{
			type: "paragraph",
			text: "Para vê-lo em ação, importe e use o seu novo componente na sua tela principal (por exemplo, `app/index.tsx`):",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import { View } from 'react-native';
import MovieCard from '../components/MovieCard'; // Ajuste o caminho se necessário

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-900 p-4">
      <MovieCard />
    </View>
  );
}
`,
		},
		{
			type: "paragraph",
			text: "Este mini projeto demonstra como combinar diferentes componentes e utilitários de estilo para criar interfaces de utilizador polidas e profissionais. Excelente trabalho!",
		},
	],
};
