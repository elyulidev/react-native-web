import type { CurriculumTopic } from "../../../../types/types";

export const conference2: CurriculumTopic = {
	id: "conf-2",
	title: "Conf. 2: Configuração do Ambiente",
	content: [
		{ type: "heading", text: "Configuração do Ambiente de Desenvolvimento" },

		{
			type: "subtitle",
			text: "Instalação do Node.js e Gerenciadores de Pacotes",
		},
		{
			type: "paragraph",
			text: "Node.js é o ambiente de execução para JavaScript e um pré-requisito para o desenvolvimento com React Native. Recomenda-se instalar a versão LTS (Long-Term Support) a partir do seu site oficial.",
		},
		{
			type: "paragraph",
			text: "Uma vez instalado, pode verificar a versão no seu terminal:",
		},
		{ type: "code", language: "bash", code: "node --version" },
		{
			type: "paragraph",
			text: "Juntamente com o Node.js, é instalado o npm (Node Package Manager). O npm e o pnpm são gerenciadores de pacotes usados para instalar dependências no seu projeto.",
		},
		{
			type: "code",
			language: "bash",
			code: `npm install <package-name>  # Instala um pacote com npm
pnpm add <package-name>      # Instala um pacote com pnpm

npm install -D <package-name> # Instala dependência de desenvolvimento com npm
pnpm add -D <package-name>    # Instala dependência de desenvolvimento com pnpm`,
		},

		{ type: "subtitle", text: "Configuração do seu Editor de Código: VS Code" },
		{
			type: "paragraph",
			text: "O Visual Studio Code (VS Code) é o editor de código mais popular na comunidade de desenvolvimento. O seu vasto ecossistema de extensões torna-o muito poderoso.",
		},
		{
			type: "list",
			items: [
				"**Recomendação:** Instale extensões para React e React Native para obter trechos de código (snippets) úteis, como `rnfce` para criar componentes rapidamente.",
			],
		},

		{ type: "subtitle", text: "Criação de um Projeto com Expo" },
		{
			type: "paragraph",
			text: "Expo está para o React Native assim como o Next.js está para o React. É o framework recomendado pela equipe do React Native para uma melhor experiência de desenvolvimento, pois simplifica enormemente a configuração.",
		},
		{
			type: "paragraph",
			text: "Para inicializar o seu projeto, use o seguinte comando no seu terminal:",
		},
		{
			type: "code",
			language: "bash",
			code: "npx create-expo-app@latest meu-super-app",
		},
		{
			type: "paragraph",
			text: "Se quiser instalá-lo no diretório atual, basta adicionar um ponto no final:",
		},
		{ type: "code", language: "bash", code: "npx create-expo-app@latest ." },

		{ type: "subtitle", text: "Funcionalidades do Template Padrão" },
		{
			type: "paragraph",
			text: "O template inicial do Expo vem com várias funcionalidades pré-configuradas para acelerar o seu desenvolvimento:",
		},
		{
			type: "list",
			items: [
				"**Duas telas de exemplo:** Localizadas em `app/(tabs)/index.tsx` e `app/(tabs)/explore.tsx`, com uma navegação de abas configurada em `app/(tabs)/_layout.tsx`.",
				"**Roteamento baseado em arquivos:** A estrutura da pasta `app` define a navegação da sua aplicação.",
				"**Suporte para modo claro e escuro:** O template adapta-se automaticamente ao tema do sistema.",
				"**TypeScript por padrão:** Para um código mais robusto e de fácil manutenção.",
			],
		},
		{
			type: "callout",
			alertType: "tip",
			text: "O template padrão é um excelente ponto de partida, mas às vezes você vai querer começar do zero.",
		},
		{ type: "subtitle", text: "Reiniciar o seu Projeto" },
		{
			type: "paragraph",
			text: "Se preferir começar com uma estrutura mínima em vez do template de exemplo, pode remover o código padrão executando um script incluído:",
		},
		{ type: "code", language: "bash", code: "npm run reset-project" },
		{
			type: "paragraph",
			text: "Este comando moverá o conteúdo da pasta `app` para uma nova pasta `app-example` (para que possa consultá-la) e criará uma nova pasta `app` com apenas um arquivo `index.tsx` básico.",
		},

		{ type: "subtitle", text: "Estrutura de Arquivos do Projeto" },
		{
			type: "paragraph",
			text: "Ao criar um projeto Expo, é gerada uma estrutura de arquivos padrão. Explore os arquivos e pastas principais para entender o seu propósito:",
		},
		{
			type: "fileStructure",
			files: [
				{
					id: "app",
					name: "app",
					description: [
						"Contém a navegação da aplicação, que é baseada em arquivos. A estrutura de arquivos do diretório `app` determina a navegação da aplicação.",
						"Por exemplo, `app/index.tsx` é a rota principal, e `app/detalhes.tsx` torna-se a rota `/detalhes`.",
					],
				},
				{
					id: "assets",
					name: "assets",
					description: [
						"Contém imagens, fontes e outros arquivos estáticos. Por exemplo, o ícone da aplicação (`icon.png`) e a tela de início (`splash.png`).",
					],
				},
				{
					id: "components",
					name: "components",
					description: [
						"Uma pasta para os seus componentes React reutilizáveis que são usados em toda a aplicação, como botões personalizados, cartões ou cabeçalhos.",
					],
				},
				{
					id: "constants",
					name: "constants",
					description: [
						"Um local para armazenar valores constantes usados na aplicação, como paletas de cores, dimensões ou configurações.",
					],
				},
				{
					id: "app.json",
					name: "app.json",
					description: [
						"Contém as opções de configuração para o projeto. Estas opções alteram o comportamento do seu projeto durante o desenvolvimento, a construção e a publicação da sua aplicação.",
					],
				},
				{
					id: "package.json",
					name: "package.json",
					description: [
						"Contém as dependências do projeto, os scripts (como `npm start`) e os metadados. Sempre que uma nova dependência é adicionada, ela é registada aqui.",
					],
				},
				{
					id: "tsconfig.json",
					name: "tsconfig.json",
					description: [
						"Contém as regras que o TypeScript utilizará para impor a segurança de tipos em todo o projeto, ajudando a prevenir erros.",
					],
				},
			],
		},

		{ type: "subtitle", text: "Execução da sua Primeira App no Expo Go" },
		{
			type: "paragraph",
			text: "O Expo Go é uma aplicação móvel que lhe permite testar e prototipar rapidamente nos seus dispositivos físicos (Android/iOS). Descarregue-a da App Store ou Google Play Store.",
		},
		{
			type: "paragraph",
			text: "Para iniciar o servidor de desenvolvimento, execute:",
		},
		{ type: "code", language: "bash", code: "npx expo start" },
		{
			type: "paragraph",
			text: "Aparecerá um código QR no seu terminal. Digitalize-o com a câmara (iOS) ou a partir da app Expo Go (Android). O seu computador e o seu dispositivo móvel devem estar na mesma rede Wi-Fi!",
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Resolução de problemas comuns: Certifique-se de dar permissão de rede local no iOS. Se continuar a falhar, tente usar um túnel com `npx expo start --tunnel`.",
		},
		{
			type: "paragraph",
			text: "Qualquer alteração que faça no código (por exemplo, em `app/index.tsx`) será refletida instantaneamente no seu dispositivo graças ao 'hot reloading'.",
		},

		{ type: "subtitle", text: "Configuração Opcional de Simuladores" },
		{
			type: "paragraph",
			text: "Os simuladores oferecem uma experiência mais integrada no seu computador, permitindo-lhe ter o código e a app lado a lado.",
		},
		{
			type: "list",
			items: [
				"**Emulador de Android:** Requer a instalação do Android Studio, uma aplicação pesada que consome muitos recursos.",
				"**Simulador de iOS:** Requer a instalação do Xcode num Mac, que também consome bastante potência.",
				"**Recomendação:** Instale-os apenas se planeia desenvolver mais aplicações no futuro.",
			],
		},
		{
			type: "paragraph",
			text: "Com o servidor de desenvolvimento a correr (`npx expo start`), pressione `a` no terminal para abrir o emulador de Android ou `i` para o simulador de iOS.",
		},

		{ type: "divider" },
		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Qual é o comando para criar um novo projeto com Expo no diretório atual?",
					options: [
						"npx create-expo-app .",
						"expo new project .",
						"npx expo init .",
						"npm create expo-app .",
					],
					correctAnswer: 0,
				},
				{
					question: "O que é o Expo Go?",
					options: [
						"Um editor de código para React Native",
						"Uma aplicação móvel para testar e prototipar projetos Expo",
						"Uma biblioteca de componentes de UI",
						"O compilador do React Native",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Para que o Expo Go funcione corretamente, o computador e o dispositivo móvel devem...",
					options: [
						"Estar ligados por USB",
						"Ter o mesmo sistema operativo",
						"Estar na mesma rede Wi-Fi",
						"Ter o Bluetooth ativado",
					],
					correctAnswer: 2,
				},
				{
					question:
						"No terminal onde `npx expo start` está a ser executado, que tecla pressiona para abrir o simulador de iOS?",
					options: ["s", "a", "i", "e"],
					correctAnswer: 2,
				},
			],
		},
	],
};
