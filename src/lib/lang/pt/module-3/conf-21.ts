import type { CurriculumTopic } from "../../../../types/types";

export const conference21: CurriculumTopic = {
	id: "conf-21",
	title: "Conf. 21: Migrações",
	content: [
		{ type: "heading", text: "Geração e Aplicação de Migrações" },
		{
			type: "paragraph",
			text: "Objetivo: Compreender o conceito de migrações de banco de dados, aprender a gerar arquivos de migração com Drizzle Kit a partir de mudanças no esquema e aplicar essas migrações de forma segura na aplicação.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. O que são Migrações?" },
		{
			type: "paragraph",
			text: "Imagine que sua aplicação já está em produção e você precisa adicionar uma nova coluna à sua tabela de usuários. Você não pode simplesmente apagar o banco de dados e começar de novo, pois perderia todos os dados dos usuários! É aqui que entram as migrações.",
		},
		{
			type: "paragraph",
			text: "Uma migração é um arquivo (geralmente SQL) que contém as instruções para atualizar o esquema de um banco de dados de uma versão para outra de forma segura, sem perder dados. O Drizzle Kit automatiza a criação desses arquivos para nós.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "2. Gerando Migrações com `drizzle-kit generate`",
		},
		{
			type: "paragraph",
			text: "Toda vez que você fizer uma alteração no seu arquivo `db/schema.ts` (adicionar uma tabela, modificar uma coluna, etc.), você deve gerar uma nova migração. Para isso, usamos o script npm que criamos anteriormente.",
		},
		{ type: "code", language: "bash", code: "npm run generate" },
		{ type: "paragraph", text: "Este comando fará duas coisas:" },
		{
			type: "list",
			items: [
				"Comparará o estado atual do seu `schema.ts` com o último estado conhecido (salvo na pasta `drizzle`).",
				"Gerará um novo arquivo `.sql` dentro da pasta `drizzle` com as declarações SQL necessárias para aplicar as alterações. Por exemplo, `ALTER TABLE users ADD COLUMN...`.",
			],
		},
		{
			type: "callout",
			alertType: "warning",
			text: "É uma boa prática revisar o arquivo SQL gerado para garantir que as alterações são as que você espera antes de aplicá-las.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Aplicando Migrações em Tempo de Execução no Expo",
		},
		{
			type: "paragraph",
			text: "Diferente do desenvolvimento web, onde você poderia aplicar migrações pela linha de comando, em uma aplicação móvel, o banco de dados de cada usuário está em seu próprio dispositivo. Portanto, devemos aplicar as migrações quando a aplicação é iniciada.",
		},
		{
			type: "paragraph",
			text: "O Drizzle ORM para Expo fornece um hook personalizado, `useMigrations`, que cuida disso de forma automática e segura.",
		},
		{
			type: "paragraph",
			text: "Primeiro, precisamos configurar o `babel` e o `metro` para que possam importar arquivos `.sql`.",
		},
		{
			type: "code",
			language: "javascript",
			code: `
// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('sql'); // Adicionar esta linha
module.exports = config;

// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [["inline-import", { "extensions": [".sql"] }]] // Adicionar esta linha
  };
};
`,
		},
		{
			type: "paragraph",
			text: "Em seguida, no componente raiz da nossa aplicação (como `App.tsx` ou o layout raiz), usamos o hook:",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './drizzle/migrations'; // Importa o objeto de migrações
import { db } from './db'; // Sua instância de banco de dados Drizzle
import { Text, View } from 'react-native';

export default function App() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View>
        <Text>Erro de migração: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View>
        <Text>Aplicando migrações...</Text>
      </View>
    );
  }

  return (
    // O resto da sua aplicação, que agora tem a certeza
    // de que o banco de dados está atualizado.
    <View>
      <Text>Migrações aplicadas com sucesso!</Text>
    </View>
  );
}
`,
		},
		{
			type: "list",
			items: [
				"**`useMigrations(db, migrations)`**: Este hook revisa o banco de dados do usuário, verifica quais migrações já foram aplicadas e executa apenas as que faltam.",
				"**`success`**: Torna-se `true` assim que todas as migrações pendentes foram aplicadas corretamente.",
				"**`error`**: Conterá um objeto de erro se algo der errado durante o processo.",
			],
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Qual é o propósito principal de uma migração de banco de dados?",
					options: [
						"Fazer um backup dos dados.",
						"Atualizar o esquema do banco de dados de forma segura sem perder dados.",
						"Popular o banco de dados com dados de teste.",
						"Otimizar as consultas SQL.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Qual comando do Drizzle Kit é utilizado para criar um arquivo de migração SQL com base nas alterações do esquema?",
					options: [
						"drizzle-kit push",
						"drizzle-kit apply",
						"drizzle-kit generate",
						"drizzle-kit studio",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Em uma aplicação Expo, quando e como as migrações são aplicadas ao banco de dados do usuário?",
					options: [
						"Manualmente pelo usuário nas configurações.",
						"São aplicadas em tempo de execução ao iniciar o aplicativo, usando o hook `useMigrations`.",
						"Automaticamente ao compilar o aplicativo.",
						"Não são aplicadas em produção, apenas em desenvolvimento.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"O que o hook `useMigrations` retorna enquanto as migrações ainda estão sendo aplicadas?",
					options: [
						"`{ success: false, error: null }`",
						"`{ success: true, error: null }`",
						"`{ success: false, error: 'pending' }`",
						"Não retorna nada até terminar.",
					],
					correctAnswer: 0,
				},
			],
		},
	],
};
