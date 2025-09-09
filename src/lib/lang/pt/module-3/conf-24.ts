import type { CurriculumTopic } from "../../../../types/types";

export const conference24: CurriculumTopic = {
	id: "conf-24",
	title: "Conf. 24: Semeando o BD",
	content: [
		{ type: "heading", text: "Semeando o Banco de Dados Local" },
		{
			type: "paragraph",
			text: 'Objetivo: Entender o que é "seeding" de banco de dados, por que é uma prática essencial durante o desenvolvimento e como implementar um script para popular nosso banco de dados local com dados de teste realistas.',
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. O que é Seeding e por que é Importante?" },
		{
			type: "paragraph",
			text: 'O **seeding** (ou "semeadura") de um banco de dados é o processo de populá-lo com um conjunto inicial de dados. Em vez de adicionar manualmente usuários, tarefas ou produtos cada vez que apagamos o banco de dados ou começamos do zero, um script de seeding faz isso por nós de forma automática e consistente.',
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "BoltIcon",
					title: "Acelera o Desenvolvimento",
					text: "Permite começar a trabalhar na UI e na lógica de negócios imediatamente, sem ter que passar tempo criando dados de teste manualmente através da interface.",
				},
				{
					icon: "RectangleStackIcon",
					title: "Dados Consistentes",
					text: "Garante que todos os desenvolvedores da equipe trabalhem com o mesmo conjunto de dados inicial, evitando inconsistências.",
				},
				{
					icon: "SparklesIcon",
					title: "Testes Realistas",
					text: "Facilita o teste da aplicação com uma quantidade de dados semelhante à de produção, ajudando a identificar problemas de desempenho ou de UI com listas longas.",
				},
				{
					icon: "ArrowPathIcon",
					title: "Estado Reiniciável",
					text: "Permite redefinir o banco de dados para um estado conhecido e limpo a qualquer momento, o que é inestimável para a depuração.",
				},
			],
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Criando um Script de Seeding" },
		{
			type: "paragraph",
			text: "Podemos criar uma função ou um script simples que se encarregue deste processo. Este script tipicamente realiza duas ações: primeiro, limpa as tabelas para evitar duplicados e, segundo, insere os novos dados.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { db } from './db';
import { users, tasks } from './db/schema';

export async function seedDatabase() {
  try {
    console.log('Limpando o banco de dados...');
    // Limpa as tabelas na ordem correta para evitar problemas com chaves estrangeiras
    await db.delete(tasks);
    await db.delete(users);

    console.log('Inserindo dados de teste...');

    // Criar usuários
    const insertedUsers = await db.insert(users).values([
      { fullName: 'Alice Johnson', email: 'alice@example.com' },
      { fullName: 'Bob Williams', email: 'bob@example.com' },
    ]).returning();

    const alice = insertedUsers.find(u => u.email === 'alice@example.com');
    const bob = insertedUsers.find(u => u.email === 'bob@example.com');

    if (!alice || !bob) {
      throw new Error('Não foi possível criar os usuários de teste');
    }

    // Criar tarefas para os usuários
    await db.insert(tasks).values([
      { description: 'Comprar leite', userId: alice.id },
      { description: 'Passear com o cão', userId: alice.id, completed: true },
      { description: 'Terminar o relatório do projeto', userId: bob.id },
      { description: 'Ligar para o dentista', userId: bob.id },
    ]);

    console.log('Seeding concluído com sucesso!');

  } catch (error) {
    console.error('Erro durante o seeding:', error);
  }
}
`,
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Ao eliminar dados, é importante fazê-lo na ordem inversa das dependências. Como as tarefas (`tasks`) dependem dos usuários (`users`), devemos eliminar as tarefas primeiro e depois os usuários.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Executando o Script de Seeding" },
		{
			type: "paragraph",
			text: "Quando и como executamos esta função `seedDatabase`? Existem várias estratégias, mas uma comum no desenvolvimento móvel é executá-la condicionalmente no início da aplicação, por exemplo, apenas no modo de desenvolvimento ou quando o banco de dados está vazio.",
		},
		{
			type: "paragraph",
			text: "Poderíamos adicionar um botão numa tela de desenvolvimento oculta ou executá-lo uma vez após aplicar as migrações.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { useEffect } from 'react';
import { Button } from 'react-native';
import { seedDatabase } from './db/seed'; // Importa a sua função

// Em algum componente da sua app (preferencialmente um de desenvolvimento)
const DevScreen = () => {

  // Opcional: Executar o seeding ao montar o componente
  // useEffect(() => {
  //   seedDatabase();
  // }, []);

  return (
    <Button title="Popular Banco de Dados" onPress={seedDatabase} />
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
					question: "Qual NÃO é um benefício do seeding de um banco de dados?",
					options: [
						"Acelerar o desenvolvimento ao ter dados prontos.",
						"Garantir que o banco de dados de produção esteja sempre vazio.",
						"Permitir testes com dados consistentes e realistas.",
						"Facilitar a redefinição do banco de dados para um estado conhecido.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Ao criar um script de seeding, o que geralmente se faz primeiro para evitar dados duplicados?",
					options: [
						"Inserir os novos dados.",
						"Fazer um backup das tabelas.",
						"Limpar (eliminar os dados de) as tabelas existentes.",
						"Criar novas tabelas.",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Se a tabela `comments` tem uma chave estrangeira que aponta para `posts`, em que ordem deve limpar as tabelas?",
					options: [
						"A ordem não importa.",
						"Primeiro `posts`, depois `comments`.",
						"Primeiro `comments`, depois `posts`.",
						"Deve limpá-las ao mesmo tempo numa transação.",
					],
					correctAnswer: 2,
				},
				{
					question: "Quando é mais útil executar um script de seeding?",
					options: [
						"Apenas uma vez, em produção.",
						"Cada vez que um usuário inicia sessão.",
						"Durante o desenvolvimento, para ter dados de teste consistentes.",
						"Antes de cada operação de leitura.",
					],
					correctAnswer: 2,
				},
			],
		},
	],
};
