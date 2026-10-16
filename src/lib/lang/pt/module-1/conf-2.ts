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
			text: "Juntamente com o Node.js, é instalado o npm (Node Package Manager), mas neste curso usaremos o **Bun** como gerenciador de pacotes principal: é mais rápido e está otimizado para o ecossistema do Expo.",
		},
		{
			type: "code",
			language: "bash",
			code: `bun add <package-name>       # Instala um pacote com bun
bun add -D <package-name>    # Instala uma dependência de desenvolvimento com bun`,
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
			code: `bun create expo mi-super-app`,
		},
		{
			type: "paragraph",
			text: "Se quiser instalá-lo no diretório atual, basta adicionar um ponto no final:",
		},
		{
			type: "code",
			language: "bash",
			code: `bun create expo .`,
		},

		{ type: "subtitle", text: "Funcionalidades do Template Padrão" },
		{
			type: "paragraph",
			text: "O template inicial do Expo vem com várias funcionalidades pré-configuradas para acelerar o seu desenvolvimento:",
		},
		{
			type: "list",
			items: [
				"**Duas telas de exemplo:** Localizadas em `src/app/index.tsx` e `src/app/explore.tsx`, com a navegação de abas configurada em `src/app/_layout.tsx` (usa abas nativas no Android e iOS).",
				"**Roteamento baseado em arquivos:** A estrutura da pasta `src/app` define a navegação da sua aplicação: cada ficheiro é uma rota.",
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
		{ type: "code", language: "bash", code: "bun run reset-project" },
		{
			type: "paragraph",
			text: "Este comando moverá os diretórios `src` e `scripts` para a pasta `example` (para que possa consultá-los) e criará um novo `src/app` com ficheiros `index.tsx` e `_layout.tsx`.",
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
					name: "src/app",
					description: [
						"Contém a navegação da aplicação, que é baseada em ficheiros: cada ficheiro dentro de `src/app` é uma rota, nada mais deve viver aí.",
						"Por exemplo, `src/app/index.tsx` é a rota principal e `src/app/explore.tsx` a segunda aba; `src/app/_layout.tsx` configura as abas.",
					],
				},
				{
					id: "assets",
					name: "assets",
					description: [
						"Contém o diretório `expo.icon` para o ícone do iOS e o subdiretório `images` com os ficheiros do ícone adaptativo do Android (`android-icon-foreground.png`, `android-icon-background.png` e `android-icon-monochrome.png`).",
						"Inclui ainda `splash-icon.png` para a tela de início, `favicon.png` para a web e os ícones da navegação por abas.",
					],
				},
				{
					id: "components",
					name: "src/components",
					description: [
						"Guarda os seus componentes React reutilizáveis, como `themed-text.tsx`, que cria textos que respeitam o esquema de cores da app nos modos claro e escuro.",
						"Alguns componentes têm variantes por plataforma: `*.native.tsx` para nativo e `*.tsx` por defeito para web (por exemplo `animated-icon` e `app-tabs`).",
					],
				},
				{
					id: "constants",
					name: "src/constants",
					description: [
						"Contém `theme.ts`, que define as constantes de cores, tipos de letra e espaçamentos usadas em toda a app.",
					],
				},
				{
					id: "hooks",
					name: "src/hooks",
					description: [
						"Contém React Hooks, que permitem partilhar comportamento comum entre componentes.",
						"Por exemplo, `useTheme()` devolve o objeto do tema atual e `useColorScheme()` deteta o esquema de cores do utilizador; alguns hooks têm variantes por plataforma com a extensão `.web.ts`.",
					],
				},
				{
					id: "scripts",
					name: "scripts",
					description: [
						"Guarda scripts de utilidades do projeto, como o que executa `reset-project` para voltar à estrutura mínima.",
					],
				},
				{
					id: "app.json",
					name: "app.json",
					description: [
						"Contém as opções de configuração do projeto e chama-se app config.",
						"Estas opções alteram o comportamento do seu projeto ao desenvolver, compilar, submeter e atualizar a sua app.",
					],
				},
				{
					id: "package.json",
					name: "package.json",
					description: [
						"O ficheiro `package.json` contém as dependências, os scripts e os metadados do projeto. Sempre que uma nova dependência é adicionada, ela é registada neste ficheiro.",
					],
				},
				{
					id: "tsconfig.json",
					name: "tsconfig.json",
					description: [
						"Contém as regras que o TypeScript utilizará para impor a segurança de tipos em todo o projeto, ajudando a prevenir erros.",
						"O template define ainda o alias `@/*` para `./src/*`, para importar sem rotas relativas longas.",
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
		{ type: "code", language: "bash", code: "bun expo start" },
		{
			type: "paragraph",
			text: "Aparecerá um código QR no seu terminal. Digitalize-o com a câmara (iOS) ou a partir da app Expo Go (Android). O seu computador e o seu dispositivo móvel devem estar na mesma rede Wi-Fi!",
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Resolução de problemas comuns: Certifique-se de dar permissão de rede local no iOS. Se continuar a falhar, tente usar um túnel com `bun expo start --tunnel`.",
		},
		{
			type: "paragraph",
			text: "Qualquer alteração que faça no código (por exemplo, em `src/app/index.tsx`) será refletida instantaneamente no seu dispositivo graças ao 'Fast Refresh'.",
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
			text: "Com o servidor de desenvolvimento a correr (`bun expo start`), pressione `a` no terminal para abrir o emulador de Android ou `i` para o simulador de iOS.",
		},

		/*
		{ type: "divider" },
		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Qual é o comando para criar um novo projeto com Expo no diretório atual?",
					options: [
						"bun create expo .",
						"expo new project .",
						"npx expo init .",
						"bunx create-expo-app .",
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
						"No terminal onde `bun expo start` está a ser executado, que tecla pressiona para abrir o simulador de iOS?",
					options: ["s", "a", "i", "e"],
					correctAnswer: 2,
				},
			],
		},
		*/

		{ type: "divider" },
		{ type: "heading", text: "Tarefa Extraclasse: Crie a sua Primeira App" },
		{
			type: "paragraph",
			text: "Coloque em prática o que aprendeu criando um projeto Expo do zero com Bun. Esta tarefa é individual e deverá entregar um relatório simples com capturas de ecrã e as respostas às perguntas finais.",
		},
		{
			type: "list",
			items: [
				"1. **Crie um projeto** chamado `minha-primeira-app` com `bun create expo minha-primeira-app`.",
				"2. **Explore a estrutura gerada**: identifique as pastas `src/app`, `assets`, `src/components`, `src/constants` e os ficheiros `app.json`, `package.json` e `tsconfig.json`. Anote para que serve cada um.",
				"3. **Execute a app** com `bun expo start` e abra-a no Expo Go a partir do seu dispositivo (ambos na mesma rede Wi-Fi).",
				"4. **Modifique `src/app/index.tsx`**: altere o texto de boas-vindas para um personalizado e observe como é atualizado instantaneamente com o Fast Refresh.",
				"5. **Crie um segundo ecrã** `src/app/detalhes.tsx` com um texto próprio e verifique que a rota `/detalhes` funciona substituindo a URL no navegador web (ou navegando a partir da app se já usar ligações).",
				"6. **Responda no seu relatório**: O que faz o comando `bun run reset-project`? Por que é importante que o seu dispositivo e o seu computador estejam na mesma rede Wi-Fi?",
			],
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Dica: se algo não funcionar, reveja os passos da secção 'Execução da sua Primeira App no Expo Go' — o erro mais comum é não ter permissão de rede local no iOS ou estar em redes Wi-Fi diferentes.",
		},
	],
};
