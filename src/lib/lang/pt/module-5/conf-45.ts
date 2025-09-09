import type { CurriculumTopic } from "../../../../types/types";

export const conference45: CurriculumTopic = {
	id: "conf-45",
	title: "Conf. 45: UI/UX Avançada e Animações",
	content: [
		{ type: "heading", text: "UI/UX Avançada: Modais, Alertas e Animações" },
		{
			type: "paragraph",
			text: "Uma ótima experiência do utilizador reside frequentemente nos detalhes: como a informação é apresentada, como as ações são confirmadas e como as animações fluidas guiam a atenção. Nesta sessão, exploraremos os Modais, Alertas e daremos os nossos primeiros passos no mundo das animações com `react-native-reanimated`.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. Modais e Alertas Nativos" },
		{
			type: "paragraph",
			text: "O React Native fornece-nos componentes para exibir conteúdo sobreposto e diálogos nativos.",
		},
		{
			type: "list",
			items: [
				"**`Modal`**: Um componente para apresentar conteúdo por cima da vista principal. É uma vista em branco que pode estilizar como quiser. Ideal para formulários, seletores personalizados ou vistas de ecrã inteiro que aparecem temporariamente.",
				'**`Alert.alert()`**: Uma API simples para lançar um diálogo de alerta nativo do sistema operativo. É perfeito para confirmações rápidas (ex. "Tem a certeza de que quer eliminar isto?") ou para exibir mensagens de erro/sucesso. É menos personalizável que um `Modal`.',
			],
		},
		{
			type: "code",
			language: "javascript",
			code: `
import { Alert, Button } from 'react-native';

const showConfirmationAlert = () => {
    Alert.alert(
        'Confirmar Eliminação',
        'Esta ação não pode ser desfeita.',
        [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Eliminar', style: 'destructive', onPress: () => console.log('Eliminado') },
        ]
    );
}

// <Button title="Eliminar" onPress={showConfirmationAlert} />
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Introdução ao `react-native-reanimated`" },
		{
			type: "paragraph",
			text: "Enquanto a API `Animated` original do React Native funciona, `react-native-reanimated` é a biblioteca moderna e recomendada para animações. A sua principal vantagem é que permite que as animações sejam executadas principalmente no thread da UI em vez do thread de JavaScript, o que resulta em animações muito mais fluidas e de maior desempenho, mesmo quando a lógica de JS está ocupada.",
		},

		{ type: "paragraph", text: "**Passo 1: Instalação e Configuração**" },
		{
			type: "code",
			language: "bash",
			code: "npx expo install react-native-reanimated",
		},
		{
			type: "paragraph",
			text: "De seguida, adicione o plugin ao seu `babel.config.js`:",
		},
		{
			type: "code",
			language: "javascript",
			code: `
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // ... outros plugins
      'react-native-reanimated/plugin', // Adicione isto no final!
    ],
  };
};
`,
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Após adicionar o plugin do Babel, é crucial reiniciar o servidor de desenvolvimento com `npx expo start --clear`.",
		},

		{ type: "subtitle", text: "3. Conceitos Básicos do Reanimated" },
		{
			type: "list",
			items: [
				'**`useSharedValue`**: Semelhante a `useRef`, cria um valor "partilhado" que pode ser lido e modificado tanto pelo thread de JS como pelo thread da UI. Este é o núcleo das animações.',
				"**`useAnimatedStyle`**: Um hook que cria um objeto de estilo que pode reagir a alterações nos `sharedValues`.",
				'**`withTiming` e `withSpring`**: Funções "worklet" que descrevem *como* um `sharedValue` deve mudar. `withTiming` é para animações baseadas em duração, e `withSpring` para animações baseadas em físicas de mola.',
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "4. Prática: Animando o Aparecimento de um Componente",
		},
		{
			type: "paragraph",
			text: 'Vamos criar um efeito de "fade in" e deslizamento para cima para um componente quando ele aparece.',
		},
		{
			type: "code",
			language: "tsx",
			code: `
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

const AnimatedComponent = () => {
  // 1. Criar shared values para a opacidade e a posição Y
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  // 2. Criar o estilo animado que depende dos shared values
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  // 3. Iniciar a animação quando o componente é montado
  useEffect(() => {
    // Anima a opacidade para 1 em 500ms
    opacity.value = withTiming(1, { duration: 500 });
    // Anima a posição Y para 0 com um efeito de mola
    translateY.value = withSpring(0);
  }, []);

  return (
    // 4. Aplicar o estilo ao componente animado
    // Nota: O componente deve ser um 'Animated.View', 'Animated.Text', etc.
    <Animated.View style={[{ padding: 20, backgroundColor: 'lightblue', borderRadius: 10 }, animatedStyle]}>
      <Text>Olá, Reanimated!</Text>
    </Animated.View>
  );
};

export default AnimatedComponent;
`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "A chave é usar os componentes `Animated` (ex. `Animated.View`) para que o Reanimated possa aplicar eficientemente os estilos calculados no thread da UI.",
		},
	],
};
