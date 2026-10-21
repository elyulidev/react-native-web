import type { CurriculumTopic } from "../../../../types/types";

export const conference7: CurriculumTopic = {
	id: "conf-7",
	title: "Conf. 7: Gestión de Assets",
	content: [
		{ type: "heading", text: "Gestión de Assets: Imágenes, Fuentes e Íconos" },
		{
			type: "paragraph",
			text: "¡Bienvenidos a una sesión esencial para el desarrollo de interfaces de usuario en React Native! Hoy nos enfocaremos en la gestión de assets: cómo cargar imágenes locales y remotas, cómo registrar tipografías personalizadas y cómo integrar iconos vectoriales. Una buena gestión de estos recursos no solo mejora la estética de nuestra aplicación, sino también su rendimiento y mantenibilidad.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "1. Imágenes locales y remotas",
		},
		{
			type: "paragraph",
			text: "Las imágenes son un componente fundamental en casi cualquier aplicación. React Native trae el componente `Image`, pero dentro de un proyecto Expo la pieza recomendada es **`expo-image`**: es más rápida, cachea los recursos en disco y memoria, y expone `contentFit` en lugar del antiguo `resizeMode`.",
		},
		{
			type: "list",
			items: [
				"**`expo-image`:** el componente de imágenes de Expo. Acepta recursos locales (`require`) y remotos (`uri`), cachea en disco y memoria, y permite transiciones y placeholders.",
				"**`Image` de React Native:** sigue funcionando y es un fallback razonable si no querés agregar dependencias. Ojo: en `expo-image` las props heredadas de React Native (`resizeMode`, `fadeDuration`) están deprecadas.",
				"**`ImageBackground`:** permite usar una imagen como fondo, superponiendo otros componentes encima.",
				"**SVG:** React Native no las soporta de forma nativa. Para eso necesitás un paquete de terceros como `react-native-svg`.",
			],
		},

		{ type: "paragraph", text: "**Imágenes locales con `require()`:**" },
		{
			type: "list",
			items: [
				"Para cargar una imagen desde el almacenamiento local del proyecto se usa `require()` dentro de la prop `source`.",
				"La ruta se resuelve como un módulo de JavaScript: **relativa al archivo donde escribís el `require()`**.",
				"**Excepción con alias:** el template actual de Expo configura en el `tsconfig.json` los alias `@/*` → `./src/*` y `@/assets/*` → `./assets/*`. Con `@/assets/...` la ruta apunta **siempre a la carpeta `assets/` de la raíz**, sin importar en qué archivo estés.",
				"La ruta tiene que ser una **string literal**: una constante que el bundler puede leer al compilar. El alias `@/assets/...` también es una string literal, así que cumple la misma regla.",
				"**No funciona** si armás la ruta dinámicamente: `require('./' + icono + '.png')`, porque el bundler solo resuelve nombres de archivo que conoce al compilar.",
				"Es crucial especificar las dimensiones (`width` y `height`): sin ellas la imagen no se muestra.",
				"Para densities distintas podés entregar variantes `@2x` y `@3x` del mismo archivo (por ejemplo `logo@2x.png` y `logo@3x.png`); el sistema elige la correcta según la pantalla.",
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

		{ type: "paragraph", text: "**Imágenes remotas con URI:**" },
		{
			type: "list",
			items: [
				"Para imágenes alojadas en una URL se pasa un objeto con una propiedad `uri` en la prop `source`.",
				"Al igual que con las imágenes locales, es necesario especificar las dimensiones.",
				"`cachePolicy` decide cuánto se guarda en caché: `'none'`, `'disk'` (por defecto), `'memory'` o `'memory-disk'`.",
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

		{ type: "paragraph", text: "**Qué es realmente un `require()`:**" },
		{
			type: "paragraph",
			text: "En tiempo de ejecución, `require('./logo.png')` no devuelve la imagen: devuelve un **número opaco** que identifica al recurso dentro del bundle. Para resolvedo a una URL real (y a su ancho y alto) usá `expo-asset`, que ya viene incluido en Expo.",
		},
		{
			type: "code",
			language: "jsx",
			code: `import { Asset, useAssets } from 'expo-asset';

// Con el hook: cargás varios recursos y esperás a que estén listos.
const [assets] = useAssets([require('@/assets/images/logo.png')]);
// assets[0].uri, assets[0].width, assets[0].height

// O de forma puntual, fuera de un componente:
const asset = Asset.fromModule(require('@/assets/images/logo.png'));`,
		},

		{ type: "paragraph", text: "**TypeScript y los módulos de imagen:**" },
		{
			type: "paragraph",
			text: "Si usás TypeScript y escribís la imagen como `import logo from './logo.png'`, el IDE se va a quejar de que no encuentra el módulo. Para eso sí necesitás un archivo de declaraciones. En cambio, cuando usás `require()` no hace falta nada: la función `require` está tipada como `(ruta: string) => any`, así que el compilador no se queja.",
		},
		{
			type: "code",
			language: "typescript",
			code: `// images.d.ts (solo para la forma import, no para require)
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';`,
		},

		{ type: "paragraph", text: "**Organización de Assets:**" },
		{
			type: "paragraph",
			text: "Es una buena práctica organizar tus imágenes en una carpeta `assets/images` (y las tipografías en `assets/fonts`). También podés centralizar la importación y exportación de imágenes desde un solo archivo (por ejemplo `src/constants/images.ts`) para facilitar su uso en toda la aplicación.",
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Consejo: si tenés muchos assets, revisá que los nombres y las carpetas no tengan espacios ni acentos. El bundler los maneja, pero algunos scripts de build y algunos CDNs no.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "2. Fuentes personalizadas",
		},
		{
			type: "paragraph",
			text: "Usar fuentes personalizadas es clave para la identidad visual de una aplicación. Expo lo resuelve con el paquete `expo-font`, que ofrece dos caminos: el **config plugin** (recomendado) y el hook `useFonts`.",
		},
		{
			type: "list",
			items: [
				"**1. Organizar las fuentes:** guardá los archivos (`.ttf` u `.otf`) en `assets/fonts/`.",
				"**2. Opción A — config plugin (recomendada):** declarás las fuentes en el `app.json` y quedan **embebidas en el build**, así que se ven desde el primer frame sin esperar nada en runtime.",
				"**3. Opción B — hook `useFonts`:** cargás las fuentes de forma asíncrona desde el layout raíz. Es la opción a usar cuando no podés usar el plugin (por ejemplo, en **web**, donde los plugins son nativos).",
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
			text: "Cada archivo se convierte en una familia con el nombre del archivo sin extensión: `Quicksand-Bold.ttf` queda disponible como `Quicksand-Bold`.",
		},
		{
			type: "code",
			language: "tsx",
			code: `// src/app/_layout.tsx
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { useEffect } from 'react';

// Se llama en el scope global: si lo hacés dentro de un componente,
// puede ejecutarse tarde, cuando la splash ya se ocultó.
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
			text: "En Expo SDK 57 usá **archivos de fuente estáticos**. Las fuentes variables (variable fonts) y las familias con varios pesos bajo un mismo nombre llegan recién en SDK 58.",
		},

		{ type: "paragraph", text: "**Controlar la Splash Screen:**" },
		{
			type: "list",
			items: [
				"`SplashScreen.preventAutoHideAsync()` mantiene la splash visible; llamalo en el scope global, sin `await`.",
				"`SplashScreen.hide()` la oculta. (`hideAsync()` existe por compatibilidad hacia atrás, pero `hide()` es la API actual.)",
				"`SplashScreen.setOptions({ duration, fade })` permite definir cuánto dura la transición de salida; `fade` solo aplica en iOS.",
			],
		},

		{ type: "paragraph", text: "**Exponer la fuente en Tailwind CSS:**" },
		{
			type: "paragraph",
			text: "Para que Tailwind reconozca y permita usar tus fuentes personalizadas a través de clases, extendé la propiedad `fontFamily` en el `tailwind.config.js`.",
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
				'**Aplicar las fuentes:** una vez configuradas en Tailwind, las usás con las clases correspondientes, por ejemplo: `<Text className="font-quicksand-bold">Mi Texto</Text>`.',
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Librerías de íconos",
		},
		{
			type: "paragraph",
			text: "Los íconos son elementos esenciales para la navegación y la comunicación visual. Durante años se usó `@expo/vector-icons`, pero **Expo ya anunció su deprecación**: dejó de ser una dependencia del paquete `expo` y su sucesor es la familia de paquetes por conjunto `@react-native-vector-icons/*`.",
		},
		{
			type: "list",
			items: [
				"**Instalación:** cada conjunto es un paquete propio. `expo install` no lo conoce (Expo no publica una versión oficial para él), así que se instala con Bun directamente.",
				"**Uso:** importás el conjunto que quieras y usás el prop `name` con el nombre del ícono. Los nombres están tipados, así que el autocompletado te avisa si escribís uno inexistente.",
				"**Expo Go:** la importación por defecto registra la fuente automáticamente, así que funciona en Expo Go sin development build.",
				"**Importación `/static`:** si necesitás que la fuente del ícono se embeba en el build (y no se cargue en runtime), importás desde `@react-native-vector-icons/ionicons/static`. Eso **sí requiere development build** y su propio config plugin.",
				"**Codemod:** si venís migrando desde `@expo/vector-icons`, `bunx @react-native-vector-icons/codemod` te reescribe los imports automáticamente.",
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

		{ type: "paragraph", text: "**`expo-symbols`: los íconos del sistema**" },
		{
			type: "paragraph",
			text: "Si tu app se ve bien en iOS con los íconos nativos, `expo-symbols` te da acceso directo a **SF Symbols** en iOS y a **Material Symbols** en Android y web, sin escribir una sola ruta SVG.",
		},
		{
			type: "code",
			language: "tsx",
			code: `import { SymbolView } from 'expo-symbols';

// El nombre puede ser un objeto por plataforma: iOS usa SF Symbols,
// Android y web usan Material Symbols.
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
			text: "`expo-symbols` está en beta: la API puede cambiar. Es ideal para íconos de sistema, pero para una marca propia conviene un set de iconos propio.",
		},

		{ type: "paragraph", text: "**Íconos en la Barra de Navegación:**" },
		{
			type: "paragraph",
			text: "En Expo Router definís los íconos de cada pestaña con la prop `tabBarIcon` dentro de `Tabs.Screen.options`. Recibe un callback con `color`, `size` y el estado `focused`, así que podés cambiar el ícono según la pestaña esté activa o no.",
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
          title: 'Inicio',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ajustes',
          // Si dibujás tu propio texto dentro de tabBarIcon, el título por
          // defecto se sigue mostrando y queda duplicado. Esto lo oculta:
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ alignItems: 'center', gap: 2 }}>
              <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />
              <Text style={{ color, fontSize: 10, fontFamily: focused ? 'Quicksand-Bold' : 'Quicksand-Regular' }}>
                Ajustes
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
			text: "Regla práctica: si dentro de `tabBarIcon` dibujás tu propio `<Text>`, siempre agregá `tabBarShowLabel: false`. Si dejás el ícono solo, no hace falta: el título por defecto se muestra.",
		},

		{ type: "paragraph", text: "**Íconos Personalizados desde Assets:**" },
		{
			type: "paragraph",
			text: "Además de las librerías de íconos, podés usar tus propios archivos de imagen (PNG, etc.) como íconos, importándolos desde `assets/icons` con `require()`.",
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "4. Configuración de la app: ícono y splash screen",
		},
		{
			type: "paragraph",
			text: "El archivo `app.json` es el centro de configuración de tu app. Ahí definís el ícono de la aplicación y configurás la splash screen **con plugins**, no con la propiedad `splash`: esa propiedad fue eliminada de la configuración de Expo en SDK 56.",
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
				"**`icon`:** la imagen principal de la app. En el proyecto nuevo de Expo es `./assets/images/icon.png`.",
				"**`ios.icon`:** apunta a `./assets/expo.icon`, que es una **carpeta** con el formato Icon Composer de Apple. Si tu proyecto no la tiene, borrá esa línea.",
				"**Plugin `expo-splash-screen`:** reemplaza la vieja propiedad `splash`. La imagen del splash tiene que ser un **PNG**; con otros formatos el build de producción falla.",
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "5. Tarea Práctica: Pantalla con imágenes, íconos y tipografía propia",
		},
		{
			type: "paragraph",
			text: "Para consolidar lo aprendido, armá una pantalla de perfil que combine imágenes locales y remotas, íconos vectoriales y una tipografía propia, y aprovechá para llevar los íconos y la fuente a la barra de navegación inferior (Tab Bar) de tu app. Esta tarea es individual: prepará una demo de cómo quedó y contá qué decisiones tomaste y por qué.",
		},
		{
			type: "list",
			items: [
				"**1. Instalación:** agregá los paquetes que vas a usar: `bun expo install expo-image expo-asset` y `bun add @react-native-vector-icons/ionicons`.",
				"**2. Preparación:** verificá que tengas una fuente personalizada en `assets/fonts/` y que esté cargada en `src/app/_layout.tsx` (o embebida con el plugin de `expo-font`).",
				"**3. Tailwind:** agregá la fuente personalizada al `tailwind.config.js` y reiniciá el servidor con `bun expo start --clear` para que el tema se regenere.",
				"**4. Imágenes:** en la pantalla nueva, mostrá una imagen local con `expo-image` (con `contentFit` y `transition`) y una remota por URL (con su `cachePolicy`).",
				"**5. Íconos:** en `src/app/(tabs)/_layout.tsx`, usá la prop `tabBarIcon` para definir los íconos de cada pestaña, y hacé que el ícono cambie entre el estado activo y el inactivo.",
				"**6. Cuidado con el título:** si tu ícono custom incluye un texto, agregá `tabBarShowLabel: false` para que el título no quede duplicado.",
				"**7. Resultado esperado:** al ejecutar la app deberías ver la pantalla con las imágenes, los íconos en la barra inferior que cambian de estilo cuando están activos, y el texto usando la fuente que configuraste.",
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
      {/* 1. Reemplazá este bloque por la imagen local con expo-image */}
      <View style={{ width: 120, height: 120, backgroundColor: '#e4e4e7' }} />

      {/* 2. Reemplazá este bloque por la imagen remota con expo-image */}

      {/* 3. Mostrá un ícono de Ionicons */}

      {/* 4. Usá la fuente Quicksand (con NativeWind: className, o con fontFamily) */}
      <Text style={{ fontSize: 20 }}>Mi perfil</Text>
    </View>
  );
}`,
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Si la imagen local te sale en blanco, revisá que el path sea literal y que el archivo exista en `assets/images/`. Si te sale distortionada, ajustá `contentFit`.",
		},
	],
};
