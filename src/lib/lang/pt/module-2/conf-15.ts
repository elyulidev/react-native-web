import type { CurriculumTopic } from "../../../../types/types";

export const conference15: CurriculumTopic = {
	id: "conf-15",
	title: "Conf. 15: Tipagem com TypeScript",
	content: [
		{ type: "heading", text: "Tipagem com TypeScript no React Native" },
		{
			type: "paragraph",
			text: "O TypeScript é uma extensão do JavaScript que adiciona tipos estáticos. No desenvolvimento com React Native, permite-nos escrever código mais robusto, previsível e de fácil manutenção, detetando erros comuns durante o desenvolvimento em vez de em tempo de execução.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Introdução e Configuração" },
		{
			type: "paragraph",
			text: "Felizmente, o Expo simplifica enormemente a configuração do TypeScript. Ao criar um novo projeto, podemos escolher um modelo de TypeScript e o Expo trata de tudo.",
		},
		{
			type: "code",
			language: "bash",
			code: "npx create-expo-app@latest minha-app-com-ts --template blank-ts",
		},
		{
			type: "paragraph",
			text: "Isto gera um ficheiro `tsconfig.json` na raiz do seu projeto. Este ficheiro contém as regras que o TypeScript utilizará para verificar o seu código. Geralmente, não precisa de modificar a configuração padrão.",
		},
		{
			type: "paragraph",
			text: "Para que o TypeScript reconheça tipos de ficheiros não-código, como imagens, criamos um ficheiro de declaração de tipos. Por exemplo, um ficheiro `images.d.ts` na raiz:",
		},
		{
			type: "code",
			language: "typescript",
			code: `// images.d.ts
declare module '*.png';
declare module '*.jpg';`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "A extensão de ficheiro para componentes React que usam TypeScript é `.tsx`.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Benefícios Chave de Usar TypeScript" },
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "ShieldCheckIcon",
					title: "Segurança de Tipos",
					text: "Define explicitamente os tipos para variáveis, props e estados. O compilador avisa-o se passar um número onde se espera uma string, evitando erros inesperados em produção.",
				},
				{
					icon: "ArrowPathIcon",
					title: "Refatoração Segura",
					text: "Ao alterar o nome de uma propriedade ou o seu tipo, o TypeScript mostrar-lhe-á todos os locais no seu código que precisam de ser atualizados. Isto torna a refatoração muito menos propensa a erros.",
				},
				{
					icon: "DocumentTextIcon",
					title: "Código Autodocumentado e de Fácil Manutenção",
					text: "Os tipos e interfaces atuam como documentação. Facilitam que outros programadores (e o seu eu do futuro!) entendam a estrutura dos dados e como os componentes funcionam, além de potenciarem o autocompletar no seu editor.",
				},
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Declaração de Tipos e Interfaces" },
		{
			type: "paragraph",
			text: 'Usamos `interface` ou `type` para definir a "forma" dos nossos objetos. São a base para tipar props, estados e dados.',
		},

		{ type: "paragraph", text: "**Tipagem de Props de Componentes:**" },
		{
			type: "paragraph",
			text: "Para garantir que um componente reutilizável recebe as propriedades corretas, definimos uma interface para as suas props.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import React from 'react';
import { Pressable, Text, PressableProps } from 'react-native';

// 1. Definimos a interface para as props
interface CustomButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

// 2. Usamos a interface para tipar as props do componente
const CustomButton: React.FC<CustomButtonProps> = ({ title, variant = 'primary', ...props }) => {
  const buttonClass = variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500';

  return (
    <Pressable className={'p-3 rounded-lg ' + buttonClass} {...props}>
      <Text className="text-white text-center font-bold">{title}</Text>
    </Pressable>
  );
};

export default CustomButton;
`,
		},

		{ type: "paragraph", text: "**Tipagem de Estado (`useState`):**" },
		{
			type: "paragraph",
			text: "O TypeScript consegue muitas vezes inferir o tipo do estado a partir do seu valor inicial. No entanto, se o estado puder ter mais do que um tipo (ex. um objeto de utilizador ou `null` antes de iniciar sessão), devemos ser explícitos.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { useState } from 'react';

// Interface para o nosso modelo de dados
interface User {
  id: number;
  name: string;
}

const UserProfile = () => {
  // O TypeScript infere que 'counter' é do tipo 'number'
  const [counter, setCounter] = useState(0);

  // Aqui devemos ser explícitos: o utilizador pode ser do tipo User OU null
  const [user, setUser] = useState<User | null>(null);

  // ...
};
`,
		},

		{ type: "paragraph", text: "**Tipagem de Dados (Modelos de API/BD):**" },
		{
			type: "paragraph",
			text: "É uma excelente prática definir interfaces para as estruturas de dados que manuseia na sua aplicação, como as respostas de uma API.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
export interface Movie {
  id: string;
  title: string;
  releaseYear: number;
  posterUrl: string;
  rating?: number; // O ponto de interrogação indica que a propriedade é opcional
}

// Num componente que consome uma API...
const [movie, setMovie] = useState<Movie | null>(null);
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Integração com o Ecossistema" },
		{ type: "paragraph", text: "**Expo Router e `useLocalSearchParams`:**" },
		{
			type: "paragraph",
			text: "O TypeScript brilha ao trabalhar com rotas dinâmicas. O hook `useLocalSearchParams` devolve os parâmetros do URL, e podemos usar o TypeScript para garantir que estamos a aceder aos parâmetros corretos.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// Em app/movies/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function MovieDetailsScreen() {
  // Os parâmetros são strings por defeito.
  const { id } = useLocalSearchParams<{ id: string }>();

  // Agora o TypeScript sabe que 'id' é uma string.
  // Poderíamos usar este 'id' para procurar o filme na nossa API.

  return (
    <View>
      <Text>Detalhes do Filme com ID: {id}</Text>
    </View>
  );
}`,
		},

		{ type: "paragraph", text: "**Componentes Nativos do React Native:**" },
		{
			type: "paragraph",
			text: "A maioria das bibliotecas, incluindo o React Native, vem com os seus próprios tipos. Isto significa que se tentar passar uma prop incorreta a um componente nativo, o TypeScript irá avisá-lo.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { ActivityIndicator } from 'react-native';

const MyLoader = () => {
  return (
    <ActivityIndicator
      size="large"
      // color={123} // Erro! O TypeScript irá dizer-lhe:
      // O tipo 'number' não pode ser atribuído ao tipo 'ColorValue'.
      color="#0000ff" // Correto
    />
  );
};
`,
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Qual é a principal vantagem de usar TypeScript no React Native?",
					options: [
						"Torna a aplicação mais rápida.",
						"Adiciona segurança de tipos para detetar erros durante o desenvolvimento.",
						"Permite usar CSS diretamente.",
						"É exigido pela Apple para publicar na App Store.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Que extensão de ficheiro é usada para um componente React que contém código TypeScript?",
					options: [".js", ".ts", ".jsx", ".tsx"],
					correctAnswer: 3,
				},
				{
					question:
						"Se tiver um estado que pode ser um objeto `User` ou `null`, como o tiparia com `useState`?",
					options: [
						"useState<User>",
						"useState(User | null)",
						"useState<User | null>(null)",
						"useState<User & null>(null)",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Como se define que a prop `onPress` é opcional numa interface TypeScript?",
					options: [
						"onPress: function?",
						"onPress?: () => void;",
						"optional onPress: () => void;",
						"onPress: optional<() => void>;",
					],
					correctAnswer: 1,
				},
			],
		},
	],
};
