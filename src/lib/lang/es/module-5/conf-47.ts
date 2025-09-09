import type { CurriculumTopic } from "../../../../types/types";

export const conference47: CurriculumTopic = {
	id: "conf-47",
	title: "Conf. 47: Publicación Local (Builds)",
	content: [
		{ type: "heading", text: "Preparación para la Publicación Local" },
		{
			type: "paragraph",
			text: 'Hasta ahora, hemos ejecutado nuestra aplicación en Expo Go. Si bien es fantástico para el desarrollo rápido, tiene limitaciones, especialmente cuando usas librerías con código nativo que no están incluidas en Expo Go. Para probar tu aplicación en un entorno más cercano al de producción, necesitas crear un "build de desarrollo" (development build).',
		},
		{ type: "divider" },

		{ type: "subtitle", text: "1. ¿Qué es un Development Build?" },
		{
			type: "paragraph",
			text: "Un build de desarrollo es una versión independiente de tu aplicación (un archivo `.apk` para Android o `.ipa` para iOS) que incluye tus librerías nativas personalizadas. A diferencia de Expo Go, está hecho a medida para tu proyecto, pero, a diferencia de un build de producción, todavía incluye las herramientas de desarrollo de Expo, como el menú de desarrollo y la recarga rápida.",
		},
		{
			type: "callout",
			alertType: "info",
			text: "Es el puente perfecto: tienes la fidelidad de un build de producción con la conveniencia del desarrollo rápido.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "2. Usando EAS (Expo Application Services)" },
		{
			type: "paragraph",
			text: "EAS es el servicio en la nube de Expo para construir y desplegar aplicaciones. Aunque puede hacer builds en la nube (lo cual es útil para iOS si no tienes un Mac), también puede hacer builds **localmente** en tu propia máquina, lo cual es rápido y gratuito.",
		},

		{ type: "paragraph", text: "**Paso 1: Instalar EAS CLI**" },
		{
			type: "paragraph",
			text: "Instala la interfaz de línea de comandos de EAS globalmente en tu sistema.",
		},
		{ type: "code", language: "bash", code: "npm install -g eas-cli" },

		{ type: "paragraph", text: "**Paso 2: Iniciar Sesión**" },
		{ type: "paragraph", text: "Conecta la CLI a tu cuenta de Expo." },
		{ type: "code", language: "bash", code: "eas login" },

		{ type: "paragraph", text: "**Paso 3: Configurar el Proyecto**" },
		{
			type: "paragraph",
			text: 'Este comando creará un archivo `eas.json` en tu proyecto, que define diferentes "perfiles" de build.',
		},
		{ type: "code", language: "bash", code: "eas build:configure" },
		{
			type: "paragraph",
			text: "Tu `eas.json` se verá algo así. Nos centraremos en el perfil `development`:",
		},
		{
			type: "code",
			language: "json",
			code: `
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}
`,
		},
		{
			type: "list",
			items: [
				"**`developmentClient: true`**: Esto le dice a EAS que incluya las herramientas de desarrollo en este build.",
			],
		},
		{ type: "divider" },

		{
			type: "subtitle",
			text: "3. Creando un Build Local para Android (`.apk`)",
		},
		{
			type: "paragraph",
			text: "Crear un build local para Android es la forma más accesible de empezar, ya que no requiere una cuenta de desarrollador de pago.",
		},
		{ type: "paragraph", text: "Ejecuta el siguiente comando en tu terminal:" },
		{
			type: "code",
			language: "bash",
			code: "eas build --platform android --profile development --local",
		},
		{
			type: "list",
			items: [
				"**`--platform android`**: Especifica que queremos construir para Android.",
				'**`--profile development`**: Usa la configuración del perfil "development" de nuestro `eas.json`.',
				"**`--local`**: Le dice a EAS que realice el build en tu máquina en lugar de en la nube de Expo.",
			],
		},
		{
			type: "paragraph",
			text: "La primera vez, esto puede tardar un poco, ya que descargará las herramientas de build nativas de Android. Al finalizar, tendrás un archivo `.apk` en tu proyecto. Puedes arrastrar este archivo a tu emulador de Android o transferirlo a un dispositivo físico para instalarlo.",
		},
		{
			type: "callout",
			alertType: "warning",
			text: "Para builds de iOS, el proceso es similar (`--platform ios`), pero **requiere un Mac** y, para instalar en un dispositivo físico, una cuenta de desarrollador de Apple.",
		},
		{ type: "divider" },

		{ type: "subtitle", text: "4. Ejecutando la App en el Development Build" },
		{
			type: "paragraph",
			text: "Una vez instalado tu build de desarrollo, verás el ícono de tu app en tu dispositivo. Al abrirla, en lugar de cargar tu código JS inmediatamente, te mostrará una pantalla para escanear un código QR, ¡muy similar a Expo Go!",
		},
		{
			type: "paragraph",
			text: "Ahora, cuando ejecutes `npx expo start` en tu proyecto, puedes escanear el QR con tu build de desarrollo. La ventaja es que ahora estás ejecutando tu código en un entorno nativo 100% fiel a tu proyecto.",
		},
	],
};
