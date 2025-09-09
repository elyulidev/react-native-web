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
			text: "Junto con Node.js, se instala npm (Node Package Manager). npm y pnpm son gestores de paquetes utilizados para instalar dependencias en tu proyecto.",
		},
		{
			type: "code",
			language: "bash",
			code: `npm install <package-name>  # Instala un paquete con npm
pnpm add <package-name>      # Instala un paquete con pnpm

npm install -D <package-name> # Instala dependencia de desarrollo con npm
pnpm add -D <package-name>    # Instala dependencia de desarrollo con pnpm`,
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
			code: "npx create-expo-app@latest mi-super-app",
		},
		{
			type: "paragraph",
			text: "Si quieres instalarlo en el directorio actual, simplemente añade un punto al final:",
		},
		{ type: "code", language: "bash", code: "npx create-expo-app@latest ." },

		{ type: "subtitle", text: "Características de la Plantilla por Defecto" },
		{
			type: "paragraph",
			text: "La plantilla inicial de Expo viene con varias características preconfiguradas para acelerar tu desarrollo:",
		},
		{
			type: "list",
			items: [
				"**Dos pantallas de ejemplo:** Ubicadas en `app/(tabs)/index.tsx` y `app/(tabs)/explore.tsx`, con una navegación de pestañas configurada en `app/(tabs)/_layout.tsx`.",
				"**Enrutamiento basado en archivos:** La estructura de la carpeta `app` define la navegación de tu aplicación.",
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
		{ type: "code", language: "bash", code: "npm run reset-project" },
		{
			type: "paragraph",
			text: "Este comando moverá el contenido de la carpeta `app` a una nueva carpeta `app-example` (para que puedas consultarla) y creará una nueva carpeta `app` con solo un archivo `index.tsx` básico.",
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
					name: "app",
					description: [
						"Contiene la navegación de la aplicación, que se basa en archivos. La estructura de archivos del directorio `app` determina la navegación de la aplicación.",
						"Por ejemplo, `app/index.tsx` es la ruta principal, y `app/detalles.tsx` se convierte en la ruta `/detalles`.",
					],
				},
				{
					id: "assets",
					name: "assets",
					description: [
						"Contiene imágenes, fuentes y otros archivos estáticos. Por ejemplo, el ícono de la aplicación (`icon.png`) y la pantalla de inicio (`splash.png`).",
					],
				},
				{
					id: "components",
					name: "components",
					description: [
						"Una carpeta para tus componentes de React reutilizables que se usan en toda la aplicación, como botones personalizados, tarjetas o encabezados.",
					],
				},
				{
					id: "constants",
					name: "constants",
					description: [
						"Un lugar para almacenar valores constantes que se usan en la aplicación, como paletas de colores, dimensiones o configuraciones.",
					],
				},
				{
					id: "app.json",
					name: "app.json",
					description: [
						"Contiene las opciones de configuración para el proyecto. Estas opciones cambian el comportamiento de tu proyecto durante el desarrollo, la construcción y la publicación de tu aplicación.",
					],
				},
				{
					id: "package.json",
					name: "package.json",
					description: [
						"Contiene las dependencias del proyecto, los scripts (como `npm start`) y los metadatos. Cada vez que se añade una nueva dependencia, se registra aquí.",
					],
				},
				{
					id: "tsconfig.json",
					name: "tsconfig.json",
					description: [
						"Contiene las reglas que TypeScript utilizará para hacer cumplir la seguridad de tipos en todo el proyecto, ayudando a prevenir errores.",
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
		{ type: "code", language: "bash", code: "npx expo start" },
		{
			type: "paragraph",
			text: "Aparecerá un código QR en tu terminal. Escanéalo con la cámara (iOS) o desde la app Expo Go (Android). ¡Tu ordenador y tu dispositivo móvil deben estar en la misma red Wi-Fi!",
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Solución de problemas comunes: Asegúrate de dar permiso de red local en iOS. Si sigue fallando, prueba a usar un túnel con `npx expo start --tunnel`.",
		},
		{
			type: "paragraph",
			text: "Cualquier cambio que hagas en el código (por ejemplo, en `app/index.tsx`) se reflejará instantáneamente en tu dispositivo gracias al 'hot reloading'.",
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
			text: "Con el servidor de desarrollo corriendo (`npx expo start`), presiona `a` en la terminal para abrir el emulador de Android o `i` para el simulador de iOS.",
		},

		{ type: "divider" },
		{ type: "heading", text: "¡Pon a prueba tus conocimientos!" },
		{
			type: "quiz",
			questions: [
				{
					question:
						"¿Cuál es el comando para crear un nuevo proyecto con Expo en el directorio actual?",
					options: [
						"npx create-expo-app .",
						"expo new project .",
						"npx expo init .",
						"npm create expo-app .",
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
						"En la terminal donde se ejecuta `npx expo start`, ¿qué tecla presionas para abrir el simulador de iOS?",
					options: ["s", "a", "i", "e"],
					correctAnswer: 2,
				},
			],
		},
	],
};
