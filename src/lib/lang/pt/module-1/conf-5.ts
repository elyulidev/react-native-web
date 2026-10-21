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
			type: "paragraph",
			text: "Na web, um `<div>` não se torna um contentor flex até você escrever `display: flex` no CSS dele. No React Native não é preciso: **todo `<View>` já é um contentor flex por padrão**, então os filhos se distribuem pelas regras do flexbox desde o primeiro render.",
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
			text: "`StyleSheet` é uma abstração do React Native semelhante às folhas de estilo CSS. Em vez de escrever CSS, definimos estilos usando objetos JavaScript, o que mantém o JSX limpo e permite tipar as propriedades de estilo.",
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
    flex: 1, // ocupa todo o espaço disponível do pai
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
    // boxShadow funciona igual no Android e no iOS (disponível desde o RN 0.76).
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
  },
  cardText: {
    fontSize: 16,
    color: 'darkslateblue',
  }
});`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "**O que faz `flex: 1`?** Pede ao contentor que ocupe todo o espaço disponível dentro do seu pai. É a primeira das duas propriedades de flexbox que você vai ver em detalhe na seção 3.",
		},
		{
			type: "callout",
			alertType: "info",
			text: "**Sombras multiplataforma:** `boxShadow` funciona igual no Android e no iOS desde o React Native 0.76. Antes dessa versão usava-se `elevation` no Android e `shadowColor` + `shadowOffset` + `shadowOpacity` + `shadowRadius` no iOS.",
		},
		{
			type: "list",
			items: [
				"**Claridade do código:** Ao mover os estilos para fora da função de renderização, o JSX mantém-se limpo e legível.",
				"**Semântica e reutilização:** Nomear os estilos (ex. `styles.card`) adiciona significado e permite reutilizá-los facilmente.",
				"**Tipagem estrita:** `StyleSheet.create()` valida os estilos contra as propriedades nativas de cada plataforma, assim um erro tipográfico ou uma propriedade inexistente é detetado enquanto escreve o código.",
				"**Composição:** `StyleSheet.compose` combina dois estilos aplicando o segundo sobre o primeiro, e `StyleSheet.flatten` achata um array de estilos em um único objeto.",
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
			type: "callout",
			alertType: "info",
			text: "**Nada de `display: flex`:** as imagens desta seção estão anotadas com a notação de CSS, onde um contentor precisa de `display: flex` para se tornar flex. No React Native isso já está feito: todo `<View>` é um contentor flex por padrão, então no seu código você nunca vai escrever `display: flex`.",
		},
		{
			type: "image",
			imageUrl:
				process.env.NODE_ENV === "production"
					? "https://kvskvfok8cknjmpl.public.blob.vercel-storage.com/conf5/flex-direction.webp"
					: "/conf5/flex-direction.webp",
			caption:
				'`flexDirection`: "column" (esquerda, padrão) empilha os elementos verticalmente. "row" (direita) alinha-os horizontalmente.',
		},
		{
			type: "paragraph",
			text: "Este é o código mínimo que reproduz o quadro anterior. Mude o `flexDirection` e observe como os três filhos se reorganizam.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { View, Text, StyleSheet } from 'react-native';

type ItemProps = { label: string };

const Item = ({ label }: ItemProps) => <Text style={styles.item}>{label}</Text>;

// Defaults de flexbox no React Native:
//   justifyContent: 'flex-start' -> os filhos ficam colados no início do eixo principal.
//   alignItems: 'stretch'         -> os filhos se esticam até ocupar o eixo transversal.
// Este exemplo só mexe em flexDirection. Os items têm width e height fixos,
// então o 'stretch' do alignItems não os deforma.
export default function FlexDirectionExample() {
  return (
    <View style={styles.container}>
      {/* flexDirection: 'row' -> os filhos se alinham na horizontal */}
      <View style={styles.row}>
        <Item label="1" />
        <Item label="2" />
        <Item label="3" />
      </View>

      {/* flexDirection: 'column' -> os filhos se empilham na vertical (valor padrão) */}
      <View style={styles.column}>
        <Item label="1" />
        <Item label="2" />
        <Item label="3" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  row: { flexDirection: 'row', backgroundColor: '#1E90FF', padding: 8 },
  column: { flexDirection: 'column', backgroundColor: '#1E90FF', padding: 8 },
  item: {
    width: 48,
    height: 48,
    lineHeight: 48, // centra o numero na vertical
    textAlign: 'center', // centraliza na horizontal
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#ffffff',
    margin: 4,
  },
});`,
		},
		{
			type: "paragraph",
			text: "`justifyContent` alinha os elementos ao longo do eixo principal (o eixo de `flexDirection`).",
		},
		{
			type: "image",
			imageUrl:
				process.env.NODE_ENV === "production"
					? "https://kvskvfok8cknjmpl.public.blob.vercel-storage.com/conf5/jc-all.webp"
					: "/conf5/jc-all.webp",
			caption:
				'Opções de `justifyContent` com `flexDirection: "column"`. Controla o espaçamento vertical.',
		},
		{
			type: "paragraph",
			text: "Este playground reproduz os seis quadros de `justifyContent` que você acabou de ver. Toque em cada botão e observe como os três filhos se distribuem ao longo do eixo principal.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { useState } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

const OPCIONES = [
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
] as const;

type JustifyContent = (typeof OPCIONES)[number];

// Uma nota por valor: o texto de baixo muda com o botão que você tocar.
const DESCRIPCIONES: Record<JustifyContent, string> = {
  'flex-start': 'Os items ficam colados no início do eixo principal, sem espaço entre eles.',
  'center': 'Os items se agrupam no centro do eixo principal.',
  'flex-end': 'Os items ficam colados no final do eixo principal.',
  'space-between': 'O espaço que sobra fica só entre os items: o primeiro no início e o último no final.',
  'space-around': 'Cada item recebe o mesmo espaço dos dois lados, então entre dois items há o dobro que nas bordas.',
  'space-evenly': 'O espaço que sobra é dividido por igual: entre os items e também nas bordas.',
};

export default function JustifyContentPlayground() {
  const [justifyContent, setJustifyContent] = useState<JustifyContent>('flex-start');

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        {OPCIONES.map((opcion) => {
          const activo = opcion === justifyContent;

          return (
            <Pressable
              key={opcion}
              onPress={() => setJustifyContent(opcion)}
              style={[styles.button, activo && styles.buttonActive]}
            >
              <Text style={[styles.buttonText, activo && styles.buttonTextActive]}>
                {opcion}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* O container azul é o mesmo dos quadros da imagem. */}
      <View style={[styles.demo, { justifyContent }]}>
        {['1', '2', '3'].map((n) => (
          <View key={n} style={styles.item}>
            <Text style={styles.itemText}>{n}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.current}>justifyContent: {justifyContent}</Text>
      <Text style={styles.description}>{DESCRIPCIONES[justifyContent]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  buttons: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#e2e8f0',
  },
  buttonActive: { backgroundColor: '#1E90FF' },
  buttonText: { fontSize: 12, color: '#0f172a' },
  buttonTextActive: { color: '#ffffff' },
  demo: { height: 220, backgroundColor: '#1E90FF', padding: 8 },
  item: {
    width: 48,
    height: 48,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: { fontSize: 16, color: '#000000' },
  current: { fontSize: 12, color: '#475569' },
  description: { fontSize: 13, color: '#334155', lineHeight: 19 },
});`,
		},
		{
			type: "paragraph",
			text: "**Atenção a `space-around` e `space-evenly`:** parecem iguais, mas não são. O `space-around` reparte o que sobra em volta de cada item, então entre dois items há o dobro de espaço que nas bordas. O `space-evenly` reparte o que sobra por igual, incluindo as bordas. Com 100 px livres e 3 items: o `space-around` deixa 17 px em cada borda e 33 px entre os items, enquanto o `space-evenly` deixa 25 px em todos os lugares.",
		},
		{
			type: "paragraph",
			text: "`alignItems` alinha os elementos ao longo do eixo transversal (perpendicular ao eixo principal).",
		},
		{
			type: "image",
			imageUrl:
				process.env.NODE_ENV === "production"
					? "https://kvskvfok8cknjmpl.public.blob.vercel-storage.com/conf5/ai-all.png"
					: "/conf5/ai-all.webp",
			caption:
				'Opções de `alignItems` com `flexDirection: "column"`. Controla o alinhamento horizontal.',
		},
		{
			type: "paragraph",
			text: "Este playground faz o mesmo com `alignItems`. Repare que `stretch` e `baseline` só aparecem quando os filhos não têm uma largura fixa.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { useState } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

const OPCIONES = ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'] as const;

type AlignItems = (typeof OPCIONES)[number];

// Uma nota por valor: o texto de baixo muda com o botão que você tocar.
const DESCRIPCIONES: Record<AlignItems, string> = {
  'flex-start': 'Os items ficam colados no início do eixo transversal.',
  'center': 'Os items ficam centralizados no eixo transversal.',
  'flex-end': 'Os items ficam colados no final do eixo transversal.',
  'stretch': 'Os items se esticam até ocupar todo o eixo transversal: por isso este playground não define width para eles.',
  'baseline': 'Os items alinham a primeira linha do texto: os três números ficam apoiados na mesma base, mesmo com tamanhos de fonte diferentes.',
};

// Tamanhos de fonte diferentes para que o caso 'baseline' fique visível.
const TAMANOS = [16, 24, 32];

export default function AlignItemsPlayground() {
  const [alignItems, setAlignItems] = useState<AlignItems>('flex-start');

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        {OPCIONES.map((opcion) => {
          const activo = opcion === alignItems;

          return (
            <Pressable
              key={opcion}
              onPress={() => setAlignItems(opcion)}
              style={[styles.button, activo && styles.buttonActive]}
            >
              <Text style={[styles.buttonText, activo && styles.buttonTextActive]}>
                {opcion}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={[styles.demo, { alignItems }]}>
        {TAMANOS.map((tamano, indice) => (
          <View key={tamano} style={styles.item}>
            <Text style={[styles.itemText, { fontSize: tamano }]}>{indice + 1}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.current}>alignItems: {alignItems}</Text>
      <Text style={styles.description}>{DESCRIPCIONES[alignItems]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  buttons: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#e2e8f0',
  },
  buttonActive: { backgroundColor: '#1E90FF' },
  buttonText: { fontSize: 12, color: '#0f172a' },
  buttonTextActive: { color: '#ffffff' },
  demo: { height: 220, backgroundColor: '#1E90FF', padding: 8 },
  item: { backgroundColor: '#ffffff', paddingHorizontal: 12, paddingVertical: 8, margin: 2 },
  itemText: { color: '#000000' },
  current: { fontSize: 12, color: '#475569' },
  description: { fontSize: 13, color: '#334155', lineHeight: 19 },
});`,
		},
		{
			type: "paragraph",
			text: "**Atenção ao `baseline`:** ele não alinha os items pela caixa, mas pela **base da primeira linha do texto**. Por isso no playground os três números têm tamanhos de fonte diferentes: com `flex-start` eles se empilham de cima para baixo, enquanto com `baseline` os três ficam apoiados na mesma linha base, como quando você tem um título grande e um subtítulo pequeno na mesma fila.",
		},
		{
			type: "paragraph",
			text: "`gap` define o espaçamento entre os filhos sem precisar de margens. Está disponível desde o React Native 0.71 e é a forma recomendada de separar elementos dentro de um layout.",
		},
		{
			type: "code",
			language: "jsx",
			code: `
// Com flexDirection: 'row', o comportamento é semelhante ao da web.
// justifyContent controla o eixo horizontal e alignItems o vertical.
<>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
    <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />
    <View style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
  </View>

  {/* gap separa os filhos sem usar margens. */}
  <View style={{ flexDirection: 'row', gap: 12 }}>
    <View style={{ flex: 1, height: 50, backgroundColor: 'red' }} />
    <View style={{ flex: 1, height: 50, backgroundColor: 'green' }} />
    <View style={{ flex: 1, height: 50, backgroundColor: 'blue' }} />
  </View>
</>
`,
		},
		{
			type: "paragraph",
			text: "**`flex: 1`:** é a forma curta de `flexGrow: 1`, `flexShrink: 1` e `flexBasis: '0%'`. Diz ao filho que cresça para ocupar o espaço que sobra, que encolha se não couber e que parta de uma base de tamanho zero. Sem ela (`flex: 0`, que é o valor padrão) o filho mede exatamente o que o seu conteúdo mede.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
import { View, Text, StyleSheet } from 'react-native';

export default function FlexGrowExample() {
  return (
    <View style={styles.container}>
      {/* flex: 0 (o default) -> mede apenas o que o seu conteúdo mede */}
      <View style={styles.fixed}>
        <Text style={styles.text}>fixo</Text>
      </View>

      {/* flex: 1 -> cresce e fica com o espaço que sobra */}
      <View style={styles.grow}>
        <Text style={styles.text}>cresce</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', padding: 16 },
  fixed: { backgroundColor: '#1E90FF', padding: 12 },
  grow: { flex: 1, backgroundColor: '#38BDF8', padding: 12 },
  text: { color: '#ffffff' },
});`,
		},
		{
			type: "paragraph",
			text: "A caixa azul fica com o tamanho do seu texto, enquanto a celeste leva todo o espaço que sobra. É o mesmo `flex: 1` que você vê no `container` dos exemplos anteriores: ali ele faz a tela inteira ser ocupada.",
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
					icon: "RectangleStackIcon",
					title: "Composição de Estilos",
					text: "`StyleSheet.compose` aplica um estilo sobre outro sem duplicar regras, e `StyleSheet.flatten` transforma um array de estilos em um único objeto.",
				},
				{
					icon: "SparklesIcon",
					title: "Autocompletar e Validação",
					text: "Com TypeScript, `StyleSheet.create()` valida cada propriedade contra os estilos nativos da plataforma: um `marginTopt` mal escrito é marcado no editor, não no dispositivo. Os IDEs também completam os nomes dos estilos por você.",
				},
			],
		},
		{
			type: "callout",
			alertType: "info",
			text: "**E o desempenho?** Desde o React Native 0.56, `StyleSheet.create()` não oferece mais vantagem de desempenho sobre os estilos em linha: o benefício real é a organização e a tipagem. Com a nova arquitetura (a única desde o RN 0.82) os estilos em linha também são válidos. Na próxima conferência você vai ver o NativeWind, que leva os estilos reutilizáveis um passo adiante.",
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
				process.env.NODE_ENV === "production"
					? "https://kvskvfok8cknjmpl.public.blob.vercel-storage.com/conf5/dark-light-mode.webp"
					: "/conf5/dark-light-mode.webp",
			caption:
				"Uma interface de utilizador que se adapta ao modo claro e escuro para uma melhor experiência de utilizador.",
		},
		{
			type: "list",
			items: [
				"**Cores Centralizadas:** Defina uma paleta de cores para os modos claro e escuro num arquivo de constantes.",
				'**Contexto do Tema:** Crie um `ThemeContext` que forneça o tema atual (ex. "light" o "dark") e uma função para o alterar.',
				"**Preferência do Sistema:** O hook `useColorScheme` do React Native já devolve o modo claro ou escuro conforme a configuração do dispositivo. Use-o como valor padrão antes de permitir que a pessoa escolha manualmente.",
				"**Hook Personalizado (`useTheme`):** Um hook simples `useTheme` que consome o contexto e devolve as cores do tema ativo.",
				"**Persistência:** Use `AsyncStorage` para guardar a preferência de tema entre sessões. `expo-secure-store` é para segredos, como tokens ou chaves: não use para preferências de interface.",
				"**StatusBar Dinâmica:** Utilize o componente `<StatusBar>` para alterar o estilo da barra de estado (claro/escuro) de acordo com o tema ativo.",
			],
		},
		{
			type: "code",
			language: "typescript",
			code: `
// hook-conceptual.ts
import { useContext } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeContext, cores } from './ThemeProvider';

export const useTheme = () => {
  const { theme } = useContext(ThemeContext); // Tema escolhido, pode ser undefined
  const preferenciaSistema = useColorScheme(); // 'light' | 'dark' | null
  return cores[theme ?? preferenciaSistema ?? 'light'];
};

// Component.tsx
import { View, Text } from 'react-native';
import { useTheme } from './hooks/useTheme';

export default function ThemedComponent() {
  const colors = useTheme(); // Obtém as cores do tema ativo

  return (
    // Os estilos adaptam-se dinamicamente
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Conteúdo aqui</Text>
    </View>
  );
}`,
		},
		{ type: "divider" },
		{
			type: "heading",
			text: "Tarefa Extraclasse: Sistema de Estilos com Tema Claro e Escuro",
		},
		{
			type: "paragraph",
			text: "Coloque em prática o que aprendeu levando uma tela a um sistema de estilos coerente e com suporte a tema claro e escuro. Esta tarefa é individual e você deverá entregar um relatório simples com capturas e as respostas às perguntas finais.",
		},
		{
			type: "list",
			items: [
				"1. **Crie um projeto** chamado `meus-estilos-tema` com `bun create expo meus-estilos-tema` e inicie-o com `bun expo start`.",
				"2. **Centralize a paleta:** crie um arquivo `src/styles/theme.ts` com uma paleta `claro` e outra `escuro`, e mova os estilos da sua tela principal para um `StyleSheet.create()` tipado.",
				"3. **Monte o tema:** implemente um `ThemeContext` com um hook `useTheme` que devolva a paleta ativa, e use `useColorScheme` como valor padrão quando a pessoa ainda não escolheu um tema.",
				"4. **Refaça o layout:** aplique `gap` no lugar de margens manuais e `boxShadow` para as sombras dos cards. Tire uma captura no modo claro e outra no modo escuro.",
				"5. **Responda no seu relatório:** o que o `StyleSheet.create()` te deu de vantagem frente aos estilos em linha, e quais são de organização e quais de tipagem? O que você mudaria se o time migrasse para o NativeWind?",
			],
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Dica: se as cores piscarem ao trocar de tema, verifique se você está lendo a paleta a partir do `useTheme()` e não com valores fixos no JSX.",
		},
	],
};
