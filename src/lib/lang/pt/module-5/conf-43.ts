import type { CurriculumTopic } from "../../../../types/types";

export const conference43: CurriculumTopic = {
	id: "conf-43",
	title: "Conf. 43: UI Responsiva",
	content: [
		{ type: "heading", text: "Design de UI Responsiva" },
		{
			type: "paragraph",
			text: "Ao contrário da web, no mundo móvel existe uma enorme variedade de tamanhos de ecrã, densidades de píxeis e orientações. Um design responsivo garante que a sua aplicação tenha uma boa aparência e funcione bem em todos os dispositivos, desde um telemóvel pequeno a um tablet grande.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "1. `Dimensions` API: Conhecendo o Tamanho do Ecrã",
		},
		{
			type: "paragraph",
			text: "A API `Dimensions` do React Native permite-nos obter a largura e a altura do ecrã do dispositivo. É útil para cálculos de estilo que dependem do tamanho do ecrã.",
		},
		{
			type: "code",
			language: "javascript",
			code: `
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

console.log(\`A largura da janela é \${width} e a altura é \${height}\`);

// Uso num estilo:
// const styles = StyleSheet.create({
//   container: {
//     width: width / 2, // Ocupa metade da largura do ecrã
//   }
// });
`,
		},
		{
			type: "callout",
			alertType: "warning",
			text: "`Dimensions.get()` não se atualiza automaticamente se o utilizador rodar o dispositivo. Para layouts que devem mudar com a rotação, são necessários hooks personalizados ou bibliotecas que escutem estas mudanças.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "2. `PixelRatio`: Adaptando-se a Diferentes Densidades",
		},
		{
			type: "paragraph",
			text: 'Nem todos os píxeis são iguais. Os ecrãs de alta resolução (como os "Retina") têm mais píxeis físicos no mesmo espaço. O `PixelRatio` ajuda-nos a lidar com isto para que elementos como imagens e bordas pareçam nítidos.',
		},
		{
			type: "code",
			language: "javascript",
			code: `
import { PixelRatio, StyleSheet } from 'react-native';

const size = 50; // Tamanho base em pontos de design

const styles = StyleSheet.create({
  image: {
    width: PixelRatio.getPixelSizeForLayoutSize(size), // Converte pontos para píxeis físicos
    height: PixelRatio.getPixelSizeForLayoutSize(size),
  },
  thinBorder: {
    borderWidth: 1 / PixelRatio.get(), // Cria a borda mais fina possível no dispositivo
  }
});
`,
		},
		{ type: "divider" },

		{ type: "subtitle", text: "3. Design Responsivo com NativeWind" },
		{
			type: "paragraph",
			text: 'O NativeWind simplifica enormemente o design responsivo ao fornecer modificadores de "breakpoint" (pontos de quebra), semelhantes aos da web. Por defeito, estes não estão ativados, mas podemos configurá-los no `tailwind.config.js`.',
		},

		{ type: "paragraph", text: "**Passo 1: Configurar Breakpoints**" },
		{
			type: "paragraph",
			text: "Não existem breakpoints por defeito no NativeWind. Devemos defini-los nós mesmos. Uma abordagem comum é usar `sm`, `md`, `lg`.",
		},
		{
			type: "code",
			language: "javascript",
			code: `
// tailwind.config.js
module.exports = {
  // ...
  theme: {
    extend: {
      screens: {
        'sm': '380px', // Telemóveis pequenos
        'md': '768px', // Tablets
      },
    },
  },
  // ...
};
`,
		},

		{
			type: "paragraph",
			text: "**Passo 2: Usar Modificadores em Componentes**",
		},
		{
			type: "paragraph",
			text: "Uma vez configurados, podemos usar os modificadores para aplicar estilos diferentes com base na largura do ecrã.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
<View className="bg-blue-500 p-4 md:bg-green-500">
  <Text className="text-white text-lg sm:text-xl md:text-2xl">
    Este texto muda de tamanho!
  </Text>
</View>
`,
		},
		{
			type: "list",
			items: [
				"**`bg-blue-500`**: O fundo é azul no tamanho mais pequeno (por defeito).",
				"**`md:bg-green-500`**: Quando a largura do ecrã é de 768px ou mais, o fundo torna-se verde.",
				"**`text-lg sm:text-xl md:text-2xl`**: O tamanho do texto aumenta à medida que o ecrã se torna maior.",
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "4. Prática: Tornar a Lista de Propriedades Responsiva",
		},
		{
			type: "paragraph",
			text: "Vamos aplicar estes conceitos ao nosso mini-projeto de imobiliária. Queremos que a `FlatList` de propriedades exiba uma única coluna em telemóveis e duas colunas em tablets.",
		},
		{
			type: "code",
			language: "tsx",
			code: `
// No ecrã de listagem de propriedades (app/index.tsx)
import { useWindowDimensions } from 'react-native';

export default function HomeScreen() {
    // ... (toda a lógica de fetch e filtros)
    const { width } = useWindowDimensions(); // Hook que se atualiza com as mudanças

    const numColumns = width > 768 ? 2 : 1; // 2 colunas se for mais largo que 768px

    return (
        <SafeAreaView className="flex-1 bg-slate-900">
            {/* ... */}
            <FlatList
                data={props}
                renderItem={({ item }) => (
                    // O modificador 'md:' pode não funcionar diretamente no item
                    // se o numColumns mudar, pelo que ajustar o estilo é mais fiável.
                    <View style={{ flex: 1 / numColumns, padding: 4 }}>
                        <PropertyCard property={item} />
                    </View>
                )}
                key={numColumns} // ¡Importante! Mudar a key força uma re-renderização da lista
                numColumns={numColumns}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    );
}
`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "O truque de `key={numColumns}` é crucial. Diz ao `FlatList` que a sua configuração fundamental mudou, forçando-o a re-renderizar o seu layout por completo quando `numColumns` muda (ex. ao rodar um tablet).",
		},
	],
};
