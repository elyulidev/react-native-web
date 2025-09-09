import type { CurriculumTopic } from "../../../../types/types";

export const conference37: CurriculumTopic = {
	id: "conf-37",
	title: "Conf. 37: Arquitetura de Aplicações",
	content: [
		{ type: "heading", text: "Arquitetura de Aplicações Móveis" },
		{
			type: "paragraph",
			text: "Uma boa arquitetura é a base de uma aplicação escalável, de fácil manutenção e depuração. Não se trata de regras rígidas, mas de princípios que orientam como organizamos o nosso código para evitar o caos à medida que o projeto cresce.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Princípios de Design Chave" },
		{
			type: "list",
			items: [
				"**Separação de Responsabilidades (Separation of Concerns):** Cada parte da sua aplicação deve ter uma única responsabilidade. A lógica da UI deve estar separada da lógica de negócio e do acesso a dados.",
				"**Desenvolvimento Orientado a Componentes (Component-Driven Development - CDD):** Pense na sua UI como um conjunto de blocos de Lego. Construa componentes pequenos, isolados e reutilizáveis (Botões, Cartões, Avatares) e depois componha-os para criar ecrãs complexos.",
				"**Centralização da Lógica:** Evite duplicar código. Se várias partes da sua app precisam da mesma lógica (ex. formatar uma data), crie-a uma vez num ficheiro de utilitários (`utils`) e importe-a onde for necessário.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Estrutura de Pastas Recomendada" },
		{
			type: "paragraph",
			text: "Uma estrutura de pastas bem definida é a manifestação física de uma boa arquitetura. Aqui está uma estrutura robusta e comummente utilizada em projetos de React Native:",
		},
		{
			type: "fileStructure",
			files: [
				{
					id: "app",
					name: "app/",
					description: [
						"Contém as rotas e a navegação da aplicação, gerido pelo Expo Router. Cada ficheiro aqui é um ecrã.",
					],
				},
				{
					id: "assets",
					name: "assets/",
					description: [
						"Armazena todos os ficheiros estáticos como imagens, fontes e ícones.",
					],
				},
				{
					id: "components",
					name: "components/",
					description: [
						"O coração da sua UI. Contém componentes reutilizáveis. Muitas vezes é subdividido em `ui/` (genéricos como Button, Input) e `shared/` (específicos da app como MovieCard).",
					],
				},
				{
					id: "constants",
					name: "constants/",
					description: [
						"Guarda valores que não mudam, como paletas de cores, chaves de API, ou URLs base.",
					],
				},
				{
					id: "contexts",
					name: "contexts/",
					description: [
						"Para a gestão de estado global com React Context. Cada contexto (ex. `AuthContext`, `ThemeContext`) tem o seu próprio ficheiro.",
					],
				},
				{
					id: "db",
					name: "db/",
					description: [
						"Toda a lógica da base de dados local vive aqui. Inclui `schema.ts`, a ligação (`index.ts`) e scripts de seeding.",
					],
				},
				{
					id: "hooks",
					name: "hooks/",
					description: [
						"Armazena hooks personalizados (`useDebounce`, `useTheme`, `useApi`) para encapsular e reutilizar lógica de estado.",
					],
				},
				{
					id: "services",
					name: "services/",
					description: [
						"Centraliza a comunicação com APIs externas. Cada função aqui encarrega-se de um pedido de rede específico.",
					],
				},
				{
					id: "types",
					name: "types/",
					description: [
						"Define as interfaces e tipos de TypeScript que são usados em toda a aplicação (ex. `User`, `Movie`, `Property`).",
					],
				},
				{
					id: "utils",
					name: "utils/",
					description: [
						"Contém funções de ajuda puras e reutilizáveis que não dependem do estado do React, como formatadores de data ou validadores.",
					],
				},
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Fluxo de Dados Típico" },
		{
			type: "paragraph",
			text: "Com esta arquitetura, o fluxo de dados para mostrar uma lista de filmes, por exemplo, seria assim:",
		},
		{
			type: "list",
			items: [
				"**1. Ecrã (`app/index.tsx`):** O componente do ecrã é montado.",
				"**2. Hook (`hooks/useMovies.ts`):** O ecrã chama um hook personalizado `useMovies()` para obter os dados.",
				"**3. Serviço (`services/api.ts`):** O hook `useMovies` chama a função `fetchPopularMovies()` do serviço de API.",
				"**4. API Externa:** O serviço realiza o pedido `fetch` à API do TMDB.",
				"**5. Tipos (`types/index.ts`):** Os dados recebidos são validados contra a interface `Movie` definida.",
				"**6. Estado do Hook:** O hook atualiza o seu estado interno (`data`, `loading`, `error`) e devolve-o ao ecrã.",
				"**7. Renderização na UI:** O ecrã recebe os dados e passa-os aos componentes de UI (`components/MovieCard.tsx`) para a sua renderização.",
			],
		},
		{
			type: "callout",
			alertType: "info",
			text: "Este fluxo unidirecional e a separação clara de responsabilidades tornam a aplicação muito mais fácil de entender, depurar e escalar.",
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Em que pasta colocaria um hook personalizado como `useDebounce`?",
					options: ["components/", "utils/", "hooks/", "services/"],
					correctAnswer: 2,
				},
				{
					question:
						"Uma função que formata um número para uma string de moeda (ex. 100 para '100,00 €') é um bom candidato para estar na pasta...",
					options: ["hooks/", "constants/", "utils/", "components/"],
					correctAnswer: 2,
				},
				{
					question:
						"O princípio da 'Separação de Responsabilidades' sugere que...",
					options: [
						"Deve separar o seu código no maior número possível de ficheiros.",
						"A lógica da UI, a lógica de negócio e o acesso a dados devem estar em partes distintas e bem definidas do seu código.",
						"Cada componente deve ter o seu próprio ficheiro de estilos.",
						"Deve usar um hook para cada pedaço de estado.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"A lógica para fazer um pedido `fetch` a uma API de utilizadores deveria viver em...",
					options: [
						"No componente do ecrã de perfil.",
						"Num hook `useUsers`.",
						"Na pasta `db/`.",
						"Num ficheiro dentro da pasta `services/`.",
					],
					correctAnswer: 3,
				},
			],
		},
	],
};
