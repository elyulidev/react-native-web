import type { CurriculumTopic } from "../../../../types/types";

export const conference25: CurriculumTopic = {
	id: "conf-25",
	title: "Conf. 25: Drizzle Studio",
	content: [
		{ type: "heading", text: "Drizzle Studio e Depuração de Dados Locais" },
		{
			type: "paragraph",
			text: "Objetivo: Aprender a utilizar o Drizzle Studio, uma poderosa ferramenta visual que nos permite inspecionar, manipular e depurar nosso banco de dados SQLite local de maneira interativa, agilizando enormemente o ciclo de desenvolvimento.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. O que é o Drizzle Studio?" },
		{
			type: "paragraph",
			text: 'O Drizzle Studio é uma interface gráfica do usuário (GUI) semelhante a um gerenciador de banco de dados, mas projetada especificamente para projetos Drizzle. Ele é executado localmente e se conecta ao seu banco de dados, fornecendo uma visão de "planilha" de suas tabelas e dados.',
		},
		{
			type: "image",
			imageUrl: "https://orm.drizzle.team/images/drizzle-studio-light.webp",
			caption: "Interface do Drizzle Studio mostrando tabelas e dados.",
		},
		{
			type: "callout",
			alertType: "info",
			text: "O Drizzle Studio é uma ferramenta exclusiva para o ambiente de desenvolvimento e não faz parte da sua aplicação em produção. É uma das grandes vantagens de usar o `drizzle-kit`.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Lançando o Drizzle Studio" },
		{
			type: "paragraph",
			text: "Graças ao script npm que configuramos na Conferência 18, lançar o Drizzle Studio é muito simples. Basta executar o seguinte comando no terminal, na raiz do seu projeto:",
		},
		{ type: "code", language: "bash", code: "npm run studio" },
		{
			type: "paragraph",
			text: "Este comando lerá o seu arquivo `drizzle.config.ts` para encontrar a localização do seu banco de dados e seu esquema, e então abrirá uma nova aba no seu navegador web em um endereço como `http://local.drizzle.studio`.",
		},
		{
			type: "paragraph",
			text: "Para que funcione com o Expo, é comum que você precise que sua aplicação esteja rodando no simulador ou no seu dispositivo ao mesmo tempo.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Funcionalidades Chave do Drizzle Studio" },
		{
			type: "paragraph",
			text: "Uma vez aberto, o Drizzle Studio oferece controle total sobre seu banco de dados local:",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "RectangleGroupIcon",
					title: "Visualização de Tabelas e Esquemas",
					text: "No painel esquerdo, você verá uma lista de todas as tabelas definidas no seu `schema.ts`. Você pode clicar nelas para ver sua estrutura e seus dados.",
				},
				{
					icon: "MagnifyingGlassPlusIcon",
					title: "Exploração de Dados",
					text: "O painel principal mostra os dados da tabela selecionada em formato de tabela. Você pode ordenar por colunas e navegar pelas páginas se tiver muitos registros.",
				},
				{
					icon: "SparklesIcon",
					title: "Manipulação de Dados (CRUD)",
					text: "Você pode adicionar novas linhas, editar células diretamente com um duplo clique, ou excluir linhas. Isso é extremamente útil para testar como sua UI reage a diferentes dados sem ter que codificar a lógica para criá-los primeiro.",
				},
				{
					icon: "LinkIcon",
					title: "Navegação por Relações",
					text: "Se você definiu relações entre suas tabelas, o Drizzle Studio permitirá que você navegue facilmente de um registro para seus registros relacionados (por exemplo, de um usuário para todas as suas tarefas).",
				},
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Caso de Uso: Depurando o App To-Do" },
		{
			type: "paragraph",
			text: "Imagine que você está desenvolvendo uma nova função para marcar uma tarefa como concluída, mas não está funcionando. O problema está na UI ou no banco de dados?",
		},
		{
			type: "list",
			items: [
				"**Passo 1:** Lance o Drizzle Studio (`npm run studio`).",
				"**Passo 2:** Navegue até a tabela `tasks`.",
				"**Passo 3:** Procure a tarefa com a qual está tendo problemas e observe o valor na coluna `completed`.",
				"**Passo 4:** Tente alterar o valor diretamente no Drizzle Studio (por exemplo, de `0` para `1`). Se a alteração for salva, você sabe que o banco de dados funciona.",
				"**Passo 5:** Recarregue a UI do seu aplicativo. Se agora a tarefa aparecer como concluída, o problema provavelmente estava na sua lógica de `UPDATE`. Se a alteração não for refletida, o problema pode estar na sua lógica de `SELECT` ou em como você renderiza o estado na UI.",
				"**Conclusão:** O Drizzle Studio permite que você isole o problema rapidamente, economizando horas de depuração às cegas.",
			],
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question: "O que é o Drizzle Studio?",
					options: [
						"Uma biblioteca para otimizar consultas SQL.",
						"Uma ferramenta visual para inspecionar e manipular o banco de dados em desenvolvimento.",
						"O motor de banco de dados que o Drizzle usa.",
						"Um plugin do VSCode para escrever esquemas.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Qual comando é usado para iniciar o Drizzle Studio (assumindo o script npm padrão)?",
					options: [
						"npm run generate",
						"npm run start",
						"npm run studio",
						"npm run debug",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Que informação o Drizzle Studio utiliza para se conectar ao seu banco de dados?",
					options: [
						"O arquivo `package.json`.",
						"O arquivo `app.json`.",
						"O arquivo `drizzle.config.ts`.",
						"Pergunta ao usuário cada vez que é iniciado.",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Qual das seguintes ações NÃO pode ser realizada diretamente no Drizzle Studio?",
					options: [
						"Adicionar uma nova linha a uma tabela.",
						"Editar o valor de uma célula.",
						"Excluir uma linha.",
						"Adicionar uma nova coluna a uma tabela (modificar o esquema).",
					],
					correctAnswer: 3,
				},
			],
		},
	],
};
