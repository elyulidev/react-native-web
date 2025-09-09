import type { CurriculumTopic } from "../../../../types/types";

export const conference5: CurriculumTopic = {
	id: "conf-5",
	title: "Conf. 5: Estilização e StyleSheet",
	content: [
		{ type: "heading", text: "Estilização Básica e StyleSheet" },
		{
			type: "paragraph",
			text: "Bem-vindos a esta sessão sobre estilização no React Native! Hoje vamos explorar como dar vida às nossas aplicações móveis, focando nas ferramentas e melhores práticas para uma estilização eficiente e de fácil manutenção.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			id: "box-model",
			text: "1. O Modelo de Caixa e as Suas Diferenças com a Web",
		},
		{
			type: "paragraph",
			text: "No React Native, construímos interfaces utilizando componentes que mapeiam para vistas nativas. Isto difere da web, onde usamos elementos HTML. Os componentes mais básicos para a estrutura são `<View>` e `<Text>`.",
		},
		{
			type: "twoColumn",
			columns: [
				{
					title: "React Native",
					content: [
						"**<View>**: É o componente mais fundamental, equivalente a um `<div>`. É um contentor que suporta layout com flexbox e estilos.",
						"**<Text>**: Qualquer texto, independentemente do seu comprimento, **deve** ser envolvido num componente `<Text>`. Funciona como `<p>`, `<h1>` ou `<span>`.",
					],
				},
				{
					title: "Web (HTML)",
					content: [
						"**<div>**: Um contentor genérico para agrupar conteúdo e aplicar estilos.",
						"**<p>, <h1>, <span>**: Múltiplos elementos para exibir texto, cada um com o seu próprio comportamento semântico e de estilo padrão.",
					],
				},
			],
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Importante! Se tentar colocar texto diretamente dentro de uma `<View>` sem o envolver numa `<Text>`, a aplicação irá lançar um erro. Todo o texto deve ser explicitamente contido.",
		},

		{ type: "divider" },

		{
			type: "subtitle",
			id: "stylesheet",
			text: "2. Criação de Estilos com `StyleSheet.create()`",
		},
		{
			type: "paragraph",
			text: "`StyleSheet` é uma abstração do React Native semelhante às folhas de estilo CSS. Em vez de escrever CSS, definimos estilos usando objetos JavaScript para uma maior otimização e organização.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StyleSheetExample() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, React Native!</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>Este é um exemplo de StyleSheet.</Text>
      </View>
    </View>
  );
}

// Os estilos são definidos fora do componente.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 16,
    color: 'darkslateblue',
  }
});`,
		},
		{
			type: "list",
			items: [
				"**Claridade do código:** Ao mover os estilos para fora da função de renderização, o JSX mantém-se limpo e legível.",
				"**Semântica e reutilização:** Nomear os estilos (ex. `styles.card`) adiciona significado e permite reutilizá-los facilmente.",
				"**Otimização:** O React Native pode otimizar os estilos, enviando-os para o lado nativo apenas uma vez, o que é mais eficiente do que os estilos em linha.",
				"**Validação:** `StyleSheet.create()` valida os seus estilos em tempo de compilação, ajudando a detetar erros tipográficos ou propriedades inválidas.",
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			id: "flexbox",
			text: "3. Dominando o Flexbox no React Native",
		},
		{
			type: "paragraph",
			text: "O Flexbox é o pilar do design de layouts no React Native. Permite criar interfaces complexas e adaptáveis de forma previsível. A principal diferença em relação à web é a direção padrão.",
		},
		{
			type: "callout",
			alertType: "tip",
			text: "**Diferença chave:** No React Native, `flexDirection` é `'column'` por padrão, enquanto na web é `'row'`. Os elementos empilham-se verticalmente.",
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/flex-direction-rn.png",
			caption:
				'`flexDirection`: "column" (esquerda, padrão) empilha os elementos verticalmente. "row" (direita) alinha-os horizontalmente.',
		},
		{
			type: "paragraph",
			text: "`justifyContent` alinha os elementos ao longo do eixo principal (o eixo de `flexDirection`).",
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/justify-content-rn.png",
			caption:
				'Opções de `justifyContent` com `flexDirection: "column"`. Controla o espaçamento vertical.',
		},
		{
			type: "paragraph",
			text: "`alignItems` alinha os elementos ao longo do eixo transversal (perpendicular ao eixo principal).",
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/align-items-rn.png",
			caption:
				'Opções de `alignItems` com `flexDirection: "column"`. Controla o alinhamento horizontal.',
		},
		{
			type: "code",
			language: "jsx",
			code: `
// Com flexDirection: 'row', o comportamento é semelhante ao da web.
// justifyContent controla o eixo horizontal e alignItems o vertical.
<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
    <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />
    <View style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
</View>
`,
		},

		{ type: "divider" },

		{
			type: "subtitle",
			id: "stylesheet-vs-inline",
			text: "4. Vantagens do `StyleSheet` em Relação aos Estilos em Linha",
		},
		{
			type: "paragraph",
			text: "Embora tecnicamente possa passar um objeto de estilo diretamente para um componente, usar `StyleSheet.create()` é a prática recomendada por várias razões chave.",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "CodeBracketIcon",
					title: "Legibilidade e Organização",
					text: "Os estilos em linha desorganizam o JSX. `StyleSheet` mantém-nos separados e limpos, melhorando a manutenibilidade.",
				},
				{
					icon: "ArrowPathIcon",
					title: "Reutilização de Estilos",
					text: "Defina um estilo uma vez e reutilize-o em múltiplos componentes. Isto segue o princípio DRY (Don't Repeat Yourself).",
				},
				{
					icon: "BoltIcon",
					title: "Desempenho",
					text: "O React Native otimiza os estilos do `StyleSheet` enviando-os para a ponte nativa uma única vez, o que é mais eficiente do que criar novos objetos de estilo a cada renderização.",
				},
				{
					icon: "SparklesIcon",
					title: "Autocompletar e Validação",
					text: "Os IDEs oferecem melhor autocompletar e validação de tipos para os estilos definidos com `StyleSheet`, ajudando a prevenir erros.",
				},
			],
		},

		{ type: "divider" },

		{
			type: "subtitle",
			id: "theming",
			text: "5. Introdução à Gestão de Temas",
		},
		{
			type: "paragraph",
			text: "A gestão de temas permite uma estilização consistente e fácil de adaptar a diferentes modos (claro/escuro) ou marcas. Isto é conseguido combinando estilos centralizados com a Context API do React.",
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/light-dark-theme.png",
			caption:
				"Uma interface de utilizador que se adapta ao modo claro e escuro para uma melhor experiência de utilizador.",
		},
		{
			type: "list",
			items: [
				"**Cores Centralizadas:** Defina uma paleta de cores para os modos claro e escuro num arquivo de constantes.",
				// FIX: Replaced single quotes with double quotes around 'light' and 'dark' to prevent potential parsing errors.
				'**Contexto do Tema:** Crie um `ThemeContext` que forneça o tema atual (ex. "light" o "dark") e uma função para o alterar.',
				"**Hook Personalizado (`useTheme`):** Um hook simples `useTheme` que consome o contexto e devolve as cores do tema ativo.",
				"**Persistência:** Use `expo-secure-store` ou `AsyncStorage` para guardar a preferência de tema do utilizador entre sessões.",
				"**StatusBar Dinâmica:** Utilize o componente `<StatusBar>` para alterar o estilo da barra de estado (claro/escuro) de acordo com o tema ativo.",
			],
		},
		// FIX: Replaced invalid identifier 'a-cores' with 'cores' and updated conceptual file name.
		{
			type: "code",
			language: "typescript",
			code: `
// hook-conceptual.ts
import { useContext } from 'react';
import { ThemeContext, cores } from './ThemeProvider';

export const useTheme = () => {
  const { theme } = useContext(ThemeContext);
  return cores[theme]; // Devolve o objeto de cores do tema atual
};

// Component.tsx
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from './hooks/useTheme';

export default function ThemedComponent() {
  const colors = useTheme(); // Obtém as cores do tema atual

  return (
    // Os estilos adaptam-se dinamicamente
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Conteúdo aqui</Text>
    </View>
  );
}`,
		},
		{ type: "divider" },
		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Qual é a direção de `flexDirection` padrão no React Native?",
					options: ["row", "column", "row-reverse", "Não tem valor padrão"],
					correctAnswer: 1,
				},
				{
					question:
						"Se tiver `flexDirection: 'column'`, que propriedade usaria para centrar os elementos horizontalmente?",
					options: [
						"justifyContent: 'center'",
						"alignItems: 'center'",
						"alignContent: 'center'",
						"flex: 1",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Principalmente, por que é recomendado usar `StyleSheet.create()` em vez de estilos em linha?",
					options: [
						"Para que o código seja mais curto",
						"Por otimização de desempenho e melhor organização",
						"Porque os estilos em linha não suportam todas as propriedades",
						"É a única forma de aplicar estilos",
					],
					correctAnswer: 1,
				},
				{
					question:
						"O que está incorreto sobre a estilização de texto no React Native?",
					options: [
						"Todo o texto deve estar dentro de um componente <Text>",
						"Pode aninhar componentes <Text> para herdar estilos",
						"Pode colocar texto diretamente dentro de uma <View> para um melhor desempenho",
						"O componente <Text> suporta a propriedade `style`",
					],
					correctAnswer: 2,
				},
			],
		},
	],
};
