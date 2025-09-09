import type { CurriculumTopic } from "../../../../types/types";

export const conference39: CurriculumTopic = {
	id: "conf-39",
	title: "Conf. 39: Depuração e Tratamento de Erros",
	content: [
		{ type: "heading", text: "Depuração e Tratamento de Erros" },
		{
			type: "paragraph",
			text: "Até o código mais bem escrito pode ter erros. Aprender a depurar eficazmente e a tratar erros de forma elegante é o que distingue um desenvolvedor júnior de um sénior. Nesta sessão, exploraremos as ferramentas do Expo e um padrão crucial: os Error Boundaries.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Ferramentas de Depuração no Expo" },
		{
			type: "paragraph",
			text: "O Expo fornece um menu de desenvolvimento muito poderoso que pode abrir agitando o seu dispositivo físico ou pressionando `Shift+M` no simulador iOS e `Cmd+M` (ou `Ctrl+M` no Windows/Linux) no emulador Android.",
		},
		{
			type: "featureCard",
			featureItems: [
				{
					icon: "CodeBracketIcon",
					title: "Abrir Depurador de JavaScript",
					text: "Abre as ferramentas de desenvolvimento do Chrome, permitindo-lhe usar a consola, definir pontos de interrupção (breakpoints) e analisar o desempenho.",
				},
				{
					icon: "RectangleGroupIcon",
					title: "Mostrar Inspetor de Elementos",
					text: "Permite-lhe tocar em qualquer elemento da UI na sua app e ver os seus estilos, semelhante ao inspetor de elementos do navegador.",
				},
				{
					icon: "ArrowPathIcon",
					title: "Recarregar App / Recarga Rápida",
					text: "Reinicia a sua aplicação. A Recarga Rápida (Fast Refresh) tenta recarregar apenas os ficheiros que alterou, mantendo o estado.",
				},
			],
		},
		{
			type: "callout",
			alertType: "tip",
			text: "O uso de `console.log()` é a sua primeira linha de defesa. Use-o generosamente para rastrear o fluxo da sua aplicação e o valor das variáveis em pontos-chave.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "2. O Problema: Um Erro num Componente Quebra Tudo",
		},
		{
			type: "paragraph",
			text: "Por defeito, um erro de renderização num componente React (por exemplo, tentar aceder a uma propriedade de um objeto nulo) fará com que toda a árvore de componentes seja desmontada, mostrando um ecrã vermelho de erro em desenvolvimento ou simplesmente fechando a aplicação em produção. Isto é uma péssima experiência de utilizador.",
		},
		{
			type: "image",
			imageUrl:
				"https://storage.googleapis.com/aistudio-hosting/bootcamp-assets/error-boundary-concept.png",
			caption:
				"Sem um Error Boundary, um erro num pequeno componente pode fazer com que toda a aplicação falhe.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. A Solução: Error Boundaries" },
		{
			type: "paragraph",
			text: "Um Error Boundary (Limite de Erro) é um componente especial do React que **captura erros** de JavaScript nos seus componentes filhos, regista esses erros e exibe uma **UI de fallback** em vez da árvore de componentes que falhou.",
		},
		{
			type: "paragraph",
			text: "Ao contrário de outros componentes, os Error Boundaries devem ser **componentes de classe**.",
		},

		{
			type: "paragraph",
			text: "**Passo 1: Criar o Componente `ErrorBoundary`**",
		},
		{
			type: "paragraph",
			text: "Crie um ficheiro `components/ErrorBoundary.tsx`.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, Button } from 'react-native';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Atualiza o estado para que a próxima renderização mostre a UI de fallback.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Aqui poderia registar o erro num serviço externo
    console.error("Erro Capturado pelo ErrorBoundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Pode renderizar qualquer UI de fallback que desejar
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 10 }}>
            Oops, algo correu mal.
          </Text>
          <Text style={{ color: 'gray', textAlign: 'center', marginBottom: 20 }}>
            A nossa equipa foi notificada. Por favor, tente reiniciar a aplicação.
          </Text>
          {/* Numa app real, poderia adicionar um botão para reiniciar a app */}
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
`,
		},
		{ type: "paragraph", text: "**Passo 2: Envolver a sua Aplicação**" },
		{
			type: "paragraph",
			text: "Agora, pode usar o seu `ErrorBoundary` для envolver partes da sua aplicação. Um bom sítio para começar é no seu layout raiz (`app/_layout.tsx`) para capturar quaisquer erros de navegação ou dos ecrãs principais.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
import { Stack } from 'expo-router';
import ErrorBoundary from '../components/ErrorBoundary'; // Ajuste o caminho

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <Stack>
        <Stack.Screen name="index" />
        {/* ... outros ecrãs */}
      </Stack>
    </ErrorBoundary>
  );
}`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "Também pode colocar Error Boundaries em locais mais específicos, como à volta de um widget complexo que possa falhar, permitindo que o resto da aplicação continue a funcionar.",
		},
		{ type: "divider" },

		{ type: "heading", text: "Teste os seus conhecimentos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"Qual é o comportamento padrão do React em produção se ocorrer um erro de renderização num componente?",
					options: [
						"Mostra uma mensagem de aviso na consola.",
						"Ignora o erro e continua.",
						"Desmonta toda a árvore de componentes, provavelmente fechando a app.",
						"Mostra uma UI de fallback genérica.",
					],
					correctAnswer: 2,
				},
				{
					question: "Um Error Boundary deve ser implementado como...",
					options: [
						"Um hook personalizado.",
						"Um componente funcional usando `useState` e `useEffect`.",
						"Um componente de classe com os métodos `getDerivedStateFromError` e/ou `componentDidCatch`.",
						"Uma configuração em `app.json`.",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Qual método do ciclo de vida de um Error Boundary é usado para renderizar uma UI de fallback depois de um erro ter sido lançado?",
					options: [
						"`componentDidCatch`",
						"`renderError`",
						"`getDerivedStateFromError`",
						"`componentDidUpdate`",
					],
					correctAnswer: 2,
				},
				{
					question:
						"Para que serve o método `componentDidCatch` num Error Boundary?",
					options: [
						"Para atualizar o estado e mostrar a UI de fallback.",
						"Para registar a informação do erro (ex. enviá-la para um serviço de monitorização).",
						"Para prevenir que o erro ocorra.",
						"Para reiniciar a aplicação.",
					],
					correctAnswer: 1,
				},
			],
		},
	],
};
