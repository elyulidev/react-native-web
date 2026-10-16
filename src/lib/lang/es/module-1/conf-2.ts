import type { CurriculumTopic } from "../../../../types/types";

export const conference2: CurriculumTopic = {
	id: "conf-2",
	title: "Conf. 2: Configuración del Entorno",
	content: [
		{ type: "heading", text: "Configuración del Entorno de Desarrollo" },

		{ type: "subtitle", text: "Instalación de Node.js y Gestores de Paquetes" },
		{
			type: "paragraph",
			text: "Node.js es el entorno de ejecución para JavaScript y un requisito previo para el desarrollo con React Native. Se recomienda instalar la versión LTS (Long-Term Support) desde su sitio web oficial.",
		},
		{
			type: "paragraph",
			text: "Una vez instalado, puedes verificar la versión en tu terminal:",
		},
		{ type: "code", language: "bash", code: "node --version" },
		{
			type: "paragraph",
			text: "Junto con Node.js, se instala npm (Node Package Manager), pero en este curso usaremos **Bun** como gestor de paquetes principal: es más rápido y está optimizado para el ecosistema de Expo.",
		},
		{
			type: "code",
			language: "bash",
			code: `bun add <package-name>       # Instala un paquete con bun
bun add -D <package-name>    # Instala una dependencia de desarrollo con bun`,
		},

		{ type: "subtitle", text: "Configuración de tu Editor de Código: VS Code" },
		{
			type: "paragraph",
			text: "Visual Studio Code (VS Code) es el editor de código más popular en la comunidad de desarrollo. Su amplio ecosistema de extensiones lo hace muy poderoso.",
		},
		{
			type: "list",
			items: [
				"**Recomendación:** Instala extensiones para React y React Native para obtener fragmentos de código (snippets) útiles, como `rnfce` para crear componentes rápidamente.",
			],
		},

		{ type: "subtitle", text: "Creación de un Proyecto con Expo" },
		{
			type: "paragraph",
			text: "Expo es para React Native lo que Next.js es para React. Es el framework recomendado por el equipo de React Native para una mejor experiencia de desarrollo, ya que simplifica enormemente la configuración.",
		},
		{
			type: "paragraph",
			text: "Para inicializar tu proyecto, usa el siguiente comando en tu terminal:",
		},
		{
			type: "code",
			language: "bash",
			code: `bun create expo mi-super-app`,
		},
		{
			type: "paragraph",
			text: "Si quieres instalarlo en el directorio actual, simplemente añade un punto al final:",
		},
		{
			type: "code",
			language: "bash",
			code: `bun create expo .`,
		},

		{ type: "subtitle", text: "Características de la Plantilla por Defecto" },
		{
			type: "paragraph",
			text: "La plantilla inicial de Expo viene con varias características preconfiguradas para acelerar tu desarrollo:",
		},
		{
			type: "list",
			items: [
				"**Dos pantallas de ejemplo:** Ubicadas en `src/app/index.tsx` y `src/app/explore.tsx`, con la navegación de pestañas configurada en `src/app/_layout.tsx` (usa pestañas nativas en Android e iOS).",
				"**Enrutamiento basado en archivos:** La estructura de la carpeta `src/app` define la navegación de tu aplicación: cada archivo es una ruta.",
				"**Soporte para modo claro y oscuro:** La plantilla se adapta automáticamente al tema del sistema.",
				"**TypeScript por defecto:** Para un código más robusto y mantenible.",
			],
		},
		{
			type: "callout",
			alertType: "tip",
			text: "La plantilla por defecto es un excelente punto de partida, pero a veces querrás empezar desde cero.",
		},
		{ type: "subtitle", text: "Reiniciar tu Proyecto" },
		{
			type: "paragraph",
			text: "Si prefieres empezar con una estructura mínima en lugar de la plantilla de ejemplo, puedes eliminar el código predeterminado ejecutando un script incluido:",
		},
		{ type: "code", language: "bash", code: "bun run reset-project" },
		{
			type: "paragraph",
			text: "Este comando moverá los directorios `src` y `scripts` a la carpeta `example` (para que puedas consultarlos) y creará un nuevo `src/app` con archivos `index.tsx` y `_layout.tsx`.",
		},

		{ type: "subtitle", text: "Estructura de Archivos del Proyecto" },
		{
			type: "paragraph",
			text: "Al crear un proyecto Expo, se genera una estructura de archivos estándar. Explora los archivos y carpetas principales para entender su propósito:",
		},
		{
			type: "fileStructure",
			files: [
				{
					id: "app",
					name: "src/app",
					description: [
						"Contiene la navegación de la aplicación, que se basa en archivos: cada archivo dentro de `src/app` es una ruta, nada más debe vivir ahí.",
						"Por ejemplo, `src/app/index.tsx` es la ruta principal y `src/app/explore.tsx` la segunda pestaña; `src/app/_layout.tsx` configura las pestañas.",
					],
				},
				{
					id: "assets",
					name: "assets",
					description: [
						"Contiene el directorio `expo.icon` para el ícono de iOS y el subdirectorio `images` con los archivos del ícono adaptativo de Android (`android-icon-foreground.png`, `android-icon-background.png` y `android-icon-monochrome.png`).",
						"Además incluye `splash-icon.png` para la pantalla de inicio, `favicon.png` para la web y los íconos de la navegación por pestañas.",
					],
				},
				{
					id: "components",
					name: "src/components",
					description: [
						"Guarda tus componentes React reutilizables, como `themed-text.tsx`, que crea textos que respetan el esquema de color de la app en modo claro y oscuro.",
						"Algunos componentes tienen variantes por plataforma: `*.native.tsx` para nativo y `*.tsx` por defecto para web (por ejemplo `animated-icon` y `app-tabs`).",
					],
				},
				{
					id: "constants",
					name: "src/constants",
					description: [
						"Contiene `theme.ts`, que define las constantes de colores, fuentes y espaciados usadas en toda la app.",
					],
				},
				{
					id: "hooks",
					name: "src/hooks",
					description: [
						"Contiene React Hooks, que permiten compartir comportamiento común entre componentes.",
						"Por ejemplo, `useTheme()` devuelve el objeto del tema actual y `useColorScheme()` detecta el esquema de color del usuario; algunos hooks tienen variantes por plataforma con la extensión `.web.ts`.",
					],
				},
				{
					id: "scripts",
					name: "scripts",
					description: [
						"Guarda scripts de utilidades del proyecto, como el que ejecuta `reset-project` para volver a la estructura mínima.",
					],
				},
				{
					id: "app.json",
					name: "app.json",
					description: [
						"Contiene las opciones de configuración del proyecto y se llama app config.",
						"Estas opciones cambian el comportamiento de tu proyecto al desarrollar, compilar, enviar y actualizar tu app.",
					],
				},
				{
					id: "package.json",
					name: "package.json",
					description: [
						"El archivo `package.json` contiene las dependencias, los scripts y los metadatos del proyecto. Cada vez que se añade una dependencia nueva, se registra en este archivo.",
					],
				},
				{
					id: "tsconfig.json",
					name: "tsconfig.json",
					description: [
						"Contiene las reglas que TypeScript utilizará para hacer cumplir la seguridad de tipos en todo el proyecto, ayudando a prevenir errores.",
						"La plantilla además define el alias `@/*` hacia `./src/*` para importar sin rutas relativas largas.",
					],
				},
			],
		},

		{ type: "subtitle", text: "Ejecución de tu Primera App en Expo Go" },
		{
			type: "paragraph",
			text: "Expo Go es una aplicación móvil que te permite probar y prototipar rápidamente en tus dispositivos físicos (Android/iOS). Descárgala desde la App Store o Google Play Store.",
		},
		{
			type: "paragraph",
			text: "Para iniciar el servidor de desarrollo, ejecuta:",
		},
		{ type: "code", language: "bash", code: "bun expo start" },
		{
			type: "paragraph",
			text: "Aparecerá un código QR en tu terminal. Escanéalo con la cámara (iOS) o desde la app Expo Go (Android). ¡Tu ordenador y tu dispositivo móvil deben estar en la misma red Wi-Fi!",
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Solución de problemas comunes: Asegúrate de dar permiso de red local en iOS. Si sigue fallando, prueba a usar un túnel con `bun expo start --tunnel`.",
		},
		{
			type: "paragraph",
			text: "Cualquier cambio que hagas en el código (por ejemplo, en `src/app/index.tsx`) se reflejará instantáneamente en tu dispositivo gracias al 'Fast Refresh'.",
		},

		{ type: "subtitle", text: "Configuración Opcional de Simuladores" },
		{
			type: "paragraph",
			text: "Los simuladores ofrecen una experiencia más integrada en tu ordenador, permitiéndote tener el código y la app lado a lado.",
		},
		{
			type: "list",
			items: [
				"**Emulador de Android:** Requiere instalar Android Studio, una aplicación pesada que consume muchos recursos.",
				"**Simulador de iOS:** Requiere instalar Xcode en un Mac, que también consume bastante potencia.",
				"**Recomendación:** Instálalos solo si planeas desarrollar más aplicaciones en el futuro.",
			],
		},
		{
			type: "paragraph",
			text: "Con el servidor de desarrollo corriendo (`bun expo start`), presiona `a` en la terminal para abrir el emulador de Android o `i` para el simulador de iOS.",
		},

		/*
		{ type: "divider" },
		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Cuál es el comando para crear un nuevo proyecto con Expo en el directorio actual?",
					options: [
						"bun create expo .",
						"expo new project .",
						"npx expo init .",
						"bunx create-expo-app .",
					],
					correctAnswer: 0,
				},
				{
					question: "¿Qué es Expo Go?",
					options: [
						"Un editor de código para React Native",
						"Una aplicación móvil para probar y prototipar proyectos Expo",
						"Una librería de componentes UI",
						"El compilador de React Native",
					],
					correctAnswer: 1,
				},
				{
					question:
						"Para que Expo Go funcione correctamente, el ordenador y el dispositivo móvil deben...",
					options: [
						"Estar conectados por USB",
						"Tener el mismo sistema operativo",
						"Estar en la misma red Wi-Fi",
						"Tener Bluetooth activado",
					],
					correctAnswer: 2,
				},
				{
					question:
						"En la terminal donde se ejecuta `bun expo start`, ¿qué tecla presionas para abrir el simulador de iOS?",
					options: ["s", "a", "i", "e"],
					correctAnswer: 2,
				},
			],
		},
		*/

		{ type: "divider" },
		{ type: "heading", text: "Tarea Extraclase: Crea tu Primera App" },
		{
			type: "paragraph",
			text: "Pon en práctica lo aprendido creando un proyecto Expo desde cero con Bun. Esta tarea es individual y deberás entregar un informe simple con capturas y las respuestas a las preguntas finales.",
		},
		{
			type: "list",
			items: [
				"1. **Crea un proyecto** llamado `mi-primera-app` con `bun create expo mi-primera-app`.",
				"2. **Explora la estructura generada**: identifica las carpetas `src/app`, `assets`, `src/components`, `src/constants` y los archivos `app.json`, `package.json` y `tsconfig.json`. Anota para qué sirve cada uno.",
				"3. **Ejecuta la app** con `bun expo start` y ábrela en Expo Go desde tu dispositivo (ambos en la misma red Wi-Fi).",
				"4. **Modifica `src/app/index.tsx`**: cambia el texto de bienvenida por uno personalizado y observa cómo se actualiza al instante con Fast Refresh.",
				"5. **Crea una segunda pantalla** `src/app/detalles.tsx` con un texto propio y verifica que la ruta `/detalles` funciona reemplazando la URL en el navegador web (o navegando desde la app si ya usas enlaces).",
				"6. **Responde en tu informe**: ¿Qué hace el comando `bun run reset-project`? ¿Por qué es importante que tu dispositivo y tu ordenador estén en la misma red Wi-Fi?",
			],
		},
		{
			type: "callout",
			alertType: "tip",
			text: "Consejo: si algo no funciona, revisa los pasos de la sección 'Ejecución de tu Primera App en Expo Go' — el error más común es no tener permiso de red local en iOS o estar en redes Wi-Fi diferentes.",
		},
	],
};
