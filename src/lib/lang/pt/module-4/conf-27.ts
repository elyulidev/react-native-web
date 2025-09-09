import type { CurriculumTopic } from "../../../../types/types";

export const conference27: CurriculumTopic = {
	id: "conf-27",
	title: "Conf. 27: Consumo de APIs",
	content: [
		{ type: "heading", text: "Consumo de APIs Externas com Fetch" },
		{
			type: "paragraph",
			text: "A maioria das aplicações móveis modernas são dinâmicas, o que significa que obtêm dados de um servidor através da Internet. Aprender a consumir APIs (Interfaces de Programação de Aplicações) é uma habilidade fundamental. Nesta palestra, focaremos no `fetch`, a API do navegador incorporada para realizar pedidos de rede.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Realizando Pedidos HTTP com `fetch`" },
		{
			type: "paragraph",
			text: "`fetch` é uma função baseada em promessas que nos permite fazer pedidos HTTP. O seu uso mais simples é fazer um pedido GET a um endpoint.",
		},
		{
			type: "code",
			language: "javascript",
			code: `
async function getRecipes() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');

    if (!response.ok) {
      // Se a resposta não for bem-sucedida (ex. 404, 500), lançamos um erro.
      throw new Error(\`Erro HTTP: \${response.status}\`);
    }

    const data = await response.json(); // Analisa a resposta JSON para um objeto JS
    console.log(data.meals[0]);
  } catch (error) {
    console.error('Não foi possível obter as receitas:', error);
  }
}
`,
		},
		{
			type: "list",
			items: [
				"**`async/await`**: Usamos esta sintaxe para lidar com código assíncrono de uma forma mais legível.",
				"**`fetch(URL)`**: Realiza o pedido GET. Devolve uma promessa que se resolve num objeto `Response`.",
				"**`response.ok`**: É uma propriedade booleana que é `true` se o código de estado HTTP estiver no intervalo 200-299.",
				"**`response.json()`**: É um método do objeto `Response` que também devolve uma promessa. Resolve-se com o resultado da análise do corpo do texto da resposta como JSON.",
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Manuseamento e Transformação de Dados JSON" },
		{
			type: "paragraph",
			text: "JSON (JavaScript Object Notation) é o formato padrão para a troca de dados na web. Quando recebemos uma resposta de uma API, geralmente vem como uma string JSON. O método `response.json()` faz o trabalho pesado de converter esta string num objeto ou array JavaScript com o qual podemos trabalhar.",
		},
		{
			type: "paragraph",
			text: "É uma boa prática criar interfaces TypeScript para os dados que esperamos receber. Isto dá-nos autocompletar e segurança de tipos.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
interface Meal {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
}

async function getTypedRecipes(): Promise<Meal[] | null> {
  try {
    const response = await fetch('...');
    if (!response.ok) throw new Error('Erro de rede');

    // Tipamos a resposta esperada
    const data: { meals: Meal[] } = await response.json();

    return data.meals;
  } catch (error) {
    console.error(error);
    return null;
  }
}
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Realizando Pedidos POST" },
		{
			type: "paragraph",
			text: "Para enviar dados para um servidor (como ao criar um novo recurso), usamos um pedido POST. `fetch` aceita um segundo argumento, um objeto de configuração, para especificar o método, os cabeçalhos e o corpo do pedido.",
		},
		{
			type: "code",
			language: "javascript",
			code: `
async function createPost(title, body) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST', // 1. Especificar o método
      headers: {
        'Content-Type': 'application/json', // 2. Indicar que enviamos JSON
      },
      body: JSON.stringify({ // 3. Converter o nosso objeto JS para uma string JSON
        title: title,
        body: body,
        userId: 1,
      }),
    });

    if (!response.ok) throw new Error(\`Erro: \${response.status}\`);

    const createdPost = await response.json();
    console.log('Post criado:', createdPost);
  } catch (error) {
    console.error('Erro ao criar o post:', error);
  }
}
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Gestão Segura de Chaves de API" },
		{
			type: "paragraph",
			text: "Muitas APIs requerem uma chave (API Key) para autenticar os pedidos. É **extremamente importante** não escrever estas chaves diretamente no seu código-fonte (`hardcoding`), pois se carregar o seu código para um repositório público, qualquer pessoa poderia roubá-las.",
		},
		{
			type: "paragraph",
			text: "A solução é usar **variáveis de ambiente**. Criamos um ficheiro `.env` na raiz do nosso projeto (que **nunca** deve ser carregado para o Git) и armazenamos as nossas chaves lá.",
		},
		{
			type: "code",
			language: "bash",
			code: `
# .env
# Adicione este ficheiro ao seu .gitignore
MEALDB_API_KEY="a_sua_chave_aqui"
`,
		},
		{
			type: "paragraph",
			text: "O Expo pode carregar estas variáveis de ambiente na sua aplicação se as prefixar com `EXPO_PUBLIC_`. Depois, pode aceder a elas no seu código através de `process.env`.",
		},
		{
			type: "code",
			language: "javascript",
			code: `
// No seu código
const apiKey = process.env.EXPO_PUBLIC_MEALDB_API_KEY;
const url = \`https://www.themealdb.com/api/json/v2/\${apiKey}/search.php?s=Arrabiata\`;
// ... usar a url no pedido fetch
`,
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Para que as alterações no `.env` tenham efeito, precisa de reiniciar o servidor de desenvolvimento do Expo.",
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Qual método do objeto `Response` do `fetch` é usado para converter uma resposta JSON num objeto JavaScript?",
					options: [
						"`.parseJSON()`",
						"`.text()`",
						"`.json()`",
						"`.toObject()`",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Num pedido `fetch` para enviar dados, que propriedade do objeto de configuração é usada para especificar o método HTTP?",
					options: ["`httpMethod`", "`type`", "`action`", "`method`"],
					correctAnswer: 3,
				},
				{
					question:
						"Porque é uma má prática escrever chaves de API diretamente no código?",
					options: [
						"Porque torna o código mais longo.",
						"Porque pode expor as chaves se o código se tornar público, criando um risco de segurança.",
						"Porque as chaves de API mudam frequentemente.",
						"Porque abranda a compilação da aplicação.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Como se acede a uma variável de ambiente chamada `EXPO_PUBLIC_API_URL` no código de uma aplicação Expo?",
					options: [
						"`Expo.env.API_URL`",
						"`process.env.EXPO_PUBLIC_API_URL`",
						"`environment.API_URL`",
						"`env('EXPO_PUBLIC_API_URL')`",
					],
					correctAnswer: 1,
				},
			],
		},
	],
};
