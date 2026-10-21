import type { CurriculumTopic } from "../../../../types/types";

export const conference7: CurriculumTopic = {
	id: "conf-7",
	title: "Conf. 7: Gestão de Assets",
	content: [
		{ type: "heading", text: "Gestão de Assets: Imagens, Fontes e Ícones" },
		{
			type: "paragraph",
			text: "Bem-vindos a uma sessão essencial para o desenvolvimento de interfaces de utilizador em React Native! Hoje vamos focar-nos na gestão de assets: como carregar imagens locais e remotas, como registar tipografias personalizadas e como integrar bibliotecas de ícones. Uma boa gestão destes recursos não só melhora a estética da nossa aplicação, como também o seu desempenho e manutenibilidade.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "1. Imagens locais e remotas",
		},
		{
			type: "paragraph",
			text: "As imagens são um componente fundamental em quase qualquer aplicação. O React Native traz o componente `Image`, mas dentro de um projeto Expo a peça recomendada é o **`expo-image`**: é mais rápido, faz cache dos recursos em disco e memória, e expõe `contentFit` em vez do antigo `resizeMode`.",
		},
		{
			type: "list",
			items: [
				"**`expo-image`:** o componente de imagens do Expo. Aceita recursos locais (`require`) e remotos (`uri`), faz cache em disco e memória, e permite transições e placeholders.",
				"**`Image` do React Native:** continua a funcionar e é uma alternativa razoável se não quiseres adicionar dependências. Atenção: no `expo-image`, as props herdadas do React Native (`resizeMode`, `fadeDuration`) estão deprecadas.",
				"**`ImageBackground`:** permite usar uma imagem como fundo, sobrepondo outros componentes por cima.",
				"**SVG:** o React Native não as suporta de forma nativa. Para isso precisas de um pacote de terceiros como o `react-native-svg`.",
			],
		},

		{ type: "paragraph", text: "**Imagens locais com `require()`:**" },
		{
			type: "list",
			items: [
				"Para carregar uma imagem do armazenamento local do projeto usas `require()` dentro da prop `source`.",
				"O caminho é resolvido como um módulo de JavaScript: **relativo ao ficheiro onde escreveste o `require()`**.",
				"**Exceção com alias:** o template atual do Expo configura no `tsconfig.json` os aliases `@/*` → `./src/*` e `@/assets/*` → `./assets/*`. Com `@/assets/...` o caminho aponta **sempre para a pasta `assets/` da raiz**, independentemente do ficheiro onde estás.",
				"O caminho tem de ser uma **string literal**: uma constante que o bundler consegue ler na compilação. O alias `@/assets/...` também é uma string literal, por isso cumpre a mesma regra.",
				"**Não funciona** se construíres o caminho dinamicamente: `require('./' + icone + '.png')`, porque o bundler só resolve nomes de ficheiro que conhece na compilação.",
				"É crucial especificar as dimensões (`width` e `height`): sem elas a imagem não é mostrada.",
				"Para densidades diferentes podes entregar variantes `@2x` e `@3x` do mesmo ficheiro (por exemplo `logo@2x.png` e `logo@3x.png`); o sistema escolhe a correta conforme o ecrã.",
			],
		},
		{
			type: "code",
			language: "jsx",
			code: `import { Image } from 'expo-image';

export const Logo = () => (
  <Image
    source={require('@/assets/images/logo.png')}
    style={{ width: 100, height: 100 }}
    contentFit="contain"
    transition={200}
  />
);`,
		},

		{ type: "paragraph", text: "**Imagens remotas com URI:**" },
		{
			type: "list",
			items: [
				"Para imagens alojadas numa URL passas um objeto com uma propriedade `uri` na prop `source`.",
				"Tal como nas imagens locais, é necessário especificar as dimensões.",
				"O `cachePolicy` decide quanto se guarda em cache: `'none'`, `'disk'` (por omissão), `'memory'` ou `'memory-disk'`.",
			],
		},
		{
			type: "code",
			language: "jsx",
			code: `import { Image } from 'expo-image';

export const RemoteImage = () => (
  <Image
    source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
    style={{ width: 50, height: 50 }}
    contentFit="cover"
    cachePolicy="memory-disk"
  />
);`,
		},

		{ type: "paragraph", text: "**O que é realmente um `require()`:**" },
		{
			type: "paragraph",
			text: "Em tempo de execução, `require('./logo.png')` não devolve a imagem: devolve um **número opaco** que identifica o recurso dentro do bundle. Para o resolver a uma URL real (e ao seu largura e altura) usa o `expo-asset`, que já vem incluído no Expo.",
		},
		{
			type: "code",
			language: "jsx",
			code: `import { Asset, useAssets } from 'expo-asset';

// Com o hook: carregas vários recursos e esperas que estejam prontos.
const [assets] = useAssets([require('@/assets/images/logo.png')]);
// assets[0].uri, assets[0].width, assets[0].height

// Ou de forma pontual, fora de um componente:
const asset = Asset.fromModule(require('@/assets/images/logo.png'));`,
		},

		{ type: "paragraph", text: "**TypeScript e os módulos de imagem:**" },
		{
			type: "paragraph",
			text: "Se usares TypeScript e escreveres a imagem como `import logo from './logo.png'`, o IDE vai reclamar que não encontra o módulo. Para isso sim precisas de um ficheiro de declarações. Já com `require()` não é preciso nada: a função `require` está tipada como `(caminho: string) => any`, por isso o compilador não se queixa.",
		},
		{
			type: "code",
			language: "typescript",
			code: `// images.d.ts (apenas para a forma import, não para o require)
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';`,
		},

		{ type: "paragraph", text: "**Organização de Assets:**" },
		{
			type: "paragraph",
			text: "É uma boa prática organizar as tuas imagens numa pasta `assets/images` (e as tipografias em `assets/fonts`). Também podes centralizar a importação e exportação de imagens num único ficheiro (por exemplo `src/constants/images.ts`) para facilitar a sua utilização em toda a aplicação.",
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Dica: se tiveres muitos assets, verifica se os nomes e as pastas não têm espaços nem acentos. O bundler lida com eles, mas alguns scripts de build e alguns CDNs não.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "2. Fontes personalizadas",
		},
		{
			type: "paragraph",
			text: "Usar fontes personalizadas é fundamental para a identidade visual de uma aplicação. O Expo resolve isto com o pacote `expo-font`, que oferece dois caminhos: o **config plugin** (recomendado) e o hook `useFonts`.",
		},
		{
			type: "list",
			items: [
				"**1. Organizar as fontes:** guarda os ficheiros (`.ttf` ou `.otf`) em `assets/fonts/`.",
				"**2. Opção A — config plugin (recomendado):** declaras as fontes no `app.json` e ficam **embebidas no build**, pelo que aparecem desde o primeiro frame sem esperar nada em runtime.",
				"**3. Opção B — hook `useFonts`:** carregas as fontes de forma assíncrona a partir do layout raiz. É a opção a usar quando não podes usar o plugin (por exemplo, na **web**, onde os plugins são nativos).",
			],
		},
		{
			type: "code",
			language: "json",
			code: `{
  "expo": {
    "plugins": [
      [
        "expo-font",
        {
          "fonts": [
            "./assets/fonts/Quicksand-Regular.ttf",
            "./assets/fonts/Quicksand-Bold.ttf"
          ]
        }
      ]
    ]
  }
}`,
		},
		{
			type: "paragraph",
			text: "Cada ficheiro torna-se uma família com o nome do ficheiro sem extensão: `Quicksand-Bold.ttf` fica disponível como `Quicksand-Bold`.",
		},
		{
			type: "code",
			language: "tsx",
			code: `// src/app/_layout.tsx
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { useEffect } from 'react';

// Chamado no scope global: se o fizeres dentro de um componente,
// pode ser executado tarde, quando a splash já se ocultou.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    'Quicksand-Bold': require('@/assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-Regular': require('@/assets/fonts/Quicksand-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hide();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return <Stack />;
}`,
		},
		{
			type: "callout",
			alertType: "warning",
			text: "No Expo SDK 57 usa **ficheiros de fonte estáticos**. As fontes variáveis (variable fonts) e as famílias com vários pesos sob o mesmo nome só chegam no SDK 58.",
		},

		{ type: "paragraph", text: "**Controlar a Splash Screen:**" },
		{
			type: "list",
			items: [
				"`SplashScreen.preventAutoHideAsync()` mantém a splash visível; chama-o no scope global, sem `await`.",
				"`SplashScreen.hide()` oculta-a. (O `hideAsync()` existe por compatibilidade com versões anteriores, mas `hide()` é a API atual.)",
				"`SplashScreen.setOptions({ duration, fade })` define quanto dura a transição de saída; o `fade` aplica-se apenas ao iOS.",
			],
		},

		{ type: "paragraph", text: "**Expor a fonte no Tailwind CSS:**" },
		{
			type: "paragraph",
			text: "Para o Tailwind reconhecer e permitir usar as tuas fontes personalizadas através de classes, estende a propriedade `fontFamily` no `tailwind.config.js`.",
		},
		{
			type: "code",
			language: "javascript",
			code: `// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'quicksand-bold': ['Quicksand-Bold', 'sans-serif'],
        'quicksand-regular': ['Quicksand-Regular', 'sans-serif'],
      },
    },
  },
  plugins: [],
};`,
		},
		{
			type: "list",
			items: [
				'**Aplicar as fontes:** depois de configuradas no Tailwind, usas-nas com as classes correspondentes, por exemplo: `<Text className="font-quicksand-bold">O meu texto</Text>`.',
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Bibliotecas de ícones",
		},
		{
			type: "paragraph",
			text: "Os ícones são elementos essenciais para a navegação e a comunicação visual. Durante muito tempo usou-se o `@expo/vector-icons`, mas **o Expo já anunciou a sua depreciação**: deixou de ser uma dependência do pacote `expo` e o seu sucessor é a família de pacotes por conjunto `@react-native-vector-icons/*`.",
		},
		{
			type: "list",
			items: [
				"**Instalação:** cada conjunto é um pacote próprio. O `expo install` não o conhece (o Expo não publica uma versão oficial para ele), por isso instala-se diretamente com o Bun.",
				"**Uso:** importas o conjunto que quiseres e usas a prop `name` com o nome do ícone. Os nomes estão tipados, por isso o autocompletar avisa-te se escreveres um que não existe.",
				"**Expo Go:** a importação por omissão regista a fonte automaticamente, por isso funciona no Expo Go sem development build.",
				"**Importação `/static`:** se precisares que a fonte do ícone seja embebida no build (em vez de carregada em runtime), importas de `@react-native-vector-icons/ionicons/static`. Isso **exige development build** e o seu próprio config plugin.",
				"**Codemod:** se estás a migrar de `@expo/vector-icons`, o `bunx @react-native-vector-icons/codemod` reescreve os imports automaticamente.",
			],
		},
		{
			type: "code",
			language: "bash",
			code: `bun add @react-native-vector-icons/ionicons`,
		},
		{
			type: "code",
			language: "jsx",
			code: `import Ionicons from '@react-native-vector-icons/ionicons';

export const HomeIcon = () => (
  <Ionicons name="home-outline" size={24} color="#000000" />
);`,
		},

		{ type: "paragraph", text: "**`expo-symbols`: os ícones do sistema**" },
		{
			type: "paragraph",
			text: "Se a tua app fica boa no iOS com os ícones nativos, o `expo-symbols` dá-te acesso direto aos **SF Symbols** no iOS e aos **Material Symbols** no Android e na web, sem escrever um único caminho SVG.",
		},
		{
			type: "code",
			language: "tsx",
			code: `import { SymbolView } from 'expo-symbols';

// O nome pode ser um objeto por plataforma: o iOS usa SF Symbols,
// o Android e a web usam Material Symbols.
export const HeartIcon = () => (
  <SymbolView
    name={{ ios: 'heart.fill', android: 'favorite', web: 'favorite' }}
    size={24}
    tintColor="#FF6363"
    type="hierarchical"
  />
);`,
		},
		{
			type: "callout",
			alertType: "info",
			text: "O `expo-symbols` está em beta: a API pode mudar. É ideal para ícones do sistema, mas para uma marca própria convém usar um conjunto de ícones próprio.",
		},

		{ type: "paragraph", text: "**Ícones na Barra de Navegação:**" },
		{
			type: "paragraph",
			text: "No Expo Router defines os ícones de cada separador com a prop `tabBarIcon` dentro de `Tabs.Screen.options`. Recebe um callback com `color`, `size` e o estado `focused`, por isso podes mudar o ícone conforme o separador esteja ativo ou não.",
		},
		{
			type: "code",
			language: "tsx",
			code: `// src/app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Definições',
          // Se desenhares o teu próprio texto dentro de tabBarIcon, o título
          // por omissão continua a ser mostrado e fica duplicado. Isto oculta-o:
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ alignItems: 'center', gap: 2 }}>
              <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />
              <Text style={{ color, fontSize: 10, fontFamily: focused ? 'Quicksand-Bold' : 'Quicksand-Regular' }}>
                Definições
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Regra prática: se dentro de `tabBarIcon` desenhares o teu próprio `<Text>`, adiciona sempre `tabBarShowLabel: false`. Se deixares apenas o ícone, não é preciso: o título por omissão mostra-se.",
		},

		{ type: "paragraph", text: "**Ícones Personalizados a partir de Assets:**" },
		{
			type: "paragraph",
			text: "Para além das bibliotecas de ícones, podes usar os teus próprios ficheiros de imagem (PNG, etc.) como ícones, importando-os da pasta `assets/icons` com `require()`.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "4. Configuração da app: ícone e splash screen",
		},
		{
			type: "paragraph",
			text: "O ficheiro `app.json` é o centro de configuração da tua app. Aí defines o ícone da aplicação e configuras a splash screen **com plugins**, não com a propriedade `splash`: essa propriedade foi removida da configuração do Expo no SDK 56.",
		},
		{
			type: "code",
			language: "json",
			code: `{
  "expo": {
    "icon": "./assets/images/icon.png",
    "ios": {
      "icon": "./assets/expo.icon"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "backgroundColor": "#208AEF",
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 76,
          "resizeMode": "contain"
        }
      ]
    ]
  }
}`,
		},
		{
			type: "list",
			items: [
				"**`icon`:** a imagem principal da app. No novo projeto do Expo é `./assets/images/icon.png`.",
				"**`ios.icon`:** aponta para `./assets/expo.icon`, que é uma **pasta** com o formato Icon Composer da Apple. Se o teu projeto não a tiver, remove essa linha.",
				"**Plugin `expo-splash-screen`:** substitui a antiga propriedade `splash`. A imagem da splash tem de ser um **PNG**; com outros formatos o build de produção falha.",
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "5. Tarefa Prática: Ecrã com imagens, ícones e tipografia própria",
		},
		{
			type: "paragraph",
			text: "Para consolidar o que aprendeste, cria um ecrã de perfil que combine imagens locais e remotas, ícones vetoriais e uma tipografia própria, e aproveita para levar os ícones e a fonte à barra de navegação inferior (Tab Bar) da tua app. Esta tarefa é individual: prepara uma demo de como ficou e conta que decisões tomaste e porquê.",
		},
		{
			type: "list",
			items: [
				"**1. Instalação:** adiciona os pacotes que vais usar: `bun expo install expo-image expo-asset` e `bun add @react-native-vector-icons/ionicons`.",
				"**2. Preparação:** confirma que tens uma fonte personalizada em `assets/fonts/` e que está carregada em `src/app/_layout.tsx` (ou embebida com o plugin do `expo-font`).",
				"**3. Tailwind:** adiciona a fonte personalizada ao `tailwind.config.js` e reinicia o servidor com `bun expo start --clear` para o tema ser regenerado.",
				"**4. Imagens:** no ecrã novo, mostra uma imagem local com o `expo-image` (com `contentFit` e `transition`) e uma remota por URL (com o seu `cachePolicy`).",
				"**5. Ícones:** em `src/app/(tabs)/_layout.tsx`, usa a prop `tabBarIcon` para definir os ícones de cada separador, e faz com que o ícone mude entre o estado ativo e o inativo.",
				"**6. Atenção ao título:** se o teu ícone custom inclui um texto, adiciona `tabBarShowLabel: false` para o título não ficar duplicado.",
				"**7. Resultado esperado:** ao executar a app deverás ver o ecrã com as imagens, os ícones na barra inferior a mudar de estilo quando estão ativos, e o texto a usar a fonte que configuraste.",
			],
		},
		{
			type: "code",
			language: "jsx",
			code: `// src/app/profile.tsx
import { Image } from 'expo-image';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', gap: 12, padding: 24 }}>
      {/* 1. Substitui este bloco pela imagem local com expo-image */}
      <View style={{ width: 120, height: 120, backgroundColor: '#e4e4e7' }} />

      {/* 2. Substitui este bloco pela imagem remota com expo-image */}

      {/* 3. Mostra um ícone do Ionicons */}

      {/* 4. Usa a fonte Quicksand (com NativeWind: className, ou com fontFamily) */}
      <Text style={{ fontSize: 20 }}>O meu perfil</Text>
    </View>
  );
}`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Se a imagem local te sair a branco, verifica que o path é literal e que o ficheiro existe em `assets/images/`. Se sair distorcido, ajusta o `contentFit`.",
		},
	],
};
