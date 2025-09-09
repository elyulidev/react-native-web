import type { CurriculumTopic } from "../../../../types/types";

export const conference28: CurriculumTopic = {
	id: "conf-28",
	title: "Conf. 28: Gerenciamento de Estados da API",
	content: [
		{
			type: "heading",
			text: "Gerenciamento de Estados de Carregamento, Erros e Dados",
		},
		{
			type: "paragraph",
			text: 'Quando realizamos um pedido a uma API, este não é resolvido instantaneamente. Passa por vários estados: está a "carregar", pode "falhar" ou pode "ter sucesso". Gerir e refletir estes estados na interface do utilizador é crucial para uma boa experiência do utilizador (UX).',
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "1. O Padrão de Três Estados: `loading`, `error`, `data`",
		},
		{
			type: "paragraph",
			text: "Para cada pedido de rede, precisamos de gerir pelo menos três pedaços de estado no nosso componente:",
		},
		{
			type: "list",
			items: [
				"**`loading` (booleano):** É `true` enquanto o pedido está em curso. Usamo-lo para mostrar um indicador de carregamento (spinner) e, muitas vezes, para desativar botões e evitar pedidos duplicados.",
				"**`error` (string ou null):** Armazena uma mensagem de erro se o pedido falhar. Se for `null`, não há erro.",
				"**`data` (any ou null):** Armazena os dados bem-sucedidos da API. Inicialmente é `null`.",
			],
		},
		{
			type: "paragraph",
			text: "Vamos implementar este padrão num componente React Native que procura uma receita.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';

// Supondo que temos uma interface para a receita
interface Recipe {
  idMeal: string;
  strMeal: string;
}

const RecipeFetcher = () => {
  const [data, setData] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      if (!response.ok) {
        throw new Error('Não foi possível conectar-se ao servidor.');
      }
      const jsonResponse = await response.json();
      setData(jsonResponse.meals[0]);
    } catch (e: any) {
      setError(e.message || 'Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Procurar Receita Aleatória" onPress={handleFetch} disabled={loading} />

      {/* Renderização Condicional baseada no estado */}
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.feedback} />}
      {error && <Text style={[styles.feedback, styles.errorText]}>{error}</Text>}
      {data && (
        <View style={styles.feedback}>
          <Text style={styles.title}>Receita Encontrada:</Text>
          <Text>{data.strMeal}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: { alignItems: 'center', padding: 20 },
    feedback: { marginTop: 20, alignItems: 'center' },
    errorText: { color: 'red' },
    title: { fontWeight: 'bold', fontSize: 18, marginBottom: 5 }
});

export default RecipeFetcher;
`,
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "2. Melhorando a Experiência do Utilizador (UX)",
		},
		{
			type: "paragraph",
			text: "O código anterior funciona, mas podemos melhorar significativamente a experiência do utilizador com pequenos ajustes.",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "ActivityIndicator",
					title: "Indicadores de Carregamento Claros",
					text: 'Usar um `ActivityIndicator` (spinner) é fundamental. Diz ao utilizador: "A aplicação está a trabalhar, por favor aguarde". Sem isto, a app poderia parecer bloqueada ou que não responde.',
				},
				{
					icon: "ChatBubbleBottomCenterTextIcon",
					title: "Mensagens de Erro Amigáveis",
					text: 'Evite mostrar erros técnicos como "Failed to fetch". Em vez disso, mostre mensagens que o utilizador possa entender, como "Não foi possível conectar. Verifique a sua ligação à internet e tente novamente".',
				},
				{
					icon: "RectangleStackIcon",
					title: "Estados Vazios (Empty States)",
					text: 'Se uma pesquisa não devolver resultados, не deixe o ecrã em branco. Mostre uma mensagem como "Não foram encontradas receitas para a sua pesquisa" e, se possível, uma sugestão para tentar novamente.',
				},
				{
					icon: "PowerIcon",
					title: "Desativar Controlos",
					text: "Enquanto `loading` for `true`, desative os botões que iniciam o pedido para evitar que o utilizador clique várias vezes e envie múltiplos pedidos idênticos.",
				},
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Encapsulando a Lógica num Hook Personalizado",
		},
		{
			type: "paragraph",
			text: "O padrão de `loading`, `error` e `data` é tão comum que podemos extraí-lo para um hook personalizado, `useApi`, para o reutilizar em toda a nossa aplicação e manter os nossos componentes mais limpos.",
		},
		{
			type: "code",
			language: "typescript",
			code: `
import { useState, useCallback } from 'react';

export const useApi = <T>(apiFunc: (...args: any[]) => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async (...args: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunc(...args);
      setData(result);
      return result;
    } catch (e: any) {
      setError(e.message || 'Erro inesperado');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  return { data, loading, error, request };
};

// --- Como usá-lo num componente ---
// const api = {
//   getRecipes: () => fetch(...).then(res => res.json())
// };
// const { data, loading, error, request: fetchRecipes } = useApi(api.getRecipes);
// useEffect(() => { fetchRecipes(); }, []);
`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "Este é um exemplo simplificado. Bibliotecas como o React Query ou o SWR levam esta ideia muito mais longe, gerindo cache, tentativas e muito mais de forma automática.",
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Ao fazer uma chamada a uma API, qual dos seguintes NÃO é um dos três estados principais a gerir?",
					options: ["loading", "error", "data", "cached"],
					correctAnswer: 3,
				},
				{
					question:
						"Que componente do React Native é comumente usado para mostrar um indicador de carregamento?",
					options: [
						"<LoadingSpinner />",
						"<ProgressView />",
						"<ActivityIndicator />",
						"<Spinner />",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Porque é uma boa prática desativar um botão de 'Enviar' enquanto um pedido de rede está em curso?",
					options: [
						"Para melhorar a segurança da aplicação.",
						"Para evitar que o utilizador envie pedidos duplicados acidentalmente.",
						"Para poupar bateria no dispositivo.",
						"Porque é um requisito das lojas de aplicações.",
					],
					correctAnswer: 1,
				},
				{
					question:
						"No padrão de `loading, error, data`, qual é o propósito do bloco `finally` numa estrutura `try/catch/finally`?",
					options: [
						"Para executar código apenas se o pedido tiver sido bem-sucedido.",
						"Para capturar e tratar o erro.",
						"Para executar código independentemente de o pedido ter sido bem-sucedido ou ter falhado, ideal para `setLoading(false)`.",
						"Para reiniciar o estado para os seus valores iniciais.",
					],
					correctAnswer: 2,
				},
			],
		},
	],
};
